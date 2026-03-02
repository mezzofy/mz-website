const fs = require('fs');

const html = fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/coupon-wallet.html', 'utf8');
const en = JSON.parse(fs.readFileSync('C:/Mezzofy/workspace/mz-website/dist/i18n/translations/en.json', 'utf8'));

function getNestedValue(obj, path) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

// Extract all data-i18n and data-i18n-alt keys
const keys = new Set();
const re1 = /data-i18n="([^"]+)"/g;
const re2 = /data-i18n-alt="([^"]+)"/g;
let m;
while ((m = re1.exec(html))) keys.add(m[1]);
while ((m = re2.exec(html))) keys.add(m[1]);

let missing = [];
for (const key of keys) {
  if (getNestedValue(en, key) === undefined) {
    missing.push(key);
  }
}

console.log('Total keys in coupon-wallet.html:', keys.size);
console.log('Missing in en.json:', missing.length);
if (missing.length > 0) {
  missing.forEach(k => console.log('  MISSING:', k));
} else {
  console.log('All keys present!');
}
