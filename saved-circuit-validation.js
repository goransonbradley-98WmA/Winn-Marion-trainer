/* Validate saved schematic workspaces before replacing the active circuit. */
(function(root){
'use strict';
const allowedTypes=new Set(['stop','start','coil','aux']);
function isValidWorkspace(saved){
  if(!saved||typeof saved!=='object'||Array.isArray(saved)||saved.version!==1||
     !Array.isArray(saved.devices)||!Array.isArray(saved.wires)||
     saved.devices.length>100||saved.wires.length>500)return false;
  const ids=new Set();
  const terminals=new Set(['L1','L2']);
  for(let i=0;i<saved.devices.length;i++){
    const d=saved.devices[i];
    if(!d||typeof d!=='object'||Array.isArray(d)||
       !Number.isSafeInteger(d.id)||d.id<1||!allowedTypes.has(d.type)||
       !Number.isFinite(d.x)||!Number.isFinite(d.y)||ids.has(d.id))return false;
    ids.add(d.id);
    terminals.add(d.id+':L');
    terminals.add(d.id+':R');
  }
  for(let i=0;i<saved.wires.length;i++){
    const w=saved.wires[i];
    if(!w||typeof w!=='object'||Array.isArray(w)||
       typeof w.a!=='string'||typeof w.b!=='string'||w.a===w.b||
       !terminals.has(w.a)||!terminals.has(w.b))return false;
    if(w.points!==undefined&&w.points!==null){
      if(!Array.isArray(w.points)||w.points.length>=3000)return false;
      for(let j=0;j<w.points.length;j++){
        const p=w.points[j];
        if(!p||typeof p!=='object'||Array.isArray(p)||
           !Number.isFinite(p.x)||!Number.isFinite(p.y))return false;
      }
    }
  }
  return true;
}
const api=Object.freeze({isValidWorkspace});
root.SavedCircuitValidation=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
