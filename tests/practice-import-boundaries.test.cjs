/* Run: node --test tests/practice-import-boundaries.test.cjs
 * Additional read-only importer boundaries; no rendered browser or Samsung verification.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const {parseBundle} = require('../practice-import.js');
const bundle = () => ({
  format:'wm-training-practice-bundle-v1',source:'browser-local',verified:false,
  exportedAt:'2026-11-14T20:00:00Z',trainers:{
    'motor-controls':{format:'wm-motor-practice-v1',attempts:[]},
    'basic-wiring':{format:'wm-basic-practice-v1',attempts:[]}
  }
});
test('caps recent instructor view at ten, newest first, without altering totals',()=>{
  const b=bundle();
  b.trainers['motor-controls'].attempts=Array.from({length:12},(_,i)=>({result:i%2?'fail':'pass',reason:`attempt-${i}`}));
  const d=parseBundle(b).trainers[0];
  assert.equal(d.total,12);assert.equal(d.passed,6);assert.equal(d.failed,6);assert.equal(d.rate,50);
  assert.equal(d.attempts.length,10);assert.equal(d.attempts[0].reason,'attempt-11');
  assert.equal(d.attempts[9].reason,'attempt-2');
});
test('keeps independent trainer histories and pass rates',()=>{
  const b=bundle();
  b.trainers['motor-controls'].attempts=[{result:'pass'},{result:'fail'},{result:'pass'}];
  b.trainers['basic-wiring'].attempts=[{result:'fail'},{result:'fail'}];
  const d=parseBundle(b);
  assert.deepEqual(d.trainers.map(x=>[x.id,x.total,x.passed,x.rate]),[
    ['motor-controls',3,2,67],['basic-wiring',2,0,0]
  ]);
});
test('sanitizes malformed attempt dates and limits reason text without mutating input',()=>{
  const b=bundle();const reason='X'.repeat(200);
  b.trainers['basic-wiring'].attempts=[{result:'fail',at:'not-a-date',reason}];
  const before=JSON.stringify(b),d=parseBundle(b).trainers[1].attempts[0];
  assert.equal(d.at,null);assert.equal(d.reason.length,120);assert.equal(JSON.stringify(b),before);
});
