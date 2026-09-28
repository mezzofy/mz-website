# Product — Pass

**Updates:** `coupon-serial.html  →  rename to pass.html`  
**Scope:** page body only. Keep the site header, navigation, footer, fonts, colours, hero background images and i18n mechanism exactly as they are. Every visible string below needs a `data-i18n` key.

---

<!-- HERO -->

# One primitive. Seven presentations.

A Pass is a tokenised entitlement with a unique code, issued once, held by one person, and consumed on validation. Whether it looks like a coupon, a ticket or a reward, the standard underneath is the same.

**[CTA: Read the standard]**

**[CTA: API reference]**

> **Pass preview**  
> Issuer: Any issuer  
> Value: Pass  
> Terms: Unique. Single-use. Cannot be copied.  
> Code: MZF-XXXX-XXXX · Stamp: CONSUMED

<!-- SECTION (plain) -->

## The Mezzofy Pass Standard

Three properties, enforced by the system rather than promised in terms.

#### Unique

Every Pass carries its own serial, minted at issuance and traceable through its whole life. No two are alike, so a duplicate does not exist to be presented.

#### Single-use

Validation consumes the Pass. It cannot be presented twice, screenshotted and reused, or forwarded after redemption. The exception is Card, which draws down instead.

#### Fraud-proof

A Pass that was not issued by the exchange will not validate. Scraped codes, generated codes and expired offers are rejected at the counter, not discovered afterwards.

<!-- SECTION (light band) -->

## Lifecycle

Flow:
- **Issued** — By merchant, AI Coupon, or a loyalty programme
- **Held** — In a Vault, bound to one person
- **Presented** — At a registered outlet
- **Validated** — Once. Then spent.
- **Settled** — Merchant paid, records reconciled

<!-- SECTION (plain) -->

## Seven presentations, and where each can go

Pick one to see it, how it is spent, whether it transfers, and where it can go. Transferability is a property of the Pass, not an assumption about the type.

Chips: Presented as · Coupon · Voucher · Deal · Ticket · Reward · Card · Token

### Coupon

A discount off the bill. The commonest Pass on the exchange, and the one AI Coupon creates for merchants who list free.

| | |
|---|---|
| How it is spent | Consumed once |
| Can it be transferred | No |
| Created by | Merchant or AI Coupon |
| Where it can go | All channels |

> **Pass preview**  
> Issuer: Kopi Lane, Bugis  
> Value: 25% off  
> Terms: Minimum spend $30. Valid 30 days.  
> Code: MZF-7K4Q-8813 · Stamp: CONSUMED

<!-- SECTION (light band) -->

## What a Pass looks like to a developer

The same object whether it came from the marketplace, an enterprise draw, or a tap point.

```json
// GET /v1/passes/MZF-7K4Q-8813
{
  "id":          "MZF-7K4Q-8813",
  "type":        "coupon",
  "issuer":      "mrc_kopilane_bugis",
  "value":       { "kind": "percent", "amount": 25 },
  "conditions":  { "min_spend": 30, "window": "weekday_14_17" },
  "valid_until": "2026-10-10T23:59:59+08:00",
  "spend_mode":  "consume",
  "transferable": false,
  "status":      "held",
  "holder":      "vlt_9a2f…"
}
```

**[CTA: API reference]**

**[CTA: Partner with us]** → for-developers.html (→ for-integrators.html)

