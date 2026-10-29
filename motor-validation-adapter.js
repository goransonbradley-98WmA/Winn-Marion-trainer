/* Isolated enhanced-validation preview. Preserves simulator.js touch and wiring logic. */
(function(){
'use strict';
const button=document.querySelector('#test');
const validator=globalThis.MotorValidation;
if(!button||!validator||typeof validator.evaluate!=='function'||typeof validator.signature!=='function')return;
button.dataset.validation='topology-preview';
button.onclick=()=>{
  const verdict=validator.evaluate(devices,wires);
  globalThis.TrainerFeedback?.show(verdict);
  const signature=validator.signature(devices,wires);
  const duplicate=attemptHistory.some(a=>a.signature===signature);
  if(!duplicate){
    attemptHistory.push({at:new Date().toISOString(),result:verdict.result,reason:verdict.reason,signature});
    attemptHistory=attemptHistory.slice(-200);
    try{localStorage.setItem(attemptKey,JSON.stringify(attemptHistory))}catch(err){}
    updateAttemptStatus();
  }
  feedback.textContent=verdict.message+(duplicate?' This circuit topology was already tested; no additional attempt recorded.':'');
};
})();
