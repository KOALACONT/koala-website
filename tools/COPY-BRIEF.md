# Koala Containers — locality copy brief (for writers)

You are writing locality data for **Koala Containers**, koalacontainers.com.au.
Shipping container sales and hire, Australia-wide. This is the group's flagship,
national brand. Read `/root/fd/data/locations/seq.json` FIRST for the
exact JSON shape and the standard of writing expected.

## HARD FACTS — never invent, never contradict

- Brand: **Koala Containers**. Phone **1300 467 776**. sales@koalacontainers.com.au
- Head yard: **51–55 Bromley Street, Cornubia QLD 4130** — real yard, signage,
  walk-in by arrangement. Roughly 30 minutes south-east of Brisbane CBD off the
  M1. This is the ONLY address that may appear in copy.
- Stock also sits at depots in **Grafton, Gympie, Rockhampton, Mackay,
  Townsville, Cairns, Darwin and Fremantle**. Inspection at those is *by
  arrangement*. **Never publish a street address for any of them** — they are
  third-party yards. Naming the town is fine and is the strongest local content
  available.
- Trading hours: Mon–Fri 7:30am–5pm, Sat 8am–12pm. Never "7 days".
- Australian English, AU spelling. Dates DD/MM/YYYY. AUD ex GST.

## BANNED — the build FAILS on these

1. **No freight, delivery or cartage figures. Ever.** No "$X delivery", no "free
   delivery within X km", no delivery bands or radii with dollar values.
   Delivery is described qualitatively and quoted with the container.
2. **No flood-proof, flood-safe or fire-proof.** Containers keep rain out from
   above. Floodwater reaches the door seals and gets in, and an empty container
   floats.
3. **Photos** may be offered "on request" and "before delivery" — NEVER
   "before you pay", "before you commit" or "before payment".
4. **Watertight claims must be scoped to a grade.** Cargo-worthy and new are
   checked wind and watertight. As-is units are explicitly NOT sold watertight.
5. **No review counts, star ratings, sold counters or years-trading claims.**
   No "15 years", no "5/5", no "over 5,000 containers sold".
6. **No other brand names.** Never mention Fair Dinkum, Outback, Sunstate,
   Gympie Shipping Containers, Mackay Shipping Containers, Bundaberg Containers,
   Dalby, Kingaroy, Lismore Shipping Containers, Grafton Container Hire, Budget
   or Dan's. Naming the TOWN Gympie/Mackay/Grafton/Lismore/Dalby/Kingaroy/
   Bundaberg is fine and expected — the brand name is not.
7. **No competitor names.**

## The as-is caveat must NOT appear on locality pages
It lives on the home, range hub, size and grade pages. Locality pages point at
the grades page instead. Do not paste grade explanations into locality copy.

## Quality bar — this is the whole point

Generic locality pages do not rank and can hurt. Every page must be **visibly
about that place** and impossible to swap for another town's page. Write from
what is actually true of the place:

- Soil and ground — river silt, black soil, sand, reactive clay, new estate fill
- Terrain — ridges, escarpments, floodplain, gullies, coastal dunes
- Streets and access — narrow older subdivisions, acreage tracks, steep drives,
  overhead trees, low bridges, one-lane causeways
- Distance and run — how far from the nearest depot, what that means for
  scheduling, whether it is a backload run or a dedicated truck
- Local industry — what people there actually use containers for. Cane, cattle,
  mining, marine, viticulture, cotton, tourism, defence, fishing, timber
- Weather — wet season, cyclone, frost, dust, salt air near the coast
- Council/covenant realities in general terms, never a specific rule

**Do not claim we have a yard, depot or office anywhere except Cornubia and the
eight depot towns listed above.**

## JSON shape — copy it exactly from the Fair Dinkum file

```
{
  "slug": "kebab-case",
  "name": "Town Name",
  "state": "QLD|NSW|VIC|WA|SA|TAS|NT|ACT",
  "postcode": "4000",
  "flagship": true|false,       // true only for capitals and major regionals
  "depot": "one sentence naming where stock for this town actually comes from",
  "leadTime": "Usually N–N business days from order to on the ground",
  "truck": "which truck for which size, and when it becomes a crane job",
  "metaDesc": "under 155 chars, unique, mentions the town",
  "line": "60–110 words. The single hardest thing about containers in this place.",
  "uses": "one long comma-separated clause, 60–100 words, naming REAL local
           suburbs, industries and jobs. No leading capital, no full stop.",
  "access": ["ONE string, 220–360 words, the delivery reality in this place"],
  "sections": [ { "h": "heading", "p": ["para", "para"] }, ... ],   // 3 sections
  "faqs": [ { "q": "...", "a": "..." }, ... ],                       // 4 FAQs
  "near": ["Nearby Town", "Nearby Town", "Nearby Town", "Nearby Town"]
}
```

- `sections`: exactly 3, each with a specific heading and 1–2 paragraphs of
  120–200 words each. Vary the headings between towns — do not use the same
  three headings on every page.
- `faqs`: exactly 4, and at least two must be answerable only for that town.
- `near`: 4–5 nearby places, plain names, no links.
- Total per locality: roughly 1,200–1,600 words.

## Tone
Direct, plain, Australian, written by someone who has actually put containers on
the ground. Short sentences mixed with long. No marketing throat-clearing, no
"nestled in", no "look no further", no exclamation marks. Concrete over vague:
"the bed of a tilt-tray grounds out before the container is clear" beats
"difficult access". Never start two localities' `line` the same way.

## Output
Write ONE file: `/root/koala/data/locations/<region>.json` shaped as
`{ "locations": [ ... ] }`. Validate it parses with `node -e "require('...')"`
before you finish. Report only the file path and locality count.
