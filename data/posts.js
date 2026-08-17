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
<p>People assume length sets the price. It contributes, but condition swings the number harder. A one-trip unit that has made a single loaded voyage, still wearing factory paint, sits at the top. A sound used unit certified fit to carry freight sits in the middle and is what most buyers should be looking at. A retired unit sold on its faults sits well below both.</p>
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
<p>A trailer with hydraulic lifting arms that picks the unit off the ground beside it and sets it on its own deck. It needs no run-in at all, which solves plenty of tight sites, but it works off the driver's side only, which means it must be able to sit with that flank presented to the container at each end of the job. It handles 40fts as a matter of routine and it can stack.</p>
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
<p>The first character is length. The second is height and width. The last two are the type. A few you will see constantly in Australia:</p>
<table>
<thead><tr><th>Code</th><th>What it is</th></tr></thead>
<tbody>
<tr><td>22G1</td><td>20ft standard height general purpose</td></tr>
<tr><td>22P1</td><td>20ft flat rack or platform</td></tr>
<tr><td>25G1</td><td>20ft high cube general purpose</td></tr>
<tr><td>42G1</td><td>40ft standard height general purpose</td></tr>
<tr><td>45G1</td><td>40ft high cube general purpose</td></tr>
<tr><td>45R1</td><td>40ft high cube refrigerated</td></tr>
<tr><td>20G1 / 2EG1</td><td>10ft general purpose, depending on the standard's era</td></tr>
</tbody>
</table>
<p>The characters that matter most day to day are the first two. A 4 at the front means forty feet. A 5 in second position means high cube — 300 mm more internal height than a 2 in that position. If somebody tells you a unit is a high cube and the plate says 22G1, believe the plate. Our <a href="/dimensions/">dimensions page</a> has the measured figures for each of these.</p>

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
  },
  {
    slug: "anchoring-a-shipping-container",
    title: "Anchoring a shipping container — wind, cyclones and tie-downs",
    desc: "When wind can move an empty container, how tie-downs work, what cyclone regions demand and why an engineer signs off anything that has to be certified.",
    date: "2026-08-11",
    mins: 8,
    intro: "A 20ft container weighs a bit over two tonne, which sounds like plenty until you work out that it also presents about fifteen square metres of flat steel to a crosswind. Empty containers do get shifted in severe weather, and in cyclone country the question is not whether to anchor but to what standard. Here is how anchoring actually works and when it stops being optional.",
    body: `
<h2>When wind is a real problem, and when it is not</h2>
<p>Two variables decide this: how heavy the container is, and where you are.</p>
<p>A loaded container is a very stable object. Put a few tonne of anything inside a 20ft and the wind loads required to move it climb well beyond anything most of the country sees. An empty one is a different proposition — light for its area, with a large flat side and a floor that will slide on a smooth pad.</p>
<p>Geography does the rest. Australia's wind regions run from the temperate south, where a well-sited empty container is generally left as it lands, up through the northern cyclone regions where design wind speeds are far higher and where anything on a site is expected to be secured. Along the north Queensland coast, through the Territory and across the north of Western Australia, the assumption flips: things get tied down as a matter of course.</p>
<p>Three practical triggers for anchoring anywhere in the country:</p>
<ul>
<li>The container will spend significant time empty or nearly empty.</li>
<li>It is in a cyclone region, or on a coastal or ridge-top site that funnels wind.</li>
<li>Something has been added that catches wind — an awning, a roof, solar panels, a shade structure, a sign board.</li>
</ul>
<p>That last one catches people out. Bolt a lean-to onto the side of a container and you have built a sail and a lever at the same time. Awnings tear containers about far more often than bare containers get shifted.</p>

<h2>How containers are tied down</h2>
<p>Every method uses the same attachment point: the corner castings. They are the designed load points, they are engineered for the forces of lifting and stacking, and they are the only place on the unit strong enough to restrain it. Never anchor to the rails mid-span, never to a lifting lug you have welded on, and never through the floor.</p>
<h3>Twist locks into a slab or footings</h3>
<p>The cleanest solution. Cast-in or chemically anchored fittings positioned to match the casting spacing exactly, with a twist lock or a bolted plate engaging the casting. It resists uplift and sliding in every direction, it is unobtrusive, and it is the method an engineer will most readily certify.</p>
<p>The catch is precision. Container casting positions are standardised to millimetres and the anchors have to match. Set them out from the actual unit's dimensions, not from a sketch, and always dry-fit before anything cures.</p>
<h3>Ground anchors and screw piles</h3>
<p>Helical screw anchors driven into the ground beside each corner and connected to the castings by rod, chain or turnbuckle. Good on sites where a slab is not warranted or possible, quick to install with the right gear, and removable when the container leaves. Capacity depends entirely on the soil — the same anchor that holds fast in stiff clay is far weaker in sand or in soft fill.</p>
<h3>Concrete deadweights</h3>
<p>Mass blocks, sleeper blocks or purpose-poured deadmen at each corner, strapped to the castings. Simple, effective and heavy. Works well where you cannot penetrate the ground — over services, on a capped site, on leased land where you have to hand it back clean.</p>
<h3>Cable and turnbuckle to fixed points</h3>
<p>Wire rope from the castings out to existing footings, a slab edge or driven anchors, tensioned with turnbuckles. Cheap, and only ever as strong as what it is tied to. Check the tension periodically because cable relaxes.</p>

<h2>Stacked, joined and multi-container arrangements</h2>
<p>Containers stacked or set side by side are secured differently to a single unit.</p>
<p>Stacked units are joined casting to casting with twist locks or bridge fittings between the layers, and the bottom layer is anchored to the ground. The stack is only as stable as the base — a stack on unlevel pads is loading its corner posts unevenly before the wind even arrives.</p>
<p>Two containers set side by side with a roof spanning between them is one of the most common rural arrangements in the country and one of the most frequently damaged in storms, because the roof turns two independent boxes into a single large wing. If you build one, treat the roof as a structure that needs proper design, and anchor both containers.</p>

<h2>Where an engineer becomes non-negotiable</h2>
<p>DIY anchoring is fine for a farm shed's worth of tools in a temperate region. It is not fine in any of these cases, and in most of them a certifier will require documentation anyway:</p>
<ul>
<li>The container is in a cyclone region, or is part of an approved structure.</li>
<li>People will occupy it — accommodation, an office, a clubroom, anything the public enters.</li>
<li>It is stacked, or joined to another building.</li>
<li>Anything has been built onto it that catches wind.</li>
<li>Insurance or a lease requires certified tie-down.</li>
<li>It sits where failure would hurt someone — near a road, a boundary, a house, a school.</li>
</ul>
<p>What an engineer does is straightforward: establishes the design wind speed for your region, terrain category and shielding, works out the uplift and sliding forces on that unit in that orientation, then specifies anchor type, capacity, spacing and fixings, and certifies it. That certificate is the thing a council or an insurer will ask for, and it is not something a container supplier can issue.</p>

<h2>Siting decisions that reduce the load before you anchor anything</h2>
<p>Anchoring resists wind. Good siting means there is less to resist.</p>
<ul>
<li><strong>Point the long axis into the prevailing wind</strong> where the site allows. It presents a much smaller face.</li>
<li><strong>Use shelter that already exists</strong> — a shed line, a bank, an established windbreak — without putting the unit where debris will collect against it.</li>
<li><strong>Keep it off exposed ridges and open rises</strong> if there is a lower option. Wind speeds climb noticeably over a crest.</li>
<li><strong>Face the doors away from the prevailing weather.</strong> This helps with wind and it helps far more with water getting past ageing seals.</li>
<li><strong>Do not park it under big limbs.</strong> The most common storm damage we see to containers is not wind at all. It is a branch.</li>
</ul>

<h2>Water, and being straight about it</h2>
<p>Wind and water arrive together in this country, so it is worth saying plainly what a container does and does not do.</p>
<p>A sound container in cargo-worthy or new condition keeps rain off what is inside it. That is what wind and watertight means and it is checked before the unit leaves. Units sold as-is are not sold watertight and should not be relied on to keep anything dry.</p>
<p>What no container does is hold back rising water. Floodwater gets in at the door seals, and an empty container floats — a hazard in itself, because a floating box becomes two tonne of steel travelling with the current. If your site takes water, the answer is height and siting, not the box. Store the things that matter above the flood line and site the unit where it is not in the path of moving water.</p>

<h2>Practical checklist</h2>
<ol>
<li>Work out whether the unit will spend real time empty.</li>
<li>Find your wind region and check whether the site is exposed, sheltered or on a rise.</li>
<li>Level the pads properly first — anchoring a unit that is not sitting evenly loads the anchors unevenly.</li>
<li>Choose a method that suits the ground: slab and twist locks, screw anchors, or deadweights.</li>
<li>Attach at the corner castings, every time.</li>
<li>Get an engineer's design and certificate if any of the triggers above apply.</li>
<li>Check tension and fixings once a year, and after any severe weather.</li>
</ol>
<p>Tell us the region and the site when you enquire, and we will tell you what other people in that area do and what the unit needs to arrive ready for. Ring <strong>1300 467 776</strong> or use the <a href="/contact/">contact page</a>. Stock sits at Cornubia and at depots through Gympie, Rockhampton, Mackay, Townsville, Cairns, Grafton, Darwin and Fremantle, so units heading into cyclone country generally come from a yard already in it.</p>
`
  },
  {
    slug: "packing-a-shipping-container",
    title: "Packing a shipping container so nothing is ruined when you open it",
    desc: "Loading a container properly: weight distribution, what must never sit on the floor, keeping moisture away from your goods, and packing for long-term storage.",
    date: "2026-08-10",
    mins: 9,
    intro: "The container arrives sound, the roof is good, the seals are fine, and eighteen months later half the boxes at the far end are ruined. Nothing failed. The load was packed the way a garage gets packed, and a sealed steel box is not a garage. Packing one properly takes an extra hour and decides what condition everything is in when the doors open again.",
    body: `
<h2>Think in three dimensions before you carry anything in</h2>
<p>A container is long, narrow and taller than it looks. The instinct is to fill from the back wall forwards in a solid mass, and that instinct produces two problems: everything you need is at the back, and the weight ends up wherever it happened to fall.</p>
<p>Before the first box goes in, decide three things.</p>
<ol>
<li><strong>What you will need to reach.</strong> Anything you might want in the next six months goes near the doors, full stop.</li>
<li><strong>Where the weight goes.</strong> Heavy items spread along the length, not concentrated at one end.</li>
<li><strong>Whether you want an aisle.</strong> A 600 mm walkway down one side costs you maybe a fifth of the floor area and turns an unusable box into a store you can actually work out of.</li>
</ol>
<p>Sketch it on paper. It takes five minutes and it stops the sequencing mistakes that cannot be undone once forty cartons are stacked in front of the thing you forgot.</p>

<h2>Weight distribution, and why it matters more than you would think</h2>
<p>Spread the heavy items evenly along the floor. Not because the container cannot take it — a general purpose unit is rated to carry many tonnes — but because of what happens either side of the storage period.</p>
<p>If the unit is ever lifted or moved loaded, an unbalanced load is genuinely dangerous. A crane crew calculates on an assumed centre of gravity, and a load stacked heavily at one end puts the real one somewhere else. Even on the ground, a concentrated mass at one end pushes harder on two of the four pads, which is how a corner settles and the doors stop closing.</p>
<p>The rules are simple:</p>
<ul>
<li>Heaviest items on the floor, spread along the length, roughly balanced end to end and side to side.</li>
<li>Nothing heavy stacked high. A toolbox at chest height is a hazard every time you open the doors.</li>
<li>Point loads spread with a sheet of ply or a pallet. Machinery on small feet will mark and eventually punch marine plywood.</li>
<li>Do not stack against the doors. Things settle, and a load leaning on the doors comes out at you.</li>
</ul>

<h2>Get everything off the floor</h2>
<p>This is the single most valuable habit in container storage. The floor is the coldest surface in the box, it is the surface any water that gets past a door seal will run across, and it is where condensation ends up.</p>
<p>Use pallets, timber battens, a layer of bearers, plastic crates — anything that lifts the load 50 to 100 mm and lets air pass underneath. Cardboard sitting directly on marine ply wicks moisture out of the timber and out of the air, and that is how the bottom row of boxes turns to mush while everything above it is untouched.</p>
<p>The same principle applies to the walls. Leave a gap of 50 mm or so between the load and the side walls. The walls are steel, they are where condensation forms first on a cold night, and anything pressed against them collects it.</p>

<h2>Managing moisture — the real enemy</h2>
<p>Most goods ruined in containers are ruined by moisture that came in with the load rather than through the roof. Warm humid air enters when you load, the steel cools overnight, and the moisture in that air condenses on the ceiling and walls and drips back down.</p>
<p>You reduce it at the source:</p>
<ul>
<li><strong>Pack dry.</strong> Nothing damp goes in — not a garden hose, not a wetsuit, not timber that has been out in the rain, not a lawnmower with wet grass in the deck, and definitely not anything with a fuel tank full of moist air.</li>
<li><strong>Load on a dry day</strong> if you have the choice, and preferably not late in the afternoon in humid weather.</li>
<li><strong>Use desiccant.</strong> Hanging container desiccant bags are cheap and they work. Put them high, where the moist air is, not on the floor.</li>
<li><strong>Do not wrap tightly in plastic.</strong> Sealed plastic traps whatever moisture was inside it against the item. Breathable covers, dust sheets and moving blankets are better for long storage.</li>
<li><strong>Keep the vents clear.</strong> Every general purpose unit has passive vents in the upper side panels. Stacking hard against them defeats the little airflow you have.</li>
</ul>

<h2>Things that should not go in a container at all</h2>
<ul>
<li><strong>Fuel, gas bottles and anything flammable.</strong> A closed steel box in the Australian sun gets very hot. This is a genuine hazard and usually a breach of your insurance.</li>
<li><strong>Anything perishable.</strong> Food, seed, pet food, birdseed. It brings vermin, and vermin bring damage to everything else.</li>
<li><strong>Batteries left connected.</strong> Disconnect and remove where you can.</li>
<li><strong>Paint and solvents.</strong> Temperature cycling ruins them and the fumes concentrate.</li>
<li><strong>Anything alive, including pot plants.</strong> Obvious in hindsight, regularly attempted.</li>
</ul>

<h2>Packing for long-term storage specifically</h2>
<p>Six weeks and six years are different jobs. If the container is going to sit, take the extra steps.</p>
<p><strong>Furniture.</strong> Dismantle what comes apart. Wrap in moving blankets, not plastic. Stand mattresses on edge against a wall with a barrier between the mattress and the steel, never flat on the floor.</p>
<p><strong>Appliances.</strong> Drain fridges and washing machines completely and leave doors ajar with a wedge. A sealed wet fridge becomes a science experiment.</p>
<p><strong>Tools and machinery.</strong> Wipe down with an oily rag or spray with a corrosion inhibitor. Bare steel in a humid box will bloom with surface rust in a season.</p>
<p><strong>Documents and photographs.</strong> Archive boxes, on pallets, in the middle of the stack rather than against a wall. Add desiccant to the box itself.</p>
<p><strong>Electronics.</strong> Original boxes if you have them, desiccant inside, and keep them off the floor and away from the walls.</p>
<p><strong>Fabric, leather and anything upholstered.</strong> These take up moisture readily. Breathable covers and desiccant, and check them at the first opportunity.</p>

<h2>Label like you will forget, because you will</h2>
<p>Number every carton and keep a list on your phone with the number and the contents. Write on two faces of each box, one of which faces the aisle. Keep a rough map of what is where in the container, and put a copy of it in a sleeve taped inside the door.</p>
<p>Eighteen months later this is the difference between fetching one thing in five minutes and unloading half the container onto the lawn.</p>

<h2>Security and the load</h2>
<p>Pack so nothing valuable is visible in the first two metres. Anyone who gets the doors open takes what is at the front, and what is at the front is what they can carry. Bikes, tools, outboards and anything else easily resold belong at the back, behind the boring boxes.</p>
<p>Put the door end where you can see it from the house or the office, and keep the doors away from a boundary fence or a lane if you have the choice.</p>

<h2>Check it after the first big weather</h2>
<p>Open the doors after the first heavy rain and the first hot spell. You are looking for three things: water on the floor near the doors, which points to a seal or a level problem; drips or staining on the ceiling, which is condensation rather than a leak; and any sign of vermin.</p>
<p>Catching any of those in the first month lets you fix it while the load is still worth saving. Discovering them in year two does not.</p>

<h2>The grade you packed into matters</h2>
<p>All of this assumes the container itself keeps weather out. New and cargo-worthy units are checked wind and watertight before leaving the yard, and they are the grades to use for anything that must stay dry. Units sold as-is are not sold watertight — they are a good buy for steel, fencing, formwork and scrap, and a poor place for anything you would be upset to lose. The <a href="/container-grades/">grades page</a> sets out the difference.</p>
<p>If you are not sure whether what you are storing suits the unit you are looking at, describe the load when you ring. That conversation takes two minutes and it is the cheapest insurance available. Ring <strong>1300 467 776</strong>, or read the <a href="/container-storage/">storage page</a> for how we set units up for long-term use.</p>
`
  },
  {
    slug: "shipping-container-vs-shed",
    title: "Shipping container or a shed? An honest comparison",
    desc: "Container versus colorbond shed for storage: cost, approval, security, heat, lifespan, resale and the situations where each one clearly wins.",
    date: "2026-08-09",
    mins: 9,
    intro: "Both of them keep the mower out of the weather, and that is where the similarity ends. A shed is a building you erect on your land. A container is a manufactured object you put down on it and can take away again. That distinction drives almost every difference that follows — cost, approval, timeframe, security and what happens the day you sell the place.",
    body: `
<h2>The comparison at a glance</h2>
<table>
<thead><tr><th></th><th>Shipping container</th><th>Kit shed</th></tr></thead>
<tbody>
<tr><td>On site and usable</td><td>Days from order</td><td>Weeks to months</td></tr>
<tr><td>Site works</td><td>Four pads, levelled</td><td>Usually a slab and footings</td></tr>
<tr><td>Approval</td><td>Often none for storage — depends on your council</td><td>Almost always building approval</td></tr>
<tr><td>Security</td><td>Steel box, one hardened opening</td><td>Thin sheet, roller door, cut in minutes</td></tr>
<tr><td>Vermin and dust</td><td>Sealed on all six sides</td><td>Gaps at eaves and floor edge</td></tr>
<tr><td>Internal height</td><td>2.39 m, or 2.69 m in a high cube</td><td>Whatever you specify</td></tr>
<tr><td>Width</td><td>Fixed at 2.35 m internal</td><td>Whatever you specify</td></tr>
<tr><td>Vehicle access</td><td>2.34 m door opening, no roller</td><td>Roller door to suit</td></tr>
<tr><td>Heat</td><td>Hot unless vented or insulated</td><td>Hot unless vented or insulated</td></tr>
<tr><td>Moves with you</td><td>Yes</td><td>No</td></tr>
<tr><td>Resale</td><td>Real second-hand market</td><td>Value stays with the property</td></tr>
</tbody>
</table>

<h2>Where the container wins clearly</h2>
<h3>Speed</h3>
<p>A container can be on your ground within days of ordering, and it is usable the moment the truck leaves. A shed involves quoting, ordering, approval, a slab that has to cure, then a builder's schedule. If the need is urgent — a house move, a flooded shed, stock that has nowhere to go — this is not a close contest.</p>
<h3>Security</h3>
<p>This is the biggest practical difference and the one people underrate. A shed is thin sheet on a light frame with a roller door that can be levered in a couple of minutes and walls that open to a battery grinder. A container is 1.6 to 2 mm corrugated steel on a heavy frame, with one opening, and that opening can be fitted with a lock box that shields the shackle entirely. There is a reason tradespeople store tools in containers on sites where sheds exist a hundred metres away.</p>
<h3>Approval and reversibility</h3>
<p>A shed is building work nearly everywhere. A container used as storage often is not, depending on your council, your zone and how it is installed — and where conditions do apply, they are usually about siting and screening rather than certification. Because a container can be picked up and taken away, it is a far easier thing to undo. Your own council decides this, so ring the duty planner before deciding either way.</p>
<h3>It is an asset, not an improvement</h3>
<p>Spend on a shed and the money stays with the property. Spend on a container and you own a portable object with a genuine second-hand market. If you might move, sell the block, or change what you are doing in three years, that difference is real money.</p>
<h3>Weathertightness on all six sides</h3>
<p>A cargo-worthy or new container is checked wind and watertight, with a sealed floor and a sealed roof. Sheds leak dust and wind-driven rain at the eaves and along the slab edge, and a shed on gravel or dirt has no floor at all. For dusty inland sites and for anything you want dust-free, that is decisive.</p>

<h2>Where the shed wins clearly</h2>
<h3>You choose the dimensions</h3>
<p>A container is 2.35 m wide internally and that is not negotiable. Anything you need wider — a car with the doors open, a workbench with room to work behind it, a boat on a trailer, machinery you walk around — needs a shed. This is the objection that ends the discussion most often, and no combination of containers fixes it without building a roof between them.</p>
<h3>Vehicle access</h3>
<p>Container doors are 2.34 m wide and swing outwards, needing about 2.5 m of clear space in front. There is no roller door and retrofitting one is a modification job. If you want to drive in and out daily, a shed does it better.</p>
<h3>Working space and light</h3>
<p>A shed can have windows, skylights, a personnel door, high clearance and open floor. A container is a corridor. It stores beautifully and it works awkwardly, unless you have modified it for the purpose.</p>
<h3>Appearance in the wrong setting</h3>
<p>In some streets and in most covenanted estates, a shed reads as normal and a container does not. That is not a technical argument but it is a real one, and it is what most neighbour complaints are actually about. Paint helps a great deal.</p>
<h3>Long-term expansion</h3>
<p>Sheds can be extended, lined, plumbed and turned into workshops in stages. Containers can be modified, but every cut costs money and a badly placed one costs strength.</p>

<h2>The cost question, honestly</h2>
<p>We are not going to publish comparative figures because a shed quote and a container quote are made of different things, and the honest comparison has to include site works.</p>
<p>What is consistently true is the shape of it. A container's price is almost entirely the unit and getting it there — the ground preparation is four pads and an afternoon. A shed's price is the kit plus the slab plus the erection plus the approval, and the slab is frequently the largest line on the page. That is why containers win the comparison so often at the small end and lose it as the required floor area grows: the container's cost scales in whole boxes while a shed's scales more gently with area.</p>
<p>The crossover point in most people's situations sits somewhere around the size where you would want more than two 20fts. Below that, containers usually cost less all in. Above it, a shed is generally better value and better suited.</p>

<h2>Heat, and the myth that only containers suffer</h2>
<p>Steel gets hot in the sun. That is true of both. A dark container in full sun in February is unpleasant, and so is an uninsulated shed with a dark roof.</p>
<p>The fixes are the same as well: light colours, shade, and airflow. A container's advantage is that it is a sealed box that responds well to added roof ventilators and a lining; its disadvantage is that its passive vents alone are not much. A shed's advantage is roof height and whirlybirds; its disadvantage is that hot air still sits in it. Neither is a reason to choose one over the other on its own.</p>

<h2>The combination people actually end up with</h2>
<p>On a lot of rural and industrial properties the answer is both, and it is not a compromise — it is the better design.</p>
<p>Two containers set apart at the spacing of a shed span, with a roof built between them, gives you a covered bay with lockable stores at either side, for far less than an equivalent enclosed shed. The containers do the securing and the sealing; the roof does the width and the clearance. It is one of the most common arrangements in the country.</p>
<p>Two things to get right if you build one. The roof is a structure and it needs designing, because it will catch wind. And both containers need to be anchored — a roof between two boxes turns them into a single large wing in a storm.</p>

<h2>A short way to decide</h2>
<ol>
<li><strong>Do you need more than 2.35 m of clear internal width?</strong> If yes, shed. The question is settled.</li>
<li><strong>Do you need it this week?</strong> If yes, container.</li>
<li><strong>Is security the main reason you are buying?</strong> Container.</li>
<li><strong>Will you drive in and out daily?</strong> Shed.</li>
<li><strong>Might you move, or sell, within a few years?</strong> Container.</li>
<li><strong>Do you want to avoid building approval and a slab?</strong> Container, after you have checked with your own council.</li>
<li><strong>Is it going to be a workshop you spend hours in?</strong> Shed, or a container fitted out properly for the job.</li>
</ol>
<p>If the honest answer is that a container will do most of it, our <a href="/shipping-containers/">range</a> lists what is available and the <a href="/container-storage/">storage page</a> covers how people set them up. Ring <strong>1300 467 776</strong> and describe the block and the job — if a shed is the better answer for what you have described, we will tell you.</p>
`
  },
  {
    slug: "containers-on-farms-and-rural-blocks",
    title: "Containers on farms and rural blocks — what actually works",
    desc: "How containers earn their keep on Australian properties: feed and chemical storage, vermin, ground types, paddock access and moving one with your own gear.",
    date: "2026-08-08",
    mins: 9,
    intro: "There is a reason containers are on nearly every working property in the country. They are the only storage you can buy that arrives finished, seals on all six sides, holds up to dust and vermin, and can be picked up and put somewhere else when the operation changes. That last point is what separates them from a shed and it is worth planning around from the start.",
    body: `
<h2>What they get used for, in rough order of frequency</h2>
<ul>
<li><strong>Tool and workshop lock-up.</strong> Hand tools, welders, compressors, spare parts. The stuff that walks and the stuff that rusts.</li>
<li><strong>Chemical and fertiliser store.</strong> Out of the weather, out of the sun, away from the house, lockable — with the caveats below.</li>
<li><strong>Feed and seed.</strong> Sealed against vermin far better than any shed, which is the whole reason it is used for this.</li>
<li><strong>Fencing and irrigation materials.</strong> Wire, posts, poly pipe, fittings, star pickets. Long items favour a 40ft or a double-door unit.</li>
<li><strong>Machinery parts and spares.</strong> Racked out down one side with an aisle down the other.</li>
<li><strong>Bulk buys.</strong> Somewhere to put a truckload of anything bought at the right price.</li>
<li><strong>Remote outposts.</strong> A container at a back paddock, a bore, a yard or a shed complex, so gear does not travel back and forth every day.</li>
<li><strong>Bases and structures.</strong> Two containers with a roof between them as a machinery bay, a hay bay or a shearing lunch room.</li>
</ul>

<h2>Siting: the decisions you cannot easily undo</h2>
<p>A container on a rural block is easy to place and expensive to reposition, so spend ten minutes on this before the truck comes.</p>
<p><strong>Put it where the truck can get to it again.</strong> The most common rural mistake is siting a container somewhere a delivery truck could just manage in the dry, then finding the same access has grown out, washed out or been fenced across when it is time to move it. Leave the run in.</p>
<p><strong>Keep it out of the water's path.</strong> Not just the flood line — the everyday path water takes across a paddock after real rain. Standing water under a container rots the bottom rails and cross members, and that is what ends a container's life on land.</p>
<p><strong>Think about the doors and the prevailing weather.</strong> Doors away from the driving rain and the dust. Doors visible from the house or the shed if security matters. And enough clear space in front — around 2.5 m — for the swing, which people forget when they tuck a unit against a fence line.</p>
<p><strong>Mind the trees.</strong> Shade seems kind and is not. A container under trees stays damp, collects leaf litter in the roof corners and top rails, and eventually gets a limb through it. The most common storm damage to rural containers is a branch, not wind.</p>
<p><strong>Away from the house for chemicals.</strong> Separation is the cheapest safety measure available.</p>

<h2>Ground on a rural block</h2>
<p>Farm ground is more variable than a suburban block, and the ground decides whether the doors still shut in five years.</p>
<table>
<thead><tr><th>Ground</th><th>What happens</th><th>What to do</th></tr></thead>
<tbody>
<tr><td>Black soil</td><td>Bearing collapses wet, cracks open dry, moves seasonally</td><td>Generous concrete pads on compacted base. Recheck level after the first wet.</td></tr>
<tr><td>Reactive clay</td><td>Swells and shrinks with moisture</td><td>Bigger footprint pads, and expect to re-level once.</td></tr>
<tr><td>Sand</td><td>Drains well, spreads under point load</td><td>Wide pads, bedded and compacted.</td></tr>
<tr><td>River silt or flat</td><td>Soft, and often in the water's path</td><td>Site higher if you can. Substantial pads.</td></tr>
<tr><td>Rock or gravel pad</td><td>Best case</td><td>Sleepers or pavers, levelled.</td></tr>
<tr><td>Old fill or a filled-in dam</td><td>Settles for years</td><td>Site elsewhere, or over-engineer the footings.</td></tr>
</tbody>
</table>
<p>Whatever the ground, get the unit up off it. Pads under the four corner castings that raise the box 100 to 200 mm let air move underneath, which dries the steel after rain and takes some of the heat out of the condensation problem. Then keep the grass down under and around it — a whipper snipper twice a year genuinely adds years to a container's life on a paddock.</p>

<h2>Chemicals: know when you have crossed a line</h2>
<p>Storing farm chemicals in an ordinary container is common and it is often perfectly reasonable. It stops being reasonable at a threshold set by the class and the quantity you hold, and that threshold is set by regulation rather than by preference.</p>
<p>Above it, what is required is a purpose-built <a href="/dangerous-goods-shipping-containers/">dangerous goods container</a>: bunded floor to contain a spill, forced ventilation, compliant shelving and fittings, and correct placarding. Your chemical reseller, your farm assurance scheme and your insurer will all have a view, and the useful move is to ask them what class and quantity you are actually holding before you buy the container.</p>
<p>Even below the threshold, three habits are worth having. Ventilate — heat and vapour build up in a sealed steel box in summer. Bund anything liquid, even improvised with a tray. And do not store chemical alongside feed, seed or anything that goes near stock.</p>

<h2>Vermin, and the thing containers are genuinely good at</h2>
<p>The reason feed goes in containers is that mice and rats cannot chew through 2 mm steel. What they can do is walk through a gap, and a container's gaps are all at the door end.</p>
<ul>
<li>Check the gaskets. Hardened, cracked or set gaskets leave a gap along the bottom of the doors, and that is the doorway.</li>
<li>Keep the unit off the ground, so there is light and air under it rather than a covered runway.</li>
<li>Keep vegetation cut back — long grass against the rails is cover.</li>
<li>Sweep spilt grain out. Nothing draws them in like a feed trail.</li>
<li>Keep everything off the floor on pallets, which also protects it from any moisture that does get in.</li>
</ul>
<p>Done properly, a sound container is the best vermin-resistant store on a farm by a wide margin.</p>

<h2>Moving your own containers around the property</h2>
<p>Plenty of properties shift containers with their own gear, and it is legitimate work if it is done with the right equipment and respect for the load.</p>
<p>The container is designed to be lifted by its eight corner castings and by nothing else. Skidding a unit with a chain around the rails, or lifting with forks under the floor, distorts the frame — and a distorted frame means doors that never seat again. If you are using a telehandler or a loader, use proper lifting attachments engaged in the castings, keep the load low, and remember that an empty 20ft is still over two tonne and a 40ft is close to four.</p>
<p>Two things settle whether it is worth doing yourself. Is the unit genuinely empty, and are the corner castings and bottom rails sound? If either answer is uncertain, that is a job for a truck. For anything beyond your own gate, or any unit whose corners you are unsure of, ring us — moving one properly is covered on the <a href="/delivery/">delivery page</a>.</p>

<h2>Wind, and the roof you were thinking of building</h2>
<p>A bare container on a rural block, sitting empty, is a wind consideration in the northern regions and on exposed sites anywhere. A container with a lean-to bolted to the side, or two containers with a roof spanning between them, is a wind consideration everywhere. That roof is a wing, and it lifts.</p>
<p>If you build one, treat it as a structure that needs designing for your wind region, and anchor both containers at the corner castings. This is the single most common cause of container damage on properties, and it is entirely preventable.</p>

<h2>Buying rural, and where the unit comes from</h2>
<p>Two practical points for anyone ordering to a property rather than a street address.</p>
<p>First, describe the access honestly, including the last few kilometres. Gate widths, cattle grids, causeways, the corner at the top of the ridge, the bit that turns to soup after rain, and how long it takes to dry. A truck that arrives and cannot get in is the single most expensive outcome in this business and it is nearly always avoidable with a phone call.</p>
<p>Second, ask where the unit is coming from. Stock sits at Cornubia and at depots through Gympie, Rockhampton, Mackay, Townsville, Cairns, Grafton, Darwin and Fremantle, and the closest one to you is usually the sensible source. If you are buying without seeing it, ask for photographs of the specific unit — the floor, the door end, the roof and the bottom rails. We send them on request and before delivery.</p>
<p>Ring <strong>1300 467 776</strong> with the property address and what is going in it, and you will get a price with cartage worked out rather than an estimate that changes later.</p>
`
  },
  {
    slug: "stacking-shipping-containers",
    title: "Stacking shipping containers — what is safe and what is not",
    desc: "How container stacking works on land: twist locks, corner castings, level bases, wind loads, access to the top unit, and when an engineer has to sign it off.",
    date: "2026-08-07",
    mins: 8,
    intro: "Containers are stacked nine high on ships, which makes it look like the easiest thing in the world to put one on top of another in a yard. On a ship they are locked into a cell guide system, on a level deck, by people doing it all day. On your block none of those three things is true, and every one of them is the reason a stack goes wrong.",
    body: `
<h2>How the load actually travels</h2>
<p>All the strength in a container sits in four corner posts, the rails top and bottom, and eight corner castings. The walls and roof carry very little — a container roof is not designed to be stood on, let alone loaded.</p>
<p>Which means stacking works only one way: corner casting to corner casting, so the load in the upper unit's posts passes straight down into the lower unit's posts. Anything that puts weight anywhere else is not stacking, it is damage in progress. Two containers offset so the top one's castings land mid-rail will bow the lower unit's roof and rails, and that damage is permanent.</p>
<p>The CSC plate on each unit carries an allowable stacking weight, expressed for the accelerations a ship sees. On solid ground you are nowhere near those forces, so the plate is rarely the binding constraint on land. What binds you on land is the base, the wind and the fixings.</p>

<h2>The base is everything</h2>
<p>A single container on slightly uneven pads is a minor problem — a door that sticks. A stack on slightly uneven pads is a serious one, because the error is multiplied by height and because an unevenly supported bottom unit is carrying its load through two or three castings instead of four.</p>
<p>What a stack needs underneath it:</p>
<ul>
<li><strong>All four corners within a few millimetres of the same plane.</strong> Tighter than you would bother with for a single unit. Use a laser or a string line and a level, and get it right before anything is lifted on.</li>
<li><strong>Ground that will not settle.</strong> A slab or engineered pads. Not sleepers on soil, not blocks on fresh fill, not sand.</li>
<li><strong>Load spread properly.</strong> Two stacked 20fts put double the weight through the same four small castings, and more again if they are loaded. The pressure at each corner is the number that matters, not the total mass.</li>
</ul>
<p>If the base moves after the stack is up, correcting it is a crane job, not a jack job.</p>

<h2>Connecting the units</h2>
<p>Stacked containers are joined casting to casting with fittings designed for it.</p>
<ul>
<li><strong>Twist locks.</strong> The standard fitting. A cast body that drops into both castings and is turned to lock. Semi-automatic and manual types exist; for a static stack on land, manual twist locks or bridge fittings are the usual choice.</li>
<li><strong>Bridge fittings and stacking cones.</strong> Simpler devices that locate the units and stop lateral movement. Cones alone locate but do not resist uplift, which matters in wind.</li>
<li><strong>Bolted plates.</strong> Sometimes specified by an engineer where a certified connection is required.</li>
</ul>
<p>Whatever the fitting, all four corners get one. Three is not a stack, it is a hinge. And the bottom unit needs to be anchored to the ground in anything other than a sheltered site, because the whole assembly is now taller, catches more wind and has a higher centre of gravity.</p>

<h2>Wind, and why height changes the sums</h2>
<p>Doubling the height roughly doubles the area presented to a crosswind and raises the point that wind acts on, which increases the overturning moment far more than it increases the weight resisting it. An empty container stacked on an empty container in an exposed spot is a genuinely different proposition to one sitting alone.</p>
<p>Three sensible rules:</p>
<ol>
<li>Put the heavier, loaded unit on the bottom. Always. It lowers the centre of gravity and it is easier to load.</li>
<li>Anchor the base unit at the castings in cyclone regions, on ridges, near the coast, and anywhere the stack will spend time empty.</li>
<li>Orient the stack so the long side is not square to the prevailing wind if the site gives you the choice.</li>
</ol>

<h2>How the top one gets there, and how it gets down</h2>
<p>Placing a container on top of another is a crane job or a side loader job. A tilt-tray cannot do it — it slides units off backwards onto the ground and has no way to place at height.</p>
<p>Which means every stack has a second cost most people do not think about: getting the top unit off again. If access to the site changes, if a shed goes up alongside, or if trees grow into the swing path, the machine that put it up may not be able to take it down. Before you stack, ask yourself whether a truck with a boom can still stand in the same place in five years.</p>
<p>Loading the top unit is its own problem. Everything has to go up. In practice a stacked upper container works well for things that go in once and come out once — seasonal stock, archives, spares — and badly for anything you need weekly. If you plan to use the top unit regularly you need a way up to it: a platform, a landing, a forklift with a work cage, or stairs. That is a structure, and structures people climb need designing.</p>

<h2>Doors, and the detail that ruins stacks</h2>
<p>The doors on the upper unit open outward into thin air. Standing on the lower unit's roof to work them is not safe, and working from a ladder against a swinging steel door is worse.</p>
<p>The usual answers are to orient the upper container's doors over a platform or landing, or to accept that the top unit is loaded by crane or forklift from the front with a proper access arrangement. Decide this before the lift, because rotating a stacked container afterwards means bringing the machine back.</p>

<h2>When you need an engineer</h2>
<p>A stack should be designed and certified when any of these apply, and in practice a certifier will ask for it:</p>
<ul>
<li>Anyone will work on, in or beside the stack routinely.</li>
<li>It is on a commercial or construction site, where work health and safety obligations apply squarely.</li>
<li>It is in a cyclone region or on an exposed site.</li>
<li>It is more than two units high.</li>
<li>It is part of a structure, has a roof or walkway attached, or is joined to a building.</li>
<li>It sits near a boundary, a road, a footpath or anywhere failure would reach someone.</li>
</ul>
<p>The engineer establishes the design wind speed for the site, checks the bearing under each corner, and specifies the connections and the anchoring. On a commercial site that documentation is not bureaucracy — it is the thing that shows the arrangement was assessed by someone competent.</p>

<h2>The alternatives worth considering first</h2>
<p>Stacking is usually done for one of two reasons: not enough ground, or a wish to keep a footprint tidy. Both are legitimate, but check the alternatives, because a stack costs more to place, more to access and more to undo.</p>
<p>If the constraint is volume rather than area, a <a href="/high-cube-shipping-containers/">high cube</a> gives you 300 mm more height with no extra footprint and no lift. If the constraint is access, racking inside a single unit almost always wins over a second unit you have to climb to. If the constraint is genuinely land, then stack — and do it properly.</p>

<h2>Short checklist</h2>
<ol>
<li>Engineered, level base. All four corners in the same plane.</li>
<li>Both units sound at the castings and rails. A unit with a compromised casting must not be in a stack.</li>
<li>Heavier unit on the bottom.</li>
<li>Twist locks or bridge fittings at all four corners.</li>
<li>Base unit anchored where wind requires it.</li>
<li>Safe access designed before the lift, not improvised after.</li>
<li>Engineer's design and certificate where the triggers above apply.</li>
<li>A plan for how the top unit comes down again.</li>
</ol>
<p>If you are weighing a stack against a second unit on the ground, ring <strong>1300 467 776</strong> and describe the site. It is a five-minute conversation and it regularly saves a crane hire.</p>
`
  },
  {
    slug: "buying-a-container-interstate",
    title: "Buying a container in another state, without seeing it first",
    desc: "Buying a container remotely in Australia: which depot it comes from, the photographs to ask for, what to confirm before loading and what to check when it lands.",
    date: "2026-08-06",
    mins: 9,
    intro: "Most containers in this country are bought without the buyer ever standing in front of them, and that is fine — provided the right questions get asked in the right order. The risk is not distance. It is buying a description instead of a unit. Here is how to make a remote purchase as safe as walking a yard.",
    body: `
<h2>Start with where the unit is, not what it costs</h2>
<p>The first question in a remote purchase is which yard the container is standing in, because that decides most of what follows: what it costs to get to you, how quickly it can move, whether photographs are available today or next week, and whether you have any realistic option of inspecting it.</p>
<p>Our stock sits at the Cornubia yard and at depots through Gympie, Rockhampton, Mackay, Townsville, Cairns, Grafton, Darwin and Fremantle. When you ring, lead with the delivery address. A unit already sitting a few hundred kilometres from you is a different proposition to an identical unit on the other side of the continent, and there is no sense pricing the wrong one.</p>
<p>Sometimes the honest answer is that the right unit is not near you this week but will be. Stock rotates between depots. If your timing has any flexibility in it, say so — it occasionally changes the number.</p>

<h2>Get the grade in writing, in plain words</h2>
<p>The most common cause of disappointment in a remote purchase is a grade misunderstanding, not a defect. Words like "good", "tidy", "premium" and "A-grade" mean different things to different sellers and nothing at all in a dispute.</p>
<p>What you want stated plainly is which of three things you are buying: a new one-trip unit, a cargo-worthy used unit, or a unit sold as-is. Cargo-worthy and new are checked wind and watertight before they leave. As-is units are not sold watertight and may carry a patched repair, a soft section of floor or a door seal that no longer seats — which is entirely fine for steel, fencing, formwork and scrap, and not fine for anything that has to stay dry.</p>
<p>Have that grade written into the quote or the email. The <a href="/container-grades/">grades page</a> sets out what each one covers.</p>

<h2>The photographs to ask for</h2>
<p>Stock photos tell you nothing. What you want is the actual unit, and there are six shots that answer nearly every question.</p>
<ol>
<li><strong>The door end, closed.</strong> Shows the doors sitting square, the locking bars, the gaskets and the general condition of the frame.</li>
<li><strong>The interior, from the doors, looking to the far end.</strong> Shows the floor, the walls and any obvious repair.</li>
<li><strong>The floor, close, at both ends.</strong> Staining, delamination, lifting board edges, forklift gouges. This is the expensive part of a container to fix.</li>
<li><strong>The roof, from above or across it at a low angle.</strong> Ponding, patches, pinholes.</li>
<li><strong>The bottom rails, along both sides.</strong> Where containers actually die. Rot-through here is the thing you least want to discover on arrival.</li>
<li><strong>The CSC plate on the left-hand door.</strong> Gives you manufacture date, rated weights and the container's own number.</li>
</ol>
<p>We send photographs of the specific unit on request and before delivery, and if there is something wrong with a particular container we would rather point at it in a photo than let it turn up as a surprise. If a supplier will not photograph the floor and the bottom rails, that is information in itself.</p>

<h2>Questions worth asking before you order</h2>
<ul>
<li>Is this the exact unit I will receive, or a representative one from the same grade?</li>
<li>What is its container number, and does it match the photographs?</li>
<li>What year was it built?</li>
<li>Are the doors square and do all the locking bars work by hand?</li>
<li>Has the floor been repaired, and has the roof been patched? Welded or taped?</li>
<li>Is it high cube or standard height? Confirm against the ISO code, not the description.</li>
<li>Is the price ex GST, and is cartage included?</li>
<li>What happens if the truck arrives and cannot place?</li>
</ul>
<p>The first two are the important ones. There is a real difference between buying a specific unit and buying "a cargo-worthy 20ft", and both are legitimate — you just need to know which you have agreed to.</p>

<h2>Describe your site as carefully as you interrogate the container</h2>
<p>The other half of a remote purchase is the half most people skip. We cannot see your block either.</p>
<p>Four measurements decide every delivery: how much straight, level run there is behind the placement spot; the narrowest pinch point on the route in; what is overhead along the route, including power lines and branches; and whether the ground will carry a loaded truck. Walk it as if you were the truck and write the four numbers down.</p>
<p>Then send three photographs the other way. One from the road, shot straight up the access. One taken standing on the placement spot, aimed back along the route the truck has to travel. And one wide frame of the spot itself, showing the surface underfoot and the air overhead. Between those and the four measurements, we can tell you which truck suits before anyone books anything. The <a href="/delivery/">delivery page</a> covers what each vehicle needs.</p>
<p>Regional and remote deliveries carry a bit more planning: unsealed access, wet-season road conditions, station gates, and the fact that a rescheduled run in some parts of the country is a week rather than a day. Say what you know about the last stretch, including how long it takes to dry out.</p>

<h2>Inspection by arrangement, if you want it</h2>
<p>The Cornubia yard at 51-55 Bromley Street is a walk-in yard — ring first, drive over, open the doors and look down the floor yourself. It is open Monday to Friday 7:30am to 5pm and Saturday morning.</p>
<p>The other depots are third-party yards, so inspection at those is by arrangement rather than drop-in. If you want to look at a unit at Rockhampton, Mackay, Cairns, Darwin or any of the others, ask and we will organise it. It takes a phone call and some notice, and for a large purchase it is worth doing.</p>

<h2>What to check the moment it lands</h2>
<p>Do this while the truck is still there if you can, and before you start loading.</p>
<ol>
<li><strong>Container number.</strong> Confirm it matches what you were sold.</li>
<li><strong>Open and close both doors.</strong> All eight locking bars, by hand, full travel.</li>
<li><strong>Walk the floor.</strong> Put weight through your heel every metre. You are feeling for give.</li>
<li><strong>Shut yourself inside for thirty seconds.</strong> Let your eyes adjust and look for daylight through the roof, the walls and around the doors. This one check answers more questions than any other.</li>
<li><strong>Check it is sitting on all four pads</strong> and that the corners are level. Fix this now, not in a year when the doors have stopped closing.</li>
<li><strong>Photograph it as delivered.</strong> Five minutes, and it settles any question that comes up later.</li>
</ol>
<p>If something is not as described, ring straight away rather than after the weekend. Problems raised on the day are far easier to resolve than problems raised a month in, and we would rather hear about it immediately.</p>

<h2>Paying, and the ordinary safeguards</h2>
<p>Nothing here is specific to containers, but remote purchases of large steel objects attract the same scams as everything else online. Deal with a business that has a real address, a landline or a proper business number, and an ABN you can look up. Be wary of anyone who only wants to communicate by text, cannot photograph the unit, or is well below every other quote for a grade they cannot describe.</p>
<p>Expect an invoice, in the business's name, with the grade, size, unit details and cartage set out separately, and GST shown properly.</p>

<h2>Getting a straight quote quickly</h2>
<p>Have four things ready and you will get a real number in one conversation: the delivery address, what is going in the container, the size and grade you think you want, and the four access measurements. Ring <strong>1300 467 776</strong> or send it through the <a href="/contact/">contact page</a>. Every enquiry is answered by a person within one business day, and if the container you have asked for is the wrong one for the job you have described, you will be told that before the invoice goes out, not after.</p>
`
  }
];
