const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('static/js/app.js', 'utf8');
const code = source.slice(source.indexOf('  var ATTR_KEY'), source.indexOf('  /* ---- the enquiry form'));
const values = new Map();
const storage = { getItem: k => values.get(k) || null, setItem: (k,v) => values.set(k,v), removeItem: k => values.delete(k) };
let now = 10000000;
function visit(search, sessionStorage = storage) {
  const context = { URLSearchParams, location: {search}, sessionStorage, Date: {now: () => now} };
  vm.createContext(context);
  vm.runInContext(code, context);
  return JSON.parse(JSON.stringify(context.utm()));
}
const facebook = {utm_source:'facebook',utm_medium:'paid_social',utm_campaign:'trial'};
assert.deepEqual(visit('?utm_source=facebook&utm_medium=paid_social&utm_campaign=trial'), facebook);
assert.deepEqual(visit(''), facebook, 'cross-page navigation retains campaign');
assert.deepEqual(visit('?gclid=google-click'), {gclid:'google-click'}, 'new campaign replaces every old field');
assert.deepEqual(visit(''), {gclid:'google-click'});
assert.deepEqual(visit('?utm_source=facebook'), {utm_source:'facebook'}, 'Meta must not inherit old gclid');
now += 30*60*1000;
assert.deepEqual(visit(''), {}, 'expired campaign is cleared');
values.set('koala_campaign_attribution_v1', '{bad');
assert.deepEqual(visit(''), {}, 'corrupt storage is harmless');
const blocked = {getItem(){throw Error('blocked')},setItem(){throw Error('blocked')},removeItem(){throw Error('blocked')}};
assert.deepEqual(visit('?utm_campaign=test', blocked), {utm_campaign:'test'});
assert.deepEqual(visit('', blocked), {});
assert.equal(visit('?utm_campaign='+'x'.repeat(1000)).utm_campaign.length,500);
assert.deepEqual(visit('', {getItem:()=>null,removeItem(){}}), {}, 'new tab has no stored attribution');
console.log('PASS: attribution retention, replacement, expiry, blocked/corrupt storage, bounds and tab isolation');

