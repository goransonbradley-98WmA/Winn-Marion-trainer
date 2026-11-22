/* Validate saved schematic workspaces before replacing the active circuit. */
(function(root){
'use strict';
const allowedTypes=new Set(['stop','start','coil','aux']);
// Keep malformed finite-but-extreme values from producing unusable SVG geometry.
const MAX_COORDINATE=1000000;
const isCoordinate=value=>Number.isFinite(value)&&Math.abs(value)<=MAX_COORDINATE;
function isValidView(view){
  if(view===undefined)return true; // Version-1 files created before view state was saved remain loadable.
  if(!view||typeof view!=='object'||Array.isArray(view)||
     !isCoordinate(view.x)||!isCoordinate(view.y)||
     !Number.isFinite(view.w)||!Number.isFinite(view.h)||
     view.w<260||view.w>1800||view.h<=0)return false;
  const expectedHeight=view.w*480/900;
  return Math.abs(view.h-expectedHeight)<=Math.max(1e-6,expectedHeight*1e-9);
}
function isValidWorkspace(saved){
  if(!saved||typeof saved!=='object'||Array.isArray(saved)||saved.version!==1||
     !Array.isArray(saved.devices)||!Array.isArray(saved.wires)||
     saved.devices.length>100||saved.wires.length>500||!isValidView(saved.view))return false;
  const ids=new Set();
  const terminals=new Set(['L1','L2']);
  for(let i=0;i<saved.devices.length;i++){
    const d=saved.devices[i];
    if(!d||typeof d!=='object'||Array.isArray(d)||
       !Number.isSafeInteger(d.id)||d.id<1||!allowedTypes.has(d.type)||
       !isCoordinate(d.x)||!isCoordinate(d.y)||ids.has(d.id))return false;
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
           !isCoordinate(p.x)||!isCoordinate(p.y))return false;
      }
    }
  }
  return true;
}
const api=Object.freeze({isValidWorkspace});
root.SavedCircuitValidation=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
