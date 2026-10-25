/* Run: node --test tests/motor-validation.test.js
 * Reproducible, dependency-free checks of the educational evaluator.
 */
'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {evaluate,signature}=require('../motor-validation.js');
const devices=()=>[{id:1,type:'stop'},{id:2,type:'start'},{id:3,type:'coil'},{id:4,type:'aux'}];
const w=(a,b)=>({a,b});
const normal=()=>[w('L1','1:L'),w('1:R','2:L'),w('2:R','3:L'),w('3:R','L2'),w('1:R','4:L'),w('4:R','3:L')];
function check(name,reason,change){test(name,()=>{const d=devices(),edges=normal();change(d,edges);assert.equal(evaluate(d,edges).reason,reason)})}
test('valid three-wire START, AUX seal-in and STOP',()=>assert.equal(evaluate(devices(),normal()).result,'pass'));
test('reversed coil terminals are valid',()=>{
  const flip=x=>x==='3:L'?'3:R':x==='3:R'?'3:L':x;
  assert.equal(evaluate(devices(),normal().map(e=>w(flip(e.a),flip(e.b)))).result,'pass');
});
test('STOP and START order can be swapped',()=>{
  const edges=[w('L1','2:L'),w('2:R','1:L'),w('1:R','3:L'),w('3:R','L2'),w('L1','4:L'),w('4:R','1:L')];
  assert.equal(evaluate(devices(),edges).result,'pass');
});
check('missing AUX seal-in','missing seal-in',(_d,edges)=>{
  for(let i=edges.length-1;i>=0;i--)if(edges[i].a.startsWith('4:')||edges[i].b.startsWith('4:'))edges.splice(i,1);
});
check('direct L1-L2 short','supply short',(_d,edges)=>edges.push(w('L1','L2')));
check('STOP bypass','unsafe stop',(_d,edges)=>edges.splice(0,edges.length,w('L1','2:L'),w('2:R','3:L'),w('3:R','L2'),w('L1','4:L'),w('4:R','3:L')));
check('unexpected coil energization','unsafe stop',(_d,edges)=>edges.splice(0,edges.length,w('L1','3:L'),w('3:R','L2')));
check('open coil feed','open circuit',(_d,edges)=>{for(let i=edges.length-1;i>=0;i--)if(edges[i].b==='3:L')edges.splice(i,1)});
check('nonexistent terminal','invalid terminal',(_d,edges)=>edges.push(w('99:L','L1')));
check('self-connected wire','invalid terminal',(_d,edges)=>edges.push(w('L1','L1')));
check('duplicate device ID','invalid circuit',d=>d.push({id:1,type:'aux'}));
check('unsupported device type','invalid circuit',d=>d.push({id:5,type:'relay'}));
check('dangling terminal','invalid terminal',(_d,edges)=>edges.push(w('L1','5:R')));
check('deleted coil with dangling wires','invalid terminal',d=>d.splice(2,1));
check('deleted STOP with dangling wires','invalid terminal',d=>d.splice(0,1));
check('multiple coils','multiple coils',d=>d.push({id:5,type:'coil'}));
test('missing coil in an otherwise empty circuit',()=>assert.equal(evaluate(devices().filter(d=>d.type!=='coil'),[]).reason,'missing components'));
test('missing STOP in an otherwise empty circuit',()=>assert.equal(evaluate(devices().filter(d=>d.type!=='stop'),[]).reason,'missing components'));
test('malformed inputs fail safely',()=>{assert.equal(evaluate(null,[]).reason,'invalid circuit');assert.equal(evaluate(devices(),null).reason,'invalid circuit')});
test('wire order and endpoint orientation do not change signature',()=>{
  const d=devices(),edges=normal();
  assert.equal(signature(d,edges),signature(d.slice().reverse(),edges.slice().reverse().map(e=>w(e.b,e.a))));
});
test('evaluation does not mutate circuit',()=>{
  const d=devices(),edges=normal(),before=JSON.stringify([d,edges]);
  evaluate(d,edges);assert.equal(JSON.stringify([d,edges]),before);
});
