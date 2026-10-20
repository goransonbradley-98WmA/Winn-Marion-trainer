// Winn-Marion LOTO: equipment-first placement practice, no procedure checklist.
window.addEventListener('load', () => {
  const scene = document.getElementById('scene');
  const aside = document.querySelector('aside');
  if (!scene || !aside) return;
  const dock = document.createElement('section');
  dock.id = 'wmDock';
  dock.setAttribute('aria-label', 'Lockout placement controls');
  scene.after(dock);

  const title = document.createElement('div');
  title.id = 'wmPracticeTitle';
  title.innerHTML = '<strong>LOTO & voltage practice</strong><span>Operate the disconnect, attach your lock, open the cabinet door, and practice simulated meter checks. No written-step checklist.</span>';
  dock.append(title);

  // Preserve the simulator's original message element and its event listeners.
  const message = document.getElementById('message');
  if (message) dock.append(message);

  const controls = document.getElementById('controls');
  if (controls) dock.append(controls);
  const hud = document.getElementById('wmHud');
  if (hud) dock.append(hud);

  // Keep the new door and simulated meter controls below the 3D viewport.
  // Moving the existing elements preserves their event handlers.
  const doorActions=document.createElement('div');
  doorActions.id='wmDoorActions';
  const doorButton=document.getElementById('door');
  if(doorButton){doorButton.textContent='Open cabinet door';doorActions.append(doorButton);}
  dock.append(doorActions);
  const voltageLab=document.createElement('details');
  voltageLab.id='wmVoltageLab';
  voltageLab.innerHTML='<summary>Simulated voltage testing · open meter panel</summary><p class="wmSafetyNote">Training model only: 480/277 V WYE supply is simulated. Incoming LINE terminals remain energized with the disconnect OFF. Live electrical testing requires qualified personnel and site-approved safe work practices.</p>';
  const meterButton=document.getElementById('meter');
  const meterPanel=document.getElementById('meterPanel');
  const meterHud=document.getElementById('immersiveMeter');
  if(meterButton)voltageLab.append(meterButton);
  if(meterHud)voltageLab.append(meterHud);
  if(meterPanel)voltageLab.append(meterPanel);
  dock.append(voltageLab);
  const meterTool=dock.querySelector('[data-tool="meter"]');
  if(meterTool)meterTool.addEventListener('click',()=>{
    voltageLab.open=true;
    window.wmPickMeter?.();
  });
  const reset = document.getElementById('reset');
  if (reset) {
    reset.textContent = 'Restart practice';
    reset.id = 'reset';
    dock.append(reset);
  }
  // These still exist for internal simulator code, but no longer form part of
  // the lock-placement exercise. No step sequence or progress gate is shown.
  aside.hidden = true;

  const hint = document.getElementById('wmHint');
  if (hint) hint.textContent = 'Hand: operate handle and door · Lock: tap the marked point · Meter: test terminals';

  // No other controls or step overlays are allowed to cover the rendered cabinet.
  const style = document.createElement('style');
  style.id = 'wmPlacementOnlyLayout';
  style.textContent = `
  body{overflow-x:hidden}
  main{display:flex!important;flex-direction:column!important;max-width:1100px;margin:0 auto;min-height:0!important}
  #scene{height:clamp(380px,60dvh,700px)!important;overflow:hidden;position:relative}
  #scene>#controls,#scene>#wmHud,#scene>#disconnectTouchUI,#scene>#wmTouchPanel{display:none!important}
  #disconnectTouchUI,#wmTouchPanel{display:none!important}
  #wmDock{display:flex;flex-direction:column;gap:5px;padding:8px;background:#10283c;color:#f3f8ff}
  #wmPracticeTitle{display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px;font-size:13px}
  #wmPracticeTitle strong{font-size:14px;color:#b8e7ff}
  #message{display:block;min-height:0!important;margin:0!important;padding:8px 10px!important;border-radius:7px!important;font-size:13px!important}
  #wmDock #controls{display:flex!important;position:static!important;flex-wrap:wrap;gap:4px;max-width:none!important;padding:0!important;background:transparent!important}
  #wmDock #controls button{flex:1 1 70px;min-width:0;min-height:40px;margin:0;padding:7px 3px;font-size:12px!important}
  #wmDock #wmHud{position:static!important;display:flex!important;align-items:center;gap:8px;pointer-events:auto!important;background:transparent!important;padding:0!important;flex-direction:row!important}
  #wmDock #wmHint{display:none!important}
  #wmDock #wmJoy{position:relative!important;left:auto!important;top:auto!important;bottom:auto!important;right:auto!important;transform:none!important;flex:0 0 78px;width:78px!important;height:78px!important;touch-action:none}
  #wmDock #wmKnob{left:24px!important;top:24px!important;width:26px!important;height:26px!important}
  #wmDock #wmTools{display:flex!important;position:static!important;max-width:none!important;gap:5px;flex:1;justify-content:flex-end;flex-wrap:wrap;transform:none!important}
  #wmDock #wmTools button{flex:1 1 75px;min-height:44px;font-size:12px!important;min-width:0}
  #wmDoorActions{display:flex;gap:6px;flex-wrap:wrap}
  #wmDoorActions button{flex:1;min-height:44px;font-size:13px;margin:0!important}
  #wmVoltageLab{padding:7px;border:1px solid #527b98;border-radius:8px;background:#162f43}
  #wmVoltageLab summary{padding:7px 4px;cursor:pointer;font-weight:700;color:#dbecff}
  #wmVoltageLab button{min-height:42px}
  #wmVoltageLab select{min-height:42px;max-width:100%;background:#e9f0f4;color:#152638;border:1px solid #7894a9;border-radius:6px;padding:4px;font:inherit}
  #wmVoltageLab label{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;margin:7px 0}
  #wmVoltageLab #meterPanel{margin-top:8px!important}
  .wmSafetyNote{font-size:12px;line-height:1.35;color:#ffd991;margin:4px 1px}
  #wmDock #immersiveMeter{position:static!important;inset:auto!important;transform:none!important;width:auto!important;max-width:none!important;margin:7px 0!important}
  #wmDock #immersiveMeter.active{display:block!important}
  #wmDock #immersiveMeter .meterActions{gap:6px}
  #wmDock #immersiveMeter .meterActions button{min-height:40px;flex:1}
  #wmDock #wmHand,#wmDock #wmCarry{display:none!important}
  #wmDock #reset{align-self:end;min-height:38px;font-size:12px!important;margin:0!important;padding:7px 12px!important}
  aside[hidden]{display:none!important}
  @media(max-width:700px){#scene{height:49dvh!important;min-height:310px!important}#wmDock{padding:6px}#wmDock #wmJoy{flex-basis:68px;width:68px!important;height:68px!important}#wmDock #wmKnob{left:20px!important;top:20px!important;width:24px!important;height:24px!important}#wmDock #wmTools button{font-size:11px!important;padding:7px 4px!important}#wmPracticeTitle{font-size:12px}}
  `;
  document.head.append(style);
});

/* Guided procedure bridge: retains all existing 3D controls and their handlers.
   Only observed actions are recorded; checklist never certifies a voltage test
   based solely on entering the meter panel. */
window.addEventListener('load',()=>{
 if(!new URLSearchParams(location.search).has('guided'))return;
 const KEY='wm-loto-session-v1';
 const session=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}};
 function record(id){const s=session();s.events=Array.isArray(s.events)?s.events:[];if(!s.events.includes(id)){s.events.push(id);localStorage.setItem(KEY,JSON.stringify(s))}status();}
 const dock=document.getElementById('wmDock');if(!dock)return;
 const nav=document.createElement('div');nav.style.cssText='padding:9px;border:1px solid #527b98;border-radius:9px;background:#15374f;display:flex;flex-wrap:wrap;align-items:center;gap:8px';
 nav.innerHTML='<strong>Guided LOTO session</strong><span id="wmGuideStatus" style="flex:1;font-size:12px"></span><a href="/loto-procedure.html" style="background:#1774ad;color:white;padding:10px;border-radius:8px">← Return to checklist</a>';
 dock.prepend(nav);
 function status(){const s=session(),events=s.events||[];document.getElementById('wmGuideStatus').textContent=['off','lock','door','meter'].filter(x=>events.includes(x)).length+'/4 physical milestones recorded · complete required meter tests before return';}
 status();
 const msg=document.getElementById('message');if(msg){const obs=new MutationObserver(()=>{const t=msg.textContent.toLowerCase();if(/disconnect off/.test(t))record('off');if(/cabinet open|door open/.test(t))record('door');if(/lock.*placed|hasp.*placed|tag.*placed/.test(t)){const s=session();s.hardware=s.hardware||[];if(/lock.*placed/.test(t))s.hardware.push('lock');if(/hasp.*placed/.test(t))s.hardware.push('hasp');if(/tag.*placed/.test(t))s.hardware.push('tag');s.hardware=[...new Set(s.hardware)];localStorage.setItem(KEY,JSON.stringify(s));if(['lock','hasp','tag'].every(x=>s.hardware.includes(x)))record('lock')}});obs.observe(msg,{childList:true,characterData:true,subtree:true})}
 const probe=document.getElementById('probeStatus');if(probe){const obs=new MutationObserver(()=>{const t=probe.textContent.toLowerCase();if(/reprov|re-verif|recheck/.test(t)&&/meter|known|live/.test(t))record('meter')});obs.observe(probe,{childList:true,characterData:true,subtree:true})}
});
