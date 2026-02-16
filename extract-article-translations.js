/**
 * Extract Article Translations Script
 *
 * Extracts translation keys and content from blog and news article HTML files
 * and generates JSON structure for en.json, zh-TW.json, zh-CN.json
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BLOG_DIR = path.join(__dirname, 'dist', 'blog');
const NEWS_DIR = path.join(__dirname, 'dist', 'news');

const BLOG_FILES = [
  'e-coupons-preference.html',
  'environmental-excellence.html',
  'holiday-guide.html',
  'hotel-tech-innovation.html',
  'nfc-parknshop.html',
  'smart-retail.html'
];

const NEWS_FILES = [
  'cioworld-feature.html',
  'dual-esg-awards.html',
  'edigest-leading-solution.html',
  'ejtech-300m-coupons.html',
  'forbes-dicky-yin.html',
  'funding-announcement.html',
  'techapple-innovation-index.html',
  'treasure-global-partnership.html'
];

/**
 * Extract text content from HTML element
 */
function extractText(html, key) {
  // Escape dots in the key for regex
  const escapedKey = key.replace(/\./g, '\\.');

  // Try to find the element with the data-i18n attribute
  // Pattern 1: <element data-i18n="key">text</element>
  const regex1 = new RegExp(`data-i18n="${escapedKey}"[^>]*>([\\s\\S]*?)</(\\w+)>`, 'i');
  const match1 = html.match(regex1);

  if (match1) {
    let text = match1[1];

    // Remove all HTML tags while preserving text
    text = text.replace(/<[^>]+>/g, ' ');

    // Clean up whitespace
    text = text.trim();
    text = text.replace(/\s+/g, ' ');

    // Remove trailing HTML artifacts
    text = text.replace(/\s*<\/.*$/, '');

    return text || null;
  }

  return null;
}

/**
 * Extract all translation keys from HTML
 */
function extractKeysFromHTML(html) {
  const keys = [];
  const regex = /data-i18n="(articles\.[^"]+)"/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    keys.push(match[1]);
  }

  return [...new Set(keys)]; // Remove duplicates
}

/**
 * Convert camelCase article filename to camelCase key
 */
function filenameToKey(filename) {
  // Remove .html extension
  const name = filename.replace('.html', '');

  // Convert kebab-case to camelCase
  return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Build nested JSON structure from dot-notation key
 */
function setNestedValue(obj, path, value) {
  const parts = path.split('.');
  let current = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part]) {
      current[part] = {};
    }
    current = current[part];
  }

  current[parts[parts.length - 1]] = value;
}

/**
 * Process a single article file
 */
function processArticle(filepath, type) {
  console.log(`Processing ${type} article: ${path.basename(filepath)}`);

  const html = fs.readFileSync(filepath, 'utf-8');
  const keys = extractKeysFromHTML(html);

  const translations = {};

  keys.forEach(key => {
    const text = extractText(html, key);
    if (text) {
      setNestedValue(translations, key, text);
    } else {
      console.warn(`  ⚠️  Could not extract text for key: ${key}`);
    }
  });

  console.log(`  ✓ Extracted ${keys.length} keys`);

  return translations.articles;
}

/**
 * Main extraction function
 */
function extractAllTranslations() {
  console.log('=== Starting Article Translation Extraction ===\n');

  const result = {
    articles: {
      blog: {},
      news: {}
    }
  };

  // Process blog articles
  console.log('📝 Processing Blog Articles:\n');
  BLOG_FILES.forEach(filename => {
    const filepath = path.join(BLOG_DIR, filename);
    if (fs.existsSync(filepath)) {
      const articleKey = filenameToKey(filename);
      const extracted = processArticle(filepath, 'blog');
      if (extracted && extracted.blog && extracted.blog[articleKey]) {
        result.articles.blog[articleKey] = extracted.blog[articleKey];
      }
    } else {
      console.warn(`  ⚠️  File not found: ${filepath}`);
    }
  });

  console.log('\n📰 Processing News Articles:\n');
  NEWS_FILES.forEach(filename => {
    const filepath = path.join(NEWS_DIR, filename);
    if (fs.existsSync(filepath)) {
      const articleKey = filenameToKey(filename);
      const extracted = processArticle(filepath, 'news');
      if (extracted && extracted.news && extracted.news[articleKey]) {
        result.articles.news[articleKey] = extracted.news[articleKey];
      }
    } else {
      console.warn(`  ⚠️  File not found: ${filepath}`);
    }
  });

  return result;
}

/**
 * Write extracted translations to JSON file
 */
function writeToFile(data, filename) {
  const filepath = path.join(__dirname, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`\n✅ Written to: ${filepath}`);
}

/**
 * Generate statistics
 */
function generateStats(data) {
  let blogKeys = 0;
  let newsKeys = 0;

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

  if (data.articles.blog) {
    blogKeys = countKeys(data.articles.blog);
  }

  if (data.articles.news) {
    newsKeys = countKeys(data.articles.news);
  }

  return {
    blogArticles: Object.keys(data.articles.blog).length,
    newsArticles: Object.keys(data.articles.news).length,
    blogKeys,
    newsKeys,
    totalKeys: blogKeys + newsKeys
  };
}

// Run extraction
const extracted = extractAllTranslations();
const stats = generateStats(extracted);

console.log('\n=== Extraction Statistics ===');
console.log(`Blog Articles: ${stats.blogArticles} (${stats.blogKeys} keys)`);
console.log(`News Articles: ${stats.newsArticles} (${stats.newsKeys} keys)`);
console.log(`Total Keys: ${stats.totalKeys}`);

// Write to output file
writeToFile(extracted, 'extracted-article-translations.json');

console.log('\n✅ Extraction Complete!');
console.log('\nNext steps:');
console.log('1. Review extracted-article-translations.json');
console.log('2. Add this "articles" object to dist/i18n/translations/en.json');
console.log('3. Create Chinese translations for zh-TW.json and zh-CN.json');
