/* Run: node --test tests/practice-import-limits.test.cjs */
const test = require('node:test');
const assert = require('node:assert/strict');
const {parseBundle} = require('../practice-import.js');
function bundle() { return {
  format:'wm-training-practice-bundle-v1', source:'browser-local', verified:false,
  exportedAt:'2026-11-15T20:00:00Z', trainers:{
    'motor-controls':{format:'wm-motor-practice-v1',attempts:[]},
    'basic-wiring':{format:'wm-basic-practice-v1',attempts:[]}
  }
}; }
for (const id of ['motor-controls','basic-wiring']) {
  test(`${id} accepts exactly 200 attempts and retains full totals`,()=>{
    const b=bundle();
    b.trainers[id].attempts=Array.from({length:200},(_,i)=>({result:i%2?'fail':'pass',reason:`attempt-${i}`}));
    const before=JSON.stringify(b),record=parseBundle(b).trainers.find(t=>t.id===id);
    assert.equal(record.total,200);
    assert.equal(record.passed,100);
    assert.equal(record.failed,100);
    assert.equal(record.attempts.length,10);
    assert.equal(record.attempts[0].reason,'attempt-199');
    assert.equal(JSON.stringify(b),before);
  });
  test(`${id} rejects 201 attempts rather than truncating imported evidence`,()=>{
    const b=bundle();
    b.trainers[id].attempts=Array.from({length:201},()=>({result:'pass'}));
    assert.throws(()=>parseBundle(b),/200-attempt export limit/);
  });
}
