# For Merchants

**Updates:** `for-merchants.html`  
**Scope:** page body only. Keep the site header, navigation, footer, fonts, colours, hero background images and i18n mechanism exactly as they are. Every visible string below needs a `data-i18n` key.

---

<!-- HERO -->
_Label: Free to list, no subscription_

# Customers who were never coming in anyway.

Put your offers where 86,400 monthly redemptions already happen. You decide how far you will go on price. We handle everything between creating the offer and the moment someone hands it over at your counter.

**[CTA: Start selling free]**

**[CTA: See merchant pricing]**

> **Pass preview**  
> Issuer: Your business  
> Value: $5 off  
> Terms: Minimum spend $30. Valid 30 days.  
> Code: Created by AI Coupon · Stamp: FREE

<!-- SECTION (dark band) -->

## Who your offers reach

This is the demand you are listing into. It is the only number that matters before you decide how to price.

| Number | Label |
|---|---|
| 86,400 | Redemptions monthly |
| 4 | Channels, one listing |
| 3 | Live markets |
| $0 | To list |

Chips: B2C marketplace · Enterprise buyer apps · NFC tap points · AI shopping assistants

<!-- SECTION (plain) -->

## Three ways to sell, priced by what the offer is for

Pick one, or run all three side by side. Each keeps its own inventory. Choose one to see how it works and what it would produce.

_Label: Easiest start_

### Zero Fee Passes, created by AI

You set the limits. Our AI creates discount offers inside them and places them across the exchange. You honour them at the counter.

| | |
|---|---|
| You pay | Nothing |
| You collect | Nothing |
| Bank account | Not needed |

_Label: Sell value_

### Charge Passes

You set the voucher value and the discount. We sell it on the marketplace and to enterprise buyers, and pay you when it is redeemed.

| | |
|---|---|
| Mezzofy fee | 10% |
| You receive | 90% on redemption |
| If it expires unused | Split 50/50 |

_Label: Your own list_

### Own channel

Issue to customers you already have — email, messaging, your own app. Nothing goes on the exchange.

| | |
|---|---|
| Allocation | from $0.013 |
| Distribution | from $0.013 |
| Redemption | from $0.064 |

<!-- SECTION (light band) -->

## Set your limits once. The network does the rest.

Most platforms ask you to build a campaign and pay to run it. Zero Fee works the other way around.

**Variant — Zero Fee Passes (steps):**

#### You set the box

Discount range, minimum spend, monthly quota, daily cap, and whether offers are limited to off-peak hours. These are hard ceilings the AI cannot pass.

#### AI Coupon creates the offers

It chooses the depth, the timing and the volume inside your limits, and issues each one as a tokenised Pass.

#### The network delivers them

Marketplace, NFC tap points in malls and offices, enterprise buyer apps, and AI shopping assistants. Nothing for you to build.

#### You redeem at the counter

Your staff validate in the Operator App, or through your POS if you have integrated. The Pass is spent and cannot be used again.

**Variant — Charge Passes (steps):**

#### You set the value and the discount

Choose the face value of the voucher, how much the customer saves, how long it stays valid, and how many you will release each month.

#### We list and sell it

Your voucher goes to the B2C marketplace and into the B2B pool where banks, telcos and benefits platforms draw from it. We handle payment and support.

#### The customer pays and receives the Pass

It lands in their Vault, tokenised and single-use. Mezzofy keeps 10%, which covers card processing, the platform and any partner who distributed it.

#### You redeem, and we pay you

You receive 90% of face value once the Pass is redeemed. If it is sold but expires unused, the remaining value is split evenly between you and Mezzofy.

**Variant — Own channel (steps):**

#### You create the Pass

Build it yourself in the portal — value, terms, artwork, validity. Allocation is charged per Pass created, whether or not you send it.

#### You choose who gets it

Upload your own list or pick a segment. Nothing is listed on the exchange and no other buyer can see it.

#### You send it

Email, SMS, WhatsApp, QR export or your own app through the API. Distribution is charged per Pass sent. Messaging fees are passed through at cost.

#### You redeem at the counter

Same Operator App and POS integration as every other Pass. Redemption is charged per Pass validated, and billed monthly to your card.

**Variant — Zero Fee Passes (note):**

**What you give up is margin on that sale. Nothing else.** No creation fee, no distribution fee, no redemption fee, no bank details. The customer pays a small fee for the guarantee that the offer is real, and that is what funds the exchange.

**Variant — Charge Passes (note):**

**You are paid on redemption, not on sale.** Money reaches you when the customer actually walks in. A bank account and full verification are required, because Mezzofy is paying you.

**Variant — Own channel (note):**

**This is the one place you pay Mezzofy directly.** Own channel is metered software for your own distribution, so allocation and distribution are charged whether or not anything is redeemed. Rates fall as your annual volume rises.

<!-- SECTION (plain) -->

## Set the box, and see what comes out

These are the limits from step one. Move them and watch what AI Coupon would be allowed to create for your business.

**Variant — Zero Fee Passes (controls):**

Segmented control: Percent off | Amount off

- Control: Lowest discount (shown value: 10%)
- Slider: r-lo (min 10, max 50, default 10, step 5)
- Control: Highest discount (shown value: 30%)
- Slider: r-hi (min 10, max 50, default 30, step 5)
- Control: Minimum spend to qualify (shown value: $0)
- Slider: r-min (min 0, max 200, default 0, step 5)
- Control: Valid for (shown value: 30 days)
- Slider: r-exp (min 7, max 180, default 30, step 7)
- Control: Monthly quota (shown value: 500)
- Slider: r-quota (min 50, max 5000, default 500, step 50)
- Control: Daily cap (shown value: 25)
- Slider: r-cap (min 5, max 300, default 25, step 5)
- Toggle: Off-peak only, Monday to Thursday 2–5pm (default false)

**Variant — Charge Passes (controls):**

- Control: Voucher face value (shown value: $50)
- Slider: c-face (min 5, max 500, default 50, step 5)
- Control: Customer saves (shown value: 20%)
- Slider: c-disc (min 0, max 50, default 20, step 5)
- Control: Valid for (shown value: 6 months)
- Slider: c-exp (min 1, max 24, default 6, step 1)
- Control: Released each month (shown value: 300)
- Slider: c-qty (min 10, max 3000, default 300, step 10)
- Toggle: Offer to enterprise buyers as well as the marketplace (default true)

_On one voucher_
| | |
|---|---|
| Customer pays | $40.00 |
| Mezzofy fee, 10% of face | $5.00 |
| You receive on redemption | $45.00 |
| If sold but never redeemed | $22.50 to you |

**Variant — Own channel (controls):**

- Control: Passes created each month (shown value: 800)
- Slider: o-made (min 50, max 20000, default 800, step 50)
- Control: Share you actually send (shown value: 80%)
- Slider: o-sent (min 0, max 100, default 80, step 5)
- Control: Share redeemed (shown value: 40%)
- Slider: o-red (min 0, max 100, default 40, step 5)
- Control: Pass value on the face (shown value: $20)
- Slider: o-face (min 5, max 200, default 20, step 5)

_Your monthly bill Tier 1_
| | |
|---|---|
| Allocation, 800 created | $20.80 |
| Distribution, 640 sent | $16.64 |
| Redemption, 256 validated | $65.54 |
| Total, billed to your card | $102.98 |

One of the offers your limits would allow

**Variant — Zero Fee Passes (preview):**

> **Pass preview**  
> Issuer: Your business  
> Value: 20% off  
> Terms: No minimum spend. Valid 30 days.  
> Code: MZF-4B7X-2019 · Stamp: FREE

**Variant — Charge Passes (preview):**

> **Pass preview**  
> Issuer: Your business  
> Value: $50 voucher  
> Terms: Bought for $40. Valid 6 months.  
> Code: MZF-9T2M-5540 · Stamp: SOLD

**Variant — Own channel (preview):**

> **Pass preview**  
> Issuer: Your business, your list  
> Value: $20 off  
> Terms: Sent to your customers. Not listed on the exchange.  
> Code: MZF-6H1D-7702 · Stamp: PRIVATE

**[Action: Show another the AI could create]**

<!-- SECTION (plain) -->

## Whichever way you sell, it runs through one system

The Coupon Management System is the heart of it. Every Pass you issue, from any of the three routes, is created, tracked, redeemed and reconciled in the same place. You learn one dashboard.

**Infographic — CMS hub — three routes in, one system, three capabilities out**

- **Zero Fee Passes** — created by AI Coupon
- **Charge Passes** — sold on the exchange
- **Own channel** — sent to your list

**Core: Coupon Management System** (THE HEART OF IT) — One inventory per route, one view of all of them. Limits, quotas, outlets and staff live here.

- **Redeem** — Operator App or your POS
- **Track** — every Pass, live
- **Reconcile** — per Pass, per outlet, per route
CMS is included with every account. You only pay for it when you use it for your own distribution. [See the Coupon Management System](coupon-management.html)

<!-- SECTION (light band) -->

## Before you go live

Two things to set up. Both take a few minutes.

### Register your outlets

Add every location where your Passes can be redeemed. A Pass presented at an unregistered outlet will not validate. Enable and disable outlets individually at any time.

### Choose how you redeem

Free Operator App on iOS and Android — staff scan or key in the code. Or validate through your existing POS using our API, so nobody learns anything new.

> Run a test redemption at each outlet before going live. A customer turned away with a valid Pass is the worst outcome for both of us. They paid for the guarantee that it would work.

<!-- SECTION (plain) -->

## Questions merchants ask

**Q: Can the AI discount more than I can afford?**  
A: No. It cannot exceed the discount ceiling, the monthly quota or the daily cap you set. Those are enforced by the system, not guidelines.

**Q: What if I want to stop?**  
A: Pause from your dashboard and creation stops immediately. Passes already issued stay valid until they expire, because a customer has already paid for the guarantee that they work.

**Q: Do I need a bank account?**  
A: Only if you sell Charge Passes, where we pay you. Zero Fee and own channel need no bank details.

**Q: Can I see what was created?**  
A: Every Pass, its limits, its status and its redemption history are in your dashboard in real time.

**Q: What if a Pass will not validate at my counter?**  
A: Check the outlet is registered and the Pass is inside its validity window. If it still fails, the customer is credited automatically and you are not charged. Nobody argues at the till.

**Q: How quickly am I paid on Charge Passes?**  
A: Redemptions settle on a fixed cycle to your registered bank account, with a statement per Pass. The cycle is stated in your agreement.

<!-- CLOSING CTA band -->

## List today. Nothing to pay, nothing to build.

Set your limits in a few minutes and your first Pass can be live this afternoon.

**[CTA: See merchant pricing]**

**[CTA: Start selling free]**

