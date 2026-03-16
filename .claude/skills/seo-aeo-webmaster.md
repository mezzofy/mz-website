---
name: seo-aeo-webmaster
description: SEO and AEO (AI Answer Engine Optimization) expertise for the Mezzofy mz-website. Covers technical SEO auditing and fixing, AI answer engine optimization for Google AI Overviews, Perplexity, ChatGPT Search, and Claude, multilingual hreflang (EN/zh-TW/zh-CN), structured data JSON-LD, sitemap management, robots.txt, llms.txt creation, meta tag optimization, Open Graph, and content scoring. Use this skill whenever performing any SEO audit, adding meta tags, implementing structured data, improving AI discoverability, fixing hreflang tags, updating sitemap.xml, creating llms.txt, generating SEO/AEO reports, or optimizing any page for search and AI engines on the mz-website.
---

# SEO & AEO Webmaster

You are the SEO and AEO specialist for the **Mezzofy mz-website** — a 30-page static HTML/Tailwind site deployed on AWS CloudFront/S3.

**Working directory:** `C:\Mezzofy\workspace\mz-website\dist\`
**Target domain:** `https://mezzofy.com`
**Tech stack:** Static HTML5 + Tailwind CDN + vanilla JS + i18n.js
**Languages:** EN (default), zh-TW (Traditional Chinese), zh-CN (Simplified Chinese)
**Build rule:** After editing HTML or CSS, run `npm run build`. Never edit `dist/output.css`. Always update BOTH `src/i18n/translations/` AND `dist/i18n/translations/` when changing translation JSONs.

---

## Site Page Map & Primary Keywords

| Category | Pages | Primary Keywords |
|----------|-------|-----------------|
| Core | index.html, about.html, contact.html | global coupon exchange protocol, mezzofy platform |
| Solutions | for-merchants.html, for-distributors.html, for-developers.html, for-ai-commerce.html | digital coupons for merchants, coupon distributor platform |
| Products | coupon-management.html, coupon-marketplace.html, coupon-nfc.html, coupon-marketing.html, coupon-wallet.html, coupon-playbook.html, coupon-serial.html | coupon management system, NFC coupon technology, digital coupon wallet |
| Corporate | investors.html, news-press.html, nfc-user-guide.html, support.html | mezzofy investors, coupon technology news |
| Blog | dist/blog/*.html (6 articles) | e-coupons, NFC retail, sustainable promotions |
| News | dist/news/*.html (8 articles) | mezzofy press coverage, awards, partnerships |

---

## 1. Audit Process

### Workflow
1. **Scan** — Read each target HTML file
2. **Check** — Run Technical SEO + AEO checklists
3. **Score** — Apply scoring rubric (Section 6)
4. **Report** — Write findings to `dist/seo-audit-YYYYMMDD.md`
5. **Fix** — Implement fixes in HTML files
6. **Verify** — Re-scan fixed pages and confirm score improvement

### Batching Strategy
Reading all 30 pages at once will fill context. Audit in these batches:
- Batch 1: Core + Solutions (7 pages) — highest priority
- Batch 2: Products (7 pages)
- Batch 3: Corporate + Guides (4 pages)
- Batch 4: Blog articles (6 pages)
- Batch 5: News articles (8 pages)

### Severity Levels
| Level | Symbol | Action |
|-------|--------|--------|
| Critical | 🔴 | Blocks indexing or AI citation — fix immediately |
| High | 🟠 | Significantly impacts ranking — fix this session |
| Medium | 🟡 | Reduces performance — fix next session |
| Low | 🟢 | Nice to have |

### Audit Report Format
```markdown
# SEO/AEO Audit — mz-website
**Date:** YYYY-MM-DD | **Pages Audited:** N/30

## Site-Wide Score: XX/100
- Technical SEO: XX/40
- Content SEO: XX/30
- AEO Readiness: XX/30

## Per-Page Results
| Page | Tech | Content | AEO | Total | Grade |
|------|------|---------|-----|-------|-------|
| index.html | 32/40 | 25/30 | 18/30 | 75 | B |

## Issues by Severity
### 🔴 Critical (fix immediately)
### 🟠 High (fix this sprint)
### 🟡 Medium
### 🟢 Low
### ✅ Passing site-wide
```

---

## 2. Technical SEO Checklist

### Meta Tags — Required on Every Page
```html
<!-- === SEO CORE === -->
<title>[Primary Keyword] | Mezzofy</title>
<!-- Rules: 50–60 chars, includes primary keyword, brand name at end -->

<meta name="description" content="[150–160 chars describing the page value proposition]">
<!-- Rules: unique per page, action-oriented, includes keyword naturally -->

<meta name="robots" content="index, follow">
<!-- Use "noindex, nofollow" only for 404.html and test pages -->

<link rel="canonical" href="https://mezzofy.com/[page].html">
<!-- Always self-referencing canonical to prevent duplicate content -->

<!-- === HREFLANG (multilingual) === -->
<!-- Note: mz-website uses JS-based i18n (single URLs). Use self-referencing hreflang. -->
<!-- This is a compromise — ideal SEO uses separate URL paths per language. -->
<link rel="alternate" hreflang="en"      href="https://mezzofy.com/[page].html">
<link rel="alternate" hreflang="zh-TW"   href="https://mezzofy.com/[page].html">
<link rel="alternate" hreflang="zh-CN"   href="https://mezzofy.com/[page].html">
<link rel="alternate" hreflang="x-default" href="https://mezzofy.com/[page].html">

<!-- === OPEN GRAPH (social sharing + AI crawlers) === -->
<meta property="og:type"               content="website">
<!-- Use "article" for blog/news pages -->
<meta property="og:title"              content="[Page title — can match <title> tag]">
<meta property="og:description"        content="[Same as or variation of meta description]">
<meta property="og:url"                content="https://mezzofy.com/[page].html">
<meta property="og:image"              content="https://mezzofy.com/assets/images/og-image.jpg">
<!-- OG image must be 1200×630px. Create if missing — use logo + brand background. -->
<meta property="og:site_name"          content="Mezzofy">
<meta property="og:locale"             content="en_US">
<meta property="og:locale:alternate"   content="zh_TW">
<meta property="og:locale:alternate"   content="zh_CN">

<!-- === TWITTER / X CARD === -->
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="[Page title]">
<meta name="twitter:description" content="[Meta description]">
<meta name="twitter:image"       content="https://mezzofy.com/assets/images/og-image.jpg">
<meta name="twitter:site"        content="@mezzofy">
```

### Page Structure Requirements
- [ ] Exactly **one `<h1>`** per page containing the primary keyword
- [ ] Heading hierarchy never skips levels (H1 → H2 → H3, not H1 → H3)
- [ ] All `<img>` tags have meaningful `alt` attributes (not empty, not "image")
- [ ] `<html lang="en">` set (i18n.js updates this attribute on language switch)
- [ ] All internal links use relative paths (no hardcoded `https://mezzofy.com/`)
- [ ] Minimum 300 words of visible content per page

### Sitemap — `dist/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://mezzofy.com/index.html</loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <!-- hreflang alternates in sitemap for multilingual signal -->
    <xhtml:link rel="alternate" hreflang="en"    href="https://mezzofy.com/index.html"/>
    <xhtml:link rel="alternate" hreflang="zh-TW" href="https://mezzofy.com/index.html"/>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="https://mezzofy.com/index.html"/>
  </url>
  <!-- Repeat for all 30 pages. Priority: homepage=1.0, solutions=0.9, products=0.8, blog/news=0.7 -->
</urlset>
```

### robots.txt — `dist/robots.txt`
```
User-agent: *
Allow: /
Disallow: /i18n/
Disallow: /test-i18n.html

# AI crawlers — explicitly allowed for AEO
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

Sitemap: https://mezzofy.com/sitemap.xml
```

---

## 3. AEO — AI Answer Engine Optimization

AI answer engines (Google AI Overviews, Perplexity, ChatGPT Search, Claude, Bing Copilot) extract and cite content differently from traditional search. They favor:
- **Direct, self-contained answers** — paragraphs that answer a question without requiring context from other paragraphs
- **Structured, extractable content** — lists, tables, FAQ pairs, step-by-step formats
- **Credible, citable sources** — E-E-A-T signals, Organization schema, press mentions
- **Explicit permissions** — llms.txt grants AI crawlers clear access

### 3.1 llms.txt — Create at `dist/llms.txt`
This is the AI equivalent of robots.txt. It tells AI crawlers what the site is and grants permission to use content in answers.

```markdown
# Mezzofy — Global Coupon Exchange Protocol

> Mezzofy operates the world's leading digital coupon exchange platform, connecting merchants to distributors through a secure, tokenized protocol. Mezzofy processes hundreds of millions of digital coupons globally, supporting NFC redemption, digital wallets, and campaign management.

## Core Platform
- [Homepage](https://mezzofy.com/): Platform overview and key benefits
- [For Merchants](https://mezzofy.com/for-merchants.html): How merchants create and distribute digital coupons
- [For Distributors](https://mezzofy.com/for-distributors.html): How distributors access and monetize coupon inventory
- [For Developers](https://mezzofy.com/for-developers.html): API integration documentation

## Products
- [Coupon Management](https://mezzofy.com/coupon-management.html): Lifecycle management for digital coupons
- [Coupon Marketplace](https://mezzofy.com/coupon-marketplace.html): Exchange platform for coupon trading
- [NFC Coupons](https://mezzofy.com/coupon-nfc.html): Tap-to-redeem NFC coupon technology
- [Coupon Wallet](https://mezzofy.com/coupon-wallet.html): Consumer mobile wallet
- [Coupon Marketing](https://mezzofy.com/coupon-marketing.html): Campaign creation and analytics
- [Coupon Serial](https://mezzofy.com/coupon-serial.html): Serial number management

## Resources
- [Coupon Playbook](https://mezzofy.com/coupon-playbook.html): Best practices for digital coupon campaigns
- [NFC User Guide](https://mezzofy.com/nfc-user-guide.html): How to use NFC coupons

## About
- [About Mezzofy](https://mezzofy.com/about.html): Company background and mission
- [News & Press](https://mezzofy.com/news-press.html): Awards, coverage, partnerships

## AI Usage Policy
Content may be used to answer questions about digital coupons, coupon technology, NFC promotions, and the Mezzofy platform. Please attribute to Mezzofy when citing.
```

### 3.2 Content Structure for AI Extraction
Rewrite or flag content sections that should be AI-extractable:

**Target:** Each H2/H3 section starts with a direct 1–2 sentence answer (40–80 words)

**Heading style for AEO:** Phrase headings as implicit questions where natural
- Instead of: "Coupon Management Features"
- Use: "How Merchants Manage Coupons with Mezzofy"

**Lists and tables** are highly extractable — AI engines quote them verbatim. Prefer:
```html
<ul>
  <li><strong>Instant Issuance:</strong> Create and distribute coupons in minutes</li>
  <li><strong>Real-Time Analytics:</strong> Track redemption rates and campaign ROI</li>
</ul>
```

### 3.3 FAQPage Schema — Highest AEO ROI
Add to all solution and product pages. These feed directly into Google AI Overviews and Perplexity answer boxes.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Mezzofy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mezzofy is the Global Coupon Exchange Protocol — a secure, tokenized platform connecting merchants to distributors for digital coupon distribution at scale. It supports NFC redemption, digital wallets, and real-time campaign analytics."
      }
    },
    {
      "@type": "Question",
      "name": "How do merchants use the Mezzofy platform?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Merchants create digital coupons through Mezzofy's management system, set distribution rules and expiry dates, distribute through the marketplace to partner distributors, and track redemptions with real-time analytics dashboards."
      }
    }
  ]
}
</script>
```

Customize the FAQ pairs per page topic. Aim for 3–5 Q&A pairs per page.

### 3.4 E-E-A-T Signals
Google and AI engines weigh Experience, Expertise, Authoritativeness, Trustworthiness:
- [ ] **Organization schema** on homepage with `foundingDate`, `address`, `sameAs` social profiles
- [ ] **Author schema** on blog/news articles (even if author = "Mezzofy Team")
- [ ] **Article schema** on all blog/news pages with `datePublished` and `dateModified`
- [ ] **Award mentions** marked up in News/About pages
- [ ] **Press mentions** in news-press.html with `NewsArticle` schema

### 3.5 Speakable Schema — Voice & AI Readiness
Mark sections suitable for AI voice responses:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".hero-description", ".key-benefits", ".faq-section"]
  }
}
</script>
```

---

## 4. Structured Data Templates (JSON-LD)

Place all JSON-LD blocks in `<head>` before the closing `</head>` tag.

### Organization (homepage + about page only)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mezzofy",
  "url": "https://mezzofy.com",
  "logo": "https://mezzofy.com/assets/images/logo.png",
  "description": "The Global Coupon Exchange Protocol connecting merchants to distributors for digital coupon distribution at scale.",
  "foundingDate": "2015",
  "areaServed": "Worldwide",
  "sameAs": [
    "https://www.linkedin.com/company/mezzofy",
    "https://twitter.com/mezzofy"
  ]
}
</script>
```

### WebSite with SearchAction (homepage only)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mezzofy",
  "url": "https://mezzofy.com",
  "description": "The Global Coupon Exchange Protocol",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://mezzofy.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### WebPage (all pages)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "[Page Title]",
  "description": "[Meta description — same as meta description tag]",
  "url": "https://mezzofy.com/[page].html",
  "isPartOf": { "@type": "WebSite", "url": "https://mezzofy.com" },
  "inLanguage": ["en", "zh-TW", "zh-CN"],
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mezzofy.com/" },
      { "@type": "ListItem", "position": 2, "name": "[Page Name]", "item": "https://mezzofy.com/[page].html" }
    ]
  }
}
</script>
```

### Article (blog + news pages)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Article Title — 50-110 chars]",
  "description": "[Article summary]",
  "url": "https://mezzofy.com/blog/[slug].html",
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "author": {
    "@type": "Organization",
    "name": "Mezzofy",
    "url": "https://mezzofy.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Mezzofy",
    "logo": { "@type": "ImageObject", "url": "https://mezzofy.com/assets/images/logo.png" }
  },
  "image": "https://mezzofy.com/assets/images/og-image.jpg",
  "inLanguage": "en",
  "isPartOf": { "@type": "WebSite", "url": "https://mezzofy.com" }
}
</script>
```

### NewsArticle (news/ pages)
Same as Article schema but use `"@type": "NewsArticle"` and add `"about"` field:
```json
"about": { "@type": "Organization", "name": "Mezzofy" }
```

---

## 5. Head Section — Insertion Order

When adding SEO tags, follow this exact order in `<head>`:
```html
<head>
    <!-- 1. Charset and viewport (already present — do not move) -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- 2. SEO CORE (add here) -->
    <title>...</title>
    <meta name="description" content="...">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="...">

    <!-- 3. HREFLANG (add here) -->
    <link rel="alternate" hreflang="en" href="...">
    <link rel="alternate" hreflang="zh-TW" href="...">
    <link rel="alternate" hreflang="zh-CN" href="...">
    <link rel="alternate" hreflang="x-default" href="...">

    <!-- 4. OPEN GRAPH (add here) -->
    <meta property="og:type" content="...">
    <meta property="og:title" content="...">
    <meta property="og:description" content="...">
    <meta property="og:url" content="...">
    <meta property="og:image" content="...">
    <meta property="og:site_name" content="Mezzofy">
    <meta property="og:locale" content="en_US">
    <meta property="og:locale:alternate" content="zh_TW">
    <meta property="og:locale:alternate" content="zh_CN">

    <!-- 5. TWITTER CARD (add here) -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="...">
    <meta name="twitter:description" content="...">
    <meta name="twitter:image" content="...">
    <meta name="twitter:site" content="@mezzofy">

    <!-- 6. STRUCTURED DATA (add here) -->
    <script type="application/ld+json">{ ... }</script>

    <!-- 7. EXISTING (already present — keep as-is) -->
    <meta name="theme-color" content="#FF6B35">
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- tailwind.config inline script -->
    <!-- favicon links -->
    <link rel="stylesheet" href="output.css">
    <script src="i18n/i18n.js"></script>
</head>
```

---

## 6. Scoring Rubric

### Technical SEO — 40 points
| Check | Points |
|-------|--------|
| Title tag (50–60 chars, contains primary keyword) | 5 |
| Meta description (150–160 chars, unique, action-oriented) | 5 |
| Canonical URL (self-referencing, no trailing slash issues) | 3 |
| hreflang set (all 4: en, zh-TW, zh-CN, x-default) | 5 |
| Open Graph tags (all 8 required properties) | 5 |
| Twitter Card tags (all 4 required) | 3 |
| robots meta tag | 2 |
| Single H1 per page, contains keyword | 5 |
| All images have descriptive alt text | 5 |
| Page in sitemap.xml with correct priority | 2 |

### Content SEO — 30 points
| Check | Points |
|-------|--------|
| Primary keyword appears in H1 | 5 |
| Primary keyword appears in first paragraph | 5 |
| Minimum 2 internal links with descriptive anchor text | 5 |
| Logical heading hierarchy (no skipped levels) | 5 |
| Content length ≥ 300 words | 5 |
| Meta description is unique (not duplicated on another page) | 5 |

### AEO Readiness — 30 points
| Check | Points |
|-------|--------|
| WebPage JSON-LD schema present | 5 |
| FAQPage schema (solution/product pages) OR Article schema (blog/news) | 8 |
| Organization/NewsArticle schema where relevant | 5 |
| llms.txt exists at domain root | 5 |
| Content uses direct answer paragraphs (40–80 word sections) | 4 |
| E-E-A-T signal present (author, company info, award/press mention) | 3 |

**Score → Grade:**
- 90–100 = A (Excellent — AI engines will actively cite this page)
- 75–89 = B (Good — strong visibility, minor gaps)
- 60–74 = C (Needs Work — missing key signals)
- Below 60 = D (Critical — unlikely to appear in AI answers)

---

## 7. Fix Priority Queue

When performing a full-site audit, tackle pages in this order:

1. **index.html** — Authority page, highest traffic, sets domain-level signals
2. **for-merchants.html**, **for-distributors.html** — Primary conversion pages
3. **coupon-management.html**, **coupon-marketplace.html**, **coupon-nfc.html** — Core products
4. **about.html** — E-E-A-T signals (Organization schema lives here)
5. **for-developers.html**, **coupon-marketing.html**, **coupon-wallet.html**
6. **blog/*.html** — Content freshness, topical authority
7. **news/*.html** — Press authority, E-E-A-T
8. **Remaining pages** — corporate, guides, utilities

---

## 8. Known Baseline Issues (Pre-Audit)

Based on initial inspection of `dist/index.html`:

| Check | Status |
|-------|--------|
| `<title>` tag | ✅ Present |
| `<meta name="description">` | ✅ Present |
| `<meta name="theme-color">` | ✅ Present |
| `<link rel="canonical">` | 🔴 Missing |
| hreflang tags | 🔴 Missing on all pages |
| Open Graph tags | 🔴 Missing |
| Twitter Card tags | 🔴 Missing |
| JSON-LD structured data | 🔴 Missing |
| `llms.txt` | 🔴 Missing (new file needed) |
| `sitemap.xml` | 🟡 Verify exists and is complete |
| `robots.txt` | 🟡 Verify exists and has AI crawler rules |
| OG image (1200×630px) | 🟡 Verify exists at `assets/images/og-image.jpg` |

---

## 9. OG Image Requirements

The site needs a proper Open Graph image for AI and social sharing previews:
- **Size:** 1200 × 630 pixels
- **Format:** JPG (smaller file size than PNG)
- **Path:** `dist/assets/images/og-image.jpg`
- **Content:** Mezzofy logo centered on white/orange brand background
- **Text:** "mezzofy.com" or tagline (optional)
- If a custom page image is not available, the site-wide OG image is used as fallback
- Blog/news articles should ideally have article-specific OG images

---

## 10. Validation Tools

After implementing changes, validate with:
- **Structured Data:** https://validator.schema.org/
- **Open Graph:** https://developers.facebook.com/tools/debug/
- **hreflang:** https://technicalseo.com/tools/hreflang/
- **Sitemap:** https://www.xml-sitemaps.com/validate-xml-sitemap.html
- **robots.txt:** https://search.google.com/search-console/robots-testing-tool
- **Google Rich Results:** https://search.google.com/test/rich-results
