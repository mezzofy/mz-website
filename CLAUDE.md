# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mezzofy is a multi-page static website for the Global Coupon Exchange Protocol. Built with HTML5, Tailwind CSS 3.4, and vanilla JavaScript. The site features a marketing landing page, product pages, blog, news section, and information pages for merchants, distributors, and developers.

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

## Design System

### Color Palette
The site uses a custom orange brand theme defined in `tailwind.config.js`:

```javascript
'primary-orange': '#ff7a3d'   // Main brand color
'dark-orange': '#e6682f'       // Hover states
'light-orange': '#ffb088'      // Subtle accents
'primary-black': '#1a1a1a'     // Dark backgrounds
'dark-grey': '#4a4a4a'         // Body text
'medium-grey': '#808080'       // Secondary text
'light-grey': '#f5f5f5'        // Section backgrounds
```

**Note:** The main `index.html` uses inline Tailwind config with slightly different orange (`#FF6B35`). Other pages may use the tailwind.config.js colors. Check individual files.

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

### File Structure
```
dist/i18n/
  ├── README.md              # Complete i18n documentation
  ├── TRANSLATION_CHECKLIST.md  # Quick reference checklist
  ├── i18n.js                # Core translation library
  └── translations/
      ├── en.json            # English translations
      ├── zh-TW.json         # Traditional Chinese
      └── zh-CN.json         # Simplified Chinese
```

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

### Key Naming Convention
Use dot-notation with descriptive names:
- ✅ `distributors.hero.title`
- ✅ `contact.form.firstName`
- ✅ `common.nav.solutions`
- ❌ `page1.heading1`

### Reference Implementation
See `for-distributors.html` for a complete working example.

### Full Documentation
For comprehensive instructions, best practices, and troubleshooting:
- **Complete guide**: `dist/i18n/README.md`
- **Quick checklist**: `dist/i18n/TRANSLATION_CHECKLIST.md`

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
1. Create HTML file in `dist/` directory
2. Copy navigation structure from existing page (including language dropdown)
3. Add i18n support (see Internationalization section above):
   - Add `<script src="i18n/i18n.js"></script>` in `<head>`
   - Add `class="i18n-loading"` to `<body>`
   - Mark content with `data-i18n` attributes
   - Update all three translation JSON files
4. Use existing component classes (`.btn-primary`, `.feature-card`, etc.)
5. Ensure mobile navigation works with existing JS
6. Run `npm run build`
7. Test language switching on the new page

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
