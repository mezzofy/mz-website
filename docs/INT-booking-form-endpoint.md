# INT — Booking Form Endpoint + 2-Form Portal (MZ-AI-ASSISTANT task)

**Owner:** MZ-AI-ASSISTANT (backend — run in that repo's own terminal)
**Requested by:** Frontend (mz-website homepage "Book an hour with us" form)
**Status:** TODO — endpoint + portal change not yet created
**Date:** 2026-10-14

> This plan is for the **mz-ai-assistant** project, which is a **separate repo**
> from mz-website. Hand it to the terminal running there. The website side is
> **already built and deployed-ready** (see "Front-end status" at the bottom);
> it just needs this endpoint + the portal to show two forms.

---

## Goal

The homepage booking form now POSTs to the AI Assistant exactly like the Contact
form does. The **Mission Control → Marketing → Forms** view must end up with
**two named forms** instead of one:

1. **Contact Form** — the existing `/contact` submissions (just re-labelled).
2. **Booking Form** — new submissions from the homepage "Book an hour" form.

```
mezzofy.com homepage
 ├─ Contact page form ──POST {…}──▶ /contact  ──▶ form_type="contact"  → "Contact Form"
 └─ "Book an hour" form ─POST {…}─▶ /booking  ──▶ form_type="booking"  → "Booking Form"   (THIS TASK)
                                     (NEW)        both land in the Forms view, categorised
```

This mirrors the existing contact flow (`mz-ai-assistant/server/app/api/contact.py`,
which sends to `hello@mezzofy.com` via MS Graph and records the submission shown
in the portal Forms list).

---

## Part A — New `/booking` endpoint (mirror `/contact`)

| | |
|---|---|
| **Method** | `POST` |
| **Path (prod)** | `https://assistant.mezzofy.com/booking` |
| **Path (local dev)** | `http://localhost:8000/booking` |
| **Request `Content-Type`** | `application/json` |
| **Request body** | see below |
| **Success response** | **`200`** with JSON **`{ "ok": true }`** |
| **Failure response** | non-2xx **or** `{ "ok": false, "error": "<msg>" }` |

> ⚠️ The front end checks **`res.ok && json.ok === true`**. You must return a JSON
> body with `ok: true` on success (a bare 200 with no/`ok:false` body is treated
> as an error by the form). This matches the existing `/contact` response shape.

### Request body (what the form sends)

```json
{
  "name":   "Jane Chan",
  "email":  "jane@acme.com",
  "date":   "2026-10-20",
  "slot":   "2:00–3:00",
  "form":   "booking",
  "_gotcha": "",
  "website": "",
  "_ts":     "1760000000000"
}
```

- `name`, `email` — required; validate server-side (email format).
- `date` — ISO `YYYY-MM-DD` from an `<input type="date">`.
- `slot` — human label of the chosen one-hour block (e.g. `9:00–10:00` …
  `4:00–5:00`; note the en-dash `–`). Mon–Fri, one-hour blocks.
- `form` — always `"booking"` (discriminator; use it to set `form_type`).
- **Anti-spam (reuse the exact logic from `/contact`):**
  - `_gotcha` and `website` are **honeypots** — if either is non-empty, silently
    accept (`200 {ok:true}`) but **drop** (do not email / do not store), same as contact.
  - `_ts` is the page-load epoch-ms. Reject (or drop) if the age
    `now - _ts` is **< 3s or > 3600s** (instant bots / stale replays), same as contact.

### Email to send on a valid booking

- **From:** `hello@mezzofy.com` (reuse the MS Graph / M365 sender the contact
  endpoint uses).
- **To:** whoever currently receives contact enquiries (e.g. `hello@mezzofy.com`
  / sales). Consider a distinct subject so booking requests are triageable:
- **Subject:** `New booking request — <name>`
- **Body (suggested):**

```
A booking request came in from the Mezzofy website:

  Name:  {name}
  Email: {email}
  Date:  {date}
  Slot:  {slot}

Reply to confirm and send the calendar invite.
```

Keep the response fast; send async if needed but only return `{ok:true}` once the
send (and the Forms record write) is accepted.

---

## Part B — Portal: make it two named forms

Today the Forms view lists all submissions under one "Forms" bucket (Source =
"Website"). Add a **form type** so the two are distinguishable:

1. **Persist a `form_type`** (or `form_name`) on each submission record:
   - existing `/contact` handler → `form_type = "contact"` (label **"Contact Form"**)
   - new `/booking` handler → `form_type = "booking"` (label **"Booking Form"**)
   - Backfill existing rows to `"contact"` (they are all contact submissions).
2. **Portal Forms view** (`Mission Control → Marketing → Forms`):
   - Rename the current single form to **"Contact Form"**.
   - Add **"Booking Form"** as a second form/category.
   - Let the existing **All / New / Read** filters work per form, and show the
     form name (and the booking fields: date + slot) in the row/detail.
   - If the Forms list is config/registry-driven, register the two forms there;
     if it derives purely from stored rows, group/label by `form_type`.

> Design choice: a **dedicated `/booking` route** is recommended (clean mirror of
> `/contact`, independent CORS/rate-limit, easy to reason about). If you'd rather
> keep **one** endpoint, you can instead route on the body's `form` field inside
> the contact handler — but then tell Frontend to point the form at `/contact`
> (one-line change). Either way the portal still needs the `form_type` split above.

---

## Security / CORS (same as `/contact`)

- **CORS:** allow `https://www.mezzofy.com` and `https://mezzofy.com`
  (`https://mezzofy.github.io` too if used; `http://127.0.0.1:8080` only while
  testing). Handle the `OPTIONS` preflight (JSON body triggers it).
- **Rate limit:** per-IP and per-email (e.g. a few booking requests per address
  per hour) to stop abuse of the `hello@mezzofy.com` domain reputation.
- Honeypot + `_ts` age check above.
- No secrets in the page — the endpoint is origin-restricted + public, same as
  `/contact`.

---

## Acceptance criteria

- `POST https://assistant.mezzofy.com/booking` with the body above, from the
  `https://mezzofy.com` origin, returns **`200 {"ok": true}`**; the recipient gets
  the booking email from `hello@mezzofy.com`; and a row appears in the portal
  under **Booking Form**.
- CORS preflight (`OPTIONS`) succeeds from the mezzofy.com origin.
- Honeypot-filled or too-fast/stale (`_ts`) submissions are dropped (no email,
  no row), while the form still sees a success-shaped response for honeypots
  (to not tip off bots) — mirror whatever `/contact` does.
- The Forms view shows **two** forms: existing submissions under **Contact Form**,
  new ones under **Booking Form**.

---

## Deliver back to Frontend

The website is already pointed at `https://assistant.mezzofy.com/booking`. Once
live, just confirm to Frontend:

1. Endpoint URL is live and CORS-enabled for the mezzofy.com origins.
2. Success body is `{"ok": true}` (so the form shows its success state).
3. (If you chose the single-endpoint option) the path to use instead — Frontend
   flips `BOOKING_ENDPOINT` in `dist/index.html` (one line).

---

## Front-end status (already done, waiting on this)

- `dist/index.html` "Book an hour with us" form rebuilt to match the Contact form:
  Name + Email (required), Date, one-hour Slot picker, inline validation, honeypot
  + `_ts` anti-spam, loading state, and inline **success/error** blocks.
- Submit handler: `POST BOOKING_ENDPOINT` (= `https://assistant.mezzofy.com/booking`)
  with the JSON body above; treats `res.ok && json.ok` as success.
- i18n in 4 languages (en / zh-TW / zh-CN / ar) for all new strings.
- Until this endpoint exists, a real submit shows the **error** state (expected).
- Reference implementation on the website side: the Contact form in
  `dist/contact.html` (endpoint `https://assistant.mezzofy.com/contact`).
