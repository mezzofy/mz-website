# Handoff: Frontend → Webmaster — SEO for 3 new legal pages

**From:** 🌐 Frontend Agent · **To:** 🔍 Webmaster Agent
**Date:** 2026-10-27
**Scope:** SEO `<head>` finalization for three newly created Terms pages (meta/OG/JSON-LD/hreflang/robots) + sitemap decision. These are Webmaster-owned; Frontend deliberately left them out.

---

## What was built (Frontend, committed)

Three chrome-less "legal instrument" Terms pages, same design as the existing `dist/legal/operator/` pages, open in English with a 4-language toggle. Commits: `ae10b90` (merchant portal), `d502d48` (B2C + B2B).

| Page (file) | Canonical URL | `<title>` (present) | Effective / Version | Governing law |
|---|---|---|---|---|
| `dist/legal/merchant-portal/terms-of-use.html` | `https://mezzofy.com/legal/merchant-portal/terms-of-use.html` | Merchant Portal Terms of Use \| Mezzofy | 1 Oct 2026 / v2.1 | Hong Kong (HKIAC) |
| `dist/legal/marketplace/terms-of-use.html` | `https://mezzofy.com/legal/marketplace/terms-of-use.html` | Marketplace Customer Terms of Use \| Mezzofy | 1 Oct 2026 / v1.0 | Hong Kong |
| `dist/legal/exchange/terms-of-use.html` | `https://mezzofy.com/legal/exchange/terms-of-use.html` | Exchange Portal Enterprise Buyer Terms \| Mezzofy | 1 Oct 2026 / v1.0 | Hong Kong (HKIAC) |

Each page's content maps to a live portal: merchant-portal→merchant.mezzofy.com, marketplace→marketplace.mezzofy.com (B2C/consumer), exchange→exchange.mezzofy.com (B2B/enterprise buyer).

## What is already in each `<head>` (safe baseline, keep)

- `<meta charset>`, `<meta viewport>`, `<meta name="theme-color" content="#FF6B35">`
- `<title>` (above) and `<meta name="description">` (good descriptions already written — reuse or refine):
  - merchant-portal: *"Terms of Use Agreement for the Mezzofy Merchant Portal: how a Merchant issues Passes and how Mezzofy distributes, sells, validates and settles them. Governed by the laws of Hong Kong."*
  - marketplace: *"Customer Terms of Use for the Mezzofy B2C Marketplace: how you get, own, redeem and transfer Passes, Merchant closure protection, and refunds. Governed by the laws of Hong Kong."*
  - exchange: *"Enterprise Buyer Terms for the Mezzofy B2B Exchange Portal: ordering Merchant Passes, Minimum Order Quantity, Pooled vs Full Purchase fulfilment, and payment before delivery. Governed by the laws of Hong Kong."*
- A placeholder comment marking where the SEO block goes:
  `<!-- SEO (Webmaster Agent to finalize): canonical, hreflang (en/zh-TW/zh-CN/ar/x-default), Open Graph, JSON-LD WebPage+BreadcrumbList, robots, sitemap decision. -->`

**Also present (verify, don't duplicate):** the Google gtag snippet and `/js/analytics.js` are already included (copied from the operator template).

## What is NOT present yet (Webmaster to add — mirror `dist/legal/operator/terms-of-use.html`)

For each of the 3 pages, add, modeled exactly on the operator Terms page's head:

1. **Canonical** — `<link rel="canonical" href="<canonical URL above>">`
2. **hreflang** — 5 alternates (same URL with `?lang=` for non-default), as on operator:
   ```
   <link rel="alternate" hreflang="en"        href="<canonical>">
   <link rel="alternate" hreflang="zh-TW"     href="<canonical>?lang=zh-TW">
   <link rel="alternate" hreflang="zh-CN"     href="<canonical>?lang=zh-CN">
   <link rel="alternate" hreflang="ar"        href="<canonical>?lang=ar">
   <link rel="alternate" hreflang="x-default" href="<canonical>">
   ```
3. **Open Graph** — `og:type=website`, `og:title` (= `<title>`), `og:description` (= meta description), `og:url` (= canonical), `og:site_name=Mezzofy`. (Twitter card optional, as elsewhere on the site.)
4. **JSON-LD** — `WebPage` + `BreadcrumbList` only (NO FAQPage — none of these pages has an on-page FAQ). `inLanguage:["en","zh-TW","zh-CN","ar"]`. Breadcrumb trail **Home › Legal › <breadcrumb name>**, where the breadcrumb/WebPage name is:
   - merchant-portal → "Terms of Use" (breadcrumb item URL `/legal/merchant-portal/`)
   - marketplace → "Customer Terms of Use" (`/legal/marketplace/`)
   - exchange → "Enterprise Buyer Terms" (`/legal/exchange/`)
5. **robots** — **decision needed** (see below).

## Decisions for the Webmaster

- **Index or not?** The operator legal pages use `<meta name="robots" content="index, follow">` but are **deliberately excluded from `sitemap.xml`**. Recommend the **same** for these three (indexable if found, but not surfaced in the sitemap), since they're primarily reached from inside the portals and from the signup modal / support page. If the client prefers them unindexed, use `noindex, follow` instead.
- **Sitemap** — if you decide to list any of them, add `<url>` entries (+ hreflang alternates) to `dist/sitemap.xml`. Default recommendation: **do not add** (match operator).
- **llms.txt / robots.txt** — no change expected; flag if your policy differs.

## Internal links already pointing at these pages (context, no action)

Frontend wired discoverability in commit `0358586`:
- **Signup modal** (`js/main.js`): Seller card → `/legal/merchant-portal/terms-of-use.html`; Buyer card → `/legal/exchange/terms-of-use.html` (new tab).
- **support.html** "How to Reach Us": Seller Portal card → `legal/merchant-portal/…`; Buyer Portal card → `legal/exchange/…`.
- The **B2C marketplace customer terms** is intentionally **not** linked from this marketing site (consumer-facing; reached from the marketplace app). If SEO wants it discoverable, that's a Webmaster call (footer/sitemap).

## Notes / caveats

- Content note (not SEO): the B2B page clause 6.6 contains a source-doc drafting placeholder ("…delivered automatically — to be decided"), rendered verbatim. Legal/product to resolve; mentioned so it isn't mistaken for a page defect.
- No companion Privacy Policy pages exist for these portals yet (operator has both Terms + Privacy). The doc-switch on each page shows only the Terms chip + Print. If Privacy pages are added later, the switch + its hreflang/canonical set will need the same treatment.
- Source agreements live in `docs/Mezzofy_Merchant_Portal_Terms_of_Use_v2.1.md`, `docs/Mezzofy_B2C_Marketplace_Customer_Terms_of_Use_v1.0.md`, `docs/Mezzofy_B2B_Exchange_Portal_Enterprise_Buyer_Terms_v1.0.md`.
