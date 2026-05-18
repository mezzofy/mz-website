/**
 * Mezzofy Website Analytics Tracker
 * Collects pageview, CTA click, and page exit events.
 * Sends data to the Mezzofy AI platform for display in the Marketing portal.
 *
 * Usage: Add data-cta="category" to any button/link to track CTA clicks.
 * Categories: contact | demo | signup | learn-more | <any custom value>
 */

(function () {
  'use strict';

  var BEACON_URL = 'https://api.mezzofy.com/analytics/collect';

  // ── Identity ──────────────────────────────────────────────────────────────

  function getOrCreateUUID(storageKey, storage) {
    try {
      var existing = storage.getItem(storageKey);
      if (existing) return existing;
      var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0;
        var v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
      storage.setItem(storageKey, id);
      return id;
    } catch (e) {
      return 'unknown-' + Math.random().toString(36).slice(2, 10);
    }
  }

  var visitorId = getOrCreateUUID('mz_vid', localStorage);
  var sessionId = getOrCreateUUID('mz_sid', sessionStorage);

  // ── Device detection ──────────────────────────────────────────────────────

  function getDeviceType() {
    var w = screen.width;
    if (w < 768) return 'mobile';
    if (w <= 1024) return 'tablet';
    return 'desktop';
  }

  // ── Traffic source ────────────────────────────────────────────────────────

  var SEARCH_DOMAINS = ['google.', 'bing.com', 'yahoo.com', 'duckduckgo.com', 'baidu.com', 'yandex.com'];
  var SOCIAL_DOMAINS = ['facebook.com', 'instagram.com', 'linkedin.com', 'twitter.com', 'x.com', 'tiktok.com', 't.co', 'lnkd.in'];

  function getTrafficSource() {
    var params = new URLSearchParams(window.location.search);
    var utmMedium = params.get('utm_medium') || '';
    var utmSource = params.get('utm_source') || '';

    if (utmMedium === 'cpc' || utmMedium === 'ppc' || utmMedium === 'paid') return 'paid';
    if (utmMedium === 'email' || utmSource === 'email') return 'email';
    if (utmMedium === 'social' || SOCIAL_DOMAINS.some(function (d) { return utmSource.indexOf(d) !== -1; })) return 'social';
    if (utmSource) return 'referral';

    var ref = document.referrer;
    if (!ref) return 'direct';

    var refLower = ref.toLowerCase();
    if (SEARCH_DOMAINS.some(function (d) { return refLower.indexOf(d) !== -1; })) return 'organic';
    if (SOCIAL_DOMAINS.some(function (d) { return refLower.indexOf(d) !== -1; })) return 'social';
    return 'referral';
  }

  // ── Send event ────────────────────────────────────────────────────────────

  function sendEvent(payload, useBeacon) {
    var body = JSON.stringify(payload);
    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon(BEACON_URL, new Blob([body], { type: 'application/json' }));
      return;
    }
    fetch(BEACON_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
      keepalive: true,
    }).catch(function () {});
  }

  // ── Pageview ──────────────────────────────────────────────────────────────

  var pageLoadTime = Date.now();
  var pagePath = window.location.pathname;

  sendEvent({
    session_id: sessionId,
    visitor_id: visitorId,
    event_type: 'pageview',
    page_path: pagePath,
    referrer: document.referrer || '',
    traffic_source: getTrafficSource(),
    device_type: getDeviceType(),
  }, false);

  // ── Page exit ─────────────────────────────────────────────────────────────

  window.addEventListener('beforeunload', function () {
    var duration = Math.round((Date.now() - pageLoadTime) / 1000);
    sendEvent({
      session_id: sessionId,
      visitor_id: visitorId,
      event_type: 'page_exit',
      page_path: pagePath,
      duration_seconds: duration,
    }, true);
  });

  // ── CTA click tracking ────────────────────────────────────────────────────

  document.addEventListener('click', function (e) {
    var el = e.target;
    // Walk up the DOM to find a [data-cta] element
    while (el && el !== document.body) {
      if (el.dataset && el.dataset.cta) {
        sendEvent({
          session_id: sessionId,
          visitor_id: visitorId,
          event_type: 'cta_click',
          page_path: pagePath,
          cta_name: el.dataset.cta,
        }, false);
        break;
      }
      el = el.parentElement;
    }
  }, { passive: true });

})();
