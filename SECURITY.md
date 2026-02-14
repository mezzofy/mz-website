# Security Policy

## 1. Reporting Vulnerabilities

If you discover a security vulnerability in the Mezzofy website, please report it responsibly:

- **Email:** security@mezzofy.com
- **Response Time:** We aim to respond within 48 hours
- **Disclosure:** Please allow us 90 days to address the issue before public disclosure

**What to include in your report:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if applicable)

**What NOT to do:**
- Do not publicly disclose the vulnerability before we've had time to address it
- Do not exploit the vulnerability beyond what's necessary to demonstrate it
- Do not access, modify, or delete data that doesn't belong to you

We appreciate responsible disclosure and will acknowledge security researchers who help us improve our security.

---

## 2. Supported Versions

| Version | Supported | Status |
|---------|:---------:|--------|
| Production (S3/CloudFront) | ✅ | Active maintenance |
| Development (local) | ⚠️ | Testing only |
| Archived versions | ❌ | No longer supported |

---

## 3. Application Security

### 3.1 XSS (Cross-Site Scripting) Prevention

**⚠️ CRITICAL VULNERABILITY IDENTIFIED:**

**Current Issue:** `dist/i18n/i18n.js` line 110 uses `innerHTML` without sanitization:
```javascript
// ❌ VULNERABLE (current code):
element.innerHTML = translation;
```

**Impact:** If translation data is compromised, attackers could inject malicious scripts.

**Priority:** HIGH
**Status:** NEEDS FIX

**Recommended Fixes:**

**Option 1: Use textContent (safest, no HTML support)**
```javascript
// ✅ SECURE (recommended for plain text):
element.textContent = translation;
```

**Option 2: Use DOMPurify (if HTML formatting needed)**
```bash
npm install dompurify
```

```javascript
// ✅ SECURE (for HTML content):
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(translation);
```

**Prevention Rules:**

1. **Never use `innerHTML` with user input or external data**
2. **Use `textContent` or `innerText` for plain text**
3. **If HTML is required, use DOMPurify or similar sanitization**
4. **Validate and sanitize all input on both client and server**
5. **Use Content Security Policy (CSP) headers to block inline scripts**

**Testing for XSS:**
```bash
# Test input in forms and URL parameters
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
javascript:alert('XSS')
```

---

### 3.2 Content Security Policy (CSP)

**Current Status:** ❌ NOT IMPLEMENTED

**Recommended CSP Header:**
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

**Implementation (CloudFront Function):**

Create function in CloudFront console:

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

  // Strict Transport Security
  headers['strict-transport-security'] = {
    value: 'max-age=31536000; includeSubDomains; preload'
  };

  // X-Content-Type-Options
  headers['x-content-type-options'] = { value: 'nosniff' };

  // X-Frame-Options
  headers['x-frame-options'] = { value: 'DENY' };

  // X-XSS-Protection (legacy browsers)
  headers['x-xss-protection'] = { value: '1; mode=block' };

  // Referrer Policy
  headers['referrer-policy'] = { value: 'strict-origin-when-cross-origin' };

  // Permissions Policy
  headers['permissions-policy'] = {
    value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
  };

  return response;
}
```

**Testing CSP:**
```bash
# After deployment, verify headers
curl -I https://mezzofy.com | grep -i "content-security-policy"
```

**Note:** `'unsafe-inline'` is used for Tailwind CDN inline config. For production, consider:
1. Moving Tailwind config to external file
2. Using nonce-based CSP
3. Migrating to compiled CSS only (remove CDN)

---

### 3.3 Subresource Integrity (SRI)

**Current Status:** ❌ NOT IMPLEMENTED

**Risk:** If CDN is compromised, malicious code could be injected.

**Current Code (vulnerable):**
```html
<script src="https://cdn.tailwindcss.com"></script>
```

**Secure Code (with SRI):**
```html
<script
  src="https://cdn.tailwindcss.com"
  integrity="sha384-[HASH_HERE]"
  crossorigin="anonymous">
</script>
```

**Generate SRI Hash:**
```bash
# Method 1: Using online tool
# Visit: https://www.srihash.org/

# Method 2: Using curl + openssl
curl https://cdn.tailwindcss.com | openssl dgst -sha384 -binary | openssl base64 -A
```

**Example with real hash:**
```html
<script
  src="https://cdn.tailwindcss.com/3.4.0"
  integrity="sha384-r4F290EvmPW08w0avz8k6YE3XFx5yJ5wnNKnkXg4kzhQw7RJ4Vwk5ByVE6n+vFWR"
  crossorigin="anonymous">
</script>
```

**⚠️ Important:**
- SRI hashes must be updated when CDN version changes
- Test thoroughly after adding SRI (site will break if hash is wrong)
- Apply SRI to ALL external scripts and stylesheets

**Action Items:**
1. ✅ Add SRI to Tailwind CDN in all HTML files
2. ✅ Document hash generation process
3. ✅ Add SRI validation to pre-deployment checklist

---

### 3.4 Form Security

**Current Form Pages:**
- `contact.html` - Contact form

**Security Requirements for Forms:**

#### Client-Side Validation
```javascript
// Example: Email validation
function validateEmail(email) {
  // Basic format check
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    return false;
  }

  // Length check
  if (email.length > 254) {
    return false;
  }

  return true;
}

// Sanitize input before display
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}
```

#### Input Validation Rules
1. **Email:** Max 254 chars, valid format
2. **Name:** Max 100 chars, letters/spaces/hyphens only
3. **Phone:** Max 20 chars, numbers/spaces/+/- only
4. **Message:** Max 2000 chars

#### Server-Side Validation (if form processor added)
```python
# Example Flask/FastAPI validation
from pydantic import BaseModel, EmailStr, constr

class ContactForm(BaseModel):
    name: constr(max_length=100)
    email: EmailStr
    phone: constr(max_length=20, regex=r'^[0-9\s\+\-]+$')
    message: constr(max_length=2000)
```

#### CSRF Protection (if server-side forms added)
```html
<!-- Add CSRF token to forms -->
<form method="POST" action="/contact">
  <input type="hidden" name="csrf_token" value="{{ csrf_token }}">
  <!-- form fields -->
</form>
```

**Honeypot Anti-Spam:**
```html
<!-- Hidden field to catch bots -->
<input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
```

```javascript
// Reject if honeypot filled
if (form.website.value !== '') {
  // Likely a bot
  return false;
}
```

---

### 3.5 localStorage Security

**Current Usage:**
- Language preference storage in i18n.js

**Safe Usage:**
```javascript
// ✅ SAFE: Store UI preferences
localStorage.setItem('language', 'en');
localStorage.setItem('theme', 'light');

// ❌ NEVER STORE:
// - API tokens
// - Passwords
// - Credit card numbers
// - Personal identification numbers
// - Session tokens (use httpOnly cookies instead)
```

**localStorage Security Rules:**

1. **Never store sensitive data**
   - Tokens, passwords, API keys, PII
   - Use secure httpOnly cookies for authentication

2. **Validate data read from localStorage**
   ```javascript
   // ✅ SECURE: Validate against whitelist
   const lang = localStorage.getItem('language');
   const validLangs = ['en', 'zh-TW', 'zh-CN'];
   const selectedLang = validLangs.includes(lang) ? lang : 'en';
   ```

3. **Use try-catch for localStorage access**
   ```javascript
   try {
     localStorage.setItem('key', 'value');
   } catch (e) {
     // Handle quota exceeded or disabled localStorage
     console.warn('localStorage not available');
   }
   ```

4. **Be aware of XSS risks**
   - localStorage is accessible via JavaScript
   - XSS attacks can steal localStorage data
   - This is why sensitive data must NEVER be stored

**Current i18n.js Language Storage (Review Required):**
```javascript
// Current code (mostly safe, but validate):
const savedLang = localStorage.getItem('language');

// ✅ Add validation:
const VALID_LANGUAGES = ['en', 'zh-TW', 'zh-CN'];
const savedLang = localStorage.getItem('language');
const language = VALID_LANGUAGES.includes(savedLang) ? savedLang : 'en';
```

---

## 4. Infrastructure Security

### 4.1 Security Headers (Comprehensive)

**Required Headers:**

| Header | Value | Purpose |
|--------|-------|---------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Force HTTPS |
| `Content-Security-Policy` | (see section 3.2) | Prevent XSS/injection |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS protection |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer info |
| `Permissions-Policy` | (see below) | Disable unused features |

**Permissions-Policy Value:**
```
geolocation=(),
microphone=(),
camera=(),
payment=(),
usb=(),
magnetometer=(),
gyroscope=(),
accelerometer=()
```

**Implementation:** See CloudFront function in section 3.2

**Verification:**
```bash
# Test all headers
curl -I https://mezzofy.com

# Use online scanner
# Visit: https://securityheaders.com/?q=mezzofy.com
```

**Target Score:** A+ on SecurityHeaders.com

---

### 4.2 HTTPS/TLS Configuration

**Requirements:**

1. **TLS Version:** Minimum TLSv1.2 (CloudFront default)
2. **Certificate:** AWS ACM (auto-renewal)
3. **HSTS Preload:** Add domain to HSTS preload list

**HSTS Preload Submission:**
1. Ensure HSTS header includes `preload` directive
2. Deploy HTTPS with HSTS for 3+ months
3. Submit domain: https://hstspreload.org/
4. Add to `CLAUDE.md` post-deployment checklist

**Certificate Monitoring:**
```bash
# Check certificate expiry
echo | openssl s_client -servername mezzofy.com -connect mezzofy.com:443 2>/dev/null | openssl x509 -noout -dates

# AWS ACM auto-renews, but verify
aws acm describe-certificate --certificate-arn [ARN]
```

---

### 4.3 AWS IAM & Permissions (Least Privilege)

**S3 Bucket Policy (Public Read Only):**
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

**CloudFront Origin Access Identity (OAI) - Recommended:**

Instead of public S3 bucket, use OAI:

1. **Create OAI in CloudFront**
2. **Update S3 bucket policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity [OAI-ID]"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mezzofy-website/*"
    }
  ]
}
```

3. **Block all public access to S3**

**IAM User for CI/CD (GitHub Actions):**

Minimum permissions:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::mezzofy-website",
        "arn:aws:s3:::mezzofy-website/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::[ACCOUNT]:distribution/[DISTRIBUTION-ID]"
    }
  ]
}
```

**Better: Use OIDC Provider (No Access Keys):**
- Configure GitHub OIDC provider in IAM
- Use `aws-actions/configure-aws-credentials@v2` with role
- No static credentials to leak

---

### 4.4 CORS Configuration

**If API endpoints are added:**

```javascript
// CloudFront function or API Gateway
const allowedOrigins = [
  'https://mezzofy.com',
  'https://www.mezzofy.com'
];

function handler(event) {
  const request = event.request;
  const origin = request.headers.origin ? request.headers.origin.value : '';

  const response = {
    statusCode: 200,
    headers: {}
  };

  if (allowedOrigins.includes(origin)) {
    response.headers['access-control-allow-origin'] = { value: origin };
    response.headers['access-control-allow-methods'] = { value: 'GET, POST, OPTIONS' };
    response.headers['access-control-allow-headers'] = { value: 'Content-Type, Authorization' };
    response.headers['access-control-max-age'] = { value: '3600' };
  }

  return response;
}
```

**Static Site (Current):**
- No CORS needed (no API calls)
- If contact form uses external API, configure CORS on API side

---

## 5. Development Security

### 5.1 Secrets Management

**Never Commit Secrets:**

Use `.gitignore` to exclude:
- `.env` files
- `*credentials*`
- `*secret*`
- `*.key`

**Environment Variables (.env):**
```bash
# .env (never commit!)
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
CONTACT_FORM_API_KEY=your-api-key-here
```

**Loading .env in Node.js:**
```javascript
require('dotenv').config();
const apiKey = process.env.CONTACT_FORM_API_KEY;
```

**AWS Secrets Manager (for production):**
```bash
# Store secret
aws secretsmanager create-secret \
  --name mezzofy/production/api-key \
  --secret-string "your-secret-value"

# Retrieve in Lambda
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();
const secret = await secretsManager.getSecretValue({ SecretId: 'mezzofy/production/api-key' }).promise();
```

**Check for Secrets Before Commit:**
```bash
# Scan for potential secrets
git diff --cached | grep -i "api_key\|secret\|password\|token"

# Use git-secrets tool (recommended)
git secrets --scan
```

---

### 5.2 Dependency Security

**NPM Audit (Regular):**
```bash
# Check for vulnerabilities
npm audit

# Auto-fix if possible
npm audit fix

# Check severity levels
npm audit --audit-level=high
```

**Automated Dependency Updates (Dependabot):**

Create `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    reviewers:
      - "dev-team"
    labels:
      - "dependencies"
      - "security"
```

**Lock File Integrity:**
```bash
# Verify package-lock.json matches package.json
npm ci

# Never use npm install in production (use npm ci)
```

**Audit Schedule:**
- **Weekly:** `npm audit` in development
- **Monthly:** Review and update dependencies
- **Immediate:** Security alerts from GitHub/Dependabot

---

### 5.3 Code Review Security Checklist

Before merging any PR:

- [ ] No hardcoded secrets (API keys, passwords, tokens)
- [ ] No credentials in code or comments
- [ ] Input validation present on all forms
- [ ] XSS prevention: `textContent` used, not `innerHTML`
- [ ] localStorage only for non-sensitive data
- [ ] No SQL injection risks (use parameterized queries if DB added)
- [ ] Error messages don't leak sensitive info (stack traces, paths)
- [ ] Security headers configured
- [ ] Dependencies audited (`npm audit`)
- [ ] `.gitignore` prevents secret commits
- [ ] HTTPS enforced (no mixed content)
- [ ] CORS configured correctly (if applicable)
- [ ] Rate limiting considered (if API added)

---

## 6. Security Checklists

### Pre-Deployment Security Checklist

**Critical (Must Pass):**
- [ ] `npm audit` shows no HIGH or CRITICAL vulnerabilities
- [ ] No secrets in code: `git grep -i "api_key\|secret\|password\|token"`
- [ ] `.gitignore` configured and working
- [ ] All CDN resources have SRI hashes
- [ ] CSP headers configured in CloudFront
- [ ] HTTPS enforced (CloudFront redirect HTTP → HTTPS)
- [ ] Security headers configured (see section 4.1)
- [ ] XSS protection: No `innerHTML` with user/external data
- [ ] Form validation: Client-side AND server-side
- [ ] Error handling: No stack traces to users

**Recommended:**
- [ ] HSTS preload enabled
- [ ] CloudFront OAI configured (not public S3)
- [ ] AWS IAM uses least privilege
- [ ] S3 access logging enabled
- [ ] CloudFront access logging enabled
- [ ] Security.txt published
- [ ] robots.txt configured

---

### Post-Deployment Security Verification

**Immediately After Deployment:**

```bash
# 1. Verify HTTPS redirect
curl -I http://mezzofy.com | grep -i "location.*https"

# 2. Check security headers
curl -I https://mezzofy.com | grep -i "strict-transport-security"
curl -I https://mezzofy.com | grep -i "content-security-policy"
curl -I https://mezzofy.com | grep -i "x-frame-options"
curl -I https://mezzofy.com | grep -i "x-content-type-options"

# 3. Test CSP
# Visit site and check browser console for CSP violations

# 4. Run security scan
# Visit: https://securityheaders.com/?q=mezzofy.com
# Target: A+ score

# 5. SSL Labs test
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=mezzofy.com
# Target: A or A+ score
```

**Manual Tests:**
- [ ] XSS attempts in forms blocked
- [ ] Mixed content warnings (none should appear)
- [ ] Language switching validates against whitelist
- [ ] Error pages don't leak info (test 404, 500)

---

### Monthly Security Maintenance

**First Week of Each Month:**

1. **Dependency Audit**
   ```bash
   npm audit
   npm outdated
   npm update
   ```

2. **Review Access Logs**
   - Check S3 access logs for anomalies
   - Check CloudFront logs for attack patterns
   - Review CloudWatch metrics

3. **Security Scan**
   - Run SecurityHeaders.com scan
   - Run SSL Labs test
   - Check for new OWASP Top 10 issues

4. **Certificate Check**
   ```bash
   aws acm describe-certificate --certificate-arn [ARN]
   ```

5. **IAM Review**
   - Review IAM users/roles
   - Remove unused access keys
   - Rotate long-term credentials

6. **Update Security Documentation**
   - Update SECURITY.md if new vulnerabilities found
   - Document any security incidents
   - Update CLAUDE.md if new security patterns adopted

---

## 7. Incident Response

### If a Security Breach Occurs:

**Immediate Actions (< 1 hour):**
1. Take affected systems offline if active exploit
2. Preserve logs and evidence
3. Notify security team: security@mezzofy.com
4. Change all credentials/keys
5. Document timeline and impact

**Investigation (< 24 hours):**
1. Identify root cause
2. Assess scope of breach
3. Determine data exposure
4. Review access logs

**Remediation (< 48 hours):**
1. Patch vulnerability
2. Deploy fix
3. Verify fix effectiveness
4. Update security documentation

**Post-Incident (< 1 week):**
1. Notify affected users (if personal data exposed)
2. Write post-mortem
3. Update security policies
4. Implement additional monitoring
5. Schedule security training

**Reporting Requirements:**
- Internal: Notify management within 2 hours
- External: Notify users within 72 hours (if GDPR/CCPA applies)
- Regulatory: File reports as required by law

---

## 8. Security Resources

**Tools:**
- [SecurityHeaders.com](https://securityheaders.com) - Header scanner
- [SSL Labs](https://www.ssllabs.com/ssltest/) - TLS/SSL scanner
- [OWASP ZAP](https://www.zaproxy.org/) - Penetration testing
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Dependency scanner
- [git-secrets](https://github.com/awslabs/git-secrets) - Prevent secret commits

**References:**
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [AWS Security Best Practices](https://aws.amazon.com/security/best-practices/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [HSTS Preload](https://hstspreload.org/)

**Security Contacts:**
- **Report Vulnerabilities:** security@mezzofy.com
- **AWS Support:** (for infrastructure issues)
- **CloudFlare Support:** (if CDN used)

---

## 9. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-15 | Initial security policy created |

---

**Last Updated:** 2026-02-15
**Next Review:** 2026-05-15 (quarterly)
**Owner:** Security Team / Development Lead
