# Contact Form Lambda — Deployment Guide

Handles POST requests from the Mezzofy contact form and sends email via AWS SES.

---

## Prerequisites

- AWS account with SES access
- `hello@mezzofy.com` (or `no-reply@mezzofy.com`) verified in SES
- If SES is in **sandbox mode**: both sender AND recipient must be verified.
  Request production access at: AWS Console → SES → Account Dashboard → Request production access

---

## Step 1 — Verify sender domain in SES

1. AWS Console → **Simple Email Service** → **Verified identities** → **Create identity**
2. Choose **Domain** → enter `mezzofy.com`
3. Add the DKIM DNS records SES provides to your domain registrar
4. Wait for verification (usually < 1 hour)

---

## Step 2 — Create the Lambda function

```bash
# Zip the function (Node 18+ runtime has @aws-sdk built-in — no npm install needed)
cd lambda/contact-form
zip -r contact-form.zip index.js
```

In AWS Console → **Lambda** → **Create function**:
- Name: `mezzofy-contact-form`
- Runtime: **Node.js 18.x** (or 20.x)
- Architecture: arm64 (cheaper)
- Click **Create function**

Upload `contact-form.zip` → **Deploy**

---

## Step 3 — Set environment variables

In Lambda → Configuration → Environment variables → Edit:

| Key | Value |
|-----|-------|
| `TO_EMAIL` | `hello@mezzofy.com` |
| `FROM_EMAIL` | `no-reply@mezzofy.com` |
| `ALLOWED_ORIGIN` | `https://mezzofy.com` |

---

## Step 4 — Grant Lambda permission to send via SES

In Lambda → Configuration → **Permissions** → click the execution role → **Add permissions** → **Attach policies**:

Add inline policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ses:SendEmail",
      "Resource": "*"
    }
  ]
}
```

---

## Step 5 — Create API Gateway endpoint

AWS Console → **API Gateway** → **Create API** → **HTTP API** → **Build**:

1. **Integrations** → Add → Lambda → select `mezzofy-contact-form`
2. **Routes**: `POST /contact`
   Also add `OPTIONS /contact` (same Lambda) for CORS preflight
3. **CORS**:
   - Allow origin: `https://mezzofy.com`
   - Allow methods: `POST, OPTIONS`
   - Allow headers: `Content-Type`
4. **Deploy** → Stage: `prod`
5. Copy the **Invoke URL** — looks like:
   `https://abc123xyz.execute-api.ap-east-1.amazonaws.com`

---

## Step 6 — Update contact.html

Open `dist/contact.html` and find:
```js
var API_ENDPOINT = 'YOUR_API_GATEWAY_URL/contact';
```
Replace `YOUR_API_GATEWAY_URL` with your invoke URL, e.g.:
```js
var API_ENDPOINT = 'https://abc123xyz.execute-api.ap-east-1.amazonaws.com/contact';
```

Redeploy `dist/` to S3 + CloudFront invalidation.

---

## Testing

```bash
curl -X POST https://YOUR_INVOKE_URL/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "General Inquiry",
    "message": "Hello from curl test"
  }'
# Expected: {"ok":true}
```

---

## Cost estimate

| Service | Volume | Monthly cost |
|---------|--------|-------------|
| Lambda  | 1,000 requests | ~$0.00 (free tier) |
| API Gateway HTTP API | 1,000 requests | ~$0.001 |
| SES | 1,000 emails | ~$0.10 |
| **Total** | 1,000 form submissions | **< $0.15 / month** |
