const fs = require('fs');
const en = JSON.parse(fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/i18n/translations/en.json','utf8'));
const tw = JSON.parse(fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/i18n/translations/zh-TW.json','utf8'));
const cn = JSON.parse(fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/i18n/translations/zh-CN.json','utf8'));

function getValue(obj, key) { return key.split('.').reduce(function(o,k){return o&&o[k];}, obj); }
function extractKeys(html) {
  var matches = [];
  var re = /data-i18n(?:-placeholder|-alt)?=["']([^"']+)["']/g;
  var m;
  while ((m = re.exec(html)) !== null) matches.push(m[1]);
  return matches.filter(function(v,i,a){return a.indexOf(v)===i;});
}

var html = fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/index.html','utf8');
var allKeys = extractKeys(html);
var homeKeys = allKeys.filter(function(k){ return k.startsWith('home.'); });

console.log('Total data-i18n keys:', allKeys.length);
console.log('home.* specific keys:', homeKeys.length);
console.log('en has home:', !!en.home, '| tw:', !!tw.home, '| cn:', !!cn.home);

var missingEn = allKeys.filter(function(k){ return getValue(en,k) === undefined; });
var missingTw = allKeys.filter(function(k){ return getValue(tw,k) === undefined; });
var missingCn = allKeys.filter(function(k){ return getValue(cn,k) === undefined; });

console.log('Missing in en:', missingEn.length, JSON.stringify(missingEn));
console.log('Missing in tw:', missingTw.length, JSON.stringify(missingTw.slice(0,10)));
console.log('Missing in cn:', missingCn.length, JSON.stringify(missingCn.slice(0,10)));
if (missingEn.length === 0 && missingTw.length === 0 && missingCn.length === 0) {
  console.log('SUCCESS: All keys present in all 3 files');
}
