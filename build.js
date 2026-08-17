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
     - THE SUPPLY STRIP: the towns stock is actually drawn through. The one
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

/* The supply strip. The towns stock is actually drawn through. This is the single
   piece of content on the site a competitor cannot copy, because it is not a
   claim — it is a list of yards. Addresses are deliberately absent for every
   depot except the head yard: the others are third-party sites and publishing
   their addresses is both wrong and a Google Business Profile risk. */
function depotStrip(heading) {
  const D9 = Array.isArray(S.depots) ? S.depots : [];
  if (!D9.length) return "";
  return `<section class="depots"><div class="wrap">
  <h2>${esc(heading || S.depotsHeading || "Where your container comes from")}</h2>
  <div class="depotrow">${D9.map((d) => `<div><b>${esc(d.town)}</b><small>${esc(d.state)} — ${esc(d.note)}</small></div>`).join("")}</div>
  <p>${esc(S.nationalDetail)} ${esc(ADDR.suburb)} is the walk-in yard; elsewhere, inspection is by arrangement. <a href="/depots/">How supply works</a></p>
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
    { q: "Which yard does my container actually come out of?", a: `Whichever one is closest to your address with the right unit standing in it. Stock is held at ${ADDR.suburb} and drawn through yards and depot partners spread right around the country, so a box bound for the Territory or the west coast does not begin its life on a truck in south-east Queensland. Give us the delivery postcode on the first call and you will be told where yours is being released from and what that does to the timing.` },
    { q: "Do you sell into every state, or only Queensland?", a: "Every state and territory, on the one 1300 number. East coast runs are the busiest and the quickest. Inland and northern runs are the ones worth talking through, because what is moving in that direction that week matters more than the map does. The far corners of the country get an honest answer rather than an optimistic one — some of those jobs wait on a truck already heading that way, and you will hear that while we are quoting, not afterwards." },
    { q: "Which grade is the one to buy?", a: "For most jobs, cargo-worthy used. It is a working box still certified fit to carry freight at sea, inspected wind and watertight before release, and it costs a long way less than new. Step up to new single-trip when the container is going to be looked at or cut into and converted. As-is sits at the bottom of the price range, carries no watertight claim at all, and earns its keep as a lock-up under an existing roof or as the shell of a build. The grades page sets the three of them out beside each other." },
    { q: "What decides what delivery costs?", a: "Two things, and the kilometres are only the first of them. The second is what the truck has to do once it turns off the road. A level industrial pad with a wide gate and a sloping residential drive with a power line across the entrance are different jobs even when they sit the same distance from the yard. So cartage is worked out per address and quoted with the container, which puts a single figure in front of you instead of a price with a question mark hanging off it. A call and a couple of photographs of the entrance normally settles it." },
    { q: "How soon can one be on the ground?", a: "A standard 20ft going to an address with reasonable access near a capital is usually a few business days. Regional runs depend on what else is travelling that way that week. Through the wet, unsealed roads across the north and the centre close for weeks at a stretch and no amount of money reopens them. Tell us the date the job genuinely needs it by, rather than the polite version, and you will get a straight answer on whether that is achievable." },
    { q: "Will the council have something to say about it?", a: "Possibly, and the only reliable answer comes from your own council rather than from us. The requirements differ from one shire to the next and they turn on how long the container is staying, what is going inside it, and whether it can be seen from the street. Newer estates often carry a covenant that is tighter than anything the council itself asks for. It is a short call to the planning counter, and it is far better made before the truck is booked than after the container is sitting on the block." }
  ];
  const schema = g(faqLd(faqs), { "@type": "WebSite", "@id": `${D}/#site`, url: D, name: BRAND, publisher: { "@id": `${D}/#biz` } });

  /* Three hero treatments. Everything below the hero is shared — the variant
     stylesheets restyle it, they do not restructure it. */
  const heroPoints = `<ul class="hero-points">
          <li>${esc(PROMISE)} — by somebody who sells containers for a living</li>
          <li>Cargo-worthy and new stock inspected wind and watertight before release</li>
          <li>Photographs of the exact unit on request, sent before delivery</li>
          <li>Released from the yard nearest your address, not carted across the country</li>
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
        <h1>Wherever you are, <em>a container is closer than you think</em></h1>
        <p class="hero-lede">${esc(S.tagline)}</p>
        ${heroPoints}
      </div>
      <div class="hero-media">${videoBlock()}</div>
    </div>
    <div class="startbar">
      <div class="startbar-say"><b>Get a price</b><span>Three details, and a person gets back to you inside a business day.</span></div>
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
        <h1>Wherever you are, <em>a container is closer than you think</em></h1>
        <p class="hero-lede">${esc(S.tagline)}</p>
        ${heroPoints}
        ${heroCta}
      </div>
      <div class="hero-media">${videoBlock()}</div>
    </div>
    <div class="startbar startbar-full" id="quote-top">
      <div class="startbar-say">
        <b>Get a price</b>
        <span>Four questions about the box, then the best number to get you on. ${esc(PROMISE)}.</span>
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
        <h1>Wherever you are, <em>a container is closer than you think</em></h1>
        <p class="hero-lede">${esc(S.tagline)}</p>
        ${heroCta}
        ${heroPoints}
      </div>
      <div class="quotecard">
        <h2>Get a price</h2>
        <p class="qc-sub">Four questions about the box, then the best number to get you on.</p>
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
    <h1>Wherever you are, <em>a container is closer than you think</em></h1>
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
        <h1>Wherever you are, <em>a container is closer than you think</em></h1>
        <p class="hero-lede">${esc(S.tagline)}</p>
        <div class="hero-cta">
          <a class="btn btn-primary btn-lg" href="#quote">Get a price</a>
          <a class="btn btn-ondark btn-lg" href="${S.phoneHref}">${esc(S.phone)}</a>
        </div>
        <ul class="hero-points">
          <li>${esc(PROMISE)} — by somebody who sells containers for a living</li>
          <li>Cargo-worthy and new stock inspected wind and watertight before release</li>
          <li>Photographs of the exact unit on request, sent before delivery</li>
          <li>Released from the yard nearest your address, not carted across the country</li>
          ${SHOW_REVIEWS ? `<li>Rated ${esc(reviewLine())}</li>` : ""}
        </ul>
      </div>
      <div class="quotecard">
        <h2>Get a price</h2>
        <p class="qc-sub">Four questions about the box, then the best number to get you on.</p>
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

${sec("", secHead("The range", "Three lengths, five configurations, three grades", "The figures beneath each card are starting points for the grade named on it. Where an individual price lands comes down to the condition of the box, what is physically in stock the week you ring, and which yard it has to be released from.") + rangeGrid(P.sizes) + `<div style="margin-top:1.6rem">${typeChips()}</div><div style="margin-top:1.6rem">${asIs()}</div>`)}

${plate("One number, wherever it is going", S.phone + " — " + (HOURS || "Mon–Fri") + ". Sales, hire, modifications and delivery.")}

${band({
    photo: "yard-cornubia", eyebrow: "How the supply works", h: "Long-distance freight is what makes a cheap container expensive",
    p: [`That is the whole reason this business is not run out of a single gate. Stock is held and turned over through yards and depot partners across the country, and your unit is released from whichever of them is nearest the delivery address with the grade you asked for actually standing in it. Same phone number, same paperwork, same people — a shorter run at the end of it.`,
      `The head yard is at ${ADDR_LINE}, half an hour south-east of the Brisbane CBD, and that one you are welcome to drive into on a weekday if you ring ahead. Everywhere else, give us the postcode and you will be told where the box is coming from at the time we quote it, along with photographs of the actual unit on request, sent before delivery.`],
    cta: ["/about/", "More about us"], wash: true
  })}

${band({
    photo: "delivery-tilt-tray", eyebrow: "Delivery", h: "The truck is the easy part. The driveway is not", dark: true,
    p: ["A container is a rigid steel box with no suspension and nowhere to bend. It will not climb a kerb it does not like, it will not duck under a verandah beam, and four corner castings carrying a couple of tonne apiece will find the soft ground on a block within about a second of the tray coming down. Nearly every delivery that turns into a second delivery turns on one of those three things.",
      "Which is why the site questions come before the price. Photographs of the entrance, the run in from the street and the patch of ground the box has to sit on will usually tell us whether the job wants a tilt-tray, a side loader or a crane, and we would far rather know that a week out than have a driver work it out at your gate."],
    cta: ["/delivery/", "How delivery works"]
  })}

${sec("sec-grey", secHead("Grades", P.gradeNote, null) + `<div class="range">${P.grades.map((gr) => `<article class="rangecard reveal"><div class="rangecard-body"><h3>${esc(gr.name)}</h3><p>${esc(gr.blurb)}</p></div></article>`).join("")}</div><p style="margin-top:1.6rem"><a class="btn btn-ghost" href="/container-grades/">Grades explained in full</a></p>`)}

${(P.conditions && P.conditions.length) ? sec("", secHead("New, used or refurbished", "Three ways to buy the same steel box", "Condition decides more of the final figure than length does, and it is the thing that settles whether a unit is sold watertight at all.") + `<div class="range">${P.conditions.map((c) => `<article class="rangecard reveal"><div class="rangecard-body"><h3><a href="/${c.slug}/">${esc(c.name)}</a></h3><p>${esc(c.lead.split(". ")[0] + ".")}</p><p style="font-size:.92rem;color:var(--muted)"><strong>Best for:</strong> ${esc(c.bestFor)}</p></div></article>`).join("")}</div>`) : ""}

${sec("sec-dark", secHead("Where we deliver", "Into every state and territory", "We go everywhere. Listed below are the towns there is something worth saying about — what the roads do, what the ground does, which trucks fit down them, and where the drops usually come unstuck.") + `<div class="locgrid">${LOCS.map((l) => `<a href="/${l.slug}/">${esc(l.name)}<span>${esc(l.state)} ${esc(l.postcode)}</span></a>`).join("")}</div><p style="margin-top:1.5rem"><a class="btn btn-ondark" href="/delivery-areas/">Everywhere else</a></p>`)}

${sec("", secHead("How it works", "Four steps, and nothing sprung on you at the end", null) + `<ol class="steps">
  <li><h3>Start with the job, not the catalogue</h3><p>What has to go inside it, the address it is headed for, and what the entrance looks like. Those three answers choose the length, the grade and the truck, in that order.</p></li>
  <li><h3>A person gets back to you</h3><p>${esc(PROMISE_DETAIL)} The figure you are given already has the run to your address built into it.</p></li>
  <li><h3>You see the unit that is yours</h3><p>Drive into the ${esc(ADDR.suburb)} yard if you are anywhere near it. Otherwise ask, and photographs of the unit with your name against it come through before delivery.</p></li>
  <li><h3>It lands on the day we said it would</h3><p>There is a delivery window, and the driver rings ahead on the way. If anything slips at this end you hear about it from us early, while the news is still worth something to you.</p></li>
</ol>`)}

${sec("sec-wash", secHead("Common questions", "What people ask on the first call", null) + qaHtml(faqs) + `<p style="margin-top:1.8rem"><a class="btn btn-ghost" href="/faqs/">All frequently asked questions</a></p>`)}

${ask("Tell us where it is going", "Four questions about the container and the address it is headed for, then the best number to reach you on. " + PROMISE + ".", "home")}
`;
  out("", shell({ t: `Shipping Containers For Sale & Hire, Australia-Wide | ${BRAND}`, d: `Buy or hire 10ft, 20ft and 40ft shipping containers in new, cargo-worthy and as-is grades. Your unit is released from the yard nearest your address and delivered in every state and territory. ${PROMISE}.`, c: "/", schema }, body));
}

/* ============================== RANGE HUB =============================== */
function hub() {
  const faqs = [
    { q: "How do I pick the right size?", a: "Measure the ground before you shortlist a length. A 20ft wants roughly seven metres of straight, near-level standing and is the cheapest steel per cubic metre most weeks of the year, which is why it is the default. A 40ft holds double for nowhere near double the money, but it will not get in anywhere without a long, clear, unobstructed approach. A 10ft exists for the block that genuinely will not take a 20ft, and you pay more per cubic metre for it every single time." },
    { q: "Is a high cube worth the extra?", a: "It buys 300mm of internal height and nothing else — 2.90m to the top rail rather than 2.59m. Left empty as a store, that foot is not worth a great deal. The moment the container is being lined, fitted with a roller door a forklift has to drive through with the tynes up, or hung with a mezzanine across one end, it is the difference between a comfortable fit-out and a compromised one. Anything being converted, buy the high cube." },
    { q: "Can I buy one sight unseen?", a: `Most people do, and there is nothing wrong with it provided you are looking at the right photographs. Ask and images of the actual unit will be sent rather than a catalogue shot — corners, door end, roof and floor — on request and before delivery. If you are close enough to ${ADDR.suburb} to drive over, ring ahead and do that instead on used stock. Everywhere else, the photographs are the substitute and they are of your box, not a box like it.` },
    { q: "Do you hire these as well as sell them?", a: "Yes, across the range and into every state we deliver to. Hire suits a container with an end date attached — a build, a fit-out, a season, a shed being put back up after a storm. Buying wins the moment the box is still going to be standing there in a couple of years, because the weekly rate and the purchase price cross over sooner than most people assume. Tell us how long it is needed for and we will work out which side of that line the job sits on." },
    { q: "Can a container be modified?", a: "Yes — personnel doors, windows, vents, shelving, roller doors, paint and full fit-outs. It is worth settling before you buy rather than afterwards, because the base unit you start from changes what the work costs and occasionally changes whether it is worth doing at all. A tired as-is box is cheap to buy and expensive to convert. The modifications page covers what we get asked for most often." }
  ];
  const crumbs = [["Home", "/"], ["Shipping containers", "/shipping-containers/"]];
  const body = `${crumbHtml(crumbs)}
<header class="phead"><div class="phead-media">${IMG("head-range", "Range of shipping containers", { w: 1800, h: 900, eager: true })}</div><div class="wrap">
  <p class="eyebrow">The range</p>
  <h1>Shipping containers for sale and hire across Australia</h1>
  <p class="phead-lede">Ten, twenty and forty foot. General purpose, high cube, side opening, refrigerated and dangerous goods. New single-trip, cargo-worthy used and as-is. This page is the map — what each one is genuinely for, and which of them is wrong for the job you have in mind.</p>
</div></header>
${promiseStrip()}
${sec("", secHead("By size", "Measure the ground first", "More containers are ordered at the wrong length because somebody sized the load and never walked the driveway. Access rules a size out at least as often as volume does.") + rangeGrid(P.sizes) + `<div style="margin-top:1.8rem">${asIs()}</div><p class="fineprint">${esc(P.disclaimer)}</p>`)}
${sec("sec-wash", secHead("By configuration", "What the box has been set up to do", null) + rangeGrid(P.types))}
${band({ photo: "grades-lineup", eyebrow: "Grades", h: "Two boxes the same length can be a long way apart on price", p: [P.gradeNote, "The gap is almost always the floor and the door seals, and neither of them shows up in a listing that only gives you a length and a figure. Settle the grade before you start ringing around, because it is the only thing that makes two quotes comparable."], cta: ["/container-grades/", "Grades explained"], dark: true, alt: true })}
${sec("", secHead("Common questions", "Before you settle on one", null) + qaHtml(faqs))}
${ask("Not sure which one the job needs?", "Describe what has to fit inside it and give us the address it is going to. You will be told which length and grade the job actually calls for, including the times the cheaper box is the better buy.", "hub")}`;
  out("shipping-containers", shell({ t: `The Full Container Range — Buy Or Hire, 10ft To 40ft | ${BRAND}`, d: `Every shipping container we sell and hire — 10ft, 20ft and 40ft in general purpose, high cube, side opening, refrigerated and dangerous goods, in new, cargo-worthy and as-is grades. Delivered nationally.`, c: "/shipping-containers/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ============================== SIZE PAGES ============================== */
function sizePages() {
  P.sizes.forEach((x) => {
    const others = P.sizes.filter((y) => y.slug !== x.slug);
    const faqs = [
      { q: `What are the dimensions of a ${x.short} shipping container?`, a: `Outside, ${x.specs.ext}. Inside, ${x.specs.int}, which gives ${x.specs.cube} of usable room, through a door opening of ${x.specs.door}, at an empty weight of ${x.specs.tare}. Those are ISO figures and they hold whoever built the box, so there is no point shopping on them. What does differ from one ${x.short} to the next is how sound the floor is and how hard the doors pull up against the seal, and that is a grade question rather than a dimensions one.` },
      { q: `What fits in a ${x.short} container?`, a: x.fits },
      { q: `How much does a ${x.short} shipping container cost?`, a: `Guide figures, ex GST: cargo-worthy used from ${aud(x.usedFrom)}, new single-trip from ${aud(x.newFrom)}. Where any individual unit lands inside that comes down to its condition, to what is physically standing in the yard the week you ring, and to which yard it has to be released from. Cartage is worked out per address and quoted alongside the box rather than published, because the access at the far end shifts it as much as the distance does.` },
      { q: `What does a ${x.short} container need for delivery?`, a: x.access },
      { q: `Can I hire a ${x.short} rather than buy one?`, a: `Yes${x.hire ? `, from ${aud(x.hire)} a week ex GST` : ""}. Hire earns its keep when the container has a finish date on it — a build, a fit-out, a harvest, a rebuild after storm damage. If it is still going to be sitting there in two years, buying is nearly always the cheaper end of the deal by a wide margin. Give us the period and both numbers get run for you.` }
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
    <div class="reveal"><p class="eyebrow">The case for it</p><h2>Where a ${esc(x.short)} earns its place</h2>
    <ul>${x.why.map((w) => `<li>${esc(w)}</li>`).join("")}</ul></div>
    <div class="reveal" style="margin-top:2.4rem"><h3>What actually goes in one</h3><p>${esc(x.fits)}</p></div>
    <div class="reveal" style="margin-top:2.4rem"><h3>The bit people wish they had known</h3><p>${esc(x.watch)}</p></div>
    <div style="margin-top:2.4rem">${specTable(x)}</div>
    <div style="margin-top:1.8rem">${asIs()}</div>
  </div>
  <div class="specside">${priceBox(x)}<p class="fineprint">${esc(P.disclaimer)}</p></div>
</div>`)}
${gallery(["gal-" + x.slug + "-1", "gal-" + x.slug + "-2", "gal-" + x.slug + "-3"], [`${x.title} — exterior`, `${x.title} — doors and locking bars`, `${x.title} — interior and floor`]) ? sec("sec-wash", secHead("Photos", `${x.short} units we have put on the ground`, "Actual jobs rather than catalogue imagery. Ask and photographs of the specific container you are buying will be sent through on request, before delivery.") + gallery(["gal-" + x.slug + "-1", "gal-" + x.slug + "-2", "gal-" + x.slug + "-3"], [`${x.title} — exterior`, `${x.title} — doors and locking bars`, `${x.title} — interior and floor`])) : ""}
${band({ photo: "size-alt-" + x.slug, eyebrow: "Access", h: `What a ${x.short} wants at your end`, p: [x.access, "Three photographs settle it: one taken standing at the street looking in, one along the run itself, and one of the ground the box has to sit on. Send them with the enquiry and you will be told which truck the job wants, and whether the drop is straightforward, before anybody talks money."], cta: ["/delivery/", "Delivery and access"], dark: true, alt: true })}
${sec("", secHead("Other lengths", "If this one is not the fit", null) + rangeGrid(others) + `<div style="margin-top:1.6rem">${typeChips()}</div>`)}
${sec("sec-wash", secHead("Questions", `The ${x.short}, answered`, null) + qaHtml(faqs))}
${ask(`Price a ${x.short} to your address`, `Give us the delivery postcode and a description of the entrance, and the cartage comes back in the same number as the container. ${PROMISE}.`, x.slug)}`;
    out(x.slug, shell({ t: `${x.title} — Buy Or Hire From ${aud(x.usedFrom)} | ${BRAND}`, d: `${x.title} to buy or hire from ${aud(x.usedFrom)} ex GST. ${x.specs.ext} outside, ${x.specs.cube} inside. New, cargo-worthy and as-is grades, released from the yard closest to you and delivered nationally.`, c: `/${x.slug}/`, schema: g(crumbsLd(crumbs), faqLd(faqs), productLd(x)) }, body));
  });
}

/* ============================== TYPE PAGES ============================== */
function typePages() {
  P.types.forEach((x) => {
    const others = P.types.filter((y) => y.slug !== x.slug);
    const low = x.name.toLowerCase();
    const faqs = [
      { q: `What is a ${low} shipping container?`, a: x.lead },
      { q: `What lengths do ${low} containers come in?`, a: x.slug === "dangerous-goods-shipping-containers" ? "Dangerous goods units are built rather than found, and they turn up most often as 10ft and 20ft. What is achievable depends on what is on the production run and on whether anything finished is standing anywhere in the network. Tell us the class going inside it and the volume, and you get an answer on both the specification and the lead time in the same conversation." : "Most commonly 20ft and 40ft, with some configurations available as a 10ft as well. Availability shifts week to week, particularly on used stock, so the question worth asking is not what a list says but what is physically standing in the nearest yard the day you ring. Ask, and you will be told exactly that." },
      { q: `Is a ${low} container watertight?`, a: "Grade settles that, not configuration. Cargo-worthy stock is inspected wind and watertight before it is released, and new single-trip units are sealed as well. As-is carries no watertight claim at all — it is priced on its faults, and those faults get described plainly and photographed on request rather than left to turn up with the truck. If whatever goes inside has to stay dry, start at cargo-worthy and do not drop below it." },
      { q: `Does a ${low} container cost much more than a plain one?`, a: "It depends which one is being asked about. A high cube sits only a little above the standard version of the same length. Side opening, refrigerated and dangerous goods units are different containers rather than modified ones — heavier, more complicated, and made in far smaller numbers — so they are priced accordingly. Describe what the container has to do and the realistic options get costed next to each other instead of the dearest one being pushed at you." },
      { q: `Can I hire a ${low} container?`, a: "Yes, across most of the range and into every state we deliver to. Hire makes sense where the container has an end date on it and buying makes sense where it does not, and the crossover between the two arrives sooner than people expect it to. Give us the period and the delivery postcode and it gets priced both ways in the one reply." }
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
    <div class="reveal"><p class="eyebrow">The short version</p><h2>Why people order this one</h2><ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>
    <div class="reveal" style="margin-top:2.6rem">${x.detail.map((p, i) => `<p${i === 0 ? "" : ""}>${esc(p)}</p>`).join("")}</div>
    ${x.slug === "dangerous-goods-shipping-containers" ? "" : `<div style="margin-top:1.8rem">${asIs()}</div>`}
  </div>
  <div class="specside">
    <div class="pricebox reveal">
      <h3>Price this one</h3>
      <p style="color:var(--pale);font-size:.95rem">Give us the length, the grade and the delivery postcode. ${esc(PROMISE)}.</p>
      <a class="btn btn-primary btn-wide" href="/contact/">Send an enquiry</a>
      <a class="btn btn-ondark btn-wide" style="margin-top:.6rem" href="${S.phoneHref}">${esc(S.phone)}</a>
      <p class="pricenote">Cartage is worked out per address and quoted with the box, because the access at the delivery end shifts the figure as much as the kilometres do.</p>
    </div>
  </div>
</div>`)}
${gallery(["gal-" + x.slug + "-1", "gal-" + x.slug + "-2", "gal-" + x.slug + "-3"], [`${x.name} container — exterior`, `${x.name} container — doors`, `${x.name} container — interior`]) ? sec("sec-wash", secHead("Photos", `${x.name} units`, "Jobs we have done rather than catalogue imagery. Photographs of the exact unit you are buying can be sent on request, before delivery.") + gallery(["gal-" + x.slug + "-1", "gal-" + x.slug + "-2", "gal-" + x.slug + "-3"], [`${x.name} container — exterior`, `${x.name} container — doors`, `${x.name} container — interior`])) : ""}
${sec("sec-dark", secHead("Lengths", "Available as", null) + rangeGrid(P.sizes))}
${sec("", secHead("Other configurations", "Something else in the range", null) + rangeGrid(others))}
${sec("sec-wash", secHead("Questions", `${x.name} containers, answered`, null) + qaHtml(faqs))}
${ask(`Price a ${low} unit`, `Describe the job and give us the delivery postcode. ${PROMISE}.`, x.slug)}`;
    out(x.slug, shell({ t: `${x.title} — Sale & Hire, Delivered Nationally | ${BRAND}`, d: x.metaDesc, c: `/${x.slug}/`, schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
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
