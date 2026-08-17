#!/usr/bin/env node
/* ============================================================================
   Koala Containers — static site generator.  node build.js → ./dist
   TEST_BUILD=1 → every page noindex + robots Disallow.  OUT_DIR overrides.

   The group's flagship. Forked from the Fair Dinkum engine on 17/08/2026
   because that build carries seven brands' worth of fixes the older Mackay
   engine does not — content-hash cache busting, the review freshness guard,
   the locality copy-rotation collision check and the regional data split.

   Every brand string comes from data/site.json. Nothing about the brand is
   hardcoded below, which is what lets this engine be lifted to another brand
   by swapping the data directory — and is also why copying a DATA file
   between brands is the one thing that routes leads to the wrong business.

   PAGE SKELETON — deliberately its own. Structural distinctness is both a
   design goal and an SEO requirement, and the brand this most has to differ
   from is Fair Dinkum, which went live the same week. That site is a two-tier
   masthead with a photographic mega-menu, a split hero with a white quote card
   over the image, alternating full-bleed editorial photo bands and a
   three-column footer. None of those appear here.

     - SINGLE-TIER sticky black masthead: logo, flat nav, and the 1300 number
       as a yellow plate pinned right. No identity row, no mega-menu.
     - VIDEO-LED hero on black: headline and quote card above, then the film
       full width beneath as a click-to-load facade. James asked for the video
       to be the centrepiece; the facade is what stops that costing the LCP.
     - YELLOW PLATE dividers carrying condensed display type, taken from the
       bar under the wordmark in the logo. These replace the photo band.
     - THE DEPOT STRIP: nine towns where stock physically sits. The one piece
       of content on the site no competitor can copy.
     - SPEC-TABLE-LED product pages: the dimension table comes first, above
       the prose, because that is what the buyer scrolled for.
     - HARD 3px BORDERS on every card instead of shadows and rounded corners.
     - A FOUR-COLUMN footer.

   COLOUR. Brand yellow #FBDB59 (CRM brands.brand_color, code KOA) is a light
   colour and clears nothing on white. The system inverts instead of fighting
   it: yellow on black, black on yellow. Full measured contrast table at the
   top of static/css/style.css.

   PHOTOGRAPHY. IMG() checks the file exists on disk at build time and emits
   nothing if it does not, so a missing photo degrades to the CSS placeholder
   rather than a broken image. The library audit is incomplete — see
   claude/photo-library.md — so most slots are expected to be empty today.
   ========================================================================= */

const fs = require("fs");
const path = require("path");

const S = require("./data/site.json");
const P = require("./data/products.json");

/* Localities are split across regional files under data/locations/ rather than
   one 300KB blob — easier to edit, easier to review in a diff, and it keeps any
   single file inside what tooling will handle. The ORDER of this list sets the
   order localities appear in the footer, the delivery-areas hub and the home
   page grid. It deliberately does NOT affect the rotated locality copy: that is
   keyed on the slug via rank(), so reordering or adding a region cannot
   silently rewrite the wording of the existing pages. */
const LOC_REGIONS = ["cap-a", "cap-b", "seq", "nnsw", "qld-coast", "qld-inland", "nsw-vic", "vic-tas-sa", "wa-nt"];
const LOCS = LOC_REGIONS.reduce((a, r) => a.concat(require(`./data/locations/${r}.json`).locations), []);
(function checkLocalities() {
  const seen = new Set();
  LOCS.forEach((l) => {
    if (seen.has(l.slug)) throw new Error(`duplicate locality slug: ${l.slug}`);
    seen.add(l.slug);
    ["slug", "name", "state", "postcode", "depot", "leadTime", "truck", "metaDesc", "line", "uses", "access"].forEach((k) => {
      if (!l[k]) throw new Error(`locality ${l.slug} is missing "${k}"`);
    });
    if (!Array.isArray(l.sections) || !l.sections.length) throw new Error(`locality ${l.slug} has no sections`);
    if (!Array.isArray(l.faqs) || !l.faqs.length) throw new Error(`locality ${l.slug} has no faqs`);
    if (!Array.isArray(l.near) || !l.near.length) throw new Error(`locality ${l.slug} has no near list`);
  });
})();
const POSTS = require("./data/posts.js");

const OUT = process.env.OUT_DIR || "dist";
const DIST = path.isAbsolute(OUT) ? OUT : path.join(__dirname, OUT);
const TEST = !!process.env.TEST_BUILD;
/* DESIGN VARIANTS — James, 17/08/2026: "the layout isn't right for me... how
   square the get a price box is... doesn't look modern enough". Rather than
   argue in prose, three are built and rendered so he can look at them.
   VARIANT=soft    surface only: radius, depth, hairlines, pill buttons
   VARIANT=compact soft + a three-field hero form, video-dominant
   VARIANT=cinema  soft + no form in the hero at all, full-bleed video
   Unset = the original hard-edged build. */
/* DEFAULT IS "classic" — James chose it 17/08/2026 after seeing five treatments
   rendered side by side. Plain `node build.js` and the CI workflow therefore
   produce the chosen design; the others stay reachable with VARIANT=<name> so a
   future comparison costs one command rather than a rebuild. VARIANT=raw gives
   the original hard-edged build back. */
const VARIANT = process.env.VARIANT || "classic";
const VCSS = { soft: ["v-soft.css"], compact: ["v-soft.css", "v-compact.css"], cinema: ["v-soft.css", "v-cinema.css"], hybrid: ["v-soft.css", "v-compact.css", "v-hybrid.css"], raw: [], classic: ["v-soft.css", "v-classic.css"], wide: ["v-soft.css", "v-compact.css", "v-hybrid.css", "v-wide.css"] }[VARIANT] || [];
const D = S.domain;
const pages = [];

const BRAND = S.name;
const SHORT = S.short || BRAND.replace(/\s+Containers$/i, "");

/* E.164 for schema. Handles an 0X mobile and a 13/1300/1800 number alike. */
const PHONE_DIGITS = String(S.phoneHref).replace(/\D/g, "");
const TEL_E164 = "+61" + (PHONE_DIGITS.charAt(0) === "0" ? PHONE_DIGITS.slice(1) : PHONE_DIGITS);

/* Trading hours are group-standard. "hours" and "hoursSchema" must ALWAYS be
   set together or both left absent — the hours a human reads and the hours
   Google reads have to come from the same confirmed fact. Nothing below
   invents them; masthead, contact page and LocalBusiness all omit hours when
   the value is missing. */
const HOURS = S.hours || null;
const SERVICE_AREA = S.serviceArea || "Australia-wide";

const PROMISE = S.responsePromise;
const PROMISE_DETAIL = S.responseDetail;

/* Reviews. James, 13/08/2026: turn them on. The numbers come from the verified
   Google Business Profile — 4.8 from 34 — so unlike every previous case in this
   programme the claim is evidenced rather than invented.

   The danger with a published review count has never been the first day. It is
   day four hundred, when the figure is wrong, nobody remembers where it came
   from, and an unevidenced claim is sitting on a money page. So the freshness
   is enforced rather than trusted: `asOf` must be within `maxAgeDays` or THE
   BUILD FAILS. Refresh the numbers and the date together, or set show:false.
   That is what makes this safe to leave switched on. */
const SHOW_REVIEWS = !!(S.reviews && S.reviews.show === true);
const REV = S.reviews || {};
if (SHOW_REVIEWS) {
  if (!(REV.rating > 0) || !(REV.count > 0) || !REV.asOf) {
    throw new Error("reviews.show is true but rating, count or asOf is missing");
  }
  const ageDays = Math.floor((Date.now() - Date.parse(REV.asOf + "T00:00:00Z")) / 86400000);
  const maxAge = REV.maxAgeDays || 120;
  if (ageDays > maxAge) {
    throw new Error(
      `Review figures are ${ageDays} days old (limit ${maxAge}). ` +
      `Re-read the rating and count off the Google Business Profile, update ` +
      `rating/count/asOf in data/site.json together, or set reviews.show to false. ` +
      `A stale review count is an unevidenced claim.`
    );
  }
}
/* One string, used everywhere the rating appears, so it cannot drift. */
const reviewLine = () => SHOW_REVIEWS
  ? `${REV.rating} out of 5 from ${REV.count} Google reviews`
  : "";

const ADDR = S.address || {};
function postalAddress() {
  const a = { "@type": "PostalAddress" };
  if (ADDR.street) a.streetAddress = ADDR.street;
  if (ADDR.suburb) a.addressLocality = ADDR.suburb;
  if (ADDR.state) a.addressRegion = ADDR.state;
  if (ADDR.postcode) a.postalCode = ADDR.postcode;
  a.addressCountry = "AU";
  return a;
}
/* Australian address order: street, then suburb STATE POSTCODE with spaces,
   not commas. "Cornubia, QLD, 4130" is not how an address is written here and
   it looks wrong in schema, in the footer and on a contact page. */
const ADDR_LINE = [ADDR.street, [ADDR.suburb, ADDR.state, ADDR.postcode].filter(Boolean).join(" ")].filter(Boolean).join(", ");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const aud = (n) => "$" + Number(n).toLocaleString("en-AU");
const auDate = (iso) => { const d = new Date(iso + "T00:00:00Z"); return String(d.getUTCDate()).padStart(2, "0") + "/" + String(d.getUTCMonth() + 1).padStart(2, "0") + "/" + d.getUTCFullYear(); };
const para = (v) => (Array.isArray(v) ? v : [v]).map((x) => `<p>${esc(x)}</p>`).join("");

/* Locality "access" copy arrives from the data files as one 220–360 word
   string. Rendered as a single <p> it is a wall — so split it at sentence
   boundaries into roughly even paragraphs of about 90 words. Splitting on
   ". " alone would break on "e.g." and on decimals, hence the lookahead for
   a capital or a digit that starts a new sentence. */
function paras(v, targetWords) {
  if (Array.isArray(v)) return para(v);
  const sentences = String(v).match(/[^.!?]+[.!?]+(?=\s+[A-Z0-9]|\s*$)/g) || [String(v)];
  const target = targetWords || 90;
  const chunks = [];
  let buf = [], n = 0;
  sentences.forEach((s, i) => {
    buf.push(s.trim());
    n += s.trim().split(/\s+/).length;
    const remaining = sentences.length - i - 1;
    if (n >= target && remaining >= 2) { chunks.push(buf.join(" ")); buf = []; n = 0; }
  });
  if (buf.length) chunks.push(buf.join(" "));
  return para(chunks);
}

/* ---- asset cache busting ------------------------------------------------
   .htaccess sets `ExpiresByType text/css "access plus 1 year"`, which is right
   for performance and lethal without a version in the URL: a returning visitor
   keeps the old stylesheet for a year and never sees a change. This bit the
   staging site — the HTML updated, the CSS did not, and a fixed hero scrim
   appeared not to have deployed at all.

   So the URL carries a short content hash. Same bytes, same URL, still cached;
   different bytes, different URL, fetched immediately. Computed from the file
   on disk at build time so it cannot be forgotten. */
function assetHash(rel) {
  const f = path.join(__dirname, "static", rel);
  if (!fs.existsSync(f)) return "0";
  let h = 0x811c9dc5;
  const buf = fs.readFileSync(f);
  for (let i = 0; i < buf.length; i++) { h ^= buf[i]; h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(36);
}
const CSS_V = assetHash("css/style.css");
const JS_V = assetHash("js/app.js");

/* IMAGES GET THE SAME TREATMENT, which the sibling sites do not do yet.
   `.htaccess` caches image/webp for a year by filename too, so replacing a
   photograph at the same path never reaches a returning visitor — the exact
   same failure as the stylesheet, and the reason a swapped hero can look like
   a deploy that silently did nothing. This is open defect #8 on the programme
   board, fixed here first because this site ships more photography than any
   other, and worth back-porting to the other twelve.

   Hashes are computed once per file and memoised: a 67-locality build asks for
   the same pool image hundreds of times and re-reading it each time would add
   real seconds to every build. */
const IMG_V_CACHE = Object.create(null);
function photoHash(name) {
  if (IMG_V_CACHE[name] === undefined) IMG_V_CACHE[name] = assetHash(path.join("img", "photos", name + ".webp"));
  return IMG_V_CACHE[name];
}

function out(urlPath, html) {
  const dir = urlPath ? path.join(DIST, urlPath) : DIST;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  pages.push(urlPath === "" ? "/" : `/${urlPath}/`);
}

/* ---------------------------------------------------------------- photos --
   A photo is emitted only if the .webp is actually on disk. Missing photos
   fall through to the CSS gradient placeholder — no 404s, no broken images,
   and the site is shippable before the library is finished. */
const PHOTOS_ON = S.photos === true;
const PHOTO_DIR = path.join(__dirname, "static", "img", "photos");
const havePhoto = (name) => PHOTOS_ON && fs.existsSync(path.join(PHOTO_DIR, name + ".webp"));
const PHOTO_USED = new Set();
function IMG(name, alt, opts) {
  const o = opts || {};
  if (!havePhoto(name)) return "";
  PHOTO_USED.add(name);
  return `<img src="/img/photos/${name}.webp?v=${photoHash(name)}" alt="${esc(alt)}" width="${o.w || 1600}" height="${o.h || 1200}"${o.eager ? '' : ' loading="lazy"'} decoding="async">`;
}

/* Locality pages draw imagery from shared POOLS rather than a photo per town.
   There are 34 localities with four image slots each — 136 photographs — and
   the library does not hold 136 distinct usable shots. It would also be
   dishonest to imply a generic yard photo was taken in that particular town.
   So each locality picks deterministically from a pool by slug hash: the pages
   differ from one another, the choice is stable across builds, and nothing is
   claimed about where a photo was taken. Pool members are named
   <pool>-01, <pool>-02 … and are discovered on disk, so adding a photo to a
   pool is a file copy and needs no code change. */
const POOL_CACHE = Object.create(null);
function poolMembers(name) {
  if (POOL_CACHE[name]) return POOL_CACHE[name];
  const out = [];
  for (let i = 1; i <= 60; i++) {
    const n = `${name}-${String(i).padStart(2, "0")}`;
    if (havePhoto(n)) out.push(n);
  }
  POOL_CACHE[name] = out;
  return out;
}
function IMGP(name, salt, key, alt, opts) {
  const m = poolMembers(name);
  if (!m.length) return "";
  return IMG(m[rank(salt, key) % m.length], alt, opts);
}

/* ----------------------------------------------------------- brand mark --
   The Fair Dinkum wordmark, rebuilt as SVG from the live logo: "Fair Dinkum"
   in near-black over "Containers" in brand green, with a corrugated container
   glyph on the right. Vector, so it stays crisp at any size — the live site
   serves a 768px raster. Text is derived from site.json, never typed in. */
const MARK_TOP = SHORT;
const MARK_SUB = BRAND.slice(SHORT.length).trim() || "Containers";
/* The wordmark. STAND-IN — James supplied the new logo as a black-background
   PNG in chat and it is not in this repo. This SVG reproduces its structure
   (heavy condensed caps, KOALA in brand yellow over CONTAINERS in white, with
   the yellow rule beneath) using the same Anton face the site loads, so it
   sits correctly at every size and weighs nothing. Drop the real artwork in at
   static/img/logo.svg and logo-light.svg and this falls through to it
   automatically — see logoOr() below. Do not ship to production on the
   stand-in without James seeing it. */
const LOGO_FILE = (n) => fs.existsSync(path.join(__dirname, "static", "img", n));
const mark = (topFill, subFill, ruleFill) => `<svg viewBox="0 0 300 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(BRAND)}">
  <text x="0" y="38" font-family="Anton, 'Arial Narrow', sans-serif" font-size="42" letter-spacing="1.5" fill="${topFill}">${esc(MARK_TOP.toUpperCase())}</text>
  <text x="0" y="78" font-family="Anton, 'Arial Narrow', sans-serif" font-size="42" letter-spacing="0.5" fill="${subFill}">${esc(MARK_SUB.toUpperCase())}</text>
  <rect x="0" y="84" width="96" height="6" fill="${ruleFill}"/>
</svg>`;
const markDark  = LOGO_FILE("logo.svg")       ? `<img src="/img/logo.svg" width="300" height="90" alt="${esc(BRAND)}">`       : mark("#FBDB59", "#FFFFFF", "#FBDB59");
const markLight = LOGO_FILE("logo-light.svg") ? `<img src="/img/logo-light.svg" width="300" height="90" alt="${esc(BRAND)}">` : mark("#FBDB59", "#FFFFFF", "#FBDB59");

/* ------------------------------------------------------------- the shell -- */
function head(t, d, canon, schema, noindex) {
  return `<!DOCTYPE html><html lang="en-AU"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(t)}</title>
<meta name="description" content="${esc(d)}">
<link rel="canonical" href="${D}${canon}">
${noindex || TEST ? '<meta name="robots" content="noindex,nofollow">' : '<meta name="robots" content="index,follow,max-image-preview:large">'}
<meta property="og:title" content="${esc(t)}"><meta property="og:description" content="${esc(d)}">
<meta property="og:url" content="${D}${canon}"><meta property="og:site_name" content="${esc(BRAND)}">
<meta property="og:locale" content="en_AU"><meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0B0B08">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/style.css?v=${CSS_V}">
${VCSS.map((f) => `<link rel="stylesheet" href="/css/${f}?v=${assetHash("css/" + f)}">`).join("")}
<link rel="icon" type="image/svg+xml" href="/img/favicon.svg">
<link rel="apple-touch-icon" href="/img/favicon.svg">
${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ""}
</head><body>
<a class="skip" href="#main">Skip to content</a>`;
}

const biz = () => {
  const b = {
    "@type": "LocalBusiness",
    "@id": `${D}/#biz`,
    name: BRAND,
    url: D,
    telephone: TEL_E164,
    email: S.email,
    priceRange: "$$",
    description: S.tagline,
    address: postalAddress(),
    ...(S.geo ? { geo: { "@type": "GeoCoordinates", latitude: S.geo.lat, longitude: S.geo.lng } } : {}),
    /* openingHours is absent unless site.json carries a real hoursSchema
       array. Publishing invented hours puts wrong opening times into Google. */
    ...(Array.isArray(S.hoursSchema) && S.hoursSchema.length ? { openingHours: S.hoursSchema } : {}),
    areaServed: [{ "@type": "Country", name: "Australia" }].concat(LOCS.map((l) => ({ "@type": "City", name: l.name })))
  };
  if (SHOW_REVIEWS && S.reviews.rating && S.reviews.count) {
    b.aggregateRating = { "@type": "AggregateRating", ratingValue: S.reviews.rating, reviewCount: S.reviews.count };
  }
  return b;
};
const crumbsLd = (c) => ({ "@type": "BreadcrumbList", itemListElement: c.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x[0], item: `${D}${x[1]}` })) });
const faqLd = (faqs) => (faqs && faqs.length ? { "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) } : null);
const productLd = (x) => ({
  "@type": "Product", name: x.title, description: x.lead,
  brand: { "@type": "Brand", name: BRAND },
  offers: { "@type": "AggregateOffer", priceCurrency: "AUD", lowPrice: x.usedFrom, highPrice: x.newFrom, availability: "https://schema.org/InStock", seller: { "@id": `${D}/#biz` } }
});
const g = (...items) => ({ "@context": "https://schema.org", "@graph": [biz(), ...items.filter(Boolean)] });

/* ---------------------------------------- single-tier sticky masthead ----
   Deliberately NOT the sibling sites' two-tier identity row + photographic
   mega-menu. One black bar, logo left, flat nav, and the 1300 number as a
   yellow plate on the right that never leaves the screen. The number is the
   conversion event on this site — 21,951 enquiry threads say the phone and the
   form are the whole business — so it is never more than one glance away. */
const NAV = [
  { href: "/shipping-containers/", label: "Containers" },
  { href: "/container-sales/", label: "Buying" },
  { href: "/shipping-container-hire/", label: "Hire" },
  { href: "/container-modifications/", label: "Modifications" },
  { href: "/delivery/", label: "Delivery" },
  { href: "/depots/", label: "Depots" },
  { href: "/blog/", label: "Guides" },
  { href: "/contact/", label: "Contact" }
];

function mast() {
  return `<header class="top">
<div class="wrap">
  <a class="top-brand" href="/" aria-label="${esc(BRAND)} home">${markDark}</a>
  <ul class="menu">${NAV.map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join("")}</ul>
  <a class="top-tel" href="${S.phoneHref}"><small>Talk to a person</small>${esc(S.phone)}</a>
  <button class="burger" aria-label="Menu" aria-expanded="false">Menu</button>
</div>
</header>`;
}

/* The yellow plate. The signature divider on this site, lifted from the bar
   under the wordmark in the logo. Used where the sibling sites use a full-bleed
   alternating photo band. */
const plate = (big, small) => `<div class="plate"><div class="wrap"><b>${esc(big)}</b>${small ? `<span>${esc(small)}</span>` : ""}</div></div>`;

/* The depot strip. Nine towns where stock physically sits. This is the single
   piece of content on the site a competitor cannot copy, because it is not a
   claim — it is a list of yards. Addresses are deliberately absent for every
   depot except the head yard: the others are third-party sites and publishing
   their addresses is both wrong and a Google Business Profile risk. */
function depotStrip(heading) {
  const D9 = Array.isArray(S.depots) ? S.depots : [];
  if (!D9.length) return "";
  return `<section class="depots"><div class="wrap">
  <h2>${esc(heading || "Stock on the ground in nine places")}</h2>
  <div class="depotrow">${D9.map((d) => `<div><b>${esc(d.town)}</b><small>${esc(d.state)} — ${esc(d.note)}</small></div>`).join("")}</div>
  <p>${esc(S.nationalDetail)} Only ${esc(ADDR.suburb)} is a walk-in yard; everywhere else, inspection is by arrangement. <a href="/depots/">Where our depots are</a></p>
</div></section>`;
}

/* The film, as a click-to-load facade. James asked to keep the YouTube video on
   the front page and wanted it bigger. Embedding the iframe on load would cost
   roughly half a megabyte and a large slice of main-thread time before anybody
   asked to watch anything, on the one page where Core Web Vitals matter most.
   So this ships a poster and a button, and app.js injects the iframe on click.
   Nothing is requested from YouTube until someone presses play. */
function videoBlock() {
  const V = S.video || {};
  if (!V.show || !V.id) return "";
  const poster = havePhoto("video-poster")
    ? IMG("video-poster", V.title || "Video", { w: 1280, h: 720 })
    : `<img src="https://i.ytimg.com/vi/${esc(V.id)}/maxresdefault.jpg" width="1280" height="720" alt="${esc(V.title || "Video")}" loading="lazy">`;
  return `<div class="videowrap">
  <div class="video" data-video="${esc(V.id)}" data-title="${esc(V.title || "Video")}" role="button" tabindex="0" aria-label="Play video: ${esc(V.title || "Video")}">
    ${poster}
    <span class="video-play"><span aria-hidden="true">&#9654;</span></span>
  </div>
  ${V.caption ? `<p class="video-cap">${esc(V.caption)}</p>` : ""}
</div>`;
}

const promiseStrip = () => `<div class="promise"><div class="wrap"><b>${esc(PROMISE)}.</b><span>${esc(PROMISE_DETAIL)}</span></div></div>`;

/* ------------------------------------------------------------- the ask ---
   Two conversion decisions are baked in and should not be undone without a
   reason. Every dropdown ends in a "Not sure" option, because not knowing
   which size or grade you need is the commonest reason a container buyer
   abandons a form. And the timeframe question leads with "Today", because it
   qualifies urgency at no cost and tells the sales desk who to ring first.
   Qualifying questions come BEFORE contact details, always. */
function quoteForm(u, compact, mode) {
  /* "mini" is the three-field opener used by the compact hero. Qualifying
     questions still come before contact details everywhere else; here the job
     of the form is only to start a conversation, and the size/grade questions
     are asked on the call instead. Fewer fields in the hero, same lead. */
  if (mode === "mini") {
    return `<form class="askcard askcard-mini" data-quote novalidate>
      <div class="qtoggle">
        <input type="radio" name="intent" value="buy" id="qi-b${u}" checked><label for="qi-b${u}">Buying</label>
        <input type="radio" name="intent" value="hire" id="qi-h${u}"><label for="qi-h${u}">Hiring</label>
      </div>
      <input type="hidden" name="size" value="unsure">
      <div class="mini-fields">
        <label class="vh" for="q-suburb${u}">Delivery suburb or postcode</label>
        <input name="suburb" id="q-suburb${u}" type="text" autocomplete="address-level2" placeholder="Delivery suburb or postcode">
        <label class="vh" for="q-name${u}">Your name</label>
        <input name="name" id="q-name${u}" type="text" autocomplete="name" placeholder="Your name" required>
        <label class="vh" for="q-phone${u}">Phone</label>
        <input name="phone" id="q-phone${u}" type="tel" autocomplete="tel" placeholder="Phone" required>
        <button type="submit" class="btn btn-primary">Get a price</button>
      </div>
      <input type="text" name="business_url" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
    </form>`;
  }
  return `<form class="askcard" data-quote novalidate>
    ${compact ? "" : `<h3>Tell us about the job</h3><p class="askcard-note">Four quick questions about the container, then how to reach you. ${esc(PROMISE)}.</p>`}
    <p class="qstage-h">1. Buying or hiring?</p>
    <div class="qtoggle">
      <input type="radio" name="intent" value="buy" id="qi-b${u}" checked><label for="qi-b${u}">Buying</label>
      <input type="radio" name="intent" value="hire" id="qi-h${u}"><label for="qi-h${u}">Hiring</label>
    </div>
    <div class="qgrid">
      <div>
        <label for="q-size${u}">2. What size?</label>
        <select name="size" id="q-size${u}">
          <option value="20ft">20ft — the usual answer</option>
          <option value="10ft">10ft</option>
          <option value="40ft">40ft</option>
          <option value="high-cube">High cube</option>
          <option value="side-opening">Side opening</option>
          <option value="dg">Dangerous goods</option>
          <option value="unsure">Not sure — help me work it out</option>
        </select>
      </div>
      <div>
        <label for="q-grade${u}">3. What grade?</label>
        <select name="grade" id="q-grade${u}">
          <option value="cargo-worthy">Cargo-worthy used</option>
          <option value="new">New single-trip</option>
          <option value="as-is">As-is — cheapest</option>
          <option value="unsure">Not sure — explain the difference</option>
        </select>
      </div>
      <div>
        <label for="q-when${u}">4. When do you need it?</label>
        <select name="when" id="q-when${u}">
          <option value="today">Today</option>
          <option value="this-week">This week</option>
          <option value="next-week">Next week</option>
          <option value="next-month">Next month</option>
          <option value="unsure">Not sure yet</option>
        </select>
      </div>
      <div>
        <label for="q-suburb${u}">Delivery suburb or postcode</label>
        <input name="suburb" id="q-suburb${u}" type="text" autocomplete="address-level2" placeholder="e.g. Cornubia or 4130">
      </div>
    </div>
    <div class="qstage">
      <p class="qstage-h">And how do we reach you?</p>
      <div class="qgrid">
        <div><label for="q-name${u}">Your name</label><input name="name" id="q-name${u}" type="text" autocomplete="name" required></div>
        <div><label for="q-phone${u}">Phone</label><input name="phone" id="q-phone${u}" type="tel" autocomplete="tel" required></div>
      </div>
      <label for="q-email${u}">Email (optional)</label><input name="email" id="q-email${u}" type="email" autocomplete="email">
      <label for="q-msg${u}">Anything we should know?</label><textarea name="message" id="q-msg${u}" rows="2" placeholder="What's going in it, and what the access is like"></textarea>
    </div>
    <input type="text" name="business_url" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
    <button type="submit" class="btn btn-primary btn-wide btn-lg">Send it through</button>
    <p class="qnote">${esc(PROMISE_DETAIL)} Your details stay with us.</p>
  </form>`;
}

function ask(heading, sub, idSuffix) {
  const u = idSuffix ? "-" + idSuffix : "";
  return `<section class="ask" id="quote"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Get a price</p><h2>${esc(heading)}</h2><p class="ask-sub">${esc(sub)}</p></div>
  ${quoteForm(u)}
  <p class="ask-or">Or skip the form and ring us — <a href="${S.phoneHref}">${esc(S.phone)}</a>${HOURS ? ", " + esc(HOURS) : ""}</p>
</div></section>`;
}

/* ---------------------------------------------------- four-column footer -- */
function foot() {
  const col = (label, items) => `<div><h4>${esc(label)}</h4><ul>${items.map((x) => `<li><a href="${x[0]}">${esc(x[1])}</a></li>`).join("")}</ul></div>`;
  const D9 = Array.isArray(S.depots) ? S.depots : [];
  return `<footer class="foot">
<div class="wrap">
  <div class="foot-top">
    <div>
      <div class="foot-brand"><a href="/" aria-label="${esc(BRAND)} home">${markLight}</a></div>
      <p class="foot-tag">${esc(S.tagline)}</p>
      <div class="foot-contact">
        <a class="foot-tel" href="${S.phoneHref}">${esc(S.phone)}</a>
        <a class="foot-mail" href="mailto:${S.email}">${esc(S.email)}</a>
        ${ADDR_LINE ? `<address class="foot-addr">${esc(ADDR_LINE)}</address>` : ""}
        ${HOURS ? `<span class="foot-addr">${esc(HOURS)}</span>` : ""}
      </div>
    </div>
    ${col("Containers", P.sizes.map((x) => [`/${x.slug}/`, x.name]).concat(P.types.map((x) => [`/${x.slug}/`, x.name])).concat([["/shipping-containers/", "The full range"]]))}
    ${col("Buying and hiring", (P.conditions || []).map((x) => [`/${x.slug}/`, x.name]).concat([["/container-sales/", "Buying a container"], ["/shipping-container-hire/", "Container hire"], ["/container-grades/", "Grades explained"], ["/container-modifications/", "Modifications"], ["/dimensions/", "Dimensions and weights"]]))}
    ${col(SHORT, [["/about/", "About " + SHORT], ["/depots/", "Our depots"], ["/delivery/", "Delivery and access"], ["/delivery-areas/", "Where we deliver"], ["/container-inspection/", "Inspection checklist"], ["/how-it-works/", "How ordering works"], ["/blog/", "Guides"], ["/faqs/", "FAQs"], ["/contact/", "Contact"], ["/privacy/", "Privacy"]])}
  </div>
  ${D9.length ? `<div class="foot-locs"><h4>Stock on the ground</h4><div class="runlinks">${D9.map((d) => `<span>${esc(d.town)}, ${esc(d.state)}</span>`).join("")}</div></div>` : ""}
  <div class="foot-locs">
    <h4>Where we deliver</h4>
    <div class="runlinks">${LOCS.map((l) => `<a href="/${l.slug}/">${esc(l.name)}</a>`).join("")}<a href="/delivery-areas/">Everywhere else</a></div>
  </div>
  <div class="foot-base">© ${new Date().getFullYear()} ${esc(BRAND)} — shipping container sales, hire and delivery ${esc(SERVICE_AREA)}. ${esc(PROMISE)}. Prices shown are guide prices in AUD and exclude GST; delivery is quoted with the container.</div>
</div></footer>
<div class="actionbar"><a class="btn btn-dark" href="${S.phoneHref}">Call ${esc(S.phone)}</a><a class="btn btn-primary" href="/contact/">Get a price</a></div>
<script id="site-config" type="application/json">${JSON.stringify({ endpoint: S.leadEndpoint, brand: S.leadBrand, domain: S.leadSource, phone: S.phone, phoneHref: S.phoneHref, email: S.email, promise: PROMISE })}</script>
<script src="/js/app.js?v=${JS_V}" defer></script></body></html>`;
}

const shell = (o, body) => head(o.t, o.d, o.c, o.schema, o.noindex) + mast() + `<main id="main">` + body + `</main>` + foot();
const crumbHtml = (c) => `<nav class="crumb" aria-label="Breadcrumb"><div class="wrap">${c.map((x, i) => (i === c.length - 1 ? `<strong>${esc(x[0])}</strong>` : `<a href="${x[1]}">${esc(x[0])}</a> <span aria-hidden="true">/</span> `)).join("")}</div></nav>`;

/* ------------------------------------------------------------ primitives -- */
const sec = (cls, inner) => `<section class="sec${cls ? " " + cls : ""}"><div class="wrap">${inner}</div></section>`;
const secHead = (eyebrow, h, p) => `<div class="sec-head reveal">${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}<h2>${esc(h)}</h2>${p ? `<p>${esc(p)}</p>` : ""}</div>`;
const qaHtml = (faqs) => `<div class="qa">${faqs.map((f) => `<div class="reveal"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join("")}</div>`;
const typeChips = () => `<div class="chips">${P.types.map((x) => `<a href="/${x.slug}/">${esc(x.name)}</a>`).join("")}</div>`;

/* Not a photo band. Fair Dinkum's rhythm is a full-bleed alternating
   image/copy band; this site's is a contained two-column block with a hard
   3px rule around the photograph, sitting inside the normal section grid. The
   `alt` flag is accepted and ignored — there is no alternating side here — so
   that callers lifted from the sibling engine keep working unchanged. */
function band(o) {
  const shot = o.poolPhoto
    ? IMGP(o.poolPhoto[0], o.poolPhoto[1], o.poolPhoto[2], o.alt_text || o.h, { w: 1200, h: 900 })
    : IMG(o.photo, o.alt_text || o.h, { w: 1200, h: 900 });
  const cls = o.dark ? "sec sec-dark" : o.wash ? "sec sec-wash" : "sec";
  return `<section class="${cls}"><div class="wrap"><div class="twocol">
    <div class="reveal">
      ${o.eyebrow ? `<p class="eyebrow">${esc(o.eyebrow)}</p>` : ""}
      <h2>${esc(o.h)}</h2>
      ${para(o.p)}
      ${o.extra || ""}
      ${o.cta ? `<p style="margin-top:1.4rem"><a class="btn ${o.dark ? "btn-ondark" : "btn-ghost"}" href="${o.cta[0]}">${esc(o.cta[1])}</a></p>` : ""}
    </div>
    ${shot ? `<div class="bandshot reveal">${shot}</div>` : ""}
  </div></div></section>`;
}

/* The as-is caveat is a single string in products.json. It must appear on the
   home page, the range hub, every size page, the buying page and the grades
   page. It is deliberately NOT on the locality pages: 34 pages carrying the
   same 95-word caveat is the single largest source of near-duplicate overlap
   between them. Locality pages carry locCaveat() instead — one sentence that
   still says grade decides watertight, pointing at the grades page. */
const asIs = () => `<p class="caveat reveal"><strong>Grade matters more than anything else in a container quote.</strong> ${esc(P.asIsNote)}</p>`;
const locCaveat = () => `<p class="caveat reveal">Grade moves the price more than size does, and it is what decides whether a unit is sold watertight — the full rundown is on the <a href="/container-grades/">grades page</a>.</p>`;

function rangeGrid(items) {
  return `<div class="range">${items.map((x) => `<article class="rangecard reveal">
    ${havePhoto("range-" + x.slug) ? `<div class="rangecard-media">${IMG("range-" + x.slug, x.title, { w: 800, h: 500 })}<span class="rangecard-size">${esc(x.short || x.name)}</span></div>` : ""}
    <div class="rangecard-body">
      <h3><a href="/${x.slug}/">${esc(x.title)}</a></h3>
      <p>${esc(x.pickIf || x.lead.split(".")[0] + ".")}</p>
      ${x.usedFrom ? `<div class="rangecard-price"><div>Used from<b>${aud(x.usedFrom)}</b></div><div>New from<b>${aud(x.newFrom)}</b></div></div>` : ""}
    </div>
  </article>`).join("")}</div>`;
}

const specTable = (x) => `<table class="spectable"><caption>${esc(x.title)} — dimensions and weights</caption><tbody>
<tr><th scope="row">External (L × W × H)</th><td>${esc(x.specs.ext)}</td></tr>
<tr><th scope="row">Internal (L × W × H)</th><td>${esc(x.specs.int)}</td></tr>
<tr><th scope="row">Door opening (W × H)</th><td>${esc(x.specs.door)}</td></tr>
<tr><th scope="row">Internal volume</th><td>${esc(x.specs.cube)}</td></tr>
<tr><th scope="row">Tare weight</th><td>${esc(x.specs.tare)}</td></tr>
</tbody></table>`;

const priceBox = (x) => `<div class="pricebox reveal">
  <h3>Guide prices — ${esc(x.short)}</h3>
  <dl>
    <div><dt>Cargo-worthy used, from</dt><dd>${aud(x.usedFrom)}</dd></div>
    <div><dt>New single-trip, from</dt><dd>${aud(x.newFrom)}</dd></div>
    ${x.hire ? `<div><dt>Hire, from</dt><dd>${aud(x.hire)}<span style="font-size:.9rem;font-weight:600"> / week</span></dd></div>` : ""}
  </dl>
  <p class="pricenote">Guide prices in AUD, ex GST. Delivery is quoted with the container — it moves with distance and access, and one phone call gets you an exact number.</p>
  <a class="btn btn-primary btn-wide" href="/contact/">Get a price for your address</a>
</div>`;

const gallery = (names, alts) => {
  const shown = names.map((n, i) => ({ n, a: alts[i] })).filter((x) => havePhoto(x.n));
  if (!shown.length) return "";
  return `<div class="gallery reveal">${shown.map((x) => `<figure>${IMG(x.n, x.a, { w: 800, h: 600 })}<figcaption>${esc(x.a)}</figcaption></figure>`).join("")}</div>`;
};

/* ==========================================================================
   COPY ROTATION — keyed on the slug, not on the loop index.

   Pools indexed off a loop counter with fixed offsets do not decorrelate:
   three pools of the same length driven by the same variable wrap together,
   so pairs of localities land on identical headings, and the copy on every
   page depends on the ORDER of locations.json. hash32 (FNV-1a, deterministic,
   dependency-free) plus rank(salt, slug) gives each pool its own ordering of
   the locality slugs; pick() takes that rank modulo the pool length. Ranking
   rather than hashing modulo directly matters — a raw hash modulo 5 across 34
   slugs is not balanced, a rank is.

   Pigeonhole, stated plainly: 34 localities into a 7-entry pool must repeat.
   What matters is that no PAIR shares every rotated slot. Verified in the
   checks at the bottom of this file.
   ======================================================================== */
function hash32(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h >>> 0;
}
const RANKS = Object.create(null);
function rank(salt, slug) {
  if (!RANKS[salt]) {
    const order = LOCS.map((l) => l.slug).slice().sort((a, b) => hash32(salt + ":" + a) - hash32(salt + ":" + b));
    RANKS[salt] = Object.create(null);
    order.forEach((s, i) => { RANKS[salt][s] = i; });
  }
  return RANKS[salt][slug] || 0;
}
const pick = (pool, salt, slug) => pool[rank(salt, slug) % pool.length];

/* Pool lengths are deliberately DIFFERENT — 8, 9, 7, 10, 8, 7, 9. Pools of
   equal length driven by the same rank collide on the same pairs; coprime-ish
   lengths spread the collisions out. Worst-case pair overlap is asserted in
   the checks at the end of build-pages.js. If it ever creeps up, add entries
   to a pool — that is the only real fix for the pigeonhole. */
const USES_HEADS = ["What people here put in them", "What they get used for around here", "The jobs they turn up on locally", "Where they end up in this district", "What the containers do here", "Common uses in and around town", "What locals buy them for", "The work they do around here", "What the containers get used for locally",
  "The jobs they end up doing here",
  "How this district uses them",
  "Where they turn up around here",
  "What people order them for locally",
];
const ACCESS_HEADS = ["Getting a truck in", "What the delivery actually involves", "Access, ground and the last thirty metres", "The delivery problem here", "What the driver needs from the site", "Access notes for this district", "How the drop usually goes", "Getting it onto the block", "What the site has to allow for", "The access problem in this district",
  "What has to be right before the truck books",
];
const NEAR_HEADS = ["Also delivered nearby", "Other places on this run", "Nearby towns we cover", "Elsewhere in the district", "Other areas we deliver to", "More of the region", "Around the same run", "Other towns on the same run",
  "We deliver around here too",
];
const OPENERS = [
  "Here is the honest version of buying a container here.",
  "The short version, before the detail.",
  "What matters locally, first.",
  "Start here if you are working out what to order.",
  "The practical read on this town.",
  "What we tell people who ring from here.",
  "Worth knowing before you order.",
  "The local picture, briefly.",
  "First, the things that are specific to here.",
  "Before the detail, the shape of it.",
  "The version we would give you on the phone.",
  "What is worth knowing about this place, up front.",
  "The bit that is specific to here, first.",
  "Read this before you settle on a size.",
];
const PROCESS_LINES = [
  "Ring us, tell us what is going in it and what the access is like, and we will tell you which grade and which truck the job needs before anyone talks money.",
  "One call sorts it. Size, grade, where it is going and what the entry looks like — that is everything we need to price it properly.",
  "Tell us the job rather than the product. What goes in, where it sits and how the truck gets there decides the rest.",
  "Send three photos of the site with your enquiry and we can usually tell you the truck and the timing straight back.",
  "We would rather ask two more questions on the phone than send the wrong container up the road.",
  "Describe the spot it has to land on and we will work backwards from there to the container and the truck.",
  "The order of questions is always the same: what is it for, what grade does that need, and can a truck get in.",
  "Give us the address and a rough idea of the entry and we will do the working out at our end.",
  "Start with the address and what the container has to do. Everything else follows from those two answers.",
  "We will ask about the ground, the gate and the overheads before we ask about your budget. That order saves people money.",
  "Tell us the date you actually need it, not the date that sounds polite. It changes which depot the unit comes out of.",
  "A two-minute conversation about the site usually saves a second delivery fee later.",
];
const FREIGHT_LINES = [
  "Delivery is quoted with the container. It moves with the distance, the truck the site needs and how hard the last thirty metres are, so we price it per job rather than publish a figure that would be wrong for half the addresses here.",
  "We do not publish a delivery rate for this area, because a straightforward industrial drop and a tight residential one on the same street are not the same job. Ring and you will get an exact number.",
  "Cartage is worked out per address rather than off a table. Distance is only part of it — access is usually what moves the figure.",
  "Delivery is priced with the container, not separately and not off a list. One phone call gets you the real number for your address.",
  "There is no flat delivery rate here worth publishing. What the truck has to do at your end changes it too much, so we quote it per job.",
  "The cartage component depends on which depot the unit comes out of and what the site needs. We work it out with the quote.",
  "We quote delivery with the container every time. It is the honest way to do it when access varies as much as it does around here.",
  "Delivery is worked out per address and quoted with the container. Access moves it more than distance does, which is why there is no published figure.",
  "We price the cartage with the unit rather than off a rate card. Give us the address and the entry and you will get a real number.",
  "Freight to this area is quoted per job. The truck the site needs is usually the bigger variable, not the kilometres.",
];
const ASK_LINES = [
  "Tell us where it is going and what it is for",
  "Get a price for your address",
  "Work out the right container with us",
  "Tell us about the job",
  "Get a delivered price sorted",
  "Ask us what fits your site",
  "Start with the address and the access",
  "Tell us what has to fit in it",
  "Get the container and the cartage in one number",
  "Tell us what the site looks like",
  "Ask about stock for your area",
  "Find out what actually fits",
  "Send us the address and the access",
  "Get an honest answer on timing",
  "Talk it through with someone who has done it",
];

/* ================================ HOME ================================== */
function home() {
  const faqs = [
    { q: "Can I come and look at a container before I buy it?", a: `Yes, and on used stock we would rather you did. The yard is at ${ADDR_LINE}, about half an hour south-east of the Brisbane CBD off the M1. Ring first so somebody is there and the units you want are accessible, then walk around them, open the doors and look down the floor yourself. If you are nowhere near Brisbane, ask for photographs of the actual unit on request and we will send them before delivery — corners, door end, roof and floor.` },
    { q: "Do you deliver outside Queensland?", a: "Yes. We deliver into every state and territory, and stock sits in depots at Cornubia, Grafton, Gympie, Rockhampton, Mackay, Townsville, Cairns, Darwin and Fremantle, so most addresses are a run from somewhere reasonably close rather than a haul across the continent. Remote runs are honest about timing — some of them wait on a truck already heading that way, and we will tell you that up front rather than after you have paid." },
    { q: "What grade should I buy?", a: "Cargo-worthy used is the right answer for most people — a working container still certified fit for sea freight, and checked wind and watertight before it leaves. New single-trip is the buy when the container will be looked at or converted. As-is is cheapest and is not sold watertight; it suits a lock-up under cover or a base for a build. The grades page walks through all three properly." },
    { q: "What does delivery cost?", a: "It depends on the distance and, more than most people expect, on the access at your end. A flat industrial site with a wide gate and a tight residential driveway on a hill are different jobs even when they are the same distance from the depot. We quote delivery together with the container so there is one number in front of you rather than a price with a question mark after it. One phone call and a couple of photos of the entry usually settles it." },
    { q: "How quickly can I get one?", a: "A standard 20ft going somewhere with reasonable access around south-east Queensland is usually a few business days. Interstate capitals run longer, remote runs longer again, and the wet season closes unsealed roads across the north and the west for weeks at a time. Tell us the date you actually need it and you will get an honest answer about whether it is achievable, not an optimistic one." },
    { q: "Do I need council approval to put one on my block?", a: "It depends entirely on your council, how long it is staying and what you are using it for. Plenty of shires treat a container as a temporary or ancillary structure needing no approval; others want a siting application, particularly if it is visible from the street or staying permanently, and newer estates often carry a covenant stricter than the council position. It is a short phone call to your own council and worth making before delivery day rather than after." }
  ];
  const schema = g(faqLd(faqs), { "@type": "WebSite", "@id": `${D}/#site`, url: D, name: BRAND, publisher: { "@id": `${D}/#biz` } });

  /* Three hero treatments. Everything below the hero is shared — the variant
     stylesheets restyle it, they do not restructure it. */
  const heroPoints = `<ul class="hero-points">
          <li>${esc(PROMISE)} — by a person, not an autoresponder</li>
          <li>Every cargo-worthy unit checked wind and watertight before it leaves</li>
          <li>Photos of your actual container on request, before delivery</li>
          <li>Stock on the ground in nine depots, ${esc(ADDR.suburb)} to Fremantle</li>
        </ul>`;
  const heroCta = `<div class="hero-cta">
          <a class="btn btn-primary btn-lg" href="#quote">Get a price</a>
          <a class="btn btn-ondark btn-lg" href="${S.phoneHref}">${esc(S.phone)}</a>
        </div>`;

  const HERO_COMPACT = `
<section class="hero hero-compact">
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Sales &amp; hire · every state and territory</p>
        <h1>Shipping containers, <em>and a yard you can walk into</em></h1>
        <p class="hero-lede">${esc(S.tagline)}</p>
        ${heroPoints}
      </div>
      <div class="hero-media">${videoBlock()}</div>
    </div>
    <div class="startbar">
      <div class="startbar-say"><b>Get a price</b><span>Three details, and you hear back from a person within one business day.</span></div>
      ${quoteForm("-hero", true, "mini")}
      <a class="startbar-tel" href="${S.phoneHref}"><small>or ring</small>${esc(S.phone)}</a>
    </div>
  </div>
</section>`;

  /* HYBRID — James, 17/08/2026: "I don't mind B, but I do like the bigger
     quote forms from A". So: B's hero grid (copy left, video right at equal
     billing) with the FULL form rather than the three-field opener, laid out
     across a wide floating card instead of a tall narrow slab. Header goes
     solid black. */
  const HERO_HYBRID = `
<section class="hero hero-compact hero-hybrid">
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Sales &amp; hire · every state and territory</p>
        <h1>Shipping containers, <em>and a yard you can walk into</em></h1>
        <p class="hero-lede">${esc(S.tagline)}</p>
        ${heroPoints}
        ${heroCta}
      </div>
      <div class="hero-media">${videoBlock()}</div>
    </div>
    <div class="startbar startbar-full" id="quote-top">
      <div class="startbar-say">
        <b>Get a price</b>
        <span>Four questions about the container, then how to reach you. ${esc(PROMISE)}.</span>
        <a class="startbar-tel" href="${S.phoneHref}"><small>or ring</small>${esc(S.phone)}</a>
      </div>
      ${quoteForm("-hero", true)}
    </div>
  </div>
</section>`;

  /* CLASSIC — the form goes back where James liked it: a tall card beside the
     copy, full size, nothing shrunk. The film then runs FULL WIDTH beneath,
     which makes it bigger than it ever was in the compact hero rather than
     smaller. Solid black header. */
  const HERO_CLASSIC = `
<section class="hero hero-classic">
  <div class="wrap">
    <div class="hero-grid">
      <div>
        <p class="eyebrow">Sales &amp; hire · every state and territory</p>
        <h1>Shipping containers, <em>and a yard you can walk into</em></h1>
        <p class="hero-lede">${esc(S.tagline)}</p>
        ${heroCta}
        ${heroPoints}
      </div>
      <div class="quotecard">
        <h2>Get a price</h2>
        <p class="qc-sub">Four questions about the container, then how to reach you.</p>
        ${quoteForm("-hero", true)}
      </div>
    </div>
  </div>
  <div class="hero-film"><div class="wrap">${videoBlock()}</div></div>
</section>`;

  const HERO_CINEMA = `
<section class="hero hero-cinema">
  <div class="cine-media">${videoBlock()}</div>
  <div class="cine-copy"><div class="wrap">
    <p class="eyebrow">Sales &amp; hire · every state and territory</p>
    <h1>Shipping containers, <em>and a yard you can walk into</em></h1>
    <p class="hero-lede">${esc(S.tagline)}</p>
    ${heroCta}
    ${heroPoints}
  </div></div>
</section>`;

  const HERO_DEFAULT = `
<section class="hero">
  <div class="wrap">
    <div class="hero-grid">
      <div>
        <p class="eyebrow">Sales &amp; hire · every state and territory</p>
        <h1>Shipping containers, <em>and a yard you can walk into</em></h1>
        <p class="hero-lede">${esc(S.tagline)}</p>
        <div class="hero-cta">
          <a class="btn btn-primary btn-lg" href="#quote">Get a price</a>
          <a class="btn btn-ondark btn-lg" href="${S.phoneHref}">${esc(S.phone)}</a>
        </div>
        <ul class="hero-points">
          <li>${esc(PROMISE)} — by a person, not an autoresponder</li>
          <li>Every cargo-worthy unit checked wind and watertight before it leaves</li>
          <li>Photos of your actual container on request, before delivery</li>
          <li>Stock on the ground in nine depots, ${esc(ADDR.suburb)} to Fremantle</li>
          ${SHOW_REVIEWS ? `<li>Rated ${esc(reviewLine())}</li>` : ""}
        </ul>
      </div>
      <div class="quotecard">
        <h2>Get a price</h2>
        <p class="qc-sub">Four questions about the container, then how to reach you.</p>
        ${quoteForm("-hero", true)}
      </div>
    </div>
    ${videoBlock()}
  </div>
</section>`;

  const HERO = { compact: HERO_COMPACT, cinema: HERO_CINEMA, hybrid: HERO_HYBRID, classic: HERO_CLASSIC, wide: HERO_HYBRID }[VARIANT] || HERO_DEFAULT;

  const body = `
${HERO}

${plate(SHORT + " Containers — " + (HOURS || "Mon–Fri"), PROMISE + ". " + PROMISE_DETAIL)}

${depotStrip()}

${sec("", secHead("The range", "Three sizes, five configurations, three grades", "Guide prices below are starting figures for the grade named. What moves them is condition, what is standing in the yard this week, and which depot the unit has to come out of.") + rangeGrid(P.sizes) + `<div style="margin-top:1.6rem">${typeChips()}</div><div style="margin-top:1.6rem">${asIs()}</div>`)}

${plate("Come and look at it first", "Ring, drive over, open the doors. " + ADDR.suburb + ", " + ADDR.state + ".")}

${band({
    photo: "yard-cornubia", eyebrow: "The difference", h: "Most container companies will sell you a photograph",
    p: [`We would rather you came and looked. Our units sit on hardstand at ${ADDR_LINE}, half an hour south-east of the Brisbane CBD, and you are welcome to ring, drive over and put your hands on the exact container before you spend anything.`,
      "It matters most on used stock, where two cargo-worthy 20fts standing side by side can be a thousand dollars apart on the strength of the floor and the door seals alone. If you cannot get here — and a good share of our customers are thousands of kilometres away — we photograph the actual unit and send it through on request, before delivery."],
    cta: ["/about/", "More about us"], wash: true
  })}

${band({
    photo: "delivery-tilt-tray", eyebrow: "Delivery", h: "The last thirty metres decides everything", dark: true,
    p: ["Almost every delivery that goes wrong goes wrong for the same reason, and it is never the container. It is the run-in being too short, the pinch point being too narrow, a branch nobody measured, or ground that looked firm and gave way under four corner castings carrying a couple of tonne each.",
      "So we ask about the site before we talk about price. Send three photographs — one from the street looking in, one down the approach, and one of the spot it has to land on — and you will be told which truck the job needs and whether it is a tilt-tray, a side loader or a crane job before anybody quotes a number."],
    cta: ["/delivery/", "How delivery works"]
  })}

${sec("sec-grey", secHead("Grades", P.gradeNote, null) + `<div class="range">${P.grades.map((gr) => `<article class="rangecard reveal"><div class="rangecard-body"><h3>${esc(gr.name)}</h3><p>${esc(gr.blurb)}</p></div></article>`).join("")}</div><p style="margin-top:1.6rem"><a class="btn btn-ghost" href="/container-grades/">Grades explained in full</a></p>`)}

${(P.conditions && P.conditions.length) ? sec("", secHead("New, used or refurbished", "Three ways to buy the same box", "The condition you buy decides more of the price than the size does, and it decides whether the unit is sold watertight.") + `<div class="range">${P.conditions.map((c) => `<article class="rangecard reveal"><div class="rangecard-body"><h3><a href="/${c.slug}/">${esc(c.name)}</a></h3><p>${esc(c.lead.split(". ")[0] + ".")}</p><p style="font-size:.92rem;color:var(--muted)"><strong>Best for:</strong> ${esc(c.bestFor)}</p></div></article>`).join("")}</div>`) : ""}

${sec("sec-dark", secHead("Where we deliver", "Delivered to every state and territory", "We deliver everywhere. These are the places we know well enough to write something useful about — the roads, the ground, the trucks that fit, and what usually goes wrong.") + `<div class="locgrid">${LOCS.map((l) => `<a href="/${l.slug}/">${esc(l.name)}<span>${esc(l.state)} ${esc(l.postcode)}</span></a>`).join("")}</div><p style="margin-top:1.5rem"><a class="btn btn-ondark" href="/delivery-areas/">Everywhere else</a></p>`)}

${sec("", secHead("How it works", "Four steps, and no surprises at the end", null) + `<ol class="steps">
  <li><h3>Tell us the job, not the product</h3><p>What is going in it, where it is going and what the access looks like. That is what decides the size, the grade and the truck — in that order.</p></li>
  <li><h3>We answer within one business day</h3><p>${esc(PROMISE_DETAIL)} You get a price with the cartage to your address worked into it.</p></li>
  <li><h3>You see the actual unit</h3><p>Come out to the yard, or ask for photographs of the specific container and we will send them through before delivery.</p></li>
  <li><h3>It turns up when we said it would</h3><p>You get a delivery window and a call from the driver. If something changes at our end, you hear it from us first.</p></li>
</ol>`)}

${sec("sec-wash", secHead("Common questions", "The things people ring and ask", null) + qaHtml(faqs) + `<p style="margin-top:1.8rem"><a class="btn btn-ghost" href="/faqs/">All frequently asked questions</a></p>`)}

${ask("Tell us about the job", "Four quick questions about the container and where it is going, then how to reach you. " + PROMISE + ".", "home")}
`;
  out("", shell({ t: `Shipping Containers For Sale & Hire Australia | ${BRAND}`, d: `Shipping containers for sale and hire in 10ft, 20ft and 40ft, delivered to every state and territory from our ${ADDR.suburb} yard and nine depots. New, cargo-worthy and as-is grades. ${PROMISE}.`, c: "/", schema }, body));
}

/* ============================== RANGE HUB =============================== */
function hub() {
  const faqs = [
    { q: "What size shipping container should I buy?", a: "Work backwards from the space, not from the stuff. A 20ft needs about seven metres of straight, reasonably level ground and is the cheapest container per cubic metre in most weeks. A 40ft is better value again per cubic metre but needs roughly thirty metres of run-in to deliver. A 10ft is the answer when the block genuinely will not take a 20ft — it costs more per cubic metre, every time." },
    { q: "What is the difference between a standard container and a high cube?", a: "300mm of internal height, and nothing else. A standard is 2.59m tall externally, a high cube 2.90m. That extra foot is what lets you line the walls and still stand up, fit a roller door with head clearance for a forklift, or put a mezzanine over one end. If the container is going to be converted rather than just filled, buy the high cube." },
    { q: "Can I buy a container without seeing it first?", a: "You can, and most people do. But we would rather send you photographs of the actual unit than a stock image — ask and we will, before delivery. If you are within driving distance of Cornubia, ring and come out to the yard instead; on used stock it is worth the trip." },
    { q: "Do you sell new containers?", a: "Yes. New single-trip units are built overseas, loaded once, shipped here and unloaded — so they are effectively new but have made one voyage. Straight walls, clean floor, unmarked paint and seals that have not weathered. They cost more than used and are the right buy when the container will be seen, converted, or has to be reliably watertight for years rather than months." }
  ];
  const crumbs = [["Home", "/"], ["Shipping containers", "/shipping-containers/"]];
  const body = `${crumbHtml(crumbs)}
<header class="phead"><div class="phead-media">${IMG("head-range", "Range of shipping containers", { w: 1800, h: 900, eager: true })}</div><div class="wrap">
  <p class="eyebrow">The range</p>
  <h1>Shipping containers for sale and hire</h1>
  <p class="phead-lede">Ten foot, twenty foot and forty foot. General purpose, high cube, side opening and dangerous goods. New single-trip, cargo-worthy used, and as-is. Here is what each one is actually for.</p>
</div></header>
${promiseStrip()}
${sec("", secHead("By size", "Start with the space you have", "The commonest mistake is choosing the container before measuring the spot it has to land on. Size is decided by access as often as it is by volume.") + rangeGrid(P.sizes) + `<div style="margin-top:1.8rem">${asIs()}</div><p class="fineprint">${esc(P.disclaimer)}</p>`)}
${sec("sec-wash", secHead("By configuration", "What the box is set up to do", null) + rangeGrid(P.types))}
${band({ photo: "grades-lineup", eyebrow: "Grades", h: "Grade moves the price more than size does", p: [P.gradeNote, "Two cargo-worthy 20fts standing next to each other can be a thousand dollars apart on the strength of the floor and the door seals alone. It is the first question we ask and the last thing worth comparing suppliers on."], cta: ["/container-grades/", "Grades explained"], dark: true, alt: true })}
${sec("", secHead("Common questions", "About choosing a container", null) + qaHtml(faqs))}
${ask("Not sure which one you need?", "Tell us what is going in it and where it is going. We will tell you which size and grade the job actually needs — including when the cheaper one is the right answer.", "hub")}`;
  out("shipping-containers", shell({ t: `Shipping Containers For Sale & Hire — 10ft, 20ft & 40ft | ${BRAND}`, d: `The full range of shipping containers for sale and hire — 10ft, 20ft and 40ft in general purpose, high cube, side opening and dangerous goods. New, cargo-worthy and as-is grades.`, c: "/shipping-containers/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ============================== SIZE PAGES ============================== */
function sizePages() {
  P.sizes.forEach((x) => {
    const others = P.sizes.filter((y) => y.slug !== x.slug);
    const faqs = [
      { q: `What are the dimensions of a ${x.short} shipping container?`, a: `Externally ${x.specs.ext}, internally ${x.specs.int}. The door opening is ${x.specs.door} and the internal volume is ${x.specs.cube}. Tare weight is ${x.specs.tare}. Those are standard ISO figures and they do not vary meaningfully between manufacturers — what does vary is the condition of the floor and the doors, which is a grade question rather than a size one.` },
      { q: `What fits in a ${x.short} container?`, a: x.fits },
      { q: `How much does a ${x.short} shipping container cost?`, a: `Cargo-worthy used ${x.short} units start from ${aud(x.usedFrom)} and new single-trip from ${aud(x.newFrom)}, both guide prices ex GST. What moves them is condition, what is on the ground this week and which depot the unit has to come out of. Delivery is quoted separately with the container because it varies so much with distance and access.` },
      { q: `What does a ${x.short} container need for delivery?`, a: x.access }
    ];
    const crumbs = [["Home", "/"], ["Shipping containers", "/shipping-containers/"], [x.title, `/${x.slug}/`]];
    const body = `${crumbHtml(crumbs)}
<header class="phead"><div class="phead-media">${IMG("head-" + x.slug, x.title, { w: 1800, h: 900, eager: true })}</div><div class="wrap">
  <p class="eyebrow">${esc(x.short)} containers</p>
  <h1>${esc(x.title)} for sale and hire</h1>
  <p class="phead-lede">${esc(x.lead)}</p>
  <dl class="phead-facts">
    <div><dt>External</dt><dd>${esc(x.specs.ext)}</dd></div>
    <div><dt>Internal volume</dt><dd>${esc(x.specs.cube)}</dd></div>
    <div><dt>Used from</dt><dd>${aud(x.usedFrom)} ex GST</dd></div>
    <div><dt>New from</dt><dd>${aud(x.newFrom)} ex GST</dd></div>
  </dl>
</div></header>
${promiseStrip()}
${sec("", `<div class="spec">
  <div>
    <div class="reveal"><p class="eyebrow">Why this one</p><h2>When a ${esc(x.short)} is the right call</h2>
    <ul>${x.why.map((w) => `<li>${esc(w)}</li>`).join("")}</ul></div>
    <div class="reveal" style="margin-top:2.4rem"><h3>What fits inside</h3><p>${esc(x.fits)}</p></div>
    <div class="reveal" style="margin-top:2.4rem"><h3>Worth knowing before you order</h3><p>${esc(x.watch)}</p></div>
    <div style="margin-top:2.4rem">${specTable(x)}</div>
    <div style="margin-top:1.8rem">${asIs()}</div>
  </div>
  <div class="specside">${priceBox(x)}<p class="fineprint">${esc(P.disclaimer)}</p></div>
</div>`)}
${gallery(["gal-" + x.slug + "-1", "gal-" + x.slug + "-2", "gal-" + x.slug + "-3"], [`${x.title} — exterior`, `${x.title} — doors and locking bars`, `${x.title} — interior and floor`]) ? sec("sec-wash", secHead("Photos", `${x.short} containers we have delivered`, "Real units from real jobs. Ask and we will send photographs of the specific container you are buying, before delivery.") + gallery(["gal-" + x.slug + "-1", "gal-" + x.slug + "-2", "gal-" + x.slug + "-3"], [`${x.title} — exterior`, `${x.title} — doors and locking bars`, `${x.title} — interior and floor`])) : ""}
${band({ photo: "size-alt-" + x.slug, eyebrow: "Delivery", h: `Getting a ${x.short} onto your block`, p: [x.access, "Send three photographs with your enquiry — one from the street looking in, one down the approach and one of the spot itself — and we will tell you which truck the job needs before anyone quotes."], cta: ["/delivery/", "Delivery and access"], dark: true, alt: true })}
${sec("", secHead("Other sizes", "If this one is not quite right", null) + rangeGrid(others) + `<div style="margin-top:1.6rem">${typeChips()}</div>`)}
${sec("sec-wash", secHead("Common questions", `About ${x.short} containers`, null) + qaHtml(faqs))}
${ask(`Get a price on a ${x.short}`, `Tell us where it is going and what the access is like. ${PROMISE}.`, x.slug)}`;
    out(x.slug, shell({ t: `${x.title} For Sale & Hire — From ${aud(x.usedFrom)} | ${BRAND}`, d: `${x.title} for sale and hire from ${aud(x.usedFrom)} ex GST. ${x.specs.ext} external, ${x.specs.cube} internal. New, cargo-worthy and as-is grades, delivered Australia-wide.`, c: `/${x.slug}/`, schema: g(crumbsLd(crumbs), faqLd(faqs), productLd(x)) }, body));
  });
}

/* ============================== TYPE PAGES ============================== */
function typePages() {
  P.types.forEach((x) => {
    const others = P.types.filter((y) => y.slug !== x.slug);
    const faqs = [
      { q: `What is a ${x.name.toLowerCase()} shipping container?`, a: x.lead },
      { q: `What sizes do ${x.name.toLowerCase()} containers come in?`, a: x.slug === "dangerous-goods-shipping-containers" ? "Dangerous goods units are commonly 10ft and 20ft. They are built to a standard rather than converted, so the size available depends on what is being made and what is in stock — tell us the class and volume you need to store and we will tell you what is achievable and when." : "Generally 20ft and 40ft, and in some configurations 10ft. Availability moves week to week, especially on used stock. Ring and ask what is actually standing on the ground rather than working off a list." },
      { q: `Is a ${x.name.toLowerCase()} container watertight?`, a: "In cargo-worthy grade or better, yes — every cargo-worthy unit is checked wind and watertight before it leaves us. As-is units are cheaper again and are not sold watertight. Grade decides this, not configuration, and it is worth reading the grades page before you choose." },
      { q: `How much more does a ${x.name.toLowerCase()} container cost?`, a: "It depends on the configuration and on what is available. Some cost only a little more than a standard general purpose unit; side opening and dangerous goods units cost substantially more because they are structurally different containers, not modified ones. Tell us what the container has to do and we will price the options side by side." }
    ];
    const crumbs = [["Home", "/"], ["Shipping containers", "/shipping-containers/"], [x.name, `/${x.slug}/`]];
    const body = `${crumbHtml(crumbs)}
<header class="phead"><div class="phead-media">${IMG("head-" + x.slug, x.title, { w: 1800, h: 900, eager: true })}</div><div class="wrap">
  <p class="eyebrow">${esc(x.name)}</p>
  <h1>${esc(x.title)}</h1>
  <p class="phead-lede">${esc(x.lead)}</p>
</div></header>
${promiseStrip()}
${sec("", `<div class="spec">
  <div>
    <div class="reveal"><p class="eyebrow">In short</p><h2>What you are getting</h2><ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>
    <div class="reveal" style="margin-top:2.6rem">${x.detail.map((p, i) => `<p${i === 0 ? "" : ""}>${esc(p)}</p>`).join("")}</div>
    ${x.slug === "dangerous-goods-shipping-containers" ? "" : `<div style="margin-top:1.8rem">${asIs()}</div>`}
  </div>
  <div class="specside">
    <div class="pricebox reveal">
      <h3>Get a price</h3>
      <p style="color:var(--pale);font-size:.95rem">Tell us the size, the grade and where it is going. ${esc(PROMISE)}.</p>
      <a class="btn btn-primary btn-wide" href="/contact/">Send an enquiry</a>
      <a class="btn btn-ondark btn-wide" style="margin-top:.6rem" href="${S.phoneHref}">${esc(S.phone)}</a>
      <p class="pricenote">Delivery is quoted with the container — it moves with distance and access, and one phone call gets you an exact number.</p>
    </div>
  </div>
</div>`)}
${gallery(["gal-" + x.slug + "-1", "gal-" + x.slug + "-2", "gal-" + x.slug + "-3"], [`${x.name} container — exterior`, `${x.name} container — doors`, `${x.name} container — interior`]) ? sec("sec-wash", secHead("Photos", `${x.name} containers`, "Real units from real jobs. Photographs of the specific container you are buying are available on request, before delivery.") + gallery(["gal-" + x.slug + "-1", "gal-" + x.slug + "-2", "gal-" + x.slug + "-3"], [`${x.name} container — exterior`, `${x.name} container — doors`, `${x.name} container — interior`])) : ""}
${sec("sec-dark", secHead("By size", "Available in", null) + rangeGrid(P.sizes))}
${sec("", secHead("Other configurations", "If this is not the one", null) + rangeGrid(others))}
${sec("sec-wash", secHead("Common questions", `About ${x.name.toLowerCase()} containers`, null) + qaHtml(faqs))}
${ask(`Get a price on a ${x.name.toLowerCase()} container`, `Tell us what it has to do and where it is going. ${PROMISE}.`, x.slug)}`;
    out(x.slug, shell({ t: `${x.title} For Sale & Hire | ${BRAND}`, d: x.metaDesc, c: `/${x.slug}/`, schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
  });
}

module.exports = { esc, aud };

/* The remaining page builders and the tail live in build-pages.js, required
   below, purely to keep each file readable. Both halves share this module's
   helpers through the object exported above and the globals assigned here. */
Object.assign(global, {
  __FD: { fs, path, S, LOCS, P, POSTS, DIST, TEST, D, pages, BRAND, SHORT, TEL_E164, HOURS, SERVICE_AREA, PROMISE, PROMISE_DETAIL, ADDR, ADDR_LINE, postalAddress, esc, aud, auDate, para, paras, out, IMG, IMGP, havePhoto, PHOTO_USED, markDark, markLight, head, biz, crumbsLd, faqLd, productLd, g, mast, promiseStrip, quoteForm, ask, foot, shell, crumbHtml, sec, secHead, qaHtml, typeChips, band, asIs, locCaveat, rangeGrid, specTable, priceBox, gallery, hash32, rank, pick, reviewLine, REV, plate, depotStrip, videoBlock, NAV, USES_HEADS, ACCESS_HEADS, NEAR_HEADS, OPENERS, PROCESS_LINES, FREIGHT_LINES, ASK_LINES, SHOW_REVIEWS }
});

home();
hub();
sizePages();
typePages();
require("./build-pages.js");
