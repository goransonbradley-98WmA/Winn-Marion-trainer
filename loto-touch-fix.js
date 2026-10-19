/* Winn-Marion LOTO: touch-first controls, independent of WebGL raycasting. */
(()=>{'use strict';
const root=document.getElementById('scene');if(!root)return;
const css=document.createElement('style');
css.textContent=`
#disconnectTouchUI{display:none!important}
#wmTouchPanel{position:absolute;z-index:50;top:12px;left:12px;width:min(260px,57%);padding:8px;background:#10283ceF;border:1px solid #89b9d3;border-radius:12px;display:grid;gap:6px;box-sizing:border-box;color:white;font:12px system-ui}
#wmTouchPanel button{display:block;width:100%;margin:0;min-height:46px;background:#176b9c;border:2px solid #92cde9;border-radius:8px;padding:8px 4px;color:white;font-size:13px;touch-action:manipulation;cursor:pointer}
#wmTouchPanel button:active{background:#268cbd}
#wmTouchPanel .wmPlaced{opacity:.35;padding:4px 7px;border:1px solid #a5b7c2;border-radius:6px}
#wmTouchPanel .wmPlaced.yes{opacity:1;background:#206e46;border-color:#9af0b4}
#wmTouchPanel .wmItems{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}
#wmTouchPanel #wmTouchStatus{font-size:12px;line-height:1.3;min-height:30px;color:#f4e2aa}
@media(max-width:600px){#wmTouchPanel{top:10px;left:8px;width:min(235px,54%);padding:5px;gap:4px}#wmTouchPanel button{font-size:11px;min-height:40px}}
`;document.head.append(css);
const panel=document.createElement('section');panel.id='wmTouchPanel';panel.setAttribute('aria-label','LOTO touch controls');
panel.innerHTML='<button type="button" id="wmTouchDisconnect">✋ Operate disconnect</button><button type="button" id="wmTouchPlace">⛓ Install selected tool</button><div class="wmItems"><span class="wmPlaced" id="wmPlacedHasp">⛓ Hasp</span><span class="wmPlaced" id="wmPlacedLock">🔒 Lock</span><span class="wmPlaced" id="wmPlacedTag">🏷 Tag</span></div><button type="button" id="wmTouchMeter">🔌 Pick up meter</button><div id="wmTouchStatus" role="status" aria-live="polite">Complete preparation and normal stop, then operate the disconnect.</div>';
root.append(panel);
const status=panel.querySelector('#wmTouchStatus');
const flags={hasp:false,lock:false,tag:false};
function report(message){status.textContent=message;const main=document.getElementById('message');if(main)main.textContent=message;}
function refresh(){for(const name of Object.keys(flags))panel.querySelector('#wmPlaced'+name[0].toUpperCase()+name.slice(1)).classList.toggle('yes',flags[name]);const step=window.wmLoto?.step?.();panel.querySelector('#wmTouchDisconnect').textContent=step>=3?'✋ Disconnect is OFF':'✋ Operate disconnect';}
panel.addEventListener('pointerdown',e=>e.stopPropagation());
panel.addEventListener('pointerup',e=>e.stopPropagation());
panel.addEventListener('click',e=>e.stopPropagation());
panel.querySelector('#wmTouchDisconnect').addEventListener('click',()=>{
if(typeof window.wmLotoOperate!=='function'){report('Simulator still loading. Try again.');return}
window.wmLotoOperate();refresh();report(window.wmLoto?.step?.()>=3?'Disconnect switched OFF. Select Hasp and press Install selected tool.':'Complete notification and normal stop first, then operate disconnect.');
});
panel.querySelector('#wmTouchPlace').addEventListener('click',()=>{
const tool=window.wmSelectedTool;
if(!['hasp','lock','tag'].includes(tool)){report('Select Hasp, Lock or Tag from the toolbelt first.');return}
if(typeof window.wmLotoPlace!=='function'){report('Simulator still loading. Try again.');return}
if(!window.wmLotoPlace(tool)){report('Cannot install '+tool+' yet. Disconnect must be OFF; order is Hasp, Lock, Tag.');return}
flags[tool]=true;refresh();report(tool.toUpperCase()+' installed at disconnect handle. Green indicator confirms placement.');
});
panel.querySelector('#wmTouchMeter').addEventListener('click',()=>{
if(typeof window.wmLotoMeter!=='function'){report('Simulator still loading. Try again.');return}
window.wmLotoMeter();report('Meter picked up. Select AC volts and choose red and black probes.');
});
refresh();
})();