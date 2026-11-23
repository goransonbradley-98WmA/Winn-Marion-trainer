'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {isValidWorkspace,appendFreehandPoint}=require('../saved-circuit-validation.js');

const basic=()=>({version:1,devices:[{id:2,type:'start',x:225,y:180},{id:3,type:'coil',x:445,y:180}],wires:[{a:'L1',b:'2:L'},{a:'2:R',b:'3:L'},{a:'3:R',b:'L2'}]});
const motor=()=>({version:1,devices:[{id:1,type:'stop',x:225,y:180},{id:2,type:'start',x:445,y:180},{id:3,type:'coil',x:705,y:180},{id:4,type:'aux',x:445,y:330}],wires:[{a:'L1',b:'1:L'},{a:'1:R',b:'2:L'},{a:'2:R',b:'3:L'},{a:'3:R',b:'L2'},{a:'1:R',b:'4:L'},{a:'4:R',b:'3:L'}]});

test('accepts a normal Basic Wiring saved circuit',()=>assert.equal(isValidWorkspace(basic()),true));
test('accepts a normal Motor Controls saved circuit',()=>assert.equal(isValidWorkspace(motor()),true));
test('accepts freehand points and reversed wire endpoints',()=>{const s=basic();s.wires[0]={a:'2:L',b:'L1',points:[{x:100,y:120},{x:150,y:120}]};assert.equal(isValidWorkspace(s),true)});
test('rejects a wire connected to a nonexistent device terminal',()=>{const s=basic();s.wires[1].b='99:L';assert.equal(isValidWorkspace(s),false)});
test('rejects a wire connected to a nonexistent source terminal',()=>{const s=basic();s.wires[0].a='L3';assert.equal(isValidWorkspace(s),false)});
test('rejects a wire connected to itself',()=>{const s=basic();s.wires[0].b=s.wires[0].a;assert.equal(isValidWorkspace(s),false)});
test('rejects duplicate device IDs',()=>{const s=basic();s.devices[1].id=s.devices[0].id;assert.equal(isValidWorkspace(s),false)});
test('rejects non-positive and fractional device IDs',()=>{for(const id of [0,-1,1.5,Number.MAX_SAFE_INTEGER+1]){const s=basic();s.devices[0].id=id;assert.equal(isValidWorkspace(s),false)}});
test('rejects missing and sparse device entries',()=>{const s=basic();delete s.devices[0];assert.equal(isValidWorkspace(s),false)});
test('rejects missing and sparse wire entries',()=>{const s=basic();delete s.wires[1];assert.equal(isValidWorkspace(s),false)});
test('rejects malformed freehand point entries including sparse slots',()=>{for(const mutate of [s=>{s.wires[0].points=[{x:1,y:2},null]},s=>{s.wires[0].points=new Array(2);s.wires[0].points[1]={x:1,y:2}}]){const s=basic();mutate(s);assert.equal(isValidWorkspace(s),false)}});
test('rejects non-finite freehand coordinates',()=>{const s=basic();s.wires[0].points=[{x:Infinity,y:2}];assert.equal(isValidWorkspace(s),false)});
test('rejects unsupported schema and oversized arrays',()=>{const old=basic();old.version=2;assert.equal(isValidWorkspace(old),false);const devices=basic();devices.devices=Array.from({length:101},(_,i)=>({id:i+1,type:'start',x:0,y:0}));assert.equal(isValidWorkspace(devices),false);const wires=basic();wires.wires=Array.from({length:501},()=>({a:'L1',b:'L2'}));assert.equal(isValidWorkspace(wires),false)});
test('does not mutate valid saved workspaces',()=>{const s=basic(),before=JSON.stringify(s);isValidWorkspace(s);assert.equal(JSON.stringify(s),before)});

test('accepts a normal saved viewport',()=>{const s=basic();s.view={x:0,y:0,w:900,h:480};assert.equal(isValidWorkspace(s),true)});
test('accepts legacy version-1 workspace without saved viewport',()=>assert.equal(isValidWorkspace(basic()),true));
test('rejects a viewport with non-finite coordinates or dimensions',()=>{for(const key of ['x','y','w','h']){const s=basic();s.view={x:0,y:0,w:900,h:480};s.view[key]=Infinity;assert.equal(isValidWorkspace(s),false,key)}});
test('rejects zero or negative viewport height',()=>{for(const h of [0,-1]){const s=basic();s.view={x:0,y:0,w:900,h};assert.equal(isValidWorkspace(s),false)}});
test('rejects viewport dimensions that do not match the trainer aspect ratio',()=>{const s=basic();s.view={x:0,y:0,w:900,h:900};assert.equal(isValidWorkspace(s),false)});
test('rejects viewport width outside supported zoom limits',()=>{for(const w of [259,1801]){const s=basic();s.view={x:0,y:0,w,h:w*480/900};assert.equal(isValidWorkspace(s),false)}});
test('rejects a malformed viewport object',()=>{for(const view of [null,[], 'bad']){const s=basic();s.view=view;assert.equal(isValidWorkspace(s),false)}});

test('rejects finite but extreme viewport origins',()=>{
  for(const [key,value] of [['x',1000001],['x',-1000001],['y',1e308]]){
    const s=basic();s.view={x:0,y:0,w:900,h:480};s.view[key]=value;
    assert.equal(isValidWorkspace(s),false);
  }
});
test('rejects finite but extreme device positions',()=>{
  for(const [key,value] of [['x',1000001],['y',-1000001]]){
    const s=basic();s.devices[0][key]=value;
    assert.equal(isValidWorkspace(s),false);
  }
});
test('rejects finite but extreme freehand points',()=>{
  const s=basic();s.wires[0].points=[{x:1e308,y:2}];
  assert.equal(isValidWorkspace(s),false);
});
test('accepts coordinates at the generous safety boundary',()=>{
  const s=basic();s.view={x:1000000,y:-1000000,w:900,h:480};
  s.devices[0].x=1000000;s.wires[0].points=[{x:-1000000,y:1000000}];
  assert.equal(isValidWorkspace(s),true);
});

test('appends freehand samples only after the existing five-unit spacing threshold',()=>{
  const points=[{x:0,y:0}];
  assert.equal(appendFreehandPoint(points,{x:3,y:4}),false);
  assert.equal(appendFreehandPoint(points,{x:6.4,y:0}),true);
  assert.deepEqual(points,[{x:0,y:0},{x:6,y:0}]);
});
test('caps a freehand gesture at the maximum point count accepted by saved-workspace validation',()=>{
  const points=Array.from({length:2998},(_,i)=>({x:i,y:0}));
  assert.equal(appendFreehandPoint(points,{x:3003,y:0}),true);
  assert.equal(points.length,2999);
  assert.equal(appendFreehandPoint(points,{x:3010,y:0}),false);
  const s=basic();s.wires[0].points=points;
  assert.equal(isValidWorkspace(s),true);
});
test('does not append non-finite or out-of-range freehand samples',()=>{
  const points=[{x:0,y:0}];
  assert.equal(appendFreehandPoint(points,{x:Infinity,y:10}),false);
  assert.equal(appendFreehandPoint(points,{x:1000001,y:10}),false);
  assert.deepEqual(points,[{x:0,y:0}]);
});
