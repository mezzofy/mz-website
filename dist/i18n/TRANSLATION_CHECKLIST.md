# Quick Translation Checklist

Use this checklist when adding translations to a new page or updating existing translations.

## Before Starting

- [ ] Review `i18n/README.md` for full documentation
- [ ] Check `for-distributors.html` as reference example
- [ ] Identify all text content that needs translation

## HTML Setup (in your .html file)

### In `<head>` section:
- [ ] Add i18n script: `<script src="i18n/i18n.js"></script>`

### In `<body>` tag:
- [ ] Add loading class: `<body class="i18n-loading">`

### In navigation section:
- [ ] Copy desktop language dropdown from reference page
- [ ] Verify `id="current-lang-desktop"` exists
- [ ] Copy mobile language dropdown for mobile menu
- [ ] Verify `id="current-lang-mobile"` exists

### In content sections:
- [ ] Add `data-i18n="key.name"` to all text elements
- [ ] Add `data-i18n-placeholder="key"` to form inputs
- [ ] Add `data-i18n-alt="key"` to images (if needed)
- [ ] Add `data-i18n-title="key"` to tooltips (if needed)

### Before closing `</body>`:
- [ ] Add main.js: `<script src="js/main.js"></script>`

## Translation Files Setup

### File: `i18n/translations/en.json`
- [ ] Add new page section following naming convention
- [ ] Organize keys logically (hero, features, benefits, etc.)
- [ ] Use camelCase for all keys
- [ ] Include all text from HTML `data-i18n` attributes
- [ ] Verify JSON syntax is valid (no trailing commas)

### File: `i18n/translations/zh-TW.json`
- [ ] Copy structure from en.json
- [ ] Translate all values to Traditional Chinese
- [ ] Preserve HTML tags if present in English version
- [ ] Maintain consistent key names (don't translate keys!)
- [ ] Verify JSON syntax is valid

### File: `i18n/translations/zh-CN.json`
- [ ] Copy structure from en.json
- [ ] Translate all values to Simplified Chinese
- [ ] Preserve HTML tags if present in English version
- [ ] Maintain consistent key names (don't translate keys!)
- [ ] Verify JSON syntax is valid

## Key Naming Convention

### Use this pattern:
```
pageName.sectionName.elementType
```

### Examples:
- ✅ `distributors.hero.title`
- ✅ `contact.form.firstName`
- ✅ `common.nav.solutions`
- ❌ `page1.text1`
- ❌ `heading`
- ❌ `dist_title`

### Sections to organize:
- `hero` - Hero/banner section
- `journey` - User journey or steps
- `benefits` - Benefits section
- `features` - Features section
- `products` - Product information
- `contact` - Contact form
- `footerCta` - Footer call-to-action

## Testing Checklist

### Visual Testing:
- [ ] Open page in browser (http://localhost:8000/your-page.html)
- [ ] Page loads without flickering (no FOUC)
- [ ] Default language (English) displays correctly
- [ ] No "undefined" or missing text

### Language Switching:
- [ ] Click language dropdown on desktop
- [ ] Verify current language is displayed correctly
- [ ] Switch to Traditional Chinese (zh-TW)
- [ ] Verify all content translates
- [ ] Switch to Simplified Chinese (zh-CN)
- [ ] Verify all content translates
- [ ] Switch back to English
- [ ] Verify all content returns to English

### Mobile Testing:
- [ ] Open mobile menu
- [ ] Language dropdown appears first
- [ ] Click to expand language menu
- [ ] Switch languages works correctly
- [ ] Selected language persists

### Persistence Testing:
- [ ] Switch to a different language
- [ ] Refresh the page
- [ ] Verify language persists after reload
- [ ] Check URL has `?lang=` parameter (for non-English)

### Console Testing:
- [ ] Open browser developer console (F12)
- [ ] Look for any errors (red text)
- [ ] Look for warnings about missing translations
- [ ] Verify no 404 errors loading translation files

### Cross-page Testing:
- [ ] Switch language on current page
- [ ] Navigate to another page
- [ ] Verify language persists across navigation

## Common Issues & Solutions

### Issue: Page shows English after switching
**Solution:**
- Check console for errors
- Verify translation key exists in JSON file
- Check for typos in `data-i18n` attribute

### Issue: Some text doesn't translate
**Solution:**
- Verify `data-i18n` attribute is present
- Check key exists in all three JSON files
- Verify key name matches exactly

### Issue: Page flickers on load
**Solution:**
- Verify `i18n-loading` class on `<body>`
- Ensure i18n.js loads before content

### Issue: Language doesn't persist
**Solution:**
- Check browser console for errors
- Verify main.js is loaded
- Check localStorage is enabled

### Issue: JSON syntax error
**Solution:**
- Validate JSON at jsonlint.com
- Check for missing commas
- Check for trailing commas (not allowed)
- Verify all quotes are closed

## Final Review

Before considering translation complete:

- [ ] All text content has translation keys
- [ ] All three JSON files are updated
- [ ] Key structure matches across all files
- [ ] Tested in all three languages
- [ ] Tested on desktop and mobile
- [ ] No console errors or warnings
- [ ] Language persists across page refresh
- [ ] Language persists across navigation
- [ ] HTML is valid
- [ ] JSON files are valid
- [ ] Documentation updated if new patterns added

## Quick Reference

### Common translation keys you'll always need:
```json
{
  "common": {
    "nav": {
      "solutions": "...",
      "products": "...",
      "developer": "...",
      "resources": "...",
      "company": "...",
      "getStarted": "..."
    },
    "footer": { ... },
    "buttons": {
      "getStarted": "...",
      "learnMore": "...",
      "contactSales": "..."
    }
  }
}
```

### Typical page structure:
```json
{
  "pageName": {
    "hero": {
      "tagline": "...",
      "title": "...",
      "subtitle": "...",
      "cta": "..."
    },
    "features": { ... },
    "benefits": { ... },
    "contact": { ... }
  }
}
```

## Files to Reference

- **Full Documentation**: `i18n/README.md`
- **Example Page**: `for-distributors.html`
- **Translation Library**: `i18n/i18n.js`
- **Integration Logic**: `js/main.js`

---

**Keep this checklist handy when working on translations!**
