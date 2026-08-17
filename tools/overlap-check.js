#!/usr/bin/env node
/* ============================================================================
   CROSS-BRAND DUPLICATE COPY CHECK

   Why this exists. Koala was forked from the Fair Dinkum engine. All the DATA
   was rewritten — 67 localities, 12 guides, the product copy — but the service
   and process pages are prose hardcoded in build-pages.js, and on the first
   pass only the place names were swapped. The result was /delivery/ sharing
   86% of its 8-word phrases with Fair Dinkum's LIVE delivery page, /faqs/ 81%,
   /container-inspection/ 79%.

   Two live sibling sites with near-identical service pages is the exact
   self-competition the twelve-site strategy exists to avoid, and it is
   invisible unless something measures it. James spotted the tip of it in a
   single headline.

   Usage:  node tools/overlap-check.js <this-dist> <sibling-dist> [threshold]
   e.g.    node tools/overlap-check.js dist ../fd/dist 25

   The floor is roughly 13-15% — shared nav, footer, breadcrumbs, the phrase
   "shipping containers" and the town name. Anything materially above that is
   copy that was inherited rather than written.
   ========================================================================= */
const fs = require("fs"), path = require("path");
const N = 8;

const strip = (h) => h
  .replace(/<script[\s\S]*?<\/script>/g, " ")
  .replace(/<style[\s\S]*?<\/style>/g, " ")
  .replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ")
  .replace(/\s+/g, " ").toLowerCase();

function walk(dir, fn) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, fn);
    else if (e.name.endsWith(".html")) fn(f);
  });
}
function shingleSet(dir) {
  const set = new Set();
  walk(dir, (f) => {
    const w = strip(fs.readFileSync(f, "utf8")).split(" ").filter(Boolean);
    for (let i = 0; i + N <= w.length; i++) set.add(w.slice(i, i + N).join(" "));
  });
  return set;
}

const mine = process.argv[2] || "dist";
const theirs = process.argv[3] || "../fd/dist";
const threshold = Number(process.argv[4] || 25);

if (!fs.existsSync(theirs)) {
  console.log(`  sibling build not found at ${theirs} — skipping cross-brand check`);
  process.exit(0);
}

const sib = shingleSet(theirs);
const rows = [];
walk(mine, (f) => {
  const w = strip(fs.readFileSync(f, "utf8")).split(" ").filter(Boolean);
  let tot = 0, hit = 0;
  for (let i = 0; i + N <= w.length; i++) { tot++; if (sib.has(w.slice(i, i + N).join(" "))) hit++; }
  if (tot > 200) rows.push({ page: path.relative(mine, f).replace(/index\.html$/, "") || "/", pct: (100 * hit) / tot });
});
rows.sort((a, b) => b.pct - a.pct);

const over = rows.filter((r) => r.pct > threshold);
console.log(`\n  Cross-brand duplicate copy — ${rows.length} pages vs ${theirs}`);
rows.slice(0, 15).forEach((r) => {
  const flag = r.pct > threshold ? "✗" : " ";
  console.log(`  ${flag} ${r.pct.toFixed(1).padStart(5)}%  /${r.page}`);
});
const median = rows.length ? rows[Math.floor(rows.length / 2)].pct.toFixed(1) : "0";
console.log(`\n  median ${median}%   over ${threshold}%: ${over.length} page(s)`);
if (over.length) { console.error(`  ✗ ${over.length} page(s) share too much copy with the sibling site\n`); process.exitCode = 1; }
else console.log(`  ✓ no page exceeds ${threshold}%\n`);
