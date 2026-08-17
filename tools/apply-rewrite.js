#!/usr/bin/env node
/* Splice complete function definitions from tools/rewrite/<name>.js into the
   real engine, matching by function name. Refuses to write unless every
   function in the rewrite file was found exactly once. */
const fs = require("fs");
const name = process.argv[2];
const src = fs.readFileSync(`tools/rewrite/${name}.js`, "utf8");
let bp = fs.readFileSync("build-pages.js", "utf8");
let bj = fs.readFileSync("build.js", "utf8");
const re = /^function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{[\s\S]*?^\}$/gm;
let m, done = [], fail = [];
while ((m = re.exec(src))) {
  const fn = m[1], body = m[0];
  const find = new RegExp("^function\\s+" + fn + "\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?^\\}$", "m");
  if (find.test(bp)) { bp = bp.replace(find, () => body); done.push("build-pages.js::" + fn); }
  else if (find.test(bj)) { bj = bj.replace(find, () => body); done.push("build.js::" + fn); }
  else fail.push(fn);
}
if (fail.length) { console.error("NOT FOUND: " + fail.join(", ")); process.exit(1); }
fs.writeFileSync("build-pages.js", bp);
fs.writeFileSync("build.js", bj);
console.log("spliced " + done.length + ": " + done.join(", "));
