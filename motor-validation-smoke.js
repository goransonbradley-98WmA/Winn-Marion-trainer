// Run with: node motor-validation-smoke.js
const m=require('./motor-validation.js');
const d=[{id:1,type:'stop'},{id:2,type:'start'},{id:3,type:'coil'},{id:4,type:'aux'}];
const b=[['L1','1:L'],['1:R','2:L'],['2:R','3:L'],['3:R','L2'],['1:R','4:L'],['4:R','3:L']];
const w=e=>e.map(([a,b])=>({a,b}));
const tests=[
[b,'passed'],
[b.filter(([a,c])=>!a.includes('4:')&&!c.includes('4:')),'missing seal-in'],
[[...b,['L1','L2']],'supply short'],
[[...b,['L1','2:L']],'unsafe stop'],
[b.filter(([a,c])=>!(a==='1:R'&&c==='2:L')),'open circuit']
];
for(const [edges,reason] of tests){const got=m.evaluate(d,w(edges)).reason;if(got!==reason)throw Error(reason+' -> '+got)}
console.log(tests.length+' motor validation smoke tests passed');
