# Koala Containers — koalacontainers.com.au

Static site generator plus the built site. `node build.js` → `dist/`.
`TEST_BUILD=1 OUT_DIR=dist-test node build.js` → `dist-test/`, every page
`noindex` and `robots.txt` `Disallow: /`.

**109 pages + `404.html`.** The largest site in the group.

| Group | Count |
|---|---|
| Home, range hub | 2 |
| Sizes — 10ft, 20ft, 40ft | 3 |
| Types — general purpose, high cube, side opening, dangerous goods, refrigerated | 5 |
| Conditions — new, used, refurbished | 3 |
| Service and process — buying, hire, delivery, delivery areas, storage, grades, inspection, dimensions, modifications, depots, how it works, about, FAQs, contact | 14 |
| Localities | 67 |
| Guides — `/blog/` hub + 12 articles | 13 |
| Utility — thank-you, privacy | 2 |

## Where it came from

Forked from `KOALACONT/fairdinkum-website` on 17/08/2026, **not** from
`mackay-website`. The Fair Dinkum engine carries seven brands' worth of fixes
the older Mackay engine does not: content-hash cache busting, the review
freshness guard, the regional locality data split with startup validation, and
the locality copy-rotation collision check. All the copy, all the data and the
entire layout layer were rewritten for Koala.

## Structural distinctness

Every brand site in the group must be structurally different, not a recolour.
This one is: a single-tier sticky black masthead with the 1300 number pinned
right as a yellow plate; a video-led hero; yellow "plate" dividers taken from
the bar under the wordmark in the logo; a depot strip; hard 3px card borders
instead of shadows; spec-table-led product pages; a four-column footer. There
is no mega-menu and no alternating full-bleed photo band anywhere.

Typefaces are **Anton** (display) and **Barlow** (text) — deliberately not the
Figtree/Inter pairing used by the site launched the same week.

## Colour

Brand yellow `#FBDB59` from the CRM `brands` table (`brand_color`, code `KOA`).
It is a light colour and clears nothing on white, so the system inverts rather
than fights it: yellow on black, black on yellow. Full measured contrast table
at the top of `static/css/style.css`. Every text pairing clears 4.5:1 and most
clear 7:1.

## ⚠️ The logo is a STAND-IN

James supplied the new logo as a black-background PNG in chat; it is not in this
repo. `mark()` in `build.js` reproduces its structure in SVG using the same
Anton face the site loads. **Drop the real artwork in at `static/img/logo.svg`
and `static/img/logo-light.svg` and the build picks it up automatically** — see
`LOGO_FILE()`. Do not go to production on the stand-in.

## Legacy URL migration

The WordPress site had **78 URLs**, and most towns carried four near-identical
pages: `/gympie/`, `/shipping-containers-for-sale-gympie/`,
`/new-shipping-containers-gympie/`, `/used-shipping-containers-gympie/`. That is
the doorway pattern built internally, and it split every ranking signal three
ways. **James approved consolidation on 17/08/2026:** one page per town, the
three variants 301 into it.

`data/legacy-urls.json` holds all 78. **The build FAILS if any of them would
404.** Redirect rules are written into `dist/.htaccess` by `tail()` and are
*pattern-based* rather than a hand-listed table, so a legacy URL nobody recorded
still lands somewhere sensible.

Locality slugs are preserved 1:1 and are deliberately not redirected. Only six
service URLs move: `/contact-us/`, `/our-story/`, `/our-services/`,
`/shipping-container-delivery/`, `/faqs-2/` and `/cardio-hire-terms/` (left over
from an unrelated business).

## Build checks — the build fails on any of these

109 pages · 0 sibling-brand names · 0 banned phrases (flood-proof, flood-safe,
fire-proof, "before you pay", "before you commit") · exactly one `<h1>` per page
· unique titles and descriptions · every JSON-LD block parses · `"brand":"KOA"`
and `1300 467 776` on every page · no empty `streetAddress` · no visible FAQs
without `FAQPage` schema · as-is caveat present on home, range hub, all three
size pages, buying and grades, and absent from all 67 locality pages · no
locality pair shares more than 4 of 7 rotated copy slots · every internal link
resolves · **all 78 legacy URLs resolve as a 200 or a 301**.

Copy-rotation pool lengths are deliberately different and mostly coprime —
13, 11, 9, 14, 12, 10, 15. Worst pair overlap across 67 localities: **3 of 7**.

## Data

- `data/site.json` — brand, address, hours, depots, video, lead endpoint, reviews
- `data/products.json` — grades, sizes, types, conditions, modifications
- `data/locations/*.json` — 67 localities across nine regional files
- `data/posts.js` — 12 guides
- `data/legacy-urls.json` — the 78 WordPress URLs

## Open items

- [ ] **Real logo artwork** — see above
- [ ] **Photography.** `"photos": true` but no images are loaded yet. The
      library audit is incomplete: of 419 images only 128 have been checked for
      ABC branding, faces, plates and paperwork, and just 70 survived — all
      allocated to another brand. Audit the remaining ~291 before loading.
      `IMG()` degrades to nothing when a file is missing, so the site is safe
      to run in this state.
- [ ] **Reviews are OFF.** `reviews.show` is `false` until the exact rating and
      count are read off the verified Koala Containers Google Business Profile.
      Never invent figures.
- [ ] **Guide prices carried over from a sibling brand** and need James's
      confirmation for Koala before launch.
- [ ] `.github/workflows/build.yml` must be added **from cPanel Terminal** —
      the GitHub connector and a direct push both 403 on `.github/workflows/*`.
- [ ] Add this repo to the `koala-site-deploy` token allow-list or pushes 403.
- [ ] Group-wide: the lead-intake secret is still a plain literal in public JS.
