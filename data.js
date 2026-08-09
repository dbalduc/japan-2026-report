/* ============================================================================
   JAPAN 2026 — CONTENT FILE
   ----------------------------------------------------------------------------
   This is the only file you normally need to touch.
   Photos live in images/, audio in audio/, video in video/.

   TO ADD A PHOTO
     {t:'photo', src:'d3-15-whatever.jpg', cap:'Your caption.'}
     Add  wide:true  to break it out full-bleed.

   TO ADD A ROW OF PHOTOS
     {t:'gal', cols:3, items:[{src:'a.jpg',cap:'A.'},{src:'b.jpg',cap:'B.'}]}

   LINK SYNTAX INSIDE TEXT
     [[fushimi-inari|the mountain]]  →  linked, with a hover fact
     [[churaumi]]                    →  linked, uses the default display name
   ========================================================================== */

const LINKS = {
  'shibuya-crossing':{name:'Shibuya Crossing',url:'https://en.wikipedia.org/wiki/Shibuya_Crossing',fact:'The scramble opened in 1973; a weekend day can push about 390,000 people across it.'},
  'shibuya-sky':{name:'Shibuya Sky',url:'https://www.gotokyo.org/en/spot/1749/index.html',fact:'The open-air rooftop sits 229 m up and looks straight down onto the scramble.'},
  'tsukiji':{name:'Tsukiji Outer Market',url:'https://www.tsukiji.or.jp/english/',fact:'Tsukiji inherited the fish trade after the 1923 earthquake destroyed the Nihonbashi market.'},
  'teamlab':{name:'teamLab Planets',url:'https://www.teamlab.art/e/planets/',fact:'Opened 2018; holds the Guinness record as the most-visited museum devoted to one art group.'},
  'sensoji':{name:'Sensō-ji',url:'https://www.senso-ji.jp/english/',fact:'Legend says two fishermen netted a Kannon statue from the Sumida in 628. It has stayed hidden ever since.'},
  'gotokuji':{name:'Gōtoku-ji',url:'https://gotokuji.jp/en/manekineko/',fact:'A cat beckoned Lord Ii Naotaka out of a thunderstorm here. Grateful, he funded the temple in 1633.'},
  'fukudaya':{name:'Fukuda-ya',url:'https://tabelog.com/en/tokyo/A1318/A131813/13074219/',fact:'ふくだ屋 — the neighbourhood soba-ya between Gōtokuji and Kyōdō stations in Setagaya.'},
  'meiji-jingu':{name:'Meiji Jingū',url:'https://www.meijijingu.or.jp/en/',fact:'The 70-hectare forest is entirely man-made: 120,000 donated trees, 365 species, planted from 1920.'},
  'hachiko':{name:'Hachikō',url:'https://en.wikipedia.org/wiki/Hachik%C5%8D',fact:'The original 1934 statue was melted down for the war in 1945. This one went up in 1948.'},
  'churaumi':{name:'Churaumi Aquarium',url:'https://churaumi.okinawa/en/',fact:'Churaumi has kept whale sharks since 1980 — one individual for more than 26 years.'},
  'kerama':{name:'the Kerama Islands',url:'https://www.env.go.jp/en/nature/nps/park/kerama/index.html',fact:'Japan’s 31st national park, designated 2014. Its reefs hold 248 coral species — about 62% of Japan’s total.'},
  'bise':{name:'the Bise fukugi tree road',url:'https://www.ana.co.jp/en/us/japan-travel-planner/okinawa/0000016.html',fact:'Around 20,000 fukugi, some over 300 years old, planted as windbreaks around a feng-shui-planned village.'},
  'kouri':{name:'Kouri Island',url:'https://visitokinawajapan.com/destinations/okinawa-main-island/northern-okinawa-main-island/kouri-island/',fact:'Okinawan folklore makes Kouri humankind’s birthplace — two lovers in a sea cave.'},
  'kiyomizu':{name:'Kiyomizu-dera',url:'https://www.kiyomizudera.or.jp/en/',fact:'The 13-metre wooden stage was built without a single nail. The three-stream Otowa waterfall gives the temple its “pure water” name.'},
  'sannenzaka':{name:'Sannenzaka',url:'https://www.the-kansai-guide.com/en/directory/item/11959/',fact:'Superstition says anyone who stumbles on these steps dies within three years. Hence “Three-Year Slope.”'},
  'yasaka-shrine':{name:'Yasaka Shrine',url:'https://www.yasaka-jinja.or.jp/en/',fact:'One tradition dates it to 656. Its Utsukushi Gozensha sub-shrine dispenses beauty water for skin and mind.'},
  'yasaka-pagoda':{name:'the Yasaka Pagoda',url:'https://en.wikipedia.org/wiki/Yasaka_Pagoda',fact:'The site is 7th-century; the five-storey pagoda standing there now was rebuilt in 1440.'},
  'fushimi-inari':{name:'Fushimi Inari Taisha',url:'https://inari.jp/en/',fact:'Inari was enshrined here in 711. Worshippers have donated the vermilion torii since the Edo period.'},
  'gion-matsuri':{name:'Gion Matsuri',url:'https://www.gionfestival.org/yamaboko-floats/ato-matsuri/',fact:'The Ato Matsuri’s eleven floats parade on July 24 — a second procession revived in 2014.'},
  'kinkakuji':{name:'Kinkaku-ji',url:'https://www.shokoku-ji.jp/en/kinkakuji/about/',fact:'Shogun Ashikaga Yoshimitsu built it around 1397 as a relic hall: Shakyamuni below, Kannon above.'},
  'arashiyama':{name:'the Arashiyama bamboo grove',url:'https://www.japan.travel/en/spot/1141/',fact:'The Sagano grove adjoins Nonomiya Shrine, an ancient purification site.'},
  'shimogamo':{name:'Shimogamo Shrine',url:'https://www.shimogamo-jinja.or.jp/english/',fact:'On the Day of the Ox, worshippers wade candle-in-hand through Mitarai Pond. Mitarashi dango mimic its bubbles.'},
  'shinkansen':{name:'the Tōkaidō Shinkansen',url:'https://en.wikipedia.org/wiki/Tokaido_Shinkansen',fact:'Opened 1964 as the world’s first high-speed line. In 2019 the average delay was twelve seconds.'},
  'pontocho':{name:'Pontochō',url:'https://en.wikipedia.org/wiki/Ponto-ch%C5%8D',fact:'The name borrows Portuguese “ponte.” Geiko and maiko have worked this alley since the 16th century.'},
  'kaiseki':{name:'kaiseki',url:'https://en.wikipedia.org/wiki/Kaiseki',fact:'The name recalls Zen monks tucking a warm stone into their robes to blunt hunger while fasting.'},
  'awamori':{name:'kūsu',url:'https://okinawa-awamori.or.jp/kusu/?lang=en',fact:'Distilled with black koji in Okinawa since 1429. Aged three years or more, awamori earns the name kūsu.'},
  'manta':{name:'reef manta',url:'https://en.wikipedia.org/wiki/Reef_manta_ray',fact:'Only confirmed as a separate species in 2009. It has the largest brain of any cold-blooded fish.'},
  'green-turtle':{name:'green turtle',url:'https://www.fisheries.noaa.gov/species/green-turtle',fact:'Named for the green fat under its shell — the only sea turtle whose adults eat mainly plants.'},
  'whale-shark':{name:'whale sharks',url:'https://en.wikipedia.org/wiki/Whale_shark',fact:'The largest living fish; one verified female reached 18.8 m. Individuals are ID’d by spot patterns.'},
  'kabutomushi':{name:'kabutomushi',url:'https://en.wikipedia.org/wiki/Trypoxylus_dichotomus',fact:'A male’s horn is a third of his body length and works as a lever to flip rivals off branches.'},
  'sea-krait':{name:'banded sea krait',url:'https://en.wikipedia.org/wiki/Laticauda_colubrina',fact:'Hunts alongside trevally, flushing prey from crevices — then returns to land to digest.'},
  'maneki-neko':{name:'maneki-neko',url:'https://en.wikipedia.org/wiki/Maneki-neko',fact:'A raised left paw beckons customers, a right paw money. The earliest known depiction is an 1852 Hiroshige print.'},
  'omikuji':{name:'omikuji',url:'https://en.wikipedia.org/wiki/O-mikuji',fact:'Bad fortunes get tied to pines because matsu means both “pine” and “to wait” — the misfortune waits behind.'},
  'nagashi-somen':{name:'nagashi sōmen',url:'https://www.mlit.go.jp/tagengo-db/en/H30-01360.html',fact:'Born at Takachiho in 1955, when a restaurateur piped waterfall water down bamboo gutters to chill noodles.'},
  'smiski':{name:'Smiskis',url:'https://en.wikipedia.org/wiki/Smiski',fact:'Launched 2015. The name comes from sumi, “corner” — where these glow-in-the-dark figures hide.'},
  'konbini':{name:'konbini',url:'https://www.nationalgeographic.com/travel/article/what-is-japans-konbini-food-and-why-is-it-taking-the-internet-by-storm',fact:'Roughly 56,000 konbini serve Japan — about one per 2,200 people.'}
};

const CREATURES = [
  {e:'🦊',n:'fox',k:'fushimi-inari'},
  {e:'🐈',n:'the cats of Gōtoku-ji',k:'maneki-neko'},
  {e:'🪲',n:'rhinoceros beetle',k:'kabutomushi'},
  {e:'🐢',n:'green turtle',k:'green-turtle',star:true},
  {e:'🐍',n:'banded sea krait',k:'sea-krait'},
  {e:'🐟',n:'THE MANTA',k:'manta',star:true},
  {e:'🐋',n:'whale sharks',k:'whale-shark'},
  {e:'🦋',n:'“Mothra”',k:null}
];

const DAYS = [

/* ══════════════════════════ DAY 1 ══════════════════════════ */
{
  n:1, date:'Friday, July 17', route:'Tokyo',
  title:'The empty crossing',
  blocks:[
    {t:'lead', html:'Wheels down at Haneda at 4:25 in the morning off the overnight from SFO. Keikyū into Shibuya, bags dropped, and then straight back out the door on no sleep — because there is exactly one hour in the whole week when [[shibuya-crossing|the crossing]] is empty, and we were awake for it.'},
    {t:'photo', src:'d1-02-shibuya-crossing-dawn.jpg', wide:true, ar:'3/4',
     cap:'<b>6:23 AM. The hero shot.</b> Blue Osprey, white headphones, and maybe nine other people on the whole scramble. Twelve hours later this exact concrete is 3,000 people a light cycle.'},
    {t:'gal', cols:2, items:[
      {src:'d1-01-arrival-plane.jpg', cap:'4:01 AM, still in the aisle. Ten days start here.'},
      {src:'d1-03-shibuya-towers.jpg', cap:'Looking up at Scramble Square in the morning haze.'}
    ]},
    {t:'text', html:'Breakfast at [[tsukiji|Tsukiji Outer Market]] once the stalls woke up. The inner wholesale market moved to Toyosu in 2018, but the outer market never left — a few blocks of tamagoyaki, uni, knives and dried everything, and a two-storey tuna painted on the side of a building in case you forgot why you came.'},
    {t:'gal', cols:3, items:[
      {src:'d1-04-tsukiji-stall.jpg', cap:'7:31. Skewers by the metre.'},
      {src:'d1-05-tsukiji-sage.jpg', cap:'First real meal in Japan, eaten standing up.'},
      {src:'d1-06-tsukiji-tuna.jpg', cap:'本まぐろ. 24 hours, right here.'}
    ]},
    {t:'text', html:'Hot afternoon, so it became a shopping day early. <strong>SONIANDSMI</strong> on Jinnan — the pink-and-mint one — where four [[smiski|Smiskis]] came off the wall inside ten minutes. Then <strong>PARCO 6F</strong>, an entire floor given over to Pokémon Center, Nintendo Tokyo and the JoJo store. The JoJo store was the big hit and set the tone for the whole trip.'},
    {t:'gal', cols:3, items:[
      {src:'d1-07-soniandsmi.jpg', cap:'SONIANDSMI, Jinnan. 10:51.'},
      {src:'d1-08-smiski.jpg', cap:'“Tiny creatures that live in corners.” Four of them came home.'},
      {src:'d1-09-pokemon-center.jpg', cap:'PARCO 6F.'}
    ]},
    {t:'video', src:'d1-gigo-claw.mp4', label:'Claw machine, day one — the opening skirmish'},
    {t:'text', html:'Ninety-minute massages for both of us at <strong>Arona Spa</strong> in Udagawachō; Sage added a facial. Correct call after a red-eye. Dinner was an audible — Usagi was closed, so <strong>Oreryū Shio Ramen</strong> instead, and it landed. Umeshu nightcap. Then [[shibuya-sky|Shibuya Sky]] at 8:40, with the beams firing straight up into low cloud.'},
    {t:'photo', src:'d1-10-shibuya-sky-beams.jpg', wide:true, ar:'3/2',
     cap:'<b>229 metres up, 9 PM.</b> The rooftop is open-air with no glass on the edge — just a net and a lot of trust.'},
    {t:'gal', cols:3, items:[
      {src:'d1-11-shibuya-sky-down.jpg', cap:'Straight down onto the crossing we had to ourselves fifteen hours earlier.'},
      {src:'d1-12-shibuya-sky-pano.jpg', cap:'Tokyo, all of it, to the horizon.'},
      {src:'d1-13-shibuya-sky-sage.jpg', cap:'Day one, and already fully operational on zero sleep.'}
    ]}
  ]
},

/* ══════════════════════════ DAY 2 ══════════════════════════ */
{
  n:2, date:'Saturday, July 18', route:'Tokyo',
  title:'Water, mirrors, and six traversals',
  blocks:[
    {t:'lead', html:'FamilyMart breakfast at eight, then Hanzōmon → Yūrakuchō → Yurikamome out to [[teamlab|teamLab Planets]] for a 10 AM entry. Sage’s one-word review: <em>epic</em>.'},
    {t:'photo', src:'d2-01-konbini-breakfast.jpg',
     cap:'The [[konbini]] cold case at 8:11. An entire food culture in one refrigerated aisle.'},
    {t:'photo', src:'d2-02-teamlab-flower-garden.jpg', ar:'3/4',
     cap:'<b>The Floating Flower Garden. Top three of the trip.</b> Thirteen thousand living orchids on motorised rigs that lift as you walk under them, so the ceiling opens around you and closes behind.'},
    {t:'gal', cols:3, items:[
      {src:'d2-03-teamlab-water.jpg', cap:'Knee-deep and barefoot, koi breaking into flowers where you step.'},
      {src:'d2-04-teamlab-crystal.jpg', cap:'Infinite Crystal Universe.'},
      {src:'d2-05-teamlab-lights.jpg', cap:'You go through the whole building with your shoes in a locker.'}
    ]},
    {t:'video', src:'d2-teamlab-water.mp4', label:'The water room'},
    {t:'video', src:'d2-teamlab-flowers.mp4', label:'Petals, falling upward'},
    {t:'text', html:'Lunch at <strong>Harajuku Gyōzarō</strong>, then a split: Sage solo at the <strong>Brandy Melville</strong> flagship on Cat Street while Dave hit <strong>Tokyo Beer Lab</strong> and picked up Nathan’s pint glass. Regrouped for <strong>Onitsuka Tigers</strong> on Omotesandō — Jen’s pair — then Body Shop, a three-storey Zara, and PARCO round two for more JoJo merch and the first Labubu.'},
    {t:'gal', cols:2, items:[
      {src:'d2-06-cat-street.jpg', cap:'Cat Street, 2 PM.'},
      {src:'d2-07-onitsuka.jpg', cap:'Onitsuka Tigers, Omotesandō. Wall of them.'}
    ]},
    {t:'text', html:'Dinner at <strong>Mizutaki Hatano</strong> — private room, nomihōdai, the famous eggplant, and [[nagashi-somen|nagashi sōmen]], which arrives down a length of bamboo and has to be caught with chopsticks on the way past. Invented in 1955 by a restaurateur at Takachiho who ran waterfall water through bamboo gutters to keep noodles cold. Verdict: crushed.'},
    {t:'video', src:'d2-nagashi-somen.mp4', label:'Nagashi sōmen — catch it or lose it'},
    {t:'divider'},
    {t:'text', html:'And then Saturday night at the crossing. Not once — <strong>six full traversals</strong>, every direction, until we’d walked the whole compass. Same intersection as twenty hours earlier. Unrecognisable.'},
    {t:'video', src:'d2-shibuya-crossing-sat.mp4', label:'Saturday night, 21:15'},
    {t:'photo', src:'d2-08-famichiki-poster.jpg',
     cap:'FamilyMart’s 45th-anniversary Famichiki poster, spotted at 20:55. Filed away. Becomes important on Day 8.'}
  ]
},

/* ══════════════════════════ DAY 3 ══════════════════════════ */
{
  n:3, date:'Sunday, July 19', route:'Tokyo',
  title:'Cats, and the best shrimp of her life',
  blocks:[
    {t:'lead', html:'Dawn FamilyMart run: two Famichiki delivered to Sage’s bedside, plus grapefruit soda and peach jelly. This is how you get a night owl vertical before seven. Then a 6:30 AM FaceTime home from the middle of the crossing, with post-club stragglers wandering past and a store somewhere blasting <em>Ring of Fire</em> at nobody.'},
    {t:'text', html:'Ginza line up to [[sensoji|Sensō-ji]] in Asakusa — Tokyo’s oldest temple, founded on a statue two fishermen supposedly pulled out of the Sumida River in the year 628. Nobody has seen it since; it has been a hidden image for thirteen centuries.'},
    {t:'gal', cols:3, items:[
      {src:'d3-01-sensoji-pagoda.jpg', cap:'The five-storey pagoda, 9:27.'},
      {src:'d3-02-sensoji-omikuji.jpg', cap:'Drawing [[omikuji]] at the shaker. First fortune of the trip.'},
      {src:'d3-03-sensoji-hall.jpg', cap:'The main hall.'}
    ]},
    {t:'photo', src:'d3-04-sensoji-grounds.jpg',
     cap:'Same pagoda, other side, cloud finally breaking.'},
    {t:'text', html:'Then out to Setagaya for [[gotokuji|Gōtoku-ji]]. This is the origin story of the beckoning cat: a feudal lord sheltered here from a thunderstorm after a cat waved him in from the gate, and he endowed the temple out of gratitude in 1633. Visitors have been leaving cats ever since. There are now thousands of them, stacked on tiered shelves, all facing the same way.'},
    {t:'photo', src:'d3-05-gotokuji-manekineko.jpg', wide:true, ar:'3/2',
     cap:'<b>Gōtoku-ji.</b> Every one of these was left by someone whose wish came true. Note the paw: [[maneki-neko|left paw up]] beckons people, right paw beckons money. These are all left.'},
    {t:'gal', cols:2, items:[
      {src:'d3-06-gotokuji-cats.jpg', cap:'Ranks on ranks, going up the hill.'},
      {src:'d3-07-gotokuji-lotus.jpg', cap:'Lotus in the temple pond, noon.'}
    ]},
    {t:'text', html:'Lunch was the sleeper hit of the whole trip: an unplanned neighbourhood soba-ya near the temple. Kitsune udon, the best tofu Sage had ever eaten, and soba with tempura that produced the phrase <em>best shrimp of my life</em>. For nine months we couldn’t remember the name of the place — until we looked closely at this photo. It’s printed on the tray. <strong>[[fukudaya|ふくだ屋 — Fukuda-ya]]</strong>, between Gōtokuji and Kyōdō stations.'},
    {t:'photo', src:'d3-08-fukudaya-udon.jpg', wide:true, ar:'4/3',
     cap:'<b>Kitsune udon at Fukuda-ya, 13:06.</b> Look at the bottom edge of the tray — ふくだ屋, and a phone number. Case closed.'},
    {t:'text', html:'[[meiji-jingu|Meiji Jingū]] as an afternoon audible. Worth knowing while you’re standing in it: the forest is not old growth. It is entirely man-made — 120,000 trees of 365 species, donated from every prefecture and planted from 1920, engineered to grow into something that would look eternal within a century. It worked. Somewhere in the middle of it a wild [[kabutomushi]] flew straight past us.'},
    {t:'photo', src:'d3-09-meiji-sake-barrels.jpg',
     cap:'The consecrated sake barrels on the approach, donated by brewers the country over.'},
    {t:'text', html:'Evening: Ruru Café and its water table, record shops where Dave mandated two Japan-only pressings, GiGO claw machines, and Tower Records — where a K-pop takeover had swallowed the café, which is how Dave found the hidden 12-tap <strong>Tower Records Beer</strong> bar upstairs. Kura Sushi #722 to close. Sage confirmed, definitively, that she hates natto.'},
    {t:'gal', cols:3, items:[
      {src:'d3-10-gigo-claw.jpg', cap:'GiGO. The vendetta continues.'},
      {src:'d3-11-tower-records-booth.jpg', cap:'NO MUSIC, NO LIFE.'},
      {src:'d3-12-tower-records-beer.jpg', cap:'Twelve taps, hidden inside a record store.'}
    ]},
    {t:'photo', src:'d3-13-kura-sushi.jpg',
     cap:'Kura Sushi #722, 21:17. えびマヨ under the dome.'},
    {t:'divider'},
    {t:'text', html:'And then back out to the crossing one more time, near half ten on a Sunday night, which in Shibuya is still peak.'},
    {t:'photo', src:'d3-14-shibuya-crossing-night.jpg', wide:true, ar:'9/16', egg:true,
     cap:'<b>21:31.</b> Mid-scramble, arms out, several hundred people waiting on the far kerb for their turn.'},
    {t:'video', src:'d3-shibuya-crossing-sun.mp4', label:'The whole crossing, end to end'}
  ]
},

/* ══════════════════════════ DAY 4 ══════════════════════════ */
{
  n:4, date:'Monday, July 20', route:'Tokyo → Okinawa',
  title:'Clawmaggedon',
  blocks:[
    {t:'lead', html:'FamilyMart breakfast, trains to Haneda, two and a half hours south to Naha. Same country, completely different country. Picked up the IONIQ 5 at OTS and discovered that first-time left-side driving on Route 58 is genuinely hard. Not charming-hard. Hard.'},
    {t:'text', html:'Checked into Hotel Noah in Ginowan. Lunch was <strong>Lawson fried chicken</strong>, which completed the [[konbini]] trilogy: 7-Eleven on Day 1, FamilyMart on Days 2 and 3, Lawson on Day 4. A rigorous, controlled study.'},
    {t:'photo', src:'d4-01-tropical-beach.jpg', wide:true, ar:'3/2',
     cap:'<b>Tropical Beach, Ginowan, 16:36.</b> First contact with the Okinawan ocean, and eighteen hours out from the good stuff.'},
    {t:'text', html:'Superstore run for sunscreen and detergent. Dinner at <strong>CoCo Ichibanya</strong>, which happened to sit next door to a warehouse-scale claw machine arcade. What started as a quick look escalated over the evening from <strong>Claw Palace</strong> to <strong>Clawpocalypse Now</strong> to, finally, <strong>Clawmaggedon</strong>.'},
    {t:'photo', src:'d4-02-clawmaggedon.jpg',
     cap:'21:23. Clawmaggedon. The machine lost.'},
    {t:'text', html:'Bought a giant peach on the way out, specifically for tomorrow’s boat.'}
  ]
},

/* ══════════════════════════ DAY 5 ══════════════════════════ */
{
  n:5, date:'Tuesday, July 21', route:'The Kerama Islands',
  title:'THE KERAMA DIVE',
  blocks:[
    {t:'lead', html:'Ginowan Marina at 7:45. Met the crew and our guide, Sam. Three tanks out in [[kerama|the Keramas]] — glassy seas, full sun, 26°C water on every dive, twenty-five to thirty metres of visibility all day. This was the day the whole trip was built around, and it paid off on the third tank.'},
    {t:'photo', src:'d5-01-kerama-blue.jpg', wide:true, ar:'3/2',
     cap:'<b>11:21, between dives.</b> The water out here has its own name — Kerama Blue. The park was designated in 2014 and holds 248 coral species, about 62% of everything Japan has.'},
    {t:'dive'},
    {t:'photo', src:'d5-04-dive-slate.jpg', wide:true, ar:'4/3',
     cap:'<b>Sam’s slate.</b> All three sites, entry and exit times, max and average depth, viz, temp, and a highlights column that ends — bottom right, underlined, with a doodle — <em>MANTA!</em>'},
    {t:'text', html:'Dive one at Kuefu: a [[green-turtle]] that let Sage get close enough for the photo of her life, blue tang, and a [[sea-krait]] threading the reef. Dive two at Mae-jima — clownfish working an anemone the size of a car bonnet, and a garden eel colony standing up out of the sand like grass.'},
    {t:'gal', cols:2, items:[
      {src:'d5-02-green-turtle.jpg', cap:'Sage’s green turtle. Kuefu, dive 1, 9:16.'},
      {src:'d5-03-clownfish-anemone.jpg', cap:'Mae-jima, dive 2, 10:32.'}
    ]},
    {t:'text', html:'And then the drift at Kuro-jima. Giant trevally and blue-fin trevally first, and then a [[manta|reef manta]] came in off the blue and flew the length of the group. Caught clean on the GoPro. After 350-odd dives between the two of us, still the best thing either of us has seen underwater.'},
    {t:'photo', src:'d5-05-manta.jpg', wide:true, ar:'16/9',
     cap:'<b>THE MANTA.</b> Kuro-jima, West Drift, 18.7 m, 12:10. Standard reef manta, not a black morph. The single irreplaceable frame of the trip.'},
    {t:'photo', src:'d5-06-manta-approach.jpg', wide:true, ar:'16/9',
     cap:'Ninety seconds earlier, coming in over the reef.'},
    {t:'video', src:'d5-manta.mp4', label:'THE MANTA — GoPro, dive 3', note:'19 seconds. Colour-corrected — the original GoPro file is heavily magenta at depth.'},
    {t:'text', html:'Twin-tail fighter overhead near Kadena on the ride back in. Then the drive north to Motobu, and a walk down [[bise|the Bise fukugi tree road]] at dusk on the way to dinner — twenty thousand trees planted as typhoon windbreaks around a village laid out by feng shui, some of them three centuries old.'},
    {t:'gal', cols:2, items:[
      {src:'d5-07-motobu-sunset.jpg', cap:'19:05, looking west off the point.'},
      {src:'d5-08-bise-fukugi.jpg', cap:'The fukugi road at 19:30. It stays this dark all the way through.'}
    ]},
    {t:'text', html:'Dinner at <strong>Yakitori Izakaya Akari</strong> — beni-imo purple sweet potato salad, wood-fired Yanbaru chicken. Toasted the manta with Kikunotsuyu VIP Gold [[awamori|kūsu]] on the rocks, which is awamori aged past three years and tastes like it knows something.'},
    {t:'photo', src:'d5-09-akari.jpg',
     cap:'Akari, 19:39. Tatami, low tables, and one of the better meals of the trip.'},
    {t:'text', html:'Walking back, a single cicada out-competed the entire island. We named it Mothra.'},
    {t:'audio', src:'d5-mothra.mp3', label:'Mothra', sub:'One cicada. Motobu, after dark.'}
  ]
},

/* ══════════════════════════ DAY 6 ══════════════════════════ */
{
  n:6, date:'Wednesday, July 22', route:'Motobu',
  title:'The other mantas',
  blocks:[
    {t:'lead', html:'Three loads of laundry and a hotel breakfast buffet Sage rated “good and authentic,” which from her is high praise. Then [[churaumi|Churaumi Aquarium]], ten minutes up the road.'},
    {t:'photo', src:'d6-01-whale-shark.jpg', wide:true, ar:'3/2',
     cap:'<b>The Kuroshio Sea tank, 11:46.</b> Churaumi has kept [[whale-shark|whale sharks]] since 1980 — longer than anywhere on earth, one individual for more than 26 years.'},
    {t:'gal', cols:2, items:[
      {src:'d6-02-kuroshio-tank.jpg', cap:'Seven and a half metres of acrylic, 60 cm thick, and everybody in Okinawa standing in front of it.'},
      {src:'d6-03-churaumi-mantas.jpg', cap:'Whale shark and mantas in the same frame.'}
    ]},
    {t:'text', html:'The captive mantas here bookended Tuesday’s wild one in a way that was hard not to think about. Same animal, same species, one seen from six metres away in open water on a drift and one behind glass on a loop. Both worth seeing. Not remotely the same experience.'},
    {t:'text', html:'Afternoon across the Kouri Bridge — two kilometres of causeway over impossibly clear shallows — to [[kouri|Kouri Island]] and Heart Rock. Local folklore puts the origin of humanity here: two lovers in a sea cave, an Okinawan Adam and Eve.'},
    {t:'photo', src:'d6-04-heart-rock.jpg', wide:true, ar:'3/4',
     cap:'<b>Heart Rock, Tinu Beach, 15:21.</b> Two stacks, and from exactly one angle on the sand they line up into a heart.'},
    {t:'photo', src:'d6-05-orion-sunset.jpg', wide:true, ar:'3/2',
     cap:'19:12 from the hotel lawn. Dinner at the BBQ place after. Gorilla Chop got cut from the schedule on sight.'}
  ]
},

/* ══════════════════════════ DAY 7 ══════════════════════════ */
{
  n:7, date:'Thursday, July 23', route:'Okinawa → Kyoto',
  title:'Kyoto in one afternoon',
  blocks:[
    {t:'lead', html:'Early drive south, car returned, flight to Itami, limousine bus into Kyoto. Into the room at the ryokan at 2:15 — a full hour ahead of plan, which we spent immediately and well.'},
    {t:'photo', src:'d7-01-sannenzaka.jpg', ar:'3/4',
     cap:'<b>[[sannenzaka|Sannenzaka]], 16:00.</b> The name means “three-year slope,” and the superstition is that if you trip on these stones you die within three years. Everybody walks it carefully.'},
    {t:'photo', src:'d7-10-sannenzaka-crowd.jpg', ar:'3/4',
     cap:'Same step, same second, before the crowd got edited out of it. Sannenzaka in late July is not a quiet street.'},
    {t:'text', html:'Straight up the slope for the pottery run: matcha bowls, whisk, whisk holder, chopsticks, candy — every single thing on Jen and JQ’s list, cleared in one walk.'},
    {t:'text', html:'[[kiyomizu|Kiyomizu-dera]] next, and a drink from the Otowa waterfall the temple is named for. The main hall’s thirteen-metre stage is built out over the hillside without a single nail in it.'},
    {t:'gal', cols:2, items:[
      {src:'d7-02-kiyomizu-gate.jpg', cap:'Up through the Niōmon, 17:13.'},
      {src:'d7-05-otowa-waterfall.jpg', cap:'Otowa. Three streams, long-handled cups, one sip each.'}
    ]},
    {t:'photo', src:'d7-03-kiyomizu-view.jpg', wide:true, ar:'3/2',
     cap:'<b>17:35.</b> The three-storey pagoda from inside the grounds, with the whole city and the far hills behind it.'},
    {t:'photo', src:'d7-04-kiyomizu-grounds.jpg',
     cap:'Higashiyama does this — you are in a city of 1.4 million and then suddenly you are not.'},
    {t:'text', html:'<strong>Mochi Mochi</strong> on the way down, where the hand-pounding is genuinely violent: one person swinging the mallet, one person turning the mochi between swings, both moving fast enough that it looks staged and neither of them looking worried.'},
    {t:'photo', src:'d7-06-mochi-pounding.jpg', wide:true, ar:'4/3',
     cap:'<b>18:10.</b> Mallet at the top of the arc. Her hand is in the bowl on the beat before this one and the beat after.'},
    {t:'text', html:'[[yasaka-pagoda|Yasaka Pagoda]] at golden hour, then [[yasaka-shrine|Yasaka Shrine]], where both of us got beautified at the biyōsui fountain and dropped a coin into the sacred spring.'},
    {t:'photo', src:'d7-07-yasaka-pagoda.jpg', wide:true, ar:'3/4',
     cap:'<b>Hōkan-ji, 18:20.</b> The site is 7th-century; this pagoda was rebuilt in 1440 and has outlasted nearly everything around it.'},
    {t:'text', html:'Dinner: <strong>Tententen</strong> in [[pontocho|Pontochō]], where we got the last two summer <em>hiyashi tendon</em> of the night — hot tempura sitting under a block of melting dashi ice.'},
    {t:'quote', html:'Rocked balls.', cite:'Official verdict'},
    {t:'gal', cols:2, items:[
      {src:'d7-08-kamogawa-dusk.jpg', cap:'The Kamo at 19:29, with the summer kawayuka platforms out over the water.'},
      {src:'d7-09-pontocho.jpg', cap:'Pontochō, a minute later. The alley is about two metres wide.'}
    ]},
    {t:'text', html:'Walk home down the Kiyamachi canal. Hinoki bath. Asleep fast, which mattered, because of what tomorrow opened with.'}
  ]
},

/* ══════════════════════════ DAY 8 ══════════════════════════ */
{
  n:8, date:'Friday, July 24', route:'Kyoto',
  title:'The big one',
  blocks:[
    {t:'lead', html:'First taxi of the morning to [[fushimi-inari|Fushimi Inari]]. Empty gates, nobody on the path, early light coming through the vermilion. And then we didn’t stop at the Senbon Torii like everyone does — we took the whole mountain, three miles up to the summit at Ichinomine, 233 metres, on no sleep. Base to summit sign in an hour flat.'},
    {t:'photo', src:'d8-02-fushimi-empty-torii.jpg', wide:true, ar:'3/4',
     cap:'<b>07:07.</b> Every one of these torii was paid for by a business or a family, name and date lacquered down the back of the post. The shrine dates to 711; the donation custom to the Edo period.'},
    {t:'gal', cols:3, items:[
      {src:'d8-01-fushimi-first-gate.jpg', cap:'06:59, coming in. Maybe six other people on the grounds.'},
      {src:'d8-03-fushimi-climb.jpg', cap:'07:36, somewhere in the middle of the mountain. Still nobody.'},
      {src:'d8-06-fushimi-descent.jpg', cap:'08:26, on the way back down.'}
    ]},
    {t:'gal', cols:2, items:[
      {src:'d8-04-fushimi-summit-sign.jpg', cap:'<b>山頂 · Top of the Mt · 一ノ峰 · 233 m.</b> 07:59.'},
      {src:'d8-05-fushimi-notice.jpg', cap:'“You are not allowed to touch, move, or take home the torii dedicated to God. Such an act will surely bring you misfortune.” Noted.'}
    ]},
    {t:'text', html:'Which meant breakfast was missed entirely, which produced <strong>Famichiki on pancakes</strong> — konbini fried chicken laid on konbini pancakes — a combination Sage named her single favourite konbini order of the trip and has not stopped talking about since.'},
    {t:'divider'},
    {t:'text', html:'Then [[gion-matsuri|Gion Matsuri]] on Shijō — the Ato Matsuri float parade, the second and smaller of the festival’s two processions, revived in 2014 after decades folded into the first. Nine floats identified off their banners as they came through:'},
    {t:'photo', src:'d8-07-gion-matsuri-float.jpg', wide:true, ar:'3/4',
     cap:'<b>11:09, Shijō-dōri.</b> The floats are pulled by rope teams, reassembled from stored parts every July without a single nail, and taken apart again days later.'},
    {t:'floats', items:[
      'Hashi-Benkei-yama — Benkei facing Yoshitsune on Gojō Bridge',
      'Kita Kannon Yama',
      'Koi-yama — the carp climbing the Dragon Gate, hung with a 16th-century Belgian tapestry of the <em>Iliad</em>',
      'Hachiman-yama — gold shrine, a pair of doves',
      'Jōmyō-yama — the monk vaulting clean over another monk at Uji',
      'Suzuka-yama — the goddess who killed the demon of the Suzuka Pass',
      'En-no-Gyōja-yama — the founder of Shugendō under red parasols',
      'Kuronushi-yama — the poet, and cherry blossoms out of season',
      'Minami Kannon Yama — tail of the parade'
    ]},
    {t:'audio', src:'d8-gion-matsuri.mp3', label:'Gion-bayashi', sub:'Flutes, gongs, drums — the konchikichin that runs all July'},
    {t:'text', html:'Yukata fitting at Vasara at 12:30, and the rest of the day in them.'},
    {t:'photo', src:'d8-08-kinkakuji.jpg', wide:true, ar:'3/2',
     cap:'<b>[[kinkakuji|Kinkaku-ji]], 14:06.</b> Clean pond reflection, blue sky, nothing in the way. Dave’s complete recorded reaction: “Bro…”'},
    {t:'gal', cols:2, items:[
      {src:'d8-09-kinkakuji-phoenix.jpg', cap:'Closer. The phoenix on the roof is gold leaf over bronze; the top two floors are leafed, the ground floor deliberately isn’t.'},
      {src:'d8-10-arashiyama-bamboo.jpg', cap:'[[arashiyama|Arashiyama]], 14:54.'}
    ]},
    {t:'text', html:'Then out to [[shimogamo|Shimogamo Shrine]] for the <strong>Mitarashi Matsuri</strong>, and this was the one nobody planned. You take off your shoes, take a lit candle, and wade knee-deep the length of the shrine’s sacred spring to set it down at the far end. We hit it on the peak Day of the Ox, in a yukata, on the hottest afternoon of the trip.'},
    {t:'photo', src:'d8-13-mitarashi-channel.jpg', wide:true, ar:'4/3',
     cap:'<b>16:03.</b> The spring runs between stone walls and comes up out of the ground cold enough to be a genuine shock in July.'},
    {t:'gal', cols:3, items:[
      {src:'d8-11-mitarashi-wading.jpg', cap:'Going in.'},
      {src:'d8-12-mitarashi-knee-deep.jpg', cap:'Knee-deep, moving slowly so the candle stays lit.'},
      {src:'d8-14-mitarashi-steps.jpg', cap:'Out the far end, 16:05.'}
    ]},
    {t:'text', html:'Water [[omikuji]] there too — fortunes printed in invisible ink that only surface once you float the paper. Dave drew <strong>#17, shō-kichi</strong>. Sage drew <strong>#16, sue-kichi</strong>. Both of them, independently, said to give up on the one-sided love. Hers added <em>no improvement without effort</em>, which is a pointed thing for a wet slip of paper to say to an incoming vocal performance major. Custom says you tie the bad ones to a tree and walk away. We kept both.'},
    {t:'photo', src:'d8-15-tadasu-forest.jpg', ar:'3/4',
     cap:'16:43, in the Tadasu no Mori on the way out. Candied strawberry, primeval forest, borrowed yukata.'},
    {t:'text', html:'[[kaiseki|Kaiseki]] at six. Eight courses, the full classical progression, at the end of the longest day of the trip.'},
    {t:'gal', cols:2, items:[
      {src:'d8-16-kaiseki-table.jpg', cap:'18:00. The room, the menu card, and the first course already down.'},
      {src:'d8-17-kaiseki-course.jpg', cap:'The placemat names the Kyoto vegetables by hand — 賀茂茄子, 九条ねぎ, 海老芋.'}
    ]}
  ]
},

/* ══════════════════════════ DAY 9 ══════════════════════════ */
{
  n:9, date:'Saturday, July 25', route:'Kyoto → Tokyo',
  title:'The rampage',
  blocks:[
    {t:'lead', html:'Ryokan breakfast: 10/10, no notes. Yukata returned at nine. One more Smiski acquired at Kyoto Station, because of course. Then [[shinkansen|Nozomi 6]] at 10:01, seats 7D and 7E, Fuji on the right at about 10:40.'},
    {t:'photo', src:'d9-01-nozomi-arriving.jpg', wide:true, ar:'16/9',
     cap:'<b>09:58, Kyoto Station.</b> Three minutes out. In 2019 the average delay across the entire Tōkaidō line, all year, was twelve seconds.'},
    {t:'video', src:'d9-nozomi.mp4', label:'Nozomi 6 coming in'},
    {t:'text', html:'Tokyo at 12:15, Yamanote to Shibuya, back into the same hotel we started in. And then the rampage, in order: Brandy Melville → Hotter Than Hell → Tokyo Beer Lab, where Dave ended up in a long conversation about AI with the owner → UGG → <strong>Pandora</strong>, for a charm bracelet with a turtle on it for the Kerama green turtle, plus a rose-coloured ring → Bic Camera for the ReFa dryer (240V confirmed, it works at home) → back to the room for a loot drop → <strong>MEGA Don Quijote</strong>, where twenty-plus pounds of J-beauty left the building. Dave slipped away mid-Donki for ninety minutes at Arona Spa, the same spa as Day 1, bookending the whole trip.'},
    {t:'photo', src:'d9-02-mega-donki.jpg', wide:true, ar:'3/2',
     cap:'<b>17:33.</b> MEGA Don Quijote Shibuya, five floors, open till dawn, and the reason the hardshell flew over empty.'},
    {t:'photo', src:'d9-03-afuri.jpg',
     cap:'Last dinner: AFURI Dōgenzaka, yuzu shio, 21:38, twenty-minute wait.'},
    {t:'quote', html:'Money good.', cite:'On the wait'}
  ]
},

/* ══════════════════════════ DAY 10 ══════════════════════════ */
{
  n:10, date:'Sunday, July 26', route:'Tokyo → home',
  title:'Hachikō at last',
  blocks:[
    {t:'lead', html:'Final konbini breakfast. And then, on the tenth day, after walking past him something like forty times, [[hachiko|Hachikō]] — who waited nine years at this station for an owner who had already died, and got a statue while he was still alive to attend the unveiling.'},
    {t:'text', html:'<strong>Hands Shibuya</strong> for the last of the gifts: fine garden tools and a hat that says TEMPURA for Jen, a bamboo chashaku for JQ, a functional plant frog for Dave, a ReFa folding brush and makeup for Sage. Matcha at <strong>Hatoya</strong> walking up toward Yoyogi, gachapon along the way. PARCO at eleven for two last Labubus — Elena and Kendall. Out the door at noon.'},
    {t:'text', html:'Yamanote → Keikyū → Haneda Terminal 3. The Centurion lounge got crushed, sliders and ramen and an unreasonable number of desserts. UA876 at 3:50 PM, into SFO at 9:45 AM the same calendar day, which is a thing that never stops being strange.'},
    {t:'text', html:'<em>No photos survive from the last day. We were carrying too much.</em>'}
  ]
}

];

const DIVE = {
  title:'Three tanks, Kerama Islands',
  sub:'Tue Jul 21 · water 26°C throughout',
  rows:[
    ['1','Kuefu','9:11–9:47','13.0 m','30 m','<span class="hl">Green turtle</span>, blue tang, banded sea krait'],
    ['2','Mae-jima “Sanchin”','10:29–11:07','16.2 m','25 m','Clownfish, garden eels, skeleton fish'],
    ['3','Kuro-jima “West Drift”','12:04–12:40','18.7 m','25 m','Giant trevally, blue-fin trevally, <span class="hl">THE MANTA</span>']
  ]
};
