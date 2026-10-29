(function(){
'use strict';
devices=[{id:2,type:'start',x:330,y:180},{id:3,type:'coil',x:620,y:180}];wires=[];undoStack=[];
const previousDraw=draw;
draw=function(){previousDraw();svg.querySelectorAll('.device').forEach(g=>{const d=devices.find(d=>String(d.id)===g.dataset.device);const label=g.querySelector('text');if(label)label.textContent=d?.type==='start'?'SWITCH NO':d?.type==='coil'?'MOTOR LOAD':'REMOVE EXTRA';});};
updateAttemptStatus=function(){const count=failedCount();document.querySelector('#attemptStatus').textContent=`Basic circuit failed tests: ${count}. Close the simulated switch during Test; opening it must interrupt the load.`;document.querySelector('#referenceToggle').hidden=count<3;document.querySelector('#hintBody').textContent='Trace a complete path through the switch and motor load to the source return. Check that no wire bypasses either device.';if(count<3)document.querySelector('#referenceBody').hidden=true;};
document.querySelector('#test').onclick=()=>{const verdict=BasicValidation.evaluate(devices,wires);TrainerFeedback.show(verdict);feedback.textContent=verdict.message;const signature=MotorValidation.signature(devices,wires);if(!attemptHistory.some(a=>a.signature===signature)){attemptHistory.push({at:new Date().toISOString(),result:verdict.result,reason:verdict.reason,signature});attemptHistory=attemptHistory.slice(-200);try{localStorage.setItem(attemptKey,JSON.stringify(attemptHistory))}catch(err){}updateAttemptStatus();}};
draw();updateAttemptStatus();
})();
