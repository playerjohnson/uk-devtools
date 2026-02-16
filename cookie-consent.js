(function(){
  var GA_ID = 'G-GSVNXL004D';
  var ADS_CLIENT = 'ca-pub-6553969093740923';
  var CONSENT_KEY = 'ictedge_cookie_consent';

  function loadGA() {
    if (document.querySelector('script[src*="googletagmanager"]')) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function loadAdsense() {
    if (document.querySelector('script[src*="googlesyndication"]')) return;
    var s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADS_CLIENT;
    document.head.appendChild(s);
    s.onload = function() {
      var slots = document.querySelectorAll('.adsbygoogle');
      for (var i = 0; i < slots.length; i++) {
        try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
      }
    };
  }

  function clearCookies() {
    document.cookie.split(';').forEach(function(c){
      var name = c.split('=')[0].trim();
      if (name.startsWith('_ga') || name === '__gads' || name === '__gpi' || name === 'IDE' || name === 'DSID') {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.' + location.hostname;
      }
    });
  }

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
    loadGA();
    loadAdsense();
  } else if (consent === 'rejected') {
    // No tracking, no ads
  } else {
    document.addEventListener('DOMContentLoaded', function(){
      document.body.appendChild(banner);
      document.getElementById('cookie-accept').addEventListener('click', function(){
        localStorage.setItem(CONSENT_KEY, 'accepted');
        banner.remove();
        loadGA();
        loadAdsense();
      });
      document.getElementById('cookie-reject').addEventListener('click', function(){
        localStorage.setItem(CONSENT_KEY, 'rejected');
        banner.remove();
        clearCookies();
      });
    });
  }
})();
