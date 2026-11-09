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

// Saved/imported circuit IDs must match the positive integer IDs issued by the trainer.
for(const [label,kind,id] of [
 ['zero switch ID','start',0],
 ['negative switch ID','start',-1],
 ['zero load ID','coil',0],
 ['negative load ID','coil',-3],
])test(label+' cannot pass a complete circuit',()=>{
 const devices=[{id:kind==='start'?id:2,type:'start'},{id:kind==='coil'?id:3,type:'coil'}];
 const wires=w(['L1',devices[0].id+':L'],[devices[0].id+':R',devices[1].id+':L'],[devices[1].id+':R','L2']);
 assert.equal(evaluate(devices,wires).result,'fail');
});

test('reversed endpoints on all basic wires still pass',()=>assert.equal(evaluate(d,good().map(edge=>({a:edge.b,b:edge.a}))).result,'pass'));
test('duplicate basic wire does not fail a correct circuit',()=>assert.equal(evaluate(d,[...good(),{...good()[0]}]).result,'pass'));
test('switch-closed supply short is rejected',()=>assert.equal(evaluate(d,[...good(),{a:'2:R',b:'L2'}]).result,'fail'));
test('invalid extra wire does not pass',()=>assert.equal(evaluate(d,[...good(),{a:'L1',b:'77:R'}]).result,'fail'));
test('basic evaluation does not mutate the saved circuit',()=>{
 const devices=d.map(x=>({...x})),edges=good(),before=JSON.stringify([devices,edges]);
 evaluate(devices,edges);assert.equal(JSON.stringify([devices,edges]),before);
});
