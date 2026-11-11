/* Dependency-free regression checks for the browser-local practice dashboard.
 * Run from the repository root: node --test tests/student-progress.test.cjs
 * Tests execute the real inline script with an isolated simulated DOM, not a browser.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const html=fs.readFileSync(path.join(__dirname,'..','student-progress.html'),'utf8');
const match=html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match,'Dashboard inline script must exist');
const script=match[1];

function boot(initial={}){
 const records=new Map(Object.entries(initial).map(([key,value])=>[key,typeof value==='string'?value:JSON.stringify(value)]));
 const elements=new Map();
 let lastBlob=null,download=null;
 class Element{
  constructor(tag){this.tag=tag;this.children=[];this.handlers={};this.style={};this.textContent='';}
  append(...children){this.children.push(...children)}
  appendChild(child){this.append(child)}
  replaceChildren(...children){this.children=children}
  addEventListener(type,handler){this.handlers[type]=handler}
  click(){if(this.tag==='a')download={filename:this.download,href:this.href};else if(this.handlers.click)this.handlers.click()}
  remove(){}
 }
 const document={
  body:new Element('body'),hidden:false,
  getElementById(id){if(!elements.has(id))elements.set(id,new Element('div'));return elements.get(id)},
  createElement(tag){return new Element(tag)},
  addEventListener(){}
 };
 const listeners={};
 const window={addEventListener(type,handler){listeners[type]=handler}};
 const localStorage={
  getItem(key){return records.has(key)?records.get(key):null},
  setItem(){throw new Error('Dashboard must not write practice storage')},
  removeItem(){throw new Error('Dashboard must not delete practice storage')}
 };
 class FakeBlob{constructor(parts){this.text=parts.join('')}}
 const URL={createObjectURL(blob){lastBlob=blob;return 'blob:practice-test'},revokeObjectURL(){}};
 vm.runInNewContext(script,{document,window,localStorage,Blob:FakeBlob,URL,setTimeout(){}},{timeout:2000});
 return {
  records,
  click(id){document.getElementById(id).click()},
  text(id){return document.getElementById(id).textContent},
  payload(){return lastBlob?JSON.parse(lastBlob.text):null},
  download(){return download},
  refresh(){listeners.pageshow()}
 };
}
const motor='wm-training-motor-attempts-v1';
const basic='wm-training-basic-attempts-v1';
const motorWorkspace='wm-training-motor-workspace-v1';
const basicWorkspace='wm-training-basic-workspace-v1';

test('combined export separates trainers, filters invalid attempts, and caps each at 200',()=>{
 const motorAttempts=Array.from({length:205},(_,i)=>({result:i%2?'pass':'fail',signature:'m'+i}));
 const basicAttempts=[{result:'pass',signature:'b1'},null,{result:'other'},{result:'fail',signature:'b2'}];
 const app=boot({[motor]:motorAttempts,[basic]:basicAttempts});
 app.click('exportAllPractice');
 const bundle=app.payload();
 assert.equal(bundle.format,'wm-training-practice-bundle-v1');
 assert.equal(bundle.source,'browser-local');
 assert.equal(bundle.verified,false);
 assert.equal(bundle.trainers['motor-controls'].format,'wm-motor-practice-v1');
 assert.equal(bundle.trainers['basic-wiring'].format,'wm-basic-practice-v1');
 assert.equal(bundle.trainers['motor-controls'].attempts.length,200);
 assert.equal(bundle.trainers['motor-controls'].attempts[0].signature,'m5');
 assert.deepEqual(JSON.parse(JSON.stringify(bundle.trainers['basic-wiring'].attempts)),[basicAttempts[0],basicAttempts[3]]);
 assert.match(app.download().filename,/^wm-training-practice-\d{4}-\d{2}-\d{2}\.json$/);
 assert.equal(app.records.get(motor),JSON.stringify(motorAttempts));
});
test('malformed motor history blocks combined export without hiding valid basic totals',()=>{
 const app=boot({[motor]:'{bad json',[basic]:[{result:'pass'}]});
 assert.equal(app.text('basicTotal'),'1');
 app.click('exportAllPractice');
 assert.equal(app.payload(),null);
 assert.match(app.text('allExportStatus'),/Unable to export both trainers/);
});
test('non-array basic history blocks combined export instead of silently omitting it',()=>{
 const app=boot({[motor]:[{result:'pass'}],[basic]:{attempts:[]}});
 app.click('exportAllPractice');
 assert.equal(app.payload(),null);
 assert.match(app.text('allExportStatus'),/invalid data/);
});
test('empty histories produce an explicitly unverified two-trainer bundle',()=>{
 const app=boot();
 app.click('exportAllPractice');
 const bundle=app.payload();
 assert.equal(bundle.verified,false);
 assert.equal(bundle.trainers['motor-controls'].attempts.length,0);
 assert.equal(bundle.trainers['basic-wiring'].attempts.length,0);
});
test('legacy individual motor export remains available and separate',()=>{
 const app=boot({[motor]:[{result:'pass'}],[basic]:[{result:'fail'}]});
 app.click('exportPractice');
 assert.equal(app.payload().format,'wm-motor-practice-v1');
 assert.equal(app.payload().attempts.length,1);
 assert.equal(app.payload().trainers,undefined);
 assert.match(app.download().filename,/^wm-motor-practice-/);
});
test('legacy individual basic export remains available and separate',()=>{
 const app=boot({[motor]:[{result:'pass'}],[basic]:[{result:'fail'}]});
 app.click('exportBasicPractice');
 assert.equal(app.payload().format,'wm-basic-practice-v1');
 assert.equal(app.payload().trainer,'basic-wiring');
 assert.equal(app.payload().attempts[0].result,'fail');
 assert.match(app.download().filename,/^wm-basic-practice-/);
});
test('corrupt saved workspaces do not hide otherwise valid practice histories',()=>{
 const app=boot({[motor]:[{result:'pass'}],[basic]:[{result:'fail'}],[motorWorkspace]:'{bad',[basicWorkspace]:'{bad'});
 assert.equal(app.text('total'),'1');
 assert.equal(app.text('basicTotal'),'1');
 assert.match(app.text('workspace'),/could not be read/);
 assert.match(app.text('basicWorkspace'),/could not be read/);
});
test('pageshow refresh reads new local attempts without rewriting stored records',()=>{
 const app=boot();
 assert.equal(app.text('total'),'0');
 app.records.set(motor,JSON.stringify([{result:'pass',signature:'updated'}]));
 app.refresh();
 assert.equal(app.text('total'),'1');
 assert.equal(app.text('passes'),'1');
 assert.equal(app.text('unique'),'1');
});