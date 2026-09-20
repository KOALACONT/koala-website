/* ============================================================================
   Koala Containers — page builders, part two.
   Required by build.js. Shares its helpers through global.__FD.
   ========================================================================= */
const F = global.__FD;
const { fs, path, S, LOCS, P, POSTS, DIST, TEST, D, pages, BRAND, SHORT, HOURS, SERVICE_AREA,
  PROMISE, PROMISE_DETAIL, ADDR, ADDR_LINE, esc, aud, auDate, para, paras, out, IMG, IMGP, havePhoto,
  crumbsLd, faqLd, g, shell, crumbHtml, sec, secHead, qaHtml, typeChips, band, asIs, locCaveat,
  rangeGrid, gallery, rank, pick, PRICES, askLink, PRICE_DISCLAIMER, PRICE_SUB, USES_HEADS, ACCESS_HEADS, NEAR_HEADS, OPENERS,
  PROCESS_LINES, FREIGHT_LINES, ASK_LINES, ask, promiseStrip,
  plate, depotStrip, videoBlock, specTable, priceBox, productLd, reviewLine, SHOW_REVIEWS, REV } = F;

const HOME_CRUMB = ["Home", "/"];

/* Standard page scaffold: breadcrumb, photo header, promise strip. */
function pageHead(o) {
  return `${crumbHtml(o.crumbs)}
<header class="phead"><div class="phead-media">${o.poolPhoto ? IMGP(o.poolPhoto[0], o.poolPhoto[1], o.poolPhoto[2], o.h1, { w: 1800, h: 900, eager: true }) : IMG(o.photo, o.h1, { w: 1800, h: 900, eager: true })}</div><div class="wrap">
  <p class="eyebrow">${esc(o.eyebrow)}</p>
  <h1>${esc(o.h1)}</h1>
  <p class="phead-lede">${esc(o.lede)}</p>
  ${o.facts ? `<dl class="phead-facts">${o.facts.map((f) => `<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join("")}</dl>` : ""}${o.cta ? `<div class="hero-cta"><a class="btn btn-primary btn-lg" href="${o.cta[0]}">${esc(o.cta[1])}</a><a class="btn btn-ondark btn-lg" href="${S.phoneHref}">${esc(S.phone)}</a></div>` : ""}
</div></header>
${promiseStrip()}`;
}
F.pageHead = pageHead; /* shared with build-pages-b.js */

/* ============================ LOCALITY PAGES ============================ */
/* 17/09/2026 SEO pulse: "shipping containers for sale" sits at position ~18
   with 1,500 impressions a month. The highest-impression locality pages send
   one contextual text link into /container-sales/ so the sale page inherits
   their authority. Deliberately a short list, not all 67. */
const SALE_LINK_SLUGS = new Set(["brisbane", "gold-coast", "sunshine-coast", "toowoomba", "ipswich", "logan"]);
function localityPages() {
  LOCS.forEach((l) => {
    const saleLink = SALE_LINK_SLUGS.has(l.slug) ? ` Buying outright? See our <a href="/container-sales/">shipping containers for sale</a> — new and used, with what each grade promises and what to check on the unit itself.` : "";
    const crumbs = [HOME_CRUMB, ["Where we deliver", "/delivery-areas/"], [l.name, `/${l.slug}/`]];
    const usesHead = pick(USES_HEADS, "uses", l.slug);
    const accessHead = pick(ACCESS_HEADS, "access", l.slug);
    const nearHead = pick(NEAR_HEADS, "near", l.slug);
    const opener = pick(OPENERS, "open", l.slug);
    const processLine = pick(PROCESS_LINES, "proc", l.slug);
    const freightLine = pick(FREIGHT_LINES, "freight", l.slug);
    const askLine = pick(ASK_LINES, "ask", l.slug);

    const svc = {
      "@type": "Service", name: `Shipping container sales and hire in ${l.name}`,
      serviceType: "Shipping container sales, hire and delivery",
      provider: { "@id": `${D}/#biz` },
      areaServed: { "@type": "City", name: l.name, address: { "@type": "PostalAddress", addressLocality: l.name, addressRegion: l.state, postalCode: l.postcode, addressCountry: "AU" } }
    };

    /* House rule: no published delivery timeframes (the other brand sites
       were swept of them on 20/09/2026; this repo on 21/09/2026). leadTime
       in the data files describes what governs timing in each town (stock,
       the run, the ground), not a number of days, and the actual date is
       confirmed with the quote. Do not reintroduce a window here. */
    const timingLine = (t) => String(t).trim().replace(/\.$/, "");
    const depotLine = String(l.depot).trim().replace(/\.$/, "");

    const body = `${pageHead({
      crumbs, poolPhoto: ["pool-lochead", "lh", l.slug], eyebrow: `${l.name}, ${l.state}`,
      h1: `Shipping containers ${l.name}`,
      lede: l.line,
      facts: [["Stock usually drawn from", depotLine], ["What sets the timing", timingLine(l.leadTime) + " — the date is confirmed when you place the order"], ["Likely truck", l.truck]]
    })}

${sec("", `<div class="narrow">
  <p class="eyebrow reveal">${esc(opener)}</p>
  <div class="reveal"><h2>Buying or hiring a container in ${esc(l.name)}</h2>
  <dl class="quickans">
    <div><dt>What you can buy or hire here</dt><dd>10ft, 20ft and 40ft — general purpose, high cube, side opening, refrigerated and dangerous goods — in new single-trip, cargo-worthy used or as-is, to buy or to hire. Delivered to ${esc(l.name)} and the district around it.${saleLink}</dd></div>
    <div><dt>How you get a delivered price</dt><dd>Send the form below or ring <a href="${S.phoneHref}">${esc(S.phone)}</a>. The container and the cartage to your address come back as one figure from a person — nothing on this page calculates it.</dd></div>
    <div><dt>What we need from you</dt><dd>The delivery suburb or postcode, what is going in it, roughly when, and ideally three photos of the entry. ${esc(processLine)}</dd></div>
    <div><dt>What changes availability and delivery</dt><dd>Which yard is holding the size and grade you want, the truck your site can take — the site and the carrier decide that, not the container — and what is already travelling that way. Timing on this page is indicative; the actual date comes with the quote.</dd></div>
  </dl>
  <p class="ask-cta ask-cta-left"><a class="btn btn-primary" href="#quote">Request a delivered price</a><a class="btn btn-ghost" href="${S.phoneHref}">${esc(S.phone)}</a></p>
  <p class="fineprint">${esc(ADDR.suburb)} is the only yard you can walk into — ring first. Everywhere else, ask for photographs of the actual unit before delivery, or inspection by arrangement at a partner depot.</p>
  </div>
  <div style="margin-top:1.4rem">${locCaveat()}</div>
</div>`)}

${sec("sec-wash", secHead("The range", `Containers we deliver to ${l.name}`, PRICE_SUB) + rangeGrid(P.sizes) + `<div style="margin-top:1.6rem">${typeChips()}</div>`)}

${sec("", `<div class="narrow">
  <div class="reveal"><h2>${esc(usesHead)}</h2><p>Around ${esc(l.name)} we deliver containers for ${esc(l.uses)}.</p></div>
  <div class="reveal" style="margin-top:2.6rem"><h2>${esc(accessHead)}</h2>${paras(l.access)}</div>
</div>`)}

${l.sections.map((s, i) => band({
      poolPhoto: ["pool-locband" + (i + 1), "lb" + (i + 1), l.slug],
      eyebrow: i === 0 ? l.name : i === 1 ? "On the ground" : "Worth knowing",
      h: s.h, p: s.p, alt: i % 2 === 1, dark: i === 1, wash: i === 2
    })).join("\n")}

${sec("", `<div class="narrow">
  <div class="reveal"><h2>What delivery to ${esc(l.name)} costs</h2><p>${esc(freightLine)}</p></div>
  <div class="reveal" style="margin-top:2.4rem"><h2>${esc(nearHead)}</h2><p>We also deliver to ${l.near.map((n) => esc(n)).join(", ")} and the surrounding district. If your town is not on the list, ring — it almost certainly still works.</p><div class="chips" style="margin-top:1rem"><a href="/delivery-areas/">All delivery areas</a><a href="/delivery/">How delivery works</a></div></div>
</div>`)}

${sec("sec-wash", secHead("Common questions", `Buying a container in ${l.name}`, null) + qaHtml(l.faqs))}

${ask(askLine, `We deliver to ${l.name} and the surrounding district. Tell us what is going in it and what the access is like, and you will get a price with the cartage worked out.`, l.slug)}`;

    out(l.slug, shell({
      t: `Shipping Containers ${l.name} — For Sale & Hire | ${BRAND}`,
      d: l.metaDesc, c: `/${l.slug}/`,
      schema: g(crumbsLd(crumbs), faqLd(l.faqs), svc)
    }, body));
  });
}

/* =========================== DELIVERY AREAS HUB ========================= */
function deliveryAreas() {
  const crumbs = [HOME_CRUMB, ["Where we deliver", "/delivery-areas/"]];
  const byState = {};
  LOCS.forEach((l) => { (byState[l.state] = byState[l.state] || []).push(l); });
  const order = ["QLD", "NSW", "VIC", "SA", "WA", "TAS", "NT", "ACT"];
  const NAME = {
    QLD: "Queensland", NSW: "New South Wales", VIC: "Victoria", SA: "South Australia",
    WA: "Western Australia", TAS: "Tasmania", NT: "Northern Territory", ACT: "Australian Capital Territory"
  };
  const BLURB = {
    QLD: "From the border to the Cape and out west past the range. The head yard is here, which is why so much of the Queensland work goes out on short notice.",
    NSW: "Coast, tablelands and the far west. Sydney addresses get booked around traffic windows and kerb space rather than around distance, so the metro jobs need the earliest start.",
    VIC: "Melbourne and the regional centres. Country Victorian drops are usually the simplest deliveries we do, provided the ground has had a week to dry out.",
    SA: "Adelaide, the Yorke and Eyre runs, and the towns out along the highways north and south-east of the city.",
    WA: "Perth, the south-west and the coastal towns running up to the Pilbara and beyond. Distance is a genuine factor over here, so give us the date as early as you have it.",
    TAS: "Across the strait. Sailings set the timetable as much as trucks do, and that is worth knowing before you promise a date to anyone else.",
    NT: "Darwin, Katherine, Alice and the runs between them. Once the wet is in, what the ground will hold matters more than the kilometres.",
    ACT: "Canberra and the surrounding district, including the Queanbeyan and Yass side of the border."
  };
  const faqs = [
    { q: "My town is not on the list. Do you still deliver there?", a: "Almost certainly. What you are looking at is the list of places we can write something specific and true about — the approaches, the ground, the thing that usually catches people out. It is a far shorter list than the places we go. Give us a postcode and you will get a straight yes or no, plus what it goes on and how long it takes." },
    { q: "Which yard will my container come from?", a: "Whichever one makes the shortest sensible run to your address while still holding the size and grade you have asked for. Now and then those two pull against each other — the closest unit is not the one you want — and when that happens we put both options in front of you instead of quietly picking one." },
    { q: "Is it dearer to deliver to a country town than to a capital city?", a: "Not as a rule. The kilometres are only half of it and the job waiting at your end is frequently the bigger half. A wide paddock gate three hours inland can be a far easier drop than an inner-suburban frontage with a plane tree over the kerb. Delivery is worked out per address alongside the container itself, once we know both ends of the run." },
    { q: "How much notice do you need for a country or interstate delivery?", a: "As much as you can spare. Regional runs are scheduled rather than sent on demand, and Tasmania, the far north and the Territory through the wet want more again, because sailings and road conditions set that timetable, not us. If there is a fixed date at your end — a settlement, a shutdown, a removalist booked — put it in the first message and we will build the run around it." },
    { q: "Can I pick one up myself instead?", a: `From the head yard at ${ADDR_LINE}, yes, by arrangement. You need a trailer rated for the weight and the means to restrain it properly, because a loaded twenty-footer is not something to improvise a tie-down for. Let us know when you are coming so the unit is pulled out and the paperwork is done before you get here.` }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-areas", eyebrow: "Coverage",
    h1: "Container delivery, Australia-wide",
    lede: `Wherever you are, there is usually a container closer than you think. Give us the address and we will tell you which yard yours starts from, what it travels on and when it lands.`
  })}
${sec("", `<div class="narrow">
  <div class="reveal"><h2>Your container starts nearer you than you would guess</h2>
  <p>Most people ring assuming the unit gets carted to them from wherever the company happens to live. That is not how this runs. Stock is held and turned over through yards spread right across the country, so the first thing worked out on an order is not the price — it is which of those yards the container should come off. For the large majority of addresses that answer sits inside the same state, and often inside the same region.</p>
  <p>Three things follow from a shorter run. It costs less to cart, so more of what you spend goes into the container instead of the road. It arrives sooner, because the truck is not tied up for two days before it even reaches your postcode. And if something is not right when the doors get opened, a unit that came from two hours away can go back and be swapped, which is a very different conversation to one about a container now sitting two thousand kilometres from where it started.</p>
  <p>So lead with the delivery address, ahead of size and ahead of grade. It is the single piece of information that changes the most about the answer you get back.</p></div>
  <div class="reveal" style="margin-top:2.6rem"><h2>One number, wherever you are standing</h2>
  <p>There is one line — <a href="${S.phoneHref}">${esc(S.phone)}</a> — and the person who picks it up can see what is standing in the yards rather than only what is out the window. You do not have to guess which branch to ring, and you do not have to explain the job twice.</p></div>
</div>`)}
${plate("A container closer than you think", "Tell us the postcode and we will tell you where yours comes from.")}
${sec("sec-wash", secHead("What changes with distance", "The three things that move on a long run", null) + `<div class="range">
  <article class="rangecard reveal"><div class="rangecard-body"><h3>How soon it lands</h3><p>Within reach of a yard, a standard unit with clear access is the simplest job there is. Further out, the clock is set by the truck's run rather than by our paperwork. You get a date when you order and you get told plainly what would push it.</p></div></article>
  <article class="rangecard reveal"><div class="rangecard-body"><h3>What it arrives on</h3><p>Tilt-tray where there is a straight run in and firm ground to slide it onto. Crane truck where there is not, or where the box has to travel over a fence, a carport or a roofline. Some remote runs go flat-top with a machine at your end, which has to be sorted before the truck leaves.</p></div></article>
  <article class="rangecard reveal"><div class="rangecard-body"><h3>What is standing near you</h3><p>Choice is deepest near the ports and thins out the further inland you go. If you want a particular grade, a high cube rather than a standard, or a specific door arrangement, flag it in the enquiry — occasionally the right unit is worth waiting a few days for.</p></div></article>
</div>`)}
${order.filter((st) => byState[st]).map((st, i) => sec(i % 2 ? "" : "sec-wash", secHead(st, NAME[st] || st, BLURB[st] || null) + `<div class="locgrid">${byState[st].map((l) => `<a href="/${l.slug}/">${esc(l.name)}<span>${esc(l.postcode)} · ${esc(l.leadTime)}</span></a>`).join("")}</div>`)).join("\n")}
${band({ photo: "yard-cornubia", eyebrow: "Everywhere else", h: "Not on the list is not off the map", p: ["The towns above are the ones written up properly, because we have put enough steel on the ground in them to say something useful. They are not a boundary. Containers go a very long way past every one of them, including to places with a pub, a silo and not a great deal else.", `Ring ${S.phone} with an address and you will hear what the run looks like, which yard it starts from and how long it takes, before anybody starts talking about money.`], cta: ["/contact/", "Send us the address"], dark: true })}
${sec("", secHead("Common questions", "Coverage, timing and pick-up", null) + qaHtml(faqs))}
${ask("Tell us where it is going", `A suburb or a postcode is enough to start. ${PROMISE}.`, "areas")}`;
  out("delivery-areas", shell({ t: `Container Delivery Areas — Every State And Territory | ${BRAND}`, d: `Where ${BRAND} delivers shipping containers — ${LOCS.length} towns and cities written up in detail across every state and territory, with your unit despatched from the yard that makes the shortest run to you.`, c: "/delivery-areas/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ============================== DELIVERY ================================ */
function delivery() {
  const crumbs = [HOME_CRUMB, ["Delivery", "/delivery/"]];
  const faqs = [
    { q: "Where does my container actually come from?", a: "From whichever yard nearest you is holding the size and grade you asked for. That is the first thing we work out on any order, ahead of the price, because it sets both the cartage and the date. Sometimes the closest yard has the exact unit standing on hardstand; sometimes the grade you want is further away and the sensible answer is a slightly different unit much closer. Give us the town at the start of the conversation and we will tell you which way it falls." },
    { q: "How soon can a truck be there?", a: "In and around the capitals and the larger regional centres it comes down to which yard holds the grade and whether the site takes a truck, and the date is confirmed when you order. Further out it depends on when a truck is next running that way, because a container heading a long way inland generally travels with other freight rather than on its own. Deliveries run Monday to Friday, with Saturday mornings by arrangement, and you get a window rather than a minute." },
    { q: "Does somebody need to be on site when it lands?", a: "Somebody should be, even if it is a neighbour with your phone number. The driver will place the unit where you point, and the person pointing is the one who knows which way the doors have to face and where the drainage runs. If nobody can be there, peg the corners out, leave the gate open and send a photo of the marked spot through beforehand so the driver is not guessing." },
    { q: "How precisely can the container be placed?", a: "It depends on the truck. A tilt-tray sets the box down as the truck creeps forward, so the final position is a metre or so of judgement rather than a surveyed line. A side loader is far more exact and can drop a unit into a marked footprint. A crane truck is the most precise of the lot. If it has to land on pads, piers or a slab edge, say so when you enquire, because that is a side loader or crane job nine times out of ten." },
    { q: "What happens if the truck turns up and cannot get in?", a: "The load goes back on and everybody has lost a day, which is why we would rather spend ten minutes on it beforehand than argue about it afterwards. Send photographs with your enquiry — one from the road, one down the approach, one of the spot — and we will tell you which truck the job wants, or tell you it will not work as described, before anything is booked. Phone photographs are fine. Nobody needs a survey." },
    { q: "Can it be dropped onto sleepers, pads or a slab?", a: "Yes, and it is worth doing. Tell us at the quoting stage, get the pads in before the truck comes, and make sure they are level with each other rather than merely level individually. Keep the approach to them clear — a tilt-tray needs to run the box back over the ground behind the pads, and a stack of bricks in the way is the sort of small thing that stops a delivery dead." },
    { q: "Can I pick one up myself?", a: `From the Cornubia yard at ${ADDR_LINE}, by arrangement, if you are turning up with a trailer rated for it and the means to restrain it properly. A container is not a load to improvise with — it is heavy, it is awkward, and it is uninsured on the road if it is not tied down to standard. Ring ahead either way so the unit is dug out of the row and the paperwork is ready when you arrive.` },
    { q: "Why is there no delivery rate published anywhere on this site?", a: "Because a published rate would mislead more people than it helped. Cartage moves with the length of the run, with the yard the unit leaves from, and then it moves again with what the site forces us to send. Two addresses in the same postcode can be a long way apart on cartage if one takes a tilt-tray straight off the road and the other needs a crane over a fence. One phone call and an address gets you an exact figure instead of a range." }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-delivery", eyebrow: "Delivery",
    h1: "Getting the container onto your ground",
    lede: "Every unit we sell or hire arrives on a truck, and the truck is the part of the job with the least room to improvise. Here is where your container starts its run, what it arrives on, and what has to be true at your end for the driver to leave it where you want it.",
    facts: [["Leaves from", "The yard nearest you holding your unit"], ["Arrives on", "Tilt-tray, side loader or crane truck"], ["Days", "Monday to Friday, Saturday by arrangement"], ["Cartage", "Quoted with the container, per address"]]
  })}
${sec("", `<div class="narrow">
  <div class="reveal"><p class="eyebrow">Before the price</p><h2>The first question is which yard it leaves from</h2>
  <p>Containers are heavy, they are bulky, and every kilometre of road under one is money and time nobody gets back. So on any order the first thing worked out is not the figure — it is where the box is standing right now. Stock sits at yards and partner depots spread around the country, and the same cargo-worthy 20ft can be a short run from your gate or a long haul away, depending only on which one has it.</p>
  <p>That is the whole point of running it this way. Your unit starts its run somewhere reasonably close instead of being dragged across the continent, which means it lands sooner, it costs less to cart, and it gets handled fewer times. Handling is where paint gets scraped, door gear gets knocked out of line and a tidy container stops being tidy.</p>
  <p>Cornubia, south-east of Brisbane, is the yard you can walk into on a weekday and look down the floor of a container yourself. Everywhere else, inspection is by arrangement and we photograph the individual unit on request instead. Either way, tell us the delivery town in the first message and you will get a straight answer about where yours would come from.</p>
  <div class="chips" style="margin-top:1.4rem"><a href="/delivery-areas/">Towns we deliver to</a><a href="/depots/">How supply works</a><a href="/contact/">Get a delivered price</a></div>
</div>`)}
${plate("Cartage is quoted with the container, for your address", "The run is only half of it. The other half is what the truck has to do once it gets there.")}
${sec("", `<div class="narrow">${secHead("The truck", "Three ways a box gets put on the ground", "Which one your job needs is decided by the site, not by the container.")}
<ol class="steps">
  <li><h3>Tilt-tray</h3><p>The bed lifts on rams and the container slides off the back under its own weight while the truck edges forward. It is the plainest gear for the job and the one you want if the site allows it. What it asks for is length — a straight, firm run at the spot with clear ground behind it for the box to travel back onto, and no bend halfway along that stops the truck lining up square.</p></li>
  <li><h3>Side loader</h3><p>Two hydraulic lifting arms mounted on the trailer itself pick the container up and set it down alongside. It swaps the need for length for a need for width, so it suits narrow blocks, tight yards and anywhere the truck has to stay on the road while the box goes onto the property. One detail that catches people: on most side loaders the arms work off the driver's side, so the direction the truck can approach from tends to decide which side of your block the container can land on. The carrier confirms that for the truck actually sent.</p></li>
  <li><h3>Crane truck</h3><p>Lifts the container clear and swings it over whatever is in the way — a fence, a hedge, a retaining wall, a garden bed nobody wants driven across. It is the answer for courtyards, sloping blocks and places behind a house that no wheeled option reaches. It wants firm footing under the outriggers, room to put them down, and empty sky above the swing.</p></li>
</ol>
<p style="margin-top:1.6rem">There is no prize for booking heavier gear than the job needs, and the difference between these three shows up plainly on the invoice. Describe the site honestly and the cheapest truck that will actually work is the one that gets sent.</p>
</div>`)}
${sec("sec-grey", secHead("Access", "Walk the approach before the truck is booked", "Ten minutes and a tape measure at your end saves a wasted run at ours. These are the things that decide it.") + `<ul class="ticks">
  <li><strong>The straight run.</strong> Not the length of the driveway — the length of the straight part of it, ending square on the spot. A drive that doglegs is two short runs, not one long one.</li>
  <li><strong>The narrowest point.</strong> A gatepost, a rainwater tank, a letterbox, a low branch on one side or the neighbour's ute parked half on the verge. The pinch decides the job no matter how open the rest is.</li>
  <li><strong>Everything overhead.</strong> The service line off the street, the eave of the carport, the branch that looks high enough. A tilt-tray stands its bed up well above the height of the container to unload, so it needs far more air than the finished box will occupy.</li>
  <li><strong>Two separate ground questions.</strong> What the loaded truck drives over, and what the four corners of the container will sit on afterwards. Turf that carries a ute after a wet week will not carry a semi.</li>
  <li><strong>The way back out.</strong> A long approach with nowhere to turn means reversing the whole way to the road, and on a rural block that can be the hardest part of the day.</li>
  <li><strong>Which way the doors end up.</strong> Decide it before delivery, not after. Spinning a container round once it is down is another truck and another day.</li>
</ul>
<p style="margin-top:1.6rem">Most people skip the tape measure and send photographs instead, which works just as well: one from the road looking in, one from the entry looking towards the spot, one of the spot itself with something in frame for scale. Send those with your enquiry and you will usually get the truck, the timing and the figure back in one reply.</p>`)}
${band({ photo: "truck-side-loader", eyebrow: "The long run", h: "A drop at Longreach is not a drop at Logan", wash: true, p: ["Once you are away from the coast the shape of the job changes. The driver may be out for two or three days, the truck is often carrying more than one unit because a trip that far has to earn its keep, and the delivery window widens from a morning to a day or two either side. None of that is a problem as long as everybody knows it up front and nobody has booked a crew to be standing there waiting.", "What helps is detail. Property names do not appear on a truck GPS — give us the lot and road, the gate to use, whether there are grids a loaded truck should not cross, how many kilometres of station track sit between the gate and the shed, and a phone number that will actually be answered when the driver is half an hour out. Rural deliveries almost never fail on distance. They fail on the last two kilometres."], cta: ["/delivery-areas/", "Where we deliver"] })}
${band({ photo: "truck-crane", eyebrow: "Season", h: "In the north and the west, the road decides", dark: true, p: ["From around November through to March or April the top end and a good deal of the inland run on rain rather than on schedule. Roads close with no notice and open again the same way. A road that is open when the truck is loaded can be shut by the time the truck gets to it, and no amount of planning at either end changes that.", "You cannot quote around it, but you can leave slack for it. If a container has to be on a block up north or out west in the middle of the wet, order it earlier than feels necessary and expect the date to move once. It is also worth remembering that ground carrying a truck comfortably in August may not carry one in February — the wet season is when a delivery gets left at the gate rather than at the shed."] })}
${sec("", `<div class="narrow">${secHead("Cartage", "Why you will not find a delivery price list here", "Because the figure that is right for one address is wrong for the one down the road, and a wrong number is worse than no number at all.")}
<p>Cartage is worked out per address and quoted alongside the container, so what you get is one figure with everything in it rather than a container price and a question mark. Three things set it: the length of the run, the yard the unit is released from, and the gear the site makes necessary. That last one moves it more than people expect. A tilt-tray reversing onto flat industrial hardstand and a crane lifting over a back fence a suburb away are simply not the same job.</p>
<p>None of this is an attempt to be cagey. It is the opposite — publishing a headline rate that only holds for easy addresses means half the people who ring get a different number to the one they read, and that is a rotten way to start. Give us the address and a description of the entry and you will have a real figure the same day, or the next business day at the outside. ${esc(PROMISE)}.</p>
<p class="caveat">Sort the ground out while you are waiting on the quote. A container wants its weight carried on the four corner castings, sitting square and level, on sleepers, concrete pads or well-compacted base. Left slowly twisting on soft ground, the doors stop lining up and start needing a shoulder, and that is a siting fault rather than a fault in the container. Our <a href="/blog/anchoring-a-shipping-container/">guide to standing a container up properly</a> walks through it, and the <a href="/blog/moving-a-shipping-container/">notes on shifting one later</a> are worth a read before you decide where it goes.</p>
</div>`)}
${sec("sec-wash", secHead("Questions", "Delivery, access and timing", null) + qaHtml(faqs))}
${ask("Tell us where it is going", `An address and three photographs of the entry is usually all it takes. You will get the truck, the timing and a delivered figure back together. ${PROMISE}.`, "delivery")}`;
  out("delivery", shell({ t: `Container Delivery Australia-Wide — Trucks, Access And Timing | ${BRAND}`, d: "How a shipping container gets to your address: which yard it leaves from, tilt-tray against side loader against crane truck, what the driver needs from your site, and how remote runs and the wet season change the job.", c: "/delivery/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ================================ HIRE ================================== */
function hire() {
  const crumbs = [HOME_CRUMB, ["Container hire", "/shipping-container-hire/"]];
  const hireable = P.sizes.filter((x) => x.hire);
  const twenty = P.sizes.find((x) => x.short === "20ft");
  const faqs = [
    { q: "What does it cost to hire a container by the week?", a: `${PRICES ? `A 20ft starts at ${aud(twenty.hire)} a week ex GST, a 10ft sits under that and a 40ft above it, and` : "It is a weekly rate that follows the size and the grade, a 10ft sits under a 20ft and a 40ft above it, and"} the weekly figure eases as the term gets longer. Cartage in and collection out are quoted separately with the unit because they follow the address rather than the calendar. Tell us the term and the town together and you will get the whole cost of the arrangement instead of the headline part of it.` },
    { q: "How short can a hire be?", a: "A month is the usual floor. Below that the trucking at both ends dominates the arithmetic so completely that the weekly rate stops being the number that matters, and you are better off ringing and describing the job so we can tell you whether it is worth doing at all. Where a short term genuinely makes sense we will do it, we would just rather say so honestly than take the booking and let you work it out later." },
    { q: "At what point should I stop hiring and buy?", a: "Once a standard unit has sat on hire for a couple of years, what has been paid out is generally past what buying the same box would have cost, and at the end of it you own nothing. There are good reasons to keep hiring anyway — no capital tied up, no responsibility for the thing at the end, and a clean line in the accounts — but the arithmetic should be a choice rather than an accident. Ring and we will do the sums with you." },
    { q: "What condition does a hire unit turn up in?", a: "Cargo-worthy or better, inspected wind and watertight before it is released, with a lock box on the doors. As-is units are not hired out at all. An as-is container carries no watertight claim, and putting somebody's stock inside one for six months would be setting the arrangement up to end badly. If you want eyes on the specific unit before it is loaded, ask and we will photograph it on request, before delivery." },
    { q: "Can I cut a window or weld something onto a hire container?", a: "Not without agreeing it first. Shelving, racking and fixings that come out cleanly are usually fine and nobody minds. Cutting steel, welding on brackets or painting it is a different conversation, because the unit has to go back into the fleet afterwards. Raise it before the grinder comes out and it is generally workable; raise it at collection and it becomes an invoice." },
    { q: "How do I end a hire?", a: "Ring or email and tell us the date. Hire runs until the container is actually collected rather than until the day you finish emptying it, so notice is the thing that saves you money — give us as much as you can and we will book the truck into a run going that way. Have it empty, swept and accessible when the driver arrives, because a collection that cannot be completed still costs a truck." },
    { q: "Can hire turn into a purchase later?", a: "Often, and it is much easier to arrange at the start than eighteen months in. Where it stacks up we can structure the deal so what you have already paid counts toward buying that unit, which suits jobs where nobody honestly knows the end date. It depends on the individual container and the term, so ask about it when you first ring rather than assuming it later." },
    { q: "Who looks after a container while it is on hire to me?", a: "It sits on your site under your control, so it is worth checking that your policy covers a hired container and what is inside it — plenty of business policies do, plenty of household ones do not. Tell us straight away if it is damaged or broken into rather than at collection. Fair wear is expected and priced in; a hole in the side is not fair wear." }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-hire", eyebrow: "Hire",
    h1: "Container hire",
    lede: "Hire is the right call when the need has an end to it. A build that finishes, a season that turns, a shed that eventually goes up. You pay by the week, we cart it in, and when you are done we come and take it away again.",
    facts: [["Rates", "Weekly, ex GST, easing with the term"], ["Minimum", "A month as a rule"], ["Grade", "Cargo-worthy or better, no exceptions"], ["Ending it", "Give notice and we book the collection"]]
  })}
${sec("", `<div class="narrow">
  <div class="reveal"><p class="eyebrow">The test</p><h2>Can you put a month on the end of it?</h2>
  <p>That is nearly the whole decision. If you can name roughly when the container stops being needed — the practical completion date, the end of harvest, the week the fitout finishes — hire is almost certainly the cheaper and simpler answer, and you never have to think about what happens to the box afterwards. If the honest answer is that you have no idea and it might be forever, you are describing a purchase with extra steps.</p>
  <p>Cost is the other half of it. A weekly rate looks small next to the price of a container, and for a job measured in months it genuinely is. Stretch the same rate across a couple of years and the total quietly passes what the unit would have cost outright, except that at the end of it you hand it back. That is not automatically a bad deal — no capital tied up, nothing to resell, one clean line in the books — but it should be a decision rather than something that creeps up on you. The <a href="/blog/what-a-shipping-container-costs/">breakdown of what a container really costs</a> lays both columns out.</p></div>
</div>`)}
${sec("sec-grey", `<div class="spec">
  <div>
    <div class="reveal"><p class="eyebrow">Who hires</p><h2>Where hire plainly earns its keep</h2>
    <ul>
      <li><strong>Builders and civil crews.</strong> Tools, materials and the good gear locked up on site for the length of the job, then gone with the temporary fence.</li>
      <li><strong>Harvest, shutdowns and events.</strong> Weeks rather than years, at a cost you can put on a job sheet before the season starts.</li>
      <li><strong>Retail and warehouse peaks.</strong> Stock that has to live somewhere from October to January and nowhere after that.</li>
      <li><strong>Repair and insurance work.</strong> A house being put back together needs everything out of it and still on the block, where the owner can reach it.</li>
      <li><strong>Moves that went sideways.</strong> A settlement that landed early, a lease that ended badly, a rental gap of six weeks. Somewhere lockable, now.</li>
      <li><strong>Finding out what size you need.</strong> Hiring a 20ft for two months is a far cheaper way to learn you wanted a 40ft than buying the 20ft was.</li>
    </ul></div>
    <div class="reveal" style="margin-top:2.4rem"><h3>Where hire stock comes from</h3>
    <p>Hire works differently to a sale on one point that matters: the container has to come back. A unit sent a very long way has to make the return trip too, so hire availability is not spread quite as evenly as sale stock is. Some remote addresses are genuinely better served by buying a cargo-worthy unit and moving it on at the end of the job. Give us the town when you first ring and we will tell you which way it falls rather than quoting you a hire that makes no sense.</p></div>
  </div>
  <div class="specside">
    <div class="pricebox reveal">
      <h3>Weekly hire</h3>
      ${PRICES ? `<dl>${hireable.map((x) => `<div><dt>${esc(x.short)}, per week from</dt><dd>${aud(x.hire)}</dd></div>`).join("")}</dl>
      <p class="pricenote">Guide rates in Australian dollars, ex GST. Longer terms come down from these figures. Cartage in and collection out are quoted with the unit, for your address.</p>` : `<p class="pricenote">10ft, 20ft and 40ft on a weekly rate, in AUD ex GST. Longer terms come down. Cartage in and collection out are quoted with the unit, for your address, so you get the whole cost of the arrangement in one figure.</p>`}
      <a class="btn btn-primary btn-wide" href="/contact/">Get a hire figure</a>
    </div>
  </div>
</div>`)}
${plate("Nothing goes out on hire that has not been inspected", "Cargo-worthy or better, checked wind and watertight, lock box fitted.")}
${band({ photo: "hire-site", eyebrow: "The unit", h: "What actually turns up", p: ["A hire container is a working box rather than a showroom one, so expect honest marks — faded livery, scuffs, patches of surface rust where the paint has given up. What it will not have is a floor that gives underfoot, doors that need a bar to shut or a roof that lets weather through. Every unit is inspected wind and watertight before release and comes with a lock box welded over the padlock area.", "If you want to see the exact container before it is loaded, say so. Where it is standing at Cornubia you are welcome to come and look at it on a weekday; where it is standing further afield we photograph that individual unit on request, before delivery, and send it through."], cta: ["/container-grades/", "What the grades mean"], wash: true })}
${sec("", `<div class="narrow">${secHead("The arrangement", "Booking, running and ending a hire", null)}
<ol class="steps">
  <li><h3>Booking it</h3><p>Size, grade, roughly how long, and the address. We check what is standing at the closest yard, work out the cartage for that address and give you the weekly rate and the freight together. Nothing is committed until you say so.</p></li>
  <li><h3>The delivery</h3><p>Same job as any other container drop — the site has to take a truck, and the same access questions apply. Send photographs of the entry with the enquiry and we will sort the right truck out before it is booked rather than on the day.</p></li>
  <li><h3>While it is on hire</h3><p>Invoiced on the agreed cycle. If the job runs long, ring and extend it — that is a two-minute phone call, not a new agreement. If the job finishes early, the same call gets the collection moving sooner.</p></li>
  <li><h3>Off-hire</h3><p>Tell us the date, empty it, sweep it out and leave it where a truck can reach it. Hire runs to collection rather than to the day you stopped using it, so the notice you give is the money you save. Fair wear is expected; modifications you did not mention are the only thing that turns collection into a conversation.</p></li>
</ol>
<div class="chips" style="margin-top:1.8rem"><a href="/how-it-works/">How ordering works</a><a href="/delivery/">Delivery and access</a><a href="/container-sales/">Buying instead</a></div>
</div>`)}
${sec("sec-wash", secHead("Sizes", "What you can put on hire", null) + rangeGrid(P.sizes) + `<p class="fineprint" style="margin-top:1.6rem">Hire suits a job with a finish date on it. If the container is staying, compare the weekly rate against <a href="/10ft-shipping-containers/">10ft shipping containers for sale</a> or a <a href="/20ft-shipping-containers/">20ft</a> before you decide.</p>`)}
${sec("", secHead("Questions", "About hiring a container", null) + qaHtml(faqs))}
${ask("Get a hire figure", `Give us the size, roughly how long you need it and the town it is going to. You will get the weekly rate and the cartage together.`, "hire", { intent: "hire" })}`;
  out("shipping-container-hire", shell({ t: `Container Hire — Weekly Rates, Terms And Collection | ${BRAND}`, d: `Hire a shipping container by the week in 10ft, 20ft or 40ft${PRICES ? `, from ${aud(twenty.hire)} a week ex GST` : " anywhere in Australia"}. Cargo-worthy units inspected wind and watertight, delivered and collected anywhere in Australia.`, c: "/shipping-container-hire/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ================================ SALES ================================= */
function sales() {
  const crumbs = [HOME_CRUMB, ["Buying a container", "/container-sales/"]];
  const faqs = [
    { q: "What is the difference between a new and a used shipping container?", a: "A new container here means single-trip: built overseas, loaded once for the voyage to Australia, then stripped out and sold. Factory paint, a clean floor, seals that have barely seen weather, and the top of the price range. A used container has done years of sea service and is sold on its grade: cargo-worthy used is structurally sound, floor solid, doors sealing, and inspected wind and watertight before it leaves; as-is is retired with its faults described and photographed on request, and is not sold watertight. For plain storage most buyers are best served by cargo-worthy used. Where the container will be on show, lined out or converted, new single-trip is the safer start." },
    { q: "Which size shipping container should I buy?", a: "Settle what the site can take before what you would like. A 10ft suits a pinched side access or a small lock-up for tools and a mower. A 20ft is the default for the trade and for household storage, wants about seven metres of straight, level ground, and carries the deepest stock and the widest choice of grade. A 40ft gives near enough double the room and usually costs only a little more than a 20ft of the same grade, but needs a long, open approach and a crane truck. A high cube adds 300mm of headroom to a 20ft or 40ft and is the one to buy if the box is being lined, fitted with a roller door or converted. Ring with the address and we will tell you which of those actually fits." },
    { q: "Do you deliver shipping containers for sale Australia-wide?", a: "Yes. The head yard is at Cornubia, south-east of Brisbane, and stock is held and drawn through yards and depot partners in every state and territory, so a container bought here is released from the yard closest to your address rather than carted across the country. Delivery is quoted with the container, in one figure, because it moves with distance and with what your entry will take — give us the suburb or postcode and you get the whole cost to your address, not a headline that grows later." },
    { q: "How quickly can a container for sale be delivered?", a: "It depends on which yard holds the size and grade you have settled on and what is already travelling your way, so the honest answer comes with the quote rather than as a promise on a web page. A unit already standing in the yard nearest you moves sooner than a grade that has to be released from another state, and a long regional run is scheduled around what else is travelling that way. Tell us the date you are working to when you enquire and we will say plainly whether it is realistic." },
    { q: "How do I work out which grade I need?", a: "Ask what happens if the contents get damp. If the answer is nothing much — steel, timber, garden gear, building materials, a lock-up already standing under a roof — as-is is a genuinely good buy and paying for a higher grade buys you nothing you will use. If the answer is that something is ruined, start at cargo-worthy, which is inspected wind and watertight before release. New single-trip is for the jobs where the container is on show or is going to be built into something." },
    { q: "Can I look at the actual container first?", a: `Yes, and it is the best hour you can spend. The Cornubia yard at ${ADDR_LINE} is open on weekdays and Saturday mornings — ring ahead so the unit is pulled out of the row rather than buried three high. If the container you want is standing at a yard nowhere near you, ask and we will photograph that individual unit on request, before delivery: doors open, the length of the floor, the roof and any repair that has been done to it.` },
    { q: "How does payment work?", a: "The purchase is settled before the container is released for transport. That is standard in the trade and it is what allows a particular unit to be held with your name against it instead of being sold out from under you while paperwork moves. It is also exactly why we would rather you inspected it or looked at photographs of it first — nobody benefits from a surprise on the back of a truck." },
    { q: "Is a used container guaranteed?", a: "The grade is the guarantee, and it is a real one. Anything sold as cargo-worthy is inspected wind and watertight before it leaves, and if one turns up and is not, sorting it out is our problem rather than yours. As-is is the opposite arrangement done openly: the unit is sold on its faults, those faults are described and photographed, and it carries no watertight claim at all. What will not happen is a unit being described as something it is not." },
    { q: "Can you hold one while my slab cures?", a: "Usually, within reason, and plenty of people buy while the base is still being poured. There is a practical limit — a yard full of containers with names on them and no delivery dates is a yard that cannot trade — so treat it as a conversation rather than an assumption. Tell us the likely date when you buy and we will tell you honestly whether holding it that long works." },
    { q: "Is one 40ft better value than two 20fts?", a: "Often, on current quotes — a 40ft frequently costs only a little more than a 20ft for about twice the room, and it arrives on one truck instead of two. That depends on the grade, the units standing in the yard and the delivery run, so there is no blanket winner; ask for both figures. The catch is entirely at your end: a 40ft wants a good deal more straight approach, more room to manoeuvre and a longer level pad, and there are plenty of blocks that will take a 20ft comfortably and simply cannot fit the longer box. Work out what the site allows first, then compare the prices." },
    { q: "Do I need approval to put one on my property?", a: "It depends on your council, and the rules genuinely differ from one shire to the next — how long it is staying, whether it is visible from the street, how close to the boundary it sits and what you intend to use it for all come into it. It is one phone call to your own council and much better made before the container arrives than after somebody complains. There is a general rundown in our guide to council approval." }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-sales", eyebrow: "Shipping containers for sale",
    h1: "Shipping containers for sale — new and used, Australia-wide",
    lede: "New single-trip, cargo-worthy used and as-is containers in 10ft, 20ft, 40ft and high cube, sold from our yard near Brisbane and released from the yard nearest your address. You are not buying a model off a shelf but one particular steel box with a serial number on the door, which is why the grade, and knowing exactly what a grade promises, decides more than the length or the colour ever will.",
    facts: [["Sizes", "10ft, 20ft, 40ft and high cube"], ["Grades", "New single-trip, cargo-worthy used, as-is"], ["Delivered", "Australia-wide, from the nearest yard"], ["Price", "Quoted for the unit with delivery — ask for today's"]],
    cta: ["#quote", "Enquire about shipping containers for sale"]
  })}
${sec("", `<div class="narrow">
  <div class="reveal"><p class="eyebrow">Start here</p><h2>Individual units, not a product line</h2>
  <p>Stand two used 20ft containers side by side and they can be twelve years apart in condition while carrying the same description. One spent its sea life full of dry palletised freight and came off the ship straight into a yard. The other has been under a stack in the weather, has had a corner rebuilt after an argument with a forklift and has a floor that somebody hosed out for a reason. Both are steel boxes six metres long. They are not the same purchase.</p>
  <p>Which is why the grade is settled first and everything else follows from it. The data plate riveted to the door tells you the year it was built, who built it and what it was certified to carry; our <a href="/blog/container-markings-and-csc-plate/">guide to container markings</a> explains how to read one. After grade comes size, then which yard has that combination standing closest to you, and only then does a delivered figure mean anything.</p></div>
  <div style="margin-top:2rem">${asIs()}</div>
</div>`)}
${sec("sec-grey", secHead("Grades", "Three grades, and what each one actually promises", "Settle this before you compare anybody's price, because it moves the figure further than size does.") + `<div class="range">${P.grades.map((gr) => `<article class="rangecard reveal"><div class="rangecard-body"><h3>${esc(gr.name)}</h3><p>${esc(gr.blurb)}</p></div></article>`).join("")}</div><p style="margin-top:1.6rem"><a class="btn btn-ghost" href="/container-grades/">The grades in full</a></p>`)}
${band({ photo: "inspect-floor", eyebrow: "Inspection", h: "Get eyes on the box, one way or another", dark: true, p: ["Walk into the Cornubia yard on a weekday, open the doors, put your weight on the floor and run your eye down the roof line. Ring first so the unit you are interested in is standing where you can get around it rather than buried in a row.", "If the container that suits you is standing at a yard the other side of the country, that is what photographs are for. Ask and we will shoot that specific unit on request, before delivery — the floor down its whole length, the door gear, the roof, and anything that has been repaired. What we will not do is send you a stock photograph of a different container and hope."], cta: ["/container-inspection/", "The inspection checklist"] })}
${sec("", `<div class="narrow">${secHead("What to look at", "In the order of what it costs to put right", "A dented side panel photographs badly and matters very little. The things below matter a great deal and photograph fine.")}
<ul class="ticks">
  <li><strong>The floor.</strong> Marine ply, and the most expensive thing on the container to replace. Walk the length of it, put your heel down, look for softness, dark staining or a section that has already been patched.</li>
  <li><strong>The door gear.</strong> Hinges, cam bars, keepers and rubbers. This is most of what wind and watertight means in practice. Doors that want a shoulder now will want a crowbar in a year, and a perished gasket lets weather in at the one point rain is driven hardest.</li>
  <li><strong>The roof.</strong> Stand back far enough to see along it. Dents that hold a puddle are where rust starts, and a roof with several patch welds has a history worth asking about.</li>
  <li><strong>Corners and rails.</strong> The castings and the top and bottom rails carry the whole thing and are what a crane grabs. Damage here changes how the container sits, how it lifts and whether it can be stacked.</li>
  <li><strong>Old repairs.</strong> A patch is not a black mark by itself — plenty of sound containers carry them. A patch put on with the wrong steel, over a hole nobody prepared, is a different matter.</li>
  <li><strong>The smell.</strong> Shut the doors, wait a moment, open them. A container that carried something it should not have keeps the memory of it, and no amount of pressure washing removes it.</li>
</ul>
</div>`)}
${sec("sec-wash", secHead("Sizes for sale", "10ft, 20ft, 40ft and high cube — which one suits the job", "Every size is sold new single-trip or cargo-worthy used, and most in as-is. Prices are quoted for the individual unit with delivery to your address, so ask for today's price rather than working from a list.") + `<div class="reveal tablewrap">
<table class="spectable"><caption>Shipping containers for sale — sizes at a glance</caption>
<thead><tr><th scope="col">Size</th><th scope="col">Suits</th><th scope="col">Grades available</th><th scope="col">Price</th></tr></thead>
<tbody>
<tr><th scope="row"><a href="/10ft-shipping-containers/">10ft</a></th><td>Tight side access, small setbacks, a lockable spot for tools, a mower and a compressor. Goes in on a tilt-tray.</td><td>New single-trip, cargo-worthy used, as-is</td><td><a href="#quote">Ask for today's price</a></td></tr>
<tr><th scope="row"><a href="/20ft-shipping-containers/">20ft</a></th><td>The default for household storage, site stores and trade lock-ups. About seven metres of straight, level ground; deepest stock and widest choice of grade.</td><td>New single-trip, cargo-worthy used, as-is</td><td><a href="#quote">Ask for today's price</a></td></tr>
<tr><th scope="row"><a href="/40ft-shipping-containers/">40ft</a></th><td>Near enough double the room for only a little more than a 20ft of the same grade. Needs an open approach, a long level pad and usually a crane truck.</td><td>New single-trip, cargo-worthy used, as-is</td><td><a href="#quote">Ask for today's price</a></td></tr>
<tr><th scope="row"><a href="/high-cube-shipping-containers/">High cube</a></th><td>A 20ft or 40ft with another 300mm of headroom. The one to buy if it is being lined, fitted with a roller door or converted into a workshop or office.</td><td>New single-trip, cargo-worthy used</td><td><a href="#quote">Ask for today's price</a></td></tr>
</tbody></table>
</div>
<p class="fineprint" style="margin-top:1.4rem">Short on room? <a href="/10ft-shipping-containers/">10ft shipping containers for sale</a> are the pick where a longer unit will not turn — and the <a href="/20ft-shipping-containers/">20ft</a> is the better buy per cubic metre wherever the ground takes it.</p>
<p class="fineprint" style="margin-top:1.4rem"><strong>New or used?</strong> New single-trip and cargo-worthy used are both inspected wind and watertight before release. As-is is the cheap end, sold on its faults and not sold watertight — right for a lock-up under a roof, wrong for anything that must stay dry. The <a href="/container-grades/">grades page</a> has the full rundown.</p>
<div style="margin-top:1.6rem">${typeChips()}</div><p class="fineprint" style="margin-top:1.6rem">${esc(PRICE_DISCLAIMER)}</p>`)}
${band({ photo: "inspect-yard", eyebrow: "Supply", h: "Where the unit comes from changes what is available", p: ["No two yards hold the same stock in the same week. A grade that is standing four deep at one is a long way off at another, and the honest answer sometimes is that the closest yard has an excellent container that is not quite the one you asked for. Tell us the delivery town early and the conversation gets much shorter.", "Buying a unit that is a long way from you is perfectly normal and happens every week — it just needs the photographs done properly and the cartage worked out before anything is agreed rather than after."], cta: ["/blog/buying-a-container-interstate/", "Buying from another state"], wash: true })}
${sec("", secHead("Questions", "About buying a container", null) + qaHtml(faqs))}
${ask("Request a free price", `Tell us the size, the grade you are leaning towards, the town it is going to and what the entry looks like. A person comes back with a price for the exact unit, delivered, and tells you plainly which grade the job genuinely needs.`, "sales", { intent: "buy" })}`;
  out("container-sales", shell({ t: `Shipping Containers for Sale — New & Used | ${BRAND}`, d: "New and used shipping containers for sale — 10ft, 20ft, 40ft and high cube — delivered Australia-wide from our yard near Brisbane. Ask for today’s price.", c: "/container-sales/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* =============================== STORAGE ================================ */
function storage() {
  const crumbs = [HOME_CRUMB, ["Storage", "/container-storage/"]];
  const faqs = [
    { q: "There is water inside and the roof does not leak. Where is it coming from?", a: "Off the inside of the roof, almost certainly. Steel loses heat quickly overnight and drops below the temperature of the air shut in underneath it; whatever moisture that air is carrying comes out on the cold surface, runs to the low point and drips. It is the commonest complaint about container storage and it is very rarely the container's fault. The moisture came in with the contents or with the air, and the fix is ventilation and dry loading rather than a new roof." },
    { q: "Does a storage container need vents?", a: "If it is going to be shut up for months with anything that minds moisture, yes. Vents high at one end and low at the other let air move through the whole length rather than sit still, which is what stops the roof sweating in the first place. On a unit that will be full for years and holds something valuable, insulation or a lining panel on the roof is the more thorough answer because it stops the steel getting cold enough to condense in the first place." },
    { q: "What should the container be standing on?", a: "Something firm under each of the four corner castings — hardwood sleepers, concrete pads or a well-compacted base is the ordinary answer. What matters is that the corners carry the weight, the box sits square, and there is air moving under the floor. Setting it flat on grass traps damp against the underside, starts rust on the one surface you never inspect and, on soft ground, lets a corner sink until the doors will not line up." },
    { q: "Is a container secure enough for tools and machinery?", a: "It is a steel box with one opening, which is a strong start, and every unit comes with a lock box — a steel shroud welded over the padlock area so bolt cutters cannot reach the shackle. Put a closed-shackle padlock inside it and the lock stops being the weak point. After that it is siting: doors facing a wall or the house rather than the street, a light and a camera on the door end, and nowhere for a vehicle to back up out of sight." },
    { q: "For storage, am I better off hiring or buying?", a: "It comes back to whether the need has an end date. Storage for the length of a build, a renovation or a season is a hire job. Storage because the shed is full and always will be is a purchase, and the money stops going out at some point. If you cannot decide, hire one for a few months and see how much of it you actually use before committing — plenty of people discover they needed a bigger box, or did not need one at all." },
    { q: "Can I keep one on a suburban block long term?", a: "Sometimes yes and sometimes only with approval, and the difference is your local council rather than any general rule. How long it stays, how visible it is from the road, how close to the boundary it sits and whether anybody is working in it all tend to come into it. Ring your own council and ask before the truck is booked — it is a short call, and it is far less painful than moving a container after a complaint." },
    { q: "Can I store fuel, chemicals or feed in one?", a: "Feed and general farm supplies are everyday container cargo and the usual advice about rodents and ventilation applies. Fuel and chemicals are a different matter — there are real rules about quantities, bunding and separation, and they vary with what you are storing and where you are. Purpose-built dangerous goods containers exist for exactly this, and the sensible order is to check your obligations first and then ring us about the right unit." }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-storage", eyebrow: "Storage",
    h1: "Using a container for storage",
    lede: "A locked steel box on your own ground: no monthly unit fee, no drive across town to reach your own gear, and no lease. Whether it works comes down less to the container than to what you put in it and where you decide to stand it.",
    facts: [["Sizes", "10ft, 20ft and 40ft"], ["Buy or hire", "Both, depending on the end date"], ["Security", "Lock box fitted as standard"], ["Watch for", "Condensation, not leaks"]]
  })}
${sec("", `<div class="narrow">
  <div class="reveal"><p class="eyebrow">Work outwards from the contents</p><h2>What goes in decides everything else</h2>
  <p>People usually start with the size and end up arguing about the price. Start instead with an honest list of what is going inside and the rest of the decisions make themselves — the grade falls out of it, the ventilation falls out of it, and so does where on the block it ought to stand.</p></div>
  <ol class="steps" style="margin-top:1.8rem">
    <li><h3>Things that do not mind damp</h3><p>Steel stock, timber, fencing, tools in oiled cases, mower and garden gear, building materials waiting on a slab. An as-is unit is a genuinely sensible buy here and considerably cheaper — it carries no watertight claim, so it belongs under an existing roof or holding things that will not care if a corner gets wet.</p></li>
    <li><h3>Things that are ruined by moisture</h3><p>Furniture, mattresses, paper and records, packaged stock, anything upholstered and anything with a circuit board in it. Cargo-worthy or new, inspected wind and watertight, and then ventilation on top of that — because for this pile the water that causes the damage usually condenses inside rather than coming in through the roof.</p></li>
    <li><h3>Things somebody else would like to own</h3><p>Power tools, quad bikes, copper, saleable stock. This one is not answered by the grade at all. It is answered by the lock box, the padlock inside it, which way the doors face and whether a vehicle can get alongside unseen at two in the morning.</p></li>
  </ol>
</div>`)}
${plate("Most of the water in a container starts inside it", "Steel, still air and a cold night do the rest.")}
${band({ photo: "grades-floor", eyebrow: "Moisture", h: "Container rain, and why the box is rarely at fault", dark: true, p: ["Here is the mechanism, because understanding it makes the fix obvious. On a clear night the roof sheds heat fast and falls below the temperature of the air sealed in underneath. That air cannot hold its moisture at the lower temperature, so it gives it up on the coldest surface it can find, which is the underside of the roof. It gathers, it runs to the low points, and at three in the morning it lands on whatever is directly below.", "The moisture almost always came in with the load. Green timber, a mower hosed down the day before, a concrete floor still curing, cardboard that has been sitting outside, or simply loading on a muggy afternoon and shutting the doors on that air. Load dry, get everything up on pallets so air can travel underneath, put vents high at one end and low at the other, use desiccant if the contents justify it, and line or insulate the roof on a unit that will stay full for years."], cta: ["/blog/packing-a-shipping-container/", "Packing it properly"] })}
${band({ photo: "storage-site", eyebrow: "Siting", h: "Where it stands decides how it ages", wash: true, p: ["The whole weight rides on the four corner castings, so put something solid under each of them — hardwood sleepers, concrete pads, or base that has actually been compacted rather than merely raked. Done that way the box stays square, the doors keep swinging properly and air keeps moving under the floor. Set flat on turf instead, it holds damp against the underside and begins rusting on the one face nobody ever looks at.", "Level matters more than most people expect, because a container is a big rigid frame and it does not forgive a corner that has settled. Run the fall away from the door end so water is not standing at the threshold. Leave the full swing of the doors clear plus somewhere to stand while you use them, and leave a truck a way back in — sooner or later that container gets moved, and the day it happens is the wrong day to discover a new carport is in the way."] })}
${sec("sec-grey", secHead("Security", "The dull measures that actually work", "None of these cost much, and every one of them matters more than the brand on the padlock.") + `<ul class="ticks">
  <li><strong>Use the lock box.</strong> The welded steel shroud over the padlock area is fitted as standard, and it exists so nobody can get a jaw of a bolt cutter onto the shackle.</li>
  <li><strong>Closed-shackle padlock inside it.</strong> An open shackle in a lock box is most of the protection thrown away for the sake of a cheaper lock.</li>
  <li><strong>Face the doors at something.</strong> A wall, a fence line, the side of the house. Not the street, and not the quiet back boundary where nobody would notice anybody working.</li>
  <li><strong>Put a light and a camera on the door end.</strong> A camera that watches the side of a container tells you very little afterwards.</li>
  <li><strong>Deny the vehicle, not the person.</strong> Serious container theft arrives on wheels. If nothing can back up to the doors out of sight, the job stops being worth doing.</li>
  <li><strong>Do not stack the valuable things at the door.</strong> Whoever gets thirty seconds inside takes what is in reach of the opening.</li>
</ul>`)}
${sec("", `<div class="narrow">${secHead("The limits", "What a container will and will not do", null)}
<p class="caveat">A cargo-worthy or new unit is inspected wind and watertight, which means weather from above stays above. It is not a sealed vessel and was never built to be one. Water arriving at ground level finds its way past the door seals, and an empty container is buoyant enough to lift and travel rather than stay where it was put. If the ground it stands on can go under, the only real protection is height above that line and enough warning to get the contents out.</p>
<p>Approvals are the other limit, and they are local. Whether a container on your block needs anything from the council depends on how long it is staying, how visible it is, where it sits relative to the boundary and what you are doing in it — and that genuinely differs shire to shire. Ring your own council and ask; our <a href="/blog/shipping-container-council-approval/">notes on council approval</a> cover the general shape of it, but nobody but your council can tell you the answer for your address.</p>
<div class="chips" style="margin-top:1.6rem"><a href="/shipping-container-hire/">Hire one instead</a><a href="/container-sales/">Buy one outright</a><a href="/blog/shipping-container-vs-shed/">Container against a shed</a></div>
</div>`)}
${sec("sec-wash", secHead("Sizes", "Working out how much room you need", null) + rangeGrid(P.sizes))}
${sec("", secHead("Questions", "About storing things in a container", null) + qaHtml(faqs))}
${ask("Work out what suits", `Tell us what is going inside, roughly how long for and the town it is going to. ${PROMISE}.`, "storage")}`;
  out("container-storage", shell({ t: `Container Storage — Choosing, Siting And Keeping It Dry | ${BRAND}`, d: "Storing things in a shipping container: which grade suits what you are keeping, why condensation causes more damage than leaks, how to stand one so it stays square, and the security measures that actually work.", c: "/container-storage/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ================================ GRADES ================================ */
function grades() {
  const crumbs = [HOME_CRUMB, ["Grades", "/container-grades/"]];
  const PICK = {
    "new": ["Buy it when the container will be looked at, when it is going to be modified or fitted out, or when you want the longest run before the doors or seals need attention.", "Think again if it is going behind a shed to hold tools, where nobody will ever see it and the extra money buys you paint."],
    "cargo-worthy": ["Buy it for almost everything: storage that has to stay dry, site use, machinery, stock, records, hire fleets and anything you want to resell later without explaining.", "Think again only if the contents genuinely do not care about weather, in which case the cheaper grade does the same job."],
    "as-is": ["Buy it for a shell under an existing roof, a barrier, a base for a build, a tool lock-up where damp does not matter, or anything being cut up anyway.", "Think again the moment the words \"keep it dry\" enter the conversation. This grade carries no watertight claim and it should not be talked into one."]
  };
  const faqs = [
    { q: "Which grade should most buyers be looking at?", a: "Cargo-worthy used, and it is not close. It is a container whose structure, floor and doors are sound, and every one we release is checked wind and watertight first, for storage use. That is not the same as current CSC certification for shipping — if you need to export in it, say so and it gets checked on the specific unit. What you accept in return is cosmetic: dents, patches of surface rust, faded livery from whichever line ran it and paint in three colours. For storage, for site use and for hire that is the sensible place to spend money." },
    { q: "What does as-is actually mean in practice?", a: "That the container has finished its working life at sea and is being sold on its faults rather than despite them. It might have a previous repair, a section of floor that has gone soft, a seal that no longer pulls up hard, or a hole. As-is is not sold watertight, and no honest supplier will tell you otherwise. What you should get with it is a plain description of what is wrong with that individual unit and photographs of the faults on request, before delivery, so you are buying with your eyes open." },
    { q: "Is a single-trip container really new?", a: "As new as a container gets in this country. It is built overseas, loaded once, sailed here and stripped out — one laden voyage. Nobody manufactures shipping containers in Australia at any scale, so single-trip is what the word new means on every price list in the market. Expect true walls, a clean floor, factory paint and seals that have barely weathered. Colour and markings vary from batch to batch, so ask what is on the ground." },
    { q: "Why does grade move the price more than size does?", a: "Because grade is the whole condition of the unit and size is just how much of it there is. The distance between an as-is 20ft and a new single-trip 20ft is wider than the distance between a used 20ft and a used 40ft, which surprises people every week. It is also the single most common reason one quote looks sharper than another — before comparing two numbers, check they are describing the same grade, because otherwise you are not comparing anything." },
    { q: "Are all your containers sold watertight?", a: "No, and treat any supplier who claims that as a warning. Cargo-worthy used and new single-trip units are checked wind and watertight before release. As-is units are explicitly not sold watertight — that is precisely why they cost what they cost. Which grade you need is decided by what is going inside, not by the budget you started with." },
    { q: "Can two containers of the same grade be very different?", a: "Yes, and expecting otherwise is how people end up disappointed. Cargo-worthy is a survey standard, not a description of appearance, so two units that both pass can look nothing alike — one straight and evenly faded, the other dented down one side with three patches of primer. Both are sound. If appearance matters to you, say so at the enquiry, because the difference is often free to accommodate and impossible to fix afterwards." },
    { q: "Does an older container mean a worse container?", a: "Not by itself. How it was stored and what it carried matter far more than the build date. A unit that has lived on hardstand and carried dry freight will beat a younger one that spent its life on a wet wharf with cargo that leaked. Age is a rough guide at best; grade, the floor and the door end tell you the truth." },
    { q: "Do you sell refurbished containers?", a: "Yes — a cargo-worthy unit that has been prepared and repainted, which is a middle option between used and new when the container is going somewhere it will be seen but a new one is more than the job warrants. It is condition work rather than a separate sea-going standard, so ask what has been done to the individual unit rather than assuming it is uniform across a row of them." }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-grades", eyebrow: "Grades",
    h1: "Which grade of container the job actually needs",
    lede: P.gradeNote,
    facts: [["Grades sold", "New, cargo-worthy, as-is"], ["Checked watertight", "New and cargo-worthy"], ["Not sold watertight", "As-is"]]
  })}

${sec("", `<div class="narrow">
  ${P.grades.map((gr) => `<div class="reveal" style="margin-bottom:2.8rem"><h2>${esc(gr.name)}</h2><p>${esc(gr.blurb)}</p>${(PICK[gr.key] || []).map((t, i) => `<p class="fineprint"><strong>${i === 0 ? "Right for" : "Wrong for"}:</strong> ${esc(t)}</p>`).join("")}<p class="fineprint"><strong>Watertight:</strong> ${gr.watertight ? "yes — this grade is checked wind and watertight before it is released." : "no. This grade carries no watertight claim and is not sold as one."}</p></div>`).join("")}
  <div style="margin-top:1rem">${asIs()}</div>
</div>`)}

${sec("sec-wash", secHead("Side by side", "The three grades on one page", "Prices move with the individual unit and which yard it is released from. Grade is the first thing to settle and the only fair basis for comparing anybody's quote.") + `<div class="reveal tablewrap">
<table class="spectable"><caption>What each grade is, and what you give up</caption>
<thead><tr><th scope="col">Grade</th><th scope="col">Sold watertight</th><th scope="col">What it looks like</th><th scope="col">What you accept</th></tr></thead>
<tbody>
<tr><th scope="row">New (single-trip)</th><td>Yes, checked before release</td><td>Factory paint, true walls, clean floor, unweathered seals</td><td>The top of the price range, and paint you may not need</td></tr>
<tr><th scope="row">Cargo-worthy used</th><td>Yes, checked before release</td><td>Sound and certified, with dents, surface rust and old shipping line livery</td><td>Cosmetics, and no two units looking alike</td></tr>
<tr><th scope="row">As-is</th><td>No — not sold watertight</td><td>Retired from sea service, faults described and photographed on request</td><td>A repair, a soft floor section or a seal that no longer seats — you are buying the fault with the container</td></tr>
</tbody></table>
</div>
<p class="fineprint" style="margin-top:1.4rem">Whatever the grade, the individual unit is what you are buying. The <a href="/container-inspection/">inspection page</a> sets out what to check and which photographs to ask for.</p>`)}

${band({ photo: "grades-floor", eyebrow: "Worth understanding", h: "Grade is a standard, not a description of how it looks", dark: true, alt: true, p: ["Cargo-worthy is a survey outcome. It says the structure is sound, the floor is solid, the doors seal and the unit could go back to sea carrying freight. It says nothing whatsoever about paint, and that is why two units that both hold the grade can sit side by side looking like they came from different decades.", "Age is a weaker signal than people expect as well. Where a container has spent its life and what it carried tell you far more than its build year — dry freight and hardstand age a box slowly, salt spray and leaking cargo do not. That is the whole reason we photograph the actual unit on request before delivery rather than sending a picture of the grade."], cta: ["/container-inspection/", "What to check on a used unit"] })}

${sec("", secHead("Choosing", "Start from what is going inside it", null) + `<div class="narrow">
  <div class="reveal"><h2>If it has to stay dry, start at cargo-worthy</h2><p>Records, stock, tools, furniture, feed, anything with electronics in it or a warranty attached to it. Cargo-worthy is the floor of that conversation and new single-trip is the ceiling. There is no version of this where the cheap grade is a clever saving, because a container that lets water in has cost you the contents long before it has saved you the difference.</p></div>
  <div class="reveal" style="margin-top:2.4rem"><h2>If it is being seen, or being modified, go new</h2><p>Shopfronts, display units, anything at the front of an acreage block, and anything destined to be cut, lined, insulated or fitted out. Straight walls and clean steel make modification work faster and cheaper, and paint that has not been through fifteen years of sun holds a new colour properly. High cube is usually the right pick alongside it — the reasons are on the <a href="/dimensions/">dimensions page</a>.</p></div>
  <div class="reveal" style="margin-top:2.4rem"><h2>If the contents genuinely do not care, as-is earns its keep</h2><p>A shell under an existing roof, a barrier on a boundary, the base of a build, a store for steel or timber that lives outside anyway. As-is is not sold watertight and should never be talked into being watertight, but where that does not matter it is comfortably the best value in the yard — and the faults on the specific unit get described plainly and photographed on request before delivery.</p></div>
  <div class="reveal" style="margin-top:2.4rem"><h2>If it is temporary, grade matters less than the term</h2><p>For a job lasting months rather than years, hiring often works out better than buying at any grade, and the unit that arrives is whatever suits the site rather than whatever you committed to. Have a look at <a href="/shipping-container-hire/">container hire</a> before settling on a purchase.</p></div>
</div>`)}

${sec("sec-wash", PRICES ? secHead("Guide prices", "What each grade starts at, by size", "Cargo-worthy used and new single-trip starting figures. As-is moves too much with the individual fault to publish usefully — ring and we will tell you what is standing on the ground this week.") + rangeGrid(P.sizes) + `<p class="fineprint" style="margin-top:1.6rem">${esc(PRICE_DISCLAIMER)}</p>` : secHead("Pricing", "Priced on the grade, the unit and the run", "New single-trip and cargo-worthy used are priced on the size and the grade. As-is moves with the individual fault. Every figure is quoted with delivery to your address — ring and we will tell you what is standing on the ground this week.") + rangeGrid(P.sizes) + `<p class="fineprint" style="margin-top:1.6rem">${esc(PRICE_DISCLAIMER)}</p>`)}

${sec("", secHead("Common questions", "Grades, condition and what they are worth", null) + qaHtml(faqs))}

${ask("Tell us what is going inside", `That one answer decides the grade, and it is a faster conversation than reading a price list. Ring ${S.phone} or send it through.`, "grades", { grade: "unsure" })}`;
  out("container-grades", shell({ t: `Container Grades — New Single-Trip, Cargo-Worthy Used And As-Is | ${BRAND}`, d: "The three container grades explained: what each one is really like, which are checked wind and watertight and which is not sold watertight, and how to pick the grade from what is going inside rather than from the price.", c: "/container-grades/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}


localityPages();
deliveryAreas();
delivery();
hire();
sales();
storage();
grades();

/* The remaining builders — inspection through to the build-time checks in
   tail() — live in build-pages-b.js, split off on 14/09/2026 purely to keep
   each file inside what tooling will handle. It runs after everything here. */
require("./build-pages-b.js");
