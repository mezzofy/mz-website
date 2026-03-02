const fs = require('fs');
const path = require('path');

const distDir = 'C:/Mezzofy/workspace/mz-website/dist';
const enJson = JSON.parse(fs.readFileSync(path.join(distDir, 'i18n/translations/en.json'), 'utf8'));

function getNestedValue(obj, key) {
  return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const hasI18nScript = content.includes('i18n/i18n.js') || content.includes('../i18n/i18n.js');
  const hasI18nBody = content.includes('i18n-loading');
  const hasLangSelector = content.includes('lang-option') || content.includes('data-lang=');
  
  const keys = new Set();
  let m;
  const re1 = /data-i18n="([^"]+)"/g;
  const re2 = /data-i18n-alt="([^"]+)"/g;
  const re3 = /data-i18n-placeholder="([^"]+)"/g;
  while ((m = re1.exec(content))) keys.add(m[1]);
  while ((m = re2.exec(content))) keys.add(m[1]);
  while ((m = re3.exec(content))) keys.add(m[1]);
  
  const missing = [];
  for (const key of keys) {
    if (getNestedValue(enJson, key) === undefined) missing.push(key);
  }
  
  return { hasI18nScript, hasI18nBody, hasLangSelector, keyCount: keys.size, missing };
}

// Get top-level HTML files
const topLevel = fs.readdirSync(distDir)
  .filter(f => f.endsWith('.html'))
  .sort();

// Get blog and news files
const blogFiles = fs.readdirSync(path.join(distDir, 'blog'))
  .filter(f => f.endsWith('.html'))
  .map(f => 'blog/' + f);
const newsFiles = fs.readdirSync(path.join(distDir, 'news'))
  .filter(f => f.endsWith('.html'))
  .map(f => 'news/' + f);

const allFiles = [...topLevel, ...blogFiles, ...newsFiles];

console.log('\n=== i18n AUDIT: ALL PAGES ===\n');
console.log('Status | Keys | Missing | File');
console.log('-------|------|---------|----');

let noI18n = [];
let hasIssues = [];
let complete = [];

for (const file of allFiles) {
  const filePath = path.join(distDir, file);
  try {
    const r = checkFile(filePath);
    let status;
    if (!r.hasI18nScript) {
      status = '❌ NO_I18N';
      noI18n.push(file);
    } else if (r.missing.length > 0) {
      status = '⚠️  MISSING ';
      hasIssues.push({ file, missing: r.missing });
    } else if (r.keyCount === 0) {
      status = '⚠️  NO_KEYS ';
      hasIssues.push({ file, missing: [] });
    } else {
      status = '✅ OK      ';
      complete.push(file);
    }
    console.log(`${status} | ${String(r.keyCount).padStart(3)} | ${String(r.missing.length).padStart(7)} | ${file}`);
  } catch(e) {
    console.log(`ERROR: ${file} - ${e.message}`);
  }
}

console.log('\n=== SUMMARY ===');
console.log(`Complete (✅): ${complete.length}`);
console.log(`No i18n (❌): ${noI18n.length}`);
if (noI18n.length) noI18n.forEach(f => console.log('  - ' + f));
console.log(`Has issues (⚠️): ${hasIssues.length}`);
if (hasIssues.length) hasIssues.forEach(({file, missing}) => {
  console.log('  - ' + file);
  missing.forEach(k => console.log('      MISSING KEY: ' + k));
});
