# INT — Demo-Pass Email Endpoint (Backend/Infra task)

**Owner:** Backend / Infra
**Requested by:** Frontend (mz-website "Try one for yourself" demo-Pass form)
**Status:** TODO — endpoint not yet created
**Date:** 2026-10-11

---

## Why

The marketing site (`www.mezzofy.com`) has a **"Send me a Pass"** form on the
homepage ("Try one for yourself"). A visitor enters their email and should
receive a **demo-Pass email from `hello@mezzofy.com`** containing a CTA button
to a sample Pass page.

A static site cannot send email and **cannot call the AI-Assistant MCP email
tool** (`send_email_otp`) — that tool is only reachable by Claude over MCP, not
by browser JavaScript. To use Mezzofy's own email engine (the same SES identity
behind the OTP sender), the backend must expose **one small HTTP endpoint** the
website can `POST` to. The front end is already built and endpoint-agnostic; it
just needs the URL.

```
Browser form ──POST {email}──▶  https://<mezzofy-backend>/public/demo-pass  ──▶ SES
 (mezzofy.com)                   (THIS TASK)                                   from hello@mezzofy.com
```

---

## Endpoint contract (what the front end expects)

| | |
|---|---|
| **Method** | `POST` |
| **Path** | your choice, e.g. `/public/demo-pass` (give Frontend the full URL) |
| **Request `Content-Type`** | `application/json` |
| **Request body** | `{ "email": "<recipient>" }` |
| **Success** | any **2xx** status (body ignored by the form) |
| **Failure** | any non-2xx (the form shows an error state) |

The front end treats **2xx = sent**, non-2xx / network error = failure. Keep the
response fast (< a few seconds); send the email async if needed but still return
2xx only once the send is accepted by SES.

If you require an API key/header instead of a fully public endpoint, tell
Frontend the header name + value — the form config supports custom headers.
(Prefer **not** embedding a secret in the page; see Security below.)

---

## Email content to send

- **From:** `hello@mezzofy.com` (reuse the existing verified SES identity)
- **Subject:** `Your Mezzofy demo Pass`
- **Body (HTML):** a short "this is a demo Pass" message + a CTA button linking
  to the sample Pass page. Suggested:

```html
<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#1a1a1a;">
  <p style="font-size:16px;line-height:1.6;">This is a <strong>demo Pass</strong> from Mezzofy — a live sample of
     what your customers receive. Open it to see the code, the terms, and the moment it is consumed.</p>
  <p style="text-align:center;margin:28px 0;">
    <a href="https://mezzofy.com/pass-demo.html"
       style="background:#FF6B35;color:#fff;text-decoration:none;font-weight:700;font-size:16px;
              padding:14px 28px;border-radius:10px;display:inline-block;">View your demo Pass</a>
  </p>
  <p style="font-size:13px;color:#8a8278;">One demo Pass per address, valid 7 days. — The Mezzofy team · hello@mezzofy.com</p>
</div>
```

> The CTA points to `https://mezzofy.com/pass-demo.html` (a standalone static
> page already in the repo at `dist/pass-demo.html`, pending the S3 publish).
> Adjust the URL if the Pass page is hosted elsewhere.

---

## Security / abuse (required for a browser-callable endpoint)

- **CORS:** `Access-Control-Allow-Origin` for `https://www.mezzofy.com` and
  `https://mezzofy.com` (add `http://127.0.0.1:8080` only while testing).
  Handle the `OPTIONS` preflight (JSON body triggers it).
- **Rate limit:** per-IP and per-recipient (e.g. 1 demo Pass per address per
  day — matches the on-page copy "One demo Pass per address"). Prevents using
  the form to spam arbitrary inboxes from the mezzofy.com domain (reputation).
- **Validation:** validate the email format server-side; reject obvious abuse.
- **Optional:** CAPTCHA / hCaptcha token, or a lightweight signed nonce, if you
  want stronger protection than rate-limiting.
- **No secrets in the page.** If auth is needed, prefer an origin-restricted
  public endpoint over an API key embedded in client JS. If a key is
  unavoidable, use a low-privilege key scoped to this one action.

---

## Suggested implementation

Reuse whatever `send_email_otp` already uses (SES + the `hello@mezzofy.com`
identity). A minimal path:

- A small handler (Lambda Function URL / API Gateway route, or a route on an
  existing service) that: validates `email` → rate-limits → calls SES
  `SendEmail` (or a templated send) with the body above → returns `200`.
- If you already have a transactional-email/notification service, add a
  `demo-pass` template/route to it rather than new infra.

---

## Deliver back to Frontend

Give Frontend these and the form goes live (one-line config change —
`DEMO_PASS.endpoint.url` in `dist/index.html`):

1. **Full endpoint URL**
2. **Request body shape** (confirm `{ "email": "..." }`, or state the field name)
3. **Any required header/token** (name + value), or confirm "public + CORS"
4. **Confirm CORS** is set for the mezzofy.com origins

---

## Acceptance criteria

- `POST {"email":"you@example.com"}` from `https://mezzofy.com` → `2xx`, and the
  recipient receives the demo-Pass email from `hello@mezzofy.com` with a working
  "View your demo Pass" button.
- CORS preflight (`OPTIONS`) succeeds from the mezzofy.com origin.
- A second request for the same address within the rate-limit window is rejected.
- No credentials are exposed in the page source.

---

## Front-end status (already done, waiting on this)

- Form + states built (`#demo-pass-form`, sending/confirm/error), i18n in 4 langs.
- Sender is **endpoint-agnostic**: set `DEMO_PASS.endpoint.url` to this endpoint
  and it POSTs `{email}` and treats 2xx as success. Until then it only shows the
  confirmation (no send).
- Sample Pass page: `dist/pass-demo.html` (the email's CTA target).
