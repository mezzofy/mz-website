# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mezzofy is a multi-page static website for the Global Coupon Exchange Protocol. Built with HTML5, Tailwind CSS 3.4, and vanilla JavaScript. The site features a marketing landing page, product pages, blog, news section, and information pages for merchants, distributors, and developers.

---

## Status Management

**Location:** [`STATUS.md`](STATUS.md) - Real-time project status tracking

**Update triggers:**
- After completing any task (add to "Recently Completed")
- Before `/clear` at 50-60% context (checkpoint progress)
- After phase milestones (update progress percentage)
- When blockers identified/resolved

**Quick template:**
```markdown
**YYYY-MM-DD:**
- ✅ [Task description] → `file/path` ([commit hash])
  - Impact: [Brief description]
  - Related: [Link if applicable]
```

**Integration:** Read STATUS.md at session start. Update before context clear or task completion.

**See:** [`STATUS.md`](STATUS.md) for current project state and detailed tracking guidelines.

---

## Build Commands

```bash
# Install dependencies
npm install

# Development mode with watch (auto-rebuild on changes)
npm run dev

# Production build (minified CSS)
npm run build
```

**CRITICAL:** Always run `npm run build` after editing HTML or CSS files. JavaScript changes don't require a rebuild.

## Project Architecture

### File Structure
```
src/
  input.css           # Source CSS with Tailwind directives + custom components
  js/main.js          # Vanilla JS for navigation, smooth scroll, dropdowns
dist/
  *.html              # Production HTML files (edit these directly)
  output.css          # Compiled CSS (generated - NEVER edit)
  blog/*.html         # Blog posts (6 articles)
  news/*.html         # News articles (8 articles)
  assets/images/      # Logo and icons
tailwind.config.js    # Theme configuration (custom colors)
```

### Key Pages
- `index.html` - Homepage with hero, protocol features, merchant/distributor benefits
- `about.html` - Company information
- `contact.html` - Contact page
- `for-merchants.html`, `for-distributors.html`, `for-developers.html` - Audience-specific pages
- `coupon-*.html` - Product pages (management, marketplace, NFC, marketing, wallet)
- `coupon-playbook.html` - Resources
- `investors.html`, `news-press.html` - Corporate pages

## Complete Sitemap

**Total Pages:** 30 (22 with i18n, 8 remaining)

| Category | Count | Files |
|----------|:-----:|-------|
| **Core** | 3 | index.html, about.html, contact.html |
| **Solutions** | 3 | for-merchants.html, for-distributors.html, for-developers.html |
| **Products** | 6 | coupon-management.html, coupon-marketplace.html, coupon-nfc.html, coupon-marketing.html, coupon-wallet.html, coupon-playbook.html |
| **Corporate** | 3 | investors.html, news-press.html, nfc-user-guide.html |
| **Blog** | 6 | dist/blog/*.html (e-coupons-preference, environmental-excellence, holiday-guide, hotel-tech-innovation, nfc-parknshop, smart-retail) |
| **News** | 8 | dist/news/*.html (cioworld-feature, dual-esg-awards, edigest-leading-solution, ejtech-300m-coupons, forbes-dicky-yin, funding-announcement, techapple-innovation-index, treasure-global-partnership) |
| **Test** | 1 | test-i18n.html (not in navigation) |

**Navigation:** 4 dropdowns (Solutions, Products, Resources, Company) + Language selector (EN, zh-TW, zh-CN)

**See:** Navigation structure in any page's `<nav>` element for full dropdown hierarchy.

## Design System

### Color Palette

**OFFICIAL BRAND COLORS** (defined in `tailwind.config.js`):

| Color | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| **Primary Orange** | `#ff7a3d` | `primary-orange` | CTA buttons, links, brand accents |
| **Dark Orange** | `#e6682f` | `dark-orange` | Hover states, active states |
| **Light Orange** | `#ffb088` | `light-orange` | Subtle backgrounds, highlights |
| **Primary Black** | `#1a1a1a` | `primary-black` | Headers, dark sections, footer |
| **Dark Grey** | `#4a4a4a` | `dark-grey` | Body text, paragraphs |
| **Medium Grey** | `#808080` | `medium-grey` | Secondary text, captions |
| **Light Grey** | `#f5f5f5` | `light-grey` | Section backgrounds, dividers |

**⚠️ DEPRECATED:** Do NOT use `#FF6B35` (old inline style from index.html)

**Usage Rules:**
- **CTA Buttons:** `bg-primary-orange hover:bg-dark-orange`
- **Body Text:** `text-dark-grey` (NOT `text-primary-black`)
- **Headings:** `text-primary-black`
- **Links:** `text-primary-orange hover:text-dark-orange`
- **Footer:** `bg-primary-black text-white`

**Inline Tailwind Config** (for HTML pages using CDN):
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'primary-orange': '#ff7a3d',   // ✅ Official
        'dark-orange': '#e6682f',
        'light-orange': '#ffb088',
        'primary-black': '#1a1a1a',
        'dark-grey': '#4a4a4a',
        'medium-grey': '#808080',
        'light-grey': '#f5f5f5'
      }
    }
  }
}
```

### Custom Component Classes
Defined in `src/input.css` using `@layer components`:

#### Buttons
- `.btn-primary` - Orange background, white text, hover effects
- `.btn-secondary` - White background, black border, hover to orange

#### Layout
- `.section-container` - Max-width container with responsive padding
- `.feature-card` - White card with shadow and hover lift effect

#### Navigation
- `.dropdown` - Desktop dropdown wrapper (hover-activated)
- `.dropdown-trigger` - Dropdown button with chevron
- `.dropdown-menu` - Dropdown content (positioned absolutely)
- `.dropdown-item` - Individual dropdown link
- `.mobile-dropdown-trigger` - Mobile accordion button
- `.mobile-dropdown-menu` - Mobile accordion content (requires `.active` class)

#### Special
- `.workflow-step` - Enhanced card with hover animation

### Typography & Spacing
- Headlines: `text-4xl` to `text-7xl` (responsive)
- Sections: `text-3xl` to `text-5xl`
- Body: `text-base` to `text-xl`
- Section padding: `py-16` to `py-24`
- Container max-width: `max-w-7xl` (1280px)

### Layout Standards

#### Container Widths
**Standard Container:**
- **Tailwind Class:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Max Width:** 1280px
- **Usage:** All new pages MUST use this
- **⚠️ Deprecated:** 1200px inline styles (legacy from index.html)

**Custom Class (already defined):**
```css
.section-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24;
}
```

#### Grid Patterns
Standard responsive grids used across the site:

| Grid | Classes | Usage |
|------|---------|-------|
| 2-column | `grid md:grid-cols-2 gap-8` | Features, comparisons |
| 3-column | `grid md:grid-cols-2 lg:grid-cols-3 gap-8` | Feature cards, services |
| 4-column | `grid grid-cols-2 lg:grid-cols-4 gap-6` | Icon grids, small cards |
| Footer | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8` | Footer links |

#### Section Spacing
Consistent vertical spacing for sections:

| Section Type | Classes | Height |
|--------------|---------|--------|
| Standard | `py-16 md:py-20 lg:py-24` | 256-384px |
| Compact | `py-12 md:py-16` | 192-256px |
| Hero | `pt-24 pb-16 md:pt-32 md:pb-24` | Top: 384px, Bottom: 256-384px |
| Minimal | `py-8 md:py-12` | 128-192px |

#### Typography Hierarchy
Responsive heading sizes:

| Element | Classes | Desktop Size |
|---------|---------|-------------|
| Hero H1 | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold` | 72px |
| Section H2 | `text-3xl sm:text-4xl md:text-5xl font-bold` | 48px |
| Subsection H3 | `text-xl md:text-2xl font-semibold` | 30px |
| Card Title | `text-xl font-bold` | 20px |
| Body Large | `text-lg md:text-xl` | 20px |
| Body Standard | `text-base` | 16px |
| Body Small | `text-sm` | 14px |

### Page Templates

**Reference Implementation:** `for-distributors.html` - Complete working example with all features

**Key Requirements:**
- Include `<script src="i18n/i18n.js"></script>` in `<head>`
- Add `class="i18n-loading"` on `<body>`
- Configure Tailwind inline with official brand colors (see Color Palette section)
- Add language selector dropdowns (desktop + mobile)
- Use standard container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Include `<script src="js/main.js"></script>` before `</body>`

**To create a new page:** Copy `for-distributors.html` and customize content. All pages use the same header/footer structure.

## JavaScript Functionality

Located in `src/js/main.js` (vanilla JS, no frameworks):

1. **Mobile menu toggle** - Hamburger menu show/hide
2. **Mobile dropdown accordion** - Accordion behavior for mobile nav dropdowns
3. **Smooth scroll** - Smooth scrolling for anchor links with offset for fixed header
4. **Navbar shadow on scroll** - Adds shadow when scrolling past 100px

All functionality uses `data-dropdown` and `data-menu` attributes to connect triggers with menus.

## Internationalization (i18n)

The website includes a comprehensive translation system supporting multiple languages.

### Supported Languages
- English (en) - Default
- Traditional Chinese (zh-TW)
- Simplified Chinese (zh-CN)

### i18n Implementation Progress

**Current Status:** 23 of 30 pages (77%) have full i18n support

**Pages with i18n (23):**
- Corporate: nfc-user-guide.html
- Blog: All 6 articles (nfc-parknshop, e-coupons-preference, environmental-excellence, holiday-guide, hotel-tech-innovation, smart-retail)
- News: All 8 articles (cioworld-feature, dual-esg-awards, edigest-leading-solution, ejtech-300m-coupons, forbes-dicky-yin, funding-announcement, techapple-innovation-index, treasure-global-partnership)
- Hub pages: news-press.html (verified 2026-02-17)
- Solutions: for-distributors.html (reference implementation)

**Remaining Pages (7):**
- Core: index.html, about.html, contact.html
- Solutions: for-merchants.html, for-developers.html
- Products: coupon-management.html, coupon-marketplace.html, coupon-nfc.html, coupon-marketing.html, coupon-wallet.html, coupon-playbook.html

**Progress Tracking:** See STATUS.md for current i18n implementation status

---

### File Structure
```
dist/i18n/
  ├── README.md              # Complete i18n documentation (383 lines)
  ├── TRANSLATION_CHECKLIST.md  # Quick reference checklist (222 lines)
  ├── TRANSLATION_GLOSSARY.md   # Standardized terminology (136 lines)
  ├── QA-CHECKLIST.md           # Comprehensive testing (292 lines)
  ├── i18n.js                # Core translation library
  └── translations/
      ├── en.json            # English translations (1,873 lines)
      ├── zh-TW.json         # Traditional Chinese (1,738 lines)
      └── zh-CN.json         # Simplified Chinese (1,738 lines)
```

**Total:** 5,349 lines of translation data + 1,033 lines of documentation

---

### Quick Start
To add translations to a page:

1. **Add i18n script in HTML `<head>`:**
   ```html
   <script src="i18n/i18n.js"></script>
   ```

2. **Add loading class to `<body>`:**
   ```html
   <body class="i18n-loading">
   ```

3. **Mark content for translation:**
   ```html
   <h1 data-i18n="pageName.section.title">Default Text</h1>
   <input data-i18n-placeholder="pageName.form.field">
   ```

4. **Add translations to JSON files:**
   Update all three files (`en.json`, `zh-TW.json`, `zh-CN.json`) with matching keys:
   ```json
   {
     "pageName": {
       "section": {
         "title": "Translated text"
       }
     }
   }
   ```

5. **Include main.js before `</body>`:**
   ```html
   <script src="js/main.js"></script>
   ```

---

### Key Naming Convention
Use dot-notation with descriptive names:
- ✅ `distributors.hero.title`
- ✅ `contact.form.firstName`
- ✅ `common.nav.solutions`
- ❌ `page1.heading1`

**Best Practices:**
- Use semantic names that describe content, not position
- Group related keys under common namespace (e.g., `contact.form.*`)
- Use consistent naming patterns across pages
- Review existing keys before creating new ones to avoid duplication

---

## Translation Workflows

### Workflow 1: Adding i18n to a Single Page

**Quick Steps:**
1. Add `<script src="i18n/i18n.js"></script>` to `<head>`
2. Add `class="i18n-loading"` to `<body>`
3. Add language selector dropdowns (desktop + mobile)
4. Add `data-i18n` attributes to all user-facing text
5. Update all 3 JSON files (en.json, zh-TW.json, zh-CN.json)
6. Test language switching and persistence

**Detailed Guide:** See `dist/i18n/TRANSLATION_CHECKLIST.md` for step-by-step instructions

**Example:** `for-distributors.html` demonstrates complete implementation

---

### Workflow 2: Batch i18n Updates (Multiple Pages)

**Use Case:** Adding i18n to multiple pages at once (e.g., all 6 blog articles)

**Process:**
1. Extract translation keys from HTML files (can automate with scripts)
2. Organize keys into namespace structure
3. Merge keys into all 3 JSON files simultaneously
4. Create backup files before merge (.backup extension)
5. Validate JSON syntax in all files
6. Test on sample pages before deploying all

**Tools:** See `extract-article-translations.js` and `merge-translations.js` examples from commit 21a76eb

**Detailed Guide:** See `ARTICLE-TRANSLATIONS-IMPLEMENTATION.md` for batch process documentation

---

### Workflow 3: Fixing Translation Key Mismatches

**Problem:** Page shows "articles.blog.title" instead of translated content

**Common Causes:**
- Translation key doesn't exist in JSON files
- Typo in `data-i18n` attribute name
- Key exists but has different casing/spelling
- JSON file failed to load (check browser console)

**How to Fix:**
1. Check browser console for "Translation key not found: X" warnings
2. Verify key exists in all 3 JSON files (en.json, zh-TW.json, zh-CN.json)
3. Verify key name matches exactly (case-sensitive)
4. Validate JSON syntax (no trailing commas, missing brackets)
5. Hard refresh browser (Ctrl+Shift+R) to clear cached JSON

**Prevention:** Always update all 3 JSON files together, validate JSON syntax before committing

---

### Workflow 4: Testing & QA Procedures

**Before Committing i18n Changes:**
- [ ] Language switching works (EN → zh-TW → zh-CN → EN)
- [ ] Selected language persists on page reload
- [ ] No translation key strings visible (e.g., "articles.blog.title")
- [ ] No console errors or warnings
- [ ] HTML formatting preserved (bold, links, spans)
- [ ] Numbers/currency format correct for each language
- [ ] Proper nouns unchanged across languages
- [ ] Fallback content displays if i18n.js fails to load

**Detailed QA:** See `dist/i18n/QA-CHECKLIST.md` for comprehensive testing procedures

---

## Translation Glossary Requirements

The project maintains a **standardized translation glossary** to ensure consistency across all 30 pages and 14 articles.

### Why Use the Glossary?

- **Consistency:** Same terms translated identically across all pages
- **Quality:** Professional terminology maintained
- **Efficiency:** No re-translating the same phrases
- **User Experience:** Predictable language across the site

### Consistency Rules

**Before translating new content:**
1. Review `dist/i18n/TRANSLATION_GLOSSARY.md` for existing terminology
2. Check other translated pages for precedent
3. Use established translations for common terms (e.g., "coupon" → "優惠券" in zh-TW)
4. For new terms, add to glossary after translation

**Content Guidelines:**
- Maintain HTML formatting (spans, links, strong tags)
- Keep proper nouns in English (company names, product names)
- Keep numeric values unchanged
- Preserve special characters and punctuation

### Glossary Reference

**File:** `dist/i18n/TRANSLATION_GLOSSARY.md`

**Contains:** 100+ standardized term translations across EN/zh-TW/zh-CN including:
- Product terminology (coupon, marketplace, wallet, NFC)
- Business terms (merchant, distributor, campaign)
- UI labels (submit, cancel, learn more)
- Messaging (success, error, warning)

---

## HTML Content in Translations

Translation strings can include **limited HTML** for formatting, but this requires security awareness.

### Safe HTML Tags

**Allowed in translations:**
- `<span>` with class attributes (e.g., `<span class="text-primary-orange">`)
- `<strong>` and `<b>` for bold text
- `<em>` and `<i>` for italic text
- `<a href="...">` for links (URLs should be validated)

**Example:**
```json
{
  "title": "We are <span class=\"text-primary-orange\">pioneers</span> in digital coupons",
  "description": "Learn more about our <strong>innovative solutions</strong> for merchants"
}
```

### Security Considerations ⚠️

**CRITICAL:** `i18n.js` uses `.innerHTML` when content contains `<` character (line 110)

**XSS Risk:** If translation content includes user-provided data, XSS vulnerabilities possible

**Mitigation:**
- Never include user input in translation strings
- Only allow HTML in controlled, static translations
- Use `.textContent` for dynamic content (see SECURITY.md)
- Consider DOMPurify for HTML sanitization if implementing dynamic translations

**Status:** Known security issue documented in STATUS.md (Priority: High)

### Fallback Behavior

**When translation key is missing:**
- i18n.js returns `null` (as of commit a731688)
- Original HTML fallback content displays
- Console warning logged: "Translation key not found: X"
- Users see actual content instead of technical key strings

**Best Practice:** Always include fallback content in HTML elements:
```html
<h1 data-i18n="page.title">Default English Title (displays if key missing)</h1>
```

---

## Common Issues & Troubleshooting

### Issue 1: Page Shows Translation Keys Instead of Content

**Symptom:** Elements display "articles.blog.nfcParknshop.title" instead of translated text

**Root Causes:**
- Translation key doesn't exist in JSON files (most common)
- JSON file failed to load (check browser console Network tab)
- Key name mismatch (typo in `data-i18n` attribute)

**Fix:**
1. Open browser console and look for warnings: `Translation key not found: X`
2. Verify key exists in all 3 JSON files (en.json, zh-TW.json, zh-CN.json)
3. Verify exact key name match (case-sensitive, check for typos)
4. Validate JSON syntax with linter or jsonlint.com
5. Hard refresh (Ctrl+Shift+R) to clear cached JSON files

**Recent Fix:** Commit a731688 changed fallback behavior - now shows HTML content instead of key string

---

### Issue 2: Language Selection Doesn't Persist

**Symptom:** Language resets to English on page reload or navigation

**Root Causes:**
- localStorage disabled in browser
- i18n.js not fully loaded before main.js executes
- Browser in private/incognito mode (localStorage limited)

**Fix:**
1. Verify localStorage enabled: Open console and run `localStorage.setItem('test', '1')`
2. Check i18n.js loads before main.js in HTML (`<script>` order matters)
3. Verify `data-lang` attribute on language selector links
4. Check console for errors during page load

**Prevention:** Always include i18n.js in `<head>` and main.js before `</body>`

---

### Issue 3: Some Elements Don't Translate

**Symptom:** Some text remains in default language when switching

**Root Causes:**
- Missing `data-i18n` attribute on element
- Translation key exists but is empty string in JSON
- Element added to DOM after i18n.init() executed (dynamic content)

**Fix:**
1. Inspect element in browser DevTools and verify `data-i18n` attribute present
2. Check JSON file for empty values: `"key": ""`
3. For dynamic content, manually call i18n after adding to DOM

---

### Issue 4: How to Find All Missing Translation Keys?

**Methods:**
1. **Browser Console:** Warnings logged automatically: "Translation key not found: X"
2. **Automated Testing:** Use test page (see test-i18n.html example)
3. **JSON Comparison:** Compare keys across en.json, zh-TW.json, zh-CN.json
4. **Grep Search:** Search HTML files for `data-i18n` attributes and cross-reference with JSON

**Detailed Troubleshooting:** See `dist/i18n/README.md` § Troubleshooting section

---

## Testing Checklist

### Essential i18n Tests (Before Commit)

Run these tests on every page with i18n changes:

- [ ] **Language Switching:** Toggle EN → zh-TW → zh-CN → EN works correctly
- [ ] **Persistence:** Selected language persists on page reload
- [ ] **Content Display:** No translation key strings visible (e.g., "articles.blog.title")
- [ ] **Console Clean:** No errors or warnings in browser console
- [ ] **HTML Formatting:** Bold, links, spans render correctly in all languages
- [ ] **Fallback Content:** Original HTML displays if i18n.js fails to load
- [ ] **Numbers/Currency:** Numeric values unchanged across languages
- [ ] **Proper Nouns:** Company/product names unchanged

### Comprehensive QA Checklist

For detailed testing procedures including:
- Visual regression testing
- Accessibility validation (WCAG)
- Browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile/tablet responsive testing
- Performance impact measurement

**See:** `dist/i18n/QA-CHECKLIST.md` for comprehensive testing procedures (292 lines)

---

### Reference Implementation
See `for-distributors.html` for a complete working example with all i18n features implemented.

---

## i18n Documentation Reference

The i18n system has **comprehensive documentation** across multiple files. Use this table to find the right documentation for your task:

| Documentation File | Lines | Use When | Contents |
|-------------------|:-----:|----------|----------|
| **README.md** | 383 | Implementing i18n for first time | Complete setup guide, best practices, architecture, troubleshooting |
| **TRANSLATION_CHECKLIST.md** | 222 | Adding i18n to a page | Quick step-by-step checklist, validation steps |
| **TRANSLATION_GLOSSARY.md** | 136 | Translating content | Standardized terminology, consistency rules, proper nouns |
| **QA-CHECKLIST.md** | 292 | Testing i18n implementation | Comprehensive QA procedures, visual regression, accessibility |
| **for-distributors.html** | — | Reference implementation | Complete working example with all i18n features |
| **CLAUDE.md (this file)** | — | Quick reference & workflows | High-level guide with links to detailed docs |

**File Locations:** All documentation in `dist/i18n/` directory

### Quick Navigation

- **New to i18n?** Start with README.md for architecture overview
- **Adding i18n to page?** Use TRANSLATION_CHECKLIST.md for quick steps
- **Translating content?** Review TRANSLATION_GLOSSARY.md for terminology
- **Ready to test?** Follow QA-CHECKLIST.md for comprehensive validation
- **Need example?** View for-distributors.html source code
- **Fixing issues?** Check "Common Issues & Troubleshooting" section above

### Translation Files

| File | Lines | Language | Status |
|------|------:|----------|--------|
| `en.json` | 1,873 | English (default) | ✅ Master file |
| `zh-TW.json` | 1,738 | Traditional Chinese | ✅ Complete |
| `zh-CN.json` | 1,738 | Simplified Chinese | ✅ Complete |

**Total:** 5,349 lines of translation data across 23 pages (77% coverage)

## Development Workflow

### Making Content/Structure Changes
1. Edit the relevant HTML file in `dist/` directory
2. Run `npm run build` (regenerates CSS from Tailwind)
3. Refresh browser to see changes

### Making Style Changes
1. Edit `src/input.css` for component classes OR `tailwind.config.js` for theme
2. Run `npm run build`
3. Refresh browser

### Making Interactive Changes
1. Edit `src/js/main.js`
2. No build needed
3. Refresh browser

### Adding a New Page

**Prerequisites:**
- Read "Page Templates" section in Design System
- Read "Security Quick Reference" section

**Steps:**

1. **Create HTML file** in `dist/` directory
   - Use semantic filename: `product-name.html` or `feature-name.html`

2. **Copy full page structure** from "Page Templates" section
   - Includes: head, navigation, hero, footer
   - All required meta tags, i18n setup, security headers

3. **Verify color configuration**
   - ✅ Use: `#ff7a3d` (primary-orange)
   - ❌ NOT: `#FF6B35` (deprecated)

4. **Add i18n support** (3 languages required):
   - ✅ `<script src="i18n/i18n.js"></script>` in `<head>`
   - ✅ `class="i18n-loading"` on `<body>`
   - ✅ `data-i18n` attributes on all user-facing text
   - ✅ Update `dist/i18n/translations/en.json`
   - ✅ Update `dist/i18n/translations/zh-TW.json`
   - ✅ Update `dist/i18n/translations/zh-CN.json`

5. **Use standard layout patterns**:
   - Container: `<div class="section-container">` or `max-w-7xl mx-auto`
   - NOT: Inline `max-width: 1200px`
   - Grid: Use standard patterns (2-col, 3-col, 4-col)
   - Spacing: `py-16 md:py-20 lg:py-24`

6. **Security checklist**:
   - [ ] No hardcoded secrets or API keys
   - [ ] Input validation on forms (if applicable)
   - [ ] XSS protection: Use `textContent`, not `innerHTML`
   - [ ] Proper error handling (no stack traces to users)

7. **Build CSS**: `npm run build`

8. **Test all features**:
   - [ ] Desktop navigation dropdowns work
   - [ ] Mobile menu opens/closes
   - [ ] Language switching works (EN, zh-TW, zh-CN)
   - [ ] Language persists on reload
   - [ ] Footer links correct
   - [ ] Brand colors match (#ff7a3d)
   - [ ] Responsive: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
   - [ ] No console errors
   - [ ] Security headers present (if deployed)

9. **Update sitemap** (if publicly accessible):
   - Add to `dist/sitemap.xml`
   - Add to navigation dropdowns (if appropriate)

10. **Security audit**:
    - Run: `npm audit`
    - Check: No secrets in code
    - Verify: `.gitignore` configured

### Adding Navigation Dropdown Items
Desktop dropdowns are CSS-only (`:hover`). Mobile dropdowns use JavaScript accordion.

**Desktop pattern:**
```html
<div class="dropdown">
  <button class="dropdown-trigger text-medium-grey hover:text-primary-black transition-colors">
    Menu Name
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>
  <div class="dropdown-menu">
    <a href="#" class="dropdown-item">Item</a>
  </div>
</div>
```

**Mobile pattern:**
```html
<div class="mobile-dropdown">
  <button class="mobile-dropdown-trigger" data-dropdown="unique-id">
    <span>Menu Name</span>
    <svg class="w-4 h-4 transform transition-transform chevron">...</svg>
  </button>
  <div class="mobile-dropdown-menu" data-menu="unique-id">
    <a href="#" class="block py-2 text-sm">Item</a>
  </div>
</div>
```

Ensure `data-dropdown` attribute matches `data-menu` attribute.

## Responsive Design

Uses Tailwind's mobile-first approach with breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Common patterns:
```html
<!-- Progressive text sizing -->
<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">

<!-- Grid responsiveness -->
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

<!-- Show/hide by screen size -->
<span class="md:hidden">Mobile only</span>
<div class="hidden md:flex">Desktop only</div>
```

## Important Notes

### Inline Styles vs. Compiled CSS
Some pages (like `index.html`) use inline `<style>` tags with custom CSS alongside Tailwind CDN, while others use the compiled `output.css`. This is intentional for flexibility but be aware of potential style conflicts.

### Content Source
- Original content documented in `Temp/home.md`
- Update HTML from this source when making content changes

### Assets
- Logo: `dist/assets/images/logo.png`
- Favicon: `dist/favicon.png`
- Apple icon: `dist/apple-touch-icon.png`

### Git Repository
The `dist/` folder contains its own `.git` repository, suggesting it may be deployed separately. Be cautious with git operations.

## Common Pitfalls

1. **Forgetting to build** - CSS changes require `npm run build`
2. **Editing output.css** - This file is generated; edit `src/input.css` instead
3. **Breaking mobile navigation** - Ensure `data-dropdown` matches `data-menu`
4. **Color inconsistency** - Some pages use different orange values; check existing patterns
5. **Responsive breakage** - Always test mobile, tablet, and desktop viewports

## Testing Checklist

Before deploying changes:
- [ ] Run `npm run build`
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Verify all dropdowns work (desktop hover + mobile click)
- [ ] Check color consistency with brand
- [ ] Test smooth scroll on anchor links
- [ ] Verify mobile menu opens/closes
- [ ] Test language switching (if page has i18n)
  - [ ] Switch between English, Traditional Chinese, and Simplified Chinese
  - [ ] Verify language persists on page reload
  - [ ] Check for missing translations (console warnings)

---

## Security Quick Reference

### Critical Security Checklist

Before deploying ANY changes:
- [ ] No secrets in code (check .env is gitignored)
- [ ] Input validation on all forms (client + server)
- [ ] CSP headers configured (see SECURITY.md)
- [ ] SRI hashes for CDN resources
- [ ] XSS protection: NO innerHTML with user data
- [ ] .gitignore configured
- [ ] Security headers in S3/CloudFront
- [ ] Dependencies audited: `npm audit`
- [ ] HTTPS enforced (CloudFront redirect)
- [ ] Error messages don't leak info

### Common Security Pitfalls

**1. XSS via innerHTML** ⚠️ CRITICAL
```javascript
// ❌ VULNERABLE (current i18n.js):
element.innerHTML = translation;

// ✅ SECURE (fix):
element.textContent = translation;

// ✅ SECURE (if HTML needed):
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(translation);
```

**2. Missing .gitignore** ⚠️ HIGH RISK
- Risk: Accidentally commit .env files with API keys
- Fix: Use .gitignore from repository root

**3. No CSP Headers** ⚠️ MEDIUM
- Risk: Inline script injection attacks
- Fix: Configure CSP in CloudFront (see SECURITY.md)

**4. CDN Without SRI** ⚠️ MEDIUM
```html
<!-- ❌ VULNERABLE: -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- ✅ SECURE: -->
<script
  src="https://cdn.tailwindcss.com"
  integrity="sha384-[HASH]"
  crossorigin="anonymous">
</script>
```

**5. localStorage with Sensitive Data** ⚠️ LOW
- ✅ OK: UI preferences, language selection
- ❌ NEVER: Tokens, passwords, API keys, PII

### Security Documentation

- **Full Security Guide:** [SECURITY.md](SECURITY.md)
- **Report Vulnerabilities:** security@mezzofy.com
- **AWS Security:** See "AWS S3 Deployment" section below
- **Vulnerability Disclosure:** [.well-known/security.txt](dist/.well-known/security.txt)

### Quick Security Audit Commands

```bash
# Check for secrets in code
grep -r "API_KEY\|SECRET\|PASSWORD" dist/ src/

# Audit dependencies
npm audit

# Check security headers (after deployment)
curl -I https://mezzofy.com | grep -i "strict-transport-security\|x-frame-options\|content-security-policy"

# Verify .gitignore working
git status --ignored
```

### Security Testing Checklist

Before production deployment:
- [ ] Run: `npm audit` (no high/critical vulnerabilities)
- [ ] Verify: No hardcoded secrets in code
- [ ] Test: XSS prevention (try `<script>alert('XSS')</script>` in forms)
- [ ] Test: HTTPS redirect (visit http:// URL)
- [ ] Verify: Security headers present (curl -I)
- [ ] Test: Language switching (validate against whitelist)
- [ ] Verify: Error messages sanitized (no stack traces)

---

## Deployment

mz-website is deployed as a static site on AWS S3 + CloudFront.

### Quick Deploy

```bash
# Build production files
npm run build

# Deploy to S3 (requires AWS CLI configured)
aws s3 sync dist/ s3://mezzofy-website --delete

# Invalidate CloudFront cache (if using CDN)
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

### Complete Deployment Guide

For full AWS S3 + CloudFront deployment documentation including:
- S3 bucket setup and configuration
- CloudFront CDN setup with HTTPS/SSL
- Custom domain configuration (Route 53)
- Security headers implementation
- CI/CD with GitHub Actions
- Performance optimization
- Cache invalidation strategies
- Cost estimation
- Troubleshooting
- Monitoring and analytics

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for comprehensive deployment instructions.

---

## Project Maintenance

### Regular Tasks

**Weekly:**
- Check for dependency updates: `npm outdated`
- Review AWS costs in Billing Dashboard
- Check CloudWatch alarms

**Monthly:**
- Run security audit: `npm audit`
- Update dependencies: `npm update`
- Review CloudFront access logs
- Check S3 bucket size and requests

**Quarterly:**
- Full security review
- Performance audit (Lighthouse)
- SEO audit
- Update documentation
