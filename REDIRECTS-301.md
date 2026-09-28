# Server-Side 301 Redirects — Required (Infra)

**Status:** ⏳ Pending Infra implementation
**Owner:** Infra Agent (CloudFront / S3)
**Raised by:** Frontend Agent — 2026-09-28
**Reason:** Several pages were renamed for positioning/SEO. Each old path currently
ships a **client-side redirect stub** (`<meta http-equiv="refresh">` + JS
`location.replace`). These work for browsers but are **not** a true 301 — search
engines pass link equity slowly and imperfectly through them. Real **HTTP 301**
responses at the edge are needed to consolidate SEO and drop the interim stubs.

---

## Redirect map

| # | Old path (301 FROM) | New path (301 TO) | Interim stub in repo? | Notes |
|---|---------------------|-------------------|:---------------------:|-------|
| 1 | `/coupon-serial.html` | `/coupon-pass.html` | ✅ yes | Renamed earlier ("Pass" rebrand). |
| 2 | `/for-distributors.html` | `/for-buyers.html` | ✅ yes | Renamed 2026-09-28. |
| 3 | `/for-developers.html` | `/for-integrators.html` | ✅ yes | Renamed 2026-09-28. |
| 4 | `/coupon-wallet.html` | `/vault.html` | ✅ yes | Renamed 2026-09-28. |
| 5 | `/coupon-campaign.html` | `/coupon-management.html` | ❌ no (noindex) | **Optional.** Campaign page was hidden (noindex, dropped from nav/sitemap). A 301 is optional; if not redirected it 404s once the file is removed. Confirm intent before adding. |

All redirects are **permanent (301)**, host `mezzofy.com` (+ `www` if served).

---

## Implementation options (pick per current deploy stack)

**A. CloudFront Function (viewer-request)** — preferred, no origin round-trip:

```js
function handler(event) {
  var map = {
    '/coupon-serial.html': '/coupon-pass.html',
    '/for-distributors.html': '/for-buyers.html',
    '/for-developers.html': '/for-integrators.html',
    '/coupon-wallet.html': '/vault.html'
    // '/coupon-campaign.html': '/coupon-management.html'  // enable only if confirmed
  };
  var uri = event.request.uri;
  if (map[uri]) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { 'location': { value: map[uri] } }
    };
  }
  return event.request;
}
```

**B. S3 static-website routing rules** (if serving straight from the S3 website
endpoint) — add one `RoutingRule` per pair with
`Condition.KeyPrefixEquals` = old key and `Redirect.ReplaceKeyWith` = new key,
`HttpRedirectCode` = `301`.

---

## After Infra ships the 301s

Frontend can then **delete the interim stub files** (`coupon-serial.html`,
`for-distributors.html`, `for-developers.html`, `coupon-wallet.html`) so the edge
301 is the only redirect. Do **not** delete them before the 301s are live, or the
old URLs will hard-404.

## Verify

```bash
for u in coupon-serial for-distributors for-developers coupon-wallet; do
  curl -sI "https://mezzofy.com/$u.html" | grep -iE "HTTP/|location"
done
# expect: HTTP/2 301  +  location: /<new>.html
```
