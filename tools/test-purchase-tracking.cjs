const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/../static/js/app.js','utf8');
const code=source.slice(source.indexOf('  var ATTR_KEY'),source.indexOf('  /* "#quote"'));
const params={utm_source:'google',utm_medium:'cpc',utm_campaign:'123',utm_content:'789',utm_term:'20ft shipping containers',campaignid:'123',adgroupid:'456',adid:'789',network:'g',device:'m',matchtype:'e',gclid:'fixture-only'};
function env(search,storage=new Map(),response={success:true,id:'mock-only'},http=true){
 const calls=[],events=[],forms=[];
 const element=()=>({setAttribute(){},removeAttribute(){},focus(){},scrollIntoView(){},querySelector(){return null;},querySelectorAll(){return[];},parentNode:{insertBefore(){}}});
 for(let n=0;n<2;n++){const f=element();f.fields={name:'Fixture Only',email:'fixture@example.invalid',phone:'0400000000',suburb:'Dalby',size:'20ft',quantity:'1'};f.handlers={};f.addEventListener=(k,h)=>f.handlers[k]=h;f.parentNode={replaceChild(){f.replaced=true;}};f.insertBefore=()=>{};forms.push(f);}
 const c={URLSearchParams,Date,location:{search,pathname:'/buy-20ft-container/'},sessionStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},FormData:class{constructor(f){this.f=f;}forEach(cb){Object.entries(this.f.fields).forEach(([k,v])=>cb(v,k));}},document:{querySelectorAll:q=>q==='form[data-quote]'?forms:[],getElementById:()=>null,createElement:element},CONFIG:{endpoint:'https://fixture.invalid',brand:'KOA',domain:'fixture.invalid',secret:'dummy'},PROMISE:'',PHONE:'',PHONE_HREF:'',EMAIL:'',window:{},setTimeout(){},adsConvert:k=>events.push(k),fetch:async(url,o)=>{calls.push(JSON.parse(o.body));return {ok:http,json:async()=>response};}};
 vm.createContext(c);vm.runInContext(code,c);
 return {c,calls,events,forms,submit:async(f=forms[0])=>{f.handlers.submit({preventDefault(){}});await new Promise(r=>setImmediate(r));}};
}
(async()=>{
 const search='?'+new URLSearchParams(params),st=new Map();
 const a=env(search,st);assert.equal(a.calls.length,0);await a.submit();for(const[k,v]of Object.entries(params))assert.equal(a.calls[0][k],v,k);assert.deepEqual(a.events,['form']);assert.match(a.calls[0].message,/Ad ID: 789/);assert.match(a.calls[0].message,/Ad group ID: 456/);
 const b=env('',st);await b.submit(b.forms[1]);assert.equal(b.calls[0].adid,'789','second form/cross-page');
 for(const click of ['gbraid','wbraid']){const e=env('?'+click+'=fixture-braid');await e.submit();assert.equal(e.calls[0][click],'fixture-braid');assert.match(e.calls[0].message,/Google Ads click/);}
 const meta=env('?utm_source=facebook&utm_medium=paid_social&utm_campaign=meta',st);await meta.submit();assert.equal(meta.calls[0].gclid,null);assert.equal(meta.calls[0].adid,null);assert.equal(meta.calls[0].utm_campaign,'meta');
 const fail=env(search,new Map(),{},false);await fail.submit();assert.deepEqual(fail.events,[]);
 const rejected=env(search,new Map(),{success:false});await rejected.submit();assert.deepEqual(rejected.events,[]);
 const duplicate=env(search,new Map(),{success:true,id:'mock',duplicate:true});await duplicate.submit();assert.deepEqual(duplicate.events,[]);
 const invalid=env(search);invalid.forms[0].fields.email='bad';await invalid.submit();assert.equal(invalid.calls.length,0);
 const organic=env('');await organic.submit();assert.equal(organic.calls[0].utm_source,null);assert.equal(organic.calls[0].adid,null);
 console.log('PASS: full submission payload, both form instances, cross-page retention, braid IDs, campaign replacement, organic, validation failure, server failure/rejection and duplicate conversion protection. All endpoints mocked.');
})().catch(e=>{console.error(e);process.exitCode=1});



