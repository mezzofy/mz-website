/**
 * Mezzofy Contact Form — Lambda Handler
 *
 * Triggered by: API Gateway (HTTP API, POST /contact)
 * Sends email via AWS SES to hello@mezzofy.com
 *
 * Environment variables (set in Lambda console / CDK / SAM):
 *   TO_EMAIL   — recipient address  (default: hello@mezzofy.com)
 *   FROM_EMAIL — verified SES sender (default: no-reply@mezzofy.com)
 *                ⚠ FROM_EMAIL must be a verified identity in SES
 *   ALLOWED_ORIGIN — CloudFront / S3 domain for CORS (default: https://mezzofy.com)
 */

'use strict';

const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const ses = new SESClient({ region: process.env.AWS_REGION || 'ap-east-1' });

// ── Config ────────────────────────────────────────────────────────────────────
const TO_EMAIL      = process.env.TO_EMAIL      || 'hello@mezzofy.com';
const FROM_EMAIL    = process.env.FROM_EMAIL    || 'no-reply@mezzofy.com';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://mezzofy.com';

// ── CORS headers ──────────────────────────────────────────────────────────────
const CORS = {
    'Access-Control-Allow-Origin' : ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

// ── Response helpers ──────────────────────────────────────────────────────────
const respond = (statusCode, body) => ({
    statusCode,
    headers: { 'Content-Type': 'application/json', ...CORS },
    body: JSON.stringify(body),
});

// ── Email body builder ────────────────────────────────────────────────────────
function buildEmailText({ name, email, company, phone, subject, message }) {
    return [
        `Name    : ${name}`,
        `Email   : ${email}`,
        company ? `Company : ${company}` : null,
        phone   ? `Phone   : ${phone}`   : null,
        `Subject : ${subject}`,
        '',
        'Message',
        '───────',
        message,
        '',
        '───────────────────────────────',
        'Sent via mezzofy.com contact form',
    ].filter(l => l !== null).join('\n');
}

// ── Lambda handler ────────────────────────────────────────────────────────────
exports.handler = async (event) => {
    // Preflight
    if (event.requestContext?.http?.method === 'OPTIONS' || event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: CORS, body: '' };
    }

    // Parse body (API Gateway HTTP API sends base64 when binary, plain text otherwise)
    let data;
    try {
        const raw = event.isBase64Encoded
            ? Buffer.from(event.body, 'base64').toString('utf-8')
            : event.body || '{}';
        data = JSON.parse(raw);
    } catch {
        return respond(400, { error: 'Invalid JSON body' });
    }

    const { name, email, company = '', phone = '', subject, message } = data;

    // Server-side validation (mirrors client-side)
    const missing = [];
    if (!name?.trim())    missing.push('name');
    if (!email?.trim())   missing.push('email');
    if (!subject?.trim()) missing.push('subject');
    if (!message?.trim()) missing.push('message');
    if (missing.length) {
        return respond(400, { error: `Missing required fields: ${missing.join(', ')}` });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return respond(400, { error: 'Invalid email address' });
    }

    // Honeypot: if _gotcha is present and non-empty it's a bot
    if (data._gotcha) {
        // Silently accept so bots don't retry
        return respond(200, { ok: true });
    }

    // Send via SES
    try {
        await ses.send(new SendEmailCommand({
            Source          : FROM_EMAIL,
            Destination     : { ToAddresses: [TO_EMAIL] },
            ReplyToAddresses: [email.trim()],
            Message: {
                Subject: {
                    Data    : `[Mezzofy Contact] ${subject.trim()} — from ${name.trim()}`,
                    Charset : 'UTF-8',
                },
                Body: {
                    Text: {
                        Data    : buildEmailText({ name, email, company, phone, subject, message }),
                        Charset : 'UTF-8',
                    },
                },
            },
        }));

        return respond(200, { ok: true });

    } catch (err) {
        console.error('SES SendEmail error:', err);
        return respond(500, { error: 'Failed to send email. Please try again.' });
    }
};
