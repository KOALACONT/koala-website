#!/bin/bash
# Splice one rewrite file's functions into a SCRATCH copy of the engine, build
# it to its own directory, and measure cross-brand overlap. Never touches the
# real build-pages.js, so several of these can run at once without colliding.
#   usage: bash tools/try-rewrite.sh <name>       (reads tools/rewrite/<name>.js)
set -e
N="$1"; R="tools/rewrite/$N.js"; W="/tmp/wk-$N"
[ -f "$R" ] || { echo "no $R"; exit 1; }
rm -rf "$W"; mkdir -p "$W"; cp -a build.js build-pages.js data static tools "$W/"
node -e '
const fs=require("fs");
const src=fs.readFileSync(process.argv[1],"utf8");
let tgt=fs.readFileSync(process.argv[2]+"/build-pages.js","utf8");
let tgt2=fs.readFileSync(process.argv[2]+"/build.js","utf8");
const re=/^function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{[\s\S]*?^\}$/gm;
let m,n=0;
while((m=re.exec(src))){
  const name=m[1], body=m[0];
  const find=new RegExp("^function\\s+"+name+"\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?^\\}$","m");
  if(find.test(tgt)){tgt=tgt.replace(find,()=>body);n++;console.log("  spliced build-pages.js :: "+name);}
  else if(find.test(tgt2)){tgt2=tgt2.replace(find,()=>body);n++;console.log("  spliced build.js       :: "+name);}
  else console.error("  !! no such function: "+name);
}
if(!n){console.error("nothing spliced");process.exit(1)}
fs.writeFileSync(process.argv[2]+"/build-pages.js",tgt);
fs.writeFileSync(process.argv[2]+"/build.js",tgt2);
' "$R" "$W"
( cd "$W" && node build.js 2>&1 | tail -12 && node tools/overlap-check.js dist /root/fd/dist 25 2>&1 | tail -20 )
