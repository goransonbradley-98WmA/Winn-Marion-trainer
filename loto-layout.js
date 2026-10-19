// Winn-Marion LOTO: compact mobile workspace and visible procedural progress.
window.addEventListener('load',()=>{
 const scene=document.getElementById('scene'),aside=document.querySelector('aside');
 const controls=document.getElementById('controls'),hud=document.getElementById('wmHud'),touch=document.getElementById('disconnectTouchUI');
 if(!scene||!aside)return;
 const dock=document.createElement('section');dock.id='wmDock';dock.setAttribute('aria-label','Simulator controls');
 dock.style.cssText='display:flex;flex-direction:column;gap:3px;background:#0d273c;padding:5px;border-bottom:1px solid #6288a5';
 scene.after(dock);
 // Move overlay elements out of the 3D viewport without cloning them.
 // Original listeners and simulator references remain attached.
 for(const el of [controls,hud,touch])if(el)dock.append(el);
 // The simulator module creates the touch controls asynchronously; relocate late-created overlays too.
 const relocate=()=>{for(const id of ['controls','wmHud','disconnectTouchUI']){const el=document.getElementById(id);if(el&&el.parentElement!==dock)dock.append(el)}};
 relocate();const relocationWatch=new MutationObserver(relocate);relocationWatch.observe(scene,{childList:true});
 setTimeout(()=>relocationWatch.disconnect(),12000);
 const joy=document.getElementById('wmJoy'),tools=document.getElementById('wmTools');
 if(joy&&tools){const bar=document.createElement('div');bar.style.cssText='display:flex;align-items:center;justify-content:center;gap:8px';tools.before(bar);bar.append(joy,tools);tools.style.flex='1'}
 const list=document.getElementById('steps');
 const compact=document.createElement('div');compact.id='wmCurrentStep';compact.setAttribute('role','status');compact.style.cssText='background:#17394f;border:1px solid #b5a25c;padding:8px;border-radius:8px;font-size:13px';dock.prepend(compact);
 const checklistDetails=document.createElement('details');checklistDetails.id='wmChecklist';checklistDetails.style.cssText='background:#10283b;padding:6px;border-radius:8px';
 const checklistSummary=document.createElement('summary');checklistSummary.textContent='Show all 8 procedure steps';checklistSummary.style.cssText='cursor:pointer;font-weight:700;padding:6px';checklistDetails.append(checklistSummary);dock.insertBefore(checklistDetails,dock.children[1]);
 if(list){
  const title=document.createElement('div');title.style.cssText='font-weight:700;margin-top:6px';title.textContent='Procedure checklist — current step highlighted';
  checklistDetails.append(title,list);
  const mark=()=>{const n=window.wmLoto?.step?.()??0;compact.textContent=n>=8?'All steps completed — instructor review required':`Step ${n+1} of 8: ${list.children[n]?.textContent||''}`;[...list.children].forEach((li,i)=>{li.classList.toggle('current',i===n);li.setAttribute('aria-current',i===n?'step':'false')})};
  mark();setInterval(mark,350);
 }
 const action=document.getElementById('action');
 if(action){action.textContent='Confirm preparation / normal stop';action.title='Only preparation and normal stop are confirmed here. Operate the physical handle for isolation.'}
 // Keep meter details available but collapsed to reduce scrolling.
 const meterPanel=document.getElementById('meterPanel');
 if(meterPanel){
  const details=document.createElement('details');details.id='wmMeterDetails';
  const summary=document.createElement('summary');summary.textContent='Multimeter and probe testing — expand';summary.style.cssText='cursor:pointer;padding:9px;background:#254b67;border-radius:7px;font-weight:700';
  meterPanel.before(details);details.append(summary,meterPanel);meterPanel.style.marginTop='0';
  document.getElementById('grabMeter')?.addEventListener('click',()=>{details.open=true});
  document.getElementById('meter')?.addEventListener('click',()=>{details.open=true});
 }
});

