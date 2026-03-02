const fs = require('fs');
const path = require('path');

const base = 'C:/Mezzofy/workspace/mz-website/dist';
const en = JSON.parse(fs.readFileSync(path.join(base,'i18n/translations/en.json'),'utf8'));
const tw = JSON.parse(fs.readFileSync(path.join(base,'i18n/translations/zh-TW.json'),'utf8'));
const cn = JSON.parse(fs.readFileSync(path.join(base,'i18n/translations/zh-CN.json'),'utf8'));

function getValue(obj, key) { return key.split('.').reduce(function(o,k){return o&&o[k];}, obj); }
function extractKeys(html) {
  var matches = [];
  var re = /data-i18n(?:-placeholder|-alt)?=["']([^"']+)["']/g;
  var m;
  while ((m = re.exec(html)) !== null) matches.push(m[1]);
  return matches.filter(function(v,i,a){return a.indexOf(v)===i;});
}

var pages = [
  'coupon-management.html',
  'coupon-marketplace.html',
  'coupon-nfc.html',
  'coupon-marketing.html',
  'coupon-wallet.html',
  'coupon-playbook.html'
];

var allMissing = {};
pages.forEach(function(page) {
  var html = fs.readFileSync(path.join(base, page), 'utf8');
  var keys = extractKeys(html);
  var pageSpecific = keys.filter(function(k){ return !k.startsWith('common.'); });
  var missingEn = keys.filter(function(k){ return getValue(en,k) === undefined; });
  var missingTw = keys.filter(function(k){ return getValue(tw,k) === undefined; });
  var missingCn = keys.filter(function(k){ return getValue(cn,k) === undefined; });
  var allMiss = missingEn.concat(missingTw.filter(function(k){ return missingEn.indexOf(k) < 0; }))
                         .concat(missingCn.filter(function(k){ return missingEn.indexOf(k) < 0 && missingTw.indexOf(k) < 0; }));
  allMissing[page] = { total: keys.length, pageSpecific: pageSpecific.length, missingEn: missingEn, missingTw: missingTw, missingCn: missingCn };
  console.log(page + ': ' + keys.length + ' keys, page-specific: ' + pageSpecific.length + ', missing en:' + missingEn.length + ' tw:' + missingTw.length + ' cn:' + missingCn.length);
  if (missingEn.length > 0) console.log('  Missing EN:', JSON.stringify(missingEn));
  if (missingTw.length > 0) console.log('  Missing TW (first 5):', JSON.stringify(missingTw.slice(0,5)));
  if (missingCn.length > 0) console.log('  Missing CN (first 5):', JSON.stringify(missingCn.slice(0,5)));
});
