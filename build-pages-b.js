/* ============================================================================
   Koala Containers — page builders, part three.
   Required by build-pages.js after the first block of pages has been written.
   Shares its helpers through global.__FD, exactly like part two.
   ========================================================================= */
const F = global.__FD;
const { fs, path, S, LOCS, P, POSTS, DIST, TEST, D, pages, BRAND, SHORT, HOURS, SERVICE_AREA,
  PROMISE, PROMISE_DETAIL, ADDR, ADDR_LINE, esc, aud, auDate, para, paras, out, IMG, IMGP, havePhoto,
  crumbsLd, faqLd, g, shell, crumbHtml, sec, secHead, qaHtml, typeChips, band, asIs, locCaveat,
  rangeGrid, gallery, rank, pick, PRICES, PRICE_DISCLAIMER, PRICE_SUB, USES_HEADS, ACCESS_HEADS, NEAR_HEADS, OPENERS,
  PROCESS_LINES, FREIGHT_LINES, ASK_LINES, ask, promiseStrip,
  plate, depotStrip, videoBlock, specTable, priceBox, productLd, reviewLine, SHOW_REVIEWS, REV } = F;

const HOME_CRUMB = ["Home", "/"];
const pageHead = F.pageHead;

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

${sec("", secHead("Reading a fault", "What it means and how much it should bother you", null) + `<div class="reveal tablewrap"><table class="spectable"><caption>Common findings on used containers</caption>
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
    "40ft-shipping-containers": ["Twelve metres of container and, more to the point, a truck that is longer again. This is the size where access stops being a formality: the vehicle needs somewhere to line up straight, room to lay the unit down and space to pull clear afterwards, and a suburban cul-de-sac rarely has all three.", "The trade-off worth thinking about is two 20fts against one 40ft. Two shorter units cost more in total, need two deliveries and take more ground once you leave room to walk between them, but they will get into sites a 40ft cannot reach, they can sit in two different places, and they can be sold separately later. Where the run of clear ground exists, a single 40ft is often the cheaper way to buy volume on current quotes — it depends on the grade, the units in the yard and the delivery run, so get both figures."]
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
    lede: "Every figure in one place — internal and external, door openings, cubic capacity and tare — along with the part a table cannot tell you: how much room the truck needs, how much ground the unit takes once it is standing, and which measurement catches people out. Figures are ISO standard values and approximate; if something has to fit to the millimetre, measure the actual unit.",
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
<div class="tablewrap"><table class="spectable"><caption>High cube dimensions and weights — ISO standard figures, approximate</caption>
<thead><tr><th scope="col">Size</th><th scope="col">External L × W × H</th><th scope="col">Internal L × W × H</th><th scope="col">Door W × H</th><th scope="col">Capacity</th><th scope="col">Tare</th></tr></thead>
<tbody>${HC.map((r) => `<tr><th scope="row">${esc(r.n)}</th><td>${esc(r.ext)}</td><td>${esc(r.int)}</td><td>${esc(r.door)}</td><td>${esc(r.cube)}</td><td>${esc(r.tare)}</td></tr>`).join("")}</tbody></table></div>
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
        { q: "How do I know whether to get a 20ft or a 40ft?", a: "Measure the ground before you measure the load. A 20ft wants roughly seven metres of level clear space to sit on and a straight approach to reach it. A 40ft often costs only a little more than a 20ft for about twice the room on current quotes, but it takes a great deal more space to place — think about where the truck has to stop, not only where the box ends up. On a tight block, two 20fts dropped in separate spots often beat one 40ft that will not fit anywhere useful." },
        { q: "Is a high cube worth the extra?", a: "If anything is going on the walls, over your head or up on a mezzanine, yes. A high cube stands a foot taller — 2.9m against 2.59m on the outside — and that foot is what lets you line and insulate the inside and still walk about upright. For plain pallet and gear storage, standard height is usually the sensible buy and the cheaper one." },
        { q: "Should I buy or hire?", a: "Hire suits a job with an end date on it: a build, a renovation, a season, a shutdown. Buying suits anything open-ended, because somewhere past a year or two of continuous hire the arithmetic stops favouring hire — and you will be told that rather than left on a billing cycle." },
        { q: "How much actually fits in one?", a: "About ten Australian standard pallets on the floor of a 20ft and roughly twenty-one in a 40ft, single stacked. In household terms a 20ft takes a typical three-bedroom house at a squeeze and a 40ft takes it without argument. Describe what is going in and which size you need usually answers itself." }
      ]
    },
    {
      h: "Condition, grade and what those words mean", faqs: [
        { q: "What do the grades actually mean?", a: "New, or single-trip, has made one loaded voyage and looks close to factory. Cargo-worthy is a used unit with a sound structure, sealing doors and a solid floor, inspected wind and watertight for storage use — and cosmetically whatever a decade of weather and paint has left behind. Current CSC certification for shipping is a separate check on the specific unit. As-is is sold on its faults: it might have a hole, a soft patch of floor or doors that need persuading, and the price reflects exactly that." },
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
${sec("", `<div class="narrow article reveal">${p.body.replace(/<table>/g, '<div class="tablewrap"><table>').replace(/<\/table>/g, "</table></div>")}</div>`)}
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
    lede: `Give us the postcode, what is going in it and what the truck has to get past. That is normally enough for a firm number, and it comes back from a person rather than an autoresponder.`,
    facts: [["Call", S.phone], ["Email", S.email], ["Head yard", ADDR_LINE]].concat(HOURS ? [["Open", HOURS]] : [])
  })}
${sec("", `<div class="spec">
  <div id="quote">${F.quoteForm("-contact")}</div>
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
  <h2>Cookies and advertising measurement</h2><p>We advertise on Google, and the site carries Google's advertising tag so we can see which ads actually produce an enquiry, a phone call or an email. It sets cookies in your browser for that purpose, and it is the only third-party tag on the site. What gets counted is the action — an enquiry was sent, the phone number was tapped — never what you typed. Your name, phone number, email address, message and delivery address are sent to us and to nobody else; they are not passed to Google or to any other advertising system. We also keep the campaign labels from your visit in this browser tab for up to 30 minutes so an enquiry can retain its source as you browse. This tab storage contains campaign labels and an advertising click identifier when supplied, not your enquiry details. It is sent to our enquiry system with your form. The site runs no analytics, remarketing or social pixels. Blocking cookies for this site in your browser stops the measurement and does not affect anything you came here to do.</p>
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
const COND_GRADE = { "new-shipping-containers": "new", "used-shipping-containers": "cargo-worthy", "refurbished-shipping-containers": "cargo-worthy" };
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
${ask("Get a price", `Tell us the size, where it is going and what is going in it.`, x.slug, { grade: COND_GRADE[x.slug] || "unsure" })}`;
    out(x.slug, shell({ t: `${x.title} For Sale | ${BRAND}`, d: x.metaDesc, c: `/${x.slug}/`, schema: g(crumbsLd(crumbs), faqLd(faqs)) }, body));
  });
}

/* ====================== MODIFICATIONS (NEW) ============================= */
function modifications() {
  const crumbs = [HOME_CRUMB, ["Modifications", "/container-modifications/"]];
  const M = P.mods || [];
  const faqs = [
    { q: "Can you modify a container before it is delivered?", a: "Yes, and it is nearly always cheaper and better done that way. Cutting a door or a window into a container standing in a yard with power, hardstand and the right gear is a different job from doing it on a suburban block with a generator. Tell us what the container has to do at the enquiry rather than after it has landed." },
    { q: "Does cutting into a container weaken it?", a: "It can, and that is exactly why the framing matters. A corrugated steel wall is structural, so any opening cut into one has to be reframed with steel to carry the load the panel was carrying. Done properly the unit still moves on the same trucks. Whether a modified container can still be stacked or lifted loaded depends on what was cut and how it was reframed, and it needs a competent assessment of that unit rather than an assumption. Done badly it racks, and the doors are the first thing to tell you." },
    { q: "Can a modified container still be moved later?", a: "Usually yes, provided the corner castings are untouched and the frame is intact — those are what the truck and the crane pick up on — but treat it as something to confirm for the specific unit and the specific modification rather than a given. Where it gets awkward is a container that has been built into a deck, a slab or a structure at the site end. If you think the unit may move again, say so before the modification is designed." },
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

  const CANONICAL_CASE = pages
    .map((p) => p.replace(/^\/|\/$/g, ""))
    .filter(Boolean)
    .map((slug) => `  RewriteCond %{REQUEST_URI} !^/${slug}/$\n  RewriteRule ^${slug}/?$ /${slug}/ [R=301,L,NC]`)
    .join("\n");

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

  # 14/09/2026 — short URLs people type or that old CTAs pointed at.
  # /hire was a live 404 (James's brief). Nothing here goes to the home
  # page; every rule lands on the page that answers the intent.
  RewriteRule ^hire/?$ /shipping-container-hire/ [R=301,L,NC]
  RewriteRule ^container-hire/?$ /shipping-container-hire/ [R=301,L,NC]
  RewriteRule ^shipping-container-hire-([a-z0-9-]+)/?$ /$1/ [R=301,L,NC]
  RewriteRule ^(?:sales|buy|containers-for-sale|shipping-containers-for-sale)/?$ /container-sales/ [R=301,L,NC]
  RewriteRule ^(?:containers|products?|our-containers|shop)/?$ /shipping-containers/ [R=301,L,NC]
  RewriteRule ^(?:about-us|about-koala-containers)/?$ /about/ [R=301,L,NC]
  RewriteRule ^(?:faq|frequently-asked-questions)/?$ /faqs/ [R=301,L,NC]
  RewriteRule ^(?:delivery-area|areas-we-service|service-areas?|locations?)/?$ /delivery-areas/ [R=301,L,NC]
  RewriteRule ^(?:privacy-policy|privacy-statement)/?$ /privacy/ [R=301,L,NC]
  RewriteRule ^(?:modifications|container-modification|custom-containers)/?$ /container-modifications/ [R=301,L,NC]
  RewriteRule ^(?:storage|container-storage-solutions|self-storage)/?$ /container-storage/ [R=301,L,NC]
  RewriteRule ^(?:news|articles|guides)/?$ /blog/ [R=301,L,NC]
  RewriteRule ^blog/page/\\d+/?$ /blog/ [R=301,L,NC]
  # WordPress dated posts, categories, tags and author archives -> guides hub
  RewriteRule ^\\d{4}/\\d{2}(?:/\\d{2})?(?:/[a-z0-9-]+)?/?$ /blog/ [R=301,L]
  RewriteRule ^(?:category|tag|author)/[a-z0-9-]+/?$ /blog/ [R=301,L,NC]
  # Old product pages under a shop prefix -> the matching size or the range hub
  RewriteRule ^product/([a-z0-9-]*10ft[a-z0-9-]*)/?$ /10ft-shipping-containers/ [R=301,L,NC]
  RewriteRule ^product/([a-z0-9-]*20ft[a-z0-9-]*)/?$ /20ft-shipping-containers/ [R=301,L,NC]
  RewriteRule ^product/([a-z0-9-]*40ft[a-z0-9-]*)/?$ /40ft-shipping-containers/ [R=301,L,NC]
  RewriteRule ^product/[a-z0-9-]+/?$ /shipping-containers/ [R=301,L,NC]

  # Canonical case and trailing slash. The filesystem is case sensitive, so
  # /Jimboomba 404s while /jimboomba/ is a real page — and capitalised URLs
  # turn up constantly in ad destinations, printed material and typed guesses.
  # mod_rewrite cannot lowercase a string without a RewriteMap (server config,
  # not available in .htaccess), so the rules are generated one per page from
  # the build's own page list. The RewriteCond stops the already-correct URL
  # matching its own rule, which would loop.
${CANONICAL_CASE}
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
    [/^\/cardio-hire-terms\/?$/, "/"],
    [/^\/hire\/?$/i, "/shipping-container-hire/"],
    [/^\/container-hire\/?$/i, "/shipping-container-hire/"],
    [/^\/shipping-container-hire-([a-z0-9-]+)\/?$/i, "/$1/"],
    [/^\/(?:sales|buy|containers-for-sale|shipping-containers-for-sale)\/?$/i, "/container-sales/"],
    [/^\/(?:containers|products?|our-containers|shop)\/?$/i, "/shipping-containers/"],
    [/^\/(?:about-us|about-koala-containers)\/?$/i, "/about/"],
    [/^\/(?:faq|frequently-asked-questions)\/?$/i, "/faqs/"],
    [/^\/(?:delivery-area|areas-we-service|service-areas?|locations?)\/?$/i, "/delivery-areas/"],
    [/^\/(?:privacy-policy|privacy-statement)\/?$/i, "/privacy/"],
    [/^\/(?:modifications|container-modification|custom-containers)\/?$/i, "/container-modifications/"],
    [/^\/(?:storage|container-storage-solutions|self-storage)\/?$/i, "/container-storage/"],
    [/^\/(?:news|articles|guides)\/?$/i, "/blog/"],
    [/^\/blog\/page\/\d+\/?$/i, "/blog/"],
    [/^\/\d{4}\/\d{2}(?:\/\d{2})?(?:\/[a-z0-9-]+)?\/?$/, "/blog/"],
    [/^\/(?:category|tag|author)\/[a-z0-9-]+\/?$/i, "/blog/"],
    [/^\/product\/[a-z0-9-]*10ft[a-z0-9-]*\/?$/i, "/10ft-shipping-containers/"],
    [/^\/product\/[a-z0-9-]*20ft[a-z0-9-]*\/?$/i, "/20ft-shipping-containers/"],
    [/^\/product\/[a-z0-9-]*40ft[a-z0-9-]*\/?$/i, "/40ft-shipping-containers/"],
    [/^\/product\/[a-z0-9-]+\/?$/i, "/shipping-containers/"]
  ];
  const resolveLegacy = (u) => {
    for (const [re, to] of REDIRECTS) if (re.test(u)) return u.replace(re, to);
    /* mirrors the generated canonical-case block in .htaccess above */
    if (/[A-Z]/.test(u)) return u.toLowerCase();
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

