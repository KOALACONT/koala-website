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
