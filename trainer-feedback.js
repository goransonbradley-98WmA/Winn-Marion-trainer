/* Original SVG comic artwork; no external image or uploaded asset required. */
(function(){
'use strict';
const panel=document.querySelector('#motorOutcome');if(!panel)return;
panel.innerHTML=`<div class="motor-art" aria-hidden="true"><svg viewBox="0 0 400 190"><g class="smoke"><path d="M160 65q-35-25 0-40t0-25M200 65q35-25 0-40t0-25M240 65q-35-25 0-40t0-25"/></g><g class="motor-case"><rect x="85" y="70" width="210" height="85" rx="22"/><path d="M110 85v55m25-55v55m25-55v55m25-55v55m25-55v55m25-55v55"/><path d="M115 155v15h145v-15"/><rect x="295" y="100" width="60" height="22"/></g><g class="rotor"><circle cx="270" cy="112" r="28"/><path d="M270 88v48m-24-24h48m-41-17l34 34m-34 0l34-34"/></g></svg></div><div><h2 id="outcomeTitle">Motor idle</h2><p id="outcomeDetail">Test your circuit to see the result.</p><div class="failure-scene"><svg viewBox="0 0 160 170" role="img" aria-label="Original comic storybook lord in a red hat, looking displeased"><path fill="#9c2034" d="M20 165l20-60h80l20 60z"/><path fill="#242635" d="M39 45q41-45 82 0v58H39z"/><path fill="#edbd94" d="M49 48h62v52q-31 35-62 0z"/><path fill="#9c2034" d="M25 48L45 10h70l20 38z"/><path fill="#f5ca58" d="M25 42h110v9H25z"/><path stroke="#242635" stroke-width="5" d="M58 68l15 5m14 0l15-5M68 99q12-9 24 0"/><circle cx="68" cy="80" r="3"/><circle cx="93" cy="80" r="3"/><path fill="#f5ca58" d="M65 129h30l-15 20z"/></svg><strong>You don't know the Muffin Man!</strong><p>Our storybook lord demands another attempt. Follow the troubleshooting feedback below.</p></div></div>`;
function show(verdict){const pass=verdict?.result==='pass';panel.dataset.state=verdict?(pass?'running':'failed'):'idle';document.querySelector('#outcomeTitle').textContent=verdict?(pass?'MOTOR RUNNING':'MOTOR STOPPED — CHECK WIRING'):'Motor idle';document.querySelector('#outcomeDetail').textContent=verdict?(pass?'Green motor · rotating shaft · successful circuit test.':'Comic smoke indicates a failed test, not a prediction of physical damage.'):'Circuit changed. Test again before running.';}
window.TrainerFeedback={show};
// Invalidate synchronously before any edit. Also catch programmatic redraws.
const originalDraw=draw;draw=function(){show(null);return originalDraw()};
document.querySelector('#schematic').addEventListener('pointerdown',()=>show(null),true);
show(null);
})();
