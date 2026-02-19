(function(){
  var GTM_ID = 'GTM-54K98MWX';
  var CONSENT_KEY = 'ictedge_cookie_consent';

  /* ── Identify site for dataLayer ── */
  var path = location.pathname;
  var siteName = 'unknown';
  if (path.indexOf('/uk-devtools') > -1) siteName = 'uk-devtools';
  else if (path.indexOf('/quickdev-tools') > -1) siteName = 'quickdev-tools';
  else if (path.indexOf('/public-sector-tools') > -1) siteName = 'public-sector-tools';
  else if (path.indexOf('/everyday-tools') > -1) siteName = 'everyday-tools';
  else if (path.indexOf('/ict-edge-indicators') > -1) siteName = 'ict-edge-indicators';
  else if (path.indexOf('/freelance-dev') > -1) siteName = 'freelance-dev';
  else if (path.indexOf('/little-stars') > -1) siteName = 'little-stars';

  /* ── Initialise dataLayer ── */
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'site_name': siteName,
    'page_path': path,
    'page_title': document.title
  });

  /* ── Load GTM ── */
  function loadGTM() {
    if (document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) return;
    window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(s);
  }

  /* ── Clear tracking cookies ── */
  function clearCookies() {
    document.cookie.split(';').forEach(function(c){
      var name = c.split('=')[0].trim();
      if (name.startsWith('_ga') || name === '__gads' || name === '__gpi' || name === 'IDE' || name === 'DSID' || name.startsWith('_gid') || name.startsWith('_gcl')) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.' + location.hostname;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      }
    });
  }

  /* ── trackEvent helper ── */
  window.trackEvent = function(eventName, params) {
    params = params || {};
    params.event = eventName;
    params.site_name = siteName;
    window.dataLayer.push(params);
  };

  /* ── Consent banner ── */
  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML =
    '<div style="position:fixed;bottom:0;left:0;right:0;z-index:99999;background:#1a1a2e;border-top:1px solid #333;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;font-family:-apple-system,system-ui,sans-serif;font-size:14px;color:#cbd5e1;">' +
      '<p style="margin:0;flex:1;min-width:280px;">This site uses cookies for analytics and advertising. <a href="privacy.html" style="color:#f59e0b;text-decoration:underline;">Privacy Policy</a></p>' +
      '<div style="display:flex;gap:8px;flex-shrink:0;">' +
        '<button id="cookie-reject" style="padding:8px 18px;border-radius:6px;border:1px solid #475569;background:transparent;color:#cbd5e1;font-size:13px;font-weight:500;cursor:pointer;">Reject</button>' +
        '<button id="cookie-accept" style="padding:8px 18px;border-radius:6px;border:none;background:#f59e0b;color:#0a0e1a;font-size:13px;font-weight:600;cursor:pointer;">Accept</button>' +
      '</div>' +
    '</div>';

  var consent = localStorage.getItem(CONSENT_KEY);

  if (consent === 'accepted') {
    loadGTM();
  } else if (consent === 'rejected') {
    /* No tracking */
  } else {
    document.addEventListener('DOMContentLoaded', function(){
      document.body.appendChild(banner);
      document.getElementById('cookie-accept').addEventListener('click', function(){
        localStorage.setItem(CONSENT_KEY, 'accepted');
        banner.remove();
        loadGTM();
        trackEvent('consent_granted');
      });
      document.getElementById('cookie-reject').addEventListener('click', function(){
        localStorage.setItem(CONSENT_KEY, 'rejected');
        banner.remove();
        clearCookies();
        trackEvent('consent_rejected');
      });
    });
  }

  /* ═══════════════════════════════════════════════════
     EVENT TRACKING — auto-attaches based on page content
     ═══════════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', function(){

    /* ── Universal: promo bar clicks ── */
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a');
      if (!link) return;
      var href = link.href || '';

      /* Freelance promo bar */
      if (href.indexOf('/freelance-dev') > -1 && link.closest('[style*="111827"], [style*="promo"]')) {
        trackEvent('promo_bar_click', { link_url: href });
      }

      /* Cross-site links bar */
      if (link.closest('[style*="0a0e1a"]') && href.indexOf('anthonyjohnson.dev') > -1) {
        trackEvent('cross_site_click', { link_url: href, destination_site: href.split('/')[3] || '' });
      }

      /* Outbound links */
      if (href.indexOf('anthonyjohnson.dev') === -1 && href.startsWith('http')) {
        trackEvent('outbound_click', { link_url: href, link_text: (link.textContent || '').trim().substring(0, 50) });
      }
    });

    /* ── uk-devtools: calculator events ── */
    if (siteName === 'uk-devtools') {
      /* Calculator used — listen for result display */
      var resultObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
          if (m.target.textContent && m.target.textContent.trim().length > 0) {
            var calcName = document.title.split('—')[0].split('|')[0].trim();
            trackEvent('calculator_used', { calculator_name: calcName });
            resultObserver.disconnect();
          }
        });
      });
      var resultEl = document.querySelector('.results, .result, #results, #result, [class*="result"]');
      if (resultEl) {
        resultObserver.observe(resultEl, { childList: true, subtree: true, characterData: true });
      }

      /* Calculate button clicks */
      document.querySelectorAll('button[type="submit"], button[id*="calc"], .btn-calculate, #calculateBtn').forEach(function(btn){
        btn.addEventListener('click', function(){
          var calcName = document.title.split('—')[0].split('|')[0].trim();
          trackEvent('calculator_used', { calculator_name: calcName });
        });
      });

      /* Email signup */
      var emailForm = document.querySelector('#notifyForm, form[action*="formspree"], form[action*="mailchimp"]');
      if (emailForm) {
        emailForm.addEventListener('submit', function(){
          trackEvent('email_signup', { form_location: 'homepage' });
        });
      }
    }

    /* ── quickdev-tools: tool actions ── */
    if (siteName === 'quickdev-tools') {
      document.querySelectorAll('button').forEach(function(btn){
        var text = (btn.textContent || '').trim().toLowerCase();
        if (['format','minify','copy','download','clear','validate','generate','build','encode','decode','compare'].indexOf(text) > -1 ||
            text.indexOf('format') > -1 || text.indexOf('copy') > -1 || text.indexOf('generate') > -1) {
          btn.addEventListener('click', function(){
            var toolName = document.title.split('—')[0].split('|')[0].trim();
            trackEvent('tool_action', { tool_name: toolName, action: text });
          });
        }
      });
    }

    /* ── public-sector-tools: tool completions ── */
    if (siteName === 'public-sector-tools') {
      document.querySelectorAll('button[type="submit"], button[id*="generate"], button[id*="check"], button[id*="calc"]').forEach(function(btn){
        btn.addEventListener('click', function(){
          var toolName = document.title.split('—')[0].split('|')[0].trim();
          trackEvent('tool_used', { tool_name: toolName });
        });
      });

      /* FOI/SAR generation */
      document.querySelectorAll('#copyBtn, button[id*="copy"]').forEach(function(btn){
        btn.addEventListener('click', function(){
          var isFOI = location.pathname.indexOf('foi') > -1;
          trackEvent(isFOI ? 'foi_generated' : 'document_generated', { tool_name: document.title.split('—')[0].trim() });
        });
      });
    }

    /* ── everyday-tools: file processing events ── */
    if (siteName === 'everyday-tools') {
      document.querySelectorAll('button').forEach(function(btn){
        var text = (btn.textContent || '').trim().toLowerCase();
        if (text.indexOf('merge') > -1 || text.indexOf('compress') > -1 || text.indexOf('generate') > -1 ||
            text.indexOf('download') > -1 || text.indexOf('convert') > -1) {
          btn.addEventListener('click', function(){
            var toolName = document.title.split('—')[0].split('|')[0].trim();
            trackEvent('tool_action', { tool_name: toolName, action: text });
          });
        }
      });
    }

    /* ── ict-edge-indicators: conversion events ── */
    if (siteName === 'ict-edge-indicators') {
      /* Whop CTA clicks */
      document.addEventListener('click', function(e) {
        var link = e.target.closest('a');
        if (link && link.href && link.href.indexOf('whop') > -1) {
          var plan = 'unknown';
          var card = link.closest('.pricing-card, [class*="pricing"]');
          if (card) {
            var h3 = card.querySelector('h3');
            if (h3) plan = h3.textContent.trim().toLowerCase();
          }
          trackEvent('whop_click', { plan: plan, link_url: link.href });
        }
      });

      /* Pricing toggle */
      var toggle = document.getElementById('pricingToggle');
      if (toggle) {
        toggle.addEventListener('change', function(){
          trackEvent('pricing_toggle', { period: toggle.checked ? 'annual' : 'monthly' });
        });
      }

      /* FAQ opens */
      document.querySelectorAll('.faq-question, details summary, [class*="faq"] button').forEach(function(el){
        el.addEventListener('click', function(){
          var question = (el.textContent || '').trim().substring(0, 60);
          trackEvent('faq_opened', { question: question });
        });
      });
    }

    /* ── freelance-dev: conversion funnel ── */
    if (siteName === 'freelance-dev') {
      /* Contact form */
      var contactForm = document.querySelector('form[action*="formspree"], #contactForm');
      if (contactForm) {
        var started = false;
        contactForm.addEventListener('focusin', function(){
          if (!started) {
            started = true;
            trackEvent('contact_form_started');
          }
        });
        contactForm.addEventListener('submit', function(){
          var service = '';
          var budget = '';
          var serviceSelect = contactForm.querySelector('select[name="service"], #service');
          var budgetSelect = contactForm.querySelector('select[name="budget"], #budget');
          if (serviceSelect) service = serviceSelect.value;
          if (budgetSelect) budget = budgetSelect.value;
          trackEvent('contact_form_submitted', { service: service, budget: budget });
        });
      }

      /* Service page views */
      if (path.indexOf('/services/') > -1) {
        var serviceName = document.title.split('|')[0].trim();
        trackEvent('service_page_viewed', { service_name: serviceName });
      }

      /* CTA clicks */
      document.querySelectorAll('.btn-primary, .btn-outline').forEach(function(btn){
        btn.addEventListener('click', function(){
          var label = (btn.textContent || '').trim().substring(0, 40);
          var section = '';
          var sec = btn.closest('section, .cta-section, .pricing-card');
          if (sec) {
            var h2 = sec.querySelector('h2, h3');
            if (h2) section = h2.textContent.trim().substring(0, 40);
          }
          trackEvent('cta_clicked', { cta_text: label, section: section });
        });
      });

      /* Portfolio link clicks */
      document.querySelectorAll('.portfolio-card a, [class*="portfolio"] a, [class*="built-by"] a').forEach(function(link){
        link.addEventListener('click', function(){
          trackEvent('portfolio_click', { project: (link.textContent || '').trim().substring(0, 40), link_url: link.href });
        });
      });
    }

    /* ── Blog cross-link tracking (all sites) ── */
    document.querySelectorAll('a[href*="tools/"], a[href*="indicators/"], a[href*="blog/"]').forEach(function(link){
      var isInCrossLink = link.closest('[style*="border-left:3px"], [style*="Related"]');
      if (isInCrossLink) {
        link.addEventListener('click', function(){
          var direction = link.href.indexOf('/blog/') > -1 ? 'tool_to_blog' : 'blog_to_tool';
          trackEvent('cross_link_click', { direction: direction, link_url: link.href, link_text: (link.textContent || '').trim().substring(0, 50) });
        });
      }
    });

  });
})();
