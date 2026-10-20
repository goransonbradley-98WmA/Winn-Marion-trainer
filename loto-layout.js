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
  title.innerHTML = '<strong>Lock placement practice</strong><span>Touch the black disconnect handle to switch OFF. Select Lock, then tap the padlock opening beside the handle. No checklist.</span>';
  dock.append(title);

  // Preserve the simulator's original message element and its event listeners.
  const message = document.getElementById('message');
  if (message) dock.append(message);

  const controls = document.getElementById('controls');
  if (controls) dock.append(controls);
  const hud = document.getElementById('wmHud');
  if (hud) dock.append(hud);

  const reset = document.getElementById('reset');
  if (reset) {
    reset.textContent = 'Restart practice';
    reset.id = 'reset';
    dock.append(reset);
  }
  // These still exist for internal simulator code, but no longer form part of
  // the lock-placement exercise. No step sequence or progress gate is shown.
  aside.hidden = true;

  const meterTool = dock.querySelector('[data-tool="meter"]');
  if (meterTool) meterTool.hidden = true;
  const hint = document.getElementById('wmHint');
  if (hint) hint.textContent = 'Hand: operate disconnect · Lock/Hasp/Tag: touch lockout point';

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
  #wmDock [data-tool="meter"]{display:none!important}
  #wmDock #wmHand,#wmDock #wmCarry{display:none!important}
  #wmDock #reset{align-self:end;min-height:38px;font-size:12px!important;margin:0!important;padding:7px 12px!important}
  aside[hidden]{display:none!important}
  @media(max-width:700px){#scene{height:49dvh!important;min-height:310px!important}#wmDock{padding:6px}#wmDock #wmJoy{flex-basis:68px;width:68px!important;height:68px!important}#wmDock #wmKnob{left:20px!important;top:20px!important;width:24px!important;height:24px!important}#wmDock #wmTools button{font-size:11px!important;padding:7px 4px!important}#wmPracticeTitle{font-size:12px}}
  `;
  document.head.append(style);
});
