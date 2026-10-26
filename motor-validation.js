/* Topology-based 3-wire motor control trainer evaluation (not field-grade electrical analysis). */
(function(root){
'use strict';
const typeSet=new Set(['stop','start','aux','coil']);
function signature(devices,wires){
  const parts=devices.filter(d=>typeSet.has(d.type)).map(d=>String(d.id)+':'+d.type).sort();
  const edges=wires.map(w=>[String(w.a),String(w.b)].sort().join('~')).sort();
  return JSON.stringify([parts,edges]);
}
function evaluate(devices,wires){
  if(!Array.isArray(devices)||!Array.isArray(wires))return {result:'fail',reason:'invalid circuit',message:'Circuit data could not be evaluated.'};
  // Reject invalid graph endpoints instead of treating phantom terminals as junctions.
  const validTypes=new Set(['stop','start','aux','coil']);
  const terminals=new Set(['L1','L2']);
  const seenIds=new Set();
  for(const d of devices){
    if(!d||!validTypes.has(d.type)||!(typeof d.id==='string'||typeof d.id==='number')||
       !String(d.id).trim()||String(d.id).includes(':')||seenIds.has(String(d.id))){
      return {result:'fail',reason:'invalid circuit',message:'INVALID CIRCUIT: Check device types and duplicate or missing device IDs.'};
    }
    seenIds.add(String(d.id));
    terminals.add(d.id+':L');terminals.add(d.id+':R');
  }
  for(const w of wires){
    if(!w||typeof w.a!=='string'&&typeof w.a!=='number'||
       typeof w.b!=='string'&&typeof w.b!=='number'||
       !terminals.has(String(w.a))||!terminals.has(String(w.b))||
       String(w.a)===String(w.b)){
      return {result:'fail',reason:'invalid terminal',message:'INVALID WIRING: A wire references a missing terminal or connects a terminal to itself. Remove the invalid wire.'};
    }
  }
  const coils=devices.filter(d=>d.type==='coil');
  if(coils.length!==1)return {result:'fail',reason:coils.length>1?'multiple coils':'missing components',message:coils.length>1?'Use one M coil for this exercise.':'Add one M coil before testing.'};
  if(!devices.some(d=>d.type==='stop')||!devices.some(d=>d.type==='start'))
    return {result:'fail',reason:'missing components',message:'Add STOP NC and START NO before testing.'};
  const coil=coils[0];
  const stopIds=devices.filter(d=>d.type==='stop').map(d=>String(d.id));
  function state(startPressed,auxClosed,pressedStopIds){
    const adj=new Map();
    function edge(a,b){
      if(!adj.has(a))adj.set(a,[]);
      if(!adj.has(b))adj.set(b,[]);
      adj.get(a).push(b);adj.get(b).push(a);
    }
    wires.forEach(w=>edge(String(w.a),String(w.b)));
    devices.forEach(d=>{
      if(d.type==='stop'&&!pressedStopIds.has(String(d.id))||d.type==='start'&&startPressed||d.type==='aux'&&auxClosed)
        edge(d.id+':L',d.id+':R');
    });
    function reached(from){
      const visited=new Set([from]),queue=[from];
      for(let i=0;i<queue.length;i++)for(const next of adj.get(queue[i])||[]){
        if(!visited.has(next)){visited.add(next);queue.push(next);}
      }
      return visited;
    }
    const l1=reached('L1'),l2=reached('L2');
    const short=l1.has('L2');
    const energized=(l1.has(coil.id+':L')&&l2.has(coil.id+':R'))||
      (l1.has(coil.id+':R')&&l2.has(coil.id+':L'));
    return {short,energized};
  }
  const nonePressed=new Set(),allPressed=new Set(stopIds);
  const idle=state(false,false,nonePressed);
  const start=state(true,false,nonePressed);
  const run=state(false,true,nonePressed);
  const stop=state(false,true,allPressed);
  const stopWhileStart=state(true,true,allPressed);
  // Each STOP must independently release the coil, including while START is held.
  // Pressing every STOP together would miss unsafe parallel STOP wiring.
  const individualStops=stopIds.flatMap(id=>[
    state(false,true,new Set([id])),
    state(true,true,new Set([id]))
  ]);
  if([idle,start,run,stop,stopWhileStart,...individualStops].some(s=>s.short))
    return {result:'fail',reason:'supply short',message:'FAIL: A closed contact creates an L1-to-L2 short that bypasses the coil.'};
  if(stop.energized||stopWhileStart.energized||individualStops.some(s=>s.energized))
    return {result:'fail',reason:'unsafe stop',message:'UNSAFE: Pressing STOP must de-energize the coil, even while START is held.'};
  if(idle.energized)
    return {result:'fail',reason:'unexpected energization',message:'FAIL: The coil energizes without pressing START. Check the START bypass.'};
  if(!start.energized)
    return {result:'fail',reason:'open circuit',message:'OPEN CIRCUIT: Pressing START does not energize the coil. Trace L1 through STOP and START to M and L2.'};
  if(!devices.some(d=>d.type==='aux')||!run.energized)
    return {result:'fail',reason:'missing seal-in',message:'PARTIAL PASS: START operates the coil, but it does not stay energized through M AUX when START is released.'};
  return {result:'pass',reason:'passed',message:'PASS (training model): START energizes M, AUX seals in, STOP releases M, and no direct supply short was found.'};
}
const api=Object.freeze({evaluate,signature});
root.MotorValidation=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
