/**
 * Merge Extracted Article Translations into Translation Files
 *
 * Adds the extracted "articles" object to all 3 translation JSON files:
 * - en.json (English - extracted content)
 * - zh-TW.json (Traditional Chinese - to be translated)
 * - zh-CN.json (Simplified Chinese - to be translated)
 */

const fs = require('fs');
const path = require('path');

// File paths
const EXTRACTED_FILE = path.join(__dirname, 'extracted-article-translations.json');
const EN_JSON = path.join(__dirname, 'dist', 'i18n', 'translations', 'en.json');
const ZH_TW_JSON = path.join(__dirname, 'dist', 'i18n', 'translations', 'zh-TW.json');
const ZH_CN_JSON = path.join(__dirname, 'dist', 'i18n', 'translations', 'zh-CN.json');

/**
 * Read JSON file
 */
function readJSON(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Write JSON file with pretty formatting
 */
function writeJSON(filepath, data) {
  const content = JSON.stringify(data, null, 2);
  fs.writeFileSync(filepath, content, 'utf-8');
}

/**
 * Create backup of file
 */
function createBackup(filepath) {
  const backupPath = filepath + '.backup';
  fs.copyFileSync(filepath, backupPath);
  console.log(`✓ Created backup: ${backupPath}`);
}

/**
 * Merge articles into translation file
 */
function mergeArticles(targetFile, articles, description) {
  console.log(`\n📝 Merging into ${description}:`);

  // Create backup
  createBackup(targetFile);

  // Read existing translations
  const translations = readJSON(targetFile);

  // Check if articles already exists
  if (translations.articles) {
    console.log('  ⚠️  "articles" key already exists - will be replaced');
  }

  // Add articles object
  translations.articles = articles;

  // Write updated translations
  writeJSON(targetFile, translations);

  console.log(`  ✅ Successfully merged articles into ${path.basename(targetFile)}`);

  return translations;
}

/**
 * Create placeholder Chinese translations
 * (Professional translation recommended for production)
 */
function createChinesePlaceholder(articles) {
  // For now, we'll use English text as placeholder
  // TODO: Replace with actual Chinese translations
  return JSON.parse(JSON.stringify(articles));
}

// Main execution
console.log('=== Merging Article Translations ===\n');

try {
  // Read extracted articles
  console.log('📖 Reading extracted articles...');
  const extracted = readJSON(EXTRACTED_FILE);

  if (!extracted.articles) {
    throw new Error('Extracted file does not contain "articles" object');
  }

  const articles = extracted.articles;

  // Count keys
  const countKeys = (obj) => {
    let count = 0;
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        count += countKeys(obj[key]);
      } else {
        count++;
      }
    }
    return count;
  };

  const totalKeys = countKeys(articles);
  console.log(`  Found ${totalKeys} translation keys in extracted file`);

  // Merge into English file
  const enTranslations = mergeArticles(EN_JSON, articles, 'English (en.json)');

  // Merge into Traditional Chinese file (placeholder)
  console.log('\n⚠️  Note: Using English placeholders for Chinese translations');
  console.log('   Professional translation recommended before production deployment');

  const zhTwArticles = createChinesePlaceholder(articles);
  const zhTwTranslations = mergeArticles(ZH_TW_JSON, zhTwArticles, 'Traditional Chinese (zh-TW.json)');

  const zhCnArticles = createChinesePlaceholder(articles);
  const zhCnTranslations = mergeArticles(ZH_CN_JSON, zhCnArticles, 'Simplified Chinese (zh-CN.json)');

  console.log('\n=== Merge Complete ===');
  console.log(`✅ Added ${totalKeys} article translation keys to all 3 language files`);

  console.log('\n📋 Summary:');
  console.log(`  - Blog articles: ${Object.keys(articles.blog).length}`);
  console.log(`  - News articles: ${Object.keys(articles.news).length}`);
  console.log(`  - Total keys: ${totalKeys}`);

  console.log('\n✅ All translation files updated successfully!');

  console.log('\n📝 Next Steps:');
  console.log('  1. Review the updated translation files');
  console.log('  2. Replace English placeholders in zh-TW.json with Traditional Chinese');
  console.log('  3. Replace English placeholders in zh-CN.json with Simplified Chinese');
  console.log('  4. Test language switching on blog and news pages');
  console.log('  5. Commit the changes to git');

  console.log('\n💡 Tip: Backups were created (.backup files) in case rollback is needed');

} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
