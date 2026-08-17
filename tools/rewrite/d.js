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
