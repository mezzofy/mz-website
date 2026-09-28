# Mezzofy website content update — page-by-page

Ten markdown files, one per page. Each contains **only the body content** for that page: headings, copy, tables, CTAs, and structured descriptions of the interactive elements and infographics. Header, navigation, footer, fonts, colours, hero background images and the i18n mechanism are **out of scope** and must be left as they are.

## Files

| File | Updates live page | Notes |
|---|---|---|
| `01-homepage.md` | `index.html` | A built `index.html` + `i18n-home-v2-keys.json` already exist in the parent folder; this MD is the same content in readable form. |
| `02-for-merchants.md` | `for-merchants.html` | Three selectable selling modes with a calculator each. |
| `03-for-buyers.md` | `for-distributors.html` → rename `for-buyers.html` | Commitment calculator, consumer strip, FAQ. |
| `04-for-integrators.md` | `for-developers.html` → rename `for-integrators.html` | Revenue illustrator with an *indicative* share slider. |
| `05-products-hub.md` | new `products.html` (optional) | Only needed if the Products nav dropdown does not already do this job. |
| `06-product-pass.md` | `coupon-serial.html` → rename `pass.html` | Type explorer (7 types), lifecycle, developer JSON. |
| `07-product-vault.md` | `coupon-wallet.html` → rename `vault.html` | Balance-vs-Vault infographic. |
| `08-product-ai-coupon.md` | new `ai-coupon.html` | The box infographic. |
| `09-product-nfc-coupon.md` | `coupon-nfc.html` | Old-vs-now topology diagrams. |
| `10-product-coupon-management.md` | `coupon-management.html` | Fork infographic, tier table. |

`coupon-campaign.html` (Coupon Marketing) is retired — merge into CMS or remove. `for-ai-commerce.html` is not covered here; AI Commerce is now a channel, and its page needs the Instant Checkout claim removed (retired March 2026) before anything else.

## How to read the files

| Marker | Meaning |
|---|---|
| `<!-- HERO -->`, `<!-- SECTION (plain / light band / dark band) -->`, `<!-- CLOSING CTA band -->`, `<!-- STRIP -->` | Section boundary and background treatment in the site's existing palette. |
| `# / ## / ### / ####` | h1 / h2 / h3 / h4. |
| `_Label: …_` | A small tag or pill above a heading. |
| `**[CTA: text]** → target` | A button. Target given when known; otherwise use the page's existing CTA destination. |
| `> **Pass preview** …` | The Pass stub component: issuer line, big value, terms line, perforation, serial code, stamp. |
| `Chips: a · b · c` | A row of small pills. |
| `**Variant — X (steps / controls / preview / note):**` | Content that swaps when the user selects mode X. All variants must be built; one shows at a time. |
| `- Control: … / - Slider: id (min, max, default, step) / - Toggle: …` | Interactive inputs. Ids match the mockup so the JS can be lifted directly. |
| `\| a \| b \|` two-column tables | Price rows / fact rows / readouts. |
| `**Infographic — …**` followed by `- Walls / - AI picks / - Meter / - Arrow / - Rules / _Panel_ / _Route_` | Structured description of a diagram. Rebuild in the site palette; the mockup HTML has a working reference. |
| `_[Diagram: …]_` | An inline SVG; the text is its accessible description. |

## Rules for every page

1. Keep header, nav, footer, `output.css`, `js/main.js`, `i18n/i18n.js`, analytics, hero background images.
2. Every visible string gets a `data-i18n` key under a new namespace per page (`home.v2.*`, `merchants.v2.*`, `buyers.v2.*`, `integrators.v2.*`, `pass.v2.*`, `vault.v2.*`, `aicoupon.v2.*`, `nfc.v2.*`, `cms.v2.*`). Merge the English into `i18n/en.json` and copy as placeholders into `zh-TW`, `zh-CN`, `ar` so nothing renders empty. Check how `i18n.js` treats a missing key before deploying.
3. Keep "coupon" in `<title>`, meta description and H1s for SEO even where the product is now called Pass or Vault.
4. Renames need 301 redirects from the old URLs.
5. Calculators, demo Pass, playbook download and booking are front-end only in the mockup. They confirm on screen and post nowhere. Wiring to a backend is a separate task.

## Placeholder numbers to replace before launch

1,240 merchants · 86,400 redemptions/month · 14 categories · 3 live markets · 99.9% uptime · 38 tap points · 6 partner sites · the integrator revenue share (undecided) · the forty-page playbook (unwritten).

## Reference

`../Mezzofy_Site_Mockup_v2.html` is the working mockup all ten files were generated from. Open it to see layout, interaction and the infographics rendered. Do **not** copy its fonts or palette — the site's own apply.
