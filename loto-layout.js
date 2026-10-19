// Winn-Marion LOTO: compact mobile workspace and visible procedural progress.
window.addEventListener('DOMContentLoaded',()=>{
 const scene=document.getElementById('scene'),aside=document.querySelector('aside');
 const controls=document.getElementById('controls'),hud=document.getElementById('wmHud'),touch=document.getElementById('disconnectTouchUI');
 if(!scene||!aside)return;
 const dock=document.createElement('section');dock.id='wmDock';dock.setAttribute('aria-label','Simulator controls');
 dock.style.cssText='display:flex;flex-direction:column;gap:3px;background:#0d273c;padding:5px;border-bottom:1px solid #6288a5';
 scene.after(dock);
 // Move overlay elements out of the 3D viewport without cloning them.
 // Original listeners and simulator references remain attached.
 for(const el of [controls,hud,touch])if(el)dock.append(el);
 const joy=document.getElementById('wmJoy'),tools=document.getElementById('wmTools');
 if(joy&&tools){const bar=document.createElement('div');bar.style.cssText='display:flex;align-items:center;justify-content:center;gap:8px';tools.before(bar);bar.append(joy,tools);tools.style.flex='1'}
 const list=document.getElementById('steps');
 if(list){
  const title=document.createElement('div');title.style.cssText='font-weight:700;margin-top:6px';title.textContent='Procedure checklist — current step highlighted';
  list.before(title);
  const mark=()=>{const n=window.wmLoto?.step?.()??0;[...list.children].forEach((li,i)=>{li.classList.toggle('current',i===n);li.setAttribute('aria-current',i===n?'step':'false')})};
  mark();new MutationObserver(mark).observe(list,{subtree:true,attributes:true,attributeFilter:['class']});
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
