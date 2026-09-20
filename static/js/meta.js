/* Limited Meta measurement: no form fields, advanced matching or automatic events. */
(function () {
  "use strict";
  var el = document.getElementById("site-config");
  var cfg;
  try { cfg = JSON.parse(el ? el.textContent : "{}"); } catch (e) { return; }
  var id = cfg.metaPixel;
  if (!id || !/^\d+$/.test(id)) return;
  // Never send development/preview activity or ignore browser privacy signals.
  if (!/^(www\.)?koalacontainers\.com\.au$/.test(location.hostname)) return;
  if (navigator.globalPrivacyControl || navigator.doNotTrack === "1") return;
  if (window.koalaMetaLead) return;
  var fbq = window.fbq;
  if (!fbq) {
    fbq = window.fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
  fbq.disablePushState = true;
  fbq("set", "autoConfig", false, id);
  fbq("init", id); // Deliberately no advanced-matching user-data object.
  fbq("trackSingle", id, "PageView");
  var leadSent = false;
  window.koalaMetaLead = function () {
    if (leadSent) return;
    leadSent = true;
    try { fbq("trackSingle", id, "Lead"); } catch (e) {}
  };
})();
