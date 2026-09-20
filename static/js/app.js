/* Site JS — brand-agnostic. Every brand value comes from the #site-config JSON
   block emitted by build.js from data/site.json. Do not hardcode a brand,
   domain, phone or email in this file: copying it to another brand's repo is
   how leads end up routed to the wrong business.

   KNOWN SECURITY ISSUE — the lead-intake shared secret below is a plain string
   in public JavaScript on every brand site in the group, so anyone who views
   source can post fabricated leads into the CRM. This is a group-wide problem
   rather than something specific to this repo, and rotating it has to happen on
   the edge function and every brand site at the same time. It is flagged and
   waiting on a decision — do not rotate it here in isolation. */
(function () {
  "use strict";

  var CFG = {};
  try {
    var el = document.getElementById("site-config");
    if (el) CFG = JSON.parse(el.textContent || "{}");
  } catch (e) {}

  var CONFIG = {
    endpoint: CFG.endpoint,
    secret: "jfkgdlh!?gfhsldfh**dfs23",
    brand: CFG.brand,
    domain: CFG.domain
  };
  var PHONE = CFG.phone || "";
  var PHONE_HREF = CFG.phoneHref || "";
  var EMAIL = CFG.email || "";
  var PROMISE = CFG.promise || "";

  /* ---------------------------------------------------- Google Ads --------
     Conversion actions are NOT created here. The ID and the three labels come
     from data/site.json and match actions that already exist in the Ads
     account; if a brand ships no "ads" block, every call below is a no-op.

     Each kind fires AT MOST ONCE per page view. The form conversion is fired
     only from ok(), which itself only runs after the intake endpoint has
     accepted the lead — so a submit click, a validation failure, a network
     error or a retry can never add a count. No name, phone, email, message or
     address is ever passed as a parameter, and no enhanced-conversion user
     data is sent. */
  var ADS = CFG.ads || null;
  var fired = {};
  function adsConvert(kind) {
    if (!ADS || !ADS.id || !ADS.labels || !ADS.labels[kind]) return;
    if (fired[kind]) return;
    fired[kind] = true;
    if (typeof window.gtag !== "function") return;
    try { window.gtag("event", "conversion", { send_to: ADS.id + "/" + ADS.labels[kind] }); } catch (e) {}
  }

  /* Phone and email clicks, delegated so links added later are covered too.
     The click is never intercepted — no preventDefault, no delay — because a
     tel: link that does not dial is a lost sale, and gtag posts the hit with
     sendBeacon where the browser supports it. */
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = (a.getAttribute("href") || "").toLowerCase();
    if (href.indexOf("tel:") === 0) adsConvert("phone");
    else if (href.indexOf("mailto:") === 0) adsConvert("email");
  }, true);

  // Mobile menu
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".menu");
  if (burger && menu) {
    if (!menu.id) menu.id = "site-menu";
    burger.setAttribute("aria-controls", menu.id);
    function setMenu(open) {
      menu.classList.toggle("show", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    }
    burger.addEventListener("click", function () { setMenu(!menu.classList.contains("show")); });
    // Escape closes the menu and returns focus to the button.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("show")) { setMenu(false); burger.focus(); }
    });
    // Mark the current page in the nav for assistive tech and the hover style.
    menu.querySelectorAll("a").forEach(function (a) {
      if (a.getAttribute("href") === location.pathname) a.setAttribute("aria-current", "page");
    });
  }

  // Keep the latest tagged visit across pages in this tab, for up to 30 minutes.
  // Replace the whole attribution on a new campaign; never mix Google and Meta.
  var ATTR_KEY = "koala_campaign_attribution_v1";
  var ATTR_TTL = 30 * 60 * 1000;
  var ATTR_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
  function utm() {
    var o = {};
    try {
      var p = new URLSearchParams(location.search);
      ATTR_FIELDS.forEach(function (k) {
        if (p.get(k)) o[k] = p.get(k).slice(0, 500);
      });
    } catch (e) {}
    try {
      if (Object.keys(o).length) {
        sessionStorage.setItem(ATTR_KEY, JSON.stringify({ at: Date.now(), values: o }));
      } else {
        var saved = JSON.parse(sessionStorage.getItem(ATTR_KEY) || "null");
        var age = saved && Date.now() - saved.at;
        if (saved && typeof saved.at === "number" && age >= 0 && age < ATTR_TTL && saved.values) {
          ATTR_FIELDS.forEach(function (k) {
            if (typeof saved.values[k] === "string") o[k] = saved.values[k].slice(0, 500);
          });
        } else {
          sessionStorage.removeItem(ATTR_KEY);
        }
      }
    } catch (e) {} // Blocked/full storage must never prevent an enquiry.
    return o;
  }
  utm(); // Capture on arrival, before the visitor navigates to another page.

  /* ---- the enquiry form ---------------------------------------------------
     Rebuilt 14/09/2026. One shared component (build.js quoteForm) on every
     page; this handler owns behaviour, validation and submission.

     The lead-intake contract: `size` is normalised to 10ft/20ft/40ft and
     anything else is stored as null, so ONLY a real length is sent in that
     field. Configuration, quantity, duration, intent, grade, the written-quote
     flag and the "just a question" flag travel in the message text, which
     the sales desk reads. Nothing is ever sent as a guess: "Not sure" arrives
     as exactly that. */
  var SIZE_MAP = { "10ft": "10ft", "20ft": "20ft", "40ft": "40ft" };
  var CONFIG_LABEL = {
    "gp": "General purpose", "high-cube": "High cube", "side-opening": "Side opening",
    "dg": "Dangerous goods", "reefer": "Refrigerated", "unsure": "Not sure which type"
  };
  var GRADE_LABEL = {
    "cargo-worthy": "Cargo-worthy (checked wind and watertight)",
    "new": "New single-trip",
    "as-is": "As-is (cheapest, not sold watertight)",
    "unsure": "Not sure which grade"
  };
  var WHEN_LABEL = {
    "urgent": "URGENT - this week",
    "next-week": "Next week",
    "this-month": "Within a month",
    "later": "Later",
    "unsure": "No fixed date"
  };
  var DURATION_LABEL = {
    "under-1-month": "under a month", "1-3-months": "1-3 months", "3-6-months": "3-6 months",
    "6-12-months": "6-12 months", "over-1-year": "over a year", "": "not sure"
  };
  var INTENT_LABEL = { "buy": "BUY", "hire": "HIRE", "unsure": "NOT SURE (buy or hire)", "question": "QUESTION ONLY - not an order" };

  function fieldWrap(el) { return el.closest(".qgrid > div, .qstage, .qfield") || el.parentNode; }

  function setup(form) {
    var intents = form.querySelectorAll('input[name="intent"]');
    var spec = form.querySelector("[data-spec]");
    var hireOnly = form.querySelectorAll("[data-hire-only]");
    var grade = form.querySelector('select[name="grade"]');
    var asIs = grade ? grade.querySelector('option[data-buy-only]') : null;
    var written = form.querySelector('input[name="written"]');
    var email = form.querySelector('input[name="email"]');
    var phone = form.querySelector('input[name="phone"]');
    var msg = form.querySelector('textarea[name="message"]');
    var stepNo = form.querySelector("[data-step-contact]");

    function intent() {
      var c = form.querySelector('input[name="intent"]:checked');
      return c ? c.value : "buy";
    }
    function apply() {
      var i = intent();
      var q = i === "question";
      if (spec) {
        spec.hidden = q;
        spec.querySelectorAll("select, input").forEach(function (el) { el.disabled = q; });
      }
      if (stepNo) stepNo.textContent = q ? "2." : "3.";
      hireOnly.forEach(function (el) {
        var on = i === "hire";
        el.hidden = !on;
        el.querySelectorAll("select, input").forEach(function (c) { c.disabled = !on || q; });
      });
      if (asIs) {
        // Hire never offers as-is. If it was selected, fall back to cargo-worthy.
        asIs.disabled = i === "hire";
        asIs.hidden = i === "hire";
        if (i === "hire" && grade.value === "as-is") grade.value = "cargo-worthy";
      }
      if (msg) {
        var lbl = form.querySelector('label[for="' + msg.id + '"]');
        if (lbl) {
          var o = lbl.querySelector(".optional");
          if (q) { if (o) o.hidden = true; msg.setAttribute("aria-required", "true"); }
          else { if (o) o.hidden = false; msg.removeAttribute("aria-required"); }
        }
      }
      if (email && written) {
        var lbl2 = form.querySelector('label[for="' + email.id + '"]');
        if (lbl2) lbl2.innerHTML = written.checked ? 'Email <abbr class="req" title="required">*</abbr>' : "Email";
        if (written.checked) email.setAttribute("aria-required", "true"); else email.removeAttribute("aria-required");
      }
    }
    intents.forEach(function (r) { r.addEventListener("change", apply); });
    if (written) written.addEventListener("change", apply);
    apply();
    return { intent: intent };
  }

  function clearErrors(form) {
    var box = form.querySelector(".q-errors");
    if (box) { box.hidden = true; box.innerHTML = ""; }
    form.querySelectorAll("[aria-invalid]").forEach(function (el) {
      el.removeAttribute("aria-invalid");
      var hint = document.getElementById(el.id + "-err");
      if (hint) hint.parentNode.removeChild(hint);
      el.removeAttribute("aria-describedby");
    });
  }
  function flag(el, text) {
    el.setAttribute("aria-invalid", "true");
    var hint = document.createElement("p");
    hint.className = "q-err";
    hint.id = el.id + "-err";
    hint.textContent = text;
    el.parentNode.insertBefore(hint, el.nextSibling);
    el.setAttribute("aria-describedby", hint.id);
  }
  function validate(form, ctx) {
    clearErrors(form);
    var errs = [];
    var f = {};
    new FormData(form).forEach(function (v, k) { f[k] = String(v).trim(); });
    var q = ctx.intent() === "question";
    var el;
    if (!f.suburb) { el = form.querySelector('[name="suburb"]'); errs.push([el, "Tell us the delivery suburb or postcode."]); }
    /* 15/09/2026 — the hero form has a separate postcode box. Optional, but
       if something is typed it has to be a four digit Australian postcode. */
    if (f.postcode && !/^\d{4}$/.test(f.postcode)) { el = form.querySelector('[name="postcode"]'); errs.push([el, "Postcodes are four digits."]); }
    if (!f.name) { el = form.querySelector('[name="name"]'); errs.push([el, "We need a name to reply to."]); }
    var hasPhone = /\d{6,}/.test((f.phone || "").replace(/\D/g, ""));
    var hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email || "");
    if (f.email && !hasEmail) { el = form.querySelector('[name="email"]'); errs.push([el, "That email address doesn't look right."]); }
    if (f.phone && !hasPhone) { el = form.querySelector('[name="phone"]'); errs.push([el, "That phone number doesn't look right."]); }
    if (!f.phone && !f.email) { el = form.querySelector('[name="phone"]'); errs.push([el, "Give us a phone number or an email so we can get back to you."]); }
    if (f.written === "yes" && !hasEmail) { el = form.querySelector('[name="email"]'); errs.push([el, "A written quote needs an email address to go to."]); }
    if (q && !f.message) { el = form.querySelector('[name="message"]'); errs.push([el, "Type your question in the box."]); }
    if (f.quantity !== undefined && f.quantity !== "" && !(parseInt(f.quantity, 10) >= 1)) { el = form.querySelector('[name="quantity"]'); errs.push([el, "How many containers? One or more."]); }
    if (errs.length) {
      var box = form.querySelector(".q-errors");
      var seen = {};
      errs.forEach(function (e) { if (e[0] && !seen[e[0].id]) { seen[e[0].id] = 1; flag(e[0], e[1]); } });
      if (box) {
        box.innerHTML = "<strong>Please check " + (errs.length === 1 ? "one thing" : errs.length + " things") + " before sending:</strong><ul>" +
          errs.map(function (e) { return "<li>" + e[1] + "</li>"; }).join("") + "</ul>";
        box.hidden = false;
      }
      var first = errs[0][0];
      if (first) { try { first.focus({ preventScroll: false }); } catch (e2) { first.focus(); } }
      return null;
    }
    return f;
  }

  document.querySelectorAll("form[data-quote]").forEach(function (form) {
    var ctx = setup(form);
    var busy = false;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (busy) return;                                   // block double-submit
      var trap = form.querySelector('input[name="business_url"]');
      if (trap && trap.value) return;                     // honeypot

      var f = validate(form, ctx);
      if (!f) return;

      var parts = (f.name || "").split(/\s+/);
      var u = utm();
      var i = ctx.intent();
      var q = i === "question";
      var ctxLines = [];
      ctxLines.push("Wants to: " + (INTENT_LABEL[i] || i.toUpperCase()));
      if (!q) {
        if (f.size) ctxLines.push("Length: " + (SIZE_MAP[f.size] || "not sure"));
        if (f.config) ctxLines.push("Type: " + (CONFIG_LABEL[f.config] || f.config));
        if (f.grade) ctxLines.push("Grade: " + (GRADE_LABEL[f.grade] || f.grade));
        if (f.quantity) ctxLines.push("Qty: " + f.quantity);
        if (i === "hire") ctxLines.push("Duration: " + (DURATION_LABEL[f.duration || ""] || f.duration));
        if (f.when) ctxLines.push("When: " + (WHEN_LABEL[f.when] || f.when));
      }
      if (f.written === "yes") ctxLines.push("Wants the quote IN WRITING (email)");
      ctxLines.push("Page: " + location.pathname);
      if (u.utm_source) ctxLines.push("Source: " + u.utm_source + (u.utm_campaign ? " / " + u.utm_campaign : ""));
      if (u.gclid) ctxLines.push("Google Ads click");

      /* The location field accepts a suburb OR a postcode. Send the raw string
         as the suburb, and only populate postcode when the value really is a
         four digit number — unless the form carried its own postcode box
         (the hero form does, from 15/09/2026), in which case that wins. */
      var loc = f.suburb || "";
      var isPostcode = /^\d{4}$/.test(loc);
      var pc = f.postcode || (isPostcode ? loc : null);

      var payload = {
        secret: CONFIG.secret,
        brand: CONFIG.brand,
        domain: CONFIG.domain,
        first_name: parts.shift() || null,
        last_name: parts.join(" ") || null,
        phone: f.phone || null,
        email: f.email || null,
        suburb: loc || null,
        postcode: pc || null,
        size: (!q && SIZE_MAP[f.size]) ? SIZE_MAP[f.size] : "",
        message: (f.message ? f.message + "\n\n" : "") + "— " + ctxLines.join(" | "),
        intent: i,
        configuration: q ? null : (f.config || null),
        grade: q ? null : (f.grade || null),
        quantity: q ? null : (parseInt(f.quantity, 10) || 1),
        duration: (i === "hire" && f.duration) ? f.duration : null,
        when: q ? null : (f.when || null),
        written_quote: f.written === "yes",
        question_only: q,
        source_page: location.pathname,
        page_title: document.title,
        submitted_at: new Date().toISOString(),
        utm_source: u.utm_source || null, utm_medium: u.utm_medium || null,
        utm_campaign: u.utm_campaign || null, gclid: u.gclid || null
      };

      var btn = form.querySelector('button[type="submit"]');
      var was = btn ? btn.textContent : "";
      busy = true;
      form.setAttribute("aria-busy", "true");
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      function done() {
        busy = false;
        form.removeAttribute("aria-busy");
        if (btn) { btn.disabled = false; btn.textContent = was; }
      }
      /* Success ONLY after the server has accepted the lead. */
      function ok() {
        var d = document.createElement("div");
        d.className = "q-ok";
        d.setAttribute("role", "status");
        d.setAttribute("tabindex", "-1");
        d.innerHTML = "<strong>Got it — that's with us.</strong> " +
          (PROMISE ? PROMISE + ". " : "") +
          "Can't wait? Ring <a href='" + PHONE_HREF + "'>" + PHONE + "</a>.";
        form.parentNode.replaceChild(d, form);
        try { d.focus(); } catch (e2) {}
        /* Conversion counts on ACCEPTED submit only, once, with no personal
           data as a parameter. */
        adsConvert("form");
        if (location.pathname !== "/thank-you/") setTimeout(function () { location.href = "/thank-you/"; }, 900);
      }
      /* The failure path shows a real failure and keeps every typed value.
         Never fake a success: a lead that silently vanished is worse than one
         the customer knows to re-send. */
      function bad() {
        done();
        var d = form.querySelector(".q-bad") || document.createElement("div");
        d.className = "q-bad";
        d.setAttribute("role", "alert");
        d.innerHTML = "That didn't send — sorry. Your details are still in the form, so try again in a moment, or ring <a href='" + PHONE_HREF + "'>" + PHONE + "</a> or email <a href='mailto:" + EMAIL + "'>" + EMAIL + "</a>.";
        form.insertBefore(d, form.firstChild);
        try { d.scrollIntoView({ block: "nearest" }); } catch (e4) {}
      }

      if (!CONFIG.endpoint || !CONFIG.brand) { bad(); return; }

      fetch(CONFIG.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(function (r) {
        if (!r.ok) { bad(); return; }
        return r.json().then(function (j) {
          if (j && j.success === false) bad(); else ok();
        }, function () { ok(); });
      }).catch(bad);
    });
  });

  /* "#quote" links: the sticky header would otherwise hide the top of the
     form (CSS scroll-margin handles the offset); this moves keyboard focus to
     the first control so the jump is real for everyone, not just sighted
     mouse users. */
  function focusQuote() {
    var target = document.getElementById("quote");
    if (!target) return;
    var first = target.querySelector('input[type="radio"]:checked, select, input:not([type="hidden"]):not([type="radio"])');
    if (first) { try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); } }
  }
  document.querySelectorAll('a[href="#quote"]').forEach(function (a) {
    a.addEventListener("click", function () { setTimeout(focusQuote, 350); });
  });
  if (location.hash === "#quote") setTimeout(focusQuote, 200);

  /* The mobile action bar sits over the bottom of the viewport, which is
     where the on-screen keyboard pushes the focused field. Hide it while a
     form control has focus so it can never cover what the person is typing. */
  document.addEventListener("focusin", function (e) {
    if (e.target && e.target.closest && e.target.closest("form[data-quote]")) document.body.classList.add("typing");
  });
  document.addEventListener("focusout", function () {
    setTimeout(function () {
      var a = document.activeElement;
      if (!(a && a.closest && a.closest("form[data-quote]"))) document.body.classList.remove("typing");
    }, 50);
  });

  /* Click-to-load video facade. James asked to keep the film on the front page.
     Loading a YouTube iframe on first paint costs roughly half a megabyte and
     several hundred milliseconds of main-thread time before anybody has asked
     to watch anything, which is a Core Web Vitals problem on the page that
     matters most. So the markup ships a poster image and a play button, and the
     iframe is injected only when someone actually clicks. Nothing is requested
     from YouTube until then. */
  document.querySelectorAll("[data-video]").forEach(function (box) {
    box.addEventListener("click", function () {
      var id = box.getAttribute("data-video");
      if (!id || box.dataset.loaded) return;
      box.dataset.loaded = "1";
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&modestbranding=1";
      f.title = box.getAttribute("data-title") || "Video";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      f.setAttribute("allowfullscreen", "");
      f.setAttribute("loading", "lazy");
      box.innerHTML = "";
      box.appendChild(f);
    });
    box.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); box.click(); }
    });
  });

  /* Scroll reveal. Purely presentational — the .reveal class starts elements
     slightly offset and this adds .in when they scroll into view. If JS never
     runs, nothing is hidden: the CSS also clears .reveal entirely under
     prefers-reduced-motion, and the no-JS fallback below reveals everything
     immediately so content is never dependent on this. */
  /* Opt in to the hidden state only now that this script is definitely running
     — see the note in style.css. Set before the observer so there is no frame
     where content is visible and then hides. */
  document.documentElement.classList.add("js-reveal");
  var reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach(function (el) { io.observe(el); });
    // Anything already in view on load reveals straight away.
    setTimeout(function () {
      reveals.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add("in");
      });
    }, 60);
  }
})();
