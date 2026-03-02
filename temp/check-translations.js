const fs = require('fs');
const en = JSON.parse(fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/i18n/translations/en.json','utf8'));
const tw = JSON.parse(fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/i18n/translations/zh-TW.json','utf8'));
const cn = JSON.parse(fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/i18n/translations/zh-CN.json','utf8'));

// Check top-level keys
console.log('en has merchants:', !!en.merchants, '| tw:', !!tw.merchants, '| cn:', !!cn.merchants);
console.log('en has developers:', !!en.developers, '| tw:', !!tw.developers, '| cn:', !!cn.developers);

// Extract data-i18n keys from HTML
function extractKeys(html) {
  const matches = [];
  const regex = /data-i18n(?:-placeholder)?=["']([^"']+)["']/g;
  let m;
  while ((m = regex.exec(html)) !== null) matches.push(m[1]);
  return [...new Set(matches)];
}

function getValue(obj, key) {
  return key.split('.').reduce((o, k) => o && o[k], obj);
}

function flattenKeys(obj, prefix='') {
  return Object.keys(obj).flatMap(k => {
    const val = obj[k];
    const key = prefix ? prefix+'.'+k : k;
    return (val && typeof val === 'object') ? flattenKeys(val, key) : [key];
  });
}

const merchantsHtml = fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/for-merchants.html','utf8');
const devHtml = fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/for-developers.html','utf8');

const merchantKeys = extractKeys(merchantsHtml).filter(k => k.startsWith('merchants.'));
const devKeys = extractKeys(devHtml).filter(k => k.startsWith('developers.'));

console.log('for-merchants.html merchant-specific keys:', merchantKeys.length);
console.log('for-developers.html developer-specific keys:', devKeys.length);

// Find missing keys
const missingMerchantsEn = merchantKeys.filter(k => getValue(en, k) === undefined);
const missingMerchantsTw = merchantKeys.filter(k => getValue(tw, k) === undefined);
const missingMerchantsCn = merchantKeys.filter(k => getValue(cn, k) === undefined);
const missingDevEn = devKeys.filter(k => getValue(en, k) === undefined);
const missingDevTw = devKeys.filter(k => getValue(tw, k) === undefined);
const missingDevCn = devKeys.filter(k => getValue(cn, k) === undefined);

console.log('Missing merchants keys in en:', missingMerchantsEn.length, missingMerchantsEn);
console.log('Missing merchants keys in tw:', missingMerchantsTw.length, missingMerchantsTw.slice(0,5));
console.log('Missing merchants keys in cn:', missingMerchantsCn.length, missingMerchantsCn.slice(0,5));
console.log('Missing developers keys in en:', missingDevEn.length, missingDevEn);
console.log('Missing developers keys in tw:', missingDevTw.length, missingDevTw.slice(0,5));
console.log('Missing developers keys in cn:', missingDevCn.length, missingDevCn.slice(0,5));
