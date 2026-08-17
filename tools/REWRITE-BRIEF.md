# Koala service-page rewrite brief

## The problem you are fixing

`koala-website` was forked from the Fair Dinkum engine. All the DATA was
rewritten — 67 localities, 12 guides, products.json — but the **service and
process pages are prose hardcoded inside `build.js` / `build-pages.js`** and
only the place names were swapped. Measured against Fair Dinkum's LIVE site:

    /delivery/                86% of its 8-word phrases are Fair Dinkum's
    /faqs/                    81%
    /container-inspection/    79%
    /shipping-container-hire/ 73%
    /how-it-works/            71%

The floor is ~14% (shared nav, footer, breadcrumbs). **Your target is under
25%, and under 20% is better.** Both sites are live and sell the same product,
so this is self-competition and duplicate content at the same time.

## Koala's angle — this is what makes the new copy different

Fair Dinkum owns *"come and look at it yourself"* — one yard, one district,
a personal deal. **Do not write that story.**

Koala is the national operation. The line is: **wherever the customer is, a
container is closer than they think.** Their unit comes out of whichever yard
is nearest rather than being carted across the country, on one 1300 line, with
the widest range in the group.

🔴 **Do NOT count depots or name a number of locations.** Never "nine depots",
"nine yards", "nine locations", "stock in nine places". James, 17/08/2026:
*"we want people thinking we have containers available near them, across the
whole country."* A number reads as a limit. Talk about the network without
enumerating it. Naming individual towns in passing is fine; counting them is not.

The Cornubia yard (51–55 Bromley Street, Cornubia QLD 4130) is still true and
still worth a mention — but as a supporting proof point, **not the headline
promise**. It is the one address that may appear anywhere on the site.

## Compliance — the build FAILS on these

1. **No freight, delivery or cartage figures. Ever.** No dollar amounts, no
   per-kilometre rates, no free-delivery radius. Container prices and hire
   rates are fine.
2. **No flood-proof, flood-safe or fire-proof.** Containers keep rain out from
   above; floodwater reaches the door seals and gets in, and an empty container
   floats.
3. Photos "on request" and "before delivery" — **never** "before you pay",
   "before you commit", "before payment".
4. **Watertight always scoped to a grade.** Cargo-worthy and new are checked
   wind and watertight; as-is is explicitly NOT sold watertight.
5. **No review counts, star ratings, sold counters or years-trading claims.**
6. **No other brand names** — not Fair Dinkum, Outback, Sunstate, Container
   Traders, Tiger, or any sibling. Town names are fine.
7. Australian English, AU spelling. Dates DD/MM/YYYY. AUD ex GST.
8. Trading hours Mon–Fri 7:30am–5pm, Sat 8am–12pm. Never "7 days".
9. Council/approval advice stays general — tell the reader to ring their own
   council, never state a specific rule.

## Technical constraints — do not break the build

- Keep the **exact function name and signature**.
- Keep the **same `out()` slug** — the URL must not change. 78 legacy URLs are
  asserted against it.
- Keep the schema calls (`g()`, `crumbsLd()`, `faqLd()`, `productLd()`) and keep
  every rendered FAQ in the `faqLd()` array — a visible `.qa` block without
  `FAQPage` schema fails the build.
- Keep using the existing helpers: `sec`, `secHead`, `band`, `plate`, `ask`,
  `qaHtml`, `pageHead`, `rangeGrid`, `specTable`, `priceBox`, `asIs`, `para`,
  `esc`. Do not invent new CSS classes.
- Exactly **one `<h1>` per page**, and titles/descriptions must stay unique
  across the whole site.
- The as-is caveat (`asIs()`) must stay on the buying and grades pages.

## How to work

1. Read the function you are rewriting in `/root/koala/build-pages.js` (or
   `/root/koala/build.js`) to learn its shape and what it must render.
2. Read the Fair Dinkum original at `/root/fd/build-pages.js` / `/root/fd/build.js`
   **only to know what to avoid**. Do not paraphrase it — paraphrase still
   shows up in the overlap check and still reads as the same page.
3. Write your replacement function(s) into `/root/koala/tools/rewrite/<YOURNAME>.js`.
   That file contains ONLY complete `function name() { ... }` definitions, each
   starting at column 0 and ending with a `}` at column 0. No imports, no
   exports, no other code.
4. Test with:  `cd /root/koala && bash tools/try-rewrite.sh <YOURNAME>`
   It splices into a scratch copy, builds, and prints the overlap table. It
   never touches the real engine, so it is safe to run repeatedly.
5. Iterate until the build passes **and every page you own is under 25%.**

Write like someone who has put thousands of containers on the ground: concrete,
plain, Australian, specific. Long sentences mixed with short. No marketing
throat-clearing, no "look no further", no exclamation marks.

Report only: the file path, the functions you rewrote, and the final overlap
percentage for each of your pages.
