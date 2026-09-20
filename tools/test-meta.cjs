const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const meta = fs.readFileSync('static/js/meta.js','utf8');
function boot(host='koalacontainers.com.au', nav={}, enabled=true) {
  const requests=[];
  const context={window:{},navigator:nav,location:{hostname:host},document:{
    getElementById:()=>({textContent:JSON.stringify({metaPixel:enabled?'1637872084337781':null})}),
    createElement:()=>({}),head:{appendChild:s=>requests.push(s.src)}
  }};
  vm.createContext(context);vm.runInContext(meta,context);
  return {context,requests,events:()=>JSON.parse(JSON.stringify((context.window.fbq?.queue||[]).map(a=>Array.from(a))))};
}
let b=boot();
assert.deepEqual(b.requests,['https://connect.facebook.net/en_US/fbevents.js']);
assert.deepEqual(b.events(),[['set','autoConfig',false,'1637872084337781'],['init','1637872084337781'],['trackSingle','1637872084337781','PageView']]);
b.context.window.koalaMetaLead();b.context.window.koalaMetaLead();
assert.equal(b.events().filter(e=>e[2]==='Lead').length,1);
assert.equal(b.events().at(-1).length,3,'no form/financial/custom parameters');
vm.runInContext(meta,b.context);assert.equal(b.events().filter(e=>e[2]==='PageView').length,1);
for (const args of [['localhost'],['preview.example.com'],['koalacontainers.com.au',{globalPrivacyControl:true}],['koalacontainers.com.au',{doNotTrack:'1'}],['koalacontainers.com.au',{},false]]) {
  const blocked=boot(...args);assert.equal(blocked.requests.length,0);assert.equal(blocked.events().length,0);
}
const app=fs.readFileSync('static/js/app.js','utf8');
const callback=app.slice(app.indexOf('}).then(function (r) {')+3,app.indexOf('}).catch(bad);')+2);
assert.ok(callback.startsWith('then('));
async function receipt(r) {
  let accepted=0,failed=0,metaCount=0,googleCount=0;
  const s={response:Promise.resolve(r),bad:()=>failed++,ok:j=>{accepted++;if(j.duplicate!==true){metaCount++;googleCount++;}}};
  vm.createContext(s);await vm.runInContext('response.'+callback+'.catch(bad)',s);
  return [accepted,failed,metaCount,googleCount];
}
(async()=>{
  assert.deepEqual(await receipt({ok:true,json:async()=>({success:true,id:'new-id'})}),[1,0,1,1]);
  assert.deepEqual(await receipt({ok:true,json:async()=>({success:true,id:'existing-id',duplicate:true})}),[1,0,0,0]);
  for(const body of [{success:false},{},{success:true},null]) assert.deepEqual(await receipt({ok:true,json:async()=>body}),[0,1,0,0]);
  assert.deepEqual(await receipt({ok:false}),[0,1,0,0]);
  assert.deepEqual(await receipt({ok:true,json:async()=>{throw Error('malformed')}}),[0,1,0,0]);
  const success=app.slice(app.indexOf('function ok(receipt)'),app.indexOf('function bad()'));
  assert.match(success,/if \(receipt\.duplicate !== true\)/);
  assert.match(success,/window\.koalaMetaLead\(\)/);
  console.log('PASS: production-only Pixel; manual events; no matching payload; privacy signals; once-only PageView/Lead; accepted/duplicate/rejected/malformed receipt handling');
})();
