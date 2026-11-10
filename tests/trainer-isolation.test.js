/* Run: node --test tests/trainer-isolation.test.js
 * Cross-trainer regression coverage: keep the two educational models independent.
 */
'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const basic=require('../basic-validation.js').evaluate;
const motor=require('../motor-validation.js').evaluate;

const basicDevices=()=>[{id:2,type:'start'},{id:3,type:'coil'}];
const basicWires=()=>[
  {a:'L1',b:'2:L'},{a:'2:R',b:'3:L'},{a:'3:R',b:'L2'}
];
const motorDevices=()=>[
  {id:1,type:'stop'},{id:2,type:'start'},{id:3,type:'coil'},{id:4,type:'aux'}
];
const motorWires=()=>[
  {a:'L1',b:'1:L'},{a:'1:R',b:'2:L'},{a:'2:R',b:'3:L'},
  {a:'3:R',b:'L2'},{a:'1:R',b:'4:L'},{a:'4:R',b:'3:L'}
];

test('valid Basic Wiring circuit still passes its own evaluator',()=>{
  assert.equal(basic(basicDevices(),basicWires()).result,'pass');
});
test('valid Motor Controls circuit still passes its own evaluator',()=>{
  assert.equal(motor(motorDevices(),motorWires()).result,'pass');
});
test('Motor Controls devices are not accepted by Basic Wiring',()=>{
  assert.equal(basic(motorDevices(),motorWires()).result,'fail');
});
test('Basic Wiring devices are not accepted by Motor Controls',()=>{
  assert.equal(motor(basicDevices(),basicWires()).result,'fail');
});
test('Basic Wiring wire topology is not a valid Motor Controls circuit',()=>{
  assert.equal(motor(motorDevices(),basicWires()).result,'fail');
});
test('Motor Controls wire topology is not a valid Basic Wiring circuit',()=>{
  assert.equal(basic(basicDevices(),motorWires()).result,'fail');
});
test('Basic Wiring rejects a terminal from the other trainer',()=>{
  assert.equal(basic(basicDevices(),[...basicWires(),{a:'L1',b:'4:L'}]).result,'fail');
});
test('Motor Controls rejects a nonexistent terminal',()=>{
  assert.equal(motor(motorDevices(),[...motorWires(),{a:'L1',b:'99:R'}]).result,'fail');
});
test('Basic Wiring validation preserves the original saved data',()=>{
  const devices=basicDevices(),wires=basicWires(),before=JSON.stringify([devices,wires]);
  basic(devices,wires);
  assert.equal(JSON.stringify([devices,wires]),before);
});
test('Motor Controls validation preserves the original saved data',()=>{
  const devices=motorDevices(),wires=motorWires(),before=JSON.stringify([devices,wires]);
  motor(devices,wires);
  assert.equal(JSON.stringify([devices,wires]),before);
});
