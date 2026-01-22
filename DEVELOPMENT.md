# Mezzofy Development Guidelines

## 🎯 Quick Start for AI Agents

This document provides essential information for AI coding agents working on the Mezzofy landing page project.

## 📋 Project Context

**Project Name:** Mezzofy - Global Coupon Exchange Protocol Landing Page
**Technology Stack:** HTML5, Tailwind CSS 3.4, Vanilla JavaScript
**Build Tool:** Tailwind CLI
**Current State:** Production-ready landing page with multi-level navigation

## 🎨 Design System Quick Reference

### Color Palette (MUST USE)
```javascript
// Tailwind Config Colors
'primary-orange': '#ff7a3d'    // Main brand color - buttons, accents
'dark-orange': '#e6682f'        // Hover states
'light-orange': '#ffb088'       // Subtle accents
'primary-black': '#1a1a1a'      // Dark backgrounds
'dark-grey': '#4a4a4a'          // Body text
'medium-grey': '#808080'        // Secondary text
'light-grey': '#f5f5f5'         // Section backgrounds
```

### Typography Scale
```
Headlines: text-4xl → text-7xl (responsive)
Sections:  text-3xl → text-5xl
Body:      text-base → text-xl
Small:     text-sm
```

### Spacing Scale (Tailwind Standard)
```
gap-2  = 0.5rem
gap-4  = 1rem
gap-8  = 2rem
py-16  = 4rem
py-24  = 6rem
```

## 🏗️ Architecture

### File Structure
```
src/input.css       → Source CSS (edit this)
dist/output.css     → Compiled CSS (generated, don't edit)
dist/index.html     → Main HTML (edit this)
src/js/main.js      → JavaScript (edit this)
tailwind.config.js  → Theme config (edit colors here)
```

### Build Workflow
```bash
# After HTML/CSS changes:
npm run build

# For development with auto-rebuild:
npm run dev
```

## 🔧 Common Tasks

### Adding a Button
```html
<!-- Primary CTA -->
<a href="#" class="btn-primary">Button Text</a>

<!-- Secondary -->
<a href="#" class="btn-secondary">Button Text</a>
```

### Adding a Section
```html
<section class="bg-white">  <!-- or bg-light-grey -->
  <div class="section-container">
    <h2 class="text-3xl md:text-5xl font-bold text-primary-black mb-6">
      Section Title
    </h2>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="feature-card">Content</div>
    </div>
  </div>
</section>
```

### Adding Navigation Dropdown
**Desktop:**
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

**Mobile:**
```html
<div class="mobile-dropdown">
  <button class="mobile-dropdown-trigger" data-dropdown="unique-id">
    <span>Menu Name</span>
    <svg class="w-4 h-4 transform transition-transform chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>
  <div class="mobile-dropdown-menu" data-menu="unique-id">
    <a href="#" class="block py-2 text-sm text-medium-grey hover:text-primary-orange">Item</a>
  </div>
</div>
```

## 🚨 Critical Rules

### DO's ✅
- **ALWAYS** run `npm run build` after editing HTML or CSS
- **ALWAYS** use existing color classes (primary-orange, dark-grey, etc.)
- **ALWAYS** use component classes (.btn-primary, .feature-card, etc.)
- **ALWAYS** maintain responsive patterns (md:, lg: prefixes)
- **ALWAYS** use `.section-container` for section padding
- **ALWAYS** test on mobile and desktop

### DON'Ts ❌
- **NEVER** edit `dist/output.css` directly (it's generated)
- **NEVER** use inline styles
- **NEVER** add custom colors without updating tailwind.config.js
- **NEVER** use arbitrary values like `w-[234px]` - use Tailwind scale
- **NEVER** forget to rebuild CSS after changes
- **NEVER** break mobile responsiveness

## 📱 Responsive Patterns

### Text Sizing
```html
<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
```

### Grid Layouts
```html
<!-- 1 col mobile, 2 col tablet, 3 col desktop -->
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
```

### Show/Hide
```html
<span class="md:hidden">Mobile only</span>
<div class="hidden md:flex">Desktop only</div>
```

### Spacing
```html
<section class="py-16 sm:py-24">
```

## 🎨 Component Classes Reference

### Navigation
```css
.dropdown              /* Desktop dropdown wrapper */
.dropdown-trigger      /* Desktop dropdown button */
.dropdown-menu         /* Desktop dropdown content */
.dropdown-item         /* Individual dropdown link */
.mobile-dropdown-trigger   /* Mobile accordion button */
.mobile-dropdown-menu      /* Mobile accordion content */
```

### Buttons
```css
.btn-primary          /* Orange CTA button */
.btn-secondary        /* Outlined button */
```

### Layout
```css
.section-container    /* Section wrapper with padding */
.feature-card         /* White card with shadow */
```

## 🔍 Current Navigation Structure

### Desktop
```
Logo | Products ▼ | Developer ▼ | Resources ▼ | Company ▼ | [Get Started]
```

### Mobile
```
[MEZZOFY Logo] [☰]
  Products ▼ (5 items)
  Developer ▼ (2 items)
  Resources ▼ (2 items)
  Company ▼ (4 items)
  Get Started
```

## 🎯 Current Page Sections

1. **Navigation** - Sticky header with dropdowns
2. **Hero** - Dark gradient with dual CTAs
3. **Protocol Shift** - Light grey, 3-column grid
4. **For Merchants** - White, 2-column grid
5. **For Distributors** - Light grey, 2-column grid
6. **Tokenization Core** - Dark gradient, 3-column grid
7. **Footer** - Black background, 4-column grid

## 🐛 Troubleshooting

### CSS Not Applying?
```bash
# Run build
npm run build

# Hard refresh browser
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Dropdown Not Working?
- Desktop: Check CSS hover (`.dropdown:hover .dropdown-menu`)
- Mobile: Check `data-dropdown` matches `data-menu`
- Check browser console for JavaScript errors

### Colors Wrong?
- Verify class names match tailwind.config.js
- Use `primary-orange` not `orange-primary`
- Run `npm run build` after config changes

## 📊 File Sizes

Current (December 2024):
- HTML: 22KB
- CSS: 16KB (minified)
- Logo: 5.5KB
- Total: ~44KB

## 🔐 Important Notes

### Content Source
- Original content in `Temp/home.md`
- Update HTML from this source
- Keep content structure consistent

### Assets
- Logo: `dist/assets/images/logo.png`
- Favicon: `dist/favicon.png`
- Apple Icon: `dist/apple-touch-icon.png`

### JavaScript Features
Located in `src/js/main.js`:
1. Mobile menu toggle
2. Mobile dropdown accordion
3. Smooth scroll for anchor links
4. Navbar shadow on scroll

## 🎯 Coding Patterns to Follow

### Use Semantic HTML
```html
<!-- Good -->
<section>
  <h2>Heading</h2>
  <p>Content</p>
</section>

<!-- Bad -->
<div>
  <div class="text-3xl font-bold">Heading</div>
  <div>Content</div>
</div>
```

### Use Tailwind Classes
```html
<!-- Good -->
<button class="bg-primary-orange hover:bg-dark-orange">

<!-- Bad -->
<button style="background: #ff7a3d">
```

### Mobile-First Responsive
```html
<!-- Good -->
<div class="text-base md:text-lg lg:text-xl">

<!-- Bad -->
<div class="lg:text-xl md:text-lg text-base">
```

## 🚀 Quick Reference Commands

```bash
# Install dependencies
npm install

# Development mode (watch)
npm run dev

# Production build
npm run build

# Check file structure
ls -R dist/

# Verify CSS compiled
ls -lh dist/output.css
```

## 📋 Pre-Deployment Checklist

- [ ] Run `npm run build`
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Verify all dropdowns work
- [ ] Check color consistency
- [ ] Validate HTML (no errors)
- [ ] Test all links
- [ ] Check favicon appears
- [ ] Verify logo displays

## 🎓 Learning Resources

**Tailwind CSS:**
- Docs: https://tailwindcss.com/docs
- Colors: https://tailwindcss.com/docs/customizing-colors
- Responsive: https://tailwindcss.com/docs/responsive-design

**Flexbox:**
- Guide: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

**CSS Grid:**
- Guide: https://css-tricks.com/snippets/css/complete-guide-grid/

## 💡 Tips for AI Agents

1. **Always check existing patterns** before creating new ones
2. **Use component classes** instead of repeating utility classes
3. **Maintain consistency** with existing sections
4. **Test responsiveness** after every change
5. **Update this doc** if you add new patterns
6. **Reference README.md** for detailed component documentation
7. **Check tailwind.config.js** before adding colors
8. **Read src/input.css** for available component classes

## 🔄 Common Workflows

### Adding New Content
1. Update content in `Temp/home.md` (if applicable)
2. Edit `dist/index.html`
3. Use existing component classes
4. Run `npm run build`
5. Test in browser

### Changing Colors
1. Edit `tailwind.config.js` theme colors
2. Update color usage in `dist/index.html`
3. Run `npm run build`
4. Verify color contrast

### Adding Components
1. Define in `src/input.css` using `@layer components`
2. Use in `dist/index.html`
3. Run `npm run build`
4. Document in README.md

---

**Last Updated:** December 2024
**For:** AI Coding Agents
**Project:** Mezzofy Landing Page
