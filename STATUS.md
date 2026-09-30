# Project Status: mz-website

**Last Updated:** 2026-02-25
**Current Phase:** i18n Complete ✅ / Color Audit Complete ✅
**Overall Progress:** ~98% (Base features complete, i18n 100% complete, Color audit complete, 1 fix pending)
**Branch:** main
**Latest Commit:** (Color Audit Complete — see recently completed)

---

## Quick Summary

i18n implementation COMPLETE (Feb 17, 2026). All 30/30 pages now support 3 languages (EN, zh-TW, zh-CN) with language selectors and localStorage persistence. MCP server configuration fixed for Windows compatibility (Feb 22, 2026). Comprehensive color audit completed and homepage color compliance fixed (Feb 25, 2026). Website is now 100% multilingual with 96.8% brand color compliance (30 of 31 pages).

---

## Current Phase

**Phase:** Maintenance & Tooling
**Start Date:** 2026-02-22
**Progress:** Ongoing

### Objectives
- [x] **MCP Server Configuration:** Fix Windows compatibility issue (COMPLETE)
- [x] **Color Audit:** Comprehensive brand color compliance audit (COMPLETE)
- [x] **Color Fix:** Fix index.html Tailwind config color definitions (COMPLETE)
- [ ] **Security:** Address XSS vulnerability in i18n.js (PENDING)
- [ ] **Deployment:** AWS S3 + CloudFront setup (PENDING)

### Status
MCP server configuration fixed for Windows. Shadcn MCP server now loads correctly using `cmd /c npx` wrapper. Documentation updated in CLAUDE.md with troubleshooting guide.

---

## Recently Completed (Last 7 Days)

**2026-09-30 (Marketplace page revamped to the v2 standard):**
- `coupon-marketplace.html` was never part of the original 10-page v2 revamp (no temp spec) — brought it up to the Pass/Vault/CMS standard. Rebuilt body: dark gradient hero ("The exchange hub where Passes are traded" + a `pass-stub` with a LISTED stamp) → "the exchange hub" (bg-white, 3 value cards) → "Three ways to trade" B2B/B2C/C2C (bg-light-grey) → "List, discover, transact, settle" 4-step (bg-white) → FAQ (bg-light-grey, 4 Q&As) → dark closing CTA. Removed the old orange "Protocol Context Banner", the stock hero image, and the duplicate footer CTA.
- New nested `marketplace.v2` namespace: **67 leaves × 4 langs** (en real; zh-TW/zh-CN/ar real translations; Pass/B2B/B2C/C2C/Mezzofy/AI kept Latin), inserted into src+dist without reformatting; old flat `marketplace.*` keys left unused.
- SEO/AEO: kept head title/meta/OG; **fixed a pre-existing malformed head JSON-LD** (stray `}` after a stale coupon-worded FAQPage) and added a new FAQPage whose answers match the visible FAQ. 3 ld+json blocks valid, exactly 1 FAQPage.
- Verified live: EN/zh-TW/ar 0 raw-key leaks, 0 overflow at 375/1440, Arabic RTL, src==dist parity. No build needed.



**2026-09-30 (Homepage 3D-depth revamp — CSS transforms, restyle existing content):**
- Restyled `index.html` hero into a CSS-3D stage (no libraries, all content/i18n/SEO/FAQ preserved). The Pass card floats (idle bob) and tilts in perspective to the cursor (desktop) or gyroscope (Android), with a resting tilt so it reads 3D on load/touch; added a soft brand glow behind it, a deep shadow, and 3 ambient depth orbs with pointer parallax. Section cards (3 "ways-in" + 3 guarantee stages) get a restrained cursor hover-tilt (desktop/fine-pointer only).
- All transform/opacity; `will-change` on animated layers; `perspective:1500px` hero + `perspective()` per card. Everything is fully disabled under `prefers-reduced-motion` (verified: card flat, no float, JS returns early). Inline `<style>` + inline `<script>` in index.html only — **no output.css rebuild, 1 file changed**.
- Verified live: desktop 1440 + mobile 375 both **0 horizontal overflow**; tilt produces real matrix3d rotation; 0 raw-i18n-key leaks (FAQ/content intact); works EN/zh-TW; only the known localhost analytics-CORS console noise.

**2026-09-29 (SEO/AEO/GEO review of the 10 revamped pages + defect fixes):**
- Fixed stale OLD product names in structured data: products.html meta/og/twitter/JSON-LD desc (4×) "AI Coupon, NFC Coupon"→"AI Pass, NFC Pass" + ItemList names; index.html Organization OfferCatalog names → Management System/Marketplace/NFC Pass/Vault; ai-pass.html SoftwareApplication "Mezzofy AI Coupon"→"Mezzofy AI Pass". JSON-LD re-validated.
- Fixed llms.txt (GEO): link text now matches renamed products (For Buyers, For Integrators, Management System, Marketplace, NFC Pass, Vault, Pass) + added missing AI Pass entry.
- ✅ **All four recommendations applied (2026-09-30):**
  - **SEO — hreflang `ar`** added to 36 pages (after zh-CN, same URL); homepage **OfferCatalog** completed to all 6 products (added Pass + AI Pass).
  - **AEO — FAQ + FAQPage on all 6 product pages** (products, pass, vault, ai-pass, nfc-pass, coupon-management): visible `faq-item` accordion (4 Q&As each, matching for-buyers pattern + inline CSS) + FAQPage JSON-LD whose answers exactly match the visible text. 54 new i18n keys (`<ns>.v2.faq.*`) inserted into all 4 langs via a targeted inserter (added 54, removed 0, no reformat; src==dist parity). Verified live: 0 raw-key leaks, translations render (常見問題 / ما هو Mezzofy Pass), FAQPage valid on all 6.
  - **GEO — llms.txt** summary rewritten to lead with the Pass model + 7 types; product descriptions repositioned to Passes; Products hub + AI Pass entries added.

**2026-09-29 (Frontend — AI/NFC Pass URL renames + SEO):**
- `git mv ai-coupon.html → ai-pass.html` (16 refs) and `coupon-nfc.html → nfc-pass.html` (141 refs) — 157 refs updated across HTML/JSON/sitemap/llms/REDIRECTS; redirect stubs at old paths (200, redirect verified). Self-canonical/og/JSON-LD/hreflang now point to new URLs; JSON-LD 1/1 valid each.
- SEO head rebranded: ai-pass `<title>` "AI Pass | Automated Coupon Creation | Mezzofy"; nfc-pass "NFC Pass | Tap-to-Redeem Digital Coupons | Mezzofy" (+ og/twitter/meta/JSON-LD name+desc, SoftwareApplication "Mezzofy NFC Pass Platform", breadcrumbs). Kept a "coupon" keyword in each for search. REDIRECTS-301.md + Infra handoff updated (now 7 renames + 1 optional).

**2026-09-29 (Frontend — product names "AI Coupon"→AI Pass, "NFC Coupon"→NFC Pass):**
- Renamed both product names everywhere visible: **21 i18n keys** (nav.nfc, products.v2 ai/nfc title+link, and the AI-engine copy woven through merchants.v2/pass.v2/aicoupon.v2/cms.v2/nfc.v2/distributors) ×4 langs (en 21, zh 18, ar 19) + **74 HTML body fallbacks across 23 pages**. Product line now: Pass · Vault · **AI Pass** · **NFC Pass** · Marketplace · Management System. Verified live on the Products hub + nav.
- KEPT: `<head>` SEO (ai-coupon.html title "AI Coupon | Automated Coupon Creation", coupon-nfc.html "NFC Digital Coupons…"), **editorial** blog title "NFC Coupons Driving Impulse Purchases" (unchanged), URLs (ai-coupon.html, coupon-nfc.html — not renamed), the standalone "Coupon" Pass-type label. JSON valid + src==dist parity.

**2026-09-29 (Frontend — full page-by-page visible-body de-coupon):**
- Scanned all non-editorial pages (3 parallel scanners) and changed visible body "coupon/coupons"→Pass/Passes. **55 i18n keys** (playbook 22, nfc-user-guide 27 en-only, residuals 6: 2 marketplace + 3 index take-further playbook cards + 1 aiCommerce "Predictive Pass Intelligence") ×4 langs where applicable + several HTML-only fallbacks (e.g. aiCommerce card1 "…including Pass redemption"). Playbook fully de-couponed: "Smart Pass Strategies", all tactic cards → "… Pass" ("Social Sharing Pass", "Survey Pass", "Chained Pass", etc.), "Coupon Wallet" tactic → "Vault"; its 2 ecosystem product links → "+ Management System" / "+ NFC Coupon".
- **KEPT (verified, by design):** product names "AI Coupon", "NFC Coupon", "Coupon Marketplace", "Coupon Management System"/CMS, "Coupon Clipper" app; the "Coupon" Pass-**type** label in the 7-type explorer; the "Global Coupon Exchange Protocol"/"Mezzofy Coupon Standard" brand; all `<head>` SEO (title/meta/OG/JSON-LD); factual market data + press headlines (investors, ai-commerce); status-page service names; the 404 voided-ticket motif; editorial (news-press, blog, team) — excluded per scope.
- Verified live: playbook rendered body has only "+ NFC Coupon" (product) left; nfc-user-guide 33 "Pass" vs 16 coupon (all NFC Coupon / Coupon Clipper product-app names). JSON valid + src==dist parity (en 55/55, zh-TW/zh-CN/ar 28/28, nfcGuide en-only skipped).

**2026-09-29 (Frontend — Products dropdown labels de-couponed):**
- Nav Products dropdown relabeled (per user, "drop Coupon where redundant"): "Coupon Marketplace"→**Marketplace**, "Coupon Management System"→**Management System**, "Coupon NFC"→**NFC Coupon** (fixed word order to match the Products hub). Vault/Pass already done. 4 i18n keys (incl. `products.v2.cms.title` for hub consistency) × 4 langs + 76 nav HTML fallbacks each. Footer product labels were already short ("Management/Marketplace/NFC") — unchanged. "NFC Coupon" kept English in zh (matches hub); Marketplace/Management System translated (descriptive, not brand). Page titles/meta/H1 keep "coupon" for SEO. Verified live in EN/zh-TW/ar, JSON valid + parity.

**2026-09-29 (Frontend — "coupon (umbrella) → Pass/Passes" rebrand, High+Medium only):**
- Audited all 23 marketing/product/corporate pages (3 parallel reviewers) against KEEP/FLAG criteria; blog/news/team (19 editorial) deferred. Total flagged 4 High · ~26 Med · ~24 Low; ~85% on coupon-marketplace + for-ai-commerce.
- ✅ **Applied High + Medium (26 i18n keys × 4 langs, src+dist) + HTML fallbacks.** "Pass/Passes" kept as an English brand term in all languages. Pages touched: coupon-marketplace (2H+11M), for-ai-commerce (1H+~8M in JSON, +4 HTML-only Med whose JSON had no umbrella term), for-integrators (1H+1M), index (1M), investors (1M), support (1M).
- ✅ **Footer tagline** `common.footer.tagline` "coupon infrastructure" → "Pass infrastructure" (4 langs + 38 HTML fallbacks). *Rated Low but kept* — highest-leverage site-wide brand line.
- ✅ **Low items ALSO applied** (follow-up, 2026-09-29): the 15 Low/borderline items now rebranded too — marketplace (models.subtitle, c2c.cardDescription, flexiblePricing, hero imageAlt), for-ai-commerce (opportunities.subtitle/pricing, architecture tokens), about ("Smart Passes", "Passes Handled"), investors why-card, support 3 issue bullets, nfc-user-guide 2 slogans (en-only namespace), status.html card. Scope excluded blog/news/team (editorial) — none carried Low items anyway. Result: the marketing/product/corporate pages now have zero umbrella-"coupon" in body copy; only the intentional keeps remain (brand, product names, SEO title/meta/H1, coupon-as-a-type, JSON-LD, factual data, coupon-playbook).
- ✅ KEPT throughout: "Global Coupon Exchange Protocol" (brand), product names (Coupon Marketplace/CMS/CaaS/AI·NFC Coupon), title/meta/OG/H1 SEO keyword, coupon-as-a-Pass-type, JSON-LD, factual market data, coupon-playbook (coupon-tactics by design). Verified: JSON valid, src==dist parity, HTML fallbacks consistent (High/Med=Pass, Low=coupon).

**2026-09-29 (Frontend — `coupon-pass.html` → `pass.html`, URL consistency with `vault.html`):**
- ✅ `git mv coupon-pass.html → pass.html`; **138 refs across 42 files** updated (HTML, i18n JSON src+dist, sitemap, llms, REDIRECTS-301.md). Page self-canonical/og/twitter/JSON-LD/hreflang now `pass.html`; JSON-LD 2/2 valid.
- ✅ Redirect stub at `coupon-pass.html` → `pass.html`. **Repointed `coupon-serial.html` stub directly to `pass.html`** (avoids the coupon-serial→coupon-pass→pass chain). Both old URLs serve 200 and bounce to pass.html.
- ✅ Updated Infra 301 handoff + REDIRECTS-301.md: added `coupon-pass.html → pass.html`, `coupon-serial.html → pass.html` (direct). `pass.v2` i18n namespace unchanged. Kept title "Coupon Pass | …" (keyword in title, bare brand in URL — same pattern as vault).

**2026-09-29 (Frontend — visible rebrand of the 3 renamed pages):**
- ✅ **Nav + footer labels rebranded** (6 i18n keys × 4 langs, src+dist): "I'm a Distributor"→"I'm a Buyer", "I'm a Developer"→"I'm an Integrator", "Coupon Wallet"→**Vault**; footer "For Distributors"→"For Buyers", "For Developers"→"For Integrators", "Wallet"→**Vault**. "Vault" kept as an English brand term in all languages (like Pass). HTML fallback text updated site-wide (**38 files**, 76 nav + 38 footer spots each).
- ✅ **Page title chrome rebranded** on the 3 pages (`<title>` + og:title + twitter:title + JSON-LD WebPage `name` + breadcrumb `name`): for-buyers → "Coupon Inventory Platform for Buyers | Mezzofy"; for-integrators → "Mezzofy for Integrators - Build on the Exchange Protocol"; vault → "Vault | Digital Coupon Storage on iOS, Android & NFC | Mezzofy". All JSON-LD blocks re-validated (2/2 per page).
- ✅ Verified live: labels render correctly in EN/zh-TW/ar; the separate "Developer" resources dropdown (API docs) correctly left as "Developer" (not an audience label). 0 raw-key leaks, JSON valid, src==dist parity.
- ✅ **Deep rebrand also completed** (2026-09-29): og/twitter/meta **descriptions** rebranded (vault → "Mezzofy Vault: secure storage…", em-dash removed; for-integrators → "integrator-first REST API"); **SoftwareApplication names** → "Mezzofy Vault" / "Mezzofy Integrator API & SDK"; **FAQ** question + answer → "for buyers"/"a buyer's customers"; **hero images** `git mv`'d to `for_buyer.png` / `for_integrator.png` (refs updated, load 200). Left deliberately: `applicationCategory: "DeveloperApplication"` (fixed schema.org enum — changing it would be invalid), "Apple Wallet" (proper noun), the "Developer" API-docs resources dropdown, and `vault.v2.why.title` ("Why not one wallet?", intentional positioning copy). JSON-LD re-validated 2/2 per page.

**2026-09-28 (Frontend — cleared the 4 remaining open items):**
- ✅ **Instant Checkout overclaim removed.** `for-ai-commerce.html`: reframed the in-chat "Instant Checkout" redemption from a present-tense Mezzofy capability to honest "Redemption-Ready API / as ACP checkout rolls out" language — in the HTML fallback AND all 4 language files (the zh-TW/zh-CN/ar copies held real translations of the old claim, retranslated). Also cleaned the dead `home.aiCommerce.acp.description` key carrying the same wording. Factual ChatGPT references (Sep-2025 launch, fee comparison) kept. JSON validated.
- ✅ **3 page renames (URL-level).** `for-distributors.html`→`for-buyers.html`, `for-developers.html`→`for-integrators.html`, `coupon-wallet.html`→`vault.html` (user chose bare `vault.html`). `git mv` (history preserved), **446 link refs** updated across 42 HTML files + JSON (both sets) + sitemap + llms.txt; redirect stubs (canonical + noindex + meta-refresh) at old paths. Live-checked: 3 new pages + 3 stubs all HTTP 200, stubs redirect correctly. **Note:** URL-only — visible titles/nav labels still read Distributors/Developers/Wallet (visible-copy rebrand deferred as a separate SEO decision).
- ✅ **v2 translations completed** (closed the placeholder gap). Translated **909 zh-TW / 909 zh-CN / 927 ar** strings (all v2 namespaces: home.v2, merchants.v2, buyers, integrators, products, pass, vault, aicoupon, nfc.v2, cms). Done via 3 parallel translation subagents + a structural line-merge tool (rewrites only each target key's line — CRLF/format/order preserved, no full-file reformat). Verified: 0 HTML-tag/href mismatches, 0 raw-key leaks live, src==dist parity, Arabic RTL renders correctly (`dir=rtl`). Only intended pass-throughs (Pass/Vault/Mezzofy/NFC/API brand terms, MZF codes, numbers, addresses) remain English.
- ✅ **Infra 301 handoff written.** `REDIRECTS-301.md` (in-repo, with a ready-to-paste CloudFront Function) + a handoff note in `C:\Mezzofy\.claude\coordination\handoffs\frontend-to-infra-301s.md`. Covers all 4 renames + optional campaign redirect. Stubs must stay until the edge 301s are live.
- ⚠️ Still pending (Infra/decision): the real 301s; optional visible-copy rebrand of the 3 renamed pages' titles/nav labels.

**2026-09-28 (Frontend visual QA sweep — Playwright, finally unblocked):**
- ✅ QA'd all 10 revamped pages at desktop + mobile (390px). Every page: **0 raw i18n keys, 0 i18n warnings**, 1 `<h1>`, only the known localhost analytics-CORS console noise.
- ✅ **Interactive logic verified functionally** (drove via JS, checked outputs): for-merchants 3-mode calculators exact (Charge $40/$5/$45/$22.50, Own **$102.98**, Zero shuffle works); for-distributors commitment calc exact ($200k/$184k/$140k/$60k) + base/full toggle; for-developers revenue calc exact (500/20k/$700k/$70k/**$17,500**); coupon-pass **7-type explorer** all variants resolve with correct stamp colors (0 raw keys after cycling). Confirmed products→coupon-pass link, wallet 520px stub + new closing CTA, ai-coupon hero-520/box-355 override (picks column healthy 328px), nfc 2 SVG diagrams, cms fork + footer-CTA removed + "Pass"/no-"Marketing" footer.
- 🐛 **Found + fixed one real mobile bug:** `for-merchants` `.mode-tabs` segmented control used `width:max-content` → 39px horizontal overflow at 390px. Fixed with `max-width:100%` (pill now wraps cleanly); re-verified 0 overflow. Inline CSS, no rebuild.
- Note (pre-existing, not fixed): the `.reveal` scroll-in system (main.js) leaves sections `opacity:0` until IntersectionObserver fires — a JS failure would hide content; worth a fallback + reduced-motion check. (This is also why fullPage screenshots look blank — captures don't scroll.)


**2026-09-11 (Hid retired `coupon-campaign.html` / Coupon Marketing):**
- ✅ Removed the "Coupon Marketing" menu item from header (desktop + mobile) and footer on ALL pages (incl. blog/news `../coupon-campaign.html` variants and the page's own active-nav indicator) — 0 links remain. Removed the 2 body "Related Product" cards on coupon-marketplace + coupon-playbook that linked to it.
- ✅ Page hidden (not deleted): `noindex, follow`, removed from `sitemap.xml` + `llms.txt`. Still reachable by direct URL (200) but out of nav + search. Unused i18n keys (common.nav.marketing etc.) left in place, harmless.
- Optional next: 301 `coupon-campaign.html → coupon-management.html` (merge into CMS per README) — needs Infra.

**2026-09-11 (URL rename: `coupon-serial.html` → `coupon-pass.html`):**
- ✅ New page `dist/coupon-pass.html` (the Pass product page). Kept "coupon" in the slug for SEO (chosen over bare `pass.html`). Updated its `<title>`, meta, OG/Twitter, canonical, hreflang, and JSON-LD (WebPage + SoftwareApplication + breadcrumb "Coupon Pass") to Pass-focused, keyword-rich copy.
- ✅ Re-linked **37 HTML files** (all internal links: nav ×2, footer, homepage "Explore Passes", products Pass card, closing CTAs, blog/news) → `coupon-pass.html`. Updated `sitemap.xml` (loc + hreflang) and `llms.txt`.
- ✅ `coupon-serial.html` replaced with a tiny **client-side redirect stub** (meta refresh + canonical → coupon-pass) so the old URL doesn't 404 in the interim.
- ⚠️ **BLOCKING INFRA HANDOFF:** a real **301 redirect** `coupon-serial.html → coupon-pass.html` must be set at CloudFront/S3 (outside webmaster scope). The stub is only an interim client-side fallback. Once the 301 is live, the stub can be deleted.
- Verified: JSON-LD valid, sitemap well-formed, 0 remaining internal links to the old URL, both URLs serve 200.


**2026-09-11 (Nav rebrand "Coupon Serial" → "Passes" + homepage guarantee links):**
- ✅ Renamed the "Coupon Serial" product **label** to **"Passes"** site-wide: i18n values `common.nav.serial` + `common.footer.products.serial` → "Passes" (all 4 langs, src+dist) + HTML fallback text in 38 pages (114 spots: desktop nav, mobile nav, footer). The coupon-serial page's `<title>`/meta/OG keep "Coupon Serial" for SEO (unchanged). File is still `coupon-serial.html` (link targets unchanged).
- ✅ Homepage guarantee cards: added "Explore Passes →" link (→ coupon-serial.html) to "Issued as a Pass" and "Explore Vault →" link (→ coupon-wallet.html) to "Held in a Vault". New i18n keys `home.v2.guarantee.pass.link` / `vault.link` (4 langs, src+dist).
- No rebuild needed (label/key text + existing utility classes only). Optional follow-up: coupon-serial breadcrumb JSON-LD name still reads "Coupon Serial".
- **Correction (same day):** menu label changed from "Passes" → **"Pass"** (singular, per user) — `common.nav.serial` + `common.footer.products.serial` in all 4 langs + 114 HTML fallback spots. The two homepage guarantee-card CTA translations (`home.v2.guarantee.pass.link`="Explore Passes", `vault.link`="Explore Vault") were already present and correct; a screenshot showing raw key strings was a stale browser cache of en.json — the local server confirmed it serves the correct values. Hard-refresh (Ctrl+Shift+R) to see them.

**2026-09-11 (Content revamp COMPLETE — all 10 `temp/*.md` pages done):** index, for-merchants, for-buyers(→for-distributors.html), for-integrators(→for-developers.html), products (new), pass(→coupon-serial.html), vault(→coupon-wallet.html), ai-coupon (new), nfc(→coupon-nfc.html), coupon-management. All: body-only rebuilds keeping nav/footer/head-SEO; per-page `*.v2` i18n namespaces (en real, zh-TW/zh-CN/ar English placeholders) in src+dist, 0 missing keys; front-end-only calculators/explorers via inline `<script>` (main.js/i18n.js never touched); shared v2 components in each page's inline `<style>`. Fixed pre-existing malformed JSON-LD on for-developers, coupon-serial(clean), coupon-wallet, coupon-nfc, coupon-management; removed FAQPage where the on-page FAQ was dropped. **Still pending: live browser QA (Chrome ext not connected), real zh/ar translations, page renames + 301s + nav links, placeholder metrics.**

**2026-09-11 (Product: Coupon Management — `coupon-management.html` rebuilt from `temp/10-product-coupon-management.md`):**
- ✅ Replaced body (nav+footer untouched; dropped banner) with 5 sections → Hero + Pass stub (PRIVATE) · "Create, send, redeem, reconcile" (4 steps) · metered tier table (allocation/distribution/redemption "from" rates) · **CMS-vs-exchange fork** (Your business → CMS route vs exchange route, each with steps/chips/use-cases) + "most merchants run both" note · closing CTA
  - i18n: new top-level `cms` namespace, `cms.v2.*` (76 keys) × 4 langs, 0 missing; removed FAQPage + fixed stray-`}` JSON-LD (now WebPage + SoftwareApplication, valid)

**2026-09-11 (Product: NFC Coupon — `coupon-nfc.html` rebuilt from `temp/09-product-nfc-coupon.md`):**
- ✅ Replaced body (nav + footer untouched; dropped protocol banner) with 5 sections → `dist/coupon-nfc.html`
  - Hero + Pass stub (TAPPED) · "The network today" stats (dark: 38/6/2/Q4) · "Not a merchant product. A network node." — **old-vs-now topology diagrams** (inline SVG: one dead tag→merchant vs a shared pool feeding many tap points) · "Two ways to join" (Host / Supply) + customer note · closing CTA
  - i18n: `nfc.v2.*` nested under the existing `nfc` namespace (50 keys) across four languages, src+dist; 0 missing
  - **SEO fixes:** removed FAQPage JSON-LD (no on-page FAQ) + fixed the same pre-existing stray-`}` malformation. JSON-LD now WebPage + SoftwareApplication, valid. Diagrams have `<title>`/aria-label descriptions.
  - Static page (no JS). ⏳ Pending: live browser QA

**2026-09-11 (Product: AI Coupon — NEW `ai-coupon.html` created from `temp/08-product-ai-coupon.md`):**
- ✅ New page `dist/ai-coupon.html` — nav/footer cloned from an existing page, fresh head (WebPage + SoftwareApplication JSON-LD, valid). 5 sections: hero + Pass stub · **"The box" infographic** (merchant solid walls top/bottom, dotted AI picks + the one Pass it created inside, "one of 500…") + walls/AI-picks lists + "what it learns from" note · two offer types (percent / amount) · guardrails (3 cards) · closing CTA
  - i18n: new top-level `aicoupon` namespace, `aicoupon.v2.*` (67 keys) across four languages, src+dist; 0 missing
  - Added to `dist/sitemap.xml` (priority 0.8). Not nav-linked (header deferred)
  - **Resolves the page-05 dangling link:** `products.html`'s AI Coupon card now points to a real `ai-coupon.html`
  - Static page (no JS). ⏳ Pending: live browser QA

**2026-09-11 (Product: Vault — `coupon-wallet.html` rebuilt from `temp/07-product-vault.md`):**
- ✅ Replaced body (nav + footer untouched; dropped old protocol banner) with 3 sections → `dist/coupon-wallet.html`
  - Hero + Vault preview stub (balance + held Passes with state badges) · **Balance-vs-Vault infographic** (vertical gauge at 37%, spend rules, one-way + credit-back arrows, vs the Vault item list with READY/SAT/USED/$LEFT badges) + "Why not one wallet?" note · "How a claim works" 5-step flow + For-buyers link
  - Static page (no JS needed). New components: vault-stub, balance gauge, state badges
  - i18n: new top-level `vault` namespace, `vault.v2.*` (56 keys) across four languages, src+dist; 0 missing
  - **SEO fixes:** removed the FAQPage JSON-LD (no on-page FAQ) AND fixed the same pre-existing stray-`}` JSON-LD malformation this template had (SoftwareApplication was mis-nested). JSON-LD now WebPage + SoftwareApplication, valid.
  - Note: file stays `coupon-wallet.html`; `vault.html` rename deferred
  - ⏳ Pending: live browser QA — Chrome extension not connected

**2026-09-11 (Product: Pass — `coupon-serial.html` rebuilt from `temp/06-product-pass.md`):**
- ✅ Replaced body (nav + footer untouched; dropped the old orange "protocol context" banner) with 5 sections → `dist/coupon-serial.html`
  - Hero + Pass stub · "The Mezzofy Pass Standard" (Unique / Single-use / Fraud-proof) · Lifecycle 5-step flow · **7-type explorer** (Coupon/Voucher/Deal/Ticket/Reward/Card/Token) · developer JSON sample + CTAs
  - Type explorer (inline JS, no main.js change): clicking a chip re-points every `[data-ptype-field]` element's `data-i18n` to `pass.v2.types.<type>.<field>` then calls `window.i18n.applyTranslations()` — so all 7 types stay fully translatable with compact HTML; stamp colour swaps per type
  - i18n: new top-level `pass` namespace, `pass.v2.*` (119 keys incl. all 7 types × 11 fields) across four languages, src+dist; verified 0 missing for both static and JS-referenced keys
  - **SEO fix:** removed the FAQPage JSON-LD (the new page has no on-page FAQ, so the schema would mismatch); JSON-LD now WebPage + SoftwareApplication, valid. Title/meta keep coupon keywords.
  - Note: file stays `coupon-serial.html`; `pass.html` rename deferred
  - ⏳ Pending: live browser QA (type explorer, language/RTL, responsive) — Chrome extension not connected

**2026-09-11 (Products hub — NEW `products.html` created from `temp/05-products-hub.md`):**
- ✅ New page `dist/products.html` — branded hero + 5 product cards (Pass, Vault, AI Coupon, NFC Coupon, Coupon Management System). Nav + footer cloned verbatim from an existing page so they match the site exactly; fresh head (SEO meta, canonical, hreflang, OG/Twitter, WebPage + BreadcrumbList + ItemList JSON-LD)
  - i18n: new top-level `products` namespace, `products.v2.*` (23 keys) across all four language files (src+dist); 0 missing
  - Added to `dist/sitemap.xml` (priority 0.8, hreflang alternates)
  - **Not yet linked from nav** (header edits deferred per instruction) — the Products dropdown already lists the individual products, so this hub is the README's "optional" page
  - Card links use current filenames: Pass→coupon-serial.html, Vault→coupon-wallet.html, NFC→coupon-nfc.html, CMS→coupon-management.html. **AI Coupon card → `ai-coupon.html` which does not exist yet** (created in page 08) — this link 404s until page 08 is built.
  - ⏳ Pending: live browser QA — Chrome extension not connected

**2026-09-11 (For Integrators revamp — `for-developers.html` rebuilt from `temp/04-for-integrators.md`):**
- ✅ Replaced all body sections (nav + footer untouched) with 8 new sections → `dist/for-developers.html`
  - Hero + Pass stub · "What one integration reaches" stats (dark) · "What it adds" (POS / loyalty / payment) · "How the partnership works" (3 steps + note) · **revenue illustrator** · "What you get" (3 cards) · FAQ (5 Q&A) · closing CTA
  - Revenue illustrator (front-end only, inline JS): active = merchants×activation, sold = active×perMerchant, face total = sold×face, fee pool = 10% of face, your share = pool×indicative%. Matches MD example (2,000 / 25% / 40 / $35 / 25% → 500 active, 20,000 sold, $700,000 face, $70,000 pool, **$17,500** share). PAID Pass preview + share slider marked "indicative".
  - i18n: **new top-level `integrators` namespace** with `integrators.v2.*` (80 keys) across all four language files in `src/`+`dist/`; every HTML key resolves in every language, 0 missing
  - Head **FAQPage JSON-LD** rewritten to 5 integrator Q&A — and **fixed a pre-existing malformed JSON-LD** (a stray `}` had mis-nested the `SoftwareApplication` object, so the whole block failed to parse). Now 3 valid objects (WebPage/FAQPage/SoftwareApplication).
  - **Note:** file stays `for-developers.html`; `for-integrators.html` rename + 301 + nav updates deferred. Title/meta keep coupon+developer keywords.
  - ⏳ Pending: live browser QA — Chrome extension not connected this session

**2026-09-11 (For Buyers revamp — `for-distributors.html` rebuilt from `temp/03-for-buyers.md`):**
- ✅ Replaced all body sections (nav + footer untouched) with 8 new sections → `dist/for-distributors.html`
  - Hero + Pass stub · consumer strip · "What is in the pool today" stats (dark) · **commitment calculator** (segmented Redemption base / Full purchase) · "Two ways to distribute" (API / Pass+Vault) · "Why the guarantee matters" (3 points) · FAQ (5 Q&A) · closing CTA
  - Calculator (front-end only, inline JS): committed = qty×face, upfront = committed×(1−disc), expected redeemed = committed×rr, unredeemed = committed×(1−rr). Reproduces MD example (5,000 × $40, 8%, 70% → $200,000 / $184,000 / $140,000 / $60,000). Segmented control swaps the last-row label + note (swappable vs per-agreement); pool Pass preview updates live.
  - i18n: **new top-level `buyers` namespace** with `buyers.v2.*` (88 keys, per README naming), added to all four language files in `src/`+`dist/` (en real; zh-TW/zh-CN/ar placeholders); every HTML key resolves in every language, 0 missing
  - Head **FAQPage JSON-LD** updated to 5 buyer Q&A (AEO, "coupon"/"distributor" keywords kept); one `<h1>`, `#hero-section`/`.hero-description` Speakable hooks; old ═ section banners removed
  - **Note:** file stays `for-distributors.html`. The README's `for-buyers.html` rename + 301 + cross-site nav updates is deferred to a later coordinated task; title/meta keep the coupon+distributor keywords in the meantime
  - ⏳ Pending: live browser QA (calculator, segmented control, language/RTL, responsive) — Chrome extension not connected this session

**2026-09-11 (For Merchants revamp — `for-merchants.html` rebuilt from `temp/02-for-merchants.md`):**
- ✅ Replaced all body sections (nav + footer untouched) with 9 new sections → `dist/for-merchants.html`
  - Hero + Pass stub · "Who your offers reach" stats (dark) · "Three ways to sell" (clickable mode selector) · "Set your limits once" steps+note · **interactive calculator** · "one system" CMS hub · "Before you go live" · FAQ (6 Q&A) · closing CTA
  - **Three selling modes** (Zero Fee / Charge / Own channel) share one selector — the three cards and a segmented tab both drive steps, note, calculator controls, readout and Pass preview via one inline-JS state machine (front-end only, posts nowhere)
  - Calculators reproduce the MD's documented figures: Charge $50/20% → pays $40, fee $5, receive $45, unused $22.50; Own Tier-1 800/80%/40% → $20.80 + $16.64 + $65.54 = $102.98; Zero Fee generates a sample Pass within the set limits with a "show another" shuffle
  - i18n: `merchants.v2.*` namespace, **175 keys** to all four language files in `src/`+`dist/` (en real; zh-TW/zh-CN/ar = English placeholders); verified every HTML key resolves in every language, 0 missing
  - Updated head **FAQPage JSON-LD** to the 6 new merchant Q&A (AEO); kept `<title>`/meta "coupon"+"merchant" keywords, one `<h1>`, `#hero-section`/`.hero-description` Speakable hooks
  - Tailwind rebuilt; no `main.js`/`i18n.js` changes; v2 confined to top-level `merchants` namespace (fixed an insertion that first landed in a nested `common.*.merchants`)
  - ⏳ Pending: live browser QA (mode switching, calculator interaction, language/RTL, responsive) — Chrome extension not connected this session
  - Impact: Step 2 of the 10-page revamp (`temp/00-README.md`). Own-channel rate floors ($0.013/$0.064) shown on cards; calculator uses Tier-1 rates. Placeholder metrics + real zh/ar translations pending.

**2026-09-11 (Homepage content revamp — `index.html` rebuilt from `temp/01-homepage.md`):**
- ✅ Replaced all body sections (nav + footer untouched) with the new 7-section marketplace/exchange story → `dist/index.html`
  - Sections: Hero + Pass-preview stub · "The exchange, right now" stats (dark band) · "Three ways in" (Merchants/Buyers/Integrators) · "How the guarantee works" · "Try one for yourself" demo-Pass · "Supply meets demand, through six channels" · "Take it further" (playbook + booking)
  - New in-palette components added to the page `<style>`: Pass stub (perforation + CONSUMED/SAMPLE stamp), chips, channel infographic + grid table, booking slot buttons, v2 inputs, on-screen form confirms
  - Front-end-only inline `<script>` wires demo-Pass / playbook / booking confirmations + single-slot selection (post nowhere)
  - i18n: new `home.v2.*` namespace, 136 keys added to **all four** language files (`en` real; `zh-TW`/`zh-CN`/`ar` = English placeholders) in both `src/` and `dist/` — verified every HTML key resolves in every language (i18n.js returns the literal key on a miss, so placeholders are required)
  - Kept "coupon" in `<title>`/meta/JSON-LD; one `<h1>`; `#hero-section` + `.hero-description` Speakable hooks preserved
  - `npm run` Tailwind rebuild done (`dist/output.css`); no `main.js`/`i18n.js` changes
  - ⏳ **Pending:** live browser QA (language switching, RTL for `ar`, responsive, form confirms) — Chrome extension was not connected this session
  - Impact: Step 1 of the 10-page site content revamp (`temp/00-README.md`). Placeholder metrics (1,240 / 86,400 / 14 / 3, 40-page playbook) to be replaced before launch; real zh/ar translations and page renames are later steps.

**2026-09-09 (Operator App Legal Pages — Terms of Use + Privacy Policy):**
- ✅ Created Singapore-law legal docs for the Operator App (used by Merchant staff for coupon redemption & distribution) → `dist/legal/operator/terms-of-use.html`, `dist/legal/operator/privacy-policy.html`
  - Design: "legal instrument" identity — monospace apparatus (§ clause numbers + `EFFECTIVE · VERSION · GOVERNING LAW: SINGAPORE · APPLIES TO` masthead), sticky scroll-synced clause index, single brand-orange accent; brand nav/footer reused with `../../` paths
  - Terms = 16 clauses; Privacy = 15 clauses (PDPA-aligned); doc-switch chips, print, breadcrumb, print stylesheet, reduced-motion + RTL (logical properties), WCAG focus-visible
  - i18n: new `operatorLegal` namespace added to EN, zh-TW, zh-CN, ar (src + dist); line endings preserved (CRLF for en/zh, LF for ar). 165 data-i18n keys, 0 missing across all 4 languages
  - ⚠️ PENDING (user): replace placeholder `[Mezzofy Singapore entity name] (UEN: __________)` with the registered Singapore entity + UEN before publishing; legal review recommended. Contact = support@mezzofy.com
  - Deliberately NOT added to nav/sitemap.xml — pages are referenced from inside the Operator App
  - ✅ Follow-up: pages always open in English (page-local override of i18n saved/browser detection; `?lang=` deep links + selector still honored)
  - ✅ Follow-up: site header (nav) and footer removed — pages are chrome-less for in-app embedding (`--nav` collapsed to 0; breadcrumb + masthead retained).
  - ✅ Follow-up: added a compact inline language toggle (EN / 繁體中文 / 简体中文 / العربية) to the masthead, replacing the selector lost with the header. Reuses the existing `lang-option` hook in `js/main.js` (no new JS/i18n keys); active language highlighted automatically.

**2026-02-25 (Coupon Marketplace Hero Title Rephrase):**
- ✅ Reduced hero title by one word on coupon-marketplace.html → `dist/coupon-marketplace.html:335`
  - Impact: More direct and authoritative hero headline
  - Changed from: "THE GLOBAL EXCHANGE HUB FOR DIGITAL COUPONS" (8 words)
  - Changed to: "GLOBAL EXCHANGE HUB FOR DIGITAL COUPONS" (7 words)
  - Files updated: dist/coupon-marketplace.html, dist/i18n/translations/en.json, src/i18n/translations/en.json
  - Chinese translations unchanged (no "THE" equivalent in Chinese)
  - Orange highlight on "DIGITAL COUPONS" preserved
  - No build required (static HTML and JSON updates)
  - Time: ~7 minutes (as estimated)
  - Rationale: Removing article "THE" creates more punchy, professional headline

**2026-02-25 (Theme-Color Meta Tag — All Pages):**
- ✅ Added theme-color meta tag to all 39 pages → `dist/**/*.html`
  - Impact: Consistent mobile browser chrome color across entire site
  - Tag added: `<meta name="theme-color" content="#FF6B35">`
  - Pages updated: 17 main + 6 blog + 8 news + 8 news backups = 39 pages
  - Placement: After viewport/description meta tags, before title tag
  - Platform support: Android Chrome (toolbar), iOS Safari (PWA status bar)
  - Verification: Automated grep confirms 40 pages with theme-color (including index.html)
  - Result: Professional branded appearance on all mobile browsers
  - Time: 35 minutes (within 35-45 minute estimate)
  - No build needed (static HTML meta tag)
  - Files modified: 39 HTML files across dist/, dist/blog/, dist/news/, dist/news/backup/
  - Related: Plan document in conversation history

**2026-02-25 (Color Compliance Fix — index.html):**
- ✅ Fixed index.html Tailwind config color definitions → `dist/index.html:15-16`
  - Impact: Homepage now 100% compliant with brand color standards
  - Changed: 'dark-orange' from #DC7B08 to #e65a2b (correct)
  - Changed: 'light-orange' from #F8C471 to #ffa374 (correct)
  - Added: theme-color meta tag #FF6B35 for mobile browser chrome
  - Verification: Automated grep search confirms old colors removed
  - Result: Overall site compliance improved from 93.5% to 96.8%
  - Time: 3 minutes (faster than 5-minute estimate)
  - No build needed (inline config interpreted at runtime)
  - Files modified: `dist/index.html` (3 lines: 6, 15, 16)
  - Related: COLOR-AUDIT-FINAL-REPORT.md (updated with fix details)

**2026-02-25 (Comprehensive Orange Color Audit — 31 Pages):**
- ✅ Completed comprehensive color audit of all 31 pages (main + blog + news) → `COLOR-AUDIT-FINAL-REPORT.md`
  - Impact: Verified brand color consistency across entire website
  - Result: 93.5% compliance (29/31 pages fully compliant)
  - Found: ZERO deprecated colors (#ff7a3d, #F39C12) — previous standardization successful
  - Identified: 1 non-compliant page (index.html - incorrect Tailwind config)
  - Identified: 1 page needing review (nfc-user-guide.html - semantic colors)
  - Method: Automated grep searches + manual code review
  - Scope: 17 main pages + 6 blog articles + 8 news articles
  - Official brand color: #FF6B35 (primary-orange), #e65a2b (dark-orange)
  - Files created:
    - `COLOR-AUDIT-FINAL-REPORT.md` (comprehensive 500+ line report)
    - `temp/color-audit-batch-1-main-pages.md` (detailed main pages findings)
    - `temp/color-audit-batch-2-blog.md` (blog articles findings)
    - `temp/color-audit-batch-3-news.md` (news articles findings)
  - **Next Step:** Fix index.html Tailwind config (lines 15-16) — 5 minutes estimated
  - Reference: CLAUDE.md § Color Palette, tailwind.config.js

**2026-02-22 (MCP Server Configuration Fix — Windows Compatibility):**
- ✅ Fixed Shadcn MCP server configuration for Windows → `.mcp.json`
  - Impact: Claude Code can now access Shadcn UI component tools on Windows
  - Changed command from `npx` (Unix-only) to `cmd /c npx` (Windows-compatible)
  - Root cause: Windows cannot execute npm executables directly without command wrapper
  - Added comprehensive MCP server documentation to CLAUDE.md
  - Includes: Configuration guide, troubleshooting steps, cross-platform notes
  - Risk: Low (single file change, non-breaking, easy to revert)
  - Verification: MCP diagnostics should show no warnings for Shadcn server
  - Files modified: `.mcp.json` (config), `CLAUDE.md` (documentation)
  - Reference: https://code.claude.com/docs/en/mcp

**2026-02-21 (NFC Page Strategic Pivot — Channel Partner Rewrite + Hero Standardization):**
- ✅ **HERO SECTION STANDARDIZATION:** Changed coupon-nfc.html hero from Pattern 1 (text-centered) to Pattern 2 (grid-based with image) → `dist/coupon-nfc.html`
  - Impact: NFC product page now matches standard product page design (same as coupon-management, coupon-marketplace, coupon-marketing, coupon-wallet)
  - Changed `pt-32` → `pt-6` (Protocol Context Banner above hero)
  - Removed `text-center` from hero container (content now left-aligned)
  - Added grid layout: `grid md:grid-cols-2 gap-12 items-center`
  - Added hero image column: `https://placehold.co/600x400/1a1a1a/ff7a3d?text=NFC+Distribution+Network`
  - Added `nfc.hero.imageAlt` translation key to all 6 JSON files (dist + src, EN/zh-TW/zh-CN)
  - Synced entire NFC section from dist to src JSON files (237 lines replaced 166 old merchant-focused lines)
- ✅ Rewrote coupon-nfc.html to align with strategic pivot from SaaS to B2B channel partner model → `dist/coupon-nfc.html` + `dist/i18n/translations/en.json`
  - Impact: NFC page now targets channel partners (malls, corporate HR, property developers) instead of individual merchants
  - **REMOVED:** All pricing sections ($79/month, $799/year SaaS subscriptions) — 107 lines deleted
  - **REMOVED:** Merchant-focused features section (8 feature items) — 113 lines deleted
  - **ADDED:** Value Proposition section (4 partner benefits: zero tech burden, captive audience, network effect, revenue opportunity)
  - **ADDED:** Partner Types section (Mall Operators, Corporate HR & Benefits, Property Developers with specific value propositions)
  - **ADDED:** Network Effect section (5-step distribution flywheel explaining compounding network value)
  - **ADDED:** Pilot Opportunities section (Standard Chartered Bank HR pilot, mid-size mall operators)
  - **ADDED:** Partnership Model section (performance-based, revenue share, custom deployment — replaces pricing)
  - **ADDED:** Contact form with partner type dropdown (mall/corporate/property/other)
  - **REVISED:** Hero section — "Power Your Spaces with the Mezzofy NFC Network" (was "Instant Coupon Distribution")
  - **REVISED:** How It Works — Partner POV (Partner Onboards → Tags Deployed → Merchants Flow Through → Consumers Engage → Network Grows)
  - **REVISED:** Case Study — Leading Mall Operator (50+ nodes, 120+ merchants, +18% traffic) instead of Supermarket Chain
  - **REVISED:** FAQ — 4 partner-focused questions (tech obligations, merchant control, churn handling, launch timing)
  - **REVISED:** Ecosystem section — "Plug into Full Exchange Ecosystem" with channel partner framing
  - **REVISED:** Footer CTA — "Ready to Become a Distribution Partner?" (was "Launch Your NFC Campaign")
  - Translations: English (dist/en.json) complete with 38 new keys, 5 modified keys, 27 deprecated keys removed
  - Remaining: Chinese translations (zh-TW, zh-CN) pending for both dist/ and src/ directories
  - Strategic Alignment: Page now aligns with Mezzofy_Pivot_Strategy_v3.md (stop selling $79/month subscriptions, reposition NFC as distribution network)
  - Documentation: Created NFC-PAGE-REWRITE-SUMMARY.md (comprehensive implementation summary with testing checklist)
  - Files modified: `dist/coupon-nfc.html` (HTML complete), `dist/i18n/translations/en.json` (English translations complete)
  - Files pending: 5 translation files (zh-TW and zh-CN in both dist/ and src/, plus src/en.json sync)

**2026-02-21 (Copyright Year Update — 2024 → 2025):**
- ✅ Updated copyright year across all pages → `src/i18n/translations/*.json` + `dist/i18n/translations/*.json` (9176859)
  - Impact: All 31 active pages now display "© 2025 Mezzofy. All rights reserved." in footer
  - Updated common.footer.copyright in all 3 languages (EN, zh-TW, zh-CN)
  - Changes: EN: "© 2024" → "© 2025 Mezzofy. All rights reserved."
  - Changes: zh-TW: "© 2024 Mezzofy. 版權所有。" → "© 2025 Mezzofy. 版權所有。"
  - Changes: zh-CN: "© 2024 Mezzofy. 版权所有。" → "© 2025 Mezzofy. 版权所有。"
  - Updated both src/ (source) and dist/ (distribution) translation files
  - Automatic propagation via i18n system using data-i18n="common.footer.copyright"
  - Files modified: 6 JSON files (3 in src, 3 in dist)
  - Backup files created: *.json.2024backup (for rollback if needed)
  - JSON syntax validated: All 6 files pass validation
  - Implementation: JSON-only update (no HTML changes needed)

**2026-02-17 (Session 4 — 6 Product Pages i18n Complete):**
- ✅ Verified and completed i18n for all 6 product pages → `coupon-*.html` + `i18n/translations/*.json`
  - coupon-management.html: 0 missing keys (already complete)
  - coupon-nfc.html: 0 missing keys (already complete)
  - coupon-campaign.html: 0 missing keys (already complete)
  - coupon-playbook.html: 0 missing keys (already complete)
  - coupon-marketplace.html: Fixed 1 missing key (`marketplace.hero.imageAlt`) in all 3 JSON files
  - coupon-wallet.html: Full i18n implementation — added 120 data-i18n attributes + 82 wallet.* translation keys to all 3 JSON files; fixed 3 wrong nav key names (common.nav.about/contact/news → aboutUs/contactUs/newsPress); added all missing footer data-i18n attributes
  - Progress: **30/30 pages with full i18n (100%)** — COMPLETE ✅

**2026-02-17 (index.html i18n Verification):**
- ✅ Verified index.html already has complete i18n support → `index.html` + `i18n/translations/*.json`
  - Impact: Homepage confirmed supporting EN, zh-TW, zh-CN — updates progress to 28/30 (93%)
  - 126 total translation keys (80 home-specific) all verified present in all 3 JSON files
  - Includes data-i18n, data-i18n-placeholder, and data-i18n-alt attributes
  - Progress: 28/30 pages with full i18n (93%) [was 27/30 = 90%]

**2026-02-17 (for-merchants.html + for-developers.html i18n Verification):**
- ✅ Verified for-merchants.html and for-developers.html already have complete i18n support → `for-merchants.html` + `for-developers.html` + `i18n/translations/*.json`
  - Impact: 2 solution pages confirmed supporting EN, zh-TW, zh-CN — updates progress to 27/30 (90%)
  - for-merchants.html: 102 translation keys (57 merchants-specific) all verified in 3 JSON files
  - for-developers.html: 126 translation keys (81 developers-specific) all verified in 3 JSON files
  - Fixed: Added missing `developers.contact.projectPlaceholder` key to all 3 JSON files
  - Progress: 27/30 pages with full i18n (90%) [was 25/30 = 83%]

**2026-02-17 (about.html + contact.html i18n Verification):**
- ✅ Verified about.html and contact.html already have complete i18n support → `about.html` + `contact.html` + `i18n/translations/*.json`
  - Impact: 2 core pages confirmed supporting EN, zh-TW, zh-CN — updates progress to 25/30 (83%)
  - about.html: 25 translation keys (hero, mission, performance metrics, awards, brands) all verified in 3 JSON files
  - contact.html: 37 translation keys (hero, contact info, offices, form with 5 dropdown options) all verified in 3 JSON files
  - Both pages have i18n.js in head, i18n-loading body class, language selectors, and all data-i18n attributes
  - Progress: 25/30 pages with full i18n (83%) [was 23/30 = 77%]

**2026-02-17 (news-press.html i18n Verification):**
- ✅ Verified news-press.html has complete i18n support → `news-press.html` + `i18n/translations/*.json`
  - Impact: Hub page for all 14 articles fully supports EN, zh-TW, zh-CN
  - Translations verified: 46 translation keys across 3 languages work correctly
  - Infrastructure: Language selectors, localStorage persistence, filter functionality
  - HTML structure: 128 data-i18n attributes properly configured
  - Translation keys: newsPress.hero.*, newsPress.filter.*, newsPress.articles.* (all 14 articles)
  - English translations complete (lines 344-417 in en.json)
  - Traditional Chinese complete (lines 330-403 in zh-TW.json)
  - Simplified Chinese complete (lines 330-403 in zh-CN.json)
  - Progress: 23/30 pages with full i18n (77%) [was 22/30 = 73%]

**2026-02-17 (CLAUDE.md Compression - Below 40KB Target):**
- ✅ Compressed CLAUDE.md from 53.6KB to 32.8KB without context loss → `CLAUDE.md` (956 lines)
  - Impact: 37.3% size reduction (504 lines removed), faster scanning, significantly reduced AI context usage
  - **Target:** Reduce by 24% to reach <40KB → **Achieved:** 37.3% reduction to 32.8KB ✅
  - Strategy: Moved full templates to reference files, consolidated redundant sections, converted verbose text to tables
  - Preserved: All critical info (build commands, architecture, colors, security, deployment)
  - Changes:
    1. Page Templates (277 → 15 lines): Reference for-distributors.html instead of embedding full HTML
    2. Status Management (158 → 25 lines): Consolidated redundant subsections, link to STATUS.md
    3. Complete Sitemap (120 → 20 lines): Unified 6 tables into 1 master table
  - Backup: CLAUDE.md.backup-before-compression
  - Related: Implementation plan documented in planning session

**2026-02-17 (CLAUDE.md Enhancement - Comprehensive i18n Documentation):**
- ✅ Enhanced CLAUDE.md i18n section with comprehensive workflows and troubleshooting → `CLAUDE.md` (lines 743-1136)
  - Impact: Developers now have centralized reference for all i18n workflows, testing, and troubleshooting
  - Expanded from ~72 lines to ~393 lines (5.4x increase)
  - Added 7 major enhancements:
    1. Progress Tracking Reference (23/30 pages = 77% coverage visibility)
    2. Translation Workflows Section (4 workflows: single page, batch updates, fixing mismatches, testing)
    3. Translation Glossary Requirements (consistency rules, 100+ standardized terms)
    4. HTML Content in Translations (safe tags, XSS security considerations)
    5. Common Issues & Troubleshooting (4 common issues with fixes)
    6. Testing Checklist (8 essential tests before commit)
    7. Documentation Reference Table (6 documentation files with navigation guide)
  - Enhanced File Structure section with line counts for all documentation files
  - Added Best Practices to Key Naming Convention section
  - Replaced "Full Documentation" with comprehensive Documentation Reference table
  - Included security warnings about innerHTML XSS risk (references SECURITY.md)
  - Documents fallback behavior (commit a731688 changes)
  - Cross-references: STATUS.md, SECURITY.md, README.md, TRANSLATION_CHECKLIST.md, TRANSLATION_GLOSSARY.md, QA-CHECKLIST.md, ARTICLE-TRANSLATIONS-IMPLEMENTATION.md
  - Improved developer onboarding: One central place to learn entire i18n system
  - Reduced confusion: Clear workflow steps for common tasks
  - Faster troubleshooting: Common issues documented with specific fixes
  - Better consistency: Glossary requirements standardized
  - Security awareness: HTML/XSS considerations documented

**2026-02-17 (CRITICAL BUG FIX - i18n Key Display Issue):**
- ✅ Fixed critical i18n bug where translation keys displayed instead of content → `dist/i18n/i18n.js` (a731688)
  - Impact: Blog and news pages now show actual content instead of raw i18n key strings like "articles.blog.nfcParknshop.title"
  - Root cause: getTranslation() returned key string when translation not found, which then replaced HTML fallback content
  - Solution: Changed line 159 to return `null` instead of key string to preserve HTML fallback content
  - Behavior now: Missing translation → HTML fallback shows | Translation exists → Translation shows
  - Console warnings still logged for debugging missing keys
  - Risk: Very low - improves system robustness
  - Breaking changes: None - only improves fallback behavior
  - All language switching functionality preserved
  - Users no longer see technical key strings on any pages

**2026-02-16 (Latest - Individual Article Page Translations Added):**
- ✅ Added missing article.blog.* and articles.news.* translations for all individual article pages → `dist/i18n/translations/*.json`
  - Impact: All 14 individual blog and news article detail pages now display translated content instead of translation key strings
  - Added 166 translation keys across all 3 language files (en.json, zh-TW.json, zh-CN.json)
  - Blog articles (6): eCouponsPreference, environmentalExcellence, holidayGuide, hotelTechInnovation, nfcParknshop, smartRetail (112 keys)
  - News articles (8): cioworldFeature, dualEsgAwards, edigestLeadingSolution, ejtech300mCoupons, forbesDickyYin, fundingAnnouncement, techappleInnovationIndex, treasureGlobalPartnership (54 keys)
  - Created automated extraction script (extract-article-translations.js) to extract English content from HTML files
  - Created merge script (merge-translations.js) to add translations to all 3 JSON files
  - Manually added missing ejtech300mCoupons article (add-ejtech-article.js)
  - English translations: Extracted from HTML fallback content
  - Chinese translations: Using English placeholders temporarily (professional translation recommended for production)
  - Fixes issue where users saw "articles.blog.nfcParknshop.title" instead of actual article titles
  - Users can now switch between EN, zh-TW, zh-CN on all individual blog and news pages
  - Created test page (test-article-translations.html) for verification
  - All JSON files validated - syntax correct
  - Backup files created (.backup) for rollback if needed

**2026-02-16 (News Hub Article Translations Added):**
- ✅ Added missing newsPress.articles translations to hub page → `dist/i18n/translations/*.json` (c3f241c)
  - Impact: All 14 article preview cards now display translated titles and descriptions when switching languages
  - Added newsPress.articles namespace with 14 article objects (title + description each = 28 keys total)
  - Updated all 3 translation files: en.json, zh-TW.json, zh-CN.json
  - English: Extracted from news-press.html fallback content
  - Traditional Chinese: Professional translations for all articles
  - Simplified Chinese: Professional translations for all articles
  - Articles included: nfcParknshop, treasureGlobal, eCouponsPreference, environmentalExcellence, techappleInnovation, dualEsgAwards, fundingAnnouncement, holidayGuide, smartRetail, cioworldFeature, ejtech300m, edigestLeading, forbesDickyYin, hotelTechInnovation
  - Users can now switch between EN, zh-TW, zh-CN on news-press.html hub page without seeing translation key strings
  - All JSON files validated - syntax correct
  - Fixes broken display where users saw "newsPress.articles.holidayGuide.title" instead of actual translated text

**2026-02-16 (Earlier - CTA Section Translations Added):**
- ✅ Added i18n translation attributes to CTA section on all blog and news pages → `dist/blog/*.html`, `dist/news/*.html`
  - Impact: Call-to-action section above footer now translates correctly into Traditional and Simplified Chinese
  - Added data-i18n="home.cta.title" to CTA heading on 14 pages
  - Added data-i18n="home.cta.description" to CTA paragraph on 14 pages
  - Added data-i18n="home.cta.contactSales" to "Contact Sales (Enterprise)" button on 14 pages
  - Added data-i18n="home.cta.developerDocs" to "Developer Docs (API Access)" button on 14 pages
  - Files modified: All 6 blog articles + all 8 news articles (14 total)
  - Translation keys already existed in all 3 language files (en.json, zh-TW.json, zh-CN.json)
  - No JSON modifications required - HTML-only changes
  - Verified with automated tests: All 14 files have all 4 required data-i18n attributes
  - Translations work correctly:
    - EN: "Ready to power the future of commerce?" / "Contact Sales (Enterprise)" / "Developer Docs (API Access)"
    - zh-TW: "準備好推動商務的未來了嗎？" / "聯絡業務（企業）" / "開發者文件（API 訪問）"
    - zh-CN: "准备好推动商务的未来了吗？" / "联系业务（企业）" / "开发者文档（API 访问）"

**2026-02-16 (Solutions Navigation Dropdown Added):**
- ✅ Added missing Solutions dropdown to all blog and news pages → `dist/blog/*.html`, `dist/news/*.html` (6cec90c)
  - Impact: Blog and news readers can now navigate to audience-specific landing pages (For Merchants, For Distributors, For Developers)
  - Added desktop Solutions dropdown (appears first, before Products)
  - Added mobile Solutions dropdown (appears after Language selector, before Products)
  - Files modified: All 6 blog articles + all 8 news articles (14 total)
  - Used correct relative paths (../) for subdirectory navigation
  - Included proper i18n translation attributes (common.nav.solutions, common.nav.merchantSolution, etc.)
  - Navigation structure now matches main pages (for-distributors.html, index.html)
  - Desktop: CSS-only hover dropdowns with .dropdown and .dropdown-trigger classes
  - Mobile: JavaScript accordion with data-dropdown="solutions" and data-menu="solutions"
  - Verified with automated tests: 14 files with desktop nav, 14 files with mobile nav, 140 correct relative paths
  - Build successful: npm run build completed, CSS recompiled

**2026-02-16 (Hotel Tech Innovation Translation Attributes Fixed):**
- ✅ Fixed missing translation attributes in hotel-tech-innovation.html → `dist/blog/hotel-tech-innovation.html` (fbdd7cf)
  - Impact: Article title and Contact Us section now translate when users switch to Chinese languages
  - Added data-i18n="articles.blog.hotelTechInnovation.title" to h1 element at line 217
  - Added data-i18n="articles.blog.hotelTechInnovation.contact.heading" to Contact Us heading at line 283
  - Added data-i18n="articles.blog.hotelTechInnovation.contact.info" to contact info paragraph at line 284
  - Title translation keys already existed in JSON files, just needed HTML attribute
- ✅ Added contact section translations to hotel-tech-innovation article → `dist/i18n/translations/*.json` (85366d4)
  - Impact: Contact Us section heading now translates properly in all 3 languages
  - Added articles.blog.hotelTechInnovation.contact.heading and contact.info keys to all 3 language files
  - Translations: "Contact Us" (EN), "聯絡我們" (zh-TW), "联系我们" (zh-CN)
  - Users can now see the article title in their selected language:
    - EN: "Why Tech Innovation is Key to Hotel Success"
    - zh-TW: "為什麼技術創新是酒店成功的關鍵"
    - zh-CN: "为什么技术创新是酒店成功的关键"
  - Contact section heading displays correctly in all languages
  - Consistent with other blog articles (smart-retail.html has working title and contact translations)

**2026-02-16 (Smart Retail Paragraph Translation Key Fixed):**
- ✅ Fixed translation key mismatch in smart-retail.html paragraph → `dist/blog/smart-retail.html` (8dc1520)
  - Impact: Paragraph now translates correctly when users switch to Chinese languages
  - Changed data-i18n key from "strategies" to "strategiesIntro" to match JSON translation files
  - Translation content already existed but couldn't be accessed due to incorrect key name
  - Fixed line 254: Updated data-i18n attribute
  - Users can now see the paragraph in their selected language:
    - EN: "Successful implementation of NFC coupon strategies requires careful attention to multiple key factors:"
    - zh-TW: "成功實施 NFC 優惠券策略需要仔細關注多個關鍵因素："
    - zh-CN: "成功实施 NFC 优惠券策略需要仔细关注多个关键因素:"
  - Consistent with other paragraphs in the same article which had working translations

**2026-02-16 (Smart Retail Title Translation Fixed):**
- ✅ Fixed missing title translation in smart-retail.html → `dist/blog/smart-retail.html` (29ab5e2)
  - Impact: Article title now translates to Chinese languages when user switches language
  - Added data-i18n="articles.blog.smartRetail.title" attribute to h1 element at line 217
  - Translation keys already existed in all 3 JSON files, just needed HTML attribute
  - Users can now see title in their selected language:
    - EN: "Tech-led Smart Retail - NFC Coupons Driving Impulse Purchases"
    - zh-TW: "技術主導的智能零售 - NFC 優惠券推動衝動購買"
    - zh-CN: "技术主导的智能零售 - NFC 优惠券推动冲动购买"
  - Consistent with other blog articles which had working title translations

**2026-02-16 (Smart Retail Article Translations Fixed):**
- ✅ Fixed missing translation keys in smart-retail.html article → `dist/i18n/translations/*.json` (c579689)
  - Impact: Article final section now displays proper content instead of translation key names
  - Impact: Users can view the complete article in all 3 languages (EN, zh-TW, zh-CN)
  - Added 4 missing translation keys to smartRetail article in all 3 language files
  - Keys added: headings.transformative, paragraphs.transformative, contact.heading, contact.info
  - Files updated: en.json, zh-TW.json (繁體中文), zh-CN.json (简体中文)
  - Translations: "The Transformative Potential" (EN), "轉型潛力" (zh-TW), "转型潜力" (zh-CN)
  - Contact section: Email and WhatsApp links now translate correctly
  - Users no longer see technical key names like "articles.blog.smartRetail.contact.heading"

**2026-02-16 (Article Translation Attributes Fixed):**
- ✅ Fixed missing translation attributes in 5 blog articles → `dist/blog/*.html` (dc17cc6)
  - Impact: Desktop navigation dropdowns now translate to Chinese languages
  - Impact: Breadcrumb "Back to News & Press" links now translate properly
  - Impact: Bottom "Back to News & Press" buttons now translate properly
  - Added <span data-i18n="..."> wrappers to 27 elements across 5 blog articles
  - Files: environmental-excellence (6 edits), holiday-guide (5 edits), hotel-tech-innovation (6 edits), nfc-parknshop (4 edits), smart-retail (6 edits)
  - Note: e-coupons-preference.html already had correct attributes
- ✅ Fixed missing translation attributes in 8 news articles → `dist/news/*.html` (376455c)
  - Impact: Breadcrumb "Back to News & Press" links now translate to Chinese languages
  - Added <span data-i18n="common.news.backToHub"> wrappers to 8 breadcrumb links
  - Files: cioworld-feature, dual-esg-awards, edigest-leading-solution, ejtech-300m-coupons, forbes-dicky-yin, funding-announcement, techapple-innovation-index, treasure-global-partnership
  - All translation keys already existed in JSON files
  - Users can now switch languages (EN ↔ zh-TW ↔ zh-CN) and see fully translated navigation and breadcrumbs

**2026-02-16 (Earlier - News-Press Hub Translations):**
- ✅ Added Chinese translations to news-press.html article preview cards → `dist/news-press.html`, `dist/i18n/translations/*.json` (f9e0f34)
  - Impact: All 14 article preview cards now display translated titles and descriptions
  - Added newsPress.articles namespace with 14 article objects (title + description each)
  - Updated all 3 translation files: en.json, zh-TW.json, zh-CN.json
  - Added data-i18n attributes to 28 elements (14 titles + 14 descriptions)
  - Articles: 6 blog articles + 8 news articles
  - Blog: nfcParknshop, eCouponsPreference, environmentalExcellence, holidayGuide, smartRetail, hotelTechInnovation
  - News: treasureGlobal, techappleInnovation, dualEsgAwards, fundingAnnouncement, cioworldFeature, ejtech300m, edigestLeading, forbesDickyYin
  - Users can now switch between EN, zh-TW, zh-CN on the news-press hub page

**2026-02-16 (Blog/News Footer Standardization):**
- ✅ Standardized footers across all 14 blog and news articles → `dist/blog/*.html`, `dist/news/*.html`
  - Impact: Visual consistency across all article pages matching main site design
  - Changed from 4-column to 5-column footer layout
  - Added Company Info column and Solutions column
  - Preserved CTA sections ("Ready to power the future of commerce?")
  - Updated styling: text-gray-300, text-gray-400, border-gray-700
  - Changed containers from .section-container to max-w-7xl (Tailwind standard)
  - Fixed CTA button links: ../contact.html and ../for-developers.html
  - Added comprehensive i18n attributes throughout footers
  - Files: All 6 blog articles + all 8 news articles (14 total)
  - Blog: e-coupons-preference, environmental-excellence, holiday-guide, hotel-tech-innovation, nfc-parknshop, smart-retail
  - News: cioworld-feature, dual-esg-awards, edigest-leading-solution, ejtech-300m-coupons, forbes-dicky-yin, funding-announcement, techapple-innovation-index, treasure-global-partnership

**2026-02-16 (Forbes Image Fix):**
- ✅ Fixed Forbes Dicky Yin broken image → `dist/news-press.html` (b27b847)
  - Impact: Forbes article card now displays local image correctly
  - Replaced broken external URL with local image path
  - Image: `assets/images/news/forbes-dicky-yin.png` (802KB)
  - All 8 news articles now consistently use local images
  - File: news-press.html line 590
  - Related: Completes image localization from commit 86dc07f

**2026-02-15 (Image Localization):**
- ✅ Localized all blog and news images to /assets/images/ → `dist/assets/images/blog/`, `dist/assets/images/news/` (86dc07f)
  - Impact: Eliminated external CDN dependency for all article images
  - Impact: Faster page loads (same-origin requests, no external DNS lookup)
  - Impact: Site works offline and in testing environments
  - Downloaded 14 images: 6 blog (1.2 MB) + 8 news (1.9 MB) = ~3 MB total
  - Updated 21 HTML files: 6 blog + 8 news + 7 news backup files
  - Changed paths from https://mezzofy.com/wp-content/uploads/... to ../assets/images/blog|news/
  - Removed orphaned forbes-dicky-yin.png from root assets folder
  - Known Issue: forbes-dicky-yin.png returns 404 from server (placeholder copied, needs manual replacement - 146 bytes)
  - Files: e-coupons-preference, environmental-excellence, holiday-guide, hotel-tech-innovation, nfc-parknshop, smart-retail, cioworld-feature, dual-esg-awards, edigest-leading-solution, ejtech-300m-coupons, forbes-dicky-yin, funding-announcement, techapple-innovation-index, treasure-global-partnership

**2026-02-16 (News Navigation Fix):**
- ✅ Fixed broken navigation on 8 news pages → `dist/news/*.html` (5cd3a4a)
  - Impact: Restored 4 missing dropdown menus (Products, Developer, Resources, Company)
  - Impact: Fixed mobile menu (added hamburger button + accordion dropdowns)
  - Impact: Fixed structural HTML errors (missing closing tags)
  - Method: Replaced incomplete navigation with working reference from blog
  - Testing: Verified desktop dropdowns (10 triggers), mobile accordion, language switching
  - All 8 news pages now have consistent navigation (identical to blog structure)
  - Files: treasure-global-partnership, dual-esg-awards, funding-announcement, cioworld-feature, techapple-innovation-index, ejtech-300m-coupons, edigest-leading-solution, forbes-dicky-yin

**2026-02-16 (Footer Standardization):**
- ✅ Standardized About Us footer to match homepage pattern → `dist/about.html` (34e5265)
  - Impact: Visual consistency across all 3 core pages (index, about, contact)
  - Removed CTA section from footer (-17 lines)
  - Changed container from .section-container to max-w-7xl (Tailwind standard)
  - Updated text colors: text-white/text-gray-200 → text-gray-300
  - Updated copyright border: border-white/20 → border-gray-700
  - Removed extra wrapper div and id="contact" attribute
  - All 3 core pages now have identical footer structure

**2026-02-15 (Hero Layout Improvements):**
- ✅ Improved homepage hero section desktop layout → `dist/index.html` (226bdcb)
  - Impact: Better desktop screen utilization (+80px container width: 1200px → 1280px)
  - Fixed deprecated color #FF6B35 → #ff7a3d (official brand)
  - Added dark-orange (#e6682f) and light-orange (#ffb088) to Tailwind config
  - Standardized container to max-w-7xl (Tailwind standard)
  - Made spacing responsive: pt-24 pb-16 md:pt-32 md:pb-24 (better mobile UX)
  - Expanded description width: max-w-3xl → max-w-4xl (better readability)
  - Updated subtitle to brand color: text-light-orange
  - Removed 43 lines of inline style overrides (code cleanup)
  - All sections now use responsive containers from compiled CSS

**2026-02-15 (Post-i18n fix):**
- ✅ Fixed i18n path bug → `src/i18n/i18n.js`, `dist/i18n/i18n.js` (9306108)
  - Impact: Blog and news pages now load translations correctly
  - Changed fetch path from relative to absolute (/i18n/translations/)
  - All 22 pages with i18n now fully functional (translation keys no longer display)
  - Related: Fixes issue where subdirectory pages showed "common.nav.products" instead of "Products"

**2026-02-15 (Latest):**
- ✅ Phase 3 complete: All 8 news articles with i18n → `dist/news/*.html` (c9a4de4)
  - Impact: Added language selectors (desktop + mobile) and data-i18n attributes
  - All news articles now support EN, zh-TW, zh-CN
  - Progress: 23/30 pages with full i18n (77%, up from 53%)
- ✅ Phase 2 complete: All 6 blog articles with i18n → `dist/blog/*.html` (b210b99)
  - Impact: Added i18n infrastructure, language selectors, and data-i18n attributes
  - All blog articles now support EN, zh-TW, zh-CN
- ✅ Phase 1 complete: NFC User Guide migrated to standard i18n → `dist/nfc-user-guide.html` (966f1dd)
  - Impact: Replaced custom language switcher with standard i18n.js integration
  - Added zh-CN support (3rd language, previously only EN + zh-TW)
- ✅ Common blog/news translation keys added → `dist/i18n/translations/*.json` (a2d3cf2)
  - Impact: Created reusable keys for navigation, labels, UI elements across 14 articles

**2026-02-15 (Earlier):**
- ✅ Optimized CLAUDE.md file size → Reduced from 64KB to 44KB (31% reduction)
  - Impact: Extracted 826-line AWS deployment section to DEPLOYMENT.md
  - Lines: 1,927 → 1,136 (791 lines removed, 41% reduction)
  - Related: See DEPLOYMENT.md for full AWS S3 + CloudFront deployment guide
- ✅ Page Compliance Matrix added to STATUS.md → Tracks 30 pages across 4 criteria
  - Impact: Clear visibility of color, i18n, SRI, template compliance per page
  - Related: See "Page Compliance Matrix" section below
- ✅ Security guidelines documentation → `SECURITY.md` (487 lines) (202d645)
- ✅ Enhanced CLAUDE.md → Security Quick Reference, Page Templates, Layout Standards (202d645)
- ✅ Created .gitignore → Prevents secret commits (202d645)
- ✅ Added robots.txt and security.txt → SEO & vulnerability reporting (202d645)
- ✅ Cleaned directory structure → Moved 7 test files to temp/ (202d645)
- ✅ Fixed color palette documentation → Official: #ff7a3d (202d645)

---

## In Progress (Current Work)

*No active work in progress - footer standardization complete*

**Next Focus Areas:**
- Fix XSS vulnerability in dist/i18n/i18n.js (use textContent instead of innerHTML)
- Fix color on remaining 13 pages (bulk find/replace: #FF6B35 → #ff7a3d)
  - ✅ index.html already fixed (226bdcb)
- Add SRI hashes to 14 pages with Tailwind CDN

---

## Upcoming (Next 2 Weeks)

**High Priority:**
- ⏳ Fix XSS vulnerability in dist/i18n/i18n.js line 110 (use textContent)
- ⏳ Fix color on remaining 13 pages (bulk find/replace: #FF6B35 → #ff7a3d)
  - ✅ index.html fixed (226bdcb)
- ⏳ Add SRI hashes to 14 pages with Tailwind CDN (security)
- ⏳ Deploy CloudFront security headers function (7/7 headers)

**Medium Priority:**
- ⏳ Run npm audit and fix vulnerabilities
- ⏳ Test security headers with securityheaders.com
- ⏳ Add i18n support to 8 remaining pages (core/solutions/products)

**Low Priority:**
- ⏳ HSTS preload submission (after 3 months of deployment)
- ⏳ Set up Dependabot for automated dependency updates
- ⏳ Create page-template.html quickstart template

---

## Active Blockers

*No active blockers*

---

## Quality Gate Status

| Gate | Status | Notes |
|------|:------:|-------|
| Testing | ✅ Pass | All pages load correctly |
| Security | ⚠️ Warning | XSS fix needed, SRI missing |
| Documentation | ✅ Pass | CLAUDE.md (1,136 lines), SECURITY.md (487 lines), DEPLOYMENT.md (906 lines) |
| Performance | ✅ Pass | Static site, minimal dependencies |
| i18n (3 langs) | ✅ Pass | EN, zh-TW, zh-CN all configured |

---

## Key Metrics

| Metric | Value | Trend |
|--------|------:|-------|
| Total Files Modified | 33 | +14 (Feb 15 latest) |
| HTML Pages | 30 | Stable |
| Pages Fully Compliant | 0/30 | 0% |
| Pages with Correct Color | 16/30 | 53% |
| Pages with i18n | 23/30 | 77% ↑↑ |
| Pages with SRI | 0/30 | 0% |
| Test Coverage | N/A | Static site |
| Security Issues | 2 | XSS + SRI (documented) |
| npm Audit | 0 high/critical | ✅ Clean |
| Lighthouse Score | TBD | Not yet measured |

---

## Page Compliance Matrix

**Last Audit:** 2026-02-15
**Overall Compliance:** 0/30 pages (0%) fully compliant

### Compliance Criteria
- **Color:** Uses official `#ff7a3d` (not deprecated `#FF6B35`)
- **i18n:** Full translation support (EN, zh-TW, zh-CN)
- **SRI:** Subresource Integrity hashes on CDN links
- **Template:** Follows standard header/footer/navigation

### Status by Category

| Category | Pages | Color | i18n | SRI | Template | Status |
|----------|:-----:|:-----:|:----:|:---:|:--------:|:------:|
| **Core** (3) | index, about, contact | ❌ 0/3 | ✅ 3/3 | ❌ 0/3 | ✅ 3/3 | ⚠️ 50% |
| **Solutions** (3) | merchants, distributors, developers | ❌ 0/3 | ✅ 3/3 | ❌ 0/3 | ✅ 3/3 | ⚠️ 50% |
| **Products** (6) | All coupon pages | ❌ 0/6 | ✅ 6/6 | ❌ 0/6 | ✅ 6/6 | ⚠️ 50% |
| **Corporate** (3) | investors, news-press, nfc-guide | ⚠️ 1/3 | ✅ 3/3 | ❌ 0/3 | ⚠️ 2/3 | ⚠️ 50% ↑ |
| **Blog** (6) | All blog articles | ✅ 6/6 | ✅ 6/6 | N/A | ✅ 6/6 | ✅ 100% ↑↑ |
| **News** (8) | All press articles | ✅ 8/8 | ✅ 8/8 | N/A | ✅ 8/8 | ✅ 100% ↑↑ |
| **Test** (1) | test-i18n | N/A | ✅ 1/1 | ❌ 0/1 | ❌ 0/1 | ⚠️ Dev |

### Priority Remediation Queue

**🔴 Critical (14 pages):**
- Color fix: index, about, contact, for-merchants, for-distributors, for-developers, coupon-management, coupon-marketplace, coupon-nfc, coupon-marketing, coupon-wallet, coupon-playbook, investors, news-press

**🟠 High (14 pages):**
- SRI hashes: All 14 pages with Tailwind CDN (same as color fix list)

**🟡 Medium (8 pages):**
- i18n: 8 remaining pages (core, solutions, products categories)

**🟢 Low (1 page):**
- Template standardization: nfc-user-guide.html

### Recent Page Updates

**2026-02-16 (Latest - Footer Standardization):**
- ✅ Blog category: 100% template compliance (6/6 pages with standardized footers)
- ✅ News category: 100% template compliance (8/8 pages with standardized footers)
- Changed from 4-column to 5-column footer layout
- Added Company Info and Solutions columns to all 14 article pages
- Full i18n support maintained throughout footer updates

**2026-02-15:**
- ✅ Blog category: 100% i18n coverage (6/6 pages)
- ✅ News category: 100% i18n coverage (8/8 pages)
- ✅ Corporate category: NFC User Guide migrated to standard i18n
- Progress: 23/30 pages with i18n (77%, up from 53%)

**2026-02-15 (Earlier):**
- Initial audit completed - assessed all 30 pages
- Identified 14 pages with deprecated color `#FF6B35`
- Identified 14 pages missing i18n support
- Identified 0 pages with SRI hashes

---

## Known Issues

1. **XSS Vulnerability in i18n.js** (Priority: High)
   - Description: Line 110 uses innerHTML without sanitization
   - Impact: Potential XSS if translation data compromised
   - Workaround: None - needs fix
   - Fix documented in: SECURITY.md §3.1

2. **Missing SRI for CDN Resources** (Priority: Medium)
   - Description: Tailwind CDN lacks integrity hashes
   - Impact: Risk if CDN compromised
   - Workaround: None
   - Fix documented in: SECURITY.md §3.3

---

## Technical Debt

- [ ] Color inconsistency in HTML files - Priority: Low
  - Reason: Legacy #FF6B35 in some pages, should be #ff7a3d
  - Impact: Brand inconsistency, minor visual differences

- [ ] Test files in temp/ not gitignored - Priority: Low
  - Reason: Moved from root but still visible in git status
  - Impact: Noise in git status output

---

## References & Documentation

| Document | Purpose | Last Updated |
|----------|---------|--------------|
| [`CLAUDE.md`](CLAUDE.md) | Developer guide & standards | 2026-02-15 |
| [`DEPLOYMENT.md`](DEPLOYMENT.md) | AWS S3 + CloudFront deployment guide | 2026-02-15 |
| [`SECURITY.md`](SECURITY.md) | Security guidelines & policy | 2026-02-15 |
| [`IMPLEMENTATION-SUMMARY.md`](IMPLEMENTATION-SUMMARY.md) | Detailed implementation log | 2026-02-15 |
| [`DEVELOPMENT.md`](DEVELOPMENT.md) | Legacy quick reference | 2024-12-04 |

---

## i18n Implementation Plan (Phase 2 & 3)

**Current Status:** ✅ ALL PHASES COMPLETE (Phases 1, 2, and 3 done)

### Phase 2: Blog Articles (6 files) - ✅ COMPLETE

**Files to Update:**
1. `dist/blog/e-coupons-preference.html`
2. `dist/blog/environmental-excellence.html`
3. `dist/blog/holiday-guide.html`
4. `dist/blog/hotel-tech-innovation.html`
5. `dist/blog/nfc-parknshop.html`
6. `dist/blog/smart-retail.html`

**For Each File:**
1. Add `<script src="../i18n/i18n.js"></script>` after `<link rel="stylesheet" href="../output.css">`
2. Add `class="i18n-loading"` to `<body>` tag
3. Add language selector dropdown to desktop nav (after Company dropdown):
   ```html
   <!-- Language Selector -->
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
4. Add language selector to mobile menu (after Company dropdown in mobile section)
5. Add `data-i18n` attributes to navigation labels:
   - `data-i18n="common.nav.products"` → Products
   - `data-i18n="common.nav.developer"` → Developer
   - `data-i18n="common.nav.resources"` → Resources
   - `data-i18n="common.nav.company"` → Company
   - `data-i18n="common.buttons.getStarted"` → Get Started
   - All dropdown items (use existing common.nav.* keys)
6. Add `data-i18n` attributes to article elements:
   - Back link: `data-i18n="common.blog.backToHub"`
   - Category label: `data-i18n="common.blog.category"`
   - Previous: `data-i18n="common.blog.previous"`
   - Next: `data-i18n="common.blog.next"`
   - Source label: `data-i18n="common.blog.source"`
   - Back button: `data-i18n="common.blog.backToHub"`

**Note:** Article titles and body content can remain as English for now (professional translation later).

### Phase 3: News Articles (8 files) - ✅ COMPLETE

**Files to Update:**
1. `dist/news/cioworld-feature.html`
2. `dist/news/dual-esg-awards.html`
3. `dist/news/edigest-leading-solution.html`
4. `dist/news/ejtech-300m-coupons.html`
5. `dist/news/forbes-dicky-yin.html`
6. `dist/news/funding-announcement.html`
7. `dist/news/techapple-innovation-index.html`
8. `dist/news/treasure-global-partnership.html`

**Same steps as Phase 2**, but use `common.news.*` keys instead of `common.blog.*`:
- Category label: `data-i18n="common.news.category"`
- Back link: `data-i18n="common.news.backToHub"`
- Previous/Next: `data-i18n="common.news.previous"` / `data-i18n="common.news.next"`

### Verification Checklist (Per Page)

After updating each page:
- [ ] Page loads without errors
- [ ] Language selector appears in desktop nav
- [ ] Language selector appears in mobile menu
- [ ] Language switching works (EN ↔ zh-TW ↔ zh-CN)
- [ ] Language persists on page reload
- [ ] Navigation labels translate correctly
- [ ] Article labels (Back, Previous, Next, Source) translate correctly
- [ ] No console errors or missing translation warnings

### Estimated Effort

- Phase 2 (6 blog): ~45-60 minutes (7-10 min per file)
- Phase 3 (8 news): ~60-80 minutes (7-10 min per file)
- **Total:** ~2 hours for both phases

---

## Change Log (Recent Updates)

**2026-02-15 (Latest):** i18n implementation COMPLETE. All 3 phases done: Phase 1 (NFC guide), Phase 2 (6 blog articles), Phase 3 (8 news articles). 15 files updated with i18n support. Progress: 23/30 pages with full i18n (77%). Commits: 966f1dd, a2d3cf2, b003d03, b210b99, c9a4de4.

**2026-02-15 (Earlier):** Project restructured with comprehensive security documentation. Added STATUS.md for progress tracking. Completed security guidelines implementation (P0, P1, P2 phases). 15 files changed, +2,912 insertions.

---

**Status Legend:**
- ✅ Complete
- 🔄 In Progress
- ⏳ Planned/Upcoming
- 🚫 Blocked
- ⚠️ Warning/At Risk
