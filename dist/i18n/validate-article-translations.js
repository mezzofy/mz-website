/**
 * Article Translation Validation Script
 *
 * Checks that all article translation keys exist in all 3 language files
 * (en.json, zh-TW.json, zh-CN.json)
 *
 * Usage: node validate-article-translations.js
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Load translation files
function loadTranslations() {
  const translationsDir = path.join(__dirname, 'translations');

  try {
    const en = JSON.parse(fs.readFileSync(path.join(translationsDir, 'en.json'), 'utf8'));
    const zhTW = JSON.parse(fs.readFileSync(path.join(translationsDir, 'zh-TW.json'), 'utf8'));
    const zhCN = JSON.parse(fs.readFileSync(path.join(translationsDir, 'zh-CN.json'), 'utf8'));

    return { en, zhTW, zhCN };
  } catch (error) {
    log(`Error loading translation files: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Get all keys from nested object
function getAllKeys(obj, prefix = '') {
  let keys = [];

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

// Check if a key exists in an object
function hasKey(obj, keyPath) {
  const keys = keyPath.split('.');
  let current = obj;

  for (const key of keys) {
    if (!current || typeof current !== 'object' || !(key in current)) {
      return false;
    }
    current = current[key];
  }

  return true;
}

// Main validation function
function validateArticleTranslations() {
  log('\n=== Article Translation Validation ===\n', 'cyan');

  const { en, zhTW, zhCN } = loadTranslations();

  // Get all article keys from English (source of truth)
  const blogKeys = getAllKeys(en.articles?.blog || {}, 'articles.blog');
  const newsKeys = getAllKeys(en.articles?.news || {}, 'articles.news');
  const allArticleKeys = [...blogKeys, ...newsKeys];

  log(`Total article keys in en.json: ${allArticleKeys.length}`, 'blue');
  log(`  - Blog: ${blogKeys.length} keys`, 'blue');
  log(`  - News: ${newsKeys.length} keys\n`, 'blue');

  // Check for missing keys in zh-TW
  const missingZhTW = allArticleKeys.filter(key => !hasKey(zhTW, key));

  // Check for missing keys in zh-CN
  const missingZhCN = allArticleKeys.filter(key => !hasKey(zhCN, key));

  // Report results
  let hasErrors = false;

  if (missingZhTW.length > 0) {
    hasErrors = true;
    log(`✗ Missing keys in zh-TW.json (${missingZhTW.length}):`, 'red');
    missingZhTW.forEach(key => log(`  - ${key}`, 'red'));
    log('');
  } else {
    log('✓ All keys present in zh-TW.json', 'green');
  }

  if (missingZhCN.length > 0) {
    hasErrors = true;
    log(`✗ Missing keys in zh-CN.json (${missingZhCN.length}):`, 'red');
    missingZhCN.forEach(key => log(`  - ${key}`, 'red'));
    log('');
  } else {
    log('✓ All keys present in zh-CN.json', 'green');
  }

  // Summary
  log('\n=== Summary ===\n', 'cyan');

  if (hasErrors) {
    log(`✗ Validation FAILED`, 'red');
    log(`  Missing in zh-TW: ${missingZhTW.length}`, 'red');
    log(`  Missing in zh-CN: ${missingZhCN.length}`, 'red');
    process.exit(1);
  } else {
    log('✓ All article translations complete!', 'green');
    log(`✓ All ${allArticleKeys.length} keys validated across 3 languages`, 'green');
    log(`✓ Blog articles: ${blogKeys.length / 3} articles (complete)`, 'green');
    log(`✓ News articles: ${newsKeys.length / 3} articles (complete)`, 'green');
    log('\n✓ VALIDATION PASSED - Ready for deployment!\n', 'green');
  }
}

// Run validation
try {
  validateArticleTranslations();
} catch (error) {
  log(`\nUnexpected error: ${error.message}`, 'red');
  log(error.stack, 'red');
  process.exit(1);
}
