/**
 * Add Missing EJTech Article Translations
 */

const fs = require('fs');
const path = require('path');

// File paths
const EN_JSON = path.join(__dirname, 'dist', 'i18n', 'translations', 'en.json');
const ZH_TW_JSON = path.join(__dirname, 'dist', 'i18n', 'translations', 'zh-TW.json');
const ZH_CN_JSON = path.join(__dirname, 'dist', 'i18n', 'translations', 'zh-CN.json');

// EJTech article translations (extracted manually from HTML)
const ejtechArticle = {
  title: "EJTech Highlights: Mezzofy's Cloud Platform Distributes 300M Digital Coupons Across APAC",
  paragraphs: {
    recognition: "Mezzofy's cloud platform for digital coupons received recognition from EJTech for its transformation of customer engagement across the Asia-Pacific region.",
    platform: "The platform enables businesses to \"create and distribute eco-friendly, paperless coupons efficiently, tapping into a wide range of industries.\" The solution supports direct customer outreach via email, SMS, and social media channels while reducing paper consumption.",
    scale: "According to EJTech, \"With over 300 million digital coupons already distributed,\" Mezzofy demonstrates significant market traction in reshaping how companies connect with consumers sustainably and cost-effectively.",
    milestone: "This milestone represents a major achievement in the digital transformation of promotional marketing across the Asia-Pacific region. The platform's ability to handle such massive scale while maintaining efficiency and eco-friendliness sets a new standard for the industry."
  }
};

function readJSON(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(content);
}

function writeJSON(filepath, data) {
  const content = JSON.stringify(data, null, 2);
  fs.writeFileSync(filepath, content, 'utf-8');
}

function addEjtechArticle(filepath, description) {
  console.log(`\n📝 Adding ejtech300mCoupons to ${description}:`);

  const translations = readJSON(filepath);

  if (!translations.articles || !translations.articles.news) {
    console.error('  ❌ articles.news not found in translation file');
    return;
  }

  // Add ejtech article
  translations.articles.news.ejtech300mCoupons = ejtechArticle;

  writeJSON(filepath, translations);

  console.log('  ✅ Successfully added ejtech300mCoupons article');
}

console.log('=== Adding Missing EJTech Article ===');

try {
  // Add to all 3 language files
  addEjtechArticle(EN_JSON, 'English (en.json)');
  addEjtechArticle(ZH_TW_JSON, 'Traditional Chinese (zh-TW.json)');
  addEjtechArticle(ZH_CN_JSON, 'Simplified Chinese (zh-CN.json)');

  console.log('\n✅ EJTech article added to all translation files!');
  console.log('\nTotal news articles now: 8');

} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
