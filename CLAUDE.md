# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mezzofy is a multi-page static website for the Global Coupon Exchange Protocol. Built with HTML5, Tailwind CSS 3.4, and vanilla JavaScript. The site features a marketing landing page, product pages, blog, news section, and information pages for merchants, distributors, and developers.

---

## Status Management

### Project Status Tracking

**Location:** [`STATUS.md`](STATUS.md)

The STATUS.md file provides a real-time snapshot of project progress, including:
- Current phase and objectives
- Recently completed work (last 7 days)
- In-progress tasks
- Upcoming planned work
- Active blockers
- Quality gate status
- Key metrics

**Current Status:** See [`STATUS.md`](STATUS.md) for the latest project state.

---

### When to Update STATUS.md

Update STATUS.md in the following scenarios:

**1. After Completing a Task** (MANDATORY)
- Add completed item to "Recently Completed" section
- Update "Current Phase" progress percentage
- Move item from "In Progress" to "Recently Completed"
- Update metrics if applicable

**2. Before Starting a Task**
- Add task to "In Progress" section
- Include file paths and next steps
- Set owner (if team project)

**3. When Context Reaches 50-60%** (Before `/clear`)
- Review and update current status
- Ensure "In Progress" section is accurate
- Add any new blockers discovered
- Update quality gate status

**4. After Phase Completion**
- Update "Current Phase" to next phase
- Archive old "Recently Completed" items (>7 days)
- Update "Upcoming" section with new priorities
- Increment "Overall Progress" percentage

**5. When Adding/Resolving Blockers**
- Add blocker to "Active Blockers" section immediately
- When resolved, move to Change Log with resolution note

**6. Weekly (Recommended)**
- Update key metrics
- Review and prune old "Recently Completed" items
- Update "Upcoming" priorities based on learnings

---

### Status Update Template

When updating STATUS.md after completing a task:

```markdown
## Recently Completed (Last 7 Days)

**[Today's Date]:**
- ✅ [Task description] → `file/path/modified` ([commit hash])
  - Impact: [Brief description of what changed]
  - Related: [Link to detailed docs if applicable]
```

**Example:**
```markdown
**2026-02-16:**
- ✅ Fixed XSS vulnerability in i18n.js → `dist/i18n/i18n.js` (a3f8912)
  - Impact: Replaced innerHTML with textContent for secure translation rendering
  - Related: SECURITY.md §3.1
```

---

### Integration with Development Workflow

**Typical Task Flow with Status Updates:**

1. **Read STATUS.md** → Understand current project state
2. **Read CLAUDE.md** → Understand how to work on the project
3. **Work on task** → Make code changes
4. **Commit changes** → Git commit with message
5. **Update STATUS.md** → Add to "Recently Completed", update metrics
6. **Commit STATUS.md** → Separate commit for status update

**Before `/clear` (at 50-60% context):**
1. Complete current file/component
2. Commit code changes
3. **Update STATUS.md** with checkpoint
   - Current progress
   - What was completed
   - What's next (resume instructions)
4. Commit STATUS.md
5. Run `/clear`
6. **Re-read STATUS.md** after clear to resume

---

### Status vs Implementation Summary

| File | Purpose | Update Frequency | Scope |
|------|---------|------------------|-------|
| `STATUS.md` | Current operational status | After each task | Last 7 days + current + next 2 weeks |
| `IMPLEMENTATION-SUMMARY.md` | Detailed completion record | After major phases | Specific implementation effort |
| `CLAUDE.md` | Developer guide | When processes change | Timeless reference |

**Relationship:**
- STATUS.md → "What's happening right now?"
- IMPLEMENTATION-SUMMARY.md → "What was implemented and why?"
- CLAUDE.md → "How do I work on this project?"

---

### STATUS.md Maintenance

**Keep it lean (<300 lines):**
- Archive "Recently Completed" items older than 7 days
- Move resolved blockers to Change Log
- Prune completed "Upcoming" items
- Reference detailed docs instead of duplicating content

**Monthly cleanup:**
- Review all sections for relevance
- Update references & documentation links
- Verify metrics are current
- Remove stale entries

**Version control:**
- Commit STATUS.md changes separately from code
- Use descriptive commit messages: "Update STATUS: Completed [task]"
- Git history provides versioning (no need for dated files)

---

### Quick Reference: STATUS.md Sections

| Section | What to Track |
|---------|--------------|
| Quick Summary | 1-2 sentence overview |
| Current Phase | Active phase, objectives, progress |
| Recently Completed | Last 7 days of finished work |
| In Progress | Active tasks with next steps |
| Upcoming | Next 2 weeks of planned work |
| Active Blockers | Current obstacles and mitigation |
| Quality Gate Status | Testing, security, docs, performance |
| Key Metrics | File counts, coverage, issues |
| Known Issues | Documented problems and workarounds |
| Technical Debt | Items to address later |
| References | Links to other docs |
| Change Log | Recent status updates |

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

The Mezzofy website consists of **30 pages** organized into the following categories:

### Site URL Structure

**AWS S3 Static Website Endpoint:**
```
https://[bucket-name].s3-website-[region].amazonaws.com/
```

**Custom Domain (when configured):**
```
https://www.mezzofy.com/
```

### Page Hierarchy

#### 🏠 Core Pages (3)
| Page | File | Purpose |
|------|------|---------|
| Homepage | `/` (`index.html`) | Main landing page with hero, protocol features, benefits |
| About | `/about.html` | Company information, mission, team |
| Contact | `/contact.html` | Contact form and information |

#### 💼 Solutions Pages (3)
| Page | File | Purpose |
|------|------|---------|
| For Merchants | `/for-merchants.html` | Merchant-specific solutions and benefits |
| For Distributors | `/for-distributors.html` | Distributor-specific solutions and benefits |
| For Developers | `/for-developers.html` | Developer documentation and API information |

#### 🎫 Product Pages (6)
| Page | File | Purpose |
|------|------|---------|
| Coupon Management | `/coupon-management.html` | Coupon management system features |
| Coupon Marketplace | `/coupon-marketplace.html` | Marketplace platform features |
| Coupon NFC | `/coupon-nfc.html` | NFC technology and integration |
| Coupon Marketing | `/coupon-marketing.html` | Marketing tools and campaigns |
| Coupon Wallet | `/coupon-wallet.html` | Digital wallet features |
| Coupon Playbook | `/coupon-playbook.html` | Resources and best practices |

#### 🏢 Corporate Pages (3)
| Page | File | Purpose |
|------|------|---------|
| Investors | `/investors.html` | Investor relations and information |
| News & Press | `/news-press.html` | News and press release hub |
| NFC User Guide | `/nfc-user-guide.html` | User guide for NFC features |

#### 📝 Blog Articles (6)
| Article | File | Topic |
|---------|------|-------|
| E-Coupons Preference | `/blog/e-coupons-preference.html` | Consumer preferences for digital coupons |
| Environmental Excellence | `/blog/environmental-excellence.html` | Sustainability initiatives |
| Holiday Guide | `/blog/holiday-guide.html` | Holiday marketing strategies |
| Hotel Tech Innovation | `/blog/hotel-tech-innovation.html` | Technology in hospitality industry |
| NFC at ParknShop | `/blog/nfc-parknshop.html` | Case study: NFC implementation |
| Smart Retail | `/blog/smart-retail.html` | Retail technology trends |

#### 📰 News/Press Articles (8)
| Article | File | Topic |
|---------|------|-------|
| CIO World Feature | `/news/cioworld-feature.html` | CIO World media coverage |
| Dual ESG Awards | `/news/dual-esg-awards.html` | ESG award recognition |
| E-Digest Leading Solution | `/news/edigest-leading-solution.html` | Industry recognition |
| EJ Tech 300M Coupons | `/news/ejtech-300m-coupons.html` | Milestone achievement |
| Forbes Dicky Yin | `/news/forbes-dicky-yin.html` | Forbes feature article |
| Funding Announcement | `/news/funding-announcement.html` | Funding round news |
| TechApple Innovation Index | `/news/techapple-innovation-index.html` | Innovation recognition |
| Treasure Global Partnership | `/news/treasure-global-partnership.html` | Partnership announcement |

#### 🧪 Test Pages (1)
| Page | File | Purpose |
|------|------|---------|
| i18n Test | `/test-i18n.html` | Translation testing (not in navigation) |

### Navigation Structure

The main navigation includes dropdown menus organized as follows:

```
Home
Solutions
  ├─ For Merchants
  ├─ For Distributors
  └─ For Developers
Products
  ├─ Coupon Management
  ├─ Coupon Marketplace
  ├─ Coupon NFC
  ├─ Coupon Marketing
  ├─ Coupon Wallet
  └─ Coupon Playbook
Resources
  ├─ Blog (links to latest articles)
  └─ News & Press
About
  ├─ About Us
  ├─ Investors
  └─ NFC User Guide
Contact
Language Selector
  ├─ English (EN)
  ├─ 繁體中文 (zh-TW)
  └─ 简体中文 (zh-CN)
```

### SEO & Sitemap Notes

- All pages support 3 languages (EN, zh-TW, zh-CN) via i18n.js
- Mobile-first responsive design
- Semantic HTML5 structure
- Meta tags configured per page
- Consider generating `sitemap.xml` for search engines

**To generate sitemap.xml:**
```bash
# Create sitemap.xml in dist/ directory with all 30 pages
# Include lastmod, changefreq, priority for each URL
```

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

Copy-paste these templates when creating new pages.

#### Standard HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page description (150-160 chars)">
  <title>Page Title - Mezzofy</title>

  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="favicon.png">
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">

  <!-- Tailwind CDN + Official Config -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'primary-orange': '#ff7a3d',
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
  </script>

  <!-- Compiled CSS -->
  <link rel="stylesheet" href="output.css">

  <!-- i18n Support -->
  <script src="i18n/i18n.js"></script>
</head>
<body class="bg-white text-dark-grey i18n-loading">

  <!-- Navigation (see Header Template below) -->

  <!-- Hero Section -->
  <section class="pt-32 pb-20 bg-gradient-to-br from-primary-black via-gray-900 to-primary-black text-white">
    <div class="section-container">
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6" data-i18n="page.hero.title">
        Page Title
      </h1>
      <p class="text-lg md:text-xl text-gray-300" data-i18n="page.hero.subtitle">
        Subtitle or tagline
      </p>
    </div>
  </section>

  <!-- Content Sections -->
  <section class="bg-white">
    <div class="section-container">
      <!-- Your content here -->
    </div>
  </section>

  <!-- Footer (see Footer Template below) -->

  <!-- JavaScript -->
  <script src="js/main.js"></script>
</body>
</html>
```

#### Header Template

```html
<nav class="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50" id="navbar">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">

      <!-- Logo -->
      <div class="flex items-center">
        <a href="index.html" class="flex items-center gap-2">
          <img src="assets/images/logo.png" alt="Mezzofy Logo" class="h-8 md:h-10">
          <span class="md:hidden text-xl font-bold text-primary-black">MEZZOFY</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-6">

        <!-- Solutions Dropdown -->
        <div class="dropdown">
          <button class="dropdown-trigger text-medium-grey hover:text-primary-black transition-colors">
            <span data-i18n="common.nav.solutions">Solutions</span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="dropdown-menu">
            <a href="for-merchants.html" class="dropdown-item" data-i18n="common.nav.forMerchants">For Merchants</a>
            <a href="for-distributors.html" class="dropdown-item" data-i18n="common.nav.forDistributors">For Distributors</a>
            <a href="for-developers.html" class="dropdown-item" data-i18n="common.nav.forDevelopers">For Developers</a>
          </div>
        </div>

        <!-- Products Dropdown -->
        <div class="dropdown">
          <button class="dropdown-trigger text-medium-grey hover:text-primary-black transition-colors">
            <span data-i18n="common.nav.products">Products</span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="dropdown-menu">
            <a href="coupon-management.html" class="dropdown-item" data-i18n="common.nav.couponManagement">Coupon Management</a>
            <a href="coupon-marketplace.html" class="dropdown-item" data-i18n="common.nav.couponMarketplace">Coupon Marketplace</a>
            <a href="coupon-nfc.html" class="dropdown-item" data-i18n="common.nav.couponNFC">Coupon NFC</a>
            <a href="coupon-marketing.html" class="dropdown-item" data-i18n="common.nav.couponMarketing">Coupon Marketing</a>
            <a href="coupon-wallet.html" class="dropdown-item" data-i18n="common.nav.couponWallet">Coupon Wallet</a>
          </div>
        </div>

        <!-- Resources Dropdown -->
        <div class="dropdown">
          <button class="dropdown-trigger text-medium-grey hover:text-primary-black transition-colors">
            <span data-i18n="common.nav.resources">Resources</span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="dropdown-menu">
            <a href="coupon-playbook.html" class="dropdown-item" data-i18n="common.nav.couponPlaybook">Coupon Playbook</a>
            <a href="news-press.html" class="dropdown-item" data-i18n="common.nav.newsPress">News & Press</a>
          </div>
        </div>

        <!-- Company Dropdown -->
        <div class="dropdown">
          <button class="dropdown-trigger text-medium-grey hover:text-primary-black transition-colors">
            <span data-i18n="common.nav.company">Company</span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="dropdown-menu">
            <a href="about.html" class="dropdown-item" data-i18n="common.nav.about">About</a>
            <a href="contact.html" class="dropdown-item" data-i18n="common.nav.contact">Contact</a>
            <a href="investors.html" class="dropdown-item" data-i18n="common.nav.investors">Investors</a>
            <a href="nfc-user-guide.html" class="dropdown-item" data-i18n="common.nav.nfcGuide">NFC User Guide</a>
          </div>
        </div>

        <!-- Language Selector -->
        <div class="dropdown">
          <button class="dropdown-trigger text-medium-grey hover:text-primary-black transition-colors" id="lang-toggle-desktop">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
            </svg>
            <span id="current-lang-desktop">EN</span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item lang-option" data-lang="en">English</a>
            <a href="#" class="dropdown-item lang-option" data-lang="zh-TW">繁體中文</a>
            <a href="#" class="dropdown-item lang-option" data-lang="zh-CN">简体中文</a>
          </div>
        </div>

        <!-- CTA Button -->
        <a href="contact.html" class="btn-primary" data-i18n="common.nav.getStarted">
          Get Started
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-primary-black" id="mobile-menu-btn">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div id="mobile-menu" class="hidden md:hidden pb-4">
      <!-- Mobile dropdowns implementation -->
      <!-- See for-distributors.html for complete mobile nav example -->
    </div>
  </div>
</nav>
```

#### Footer Template

```html
<footer class="bg-primary-black text-gray-300 pt-16 pb-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Footer Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

      <!-- Column 1: Company Info -->
      <div class="lg:col-span-1">
        <h3 class="text-2xl font-bold text-primary-orange mb-4">Mezzofy</h3>
        <p class="text-sm text-gray-400 mb-4" data-i18n="common.footer.tagline">
          Global Coupon Exchange Protocol
        </p>
      </div>

      <!-- Column 2: Solutions -->
      <div>
        <h3 class="font-bold text-lg mb-4 text-white" data-i18n="common.footer.solutions">Solutions</h3>
        <ul class="space-y-2">
          <li><a href="for-merchants.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.forMerchants">For Merchants</a></li>
          <li><a href="for-distributors.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.forDistributors">For Distributors</a></li>
          <li><a href="for-developers.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.forDevelopers">For Developers</a></li>
        </ul>
      </div>

      <!-- Column 3: Products -->
      <div>
        <h3 class="font-bold text-lg mb-4 text-white" data-i18n="common.footer.products">Products</h3>
        <ul class="space-y-2">
          <li><a href="coupon-management.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.management">Coupon Management</a></li>
          <li><a href="coupon-marketplace.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.marketplace">Coupon Marketplace</a></li>
          <li><a href="coupon-nfc.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.nfc">Coupon NFC</a></li>
          <li><a href="coupon-marketing.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.marketing">Coupon Marketing</a></li>
          <li><a href="coupon-wallet.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.wallet">Coupon Wallet</a></li>
        </ul>
      </div>

      <!-- Column 4: Resources -->
      <div>
        <h3 class="font-bold text-lg mb-4 text-white" data-i18n="common.footer.resources">Resources</h3>
        <ul class="space-y-2">
          <li><a href="coupon-playbook.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.playbook">Coupon Playbook</a></li>
          <li><a href="news-press.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.news">News & Press</a></li>
        </ul>
      </div>

      <!-- Column 5: Company -->
      <div>
        <h3 class="font-bold text-lg mb-4 text-white" data-i18n="common.footer.company">Company</h3>
        <ul class="space-y-2">
          <li><a href="about.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.about">About</a></li>
          <li><a href="contact.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.contact">Contact</a></li>
          <li><a href="investors.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.investors">Investors</a></li>
          <li><a href="nfc-user-guide.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.guide">NFC User Guide</a></li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-800 pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center text-sm">
        <p class="text-gray-400">
          &copy; <span id="current-year">2024</span> Mezzofy.
          <span data-i18n="common.footer.rights">All rights reserved.</span>
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="privacy.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.privacy">Privacy Policy</a>
          <a href="terms.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="common.footer.terms">Terms of Service</a>
        </div>
      </div>
    </div>
  </div>
</footer>

<script>
  // Update copyright year
  document.getElementById('current-year').textContent = new Date().getFullYear();
</script>
```

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
