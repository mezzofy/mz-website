# Mezzofy Website Translation System (i18n)

## Overview

This directory contains the internationalization (i18n) system for the Mezzofy website. The system supports multiple languages and provides a consistent, scalable approach to translating content across all pages.

## Supported Languages

- **English (en)** - Default language
- **Traditional Chinese (zh-TW)** - 繁體中文
- **Simplified Chinese (zh-CN)** - 简体中文

## File Structure

```
i18n/
├── README.md              # This documentation file
├── i18n.js                # Core translation library
└── translations/
    ├── en.json           # English translations
    ├── zh-TW.json        # Traditional Chinese translations
    └── zh-CN.json        # Simplified Chinese translations
```

## How It Works

### 1. Translation Files (JSON)

Translation content is organized in JSON files using dot-notation keys:

```json
{
  "common": {
    "nav": {
      "solutions": "Solutions",
      "products": "Products"
    }
  },
  "pageName": {
    "sectionName": {
      "title": "Section Title",
      "description": "Section description"
    }
  }
}
```

### 2. HTML Markup

Content is marked for translation using `data-i18n` attributes:

```html
<!-- Text content -->
<h1 data-i18n="distributors.hero.title">Default English Text</h1>

<!-- Placeholder attributes -->
<input type="text" data-i18n-placeholder="contact.firstName">

<!-- Alt attributes -->
<img src="logo.png" data-i18n-alt="common.logo.alt">

<!-- Title attributes -->
<button data-i18n-title="common.buttons.learnMore">Button</button>
```

### 3. Automatic Translation

When the page loads:
1. The i18n.js library initializes
2. It detects the user's preferred language (URL → localStorage → browser → default)
3. It loads the appropriate translation file
4. It replaces all marked content with translations
5. The page becomes visible (removing `i18n-loading` class)

## Adding Translations to a New Page

### Step 1: Prepare the HTML

1. **Add i18n script in `<head>`:**
```html
<head>
    ...
    <!-- i18n Script -->
    <script src="i18n/i18n.js"></script>
</head>
```

2. **Add loading class to `<body>`:**
```html
<body class="i18n-loading">
```

3. **Add language selector to navigation:**

Desktop version:
```html
<div class="dropdown">
    <button class="dropdown-trigger text-medium-grey hover:text-primary-black transition-colors">
        <svg class="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
        </svg>
        <span id="current-lang-desktop">English</span>
        <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    </button>
    <div class="dropdown-menu">
        <a href="#" class="dropdown-item lang-option" data-lang="en">English</a>
        <a href="#" class="dropdown-item lang-option" data-lang="zh-TW">繁體中文</a>
        <a href="#" class="dropdown-item lang-option" data-lang="zh-CN">简体中文</a>
    </div>
</div>
```

Mobile version (in mobile menu):
```html
<div class="mobile-dropdown border-b border-gray-200 pb-2 mb-2">
    <button class="mobile-dropdown-trigger" data-dropdown="language">
        <span class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
            </svg>
            <span id="current-lang-mobile">English</span>
        </span>
        <svg class="w-4 h-4 transform transition-transform chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    </button>
    <div class="mobile-dropdown-menu" data-menu="language">
        <a href="#" class="block py-2 text-sm text-medium-grey hover:text-primary-orange lang-option" data-lang="en">English</a>
        <a href="#" class="block py-2 text-sm text-medium-grey hover:text-primary-orange lang-option" data-lang="zh-TW">繁體中文</a>
        <a href="#" class="block py-2 text-sm text-medium-grey hover:text-primary-orange lang-option" data-lang="zh-CN">简体中文</a>
    </div>
</div>
```

4. **Mark content for translation:**
```html
<section>
    <h1 data-i18n="newPage.hero.title">Page Title</h1>
    <p data-i18n="newPage.hero.description">Page description</p>

    <input type="text" data-i18n-placeholder="newPage.form.name" placeholder="Your name">
</section>
```

5. **Add main.js before closing `</body>`:**
```html
    <script src="js/main.js"></script>
</body>
```

### Step 2: Add Translations to JSON Files

Update **all three** translation files with your new content:

**en.json:**
```json
{
  "common": { ... },
  "newPage": {
    "hero": {
      "title": "Welcome to Our New Page",
      "description": "This page provides amazing features."
    },
    "form": {
      "name": "Your name"
    }
  }
}
```

**zh-TW.json:**
```json
{
  "common": { ... },
  "newPage": {
    "hero": {
      "title": "歡迎來到我們的新頁面",
      "description": "此頁面提供令人驚嘆的功能。"
    },
    "form": {
      "name": "您的姓名"
    }
  }
}
```

**zh-CN.json:**
```json
{
  "common": { ... },
  "newPage": {
    "hero": {
      "title": "欢迎来到我们的新页面",
      "description": "此页面提供令人惊叹的功能。"
    },
    "form": {
      "name": "您的姓名"
    }
  }
}
```

### Step 3: Test

1. Open the page in a browser
2. Verify the page loads without flickering
3. Test language switching via the dropdown
4. Verify all content translates correctly
5. Check browser console for any errors or warnings

## Key Naming Conventions

### Structure
- **common**: Shared elements (navigation, footer, buttons, etc.)
- **pageName**: Page-specific content (home, about, merchants, distributors, etc.)
- Use **camelCase** for all keys
- Be **specific and descriptive**

### Examples
✅ Good:
- `distributors.hero.title`
- `common.nav.solutions`
- `contact.form.firstName`

❌ Bad:
- `page1.heading1`
- `dist.h1`
- `text1`

### Organization
Group related translations logically:

```json
{
  "distributors": {
    "hero": { ... },
    "benefits": { ... },
    "products": { ... },
    "contact": { ... }
  }
}
```

## Advanced Features

### HTML Content in Translations

You can include HTML in translations:

```json
{
  "about.mission.description": "We are <span class=\"text-primary-orange\">pioneers</span> in the industry."
}
```

The i18n system automatically detects `<` and uses `.innerHTML` instead of `.textContent`.

### Variable Interpolation

For dynamic content with variables:

HTML:
```html
<p data-i18n="welcome.message" data-i18n-vars='{"name":"John"}'></p>
```

Translation:
```json
{
  "welcome.message": "Hello, {{name}}! Welcome back."
}
```

Result: "Hello, John! Welcome back."

### Language Persistence

The selected language is automatically:
- Saved to localStorage
- Reflected in URL parameter (`?lang=zh-TW`)
- Persisted across page navigation

## Best Practices

### ✅ Do's
- **Update all language files together** - Never leave translations incomplete
- **Keep keys descriptive** - Use clear, hierarchical naming
- **Test thoroughly** - Verify translations in all languages
- **Use common section** - For shared content across pages
- **Keep HTML minimal** - Only use safe tags like `<span>`, `<strong>`, `<a>`

### ❌ Don'ts
- **Don't duplicate keys** - Use common section instead
- **Don't use generic names** - Be specific (not `text1`, `heading2`)
- **Don't skip languages** - Always update all three files
- **Don't use unsafe HTML** - Avoid `<script>`, `<iframe>`, etc.
- **Don't hardcode text** - Always use translation keys

## Implementation Checklist

### HTML Page
- [ ] Add `<script src="i18n/i18n.js"></script>` in `<head>`
- [ ] Add `class="i18n-loading"` to `<body>`
- [ ] Add language dropdown to desktop navigation
- [ ] Add language dropdown to mobile menu
- [ ] Add `data-i18n` attributes to all text
- [ ] Add `data-i18n-placeholder` to form fields
- [ ] Add `<script src="js/main.js"></script>` before `</body>`

### Translation Files
- [ ] Add section to en.json
- [ ] Add section to zh-TW.json
- [ ] Add section to zh-CN.json
- [ ] Verify key structure matches across all files
- [ ] Use consistent naming conventions

### Testing
- [ ] Page loads without FOUC (Flash of Unstyled Content)
- [ ] Language selector shows current language
- [ ] Language switching works correctly
- [ ] Language persists on page reload
- [ ] Mobile language selector works
- [ ] All text translates properly
- [ ] No console errors or warnings

## Reference Example

See `for-distributors.html` for a complete implementation example.

## Technical Details

### i18n.js Features
- **Language detection**: URL parameter → localStorage → browser language → default
- **Automatic loading**: Fetches appropriate translation file
- **DOM manipulation**: Applies translations to marked elements
- **Event system**: Dispatches `languageChanged` event
- **Persistence**: Saves preference to localStorage
- **URL management**: Updates URL parameter on language change

### Integration with main.js
The `main.js` file handles:
- Initializing i18n on page load
- Language dropdown click handlers
- Updating language display text
- Mobile menu integration
- Active language highlighting

## Troubleshooting

### Page shows English even after switching language
- Check browser console for loading errors
- Verify translation file exists at `i18n/translations/{lang}.json`
- Check if translation keys match in HTML and JSON

### Missing translations
- Verify key exists in all three JSON files
- Check for typos in `data-i18n` attribute
- Look for console warnings about missing keys

### FOUC (Flash of Unstyled Content)
- Ensure `i18n-loading` class is on `<body>`
- Verify i18n.js is loaded before page content
- Check if i18n.init() completes successfully

### Language not persisting
- Check if localStorage is enabled
- Verify main.js is loaded correctly
- Check browser console for JavaScript errors

## Support

For questions or issues with the translation system, refer to:
- This README
- `for-distributors.html` for implementation example
- `i18n.js` source code for technical details
- `main.js` for integration logic

---

**Last Updated:** 2026-01-09
**Version:** 1.0
