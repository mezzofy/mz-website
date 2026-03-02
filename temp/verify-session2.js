const fs = require('fs');
const en = JSON.parse(fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/i18n/translations/en.json','utf8'));
const tw = JSON.parse(fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/i18n/translations/zh-TW.json','utf8'));
const cn = JSON.parse(fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/i18n/translations/zh-CN.json','utf8'));

function getValue(obj, key) { return key.split('.').reduce(function(o,k){return o&&o[k];}, obj); }
function extractKeys(html) {
  var matches = [];
  var re = /data-i18n(?:-placeholder)?=["']([^"']+)["']/g;
  var m;
  while ((m = re.exec(html)) !== null) matches.push(m[1]);
  return matches.filter(function(v,i,a){return a.indexOf(v)===i;});
}

var mHtml = fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/for-merchants.html','utf8');
var dHtml = fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/for-developers.html','utf8');
var mKeys = extractKeys(mHtml);
var dKeys = extractKeys(dHtml);
var allKeys = mKeys.concat(dKeys).filter(function(v,i,a){return a.indexOf(v)===i;});
var missing = allKeys.filter(function(k){ return getValue(en,k) === undefined || getValue(tw,k) === undefined || getValue(cn,k) === undefined; });
console.log('for-merchants HTML keys:', mKeys.length);
console.log('for-developers HTML keys:', dKeys.length);
console.log('Missing in any lang:', missing.length, JSON.stringify(missing));
if (missing.length === 0) console.log('SUCCESS: All translation keys present in all 3 files');
