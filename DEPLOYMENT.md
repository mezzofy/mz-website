# AWS S3 Deployment Guide

**Project:** Mezzofy Website (mz-website)
**Type:** Static website deployment to AWS S3 + CloudFront
**Last Updated:** 2026-02-15

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Deployment](#quick-deployment)
3. [S3 Bucket Configuration](#s3-bucket-configuration)
4. [Custom Domain Setup](#custom-domain-setup)
5. [Cache Invalidation](#cache-invalidation-cloudfront)
6. [Deployment Scripts](#deployment-scripts)
7. [Continuous Deployment](#continuous-deployment-with-github-actions)
8. [Deployment Checklist](#deployment-checklist)
9. [Post-Deployment Verification](#post-deployment-verification)
10. [Cost Estimation](#cost-estimation)
11. [Performance Optimization](#performance-optimization)
12. [Security Best Practices](#security-best-practices)
13. [Troubleshooting](#troubleshooting)
14. [Monitoring & Analytics](#monitoring--analytics)
15. [Backup & Disaster Recovery](#backup--disaster-recovery)
16. [Additional Resources](#additional-resources)

---

## Overview

The Mezzofy website is designed as a static site for hosting on AWS S3 with static website hosting enabled. The `dist/` directory contains all production-ready files.

**Deployment Architecture:**
- **Storage:** AWS S3 bucket with static website hosting
- **CDN:** AWS CloudFront (recommended for HTTPS/SSL)
- **DNS:** AWS Route 53 (for custom domain)
- **SSL/TLS:** AWS Certificate Manager (ACM)
- **CI/CD:** GitHub Actions (optional)

---

## Prerequisites

- AWS Account with S3 access
- AWS CLI installed and configured (`aws configure`)
- Domain (optional, for custom domain setup)
- IAM user with S3 permissions (or use IAM roles)

---

## Quick Deployment

```bash
# 1. Build production files
npm run build

# 2. Create S3 bucket
aws s3 mb s3://mezzofy-website --region us-east-1

# 3. Enable static website hosting
aws s3 website s3://mezzofy-website --index-document index.html --error-document 404.html

# 4. Upload files
aws s3 sync dist/ s3://mezzofy-website --delete

# 5. Make bucket public
aws s3api put-bucket-policy --bucket mezzofy-website --policy file://bucket-policy.json

# 6. Get website URL
echo "Website URL: http://mezzofy-website.s3-website-us-east-1.amazonaws.com"
```

---

## S3 Bucket Configuration

### Step 1: Create S3 Bucket

```bash
# Create bucket (replace region as needed)
aws s3 mb s3://mezzofy-website --region us-east-1

# Or with specific region
aws s3 mb s3://mezzofy-website --region ap-southeast-1
```

**Bucket naming rules:**
- Must be globally unique
- 3-63 characters
- Lowercase letters, numbers, hyphens only
- For custom domain, name must match domain (e.g., `www.mezzofy.com`)

### Step 2: Enable Static Website Hosting

```bash
aws s3 website s3://mezzofy-website \
  --index-document index.html \
  --error-document 404.html
```

**Note:** Using `index.html` as error document enables client-side routing fallback.

### Step 3: Configure Bucket Policy

Create `bucket-policy.json` in project root:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mezzofy-website/*"
    }
  ]
}
```

Apply policy:

```bash
aws s3api put-bucket-policy --bucket mezzofy-website --policy file://bucket-policy.json
```

**Security Note:** This makes the bucket contents publicly readable. For production with CloudFront, use Origin Access Identity instead.

### Step 4: Upload Files

```bash
# Initial full upload
aws s3 sync dist/ s3://mezzofy-website --delete

# With cache control headers
aws s3 sync dist/ s3://mezzofy-website --delete \
  --cache-control "max-age=3600,public" \
  --exclude "*.html" \
  --exclude "*.xml"

# Upload HTML with shorter cache
aws s3 sync dist/ s3://mezzofy-website \
  --exclude "*" --include "*.html" \
  --cache-control "max-age=300,public" \
  --content-type "text/html; charset=utf-8"
```

### Step 5: Set Correct Content Types

```bash
# Fix HTML content type
aws s3 cp s3://mezzofy-website s3://mezzofy-website --recursive \
  --exclude "*" --include "*.html" \
  --content-type "text/html; charset=utf-8" \
  --metadata-directive REPLACE

# Fix CSS content type
aws s3 cp s3://mezzofy-website s3://mezzofy-website --recursive \
  --exclude "*" --include "*.css" \
  --content-type "text/css; charset=utf-8" \
  --metadata-directive REPLACE

# Fix JavaScript content type
aws s3 cp s3://mezzofy-website s3://mezzofy-website --recursive \
  --exclude "*" --include "*.js" \
  --content-type "application/javascript; charset=utf-8" \
  --metadata-directive REPLACE
```

### Step 6: Verify Deployment

```bash
# Get website endpoint
aws s3api get-bucket-website --bucket mezzofy-website

# Test website
curl -I http://mezzofy-website.s3-website-us-east-1.amazonaws.com/

# List all uploaded files
aws s3 ls s3://mezzofy-website --recursive --human-readable
```

---

## Update Deployment (After Changes)

```bash
# Quick update workflow
npm run build && aws s3 sync dist/ s3://mezzofy-website --delete

# With cache busting
npm run build && aws s3 sync dist/ s3://mezzofy-website --delete --cache-control "max-age=3600"
```

---

## Custom Domain Setup

### Option A: CloudFront + Route 53 (Recommended)

**Why CloudFront?**
- HTTPS/SSL support
- Global CDN (faster load times)
- Custom error pages
- Gzip/Brotli compression
- DDoS protection

**Steps:**

#### 1. Request SSL Certificate (ACM)
```bash
# MUST be in us-east-1 for CloudFront
aws acm request-certificate \
  --domain-name mezzofy.com \
  --subject-alternative-names www.mezzofy.com \
  --validation-method DNS \
  --region us-east-1
```

#### 2. Validate Certificate
- Go to ACM console → pending certificate
- Copy CNAME records
- Add CNAME records to Route 53 (or your DNS provider)
- Wait for validation (can take 5-30 minutes)

#### 3. Create CloudFront Distribution

Create `cloudfront-config.json`:
```json
{
  "CallerReference": "mezzofy-website-2026",
  "Comment": "Mezzofy Website CloudFront Distribution",
  "Enabled": true,
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-mezzofy-website",
        "DomainName": "mezzofy-website.s3-website-us-east-1.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "http-only"
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-mezzofy-website",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"]
    },
    "Compress": true,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {"Forward": "none"}
    }
  },
  "Aliases": {
    "Quantity": 2,
    "Items": ["mezzofy.com", "www.mezzofy.com"]
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT_ID",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  }
}
```

**Or use AWS Console:**
- Services → CloudFront → Create Distribution
- **Origin Domain:** `mezzofy-website.s3-website-us-east-1.amazonaws.com` (use S3 website endpoint, NOT bucket)
- **Origin Protocol:** HTTP only
- **Viewer Protocol Policy:** Redirect HTTP to HTTPS
- **Compress Objects:** Yes
- **Alternate Domain Names (CNAMEs):** `mezzofy.com`, `www.mezzofy.com`
- **SSL Certificate:** Custom SSL (select ACM certificate)
- **Default Root Object:** `index.html`

#### 4. Configure Route 53
```bash
# Create hosted zone (if not exists)
aws route53 create-hosted-zone --name mezzofy.com --caller-reference $(date +%s)

# Get CloudFront distribution domain
aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='Mezzofy Website CloudFront Distribution'].DomainName"

# Create A record (Alias) pointing to CloudFront
# Use Route 53 console or CLI to create:
# - Type: A (Alias)
# - Name: mezzofy.com
# - Alias Target: CloudFront distribution
# - Routing Policy: Simple

# Repeat for www.mezzofy.com
```

#### 5. Update Nameservers (if domain registered elsewhere)
- Get Route 53 nameservers
- Update domain registrar to use Route 53 nameservers

### Option B: S3 Website Endpoint + Route 53 (HTTP Only)

**Warning:** No HTTPS support. Not recommended for production.

```bash
# 1. Create bucket with exact domain name
aws s3 mb s3://www.mezzofy.com --region us-east-1

# 2. Enable website hosting
aws s3 website s3://www.mezzofy.com --index-document index.html

# 3. Upload files
aws s3 sync dist/ s3://www.mezzofy.com --delete

# 4. Create Route 53 A record (Alias to S3 website endpoint)
# Use Route 53 console to create A record pointing to S3 endpoint
```

---

## Cache Invalidation (CloudFront)

After deploying updates with CloudFront:

```bash
# Invalidate all files
aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC \
  --paths "/*"

# Invalidate specific paths
aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC \
  --paths "/index.html" "/about.html" "/css/*"

# Get distribution ID
aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='Mezzofy Website CloudFront Distribution'].Id" --output text
```

**Invalidation costs:** First 1,000 paths/month free, $0.005 per path after.

**Tip:** Use versioned filenames (e.g., `output.v2.css`) to avoid invalidation costs.

---

## Deployment Scripts

Create `scripts/deploy.sh`:

```bash
#!/bin/bash
set -e

BUCKET="mezzofy-website"
DISTRIBUTION_ID="E1234567890ABC"  # Replace with your CloudFront ID

echo "🔨 Building..."
npm run build

echo "📤 Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET --delete \
  --cache-control "max-age=31536000,public" \
  --exclude "*.html" \
  --exclude "sitemap.xml"

echo "📄 Uploading HTML files..."
aws s3 sync dist/ s3://$BUCKET \
  --exclude "*" --include "*.html" \
  --cache-control "max-age=300,public" \
  --content-type "text/html; charset=utf-8"

echo "🗺️ Uploading sitemap..."
aws s3 cp dist/sitemap.xml s3://$BUCKET/sitemap.xml \
  --cache-control "max-age=3600,public" \
  --content-type "application/xml"

echo "♻️ Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*" \
  --output text

echo "✅ Deployment complete!"
echo "🌐 Website: https://www.mezzofy.com"
```

Make executable:
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

---

## Continuous Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://mezzofy-website --delete \
            --cache-control "max-age=31536000,public" \
            --exclude "*.html"

          aws s3 sync dist/ s3://mezzofy-website \
            --exclude "*" --include "*.html" \
            --cache-control "max-age=300,public" \
            --content-type "text/html; charset=utf-8"

      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"

      - name: Deployment complete
        run: echo "🚀 Deployed to https://www.mezzofy.com"
```

**Setup GitHub Secrets:**
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `CLOUDFRONT_DISTRIBUTION_ID` (optional, if using CloudFront)

---

## Deployment Checklist

Before deploying to production:

- [ ] Run `npm run build` to generate production files
- [ ] Test all pages locally (open `dist/index.html` in browser)
- [ ] Verify i18n works for all 3 languages
- [ ] Check responsive design (mobile, tablet, desktop)
- [ ] Test navigation dropdowns (desktop and mobile)
- [ ] Verify all assets load (images, CSS, JS)
- [ ] Run Lighthouse audit (Performance, Accessibility, Best Practices, SEO)
- [ ] Check browser console for errors
- [ ] Verify meta tags and OpenGraph tags
- [ ] Update `sitemap.xml` if pages added/removed
- [ ] Test 404 error handling
- [ ] Verify HTTPS works (if using CloudFront)
- [ ] Check cache headers are correct
- [ ] Test from different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test from different devices (iOS, Android)
- [ ] Verify contact form works (if applicable)
- [ ] Check analytics tracking (if applicable)
- [ ] Review security headers
- [ ] Test page load speed (<3s initial load)

---

## Post-Deployment Verification

```bash
# 1. Check S3 bucket contents
aws s3 ls s3://mezzofy-website --recursive --summarize

# 2. Get website endpoint
aws s3api get-bucket-website --bucket mezzofy-website

# 3. Test HTTP response
curl -I http://mezzofy-website.s3-website-us-east-1.amazonaws.com/

# 4. Test HTTPS (if using CloudFront)
curl -I https://www.mezzofy.com/

# 5. Check CloudFront distribution status
aws cloudfront get-distribution --id E1234567890ABC --query "Distribution.Status"

# 6. Verify all pages load
for page in index.html about.html contact.html; do
  echo "Testing $page..."
  curl -s -o /dev/null -w "%{http_code}\n" https://www.mezzofy.com/$page
done

# 7. Check cache headers
curl -I https://www.mezzofy.com/output.css | grep -i cache-control
```

---

## Cost Estimation

**Scenario:** Small business website with 10,000 visitors/month, 5 pages/visit, 2 MB/page

### S3 Only (HTTP)
- **Storage:** 100 MB → $0.023/GB = ~$0.00
- **Requests:** 50,000 GET → $0.0004/1000 = $0.02
- **Data Transfer:** 100 GB out → $0.09/GB = $9.00
- **Total:** ~$9/month

### S3 + CloudFront (HTTPS, CDN)
- **S3 Storage:** $0.00
- **S3 Requests:** $0.02
- **CloudFront Data Transfer:** 100 GB → $0.085/GB = $8.50
- **CloudFront Requests:** 50,000 → $0.01/10,000 = $0.05
- **Total:** ~$8.57/month

**Free Tier (first 12 months):**
- S3: 5 GB storage, 20,000 GET requests, 2,000 PUT requests
- CloudFront: 50 GB data transfer out, 2,000,000 HTTP/HTTPS requests

---

## Performance Optimization

### 1. Enable Gzip/Brotli Compression
CloudFront automatically compresses text files. For S3-only:
```bash
# Pre-compress files
gzip -k dist/output.css
aws s3 cp dist/output.css.gz s3://mezzofy-website/output.css \
  --content-encoding gzip \
  --content-type text/css
```

### 2. Set Cache-Control Headers
```bash
# Long cache for static assets (1 year)
aws s3 sync dist/assets/ s3://mezzofy-website/assets/ \
  --cache-control "max-age=31536000,immutable"

# Short cache for HTML (5 minutes)
aws s3 sync dist/ s3://mezzofy-website/ \
  --exclude "*" --include "*.html" \
  --cache-control "max-age=300,public"

# Medium cache for CSS/JS (1 day)
aws s3 sync dist/ s3://mezzofy-website/ \
  --exclude "*" --include "*.css" --include "*.js" \
  --cache-control "max-age=86400,public"
```

### 3. Optimize Images
```bash
# Use WebP format (future enhancement)
# Compress images before upload
# Use responsive images with srcset
```

### 4. Minify Assets
Already done via `npm run build` for CSS. Consider adding JS minification if needed.

### 5. Lazy Load Images
Add `loading="lazy"` to `<img>` tags (future enhancement).

### 6. Preload Critical Assets
Add to HTML `<head>`:
```html
<link rel="preload" href="/output.css" as="style">
<link rel="preload" href="/js/main.js" as="script">
```

### 7. Use CDN for Third-Party Libraries
Already using Tailwind CDN in some pages (consider bundling for production).

---

## Security Best Practices

### 1. Use IAM Roles (Not Access Keys)
For GitHub Actions, use OIDC provider instead of access keys:
```yaml
- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@v2
  with:
    role-to-assume: arn:aws:iam::ACCOUNT_ID:role/GitHubActionsRole
    aws-region: us-east-1
```

### 2. Restrict S3 Bucket Access
Use CloudFront Origin Access Identity (OAI):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E1234567890ABC"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mezzofy-website/*"
    }
  ]
}
```

### 3. Enable S3 Access Logging
```bash
aws s3api put-bucket-logging \
  --bucket mezzofy-website \
  --bucket-logging-status file://logging.json
```

### 4. Enable CloudFront Logging
Configure in CloudFront distribution settings → Logging.

### 5. Set Security Headers

**Create CloudFront Function for comprehensive security headers:**

**Function Name:** `security-headers`
**Event Type:** Viewer Response

```javascript
function handler(event) {
  var response = event.response;
  var headers = response.headers;

  // Content Security Policy
  headers['content-security-policy'] = {
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
  };

  // Strict Transport Security (HSTS)
  headers['strict-transport-security'] = {
    value: 'max-age=31536000; includeSubDomains; preload'
  };

  // X-Content-Type-Options
  headers['x-content-type-options'] = { value: 'nosniff' };

  // X-Frame-Options (prevent clickjacking)
  headers['x-frame-options'] = { value: 'DENY' };

  // X-XSS-Protection (legacy browsers)
  headers['x-xss-protection'] = { value: '1; mode=block' };

  // Referrer Policy
  headers['referrer-policy'] = { value: 'strict-origin-when-cross-origin' };

  // Permissions Policy (disable unnecessary features)
  headers['permissions-policy'] = {
    value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
  };

  return response;
}
```

**Deployment Steps:**

1. **Create function in CloudFront console:**
   - CloudFront → Functions → Create function
   - Name: `security-headers`
   - Runtime: CloudFront Functions (recommended) or Lambda@Edge

2. **Paste the function code above**

3. **Test the function:**
   - Use test event type: Viewer Response
   - Verify headers are added correctly

4. **Associate with distribution:**
   - Go to your CloudFront distribution
   - Behaviors → Edit default behavior
   - Function associations → Viewer response
   - Select `security-headers` function
   - Save changes

5. **Verify after deployment:**
   ```bash
   curl -I https://mezzofy.com | grep -i "content-security-policy"
   curl -I https://mezzofy.com | grep -i "strict-transport-security"
   ```

**Note on CSP `'unsafe-inline'`:**
- Required for Tailwind CDN inline config
- For production hardening, consider:
  - Moving Tailwind config to external file
  - Using nonce-based CSP
  - Migrating to compiled CSS only (remove CDN)

**Security Headers Testing:**
- Use https://securityheaders.com/?q=mezzofy.com
- Target: A+ rating

### 6. Enable AWS CloudTrail
Monitor API calls for audit trail.

### 7. Use AWS WAF (Optional)
Protect against DDoS, SQL injection, XSS attacks.

### 8. Regular Security Audits
- Run `npm audit` regularly
- Update dependencies
- Review S3 bucket policies
- Check CloudFront access logs

---

## Troubleshooting

### Issue: 403 Forbidden
**Cause:** Bucket policy doesn't allow public read.

**Solution:**
```bash
# Verify bucket policy
aws s3api get-bucket-policy --bucket mezzofy-website

# Reapply policy
aws s3api put-bucket-policy --bucket mezzofy-website --policy file://bucket-policy.json

# Check public access block settings
aws s3api get-public-access-block --bucket mezzofy-website

# Disable public access block (if needed)
aws s3api delete-public-access-block --bucket mezzofy-website
```

### Issue: 404 Not Found
**Cause:** File doesn't exist or path is incorrect.

**Solution:**
```bash
# List bucket contents
aws s3 ls s3://mezzofy-website/ --recursive

# Check specific file
aws s3 ls s3://mezzofy-website/about.html

# Re-upload missing files
aws s3 sync dist/ s3://mezzofy-website/
```

### Issue: CSS/JS Not Loading
**Cause:** Incorrect content-type metadata.

**Solution:**
```bash
# Fix content types
aws s3 cp s3://mezzofy-website s3://mezzofy-website --recursive \
  --exclude "*" --include "*.css" \
  --content-type "text/css; charset=utf-8" \
  --metadata-directive REPLACE
```

### Issue: Mixed Content Errors (HTTPS)
**Cause:** Loading HTTP resources on HTTPS page.

**Solution:**
- Use HTTPS URLs for all external resources
- Or use protocol-relative URLs: `//example.com/script.js`
- Check browser console for specific URLs

### Issue: Slow Load Times
**Cause:** Not using CDN or poor cache headers.

**Solution:**
1. Enable CloudFront CDN
2. Set appropriate cache headers
3. Optimize images
4. Enable compression
5. Minify CSS/JS

### Issue: Changes Not Appearing
**Cause:** Browser or CloudFront cache.

**Solution:**
```bash
# Clear CloudFront cache
aws cloudfront create-invalidation --distribution-id E1234567890ABC --paths "/*"

# Or use cache busting (add query string)
# E.g., output.css?v=2
```

### Issue: "Access Denied" When Using aws CLI
**Cause:** AWS credentials not configured or insufficient permissions.

**Solution:**
```bash
# Configure AWS CLI
aws configure

# Verify credentials
aws sts get-caller-identity

# Check IAM permissions (must have S3, CloudFront access)
```

---

## Monitoring & Analytics

### 1. CloudWatch Alarms
```bash
# Create alarm for 4xx errors
aws cloudwatch put-metric-alarm \
  --alarm-name mezzofy-4xx-errors \
  --alarm-description "Alert on 4xx errors" \
  --metric-name 4xxErrorRate \
  --namespace AWS/CloudFront \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold
```

### 2. S3 Metrics
Enable S3 request metrics in bucket properties.

### 3. Google Analytics
Add tracking code to HTML files (if not already present).

### 4. AWS CloudWatch Logs Insights
Query CloudFront logs:
```sql
fields @timestamp, c-ip, cs-uri-stem, sc-status, time-taken
| filter sc-status >= 400
| sort @timestamp desc
| limit 100
```

---

## Backup & Disaster Recovery

### 1. Enable S3 Versioning
```bash
aws s3api put-bucket-versioning \
  --bucket mezzofy-website \
  --versioning-configuration Status=Enabled
```

### 2. Cross-Region Replication (Optional)
For high availability:
```bash
# Create replica bucket in different region
aws s3 mb s3://mezzofy-website-replica --region eu-west-1

# Set up replication rule
aws s3api put-bucket-replication --bucket mezzofy-website --replication-configuration file://replication.json
```

### 3. Backup to Local/Git
The `dist/` folder is in git, so source is already backed up.

---

## Additional Resources

- **AWS S3 Documentation:** https://docs.aws.amazon.com/s3/
- **AWS CloudFront Documentation:** https://docs.aws.amazon.com/cloudfront/
- **AWS CLI S3 Reference:** https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html
- **Static Website Hosting Guide:** https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html

---

**Related Documentation:**
- [CLAUDE.md](CLAUDE.md) - Developer guide and project standards
- [SECURITY.md](SECURITY.md) - Security guidelines and best practices
- [STATUS.md](STATUS.md) - Current project status

---

**Last Updated:** 2026-02-15
**Version:** 1.0
**Maintainer:** Mezzofy Development Team
