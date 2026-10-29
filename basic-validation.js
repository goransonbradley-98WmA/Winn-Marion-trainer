/* Educational two-wire source / maintained switch / motor-load model. */
(function(root){
'use strict';
function evaluate(devices,wires){
 const fail=message=>({result:'fail',reason:'basic circuit',message});
 if(!Array.isArray(devices)||!Array.isArray(wires)||devices.length!==2||devices.filter(d=>d&&d.type==='start').length!==1||devices.filter(d=>d&&d.type==='coil').length!==1||devices.some(d=>!Number.isFinite(d.id))||new Set(devices.map(d=>d.id)).size!==2)return fail('Use exactly one switch and one motor load.');
 const pins=new Set(['L1','L2',...devices.flatMap(d=>[d.id+':L',d.id+':R'])]);
 if(wires.some(w=>!w||!pins.has(w.a)||!pins.has(w.b)||w.a===w.b))return fail('A wire has an invalid terminal. Remove it and reconnect.');
 const sw=devices.find(d=>d.type==='start'),load=devices.find(d=>d.type==='coil');
 function connected(a,b,closed){const edges=wires.map(w=>[w.a,w.b]);if(closed)edges.push([sw.id+':L',sw.id+':R']);const seen=new Set([a]),queue=[a];while(queue.length){const p=queue.shift();for(const [x,y] of edges){const n=x===p?y:y===p?x:null;if(n&&!seen.has(n)){seen.add(n);queue.push(n)}}}return seen.has(b)}
 for(const closed of [false,true])if(connected('L1','L2',closed))return fail('Supply short: a path bypasses the motor load.');
 function powered(closed){return connected('L1',load.id+':L',closed)&&connected('L2',load.id+':R',closed)||connected('L1',load.id+':R',closed)&&connected('L2',load.id+':L',closed)}
 if(powered(false))return fail('Switch bypass: opening the switch must interrupt the motor load.');
 if(!powered(true))return fail('Open circuit: trace source → closed switch → motor load → return.');
 return {result:'pass',reason:'passed',message:'PASS: switch closed runs the motor; switch open interrupts it in this educational model.'};
}
root.BasicValidation={evaluate};if(typeof module!=='undefined')module.exports={evaluate};
})(globalThis);
