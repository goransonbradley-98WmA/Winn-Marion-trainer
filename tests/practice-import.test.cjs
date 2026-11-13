/* Run: node --test tests/practice-import.test.cjs
 * Pure parser tests; not a rendered browser or physical Samsung test.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const {parseBundle}=require('../practice-import.js');
const valid=()=>({format:'wm-training-practice-bundle-v1',source:'browser-local',verified:false,exportedAt:'2026-11-12T20:00:00.000Z',trainers:{
 'motor-controls':{format:'wm-motor-practice-v1',attempts:[{result:'pass',signature:'a',at:'2026-11-12T20:00:00Z'}]},
 'basic-wiring':{format:'wm-basic-practice-v1',attempts:[{result:'fail',reason:'open switch'}]}
}});
test('separate trainer totals and unverified metadata',()=>{const d=parseBundle(valid());assert.equal(d.verified,false);assert.deepEqual(d.trainers.map(t=>[t.total,t.passed,t.failed]),[[1,1,0],[1,0,1]])});
test('rejects single-trainer export',()=>assert.throws(()=>parseBundle({format:'wm-motor-practice-v1',attempts:[]}),/supported/));
test('rejects claimed verified records',()=>{const b=valid();b.verified=true;assert.throws(()=>parseBundle(b),/unverified/)});
test('rejects unsupported source',()=>{const b=valid();b.source='server';assert.throws(()=>parseBundle(b),/browser-local/)});
test('rejects missing trainer rather than silently dropping it',()=>{const b=valid();delete b.trainers['basic-wiring'];assert.throws(()=>parseBundle(b),/Basic Wiring/)});
test('rejects malformed result',()=>{const b=valid();b.trainers['motor-controls'].attempts[0].result='maybe';assert.throws(()=>parseBundle(b),/attempt/)});
test('rejects more than 200 attempts per trainer',()=>{const b=valid();b.trainers['basic-wiring'].attempts=Array.from({length:201},()=>({result:'pass'}));assert.throws(()=>parseBundle(b),/200-attempt/)});
test('does not mutate imported bundle and treats text as data',()=>{const b=valid();b.trainers['basic-wiring'].attempts[0].reason='<img src=x onerror=alert(1)>';const before=JSON.stringify(b);const d=parseBundle(b);assert.equal(JSON.stringify(b),before);assert.equal(d.trainers[1].attempts[0].reason,'<img src=x onerror=alert(1)>')});
test('handles empty histories without invented pass rates',()=>{const b=valid();b.trainers['motor-controls'].attempts=[];b.trainers['basic-wiring'].attempts=[];const d=parseBundle(b);assert.equal(d.trainers[0].rate,null);assert.equal(d.trainers[1].total,0)});
test('rejects invalid export date',()=>{const b=valid();b.exportedAt='not a date';assert.throws(()=>parseBundle(b),/date/)});
test('does not claim zero distinct circuits when signatures are absent',()=>{const d=parseBundle(valid());assert.equal(d.trainers[1].unique,null);assert.equal(d.trainers[1].signatureCount,0)});
test('does not present partial signature coverage as a complete distinct count',()=>{const b=valid();b.trainers['motor-controls'].attempts.push({result:'fail'});const d=parseBundle(b);assert.equal(d.trainers[0].unique,null);assert.equal(d.trainers[0].signatureCount,1)});
test('counts distinct signatures only with complete coverage',()=>{const b=valid();b.trainers['motor-controls'].attempts.push({result:'fail',signature:'a'});const d=parseBundle(b);assert.equal(d.trainers[0].unique,1);assert.equal(d.trainers[0].signatureCount,2)});
