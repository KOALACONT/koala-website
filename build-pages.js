/* ============================================================================
   Koala Containers — page builders, part two.
   Required by build.js. Shares its helpers through global.__FD.
   ========================================================================= */
const F = global.__FD;
const { fs, path, S, LOCS, P, POSTS, DIST, TEST, D, pages, BRAND, SHORT, HOURS, SERVICE_AREA,
  PROMISE, PROMISE_DETAIL, ADDR, ADDR_LINE, esc, aud, auDate, para, paras, out, IMG, IMGP, havePhoto,
  crumbsLd, faqLd, g, shell, crumbHtml, sec, secHead, qaHtml, typeChips, band, asIs, locCaveat,
  rangeGrid, gallery, rank, pick, USES_HEADS, ACCESS_HEADS, NEAR_HEADS, OPENERS,
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
  ${o.facts ? `<dl class="phead-facts">${o.facts.map((f) => `<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join("")}</dl>` : ""}
</div></header>
${promiseStrip()}`;
}

/* ============================ LOCALITY PAGES ============================ */
function localityPages() {
  LOCS.forEach((l) => {
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

    const body = `${pageHead({
      crumbs, poolPhoto: ["pool-lochead", "lh", l.slug], eyebrow: `${l.name}, ${l.state}`,
      h1: `Shipping containers ${l.name}`,
      lede: l.line,
      facts: [["Delivered from", l.depot], ["Typical lead time", l.leadTime], ["Usual truck", l.truck]]
    })}

${sec("", `<div class="narrow">
  <p class="eyebrow reveal">${esc(opener)}</p>
  <div class="reveal"><h2>${esc(usesHead)}</h2><p>Around ${esc(l.name)} we deliver containers for ${esc(l.uses)}.</p></div>
  <div class="reveal" style="margin-top:2.6rem"><h2>${esc(accessHead)}</h2>${paras(l.access)}</div>
  <div style="margin-top:2rem">${locCaveat()}</div>
</div>`)}

${sec("sec-wash", secHead("The range", `Containers we deliver to ${l.name}`, "Guide prices in AUD, ex GST. Delivery is quoted with the container.") + rangeGrid(P.sizes) + `<div style="margin-top:1.6rem">${typeChips()}</div>`)}

${l.sections.map((s, i) => band({
      poolPhoto: ["pool-locband" + (i + 1), "lb" + (i + 1), l.slug],
      eyebrow: i === 0 ? l.name : i === 1 ? "On the ground" : "Worth knowing",
      h: s.h, p: s.p, alt: i % 2 === 1, dark: i === 1, wash: i === 2
    })).join("\n")}

${sec("", `<div class="narrow">
  <div class="reveal"><h2>What delivery to ${esc(l.name)} costs</h2><p>${esc(freightLine)}</p><p>${esc(processLine)}</p></div>
  <div class="reveal" style="margin-top:2.4rem"><h2>${esc(nearHead)}</h2><p>We also deliver to ${l.near.map((n) => esc(n)).join(", ")} and the surrounding district. If your town is not on the list, ring — it almost certainly still works.</p><div class="chips" style="margin-top:1rem"><a href="/delivery-areas/">All delivery areas</a><a href="/delivery/">How delivery works</a></div></div>
</div>`)}

${sec("sec-wash", secHead("Common questions", `Buying a container in ${l.name}`, null) + qaHtml(l.faqs))}

${ask(askLine, `We deliver to ${l.name} and the surrounding district. Tell us what is going in it and what the access is like, and you will get a price with the cartage worked out. ${PROMISE}.`, l.slug)}`;

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
    { q: "How much notice do you need for a country or interstate delivery?", a: "As much as you can spare. Around a week is comfortable for most regional runs. Tasmania, the far north and the Territory through the wet want longer, because sailings and road conditions set that timetable, not us. If there is a fixed date at your end — a settlement, a shutdown, a removalist booked — put it in the first message and we will build the run around it." },
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
  <article class="rangecard reveal"><div class="rangecard-body"><h3>How soon it lands</h3><p>Within reach of a yard, a standard unit with clear access can be on your ground in a couple of days. Further out, the clock is set by the truck's run rather than by our paperwork. You get a date and you get told plainly what would push it.</p></div></article>
  <article class="rangecard reveal"><div class="rangecard-body"><h3>What it arrives on</h3><p>Tilt-tray where there is a straight run in and firm ground to slide it onto. Crane truck where there is not, or where the box has to travel over a fence, a carport or a roofline. Some remote runs go flat-top with a machine at your end, which has to be sorted before the truck leaves.</p></div></article>
  <article class="rangecard reveal"><div class="rangecard-body"><h3>What is standing near you</h3><p>Choice is deepest near the ports and thins out the further inland you go. If you want a particular grade, a high cube rather than a standard, or a specific door arrangement, flag it in the enquiry — occasionally the right unit is worth waiting a few days for.</p></div></article>
</div>`)}
${order.filter((st) => byState[st]).map((st, i) => sec(i % 2 ? "" : "sec-wash", secHead(st, NAME[st] || st, BLURB[st] || null) + `<div class="locgrid">${byState[st].map((l) => `<a href="/${l.slug}/">${esc(l.name)}<span>${esc(l.postcode)} · ${esc(l.leadTime.replace(/^Usually /, ""))}</span></a>`).join("")}</div>`)).join("\n")}
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
    { q: "How soon can a truck be there?", a: "In and around the capitals and the larger regional centres it is usually a matter of days once the grade is settled and we know the site takes a truck. Further out it depends on when a truck is next running that way, because a container heading a long way inland generally travels with other freight rather than on its own. Deliveries run Monday to Friday, with Saturday mornings by arrangement, and you get a window rather than a minute." },
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
  <p>Containers are heavy, they are bulky, and every kilometre of road under one is money and time nobody gets back. So on any order the first thing worked out is not the figure — it is where the box is standing right now. Stock sits at yards and partner depots spread around the country, and the same cargo-worthy 20ft can be a couple of hours from your gate or the better part of a week away, depending only on which one has it.</p>
  <p>That is the whole point of running it this way. Your unit starts its run somewhere reasonably close instead of being dragged across the continent, which means it lands sooner, it costs less to cart, and it gets handled fewer times. Handling is where paint gets scraped, door gear gets knocked out of line and a tidy container stops being tidy.</p>
  <p>Cornubia, south-east of Brisbane, is the yard you can walk into on a weekday and look down the floor of a container yourself. Everywhere else, inspection is by arrangement and we photograph the individual unit on request instead. Either way, tell us the delivery town in the first message and you will get a straight answer about where yours would come from.</p>
  <div class="chips" style="margin-top:1.4rem"><a href="/delivery-areas/">Towns we deliver to</a><a href="/depots/">How supply works</a><a href="/contact/">Get a delivered price</a></div>
</div>`)}
${plate("Cartage is quoted with the container, for your address", "The run is only half of it. The other half is what the truck has to do once it gets there.")}
${sec("", `<div class="narrow">${secHead("The truck", "Three ways a box gets put on the ground", "Which one your job needs is decided by the site, not by the container.")}
<ol class="steps">
  <li><h3>Tilt-tray</h3><p>The bed lifts on rams and the container slides off the back under its own weight while the truck edges forward. It is the plainest gear for the job and the one you want if the site allows it. What it asks for is length — a straight, firm run at the spot with clear ground behind it for the box to travel back onto, and no bend halfway along that stops the truck lining up square.</p></li>
  <li><h3>Side loader</h3><p>Two hydraulic lifting arms mounted on the trailer itself pick the container up and set it down alongside. It swaps the need for length for a need for width, so it suits narrow blocks, tight yards and anywhere the truck has to stay on the road while the box goes onto the property. One detail that catches people every time: the arms work off the driver's side, so the direction the truck can approach from decides which side of your block the container can land on.</p></li>
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
    { q: "What does it cost to hire a container by the week?", a: `A 20ft starts at ${aud(twenty.hire)} a week ex GST, a 10ft sits under that and a 40ft above it, and the weekly figure eases as the term gets longer. Cartage in and collection out are quoted separately with the unit because they follow the address rather than the calendar. Tell us the term and the town together and you will get the whole cost of the arrangement instead of the headline part of it.` },
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
      <dl>${hireable.map((x) => `<div><dt>${esc(x.short)}, per week from</dt><dd>${aud(x.hire)}</dd></div>`).join("")}</dl>
      <p class="pricenote">Guide rates in Australian dollars, ex GST. Longer terms come down from these figures. Cartage in and collection out are quoted with the unit, for your address.</p>
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
${sec("sec-wash", secHead("Sizes", "What you can put on hire", null) + rangeGrid(P.sizes))}
${sec("", secHead("Questions", "About hiring a container", null) + qaHtml(faqs))}
${ask("Get a hire figure", `Give us the size, roughly how long you need it and the town it is going to. You will get the weekly rate and the cartage together. ${PROMISE}.`, "hire")}`;
  out("shipping-container-hire", shell({ t: `Container Hire — Weekly Rates, Terms And Collection | ${BRAND}`, d: `Hire a shipping container by the week in 10ft, 20ft or 40ft, from ${aud(twenty.hire)} a week ex GST. Cargo-worthy units inspected wind and watertight, delivered and collected anywhere in Australia.`, c: "/shipping-container-hire/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ================================ SALES ================================= */
function sales() {
  const crumbs = [HOME_CRUMB, ["Buying a container", "/container-sales/"]];
  const faqs = [
    { q: "How do I work out which grade I need?", a: "Ask what happens if the contents get damp. If the answer is nothing much — steel, timber, garden gear, building materials, a lock-up already standing under a roof — as-is is a genuinely good buy and paying for a higher grade buys you nothing you will use. If the answer is that something is ruined, start at cargo-worthy, which is inspected wind and watertight before release. New single-trip is for the jobs where the container is on show or is going to be built into something." },
    { q: "Can I look at the actual container first?", a: `Yes, and it is the best hour you can spend. The Cornubia yard at ${ADDR_LINE} is open on weekdays and Saturday mornings — ring ahead so the unit is pulled out of the row rather than buried three high. If the container you want is standing at a yard nowhere near you, ask and we will photograph that individual unit on request, before delivery: doors open, the length of the floor, the roof and any repair that has been done to it.` },
    { q: "How does payment work?", a: "The purchase is settled before the container is released for transport. That is standard in the trade and it is what allows a particular unit to be held with your name against it instead of being sold out from under you while paperwork moves. It is also exactly why we would rather you inspected it or looked at photographs of it first — nobody benefits from a surprise on the back of a truck." },
    { q: "Is a used container guaranteed?", a: "The grade is the guarantee, and it is a real one. Anything sold as cargo-worthy is inspected wind and watertight before it leaves, and if one turns up and is not, sorting it out is our problem rather than yours. As-is is the opposite arrangement done openly: the unit is sold on its faults, those faults are described and photographed, and it carries no watertight claim at all. What will not happen is a unit being described as something it is not." },
    { q: "Can you hold one while my slab cures?", a: "Usually, within reason, and plenty of people buy while the base is still being poured. There is a practical limit — a yard full of containers with names on them and no delivery dates is a yard that cannot trade — so treat it as a conversation rather than an assumption. Tell us the likely date when you buy and we will tell you honestly whether holding it that long works." },
    { q: "Is one 40ft better value than two 20fts?", a: "On cost per cubic metre, almost always, and it arrives on one truck instead of two. The catch is entirely at your end: a 40ft wants a good deal more straight approach, more room to manoeuvre and a longer level pad, and there are plenty of blocks that will take a 20ft comfortably and simply cannot fit the longer box. Work out what the site allows first, then compare the prices." },
    { q: "Do I need approval to put one on my property?", a: "It depends on your council, and the rules genuinely differ from one shire to the next — how long it is staying, whether it is visible from the street, how close to the boundary it sits and what you intend to use it for all come into it. It is one phone call to your own council and much better made before the container arrives than after somebody complains. There is a general rundown in our guide to council approval." }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-sales", eyebrow: "Buying",
    h1: "Buying a container outright",
    lede: "You are not buying a model off a shelf. You are buying one particular steel box with a serial number on the door and a working life behind it that you cannot see. Which is why the grade, and knowing exactly what a grade promises, decides more than the length or the colour ever will.",
    facts: [["Grades", "New single-trip, cargo-worthy, as-is"], ["Sizes", "10ft, 20ft and 40ft"], ["Inspection", "Cornubia in person, elsewhere on request"], ["Prices", "AUD ex GST, cartage quoted with it"]]
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
${sec("sec-wash", secHead("The range", "Sizes and configurations", null) + rangeGrid(P.sizes) + `<div style="margin-top:1.6rem">${typeChips()}</div><p class="fineprint" style="margin-top:1.6rem">${esc(P.disclaimer)}</p>`)}
${band({ photo: "inspect-yard", eyebrow: "Supply", h: "Where the unit comes from changes what is available", p: ["No two yards hold the same stock in the same week. A grade that is standing four deep at one is a fortnight away at another, and the honest answer sometimes is that the closest yard has an excellent container that is not quite the one you asked for. Tell us the delivery town early and the conversation gets much shorter.", "Buying a unit that is a long way from you is perfectly normal and happens every week — it just needs the photographs done properly and the cartage worked out before anything is agreed rather than after."], cta: ["/blog/buying-a-container-interstate/", "Buying from another state"], wash: true })}
${sec("", secHead("Questions", "About buying a container", null) + qaHtml(faqs))}
${ask("Get a delivered price", `Tell us what the container has to do, the town it is going to and what the entry looks like. We will tell you which grade the job genuinely needs. ${PROMISE}.`, "sales")}`;
  out("container-sales", shell({ t: `Shipping Containers For Sale — Grades, Sizes And What To Check | ${BRAND}`, d: "Buying a shipping container without buying the wrong one: what new single-trip, cargo-worthy and as-is actually promise, what to inspect and in what order, and how the yard it comes from changes what is available.", c: "/container-sales/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
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
    "new": ["Buy it when the container will be looked at, when it is going to be modified or fitted out, or when it has to last decades without an argument.", "Think again if it is going behind a shed to hold tools, where nobody will ever see it and the extra money buys you paint."],
    "cargo-worthy": ["Buy it for almost everything: storage that has to stay dry, site use, machinery, stock, records, hire fleets and anything you want to resell later without explaining.", "Think again only if the contents genuinely do not care about weather, in which case the cheaper grade does the same job."],
    "as-is": ["Buy it for a shell under an existing roof, a bund, a barrier, a base for a build, a dry-ish tool lock-up or anything being cut up anyway.", "Think again the moment the words \"keep it dry\" enter the conversation. This grade carries no watertight claim and it should not be talked into one."]
  };
  const faqs = [
    { q: "Which grade should most buyers be looking at?", a: "Cargo-worthy used, and it is not close. It is a container still certified fit to carry freight at sea, which means the structure, the floor and the doors have to be sound, and every one we release is checked wind and watertight first. What you accept in return is cosmetic: dents, patches of surface rust, faded livery from whichever line ran it and paint in three colours. For storage, for site use and for hire that is the sensible place to spend money." },
    { q: "What does as-is actually mean in practice?", a: "That the container has finished its working life at sea and is being sold on its faults rather than despite them. It might have a previous repair, a section of floor that has gone soft, a seal that no longer pulls up hard, or a hole. As-is is not sold watertight, and no honest supplier will tell you otherwise. What you should get with it is a plain description of what is wrong with that individual unit and photographs of the faults on request, before delivery, so you are buying with your eyes open." },
    { q: "Is a single-trip container really new?", a: "As new as a container gets in this country. It is built overseas, loaded once, sailed here and stripped out — one laden voyage. Nobody manufactures shipping containers in Australia at any scale, so single-trip is what the word new means on every price list in the market. Expect true walls, unmarked flooring, factory paint and seals that have barely weathered." },
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

${sec("sec-wash", secHead("Side by side", "The three grades on one page", "Guide prices move with the individual unit and which yard it is released from. Grade is the first thing to settle and the only fair basis for comparing anybody's quote.") + `<div class="reveal">
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
  <div class="reveal" style="margin-top:2.4rem"><h2>If it is being seen, or being modified, go new</h2><p>Shopfronts, display units, anything at the front of an acreage block, and anything destined to be cut, lined, insulated or fitted out. Straight walls and unmarked steel make modification work faster and cheaper, and paint that has not been through fifteen years of sun holds a new colour properly. High cube is usually the right pick alongside it — the reasons are on the <a href="/dimensions/">dimensions page</a>.</p></div>
  <div class="reveal" style="margin-top:2.4rem"><h2>If the contents genuinely do not care, as-is earns its keep</h2><p>A shell under an existing roof, a bund wall, a barrier on a boundary, the base of a build, a store for steel or timber that lives outside anyway. As-is is not sold watertight and should never be talked into being watertight, but where that does not matter it is comfortably the best value in the yard — and the faults on the specific unit get described plainly and photographed on request before delivery.</p></div>
  <div class="reveal" style="margin-top:2.4rem"><h2>If it is temporary, grade matters less than the term</h2><p>For a job lasting months rather than years, hiring often works out better than buying at any grade, and the unit that arrives is whatever suits the site rather than whatever you committed to. Have a look at <a href="/shipping-container-hire/">container hire</a> before settling on a purchase.</p></div>
</div>`)}

${sec("sec-wash", secHead("Guide prices", "What each grade starts at, by size", "Cargo-worthy used and new single-trip starting figures. As-is moves too much with the individual fault to publish usefully — ring and we will tell you what is standing on the ground this week.") + rangeGrid(P.sizes) + `<p class="fineprint" style="margin-top:1.6rem">${esc(P.disclaimer)}</p>`)}

${sec("", secHead("Common questions", "Grades, condition and what they are worth", null) + qaHtml(faqs))}

${ask("Tell us what is going inside", `That one answer decides the grade, and it is a faster conversation than reading a price list. Ring ${S.phone} or send it through. ${PROMISE}.`, "grades")}`;
  out("container-grades", shell({ t: `Container Grades — New Single-Trip, Cargo-Worthy Used And As-Is | ${BRAND}`, d: "The three container grades explained: what each one is really like, which are checked wind and watertight and which is not sold watertight, and how to pick the grade from what is going inside rather than from the price.", c: "/container-grades/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ============================== INSPECTION ============================== */
function inspection() {
  const crumbs = [HOME_CRUMB, ["Inspection checklist", "/container-inspection/"]];
  const faults = [
    ["Surface rust across the panels", "Corten steel weathering the way it is designed to. It forms an oxide skin and then largely stops.", "Barely at all. It is paint-deep and it is the cheapest thing on a container to live with."],
    ["Dents and scrapes in the side walls", "A forklift, a stack or a wharf, some years ago.", "Not much. Panel steel is corrugated for stiffness and a pushed-in section carries load the same as a flat one."],
    ["Daylight at a roof seam or a corner", "A pinhole, a lifted weld or a puncture from something dropped on it.", "Raise it. Patching is quick work, but nobody should be paying a sealed-unit price for a unit that is letting light through."],
    ["Ply gone spongy at the door end", "Water tracking past a tired seal and sitting on the boards where nobody looks.", "A great deal. Flooring is the dearest repair on a container and a soft patch spreads along the cross members."],
    ["Gasket flattened, split or hard as a hose", "Age, sun and a container that has been left with the doors strapped shut.", "Middling. Replaceable, but it is the only thing holding weather out at the end you open every day."],
    ["Bottom rail eaten through underneath", "Years standing flat on dirt with nothing under the corners to lift it clear.", "A great deal. That is structure, and it also tells you how the unit was looked after."],
    ["Doors that will not shut on level ground", "A frame that has been racked out of square, usually by lifting or standing badly.", "Enough to take a different unit. Everything else on this list can be repaired; a twisted frame follows the container around forever."],
    ["A repair plate welded over a hole", "An honest repair, done at a depot, and disclosed.", "Very little if it is welded right and painted over the top rather than painted to disguise it. Ask when and where it was done."]
  ];
  const faqs = [
    { q: "I am hundreds of kilometres from your yard — how do I know what I am buying?", a: "By asking for photographs of the individual unit, on request, before delivery, and by knowing which shots to ask for. Most of our customers never stand in the yard, so this is the normal way we sell rather than a favour: doors open square on, the length of the floor from inside, the roof from above, both seals close up, the plate and the container number. On as-is stock the faults get photographed as well as described, because a fault you find out about on delivery day is a fault we own." },
    { q: "Which photographs actually tell you something?", a: "The ones taken from inside. A three-quarter shot of a container in a yard flatters everything and shows nothing. Standing at the closed end looking back at the open doors shows you the floor down its whole length and any daylight along the roof line in one frame, which is two of the three things worth knowing. The third is the seals, and that needs a close shot of the rubber rather than a shot of the doors." },
    { q: "Is the unit checked before it goes on the truck?", a: "Cargo-worthy and new single-trip units are checked wind and watertight before release — doors seating, no daylight, floor sound. As-is is a different arrangement entirely: it is priced on its faults, it is not sold watertight, and what you get instead of a check is a plain description of what is wrong with that particular container plus photographs on request before delivery." },
    { q: "Should rust make me walk away?", a: "Almost never on its own, and that single misunderstanding costs container buyers more money than any other. Rust across the panels is weathering steel doing its job. Rust that has gone right through, rust ponding in a dished roof panel, and rust chewing up the bottom rail where the box has sat on wet ground are three different problems and all three are worth arguing about. Look at where the rust is, not how much of it there is." },
    { q: "What is the CSC plate and does it matter to me?", a: "It is the small metal plate on the door that carries the container's number, its build date and its maximum gross weight, and it exists for sea carriage rather than for anything you are likely to do with the unit. Its practical use to a buyer is identification: quote us the number and we both know exactly which container is being discussed, which matters far more than you would think when a yard holds rows of units that all look alike." },
    { q: "Can I inspect at a depot instead of Cornubia?", a: `Cornubia is the walk-in yard — ${ADDR_LINE}, ${HOURS || "ring for hours"}. Everywhere else it is by arrangement, because those sites are working depots with plant moving and they are not set up for people wandering between rows. Ring first either way and we will have the units you want to look at pulled out and standing where you can open the doors.` },
    { q: "Is there one fault that should end the conversation?", a: "A frame out of square. Every other item on this page has a price attached to fixing it, but a racked container will never sit right, the doors will fight you every time you use them, and the fix involves a workshop rather than a welder in a yard. Sight down the top rail from a corner and check the container is sitting true before you look at anything else." }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-inspection", eyebrow: "Buying used",
    h1: "Inspecting a used container, in person or by photograph",
    lede: "Two honest ways to do this properly: stand in front of the unit and work through it, or get the right photographs of the specific container. Below is the order to check things in, and what each fault means once the unit is standing on your ground.",
    facts: [["On the ground", "Ten to fifteen minutes"], ["Not local", "Photos of your unit on request"], ["Walk-in yard", `${ADDR.suburb}, ${ADDR.state}`]]
  })}

${sec("", `<div class="narrow">
  <div class="reveal"><h2>Work through it in this order</h2><p>The order matters, because it puts the expensive faults first. A person who starts at the paint runs out of interest before they get to the floor, which is exactly the wrong way round.</p></div>
  <ol class="steps">
    <li><h3>Stand back at a corner before you touch anything</h3><p>Get to a corner and sight along the top rail, then along the bottom rail, then across the roof. You are checking one thing: whether the container is sitting true. A bow in a rail, a roof that reads as a shallow dish, or a unit that rocks on flat hardstand all say the same thing about how it has been handled. Everything else here is a repair with a price on it. This one is a reason to look at the next container instead.</p></li>
    <li><h3>The door end, because that is the part you use daily</h3><p>Swing both doors right back until they clip, then bring them in again. The locking bars should take a solid pull rather than flopping over, the cams should drop into the keepers without being lifted by hand, and the hinge pins should turn rather than grind. Bent gear and worn cams get straightened easily enough, but you will notice them every single time until somebody does.</p></li>
    <li><h3>Run a thumb along both gaskets</h3><p>Corner to corner, all the way round, on both doors. You are feeling for rubber that has gone hard, sections crushed permanently flat, splits at the corners where the seal turns, and lengths that have pulled out of the channel. This is where water gets in at the end where the flooring is already most vulnerable, which is why it is worth doing slowly.</p></li>
    <li><h3>Get inside and pull the doors to</h3><p>Give your eyes half a minute. Any daylight is a hole, and its position tells you what kind: along the roof line usually means a seam or a puncture, around the door frame means the frame has moved, and down a wall means something has been through the panel. Look up at the underside of the roof for a sag or a stain, which means water has been ponding above your head for a long while.</p></li>
    <li><h3>Walk the floor, heel down, both directions</h3><p>Twenty-eight millimetres of marine ply on steel cross members, and the single dearest thing on a container to put right properly. Feel for give underfoot, especially in the first two metres inside the doors. Look for staining that runs across the boards rather than along them, screw heads standing proud, and sheets that have been let in as a repair. Soft ply is not a spot fault — it has been wet for a season and it spreads.</p></li>
    <li><h3>Look underneath and along the bottom rail</h3><p>Crouch at one end and look through. You want to see cross members with their shape, not lace. Pitting and holes along the bottom rail mean the container has spent years sitting flat on wet dirt with nothing under the castings to lift it clear, which is worth knowing regardless of the grade on the invoice.</p></li>
    <li><h3>Finish at the plate, the number and the paint</h3><p>Find the plate on the door, note the four letters and seven digits, and photograph both. Then look at the paint properly: fresh single-colour paint on a used unit is not a red flag by itself, but it does mean you cannot read the history off the panels, so ask what is under it.</p></li>
  </ol>
  <p style="margin-top:2rem" class="caveat"><strong>Do not pay to avoid cosmetics.</strong> Faded shipping line livery, mismatched paint, three previous owners' stencils, scrapes and dents. None of it affects what the container does, all of it affects what people will pay, and the gap between those two is where a good buy lives.</p>
</div>`)}

${plate("Most people who buy from us never set foot in the yard", "Which is why photographs of the actual unit are part of how we sell, not a favour")}

${sec("sec-wash", secHead("If you cannot get there", "The photographs to ask for, and what each one is for", "Ask for these of the specific container being quoted, not a stock image of the grade. Any supplier can send them; it is worth noticing which ones will.") + `<div class="narrow">
  <ol class="steps">
    <li><h3>Both doors open, square on, from about ten metres</h3><p>Shows the door end sitting true, both leaves hanging level and a clear view straight down the inside. If a container is racked, this is usually the frame in which you can see it.</p></li>
    <li><h3>From inside the closed end, looking back out the open doors</h3><p>The most useful single photograph of a used container. It gives you the whole floor down its length, the wall seams either side and the roof line all at once, and a bright day will show up any daylight without anybody having to close the doors on the photographer.</p></li>
    <li><h3>The floor at the door end, taken close and from low down</h3><p>Staining, patched sheets and lifted screws show up at that angle and disappear from head height. Ask for it after the container has been shut for a night if there has been rain about.</p></li>
    <li><h3>Both seals, close enough to see the rubber</h3><p>Not the doors. The rubber. You are looking for the same three things you would feel for by hand: hardening, crushing and splits at the turns.</p></li>
    <li><h3>The roof, from above</h3><p>From a ladder, a tray or the next unit in the row. Ponding marks, dents holding water and patch repairs all live up there and none of them are visible from the ground.</p></li>
    <li><h3>The plate, with the container number readable</h3><p>This is the one that keeps everybody honest. With the number recorded, every other photograph is verifiably of the same container, and the unit that comes off the truck is the one that was agreed.</p></li>
  </ol>
  <p style="margin-top:1.8rem" class="caveat"><strong>Ask for them as it stands.</strong> Photographs taken before a tidy-up are worth more than photographs taken after one. We send these on request, before delivery, and on as-is stock we photograph the faults rather than shooting around them.</p>
  <div class="chips" style="margin-top:1.4rem"><a href="/container-grades/">What each grade means</a><a href="/how-it-works/">How ordering works</a><a href="/delivery/">Delivery and access</a></div>
</div>`)}

${sec("", secHead("Reading a fault", "What it means and how much it should bother you", null) + `<div class="reveal"><table class="spectable"><caption>Common findings on used containers</caption>
<thead><tr><th scope="col">What you find</th><th scope="col">What it usually is</th><th scope="col">How much it should bother you</th></tr></thead>
<tbody>${faults.map((r) => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join("")}</tbody></table></div>
<p class="fineprint" style="margin-top:1.4rem">Grade sets what you should expect to find before you start. Cargo-worthy and new single-trip units are checked wind and watertight before release; as-is units are sold on their faults and are not sold watertight. The <a href="/container-grades/">grades page</a> spells out the difference.</p>`)}

${band({ photo: "inspect-yard", eyebrow: "The yard at Cornubia", h: "Or drive over and open the doors yourself", dark: true, alt: true, p: [`Stock sits on hardstand at ${ADDR_LINE}, half an hour south-east of the Brisbane CBD off the M1. Ring ahead, tell us the size and grade, and the units will be standing clear rather than three deep in a row when you get there.`, `Open hours are ${HOURS || "by arrangement"}. Bring a torch, take as long as you want, and walk away from anything you do not like the look of — nobody at this end minds, and it is a far better outcome than a container you resent every time you open it.`], cta: ["/contact/", "Arrange a look"] })}

${sec("sec-wash", secHead("Common questions", "Checking a used unit", null) + qaHtml(faqs))}

${ask("Ask about the actual unit", `Give us the size and grade you are chasing and the town it is going to. We will tell you which yard has one standing and send photographs of that container on request. ${PROMISE}.`, "inspection")}`;
  out("container-inspection", shell({ t: `Used Container Inspection — What To Check And What To Ask For In Photos | ${BRAND}`, d: "How to check a used shipping container properly: frame, doors, seals, floor, roof, rails and plate, what each fault costs you, and the six photographs to ask for when the unit is a long way from where you are.", c: "/container-inspection/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ============================== DIMENSIONS ============================== */
function dimensions() {
  const crumbs = [HOME_CRUMB, ["Dimensions", "/dimensions/"]];
  const HC = [
    { n: "20ft High Cube", ext: "6.06m × 2.44m × 2.90m", int: "5.90m × 2.35m × 2.70m", door: "2.34m × 2.58m", cube: "37.4m³", tare: "approx 2,350 kg" },
    { n: "40ft High Cube", ext: "12.19m × 2.44m × 2.90m", int: "12.03m × 2.35m × 2.70m", door: "2.34m × 2.58m", cube: "76.4m³", tare: "approx 3,900 kg" }
  ];
  const NOTES = {
    "10ft-shipping-containers": ["Short enough to tuck down the side of a house, behind a shed or into the corner of a small block where a longer unit simply will not turn. It weighs about as much as a small car empty, which widens the list of trucks that can bring it and the list of gateways it can get through.", "Inside, it is smaller than the cubic figure makes it sound once you allow for reaching things: about the floor area of a single garage bay, with full height. Trade tools, a locked store on a site with no shed, seasonal gear and overflow from a house move all fit comfortably. Anything on pallets is the test — two Australian standard pallets sit across the width with very little to spare, so plan the loading before you plan the purchase."],
    "20ft-shipping-containers": ["The default for good reason. Six metres of external length fits most driveways, most yards and most gateways, it is the size every truck in the game is set up to carry, and it is far and away the easiest unit to sell on again when you are finished with it.", "Inside you have a shade under six metres of usable run and full standing height. As a working rule it takes around ten Australian standard pallets on the floor in a single layer, or a small car with the doors shut and not much room to walk around it. If the contents are long rather than heavy — timber, pipe, racking — measure the load and remember it has to swing in through a 2.34m door rather than appear inside by magic."],
    "40ft-shipping-containers": ["Twelve metres of container and, more to the point, a truck that is longer again. This is the size where access stops being a formality: the vehicle needs somewhere to line up straight, room to lay the unit down and space to pull clear afterwards, and a suburban cul-de-sac rarely has all three.", "The trade-off worth thinking about is two 20fts against one 40ft. Two shorter units cost more in total, need two deliveries and take more ground once you leave room to walk between them, but they will get into sites a 40ft cannot reach, they can sit in two different places, and they can be sold separately later. Where the run of clear ground exists, a single 40ft is the cheaper way to buy volume by a comfortable margin."]
  };
  const faqs = [
    { q: "How wide is a shipping container inside?", a: "About 2.35 metres, and that figure holds for every ISO container regardless of its length or height. Width is the dimension that never changes, which is why containers stack and mate the way they do. It matters most when you are loading pallets: two Australian standard pallets sit side by side across the width with a few centimetres to spare, so the width sets your loading pattern before the length does." },
    { q: "What is the real difference between a standard container and a high cube?", a: "Three hundred millimetres of height and nothing else. A standard is 2.59m outside and about 2.39m inside; a high cube is 2.90m outside and about 2.70m inside. Length, width and footprint are identical. That extra foot only matters when something has to happen to the inside — lining and cladding eat 100mm off the ceiling and more off the floor, roller doors need headroom above the opening, and a forklift mast wants clearance at the door. If the container is going to be modified or fitted out, take the high cube." },
    { q: "How many pallets fit in a 20ft container?", a: "Roughly ten Australian standard pallets on the floor in a single layer, and about twenty-one in a 40ft, though both figures move with pallet size and how disciplined the loading is. Stacking changes the answer completely. If your job is measured in pallets rather than cubic metres, say so when you enquire, because pallet count is usually the thing that settles the argument between a 20ft and a 40ft." },
    { q: "How much does an empty shipping container weigh?", a: "Around 1,300 kg for a 10ft, 2,200 kg for a 20ft and 3,800 kg for a 40ft, with high cubes a little heavier again. That is tare — the container with nothing in it. It matters twice over: it decides which truck can bring it, and it is the load the ground has to carry, concentrated on four corner castings rather than spread across the footprint." },
    { q: "How much ground do I need for a container to be delivered?", a: "More than the container, and in the right shape. Length is the easy part; what a tilt-tray needs is a straight, clear, reasonably firm run behind the landing spot to slide the unit off, plus room in front for the truck itself and headroom for the tray to lift without finding branches or wires. A side loader trades some of that length for width alongside. Which one suits your site is a conversation worth having before anything is booked — start on the delivery page." },
    { q: "Do container dimensions vary between manufacturers?", a: "Not meaningfully, which is the entire point of the standard. External dimensions are fixed within a few millimetres so units built anywhere can stack, lock and travel together. Internal figures wander slightly with wall construction and floor thickness, and tare weight varies more than anything else. If you are fitting something to the millimetre, work off the actual unit rather than a published table." },
    { q: "How high can I stack containers?", a: "Empty units stack safely several high when the corner castings are aligned and locked and the base is genuinely level, which is how they travel on a ship. On a private site the sensible limit is usually set by what you can safely lift, work around and access rather than by the containers themselves, and by whatever your local council has to say about structures on the block. Ring your council before you plan anything permanent; the rules differ from one area to the next." }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-dimensions", eyebrow: "Reference",
    h1: "Container sizes, dimensions, capacity and weights",
    lede: "Every figure in one place — internal and external, door openings, cubic capacity and tare — along with the part a table cannot tell you: how much room the truck needs, how much ground the unit takes once it is standing, and which measurement catches people out.",
    facts: [["Width", "2.44m external on every size"], ["Standard height", "2.59m external"], ["High cube height", "2.90m external"]]
  })}

${sec("", `<div class="narrow"><div class="reveal">
  <h2>Read the internal figures, not the name</h2>
  <p>A container is named for its external length in feet, and every one of them loses steel to the walls and the doors before you get to usable space. A 20ft gives you a shade under six metres inside; a 40ft a fraction over twelve. If something has to fit exactly, work from the internal number, then take a little more off for the fact that it has to travel in through a door opening narrower than the container.</p>
  <p>Corrugation is the other thing worth knowing. The walls are profiled for stiffness, so internal width is measured between the peaks of the corrugations and anything full-width will touch at the ridges rather than sit flat against the wall.</p>
</div></div>`)}

${P.sizes.map((x, i) => sec(i % 2 === 0 ? "sec-wash" : "", secHead(x.short, x.title, null) + `<div class="twocol">
  <div class="reveal">${para(NOTES[x.slug] || [x.lead])}<p style="margin-top:1.2rem"><a class="btn btn-ghost" href="/${x.slug}/">Prices and detail — ${esc(x.short)}</a></p></div>
  <div class="reveal">${specTable(x)}</div>
</div>`)).join("\n")}

${sec("", secHead("The extra foot", "High cube containers", "Same footprint, same length, 300mm more headroom. The size to buy if anything is going to happen to the inside.") + `<div class="reveal">
<table class="spectable"><caption>High cube dimensions and weights — figures approximate</caption>
<thead><tr><th scope="col">Size</th><th scope="col">External L × W × H</th><th scope="col">Internal L × W × H</th><th scope="col">Door W × H</th><th scope="col">Capacity</th><th scope="col">Tare</th></tr></thead>
<tbody>${HC.map((r) => `<tr><th scope="row">${esc(r.n)}</th><td>${esc(r.ext)}</td><td>${esc(r.int)}</td><td>${esc(r.door)}</td><td>${esc(r.cube)}</td><td>${esc(r.tare)}</td></tr>`).join("")}</tbody></table>
</div>
<div class="narrow" style="margin-top:2.4rem"><div class="reveal">
<p>The door opening is the part people miss. A high cube door is 2.58m tall against 2.28m on a standard, and that half-metre is the difference between a machine driving in and a machine being craned over the side. If a forklift, a quad bike, a hoist or racking has to go in through the doors, measure the tallest thing at its tallest point and compare it with the door rather than the ceiling.</p>
<p>Anything being lined, insulated, clad or fitted with a mezzanine should start as a high cube as well. Cladding takes height off the ceiling and a floor covering takes more off the bottom, and a standard container that started at 2.39m internal gets uncomfortable quickly once both are done.</p>
</div></div>`)}

${sec("sec-wash", secHead("On the ground", "What the numbers mean once it is standing on your block", null) + `<div class="narrow">
  <div class="reveal"><h2>The truck needs more room than the container</h2><p>Container length is not the number that decides whether a delivery works. A tilt-tray lays the unit down by driving forward out from under it, so it wants a straight, clear, firm run behind the landing spot with several times the container's own length available, plus space in front for the truck itself and clear air overhead for the tray to lift. Branches, wires, verandah eaves and a gate post 100mm too close have stopped more deliveries than distance ever has. Side loaders and crane trucks trade that length for width and setup room. Which one suits your site is worked out before anything is booked — the <a href="/delivery/">delivery page</a> covers it properly.</p></div>
  <div class="reveal" style="margin-top:2.6rem"><h2>A 20ft on a suburban block</h2><p>Six metres by two and a half is a smaller footprint than most people picture — roughly a single-car garage laid on the ground — but it wants a metre of clearance around it so doors can swing, so you can walk past, and so rain running off the roof is not tipping straight against a fence. Leave the doors facing the direction you will approach from and think about where the water goes before the truck arrives, not after the first storm. Anything permanent, or anything near a boundary, is a question for your local council rather than for us; the rules genuinely differ from one area to the next.</p></div>
  <div class="reveal" style="margin-top:2.6rem"><h2>Tare weight is what the ground carries</h2><p>An empty 20ft is a couple of tonnes and an empty 40ft closer to four, and all of it lands on four corner castings rather than spreading across the footprint. On hardstand that is a non-event. On soil, sand or fill after a wet week it is not, and a unit that settles unevenly racks the frame just enough that the doors stop closing sweetly. Timber sleepers, concrete pads or a bed of compacted road base under the four corners fix it for very little money, and getting them level with each other matters more than getting each one level on its own.</p></div>
  <div class="reveal" style="margin-top:2.6rem"><h2>Cubic capacity assumes you fill it to the roof</h2><p>Thirty-three cubic metres in a 20ft is a true figure and a misleading one, because almost nobody stacks tight to the ceiling and keeps access to the back. Take a third off for aisles, reach and the fact that you will want the things you use most within arm's reach of the doors, and the number you are left with is the one to plan against.</p></div>
  <div class="chips" style="margin-top:1.6rem"><a href="/delivery/">Delivery and access</a><a href="/container-grades/">Grades explained</a><a href="/container-modifications/">Modifications</a></div>
</div>`)}

${sec("", secHead("The range", "Every size we deliver", null) + rangeGrid(P.sizes) + `<div style="margin-top:1.6rem">${typeChips()}</div>`)}

${sec("sec-wash", secHead("Common questions", "Sizes, weights and capacity", null) + qaHtml(faqs))}

${ask("Not sure which size the job wants", `Describe what is going in it and how much room you have at the far end, and we will tell you which size fits and which yard has one. ${PROMISE}.`, "dims")}`;
  out("dimensions", shell({ t: `Container Dimensions, Capacity And Tare Weights — 10ft To 40ft High Cube | ${BRAND}`, d: "Internal and external dimensions, door openings, cubic capacity and tare weight for 10ft, 20ft, 40ft and high cube shipping containers, with what each figure means for the truck, the ground and what actually fits.", c: "/dimensions/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ============================= HOW IT WORKS ============================= */
function howItWorks() {
  const crumbs = [HOME_CRUMB, ["How it works", "/how-it-works/"]];
  const faqs = [
    { q: "Which yard will my container come out of?", a: "Whichever one closest to your address is holding the size and grade you have asked for. That sounds obvious and it is the calculation most quotes skip. Stock is spread through yards and partner depots around the country, so a container going to a town in the north or across to the west generally starts its run somewhere in that part of the world rather than crawling out of Queensland behind a prime mover. Give us the delivery address at the start of the conversation and it is the first thing we work out." },
    { q: "What if the grade I want is not in the closest yard?", a: "Then there is a genuine decision to make and you should be the one making it. The choice is normally between a unit that is not quite what you pictured but is close by, and the exact one you wanted from a lot further away, with the run and the date both moving accordingly. We put both options in front of you with the difference in timing spelled out. Neither answer is wrong; they are just different trade-offs, and which one suits depends on whether the date or the specification is the thing you cannot move." },
    { q: "How long does it take from the phone call to the container being there?", a: "Around the capitals and the bigger regional centres, usually a small number of business days once the grade is settled and we know the site takes a truck. Out west, up north and anywhere the last stretch is unsealed, it depends on when a truck is next running that way. Wet season closes roads across the top and the inland for weeks at a stretch and no amount of wanting changes that. Tell us the date you actually need it and you will get a straight answer about whether it is on." },
    { q: "How does a remote run get put together?", a: "Rarely as a truck sent out with one container on it, because that is nobody's idea of value. A unit heading a long way inland usually travels with other freight going the same direction, which is why the date is set by the schedule rather than by us. It also means the window is wider than a metropolitan drop, that the last leg may change trucks, and that a hard deadline needs to be flagged at the quoting stage rather than the week before." },
    { q: "When does money change hands?", a: "The container is settled before it is released and put on a truck. That is the industry standard and it is what takes a specific unit out of stock and puts your name on it. It is also the reason we are so willing to photograph the individual container on request before delivery — you should be able to see the exact unit you are being asked to settle, particularly on used and as-is stock." },
    { q: "Can I move the delivery date once it is booked?", a: "Usually, if the truck has not been booked yet — ring as early as you can and it is generally a non-event. Once the run is scheduled, especially a long one that has been built around other freight, changing it means waiting for the next truck heading that way rather than shuffling it a day. Concrete pours, machinery hire and site handovers all slip; tell us as soon as you know and we will work with it." },
    { q: "Does somebody have to be on site when it lands?", a: "Somebody should be, even a neighbour or the site foreman with your number in their phone. The driver will put the container where they are pointed, and the person pointing needs to know which way the doors are to face, where the water runs and what is buried. If nobody can be there, peg the four corners out, mark which end the doors go, leave the gate unlocked and send a photograph of the marked spot through beforehand." },
    { q: "Can I order several and have them go to different addresses?", a: "Yes, and it is common with builders and councils. Each address gets worked out on its own because each has its own run and its own access, so treat them as separate deliveries that happen to be on one order. Tell us if they need to land in a particular sequence — that is easy to arrange in advance and impossible to fix afterwards." }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-how", eyebrow: "Ordering",
    h1: "From the first phone call to a container on your ground",
    lede: "Six stages, one number, and nothing that happens without you hearing about it first. The stage most suppliers skip is the second one — working out which yard your unit should come out of — and it is the one that sets both your date and your cartage.",
    facts: [["Have ready", "Address, access, what goes inside"], ["You hear back", "Within one business day"], ["We answer", HOURS || "business hours"]]
  })}

${sec("", `<div class="narrow"><ol class="steps">
  <li><h3>Tell us the job rather than the product</h3><p>What is going in it, the town it is going to, when you need it and what a truck meets at the gate. That is plenty to start with. Turning up not knowing whether you want a 20ft or a 40ft, or what cargo-worthy means, is completely normal — sorting that out is the part of this we are genuinely useful for, and it takes about four minutes on the phone.</p></li>
  <li><h3>We work out where your container should start from</h3><p>Stock sits in yards and partner depots spread around the country, so the first question is not what it costs — it is which yard nearest you has that size in that grade standing ready. For most addresses there is something closer than people assume, and a container that starts its run nearby lands sooner and cheaper than the same container carted across the continent. You get told which yard yours would come from before you are asked to decide anything.</p></li>
  <li><h3>You get a price with the run built into it</h3><p>One figure, with the grade named, the yard named and the cartage to that specific address worked out. We do not publish a delivery rate anywhere on this site, and the reason is not coyness — two addresses in one postcode can be very different jobs once you know that one takes a tilt-tray straight off a wide street and the other needs a crane to reach over a fence. An address and a photograph of the gateway beats any published table.</p></li>
  <li><h3>You look at the actual container</h3><p>Ask and we will photograph the individual unit — floor, doors, seals, roof, plate — and send it through before delivery. If you are near enough to Cornubia to drive over, do that instead and open the doors yourself. On as-is stock the faults get photographed rather than avoided, because a surprise on delivery day is a problem that lands back on us anyway.</p></li>
  <li><h3>It gets settled, and the truck gets booked</h3><p>Settling the container takes that specific unit out of stock and puts your name against it. Then the run is booked out of the yard we named, and you get a date and a window rather than a guess. Long-distance runs are built around when a truck is next heading that way, so the further out you are, the more the date is worth locking in early.</p></li>
  <li><h3>It turns up, and it goes where you point</h3><p>The driver will ring, usually when they are on the way. Someone on site walks them to the spot, confirms which way the doors face and stays clear while it comes off. Drivers will not place a container somewhere they judge unsafe or on ground they can feel giving way, and when a driver says no it is worth listening rather than negotiating.</p></li>
</ol></div>`)}

${plate("Give us the delivery address before anything else", "It is the one fact that decides the yard, the truck, the date and the price")}

${band({ photo: "process-yard", eyebrow: "The long runs", h: "What happens when it is a long way out", dark: true, alt: true, p: ["A container going a few hundred kilometres inland or right across the top of the country rarely travels on its own truck, because sending one out empty in one direction is how you end up with a cartage figure nobody wants to hear. It goes with other freight heading the same way, which makes the date a scheduling question rather than a willingness question.", "In practice that means a wider delivery window, a warning that the wet can shut unsealed access for weeks at a time, and a real conversation about whether a hard deadline is achievable. We would far rather tell you three weeks and hit it than promise five days and spend the fortnight apologising."], cta: ["/delivery/", "Delivery and access"] })}

${sec("sec-wash", secHead("Worth knowing", "The four things that slow an order down", null) + `<div class="narrow">
  <div class="reveal"><h2>An address with no access detail</h2><p>A street name tells us the distance and nothing about the job. Whether the truck can get in, turn and lay a container down is a separate question, and it is the one that decides which vehicle comes. Two photographs — one from the road looking in, one of the spot with something in frame for scale — usually settle it in a single reply.</p></div>
  <div class="reveal" style="margin-top:2.4rem"><h2>A size picked before the job is described</h2><p>People ring having already decided on a 20ft because that is the one everybody has heard of. Sometimes it is right. Often what is being stored suits a 40ft high cube, or two smaller units in two places, and the only way anybody finds that out is by starting with the contents instead of the container. Dimensions are on the <a href="/dimensions/">sizes and dimensions page</a> if you want to work it through first.</p></div>
  <div class="reveal" style="margin-top:2.4rem"><h2>A grade chosen on price alone</h2><p>The spread between the cheapest and the dearest grade is wider than most people expect, which makes the bottom of the range look like a bargain until the contents matter. As-is is not sold watertight and is the right buy for plenty of jobs; it is the wrong buy for anything that has to stay dry. Ten seconds on the <a href="/container-grades/">grades page</a> avoids a long conversation later.</p></div>
  <div class="reveal" style="margin-top:2.4rem"><h2>A deadline that is really somebody else's deadline</h2><p>The date people give us is often the date the shed comes down, the slab gets poured or the tenant moves in. Say so. Knowing what the container is waiting on lets us tell you which parts of the schedule have slack in them, and whether hiring a unit for a few weeks solves the problem better than buying one in a hurry.</p></div>
  <div class="chips" style="margin-top:1.6rem"><a href="/shipping-container-hire/">Hire instead</a><a href="/container-inspection/">Checking a used unit</a><a href="/delivery-areas/">Where we deliver</a></div>
</div>`)}

${sec("", secHead("Common questions", "Ordering, timing and where stock comes from", null) + qaHtml(faqs))}

${ask("Start with the address", `Tell us the town and what is going in it, and the reply will name the yard, the grade and the timing. Ring ${S.phone} or send it through — both land with a person. ${PROMISE}.`, "how")}`;
  out("how-it-works", shell({ t: `Ordering A Container — Which Yard, What Timing, What Happens On The Day | ${BRAND}`, d: "The six stages from first call to container on the ground: how we work out which yard yours comes from, what that does to timing and cartage, how long-distance runs are scheduled and what needs to be ready on delivery day.", c: "/how-it-works/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ================================ ABOUT ================================= */
function about() {
  const crumbs = [HOME_CRUMB, ["About", "/about/"]];
  const faqs = [
    { q: `Is ${SHORT} Australian owned?`, a: `Yes — Australian owned and Australian operated. The head yard is at ${ADDR.suburb} in south-east Queensland, and stock is held and turned over through yards elsewhere around the country so that orders a long way from here do not have to be served out of Queensland.` },
    { q: "Where is the yard, and can I come and look?", a: `${ADDR_LINE}. It is a working yard rather than a showroom, so ring before you set off: somebody will meet you and have the units you are interested in standing clear instead of stacked three deep behind something else. Allow twenty minutes rather than five. Most people change their mind about size once a 20ft and a 40ft are side by side in front of them.` },
    { q: "Do you only sell in Queensland?", a: "No. We sell and hire into every state and territory. Your unit is despatched from whichever yard makes the shortest sensible run to your address, so being nowhere near south-east Queensland does not mean waiting on a container to be carted down a highway from it." },
    { q: "What if I cannot get to the yard?", a: "Ask for photographs of the specific unit and they come through on request, before delivery — corner castings, door end, roof, and a shot taken from inside looking down the floor. It is the next best thing to standing next to it, and it beats a stock image of a container that is not yours." },
    { q: "What are your trading hours?", a: HOURS ? `${HOURS}. Anything that arrives outside those hours gets picked up the next business day by a person — ${PROMISE.toLowerCase()}.` : "Ring and we will tell you." }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-about", eyebrow: "About us",
    h1: `About ${BRAND}`,
    lede: S.tagline
  })}
${sec("", `<div class="narrow">
  <div class="reveal"><h2>Australian owned, and run off a real yard</h2>
  <p>${esc(BRAND)} is Australian owned and Australian operated. The head yard sits at ${esc(ADDR_LINE)} — hardstand, signage on the fence, containers standing in rows where a person can walk the length of one, swing the doors and look down the floor with their own eyes. If you want to see the thing before you buy the thing, that is the address to put in the maps app.</p>
  <p>It is deliberate that there is a street address on this page at all. A great deal of container selling in this country is done without either party ever standing beside a container. That can work perfectly well. It also means the first time you meet the unit is the moment it is being lowered onto your block, and by then any conversation about whether it was the right one is a hard conversation to have.</p></div>
  <div class="reveal" style="margin-top:2.6rem"><h2>The nearest unit, not the nearest desk</h2>
  <p>Where this differs from a single-yard operator is what happens when you are not down the road from Cornubia. Stock is held and moved through yards around the country, so an order out of Perth, Townsville or Wagga does not set a container off on a week-long journey. It sets off a search for the one already standing closest to you in the grade you asked for.</p>
  <p>That is the whole idea and it is worth putting plainly: wherever you happen to be, there is usually a container closer than you think. One number gets you to somebody who can see what is standing where, so nobody has to be transferred to a branch to find out.</p></div>
  <div class="reveal" style="margin-top:2.6rem"><h2>What we sell</h2>
  <p>New single-trip, cargo-worthy used and as-is units in 10ft, 20ft and 40ft, in general purpose, high cube, side opening and dangerous goods configurations, to buy or to hire, with modification work where you need doors, windows, vents, shelving, lining or paint. New and cargo-worthy stock goes out wind and watertight, and that is inspected rather than assumed. As-is units are the cheap end and are not sold watertight — which is precisely why they are cheap, and why we will ask what is going inside before letting anybody buy one on price alone.</p></div>
  <div class="reveal" style="margin-top:2.6rem"><h2>Four things we will not do</h2>
  <ul class="ticks">
    <li>Publish a delivery figure. Every address is its own job and a number on a webpage would be wrong for a lot of them, so it gets worked out with the container.</li>
    <li>Call an as-is container watertight. It is not, and the grade you are buying is the honest answer to that question.</li>
    <li>Tell anybody a container will keep water out in a flood. It will not. Water finds the door seals, and an empty one floats.</li>
    <li>Sell you up. If the cheaper grade or the smaller box does the job, that is what you will hear, because somebody who buys the wrong thing once does not ring back.</li>
  </ul></div>
  <div class="reveal" style="margin-top:2.6rem"><h2>Picking up the phone</h2>
  <p>${esc(PROMISE)}. ${esc(PROMISE_DETAIL)} It is written here on purpose, so that it is something you can hold us to rather than something we say on a call and forget.</p></div>
</div>`)}
${plate(S.phone, HOURS ? `${HOURS} — one line, wherever you are.` : "One line, wherever you are.")}
${band({ photo: "yard-cornubia", eyebrow: "The head yard", h: `${ADDR.suburb}, half an hour south-east of the Brisbane CBD`, p: [`${ADDR_LINE}, in the Logan corridor a couple of minutes off the M1, sitting roughly midway between the city and the Gold Coast.`, HOURS ? `Open ${HOURS}. Give us a ring before you drive over so the units you want to look at are pulled out and standing clear when you arrive.` : "Give us a ring before you drive over so the units you want to look at are standing clear when you arrive."], cta: ["/contact/", "Get in touch"], dark: true })}
${sec("sec-wash", secHead("Common questions", `About ${SHORT}`, null) + qaHtml(faqs))}
${ask("Talk to us", `Tell us what the container has to do and you will be told what it needs. ${PROMISE}.`, "about")}`;
  out("about", shell({ t: `About ${BRAND} — Australian Owned Container Sales And Hire`, d: `${BRAND} sells and hires shipping containers into every state and territory, despatched from the yard that makes the shortest run to you. Head yard at ${ADDR_LINE}. Australian owned and operated.`, c: "/about/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ================================= FAQS ================================= */
function faqsPage() {
  const crumbs = [HOME_CRUMB, ["FAQs", "/faqs/"]];
  const groups = [
    {
      h: "Working out what you need", faqs: [
        { q: "How do I know whether to get a 20ft or a 40ft?", a: "Measure the ground before you measure the load. A 20ft wants roughly seven metres of level clear space to sit on and a straight approach to reach it. A 40ft is better value per cubic metre but takes a great deal more room to place — think about where the truck has to stop, not only where the box ends up. On a tight block, two 20fts dropped in separate spots often beat one 40ft that will not fit anywhere useful." },
        { q: "Is a high cube worth the extra?", a: "If anything is going on the walls, over your head or up on a mezzanine, yes. A high cube stands a foot taller — 2.9m against 2.59m on the outside — and that foot is what lets you line and insulate the inside and still walk about upright. For plain pallet and gear storage, standard height is usually the sensible buy and the cheaper one." },
        { q: "Should I buy or hire?", a: "Hire suits a job with an end date on it: a build, a renovation, a season, a shutdown. Buying suits anything open-ended, because somewhere past a year or two of continuous hire the arithmetic stops favouring hire — and you will be told that rather than left on a billing cycle." },
        { q: "How much actually fits in one?", a: "About ten Australian standard pallets on the floor of a 20ft and roughly twenty-one in a 40ft, single stacked. In household terms a 20ft takes a typical three-bedroom house at a squeeze and a 40ft takes it without argument. Describe what is going in and which size you need usually answers itself." }
      ]
    },
    {
      h: "Condition, grade and what those words mean", faqs: [
        { q: "What do the grades actually mean?", a: "New, or single-trip, has made one loaded voyage and looks close to factory. Cargo-worthy is a used unit still certified fit to carry freight at sea — sound structure, sealing doors, solid floor — and cosmetically whatever a decade of weather and paint has left behind. As-is is sold on its faults: it might have a hole, a soft patch of floor or doors that need persuading, and the price reflects exactly that." },
        { q: "Which grades are sold watertight?", a: "New and cargo-worthy units are wind and watertight, and that gets checked before one goes out. As-is units are not sold watertight, and that is the difference you are paying less for. If the contents have to stay dry, do not buy as-is on price alone — say what is going inside and we will point you at the right grade." },
        { q: "There is rust on it. Is that a problem?", a: "Usually not. These are built from weathering steel, which grows its own oxide skin and then largely stops eating itself. What matters is whether the rust has gone all the way through, whether it is sitting in a roof panel where water ponds after every storm, and whether the bottom rail has been chewed out by years of standing flat in wet grass. Staining on a side panel is cosmetic and always will be." },
        { q: "Will a container keep my things safe in a flood?", a: "No, and anyone who says otherwise is selling something. A sound container keeps rain off from above and that is where the claim stops. Floodwater comes in at the door seals, and an empty container will lift and travel. On a block that goes under, the only real answers are height above the flood line and being able to shift the contents out in time." }
      ]
    },
    {
      h: "Getting it onto your place", faqs: [
        { q: "What does the truck need to get in?", a: "For a 20ft on a tilt-tray, picture a straight run of about twenty metres, three and a half metres of width at the tightest pinch and four and a half metres of clear air overhead. A 40ft wants nearer thirty metres and more width again. And bear in mind the truck has to leave as well, which down a long single-width drive means reversing the entire length of it." },
        { q: "Do I need to do anything to the ground first?", a: "Get it level and get something solid under the four corner castings — hardwood sleepers, concrete pads or well-compacted road base. The whole weight travels through those four points, so ground that felt like concrete after a dry fortnight can let one corner sink after a wet one, and a box that is out of square is a box whose doors fight you every single time you open them." },
        { q: "What does delivery cost?", a: "It is worked out per address alongside the container, because that is the only honest way to answer it. Distance counts, but what the truck has to do at your end usually counts for more. Send one photo from the street looking in, one along the approach and one of the spot it has to land on, and you will get a firm figure instead of a range." },
        { q: "Can it be delivered with my gear already inside?", a: "Only where that was the arrangement from the outset. A loaded container is a different weight, a different restraint job and often a different truck altogether, and it is not something to spring on a driver at seven in the morning. Raise it at the quote and it is straightforward." }
      ]
    },
    {
      h: "Ordering, paying and approvals", faqs: [
        { q: "Can I look at the container before it is delivered?", a: `Yes. Come out to ${ADDR_LINE} and ring beforehand so the unit is standing clear rather than buried. If you are nowhere near there, ask for photographs of the actual container on request and they come through before delivery.` },
        { q: "When does it get paid for?", a: "Before it leaves the yard. That is what allows a specific unit to be held under your name instead of going to whoever rings next, and it is exactly why we are glad to have you inspect it or to photograph it for you first." },
        { q: "What is the shortest hire?", a: "A month is the usual minimum and there is room to move where it makes sense to. The unit stays ours to maintain, delivery and collection are quoted the same way they would be on a sale, and if the hire is quietly turning into a purchase we will say so." },
        { q: "Do I need council approval to put one on my block?", a: "It turns on your council, how long it is staying, whether it can be seen from the road and what it is being used for, and it genuinely differs from shire to shire. Some treat it as a temporary structure and want nothing at all; others want a siting application; newer estates often carry a covenant tighter than anything the council asks. One call to your own council settles it, and it is a much better call to make before delivery day than after it." }
      ]
    },
    {
      h: "Living with it afterwards", faqs: [
        { q: "Why is it wet inside when it has not rained?", a: "Condensation. Warm damp air gets in through the day, the steel gives up its heat overnight, and the moisture comes back out on the ceiling and runs down the walls. It is worse near the coast and worse again if damp things went in and the doors got shut on them. Vents help, keeping the load up off the floor helps, and lining with insulation solves it properly." },
        { q: "Can I shift it later?", a: "Yes — the thing was designed to be picked up and put down repeatedly. What decides whether that is easy is whether a truck can still get to it once you have built a deck, run a fence or planted a garden around it. Worth two minutes of thought on the day it lands rather than four years later." },
        { q: "How do I keep it secure?", a: "A lockbox welded over the padlock is the best single thing you can add, because it shrouds the shackle and leaves bolt cutters nothing to bite on. After that it is placement: put the doors up against a wall, a fence or another container so they physically cannot swing open even if somebody defeats the lock." }
      ]
    }
  ];
  const all = groups.reduce((a, x) => a.concat(x.faqs), []);
  const body = `${pageHead({ crumbs, photo: "head-faqs", eyebrow: "FAQs", h1: "Shipping container questions, answered", lede: "The things that come up on the phone most weeks, written out here in the same words we would use if you rang and asked." })}
${groups.map((gr, i) => sec(i % 2 ? "sec-wash" : "", secHead(null, gr.h, null) + qaHtml(gr.faqs))).join("\n")}
${plate("Still not answered?", `Ring ${S.phone} and ask a person.`)}
${ask("Ask us the one that is not here", `Ring it through or type it in — both land with somebody who knows the answer. ${PROMISE}.`, "faqs")}`;
  out("faqs", shell({ t: `Shipping Container Questions Answered | ${BRAND}`, d: "Straight answers on container sizes and heights, grades and watertightness, truck access and ground preparation, delivery, payment, hire terms, council approval, condensation and security.", c: "/faqs/", schema: g(crumbsLd(crumbs), faqLd(all)) }, body));
}

/* ================================ GUIDES ================================ */
function guides() {
  const crumbs = [HOME_CRUMB, ["Guides", "/blog/"]];
  const sorted = POSTS.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  const body = `${pageHead({ crumbs, photo: "head-guides", eyebrow: "Guides", h1: "Shipping container guides", lede: "Everything we end up explaining on the phone, written down properly. Grades, access, condensation, security, modifications and the rest." })}
${sec("", `<div class="guides">${sorted.map((p) => `<article class="guidecard reveal"><h3><a href="/blog/${p.slug}/">${esc(p.title)}</a></h3><p>${esc(p.desc)}</p><div class="meta">${esc(String(p.mins))} min read · ${esc(auDate(p.date))}</div></article>`).join("")}</div>`)}
${ask("Rather just ask us?", `Ring or send an enquiry and you will get a straight answer from a person. ${PROMISE}.`, "guides")}`;
  out("blog", shell({ t: `Shipping Container Guides | ${BRAND}`, d: "Practical guides to buying, hiring, siting and living with shipping containers — grades, delivery access, dimensions, condensation, security, site preparation and modifications.", c: "/blog/", schema: g(crumbsLd(crumbs), { "@type": "CollectionPage", name: "Shipping container guides", url: `${D}/blog/` }) }, body));

  sorted.forEach((p, idx) => {
    const c = [HOME_CRUMB, ["Guides", "/blog/"], [p.title, `/blog/${p.slug}/`]];
    const others = sorted.filter((x) => x.slug !== p.slug).slice(idx === 0 ? 1 : 0, (idx === 0 ? 1 : 0) + 3);
    const art = {
      "@type": "Article", headline: p.title, description: p.desc,
      datePublished: p.date, dateModified: p.date,
      author: { "@type": "Organization", name: BRAND, url: D },
      publisher: { "@id": `${D}/#biz` },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${D}/blog/${p.slug}/` }
    };
    const body2 = `${crumbHtml(c)}
<header class="phead"><div class="phead-media">${IMG("guide-" + p.slug, p.title, { w: 1800, h: 900, eager: true })}</div><div class="wrap">
  <p class="eyebrow">Guide · ${esc(String(p.mins))} min read</p>
  <h1>${esc(p.title)}</h1>
  <p class="phead-lede">${esc(p.intro)}</p>
</div></header>
${promiseStrip()}
${sec("", `<div class="narrow article reveal">${p.body}</div>`)}
${sec("sec-wash", secHead("More guides", "Related reading", null) + `<div class="guides">${others.map((x) => `<article class="guidecard reveal"><h3><a href="/blog/${x.slug}/">${esc(x.title)}</a></h3><p>${esc(x.desc)}</p><div class="meta">${esc(String(x.mins))} min read</div></article>`).join("")}</div>`)}
${ask("Got a question this did not answer?", `Ring us — ${S.phone} — or send it through. ${PROMISE}.`, "g" + idx)}`;
    out("blog/" + p.slug, shell({ t: `${p.title} | ${BRAND}`, d: p.desc, c: `/blog/${p.slug}/`, schema: g(crumbsLd(c), art) }, body2));
  });
}

/* =============================== CONTACT ================================ */
function contact() {
  const crumbs = [HOME_CRUMB, ["Contact", "/contact/"]];
  const faqs = [
    { q: "Is the 1300 number right for every state?", a: `Yes. ${S.phone} is the only number on the site and it reaches the same desk wherever you are ringing from. Nobody gets transferred to a branch to find out what is in stock.` },
    { q: "Can I turn up at the yard without ringing?", a: `You can, but you will get more out of the trip if you ring first. Cornubia is a working yard with machinery moving in it, and the unit you have driven over to see may be sitting behind two others. A phone call beforehand means somebody meets you and the containers you care about are standing clear.` },
    { q: "Will I get a price on the phone, or does it have to be in writing?", a: "Both work. Ring and you will get a number on the call for anything standard. Send the form and it comes back in writing with the grade, the size and the delivery to your address set out, which is usually what people want if they are comparing or getting it approved by somebody else." },
    { q: "What happens after I send the enquiry?", a: `${PROMISE_DETAIL} You get a person reading it, not an automatic reply with a reference number. If the details are enough to price it, you get the price; if something is missing, you get one short question rather than a form to fill in again.` },
    { q: "What if I do not know what size or grade I need?", a: "Then say exactly that. Every question on the form has a not-sure option sitting at the bottom of it for this reason. Not knowing which size or which grade the job wants is the commonest point at which people give up halfway through a container enquiry, and it is a two-minute conversation on the phone." },
    { q: "Can you hold a container while I get the site ready?", a: "Within reason, yes. Once a unit is paid for it belongs to you and it can stand here while the pad goes down, the approval comes back or the builder finishes. What cannot happen is a specific container being reserved indefinitely against a maybe, because somebody else will want that one this week." },
    { q: "Do you quote on more than one at a time?", a: "Yes, and it is worth flagging in the first message if you need several, because they may not all be standing in the same yard. Several units going to a single address generally travel better than the same number scattered across three sites, and that is useful to know while the plan is still on paper." }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-contact", eyebrow: "Contact",
    h1: "Get a price on a container",
    lede: `Give us the postcode, what is going in it and what the truck has to get past. That is normally enough for a firm number. ${PROMISE} — ${PROMISE_DETAIL.toLowerCase()}`,
    facts: [["Call", S.phone], ["Email", S.email], ["Head yard", ADDR_LINE]].concat(HOURS ? [["Open", HOURS]] : [])
  })}
${sec("", `<div class="spec">
  <div>${F.quoteForm("-contact")}</div>
  <div class="specside">
    <div class="pricebox reveal">
      <h3>Or use the phone</h3>
      <p style="color:var(--pale);font-size:.95rem">Usually faster, and you get somebody who can see what is standing in the yards this week rather than what a price list says should be.</p>
      <a class="btn btn-primary btn-wide" href="${S.phoneHref}">${esc(S.phone)}</a>
      <a class="btn btn-ondark btn-wide" style="margin-top:.6rem" href="mailto:${S.email}">${esc(S.email)}</a>
      <p class="pricenote">${HOURS ? esc(HOURS) + ". " : ""}${esc(PROMISE_DETAIL)}</p>
    </div>
    <div class="pricebox reveal">
      <h3>Come and see them</h3>
      <p style="color:var(--pale);font-size:.95rem">${esc(ADDR_LINE)}</p>
      <p style="color:var(--pale);font-size:.95rem">Logan corridor, a couple of minutes off the M1, roughly half an hour south-east of the Brisbane CBD and the same again north of the Gold Coast. Ring before you come out so the units you want to walk around are pulled clear.</p>
    </div>
  </div>
</div>`)}
${plate("One line, wherever you are", HOURS || "")}
${sec("sec-wash", secHead("Before you send it", "Four things that turn an enquiry into a price", null) + `<div class="narrow reveal">
  <ul class="ticks">
    <li><strong>The delivery postcode.</strong> It decides which yard the unit comes off, and that changes the answer more than anything else on the list.</li>
    <li><strong>What is going inside.</strong> Tools, stock, furniture, feed, machinery, a fit-out. It is what settles the grade argument, because dry-and-sealed and cheap-and-solid are different containers.</li>
    <li><strong>How long you want it.</strong> A fixed-length job usually points to hire; open-ended usually points to buying.</li>
    <li><strong>Three photographs of the approach.</strong> One from the middle of the road looking in, one down the length of the driveway or track, and one of the ground it has to land on.</li>
  </ul>
  <p style="margin-top:1.4rem">Those photographs are worth more than any description either of us could write. With them, the truck, the timing and the delivered figure normally come back in a single reply. Without them, the first thing you get back is a request for them, and that costs everyone a day. What the truck needs at your end is set out on the <a href="/delivery/">delivery page</a>.</p>
</div>`)}
${band({ photo: "yard-entry", eyebrow: "Finding us", h: "Cornubia, between Brisbane and the Gold Coast", p: [`${ADDR_LINE}. Come off the M1 at the Logan side and it is a short run in — hardstand, room to walk around the units and somebody to open the doors for you.`, HOURS ? `Open ${HOURS}. Give yourself twenty minutes rather than five; almost everybody rethinks the size once a 20ft and a 40ft are standing next to each other.` : "Give yourself twenty minutes rather than five; almost everybody rethinks the size once two are standing side by side."], cta: ["/depots/", "How supply works"], dark: true })}
${sec("", secHead("Common questions", "Getting hold of us", null) + qaHtml(faqs))}`;
  out("contact", shell({ t: `Contact ${BRAND} — Container Prices And Enquiries`, d: `Get a price on a shipping container for sale or hire anywhere in Australia. Ring ${S.phone} or send the form — ${PROMISE.toLowerCase()}. Head yard at ${ADDR_LINE}.`, c: "/contact/", schema: g(crumbsLd(crumbs), { "@type": "ContactPage", url: `${D}/contact/` }, faqLd(faqs)) }, body));
}

/* =============================== UTILITY ================================ */
function utility() {
  out("thank-you", shell({
    t: `Enquiry received | ${BRAND}`, d: "Your container enquiry has landed with us.", c: "/thank-you/", noindex: true
  }, `${sec("", `<div class="narrow" style="text-align:center;padding:2rem 0">
    <p class="eyebrow" style="justify-content:center">Received</p>
    <h1>That has landed with us</h1>
    <p style="font-size:1.15rem;color:var(--muted)">${esc(PROMISE)}. ${esc(PROMISE_DETAIL)}</p>
    <p>Need it sorted sooner than that? Ring <a href="${S.phoneHref}">${esc(S.phone)}</a>${HOURS ? " — " + esc(HOURS) : ""} and quote the postcode you just sent through.</p>
    <p>While you wait: the delivery page runs through what the truck needs at your end, and the grades page explains the one thing that moves a container price more than size does.</p>
    <p style="margin-top:2rem"><a class="btn btn-ghost" href="/delivery/">Delivery and access</a> <a class="btn btn-ghost" href="/container-grades/">Grades explained</a> <a class="btn btn-ghost" href="/">Back to the site</a></p>
  </div>`)}`));

  const p404 = shell({ t: `Page not found | ${BRAND}`, d: "There is nothing at this address on the site.", c: "/404.html", noindex: true },
    `${sec("", `<div class="narrow" style="text-align:center;padding:2rem 0">
      <p class="eyebrow" style="justify-content:center">404</p>
      <h1>There is nothing at this address</h1>
      <p style="font-size:1.1rem;color:var(--muted)">The page has either moved or never existed in the first place. Almost everybody who lands here is after one of these — or you can skip the hunt and ring <a href="${S.phoneHref}">${esc(S.phone)}</a>.</p>
      <div class="chips" style="justify-content:center;margin-top:1.5rem"><a href="/shipping-containers/">The range</a><a href="/container-sales/">Buying</a><a href="/shipping-container-hire/">Hire</a><a href="/delivery/">Delivery</a><a href="/delivery-areas/">Where we deliver</a><a href="/depots/">Depots</a><a href="/faqs/">FAQs</a><a href="/contact/">Contact</a></div>
    </div>`)}`);
  fs.writeFileSync(path.join(DIST, "404.html"), p404);

  out("privacy", shell({ t: `Privacy | ${BRAND}`, d: `How ${BRAND} handles the details you put in an enquiry, who sees them and how to have them removed.`, c: "/privacy/" },
    `${pageHead({ crumbs: [HOME_CRUMB, ["Privacy", "/privacy/"]], photo: "none", eyebrow: "Privacy", h1: "Privacy and your details", lede: "The plain version: what you send us is used to quote your container and to talk to you about it. It is not sold, and it is not handed to marketers." })}
${sec("", `<div class="narrow">
  <h2>What we ask for</h2><p>The enquiry form asks for a name, a phone number, an email address and the suburb or postcode the container is going to, plus whatever you choose to tell us about the job and the site. That is what it takes to price a container properly rather than guess at it. We also record which page the enquiry came from, and where the browser tells us, the search or advertisement that brought you to the site.</p>
  <h2>What it gets used for</h2><p>Quoting the job, ringing or emailing you about it, booking the delivery, and keeping a record of the sale or the hire afterwards. If you tell us to stop contacting you, that is the end of it — no unsubscribe maze, just tell whoever you are dealing with.</p>
  <h2>Who else sees it</h2><p>The yard the container is coming out of and the transport operator carrying it, because they need an address and a contact number to do the job at all. It also sits in the email and customer-record software we run the business on. Nobody buys it from us, because none of it is for sale, and it is not passed to anyone for their own advertising.</p>
  <h2>How long it is kept</h2><p>Live enquiries stay while they are live and for a while after, because container jobs have a habit of coming back around months later. Completed sales and hires are held for as long as tax and business-record obligations require them to be.</p>
  <h2>Seeing it, correcting it, deleting it</h2><p>Ring ${esc(S.phone)} or email <a href="mailto:${S.email}">${esc(S.email)}</a> and ask. You will be told what is on file against your name, anything wrong gets fixed, and anything we are not obliged to keep gets deleted.</p>
  <h2>Cookies</h2><p>This site sets no advertising or profiling cookies of its own. What the browser stores is what the site needs in order to work.</p>
  <h2>Keeping it safe</h2><p>Enquiries travel to us over an encrypted connection and are stored in access-controlled systems. No arrangement is perfect, and if something ever went wrong with information we hold, the people affected would hear it from us.</p>
  <h2>If you are unhappy about any of this</h2><p>Say so on the phone first — we are a small enough outfit that the person answering can usually deal with it there and then. If that does not resolve it, the Office of the Australian Information Commissioner takes privacy complaints.</p>
</div>`)}`));
}


/* ========================= CONDITION PAGES (NEW) ========================
   New / used / refurbished. These exist because the live WordPress site ran
   "new shipping containers <town>" and "used shipping containers <town>" as
   separate pages for eleven towns — 30-odd near-duplicates of each other and
   of the plain locality page. Those all 301 into /{town}/ (see the redirect
   map in tail()). The condition INTENT is real though, so it gets three
   proper national pages here instead of thirty thin local ones. */
function conditionPages() {
  (P.conditions || []).forEach((x) => {
    const crumbs = [HOME_CRUMB, ["Shipping containers", "/shipping-containers/"], [x.name, `/${x.slug}/`]];
    const others = (P.conditions || []).filter((y) => y.slug !== x.slug);
    const faqs = [
      { q: `What does "${x.name.toLowerCase()}" actually mean?`, a: x.lead },
      { q: `Who should buy ${x.name.toLowerCase()}?`, a: x.bestFor },
      { q: "What should I watch for?", a: x.watch },
      { q: "Can I see the unit before it is delivered?", a: `Yes. Come out to the yard at ${ADDR_LINE} and look at the actual container, or ask for photographs of the specific unit on request and we will send them before delivery — corners, door end, roof and internal floor.` }
    ];
    const body = `${pageHead({
      crumbs, photo: "head-" + x.slug, eyebrow: "Condition",
      h1: x.title, lede: x.lead
    })}
${sec("", `<div class="twocol">
  <div class="reveal">
    <h2>What you are buying</h2>
    ${para(x.detail)}
    ${asIs()}
  </div>
  <div>
    <div class="pricebox reveal">
      <h3>Best for</h3>
      <p>${esc(x.bestFor)}</p>
      <h3 style="margin-top:1.2rem">Watch for</h3>
      <p>${esc(x.watch)}</p>
      <a class="btn btn-primary btn-wide" style="margin-top:1rem" href="/contact/">Get a price</a>
    </div>
  </div>
</div>`)}
${plate(x.name, "Available in 10ft, 20ft and 40ft")}
${sec("sec-wash", secHead("What comes with it", "The points that matter", null) + `<ul class="ticks">${x.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>`)}
${sec("", secHead("By size", "Same condition, three sizes", null) + rangeGrid(P.sizes))}
${others.length ? sec("sec-grey", secHead("The other two", "How this compares", null) + `<div class="range">${others.map((o) => `<article class="rangecard reveal"><div class="rangecard-body"><h3><a href="/${o.slug}/">${esc(o.name)}</a></h3><p>${esc(o.bestFor)}</p></div></article>`).join("")}</div><p style="margin-top:1.4rem"><a class="btn btn-ghost" href="/container-grades/">Grades explained in full</a></p>`) : ""}
${sec("sec-wash", secHead("Common questions", "About " + x.name.toLowerCase(), null) + qaHtml(faqs))}
${ask("Get a price", `Tell us the size, where it is going and what is going in it. ${PROMISE}.`, x.slug)}`;
    out(x.slug, shell({ t: `${x.title} For Sale | ${BRAND}`, d: x.metaDesc, c: `/${x.slug}/`, schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
  });
}

/* ====================== MODIFICATIONS (NEW) ============================= */
function modifications() {
  const crumbs = [HOME_CRUMB, ["Modifications", "/container-modifications/"]];
  const M = P.mods || [];
  const faqs = [
    { q: "Can you modify a container before it is delivered?", a: "Yes, and it is nearly always cheaper and better done that way. Cutting a door or a window into a container standing in a yard with power, hardstand and the right gear is a different job from doing it on a suburban block with a generator. Tell us what the container has to do at the enquiry rather than after it has landed." },
    { q: "Does cutting into a container weaken it?", a: "It can, and that is exactly why the framing matters. A corrugated steel wall is structural, so any opening cut into one has to be reframed with steel to carry the load the panel was carrying. Done properly the unit is still stackable and still moves on the same trucks. Done badly it racks, and the doors are the first thing to tell you." },
    { q: "Can a modified container still be moved later?", a: "Usually yes, provided the corner castings are untouched and the frame is intact — those are what the truck and the crane pick up on. Where it gets awkward is a container that has been built into a deck, a slab or a structure at the site end. If you think the unit may move again, say so before the modification is designed." },
    { q: "Do modifications need council approval?", a: "The container itself is one question and what you turn it into is another. A roller door on a storage unit is rarely anybody's business; a container fitted out as a habitable room, an office with people working in it or something plumbed and wired usually is. It varies by council and it is worth the phone call before the work starts." }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-modifications", eyebrow: "Modifications",
    h1: "Container modifications",
    lede: "Doors, windows, lining, shelving, ventilation. What a container can be changed into, what that costs you structurally, and why it is nearly always better done in a yard than on your block."
  })}
${sec("", secHead("What we change", "The six that come up constantly", "Everything below is done before delivery wherever possible. A container in a yard with power, hardstand and a level floor is a far better place to cut steel than a residential driveway.") + `<div class="range">${M.map((m) => `<article class="rangecard reveal"><div class="rangecard-body"><h3>${esc(m.name)}</h3><p>${esc(m.blurb)}</p></div></article>`).join("")}</div>`)}
${plate("Tell us what it has to do", "Not what it has to be. The job decides the modification.")}
${band({ photo: "mod-workshop", eyebrow: "The rule", h: "Framing is the whole job", p: ["A container's walls carry load. Every opening cut into one has to be reframed in steel to carry what the panel was carrying, or the unit racks and the doors stop shutting square — which is how you find out, usually about six months later.", "That is the difference between a modification and a hole. It is also why a cheap cut-in door is not a saving; it is a structural problem you have paid to install."], cta: ["/contact/", "Talk it through"], dark: true })}
${sec("sec-wash", secHead("Common questions", "About modifying a container", null) + qaHtml(faqs))}
${ask("Tell us what you want it to do", `Describe the job rather than the product and we will tell you what the container actually needs. ${PROMISE}.`, "mods")}`;
  out("container-modifications", shell({ t: `Shipping Container Modifications | ${BRAND}`, d: `Container modifications — personnel doors, windows, roller doors, insulation, shelving and ventilation. Done before delivery wherever possible. ${BRAND}, delivered ${SERVICE_AREA}.`, c: "/container-modifications/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ============================= DEPOTS (NEW) =============================
   The towns stock is drawn through. The strongest page on the site for
   local search, because everything on it is verifiable and none of it can be
   copied by a competitor without the yards to back it.

   ⚠️ ONLY the head yard's street address appears. The other eight are
   third-party depots; publishing their addresses would be wrong, and it is
   the exact pattern that got three Google Business Profiles into trouble. */
function depots() {
  const crumbs = [HOME_CRUMB, ["Depots", "/depots/"]];
  const D9 = Array.isArray(S.depots) ? S.depots : [];
  const faqs = [
    { q: "Can I inspect a container at any of your depots?", a: `${ADDR.suburb} is the only walk-in yard — ring first and come out. At the other eight, inspection is by arrangement rather than a drop-in, because they are working depots with machinery moving and they are not set up for the public. Ring and we will organise a time, or ask for photographs of the actual unit on request and we will send them before delivery.` },
    { q: "Does the depot my container comes from change the price?", a: "Yes, and it is one of the bigger variables people do not expect. The container price moves with what is standing in that depot this week, and the cartage moves with how far it has to travel to you. Two identical 20fts can be a long way apart on final price purely because of which yard they are sitting in when you ring." },
    { q: "Do all depots hold every size and grade?", a: "No. Selection is deepest close to the ports and thinnest in the remote depots, which is exactly what you would expect. If you need a specific grade, a high cube rather than a standard, or a particular door configuration, tell us early — sometimes the answer is that it comes from a different depot and takes a few more days." },
    { q: "What if I am nowhere near any of these?", a: `We deliver to every state and territory, and most addresses are nowhere near a depot. The depot list matters because it is what makes the run to you shorter than trucking a container across the country. Give us the address and we will work out which yard it comes from before we quote it.` }
  ];
  const body = `${pageHead({
    crumbs, photo: "head-depots", eyebrow: "Where our stock is",
    h1: "Our depots",
    lede: `Your container does not start its journey at our head office. It starts at whichever yard already has the right unit standing in it, and that is usually a lot closer to you than people expect — which is why the price depends as much on where the box is sitting as on the box itself.`
  })}
${sec("", `<div class="reveal"><h2>Where the stock actually is</h2><p>${esc(S.nationalDetail)}</p></div>
<div class="range" style="margin-top:1.6rem">${D9.map((d) => `<article class="rangecard reveal"><div class="rangecard-body"><h3>${esc(d.town)}, ${esc(d.state)}</h3>${d.town === ADDR.suburb ? `<p>${esc(d.note)}</p><p style="font-weight:700">${esc(ADDR_LINE)}</p>` : `<p>A working depot rather than a public yard — machinery moving, and not set up for drop-ins. Ring and we will organise a time to look at a unit, or ask for photographs of the actual container before delivery.</p>`}</div></article>`).join("")}</div>`)}
${plate("One yard you can walk into", ADDR_LINE + " — ring first.")}
${band({ photo: "yard-cornubia", eyebrow: "The head yard", h: `${esc(ADDR.suburb)}, ${esc(ADDR.state)}`, p: [`${ADDR_LINE}. In the Logan corridor just off the M1, between Brisbane and the Gold Coast. Hardstand, room to walk around the units, and somebody there ${HOURS ? "" : "in business hours"} to open the doors for you.`, HOURS ? `Open ${HOURS}. Ring before you come so the units you want to look at are accessible rather than three deep behind something else.` : "Ring before you come so the units you want to look at are accessible."], cta: ["/contact/", "Get in touch"], wash: true })}
${sec("sec-dark", secHead("Where we deliver", "Every state and territory", "The depots are where the stock sits. These are the places we deliver to often enough to write something useful about.") + `<div class="locgrid">${LOCS.map((l) => `<a href="/${l.slug}/">${esc(l.name)}<span>${esc(l.state)} ${esc(l.postcode)}</span></a>`).join("")}</div>`)}
${sec("sec-wash", secHead("Common questions", "About our depots", null) + qaHtml(faqs))}
${ask("Which depot serves you?", `Give us the delivery address and we will tell you which yard the container comes out of and what that means for the timing. ${PROMISE}.`, "depots")}`;
  out("depots", shell({ t: `Where Our Containers Come From | ${BRAND}`, d: `Where ${BRAND} draws container stock from, why it decides your price and your timing, and which yard is likely to serve your address.`, c: "/depots/", schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
}

/* ================================= TAIL ================================= */
function assets() {
  const copyDir = (src, dest) => {
    if (!fs.existsSync(src)) return;
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src, { withFileTypes: true }).forEach((e) => {
      const s = path.join(src, e.name), d = path.join(dest, e.name);
      if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
    });
  };
  copyDir(path.join(__dirname, "static"), DIST);
  fs.mkdirSync(path.join(DIST, "img"), { recursive: true });
  fs.writeFileSync(path.join(DIST, "img", "favicon.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#0B0B08"/><rect x="8" y="19" width="48" height="26" fill="none" stroke="#FBDB59" stroke-width="4"/><path d="M18 23v18M25 23v18M32 23v18M39 23v18" stroke="#FBDB59" stroke-width="3.5" stroke-linecap="round"/><path d="M47 21v22" stroke="#FFFFFF" stroke-width="4"/></svg>`);
}

function tail() {
  const indexable = pages.filter((p) => p !== "/thank-you/" && p !== "/privacy/");
  const pri = (p) => (p === "/" ? "1.0" : /^\/(shipping-containers|10ft|20ft|40ft|general-purpose|high-cube|side-opening|dangerous-goods|delivery|shipping-container-hire|container-sales|contact)/.test(p) ? "0.9" : p.startsWith("/blog/") && p !== "/blog/" ? "0.6" : "0.7");
  const today = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(path.join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((p) => `<url><loc>${D}${p}</loc><lastmod>${today}</lastmod><priority>${pri(p)}</priority></url>`).join("\n")}\n</urlset>\n`);

  fs.writeFileSync(path.join(DIST, "robots.txt"),
    TEST ? `User-agent: *\nDisallow: /\n` : `User-agent: *\nAllow: /\nDisallow: /thank-you/\n\nSitemap: ${D}/sitemap.xml\n`);

  fs.writeFileSync(path.join(DIST, ".htaccess"), `Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
  RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
  RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

  # ---- LEGACY WORDPRESS URLS ------------------------------------------
  # The old site ran four near-identical pages per town: /gympie/,
  # /shipping-containers-for-sale-gympie/, /new-shipping-containers-gympie/
  # and /used-shipping-containers-gympie/. That is 35 pages competing with
  # each other for one intent — the doorway pattern, built internally rather
  # than across domains — and it split every ranking signal three ways.
  # James approved consolidation on 17/08/2026: one page per town, the three
  # variants 301 into it.
  #
  # These are PATTERN rules rather than a hand-listed table on purpose. A
  # legacy URL nobody recorded still lands somewhere sensible instead of
  # 404ing, which is the failure mode that actually loses rankings.
  RewriteRule ^(?:new|used)-shipping-containers-([a-z0-9-]+)/?$ /$1/ [R=301,L,NC]
  RewriteRule ^shipping-containers-for-sale-([a-z0-9-]+)/?$ /$1/ [R=301,L,NC]
  RewriteRule ^buy-shipping-containers-([a-z0-9-]+)/?$ /$1/ [R=301,L,NC]

  # Service pages the old site slugged differently. Locality slugs are
  # preserved 1:1 and are deliberately NOT in this list.
  RewriteRule ^contact-us/?$ /contact/ [R=301,L]
  RewriteRule ^our-story/?$ /about/ [R=301,L]
  RewriteRule ^our-services/?$ /shipping-containers/ [R=301,L]
  RewriteRule ^shipping-container-delivery/?$ /delivery/ [R=301,L]
  RewriteRule ^faqs-2/?$ /faqs/ [R=301,L]
  # Left over from an unrelated business. Not ours, never was.
  RewriteRule ^cardio-hire-terms/?$ / [R=301,L]
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
`);

  /* ---- build-time assertions. A build that compiles is not a build that is
     correct, so the things that have actually gone wrong on sibling sites are
     checked here rather than trusted. ---- */
  const failures = [];
  const html = {};
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f); else if (e.name.endsWith(".html")) html[f] = fs.readFileSync(f, "utf8");
  });
  walk(DIST);
  const files = Object.keys(html);

  const OTHER_BRANDS = /\b(fair dinkum|outback containers|sunstate containers|gympie shipping containers|bundaberg containers|dalby containers|kingaroy containers|lismore shipping containers|grafton container hire|budget shipping containers|dan's shipping containers|mackay shipping containers|container traders|tiger containers)\b/i;
  files.forEach((f) => { if (OTHER_BRANDS.test(html[f])) failures.push(`other brand name in ${path.relative(DIST, f)}`); });

  const BANNED = /(flood[\s-]?proof|flood[\s-]?safe|fire[\s-]?proof|before you pay|before you commit|before payment)/i;
  files.forEach((f) => { if (BANNED.test(html[f])) failures.push(`banned phrase in ${path.relative(DIST, f)}`); });

  files.forEach((f) => {
    const h1 = (html[f].match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) failures.push(`${h1} h1 tags in ${path.relative(DIST, f)}`);
  });

  const titles = {}, descs = {};
  files.forEach((f) => {
    const t = (html[f].match(/<title>([^<]*)<\/title>/) || [])[1];
    const d = (html[f].match(/<meta name="description" content="([^"]*)"/) || [])[1];
    if (!t) failures.push(`no title in ${path.relative(DIST, f)}`); else { titles[t] = (titles[t] || 0) + 1; }
    if (!d) failures.push(`no description in ${path.relative(DIST, f)}`); else { descs[d] = (descs[d] || 0) + 1; }
  });
  Object.keys(titles).filter((t) => titles[t] > 1).forEach((t) => failures.push(`duplicate title: ${t}`));
  Object.keys(descs).filter((d) => descs[d] > 1).forEach((d) => failures.push(`duplicate description: ${d.slice(0, 60)}…`));

  files.forEach((f) => {
    (html[f].match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || []).forEach((s) => {
      try { JSON.parse(s.replace(/^<script type="application\/ld\+json">/, "").replace(/<\/script>$/, "")); }
      catch (e) { failures.push(`bad JSON-LD in ${path.relative(DIST, f)}`); }
    });
  });

  files.forEach((f) => {
    if (!html[f].includes(`"brand":"${S.leadBrand}"`)) failures.push(`wrong or missing lead brand in ${path.relative(DIST, f)}`);
    if (!html[f].includes(S.phone)) failures.push(`phone missing from ${path.relative(DIST, f)}`);
  });

  /* streetAddress must be present and correct, or absent — never empty. */
  files.forEach((f) => { if (/"streetAddress":""/.test(html[f])) failures.push(`empty streetAddress in ${path.relative(DIST, f)}`); });

  /* Every FAQ question rendered must also be in the FAQPage schema. */
  files.forEach((f) => {
    const hasFaq = html[f].includes('"@type":"FAQPage"');
    const hasQa = html[f].includes('class="qa"');
    if (hasQa && !hasFaq) failures.push(`visible FAQs without FAQPage schema in ${path.relative(DIST, f)}`);
  });

  /* as-is caveat must be on home, the hub, every size page, buying and grades. */
  const needAsIs = ["index.html", "shipping-containers/index.html", "container-sales/index.html", "container-grades/index.html"].concat(P.sizes.map((x) => x.slug + "/index.html"));
  needAsIs.forEach((rel) => {
    const f = path.join(DIST, rel);
    if (!html[f] || !html[f].includes(P.asIsNote.slice(0, 60))) failures.push(`as-is caveat missing from /${rel.replace("index.html", "")}`);
  });
  /* …and must be absent from every locality page, which is the point of it. */
  LOCS.forEach((l) => {
    const f = path.join(DIST, l.slug, "index.html");
    if (html[f] && html[f].includes(P.asIsNote.slice(0, 60))) failures.push(`as-is caveat should not be on /${l.slug}/`);
  });

  /* No rotated-copy pair may share every slot. */
  const slots = [["uses", USES_HEADS], ["access", ACCESS_HEADS], ["near", NEAR_HEADS], ["open", OPENERS], ["proc", PROCESS_LINES], ["freight", FREIGHT_LINES], ["ask", ASK_LINES]];
  let worst = 0, worstPair = "";
  for (let i = 0; i < LOCS.length; i++) for (let j = i + 1; j < LOCS.length; j++) {
    /* Compare the strings actually rendered, not the ranks — pools are
       different lengths, so equal ranks do not imply equal copy. */
    const shared = slots.filter(([salt, pool]) => pick(pool, salt, LOCS[i].slug) === pick(pool, salt, LOCS[j].slug)).length;
    if (shared > worst) { worst = shared; worstPair = `${LOCS[i].slug}/${LOCS[j].slug}`; }
    if (shared >= slots.length - 2) failures.push(`localities ${LOCS[i].slug} and ${LOCS[j].slug} share ${shared}/${slots.length} rotated slots`);
  }

  /* Internal links must resolve. */
  const known = new Set(pages.map((p) => p.replace(/\/$/, "") || "/"));
  files.forEach((f) => {
    (html[f].match(/href="(\/[^"#?]*)"/g) || []).forEach((m) => {
      const href = m.slice(6, -1).replace(/\/$/, "") || "/";
      if (href.startsWith("/css/") || href.startsWith("/js/") || href.startsWith("/img/") || href === "/404.html" || href === "/sitemap.xml" || href === "/robots.txt") return;
      if (!known.has(href)) failures.push(`dead internal link ${href} in ${path.relative(DIST, f)}`);
    });
  });

  /* ---- LEGACY URL COVERAGE ------------------------------------------
     78 URLs were live on the WordPress site. Every one of them must land on
     a real page here, as a 200 or via a 301. A migration that silently drops
     a ranking URL looks exactly like a successful build, which is why this
     is an assertion and not a note in a document. The redirect rules above
     are re-implemented here in JS and applied to each legacy URL. */
  const LEGACY = require("./data/legacy-urls.json");
  const REDIRECTS = [
    [/^\/(?:new|used)-shipping-containers-([a-z0-9-]+)\/?$/, "/$1/"],
    [/^\/shipping-containers-for-sale-([a-z0-9-]+)\/?$/, "/$1/"],
    [/^\/buy-shipping-containers-([a-z0-9-]+)\/?$/, "/$1/"],
    [/^\/contact-us\/?$/, "/contact/"],
    [/^\/our-story\/?$/, "/about/"],
    [/^\/our-services\/?$/, "/shipping-containers/"],
    [/^\/shipping-container-delivery\/?$/, "/delivery/"],
    [/^\/faqs-2\/?$/, "/faqs/"],
    [/^\/cardio-hire-terms\/?$/, "/"]
  ];
  const resolveLegacy = (u) => {
    for (const [re, to] of REDIRECTS) if (re.test(u)) return u.replace(re, to);
    return u;
  };
  const built = new Set(pages.map((x) => x.replace(/\/$/, "") || "/"));
  const legacyMisses = [];
  LEGACY.urls.forEach((u) => {
    const dest = resolveLegacy(u).replace(/\/$/, "") || "/";
    if (!built.has(dest)) legacyMisses.push(`${u} -> ${dest || "/"} (no such page)`);
  });
  legacyMisses.forEach((m) => failures.push(`legacy URL would 404: ${m}`));

  const missingPhotos = [];
  ["hero-home", "yard-forest-hill", "head-range"].forEach((n) => { if (!havePhoto(n)) missingPhotos.push(n); });

  console.log(`\n  ${BRAND}`);
  console.log(`  Built ${pages.length} pages + 404.html${TEST ? "  (TEST_BUILD — noindex)" : ""}`);
  console.log(`  ${LOCS.length} localities · ${P.sizes.length} sizes · ${P.types.length} types · ${POSTS.length} guides`);
  console.log(`  Photos: ${F.PHOTO_USED.size} rendered${missingPhotos.length ? `, placeholders in use (library not yet loaded)` : ""}`);
  console.log(`  Worst rotated-copy overlap between any locality pair: ${worst}/${slots.length} slots (${worstPair})`);
  console.log(`  Legacy URLs: ${LEGACY.urls.length} checked, ${legacyMisses.length} would 404`);
  if (failures.length) {
    console.error(`\n  ✗ ${failures.length} CHECK FAILURE(S):`);
    [...new Set(failures)].slice(0, 40).forEach((x) => console.error("    - " + x));
    process.exitCode = 1;
  } else {
    console.log(`  ✓ All build checks passed\n`);
  }
}

localityPages();
deliveryAreas();
delivery();
hire();
sales();
storage();
grades();
inspection();
dimensions();
howItWorks();
about();
faqsPage();
guides();
contact();
conditionPages();
modifications();
depots();
utility();
assets();
tail();
