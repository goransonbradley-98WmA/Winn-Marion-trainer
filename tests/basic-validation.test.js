const test=require('node:test'),assert=require('node:assert/strict');
const {evaluate}=require('../basic-validation.js');
const d=[{id:2,type:'start'},{id:3,type:'coil'}];
const w=(...pairs)=>pairs.map(([a,b])=>({a,b}));
const good=()=>w(['L1','2:L'],['2:R','3:L'],['3:R','L2']);
test('correct source switch load passes',()=>assert.equal(evaluate(d,good()).result,'pass'));
test('reversed load and switch order pass',()=>assert.equal(evaluate(d,w(['L1','3:R'],['3:L','2:R'],['2:L','L2'])).result,'pass'));
test('open path fails',()=>assert.equal(evaluate(d,good().slice(1)).result,'fail'));
test('switch bypass fails',()=>assert.equal(evaluate(d,[...good(),{a:'L1',b:'3:L'}]).result,'fail'));
test('load bypass short fails',()=>assert.equal(evaluate(d,[...good(),{a:'3:L',b:'L2'}]).result,'fail'));
test('source short fails',()=>assert.equal(evaluate(d,[...good(),{a:'L1',b:'L2'}]).result,'fail'));
test('malformed wire fails',()=>assert.equal(evaluate(d,[null]).result,'fail'));
test('phantom terminal fails',()=>assert.equal(evaluate(d,[...good(),{a:'99:L',b:'L2'}]).result,'fail'));
test('extra device fails',()=>assert.equal(evaluate([...d,{id:4,type:'aux'}],good()).result,'fail'));
test('duplicate IDs fail',()=>assert.equal(evaluate([{id:2,type:'start'},{id:2,type:'coil'}],good()).result,'fail'));

 // Malformed saved workspaces should fail safely instead of throwing in Test.
for(const [label,devices] of [
 ['null device',[null,{id:3,type:'coil'}]],
 ['null coil',[{id:2,type:'start'},null]],
 ['missing device ID',[{type:'start'},{id:3,type:'coil'}]],
])test(label+' returns fail without throwing',()=>assert.equal(evaluate(devices,good()).result,'fail'));
for(const id of [2.5,Number.MAX_SAFE_INTEGER+1]){
 test('invalid numeric device ID '+id+' cannot pass an otherwise complete circuit',()=>{
  const devices=[{id,type:'start'},{id:3,type:'coil'}];
  const wires=w(['L1',id+':L'],[id+':R','3:L'],['3:R','L2']);
  assert.equal(evaluate(devices,wires).result,'fail');
 });
}
