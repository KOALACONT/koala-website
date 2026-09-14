/* Guides for Koala Containers. Each entry: slug, title, desc,
   date (ISO, rendered DD/MM/YYYY), mins, intro, body (HTML fragment).
   Body must never contain <h1> — the page template owns the single H1. */
module.exports = [
  {
    slug: "what-a-shipping-container-costs",
    title: "What a shipping container costs in Australia — and what moves the number",
    desc: "The five things that set the price of a shipping container in Australia: grade, size, which depot it sits in, how it reaches you and what the market is doing.",
    date: "2026-08-17",
    mins: 10,
    intro: "Ask what a container costs and the honest first answer is another question. Not because anybody is being cagey, but because the same box can carry two quite different numbers depending on its condition, which yard it is standing in and how far it has to travel to reach you. Once you know the five inputs, the number stops being a mystery and starts being something you can predict.",
    body: `
<h2>Five inputs, in the order they matter</h2>
<p>Every container quote in this country is built from the same short list. Learn the list and you can work out roughly where a price should land before anyone rings you back.</p>
<ol>
<li><strong>Condition.</strong> Whether the unit is new, a sound used unit, or one being sold on its faults.</li>
<li><strong>Size and configuration.</strong> Length, height, and whether it has anything other than a plain pair of doors on one end.</li>
<li><strong>Where the unit already is.</strong> Which depot it is standing in relative to you.</li>
<li><strong>Cartage.</strong> How it gets from that depot onto your ground, and what the site demands of the truck.</li>
<li><strong>The market that week.</strong> Box availability moves, and it moves for reasons that have nothing to do with you.</li>
</ol>
<p>The first two you control. The third we can often work around, because stock sits at Cornubia and at depots through Gympie, Rockhampton, Mackay, Townsville, Cairns, Grafton, Darwin and Fremantle. The fifth is weather, and you ride it.</p>

<h2>Condition is the biggest single lever</h2>
<p>People assume length sets the price. It contributes, but condition swings the number harder. A one-trip unit that has made a single loaded voyage, still wearing factory paint, sits at the top. A sound used unit inspected wind and watertight for storage — cargo-worthy — sits in the middle and is what most buyers should be looking at. A retired unit sold on its faults sits well below both.</p>
<p>What separates them is remaining life, not steel. The cheapest grade is cheap precisely because somebody has decided it has finished the job it was built for. That is fine for a scrap store, a bund, a shell you intend to cut up, or gear that already lives out in the weather. It is not fine for anything that has to stay dry — units sold as-is are not sold watertight, and a pinhole in a roof will drip onto the same square metre of floor for years before anyone notices. Anything sold as cargo-worthy or new leaves the yard having been checked wind and watertight. The <a href="/container-grades/">grades page</a> sets out where each condition sits and what it is safe for.</p>
<p>If money is tight, the better trade is almost always to drop a size rather than drop a grade. A smaller unit that stays dry is worth more to you than a bigger one that does not.</p>

<h2>Size, and the price per cubic metre trap</h2>
<p>Bigger boxes cost more in absolute terms and less per cubic metre. That is because the expensive components — doors, castings, handling, yard space, paperwork — do not scale with length. So on paper the biggest unit always looks like the smartest buy.</p>
<p>Two things spoil that logic. The first is that volume you cannot use is not worth paying for; with a single door end on a long unit, whatever sits at the far end can only be reached by clearing the front. The second is that the bigger the unit, the fewer sites take it and the fewer trucks can place it, which shows up in cartage and again on the day you want to sell it. Current pricing size by size sits on the <a href="/10ft-shipping-containers/">10ft</a>, <a href="/20ft-shipping-containers/">20ft</a> and <a href="/40ft-shipping-containers/">40ft</a> pages.</p>
<p>Height is the cheap upgrade people miss. A <a href="/high-cube-shipping-containers/">high cube</a> buys you another 300 mm inside, for a small premium and no change to the ground footprint. If you are ever going to line, rack or fit out the unit, that 300 mm is the difference between a workable ceiling and a low one.</p>
<p>Configuration costs more than most people expect. A <a href="/side-opening-shipping-containers/">side opening unit</a> carries a great deal more door hardware, more framing and far more manufacturing complexity than a plain box, and the price reflects it. Same for double-door units and for <a href="/dangerous-goods-shipping-containers/">dangerous goods containers</a>, which are built to a different standard entirely.</p>

<h2>Where the unit is standing</h2>
<p>A container is a large object and moving it is a real exercise, so the depot it happens to be sitting in when you order matters to the total. Two identical units, same grade, same size, can land at different totals purely because one was three hundred kilometres closer to your gate.</p>
<p>This is the whole reason we hold stock in more than one place. If you are in Far North Queensland, a unit already sitting at Cairns beats an identical one at Cornubia every time. If you are in the Northern Territory, Darwin is the sensible source. In the west it is Fremantle. When you ring, say where the container is going before you say what you want, because that decides which yard we are pricing from.</p>
<p>It is also why the answer is sometimes "we can do better next week". Stock rotates, and a unit already heading to a depot near you changes the maths.</p>

<h2>Cartage — what drives it, without a number attached</h2>
<p>We do not publish cartage figures, and any supplier who does is quoting an average that will not be your job. Cartage is quoted with the container once we know the address and the site. What is worth understanding is what pushes it up and down, because several of those things are within your control.</p>
<ul>
<li><strong>Distance from the sourcing depot.</strong> The largest factor, and the reason the depot network exists.</li>
<li><strong>Which truck the site demands.</strong> A tilt-tray is the cheapest way to put a container on the ground. A side loader or a crane truck costs more to run and is sometimes the only option. Access decides this, not preference.</li>
<li><strong>Whether it can ride on a shared run.</strong> A unit that fits alongside other work heading the same direction is a different proposition to a truck sent out for you alone.</li>
<li><strong>Time on site.</strong> A placement that takes fifteen minutes and one that takes ninety are not the same job. Clear the route and mark the spot.</li>
<li><strong>Return trips.</strong> The genuinely expensive outcome is a truck that arrives, cannot place, and leaves loaded. That is avoidable with three photographs and a phone call.</li>
<li><strong>Road conditions.</strong> Unsealed access, wet-season closures, one-lane causeways and low bridges all change the plan.</li>
</ul>
<p>The <a href="/delivery/">delivery page</a> covers what each truck needs. Give us the address, the access and what the ground is like, and the cartage comes back as a firm figure alongside the container price rather than as a surprise later.</p>

<h2>What the market does to the price</h2>
<p>Container prices in Australia move, sometimes noticeably, and the drivers sit well offshore.</p>
<p>New box prices track steel and the cost of building them, then ride here on ships whose rates rise and fall with demand. Used box availability depends on trade imbalance: this country imports far more in containers than it exports in them, so boxes accumulate here and shipping lines eventually sell them off rather than repositioning them empty. When sea freight rates spike, lines would rather ship those empties back to fill them, and local supply tightens. The exchange rate sits underneath the lot.</p>
<p>Practically, quotes have a shelf life, and the unit you were shown last month may not be there this month. If the price suits and the unit suits, that is the moment.</p>

<h2>What should be in the quote</h2>
<p>A quote you can actually compare has all of these in it. If one is missing, ask.</p>
<ul>
<li>The grade, stated plainly, not a marketing word invented to sit between two grades.</li>
<li>The size, height and door configuration.</li>
<li>Whether the figure is ex GST or including it.</li>
<li>Cartage to your actual address, and which truck is coming.</li>
<li>What happens if the truck cannot place on the day.</li>
<li>Whether photographs of the specific unit are available — ours are, on request and before delivery.</li>
</ul>
<p>Where quotes differ wildly, grade is nearly always the reason. The next most common is that one has cartage in it and the other has not.</p>

<h2>The false economies</h2>
<p>Three ways people spend more by trying to spend less.</p>
<p><strong>Buying below the grade the job needs.</strong> Replacing damp-ruined stock, tools or documents costs more than the gap between two grades ever did.</p>
<p><strong>Skipping the ground preparation.</strong> Four pads under the corner castings is an afternoon's work. A container that settles out of square stops closing properly, and re-levelling a loaded unit is not a job you do with a shovel.</p>
<p><strong>Buying long when the site is short.</strong> If the unit has to be craned in because a shorter one would have driven in, the saving on the box goes on the lift.</p>

<h2>Buying, or hiring, or neither yet</h2>
<p>If the need finishes on a known date — a build, a season, a relocation, a renovation — <a href="/shipping-container-hire/">hire</a> keeps the money out of the asset and hands the disposal problem back to us. If the need has no end date, buying wins on any timeline long enough to matter.</p>
<p>Either way the fastest route to a real number is a phone call with three facts ready: what is going in it, where it is going, and what the access looks like. Ring <strong>1300 467 776</strong>, or send the details through the <a href="/contact/">contact page</a> and you will hear back from a person within one business day.</p>
`
  },
  {
    slug: "shipping-container-council-approval",
    title: "Do you need council approval for a shipping container?",
    desc: "When a container on your block is likely to need council approval and when it is not, what councils actually assess, and how to ask yours for a usable answer.",
    date: "2026-08-16",
    mins: 9,
    intro: "This is the question that stalls more container purchases than price does, and the internet answers it badly — usually with somebody's experience in one shire being presented as national law. There is no single rule. There are, however, patterns that hold almost everywhere, and a short conversation with your own council that settles it properly.",
    body: `
<h2>Start here: there is no Australian rule</h2>
<p>Planning and building controls in this country are set by state legislation and administered locally. That means the answer is decided by your council, under your state's planning scheme, for your particular parcel of land and its zoning. A neighbour two streets away in the same suburb usually gets the same answer as you. Somebody in another state does not, and neither does a stranger on a forum.</p>
<p>So treat everything below as the shape of the question rather than the answer to it. The answer comes from your council, and getting it costs a phone call.</p>

<h2>The thing councils are actually assessing</h2>
<p>Councils are not sitting in judgement on shipping containers as objects. They are assessing three separate things, and a container can trip any one of them independently.</p>
<h3>1. Is it a structure or is it a chattel?</h3>
<p>A container that is set down, kept as storage and could be picked up again tomorrow is closer to a large toolbox than to a building. Once it is fixed to the ground, connected to services, joined to another structure or built into something, it starts looking like a building, and building rules follow.</p>
<h3>2. What is it being used for?</h3>
<p>Storage is the easy case nearly everywhere. Habitation is not. The moment a container becomes somewhere people sleep, or somewhere the public is served, it is assessed as a habitable or commercial building, with everything that implies: fire separation, egress, ventilation, insulation, sanitary facilities, structural certification and the rest. That is a genuine approval process, not a form.</p>
<h3>3. What does it look like from the street?</h3>
<p>A great many container conditions are really amenity conditions in disguise. Councils care about what is visible from a public road and from neighbours, particularly in residential zones and in newer estates with design controls. Behind the building line, screened, and painted a colour that is not a shipping line's brand tends to draw no attention at all.</p>

<h2>Patterns that hold in most places</h2>
<p>These are tendencies, not permissions. Each one still has to be checked against your own local scheme.</p>
<ul>
<li><strong>Rural and industrial land is the easy end.</strong> On a working farm or in an industrial zone, containers used for storage are ordinary and usually attract little interest, sometimes subject to setbacks and total-floor-area limits.</li>
<li><strong>Residential zones are where conditions live.</strong> Common themes: keep it behind the front building line, keep it out of setbacks and easements, limit how many, limit how long, and screen it from the street.</li>
<li><strong>Temporary is treated differently to permanent.</strong> Many schemes have a pathway for a container during construction, a renovation or a genuine short-term need, often time-limited and often tied to an active building approval.</li>
<li><strong>Size matters, and so does how many.</strong> Schemes frequently work in total outbuilding floor area rather than counting sheds and containers separately. A container can push you over a limit you did not know you had.</li>
<li><strong>Fixing it down changes its status.</strong> Bolting, footings, slabs, decks, connections to power or water — each of these moves a container closer to being a building in the eyes of the scheme.</li>
<li><strong>Overlays override the general rule.</strong> Flood, bushfire, heritage, character, coastal, environmental and acid sulfate overlays all bring their own requirements and they are the reason two blocks in the same street can get different answers.</li>
</ul>

<h2>The controls that are not council at all</h2>
<p>Half the "council said no" stories we hear are not council at all. Check these too, because they bind you regardless of what the planning scheme allows.</p>
<p><strong>Covenants and estate design guidelines.</strong> New estates routinely register covenants on title restricting outbuildings, materials, colours and what may be visible from the road. These are private contractual restrictions and they are enforceable by the developer or the body corporate. Read your title documents.</p>
<p><strong>Body corporate and community title by-laws.</strong> On strata, community title or a shared driveway, the by-laws decide, and they are usually stricter than the council.</p>
<p><strong>Leases.</strong> If you are renting the land, commercially or otherwise, the lease governs what you can place on it and who removes it at the end.</p>
<p><strong>Easements and services.</strong> A container placed over a sewer, stormwater or utility easement is a problem for the authority whose asset it is, not for the planner. That one is worth checking on your survey plan before anything is ordered.</p>

<h2>How to ask your council so you get a usable answer</h2>
<p>Ring the duty planner. Nearly every council runs one, and the call is free. What you want is not permission over the phone — it is a clear statement of which pathway you are on. Have this ready:</p>
<ol>
<li>The property address and, if you have it, the lot and plan number.</li>
<li>The zoning, and any overlays that apply. The council's own mapping tool will tell you both.</li>
<li>The size of the container, the height, and how many.</li>
<li>Exactly where it will sit — distance from each boundary, distance from the front building line, and what is visible from the street.</li>
<li>What it will be used for, said plainly. Storage is storage. Do not describe a bedroom as storage.</li>
<li>Whether it will be fixed down, connected to services, or joined to anything else.</li>
<li>How long it is staying.</li>
</ol>
<p>Then ask three questions: does this need approval, which approval, and can I have that in writing or by email. Note the officer's name and the date. An email that says no approval required for the use you described is worth having in the file for the next ten years.</p>

<h2>What triggers a complaint, and what avoids one</h2>
<p>Most container enforcement starts with a neighbour, not an inspection. Which means the practical protection is not legal, it is social and visual.</p>
<ul>
<li>Put it behind the house or behind a fence line where you reasonably can.</li>
<li>Paint it. A single sensible colour reads as an outbuilding. Faded logos and rust read as a dumped box.</li>
<li>Keep the surrounds tidy. A container with a mown perimeter is invisible. A container with a stack of pallets and a dead mower beside it is a complaint waiting to be typed.</li>
<li>Tell the neighbours before it arrives, particularly the one whose kitchen window looks at it. This is the single most effective step on the list.</li>
<li>Keep the doors away from the boundary so you are not swinging steel over a fence.</li>
</ul>

<h2>If you are living in it, treat it as a building</h2>
<p>Container homes, granny flats, tiny houses and short-stay accommodation are all building work. They need design, they need certification, and they need to satisfy the National Construction Code like any other dwelling. The container is the cladding and part of the structure; it does not exempt the project from anything.</p>
<p>The same is true of anything the public enters: a shop, a kiosk, a clubroom, a office where staff work daily. Get a building certifier or a designer involved before you buy the unit, because their advice will change which unit you should buy. Cutting into straight, unmarked steel is far easier than cutting into a used box, which is why fit-outs usually start with a new one-trip unit.</p>

<h2>Buy the right unit for the approval you are on</h2>
<p>Two practical notes once you know your pathway. If the container has to be movable to satisfy the council, keep it movable — sitting on pads at the corner castings, not bolted into footings, and reachable by a truck. If it is going to be permanent and visible, spend on appearance up front rather than fighting about it later.</p>
<p>We can tell you what other people in your situation have done, and we will not tell you what your council will decide, because we do not know and neither does anyone else selling containers. Ring <strong>1300 467 776</strong> and we will help you get the unit right once you have the answer. The <a href="/how-it-works/">how it works page</a> covers the rest of the process, and the <a href="/faqs/">FAQs</a> answer the questions that come up next.</p>
`
  },
  {
    slug: "moving-a-shipping-container",
    title: "Moving a shipping container you already own",
    desc: "Relocating a shipping container: which truck suits, why it has to be empty, how the lifting points work and the checks that decide whether it can travel at all.",
    date: "2026-08-15",
    mins: 9,
    intro: "Sooner or later the container has to move. A shed is going in where it stands, the block is being sold, the business is relocating, or the thing simply ended up in the wrong corner of the yard six years ago and everyone has been walking around it since. Moving one is straightforward work, but it turns on a handful of details that are much easier to sort out before a truck is booked.",
    body: `
<h2>First question: can it still be lifted?</h2>
<p>A container is designed to be picked up by its eight corner castings and by nothing else. Those castings and the rails they are welded into carry the whole load during a lift. If the corners are sound, the box travels. If they are not, it may be perfectly safe standing where it is and still not safe to hoist.</p>
<p>Before anything else, go and look at the four bottom castings and the four top ones. You are checking for cracked steel around the openings, for a casting that has been rewelded, and for corrosion at the joint where the casting meets the rails. Then run your eye along the bottom rails. Rot-through along a bottom rail is common on older units, because that is where water, dirt and grass sit for years, and a bottom rail that has gone soft is a real limitation on lifting.</p>
<p>A unit that has been sitting on soft ground with one corner dug in is worth extra attention. Take a photo of each corner and send them through with your enquiry. It is far better to find the problem in a photograph than to find it with a crane hooked on.</p>

<h2>Second question: is it stuck to the ground?</h2>
<p>Containers that have stood for years develop attachments nobody planned. Work through this list on foot before you book anything.</p>
<ul>
<li><strong>Sunk corners.</strong> If castings have settled into soil or sand, the unit has to be broken free and the truck needs a plan for lifting from a hole.</li>
<li><strong>Vegetation.</strong> Lantana, blackberry, wattle regrowth, a tree that was a seedling when the box arrived. Clear it, and clear the swing path as well.</li>
<li><strong>Additions.</strong> Awnings, lean-tos, roofs run off the top rail, decking, a carport post tucked against the side. All of it has to come off, and all of it takes longer than you think.</li>
<li><strong>Services.</strong> Power leads, water lines, a solar panel on the roof, an aerial, a security camera. Disconnect properly.</li>
<li><strong>Concrete.</strong> If somebody has poured a slab hard up against the rails, or worse, poured around the castings, that is a jackhammer job before it is a truck job.</li>
<li><strong>Neighbouring structures.</strong> A container built into a shed complex may not have clear air above it any more.</li>
</ul>

<h2>Third question: does it have to be empty?</h2>
<p>Usually, yes, and almost always it should be.</p>
<p>A 20ft with nothing in it weighs a shade over two tonne. The same unit packed with household goods can be five or six, and packed with anything dense — pavers, tiles, steel, tooling, feed — can be a great deal more. That extra weight changes which truck can handle it, how far a crane can reach with it, whether the ground on either end will carry the vehicle, and whether the whole thing is legal on the road.</p>
<p>There is a structural reason too. A container's floor and frame are designed for load that sits still and is spread evenly. A stack of gear at one end, unsecured, becomes a moving load the moment the unit is tilted or swung, and that is how floors get punched and doors get sprung.</p>
<p>Where a partly loaded move is possible, it has to be planned for: known weight, evenly distributed, strapped down, nothing loose. Tell us what is in it and roughly what it weighs. Guessing low here is the single most common reason a relocation fails on the day.</p>

<h2>Which truck moves it</h2>
<h3>Tilt-tray</h3>
<p>The everyday answer for a 10ft or a 20ft where both ends of the job have room. The bed tilts, the container is winched on, and it comes off the same way at the far end. It is the cheapest method to run and the most widely available. What it needs is a straight, level run behind the unit at pick-up and again at drop-off, plus ground that will carry a loaded truck without rutting.</p>
<h3>Side loader</h3>
<p>A trailer with hydraulic lifting arms that picks the unit off the ground beside it and sets it on its own deck. It needs no run-in at all, which solves plenty of tight sites, but most of them work off the driver's side only, which means the truck generally has to sit with that flank presented to the container at each end of the job — the carrier confirms it for the trailer actually sent. It handles 40fts as a matter of routine and some can stack.</p>
<h3>Crane truck</h3>
<p>A knuckle-boom crane behind the cab, lifting the unit up and over whatever is in the way. This is what solves the jobs that look impossible: a container in a back yard with a house in front of it, a unit hemmed in by sheds, a courtyard, a steep drive. The trade-off is reach — lifting capacity falls away sharply the further the boom extends, so the distance from where the truck can stand to where the container sits often decides the whole job.</p>
<h3>Mobile crane and a flat-bed</h3>
<p>For the genuinely awkward ones: long reach over a building, two-storey lifts, or a 40ft out of a confined industrial site. It is the most expensive option and sometimes the only one. Where a lift crosses a road or a footpath, a traffic permit may be needed, which takes lead time.</p>

<h2>Both ends of the job, not one</h2>
<p>The mistake people make is planning the pick-up and assuming the drop-off will sort itself out. A relocation is two deliveries with a drive in between, and the harder of the two ends governs the truck.</p>
<p>For each end, you want the same four measurements: the straight run available behind the placement spot, the narrowest pinch point on the route in, everything overhead including power lines and branches, and whether the ground carries a loaded truck. Walk both sites with those four in mind and you will know within ten minutes whether this is a tilt-tray job or a crane job. The <a href="/delivery/">delivery page</a> sets out what each vehicle needs in detail.</p>

<h2>Prepare the new spot before the old one</h2>
<p>Everybody focuses on getting the container off the old pad and nobody prepares the new one, which is how a unit ends up sitting on bare soil "just for now" and stays there for a decade until the doors stop closing.</p>
<p>Have four pads laid, levelled and bedded before the truck arrives. Hardwood sleepers, besser blocks bedded on firm ground, stacked pavers or poured pads all work; what matters is that they sit under the corner castings and that all four are within about ten millimetres of the same plane. Decide which way the doors face and peg it, keeping roughly 2.5 m clear at the door end so they can swing right back. Think about drainage — do not put it in the low spot where water crosses the site — and lay gravel or weed mat underneath first, because doing it afterwards means crawling.</p>

<h2>What it costs, in the terms that actually apply</h2>
<p>We do not publish figures for cartage or lifting, because a relocation price is made of variables that are specific to your two sites. What drives it is worth knowing so you can influence it:</p>
<ul>
<li>The type of truck the harder end demands. Tilt-tray at both ends is the cheapest outcome by a distance.</li>
<li>Distance between the two sites, and whether the route has any restrictions on it.</li>
<li>Time on site at each end — clearing, freeing and levelling all burn hours.</li>
<li>Whether the unit is empty, and whether that can be verified rather than asserted.</li>
<li>Permits, traffic control or a second crew, where a lift crosses public land.</li>
</ul>
<p>One comparison worth doing honestly: for an older unit moving a long way, the cost of the move can approach what a sound used container would cost sitting on a depot near the destination. If that is the case, selling where it stands and buying at the far end is sometimes the better call, and we will say so.</p>

<h2>Before you ring</h2>
<p>Have these ready and the quote comes back straight: the size and rough age of the unit, whether it is empty, photographs of all four corners and both sites, both addresses, and any deadline you are working to. Send them through the <a href="/contact/">contact page</a> or ring <strong>1300 467 776</strong>. If the unit turns out not to be worth moving, we would rather tell you that on the phone than on the day.</p>
`
  },
  {
    slug: "container-markings-and-csc-plate",
    title: "Reading a container's markings — owner codes, numbers and the CSC plate",
    desc: "How to read the numbers stencilled on a container: owner prefix, check digit, ISO size and type code, the weight markings, and everything on the CSC plate.",
    date: "2026-08-14",
    mins: 9,
    intro: "Every container carries its whole biography in paint and on a small steel plate riveted to one door. Most buyers walk past it. Learn to read it and you can tell a unit's age, its rated weights, whether the number is genuine, and whether it is still certified to go to sea — in about ninety seconds, standing in the yard.",
    body: `
<h2>The identification number</h2>
<p>Look at the doors, the sides and the roof of any container built to the international standard and you will find the same string: four letters, then seven digits. It appears in several places on purpose, so it can be read from a crane, from a ship's deck and from ground level.</p>
<p>The string breaks into four parts:</p>
<ul>
<li><strong>Owner code — three letters.</strong> Registered to the company that owns the box, usually a shipping line or a leasing company. Codes are registered internationally and are not reused casually.</li>
<li><strong>Equipment category identifier — one letter.</strong> On virtually everything you will ever buy this is a U, meaning a freight container. J is detachable equipment and Z is trailers and chassis, so if you are looking at a U you are looking at the right sort of object.</li>
<li><strong>Serial number — six digits.</strong> Assigned by the owner. It means nothing on its own.</li>
<li><strong>Check digit — one digit, usually in a box on its own.</strong> Calculated from the other ten characters.</li>
</ul>
<p>That last digit is the useful one. It is arithmetic, not decoration: each letter is given a numeric value, each of the eleven positions is weighted, and the total resolves to a single digit that must match. Terminals and depots validate it automatically. For you it is a sanity check — if a number has been restencilled by hand and the check digit no longer works, somebody has painted a number on a box rather than the box's own number.</p>
<p>The practical test is simpler than the arithmetic. Walk the unit and confirm the same number appears, identically, on both doors, both sides and the roof. Numbers that disagree, or a patch of fresh paint where a number used to be, deserve a question. It is not automatically sinister — repaired and repainted units get restencilled all the time — but you want the answer to come from the seller rather than from you a year later.</p>

<h2>The ISO size and type code</h2>
<p>Beside or below the identification number sits a four-character code that tells you exactly what shape the box is. It is worth knowing because it does not lie and marketing words sometimes do.</p>
<p>It follows ISO 6346. The first character is length: <strong>1</strong> is 10ft, <strong>2</strong> is 20ft, <strong>4</strong> is 40ft and <strong>L</strong> is 45ft. The second is height (and width): <strong>0</strong> is 8ft, <strong>2</strong> is 8ft 6in — the standard box — and <strong>5</strong> is 9ft 6in, the high cube; C, D and E are the same three heights on a wider-than-standard box, so 2EG1 is a 20ft high cube pallet-wide unit rather than a 10ft. The third character is the type — G general purpose, R refrigerated, U open top, P platform or flat rack, T tank — and the fourth narrows it down. A few you will see constantly in Australia:</p>
<table>
<thead><tr><th>Code</th><th>What it is</th></tr></thead>
<tbody>
<tr><td>10G1</td><td>10ft, 8ft high, general purpose</td></tr>
<tr><td>12G1</td><td>10ft, 8ft 6in (standard height), general purpose</td></tr>
<tr><td>20G1</td><td>20ft, 8ft high, general purpose — an older, lower box</td></tr>
<tr><td>22G1</td><td>20ft, standard height, general purpose</td></tr>
<tr><td>22R1</td><td>20ft, standard height, refrigerated</td></tr>
<tr><td>22U1</td><td>20ft, standard height, open top</td></tr>
<tr><td>22P1</td><td>20ft platform or flat rack</td></tr>
<tr><td>25G1</td><td>20ft high cube, general purpose</td></tr>
<tr><td>42G1</td><td>40ft, standard height, general purpose</td></tr>
<tr><td>45G1</td><td>40ft high cube, general purpose</td></tr>
<tr><td>45R1</td><td>40ft high cube, refrigerated</td></tr>
<tr><td>L5G1</td><td>45ft high cube, general purpose</td></tr>
</tbody>
</table>
<p>The characters that matter most day to day are the first two. A 1, 2 or 4 at the front is the length in tens of feet. A 5 in second position means high cube — 300 mm more height than a 2 in that position, and a 0 there is the older 8ft box that is lower again. If somebody tells you a unit is a high cube and the plate says 22G1, believe the plate. Our <a href="/dimensions/">dimensions page</a> has the standard figures for each of these — treat them as approximate on any individual unit.</p>

<h2>The weight markings</h2>
<p>Painted on the doors of every unit, usually in a block under the identification number, are three weights. They are given in kilograms and in pounds.</p>
<ul>
<li><strong>MAX GROSS.</strong> The heaviest the container is certified to be, including its own weight. On most 20ft and 40ft general purpose units this is 30,480 kg, and a newer 40ft is sometimes plated at 32,500 kg.</li>
<li><strong>TARE.</strong> The weight of the empty container. Roughly 2,200 kg for a 20ft, roughly 3,800 kg for a 40ft, though a repaired or repainted unit can vary by a hundred kilograms or so.</li>
<li><strong>NET or PAYLOAD.</strong> Max gross minus tare. What you may legally put in it at sea.</li>
</ul>
<p>For storage on the ground, none of these will ever be your limiting number — road mass limits stop you long before the container's rating does. Where they do matter is lifting. If a unit is being craned with anything in it, the crew needs a real weight, and tare off the door is the starting point for that sum.</p>

<h2>The CSC plate</h2>
<p>Riveted to the left-hand door, usually at eye height and often under a few coats of paint, is a metal plate carrying the Safety Approval issued under the International Convention for Safe Containers. It is the container's registration paper and it is the single most informative thing on the unit.</p>
<p>What is on it:</p>
<ul>
<li><strong>The approval reference and country of approval.</strong> Who certified the design and where.</li>
<li><strong>Date of manufacture.</strong> Month and year. This is the container's age and it is not written anywhere else.</li>
<li><strong>Manufacturer's serial number.</strong> Independent of the owner's painted number, which is handy when the painted one has been changed.</li>
<li><strong>Maximum operating gross mass.</strong> Same figure as the door.</li>
<li><strong>Allowable stacking weight.</strong> How much load the unit may carry through its corner posts when stacked — typically expressed for a 1.8g acceleration, because a ship at sea is not a still environment.</li>
<li><strong>Racking test load value.</strong> The transverse force the frame was tested against.</li>
<li><strong>Next examination date, or an ACEP marking.</strong> The one that decides whether it can still be shipped.</li>
</ul>

<h2>Age, and what it tells you</h2>
<p>The manufacture date is the figure buyers should look at first. Boxes generally come out of sea service at roughly ten to fifteen years of age, which is why the used market is full of units of about that age and why that age is not, by itself, a problem. A container is a very slow-ageing object when it is standing still on dry pads.</p>
<p>Where the date is useful is as a cross-check. A unit presented as a lightly used box with a plate showing twenty-five years is telling you something the paint is not. A unit with a very recent date and heavy damage has had a hard life somewhere. Neither is automatically a reason to walk, but both are reasons to look harder at the floor, the rails and the door seals.</p>

<h2>Examination dates and whether you should care</h2>
<p>Under the convention, a container in international service has to be examined periodically. Two schemes exist. The older one stamps a next examination date on the plate. The more common one now is an Approved Continuous Examination Programme, marked with an ACEP decal and a registration reference, under which the operator examines units on a defined cycle rather than to a date.</p>
<p>Here is the part that matters to a buyer: if the container is going to stand on your block as storage, an expired examination date changes nothing at all. It is not a safety statement about the box sitting still. It simply means the unit is no longer certified to carry cargo across an ocean.</p>
<p>If, on the other hand, you intend to ship in it — a genuine export, a relocation overseas, a project cargo — then certification is the whole question and you need a unit that carries it. That is a different unit, a different price, and a conversation to have before you order rather than after. Say so up front.</p>

<h2>Other markings worth knowing</h2>
<ul>
<li><strong>Timber treatment decal.</strong> Australian biosecurity requires container flooring to be treated, and the decal records what with. Worth a look if the floor has been replaced at some point.</li>
<li><strong>Consolidated data plate.</strong> Many modern units combine the CSC approval, the customs approval and the timber declaration onto one plate.</li>
<li><strong>Height warning.</strong> High cubes carry a black and yellow marking on the doors and sometimes a strip along the top rail, because a 2.89 m box under a 2.6 m awning is a bad afternoon.</li>
<li><strong>Repair stencils and patch stamps.</strong> Some yards mark repairs with a date. A welded, ground and painted patch is a legitimate repair; tape and silicone are not a repair at all.</li>
</ul>

<h2>How to use all this in a yard</h2>
<p>Ninety seconds, in this order. Read the ISO code and confirm the size and height are what you were told. Read the tare and max gross. Find the CSC plate and read the manufacture date. Check the painted number matches on both doors and both sides. Then stop reading and start inspecting — the plate tells you what the container was built to be, and the floor, the roof and the door seals tell you what it is now. Our <a href="/container-inspection/">inspection page</a> covers what we check before a unit goes out, and the <a href="/container-grades/">grades page</a> explains where each condition sits.</p>
<p>If you want to look for yourself, the yard at 51-55 Bromley Street, Cornubia is open Monday to Friday 7:30am to 5pm and Saturday morning, and the units are on hardstand where you can walk around them. Ring <strong>1300 467 776</strong> first so the unit you are after is pulled out where you can walk around it. If you are buying from one of the other depots — Gympie, Rockhampton, Mackay, Townsville, Cairns, Grafton, Darwin or Fremantle — ask for photographs of the specific unit, including the plate. We send them on request and before delivery.</p>
`
  },
  {
    slug: "types-of-shipping-containers",
    title: "The container types explained — which shape solves which problem",
    desc: "General purpose, high cube, side opening, double door, open top, flat rack and dangerous goods containers: what each shape is for and when it is worth paying.",
    date: "2026-08-13",
    mins: 9,
    intro: "Nearly everyone rings asking for a size. Size is only half the specification. The other half is the shape of the box — where the doors are, how tall it is, whether the roof comes off — and that half decides whether the thing is a pleasure to use or a daily nuisance. Here is the full family, and the job each member is actually built for.",
    body: `
<h2>General purpose — the default, and usually right</h2>
<p>A plain steel box with a pair of doors on one end. Corrugated walls, marine plywood floor over steel cross members, passive vents in the upper side panels, eight corner castings. Somewhere around nine in ten containers sold in Australia are this, and for good reason: it is the cheapest per cubic metre, the easiest to find in any grade, the simplest to deliver and by a wide margin the easiest to sell on.</p>
<p>Its one design limitation is that all access is through one end. Anything at the back of the box needs everything in front of it moved first. On a 10ft that is trivial. On a 20ft it is manageable with a bit of thought about what goes in last. On a 40ft it becomes the defining feature of your daily life with the thing, and it is the single most common regret we hear about long units.</p>
<p>If your loading is occasional, or your stored gear is stable — records, furniture, seasonal stock, fencing materials — a <a href="/general-purpose-shipping-containers/">general purpose unit</a> is the answer and you can stop reading. If you are in and out of it every day pulling different things, keep going.</p>

<h2>High cube — 300 mm that changes the room</h2>
<p>Same footprint, same width, same doors, 300 mm more height inside and at the door opening. It is the cheapest useful upgrade in the catalogue and the one people most often wish they had taken.</p>
<p>Where it earns its keep:</p>
<ul>
<li><strong>Anything tall.</strong> Machinery, vehicles on stands, racking, palletised stock double-stacked, a boat on a trailer. The door opening rather than the ceiling is usually the constraint, and a <a href="/high-cube-shipping-containers/">high cube</a> lifts both.</li>
<li><strong>Anything you will line or fit out.</strong> Insulation and lining eat 50 to 100 mm off the ceiling. Start standard and a tall adult is stooping; start high cube and the finished room is comfortable.</li>
<li><strong>Anywhere you are stacking to the roof.</strong> The extra height is a full extra layer of cartons in many cases.</li>
</ul>
<p>The costs are real but small: slightly more to buy, slightly more to heat and cool if you are conditioning it, and one genuine catch — at 2.89 m it is taller on the truck, so every wire, branch, awning and carport beam on the route has to clear a load that is higher again during placement. Mention the high cube when you describe the access, not after the truck is booked.</p>

<h2>Side opening — the one that fixes access</h2>
<p>Doors along one full side, sometimes as well as the end doors. External dimensions are unchanged, so it takes the same footprint and travels on the same trucks, but the way you use it is completely different.</p>
<p>With the side open you can see everything at once, reach anything without shifting what is in front of it, and load with a forklift across the whole length rather than through a 2.34 m gap at one end. For a business running stock out of a container daily, or a trade storing long items that have to come out sideways, that is not a convenience — it is the difference between a workable store and a Tetris puzzle.</p>
<p>What you pay for it: a real premium over a plain box, because a <a href="/side-opening-shipping-containers/">side opening unit</a> carries several times the door hardware and a lot more framing. Slightly less internal height and capacity, lost to that framing. More gaskets and locking bars to maintain, and more of them to secure. And it needs clear space along the whole side to open, which is a siting decision you have to make before delivery rather than after.</p>

<h2>Double door, or tunnel</h2>
<p>Doors at both ends. Drive-through access, load from either side of a yard, and a genuine solution for long items that will not turn once they are inside. Popular for pipe, timber, roof sheets and anything you would rather push straight through than reverse out of.</p>
<p>The trade-offs are worth understanding. You lose the solid end wall, which is the wall people usually rack against or fix shelving to. You double the number of door seals, which doubles the maintenance and the number of places weather can get in as gaskets age. And you double the securing job — two ends to lock, two lock boxes to fit.</p>

<h2>Open top</h2>
<p>Standard walls and floor, no fixed steel roof. In its place a removable tarpaulin over a set of bows, and a top-end door header that swings out so tall loads can be lifted straight in from above.</p>
<p>This exists for one reason: things that will not go through a door. Machinery lifted in by crane, bulk material tipped in, plant with a tall mast, anything loaded from overhead. In storage use it is niche, and outside its niche it is a poor choice — a tarpaulin is not a roof, it degrades in Australian sun, and it will not keep weather out the way steel does. If you need to load from above once and then store for years, the honest answer is usually to load through the doors and buy a plain box.</p>

<h2>Flat rack and platform</h2>
<p>A floor with the corner posts and end frames but no side walls or roof; on some versions the ends fold flat. These are freight equipment for oversized cargo — transformers, boats, machinery, structural steel — and they get used on the land as work platforms, bases and skids.</p>
<p>They are not storage. There is nothing to lock and nothing to keep weather off. Worth knowing they exist so you recognise one on a yard and do not spend time on it.</p>

<h2>Refrigerated units</h2>
<p>An insulated box with a refrigeration machine built into one end. Full-height insulated panels, an aluminium T-bar floor that lets air circulate under the load, and a machine that will hold a set temperature well below freezing if it is asked to.</p>
<p>Two things people underestimate. The first is power: a running reefer needs three-phase power, and the connection is a real piece of electrical work rather than an extension lead. The second is maintenance — the machine is a serious piece of equipment with a service life, a gas charge and a repair bill to match.</p>
<p>Which is why the common use for a retired one is not refrigeration at all. Turn the machine off and you have the best-insulated shipping container made: quiet, thermally stable, and a very good starting point for anything that has to stay cool or dry in an Australian summer. If a refrigerated or insulated unit is what your job needs, ring and describe the job — availability varies by depot and it is worth checking before you plan around one.</p>

<h2>Dangerous goods containers</h2>
<p>Built to a different standard again, and not something to improvise. A <a href="/dangerous-goods-shipping-containers/">dangerous goods container</a> has a bunded floor to contain a spill, forced ventilation, appropriate shelving, compliant electrical fittings and the placarding the relevant class requires.</p>
<p>If you are storing chemicals, fuels, oxidisers, pesticides or anything else with a dangerous goods class attached, the container is part of a compliance obligation rather than a convenience. Storing those goods in an ordinary box may satisfy nobody — not your insurer, not the regulator, not the person who has to open the doors on a hot afternoon. Tell us the class and the quantity and we will tell you what the unit needs to be.</p>

<h2>Choosing between them</h2>
<table>
<thead><tr><th>The problem</th><th>The shape that solves it</th></tr></thead>
<tbody>
<tr><td>General storage, occasional access</td><td>General purpose</td></tr>
<tr><td>Tall gear, racking, any fit-out</td><td>High cube</td></tr>
<tr><td>In and out daily, forklift loading</td><td>Side opening</td></tr>
<tr><td>Long items, drive-through yard</td><td>Double door</td></tr>
<tr><td>Loading by crane from above</td><td>Open top</td></tr>
<tr><td>Temperature-sensitive stock</td><td>Refrigerated or insulated</td></tr>
<tr><td>Classified chemicals or fuels</td><td>Dangerous goods</td></tr>
</tbody>
</table>
<p>Two rules of thumb after a lot of these conversations. First, spend on height before you spend on length — the extra 300 mm gets used every day and costs comparatively little. Second, spend on access if and only if you will use the container more than about weekly; below that frequency a plain box and a bit of planning is the better buy, and it will be far easier to move on when you are finished with it.</p>
<p>The whole range with current stock sits on the <a href="/shipping-containers/">container range page</a>. If you cannot see a shape that fits the problem, describe the problem instead of the container — ring <strong>1300 467 776</strong> and there is usually a configuration that solves it.</p>
`
  },
  {
    slug: "how-long-does-a-shipping-container-last",
    title: "How long a shipping container lasts, and how to get more out of it",
    desc: "What actually ends a shipping container's life on land, how long you can expect one to last, and the small amount of maintenance that adds years to it.",
    date: "2026-08-12",
    mins: 9,
    intro: "A container built for the North Atlantic and retired after fifteen years at sea will happily stand on a dry pad in Australia for another twenty-five, or rust out from underneath in eight. The difference is almost never the steel it was made from. It is what is going on beneath the bottom rails, and whether anyone has looked in a decade.",
    body: `
<h2>What kills a container on land</h2>
<p>Containers do not wear out from use the way machinery does. They corrode, and corrosion needs three things: moisture, oxygen and time. Remove the moisture and the clock effectively stops.</p>
<p>There is a hierarchy of failure and it is worth knowing because it tells you where to spend your attention.</p>
<ol>
<li><strong>Bottom rails and cross members.</strong> The number one killer. Water sits under a container that is set too low, grass grows against the steel and holds it there, and the corrosion happens on the underside where nobody looks until a foot goes through the floor.</li>
<li><strong>Floor.</strong> Marine ply is durable but it is still timber. Once water gets to it, from a roof pinhole above or a rotted cross member below, it delaminates and goes spongy.</li>
<li><strong>Roof.</strong> Thin corrugated steel with dents that pond water. Ponded water plus a chipped coating equals a pinhole in a few years.</li>
<li><strong>Door hardware and gaskets.</strong> Gaskets harden and set, hinges seize, cams stop engaging. Rarely fatal, always annoying, cheap to fix if caught.</li>
<li><strong>Side panels.</strong> Last to go. Dents and surface rust look dramatic and matter least.</li>
</ol>
<p>Notice that the things that kill a container are all at the bottom, and the things people worry about are all at eye level.</p>

<h2>Realistic lifespans</h2>
<p>Nobody can put a warranty on this, and anyone giving you a precise figure is guessing. What can be said honestly is how the variables stack up.</p>
<p>A sound used unit, set on pads with air underneath, on a dry inland site, painted once in its life, is still perfectly serviceable twenty-five or thirty years after it left the wharf. A new one-trip unit in the same conditions has longer again, because it starts with intact factory coating everywhere including the underside.</p>
<p>Cut those numbers hard for these conditions:</p>
<ul>
<li><strong>Salt air.</strong> Within a kilometre or two of the beach the coating is under constant attack. Coastal sites want more frequent inspection and a repaint sooner.</li>
<li><strong>The tropical wet.</strong> High humidity and long wet seasons through the north keep everything damp for months at a time.</li>
<li><strong>Direct ground contact.</strong> A unit sitting on soil with grass against the rails can be perforated in under a decade.</li>
<li><strong>Shade and vegetation.</strong> A container under trees never dries out, collects leaf litter that holds water on the roof, and gets dripped on constantly.</li>
<li><strong>Industrial atmosphere.</strong> Anywhere with corrosive fallout in the air.</li>
</ul>
<p>The units that fail early nearly all share the same photograph: sitting flat on dirt, grass to the rails, under a tree, doors facing the weather.</p>

<h2>The three things that add the most years</h2>
<h3>1. Get it off the ground and keep air moving under it</h3>
<p>This is worth more than everything else combined. Pads under the four corner castings that raise the box 100 to 200 mm let air circulate underneath, let the steel dry after rain, and stop capillary moisture wicking up into the cross members. It also lifts the floor away from ground damp, which helps with condensation inside.</p>
<p>Do it at delivery, because doing it afterwards means jacking a standing container. Hardwood sleepers, besser blocks bedded on firm ground, stacked pavers or poured concrete pads all work.</p>
<h3>2. Control where water goes</h3>
<p>Do not site a container in the low point of a yard or across the path water takes after real rain. Put gravel or weed mat under it before it lands. Keep the grass down around and under it — a whipper snipper twice a year is the cheapest maintenance in this entire guide.</p>
<p>On the roof, clear leaves and debris out of the corners and off the top rails. Anything that holds moisture against the steel is a future hole.</p>
<h3>3. Look at it once a year</h3>
<p>Fifteen minutes, once a year, ideally at the end of winter or after the wet. Kneel down and look along both bottom rails at eye level with the ground. Look at all four corners. Get up and look across the roof at a low angle for ponding and patches. Shut yourself inside for thirty seconds and look for daylight. Work the locking bars.</p>
<p>Everything on that list is free, and every one of them catches something years before it becomes a repair.</p>

<h2>Rust: what to do about it and when</h2>
<p>Surface rust is not an emergency. It is the paint failing, not the steel. Left alone in a dry climate a container will carry patches of it for years without consequence. Left alone near the coast it will not.</p>
<p>The treatment is the same as any steel: get the loose material off, kill what is left, and put a coating back on. Wire brush, grinder with a flap disc, or a needle scaler for the serious stuff. Then a rust-converting primer or a zinc-rich primer, then a topcoat. Any decent exterior enamel or an industrial direct-to-metal coating works; the trick is preparation, not product.</p>
<p>Priorities, in order: bottom rails first, roof second, door frames and hardware third, walls last. That is the reverse of the order people actually paint in, because walls are where the paint shows.</p>
<p>Perforation — a hole rather than a stain — is a different job. Small holes can be cleaned back and welded, ground and coated. A rail that has gone soft over a long run needs a section replaced, and that is fabrication work. Neither is a job for silicone or tape, and a unit patched that way should be treated as one that will let water in.</p>

<h2>Repainting a container properly</h2>
<p>People repaint for appearance, and get a durability benefit as a bonus. Both are legitimate.</p>
<p>Clean it first. Pressure wash, degrease anything oily, and let it dry properly. Sand or wire brush every failed area back to sound material. Spot prime the bare steel. Then two coats of topcoat, brushed, rolled or sprayed. A light colour reflects heat and will measurably reduce how hot the inside gets on a summer afternoon, which also cuts the condensation load.</p>
<p>Do not skip the underside of the door bottoms and the inside faces of the rails. Those are where the water actually sits and they are the areas everyone misses because they cannot be seen from standing height.</p>
<p>A container painted a plain colour also draws far less attention from neighbours and from councils than one still wearing a shipping line's livery and a decade of rust streaks.</p>

<h2>Gaskets, hinges and the door end</h2>
<p>The door end is the only moving part and it is where most of the annoyance lives.</p>
<p>Grease the hinge pins and the locking bar cams once a year — any general purpose grease is fine. If a bar is stiff, deal with it now: a seized bar gets forced, a forced bar gets bent, and a bent bar is a new bar.</p>
<p>Check the gaskets by hand. They should feel supple. When they harden and take a set, they stop sealing along the bottom of the doors, which is exactly where you will not notice water getting in until something on the floor is wet. Replacement gasket is inexpensive and it is a job a competent person can do in an afternoon.</p>
<p>And if a bar has suddenly become stiff when it was fine last year, do not start with the hardware. Go and check the pads. Nine times out of ten a corner has settled and the frame has twisted slightly, and re-levelling fixes the doors immediately. Leave it long enough and the steel takes a set it will not come back from, so the door end stays twisted after the pads are fixed.</p>

<h2>Buying with lifespan in mind</h2>
<p>If you want thirty years out of a container, two decisions at purchase matter more than everything you do afterwards.</p>
<p>The first is grade. New and cargo-worthy units are checked wind and watertight before leaving the yard, and they still have the bones for decades. Units sold as-is are not sold watertight, and while they are entirely appropriate for a scrap store or a shell, they are not the unit to buy if you want it standing and dry in 2050. The <a href="/container-grades/">grades page</a> lays this out.</p>
<p>The second is what is under it on day one. Prepare the pads before the truck comes. It is an afternoon of work and it is worth more to the container's life than any amount of paint.</p>
<p>If you want an honest read on how much life is left in a particular unit, ask — we will tell you what we see on the bottom rails and the floor, and we send photographs of the actual container on request and before delivery. Ring <strong>1300 467 776</strong>, or read what we check on the <a href="/container-inspection/">inspection page</a>.</p>
`
  }
].concat(require("./posts-b.js"));
