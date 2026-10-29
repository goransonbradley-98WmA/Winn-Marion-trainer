/* Run with Playwright installed: node tests/browser-regression.cjs
 * Optional: PLAYWRIGHT_MODULE, BROWSER_CHANNEL, TEST_BASE_URL.
 * Uses an isolated browser context; never reads personal browser storage.
 */
let playwright;
try { playwright=require(process.env.PLAYWRIGHT_MODULE||'playwright'); }
catch { playwright=require('C:/Users/Brad_Goranson/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'); }
const http=require('http'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{
 const server=http.createServer((req,res)=>{
  const p=path.resolve(process.cwd(),'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));
  if(!p.startsWith(process.cwd()+path.sep)){res.writeHead(403).end();return}
  fs.readFile(p,(err,data)=>{if(err){res.writeHead(404).end();return}res.setHeader('Content-Type',p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':'text/html');res.end(data)});
 }).listen(8765,'127.0.0.1');
 let browser;
 try {
  browser=await playwright.chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
  const base=process.env.TEST_BASE_URL||'http://127.0.0.1:8765';
  for(const mobile of [false,true]){
   const context=await browser.newContext(mobile?{viewport:{width:390,height:844},isMobile:true,hasTouch:true}:{viewport:{width:1440,height:1000}});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   for(const name of ['motor','basic-wiring']){
    await page.goto(base+'/'+name+'.html');
    await page.locator('#test').click();
    assert.equal(await page.locator('#motorOutcome').getAttribute('data-state'),'failed');
    assert.equal(await page.locator('.failure-scene').isVisible(),true);
    assert.equal(await page.locator('.rotor').evaluate(e=>getComputedStyle(e).animationName),'none');
    await page.evaluate(basic=>{
     wires=(basic?[['L1','2:L'],['2:R','3:L'],['3:R','L2']]:[['L1','1:L'],['1:R','2:L'],['2:R','3:L'],['3:R','L2'],['1:R','4:L'],['4:R','3:L']]).map(([a,b])=>({a,b}));draw();
    },name==='basic-wiring');
    await page.locator('#test').click();
    assert.equal(await page.locator('#motorOutcome').getAttribute('data-state'),'running');
    assert.equal(await page.locator('.rotor').evaluate(e=>getComputedStyle(e).animationName),'motor-spin');
    await page.locator('#saveCircuit').click();
    await page.locator('#reset').click();
    assert.equal(await page.locator('#motorOutcome').getAttribute('data-state'),'idle');
    await page.locator('#loadCircuit').click();
    await page.locator('#test').click();
    assert.equal(await page.locator('#motorOutcome').getAttribute('data-state'),'running');
    await page.locator('#undo').click();
    assert.equal(await page.locator('#motorOutcome').getAttribute('data-state'),'idle');
    await page.evaluate(()=>{wires.push({a:'L1',b:'L2'});draw()});
    await page.locator('#test').click();
    assert.equal(await page.locator('#motorOutcome').getAttribute('data-state'),'failed');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.locator('#reset').click();
    await page.locator('[data-mode="wire"]').click();
    const source=page.locator('[data-terminal="L1"]');
    const target=page.locator('[data-terminal="2:L"]');
    if(mobile){await source.tap();await target.tap();}
    else {
     await source.scrollIntoViewIfNeeded();
     const a=await source.boundingBox(),b=await target.boundingBox();
     await page.mouse.move(a.x+a.width/2,a.y+a.height/2);await page.mouse.down();
     await page.mouse.move(b.x+b.width/2,b.y+b.height/2,{steps:12});await page.mouse.up();
     assert.equal(await page.evaluate(()=>wires[0].points.length>2),true);
    }
    assert.equal(await page.evaluate(()=>wires.length),1);
    await page.locator('#saveCircuit').click();
    const hit=page.locator('.wire-hit');
    await page.locator('#deleteWire').click();
    // Click an interior point on the wire hit target, away from terminals.
    const pt=await hit.evaluate(e=>{const p=e.getPointAtLength(e.getTotalLength()*.2),m=e.getScreenCTM();return {x:m.a*p.x+m.c*p.y+m.e,y:m.b*p.x+m.d*p.y+m.f}});
    if(mobile)await page.touchscreen.tap(pt.x,pt.y);else await page.mouse.click(pt.x,pt.y);
    assert.equal(await page.evaluate(()=>wires.length),0);
    await page.locator('#loadCircuit').click();
    assert.equal(await page.evaluate(()=>wires.length),1);
    for(const mode of ['pan','device']){await page.locator(`[data-mode="${mode}"]`).click();assert.equal(await page.locator(`[data-mode="${mode}"]`).getAttribute('aria-pressed'),'true');assert.equal(await page.locator('#deleteWire').getAttribute('aria-pressed'),'false');}
    await page.locator('#test').click();
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.screenshot({path:`tests/${name}-${mobile?'mobile':'desktop'}.png`,fullPage:true});
    console.log(`${name} ${mobile?'mobile':'desktop'}: outcome, save/load, undo, invalidation, short, wire drawing/deletion, modes and width passed`);
   }
   await page.goto(base+'/index.html#trainers');
   await page.locator('a[href="#course/basic-wiring"]').first().click();
   await page.locator('a[href="basic-wiring.html"]').first().waitFor();
   assert.deepEqual(errors,[]);await context.close();
  }
  console.log('Browser tests passed; no page errors. Physical Samsung testing remains outstanding.');
 } finally {await browser?.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});

