/**
 * Harvard Investment Group — site content (single source for build.js).
 *
 * Every sentence below is carried over from harvardinvestmentgroup.com (crawled 2026-10-29), with typos fixed
 * (Michael, 10-29: "keep all sentences, fix typos"). Facts added for 2201 Bayside come from the Oppenheim Group
 * listing (9 baths, Brooke Wagner Design, Brandon Architects, 9,129 sq ft). The Home page says "approaching half
 * a billion" and the About page "approaching a billion": both kept as written, flagged for Greg.
 */
"use strict";

const SITE = {
  name: "Harvard Investment Group",
  legal: "Harvard Investment Group",
  founder: "Greg Cullen",
  email: "greg@harvardinvestmentgroup.com",
  phoneDisplay: "(310) 702-5252",
  phoneTel: "+13107025252",
  address: { street: "6060 W Manchester Ave, Suite 304", city: "Los Angeles", region: "CA", zip: "90045", country: "US" },
  linkedin: "https://www.linkedin.com/in/greg-cullen-79938a28/",
  hreao: "https://hreao.sigs.harvard.edu/",
  netflix: "https://www.netflix.com/title/81447330",
  // Hope for the Hurting's own donation page (Michael, 10-29: "donations point to Hope for the Hurting's own site").
  // URL still to come from Greg; until then the Donate buttons go to the contact page.
  donateUrl: null,
  founded: 1995,
};

// Site-wide contact block (identical on every old page)
const CONTACT_BLOCK = {
  title: "Contact Us",
  text: "Looking for more info? Reach out to us via phone or email to get answers to any questions you may have. Or submit a form on our Contact Page by clicking the link below.",
};

const HOME = {
  eyebrow: "Newport Beach · Los Angeles · Est. 1995",
  tagline: "Three decades of investing in, and building, Southern California’s most coveted real estate.",
  aboutTitle: ["A multi-dimensional organization,", "built on value."],
  about: "Harvard Investment Group is a multi-dimensional organization that has, along with its affiliated companies, been actively investing and developing real estate for over two and a half decades. The Company is led by Greg Cullen, who throughout his career, has been involved in hundreds of transactions – both debt and equity – with a combined value approaching half a billion dollars.",
  tiles: [
    { big: "1995", label: "Founded" },
    { big: "30", sup: "+", label: "Years in private equity & development" },
    { big: "HBS", label: "Harvard Business School, MBA 1989" },
  ],
};

const ABOUT = {
  paragraphs: [
    "Greg Cullen is the founder of Harvard Investment Group. Harvard Investment Group was founded in 1995 to make direct investments and provide services to early stage corporations and real estate ventures. Since its inception, Harvard Investment Group and Mr. Cullen have been the lead investor and an active partner in dozens of transactions with a combined value approaching a billion dollars. Investments have been made in companies involved in media, artificial intelligence, pharmaceutical, finance, medical devices, fast food, energy, real estate, entertainment, apparel and the like.",
    "Mr. Cullen has a strong finance/banking background having spent time working for both Citibank and ING Capital Corporation prior to forming Harvard Investment Group. He is actively involved in all aspects of deal creation, finance, strategy, and partner relations. With a focus on executive oversight on the company’s development projects and corporate investments, he is an accomplished and results-oriented professional with over thirty years’ experience in private equity and real estate development.",
    "Mr. Cullen graduated with a Master’s Degree in Business Administration from the Harvard Business School in 1989. His emphasis there was on real estate. He graduated with honors from Rose-Hulman Institute of Technology in 1985, where he received a Bachelor’s Degree in Mechanical Engineering. Mr. Cullen is a highly sought after speaker and considered to be an expert in the fields of real estate, finance, negotiations and value creation. Mr. Cullen is the former President of the Harvard Real Estate Alumni Organization and sits on various corporate boards.",
  ],
  ledger: [
    { year: "1985", text: "B.S. Mechanical Engineering, with honors, Rose-Hulman Institute of Technology" },
    { year: "1989", text: "M.B.A., Harvard Business School, with an emphasis on real estate" },
    { year: "Then", text: "Citibank and ING Capital Corporation" },
    { year: "1995", text: "Founded Harvard Investment Group" },
    { year: "Licenses", text: "Licensed contractor and licensed real estate broker, State of California" },
    { year: "Boards", text: "Former President, Harvard Real Estate Alumni Organization; director on various corporate boards", link: { href: SITE.hreao, label: "HREAO" } },
    { year: "2015", text: "Formed Hope for the Hurting, a 501(c)(3) charitable organization" },
  ],
};

const INVESTMENTS = {
  eyebrow: "Investment focus",
  paragraphs: [
    "Harvard Investment Group makes investments in both value-added real estate opportunities and early stage businesses. The Company directly, or through its affiliated organizations, invests capital in value-added real estate projects and early stage businesses that are in need of capital and/or management expertise.",
    "The Company typically invests anywhere from the mid-five figures to seven figures, depending on the transaction. The goal of the Company is to work with its investment target companies to build a solid management team, a firm financial foundation and a strategy that leads to a profitable exit.",
    "The Company, and its team of professionals, has expertise in deal structuring, valuation, financial engineering, corporate strategy and value creation. Its Principal often provides direction and corporate support at the board level, but also has assisted companies – on an interim basis – by acting in an executive capacity and in operational roles.",
  ],
  // The ledger below restates the paragraphs above; nothing new is claimed.
  ledger: [
    { k: "What we invest in", v: "Value-added real estate opportunities and early stage businesses" },
    { k: "Typical check", v: "Mid-five figures to seven figures, depending on the transaction" },
    { k: "What we bring", v: "Deal structuring, valuation, financial engineering, corporate strategy, value creation" },
    { k: "How we work", v: "Board-level direction and corporate support; interim executive and operational roles when needed" },
    { k: "The goal", v: "A solid management team, a firm financial foundation and a strategy that leads to a profitable exit" },
  ],
  sectors: ["Media", "Artificial intelligence", "Pharmaceutical", "Finance", "Medical devices", "Fast food", "Energy", "Real estate", "Entertainment", "Apparel"],
};

const DEVELOPMENTS = {
  eyebrow: "Developing Southern California",
  intro: [
    "Harvard Investment Group is a vertically integrated real estate development company. The Company directly, or through its affiliated entities, acquires real estate assets with value added potential. The Company specializes in purchasing land with unrealized development potential and underperforming real estate assets. With its experienced team of professionals, the Company undertakes the process of transforming its real estate holdings into for sale product or assets held for cash flow.",
    "The Company has expertise in all aspects of the development process including acquisition, deal structuring, finance, architectural design, entitlements, construction – ranging from home remodeling to full scale land subdivision and project development, and real estate sales. The principal of the Company is both a licensed contractor and licensed real estate broker in the State of California.",
  ],
  showcase: "Below is a showcase of some of our recent development projects.",
  netflixLine: "The project in Corona Del Mar was recently featured on Netflix. Click the link below.",
  netflixLabel: "Selling the OC – Season 3",
  cdm: {
    title: "Corona Del Mar",
    text: "This exclusive development consists of two luxury estates built on the sands of Newport Harbor. Each home has approximately 10,000 square feet of livable area and has all the amenities that you can dream of. From your new home, you can dine at the water’s edge, step on to your own sandy beach and take a swim, or stroll down your private dock and climb aboard your 85-foot yacht.",
  },
  b2201: {
    title: "Bayside 2201",
    sold: "Sold for $24,500,000",
    text: "This modern masterpiece was designed by Brandon Architects and Brooke Wagner Design. It features five bedrooms and nine bathrooms on four levels of luxurious living. Other amenities include an incomparable master suite, stunning views, a rooftop deck with views of the world, wine room, elevator, outdoor fire pit, pool, jacuzzi and a 6-car garage.",
    facts: [
      ["Interior", "9,129 sq ft"],
      ["Bedrooms", "Five, all en suite"],
      ["Bathrooms", "Nine"],
      ["Levels", "Four, with elevator"],
      ["Garage", "6-car"],
      ["Architecture", "Brandon Architects"],
      ["Interiors", "Brooke Wagner Design"],
      ["Sold", "November 2023 · $24,500,000"],
    ],
  },
  b2209: {
    title: "Bayside 2209",
    sold: "Sold for $23,000,000",
    text: "This charming Cape Cod estate was also designed by Brandon Architects and Brooke Wagner Design. It features six bedrooms and eight bathrooms on four levels of luxurious living with soaring ceilings and open floor plans. Other amenities include a spacious master suite with a fireplace lounge, stunning views, a rooftop deck with views of the world, wine room, elevator, outdoor fire pit and water feature, pool, jacuzzi and a 6-car garage.",
  },
  hollywood: {
    title: "Hollywood Hills",
    text: "This infamous modern masterpiece was designed by Tag Front, and is built into the side of the Hollywood Hills with views of the Pacific Ocean and unending city views. The home features close to 6,000 square feet of seamlessly designed interior living space with immense scale and openness. Comprised of 4 bedroom suites, multiple guest baths, cook’s kitchen, sculptural fireplace, pool lounge and infinity edge pool and spa, this home is crafted for entertainment.",
  },
  hermosa: {
    title: "Hermosa Beach",
    text: "This four-unit development, consisting of both coastal plantation and modern style homes, is perched on the hills of Hermosa Beach with breathtaking views of the ocean and Catalina Island. Each home has almost 3,300 square feet of interior living space, along with an oversized living room balcony and a roof deck. The homes feature 4 bedrooms, 5 bathrooms, high ceilings, an open floor plan, and a state of the art kitchen.",
  },
  redondo: {
    title: "Redondo Beach",
    text: "This modern, three-unit, townhome development is nestled in the hills of Redondo Beach. Each home has unimpeded views of the ocean and Catalina Island. Each home has approximately 2,700 square feet of interior living space, along with a living room balcony and a roof deck. The homes feature 4 bedrooms, 4 bathrooms, high ceilings, open floor plan, and a state of the art kitchen.",
  },
};

const PHILANTHROPIC = {
  eyebrow: "Philanthropic",
  intro: [
    "In 2015, Mr. Cullen formed Hope for the Hurting as a 501(c)(3) charitable organization with a mission to assist the less fortunate among us and provide a foundation for people to improve their lives. With the help of several generous donors, Hope for the Hurting, which started with a single location in Los Angeles, has expanded to multiple locations in both California and Indiana.",
    "The charity now has four facilities that serve men and women who struggle with mental illness and/or drug and alcohol addiction. These facilities provide housing, food and varying levels of counseling and medical services to assist the clients. In addition, the charity through its Strike Out Against Drugs program, actively speaks to children in school settings throughout the Los Angeles area. The goal is to persuade children to avoid a pathway which leads to the experimentation and use of alcohol and drugs. SOAD has touched the lives of tens of thousands of children and adults in the Los Angeles area and has received numerous awards.",
  ],
  donate: "Please consider donating to this worthy charity. All donations are tax deductible.",
  donateLink: "Contact us for more information.",
  initiativesLine: "Below are some of our current initiatives.",
  beacon: {
    title: "Beacon of Hope",
    place: "Los Angeles",
    site: "https://www.beaconofhope.la/",
    text: "The Beacon of Hope facility located just west of downtown Los Angeles was the first major undertaking for the charity. This beautiful Victorian residence has been home to thousands of men since opening in 2013. It is a refuge for men seeking help for addiction and/or mental health challenges. Over the years, it has developed a reputation as being one of the best run facilities of its type in the Los Angeles area.",
  },
  wabash: {
    title: "Wabash Recovery",
    place: "Kokomo",
    sub: "Before & After",
    text: "What once was an unused church building in Kokomo, Indiana, has been transformed into a home for men seeking help for drug and alcohol dependency issues. It was built to help meet the needs of this vastly underserved population.",
    link: "https://www.kokomotribune.com/news/local_news/an-investment-in-people-sober-living-facility-opens-on-citys-north-end/article_ad4f147a-a9d8-11eb-bace-cfa80dcaca39.html",
    linkLabel: "Learn more here",
  },
  oasis: {
    title: "Oasis Recovery",
    place: "Tipton",
    text: "The charity received a donation from an extremely generous couple, who were like-minded in their desire to help people with substance abuse issues. This property consists of two homes located on five acres in the beautiful countryside of rural Indiana. The charity is in the process of obtaining licenses and approvals to operate a residential facility at this location that provides full time care for people in need.",
  },
  soad: {
    title: "Strike Out Against Drugs",
    abbr: "SOAD",
    text: "SOAD is led by individuals who are dedicated to keeping children from a life of drug and alcohol abuse. Through real-life testimonies and outreach programs, SOAD is sending a positive message to our children before they become involved in destructive types of behaviors, all of which can lead to violence or illegal activities. Through the sharing of personal experiences of how this type of lifestyle has destroyed countless lives, SOAD’s real-life messages cannot be matched by any text book or statistic. We are real people telling our stories. To date, this message has been communicated to thousands upon thousands of children in Southern California.",
    visit: "Please visit this website and watch this inspiring video.",
    site: "https://www.strikeoutagainstdrugs.com/",
    video: "https://youtu.be/qQsbEC38RFw",
    videoId: "qQsbEC38RFw",
    awardsLine: "Here are some awards and commendations received by SOAD.",
  },
};

const CONTACT = {
  lede: "Don’t hesitate to reach out via the contact information below, or send a message using the form.",
  getInTouch: "Get in Touch",
  send: "Send a Message",
  thanksTitle: "Thank you for your response.",
  thanks: "Thanks for contacting us. We’ll reach out to you shortly.",
};

// ── Images (assets/img/<name>-<w>.webp) ──────────────────────────────────────────────────────────────
// Alt text describes what is in the frame; nothing is claimed that the photo doesn't show.
const IMG = {
  beach: { name: "b2201-beach", widths: [800, 1200, 2000], alt: "2201 Bayside Drive seen from its private beach: two stories of glass and warm wood open to the sand, the pool in the foreground under a clear sky" },
  b2201: {
    "02": "The private dock at 2201 Bayside Drive looking back at the house across the water",
    "03": "Great room at 2201 Bayside Drive with pocket doors open to the harbor",
    "04": "Kitchen at 2201 Bayside Drive with an island and bar seating, the water beyond",
    "05": "Living room at 2201 Bayside Drive with a wood ceiling and harbor views",
    "06": "Fireplace lounge at 2201 Bayside Drive",
    "07": "Primary suite at 2201 Bayside Drive looking out over the harbor",
    "08": "Floor-to-ceiling glass at 2201 Bayside Drive framing the boats on the water",
    "12": "Freestanding tub at 2201 Bayside Drive beside a wall of glass onto the harbor",
    "13": "Rooftop lounge at 2201 Bayside Drive above the private dock and Newport Harbor",
    "14": "Rooftop deck at 2201 Bayside Drive under a blue sky, the harbor and Corona del Mar beyond",
    "15": "Floating staircase at 2201 Bayside Drive",
    "18": "Rooftop deck at 2201 Bayside Drive with seating and a view over the water",
    "19": "Rooftop deck at 2201 Bayside Drive with its outdoor lounge",
    "20": "Looking down from the roof of 2201 Bayside Drive onto the pool and the sand",
    "27": "Office at 2201 Bayside Drive",
    "29": "Dining room at 2201 Bayside Drive",
    "37": "The pivot front door at 2201 Bayside Drive",
    "38": "Pool terrace at 2201 Bayside Drive at dusk",
    "39": "2201 Bayside Drive from the water at night, lit from within",
  },
  b2209: {   // numbering verified against a contact sheet of the 68 files, 10-30
    "09": "Great room at 2209 Bayside Drive, open to the harbor terrace",
    "10": "Kitchen at 2209 Bayside Drive with the harbor beyond",
    "15": "Stone courtyard with a fire pit at 2209 Bayside Drive",
    "19": "Entry gallery at 2209 Bayside Drive",
    "24": "Bedroom at 2209 Bayside Drive",
    "28": "Steel doors open onto the harbor terrace at 2209 Bayside Drive",
    "33": "The private dock at 2209 Bayside Drive at sunset",
    "36": "Bathroom at 2209 Bayside Drive with patterned tile",
    "40": "2209 Bayside Drive, a Cape Cod estate, at twilight",
    "50": "Rooftop lounge and pool at 2209 Bayside Drive at sunset",
    "58": "Pool and rear elevation of 2209 Bayside Drive at sunset",
    "62": "2209 Bayside Drive from the water",
  },
  cdm: 14, hh: 11, hb: 9, rb: 9, boh: 2, wabBefore: 4, wabAfter: 8, oasis: 10, awards: 18,
  awardNames: ["Assembly Certificate of Recognition", "Basics of Religious Tolerance and Diversity", "Certificate of Recognition, 11-19-16", "Certificate of Recognition from the City of Los Angeles", "Certificate of Recognition", "Certificate of Recognition from Strike Out Against Drugs", "Commendation, 7-4-18", "Commendation for Strike Out Against Drugs", "Drug-Free Ambassador", "Foundation for a Drug-Free World", "Four-Hour Drug and Alcohol Awareness Class", "Heart of Compassion", "Highly Commended", "Personal Efficiency Seminar", "Strike Out Against Drugs, 3-6-20", "Strike Out Against Drugs, 10-27-18", "The Sober Living Network", "Very Highly Commended"],
};

// ── FAQ (answers drawn only from the site's own copy; Greg approves before launch) ───────────────────
const FAQ = [
  { q: "What is Harvard Investment Group?", a: "Harvard Investment Group is a multi-dimensional organization, founded in 1995 by Greg Cullen, that has been actively investing in and developing real estate for over two and a half decades, along with its affiliated companies. It also makes direct investments in early stage businesses." },
  { q: "Who leads Harvard Investment Group?", a: "Greg Cullen, the founder. He holds an MBA from Harvard Business School (1989) and a mechanical engineering degree from Rose-Hulman (1985), worked at Citibank and ING Capital before founding the company, and is a licensed contractor and real estate broker in California." },
  { q: "Where is Harvard Investment Group based?", a: "The office is at 6060 W Manchester Ave, Suite 304, Los Angeles, CA 90045. Development projects have been in Corona del Mar (Newport Beach), the Hollywood Hills, Hermosa Beach and Redondo Beach." },
  { q: "What does Harvard Investment Group invest in?", a: "Value-added real estate opportunities and early stage businesses that need capital and/or management expertise. Past investments span media, artificial intelligence, pharmaceutical, finance, medical devices, fast food, energy, real estate, entertainment and apparel." },
  { q: "How much does Harvard Investment Group typically invest?", a: "Anywhere from the mid-five figures to seven figures, depending on the transaction. The goal is to help build a solid management team, a firm financial foundation and a strategy that leads to a profitable exit." },
  { q: "Does Harvard Investment Group take an active role in its investments?", a: "Yes. Its principal often provides direction and corporate support at the board level, and has also assisted companies on an interim basis in executive and operational roles." },
  { q: "What kind of real estate does Harvard Investment Group develop?", a: "It is a vertically integrated developer that buys land with unrealized development potential and underperforming real estate assets, then transforms them into for-sale product or assets held for cash flow. Work has ranged from home remodeling to full-scale land subdivision and project development." },
  { q: "What is the Corona del Mar development?", a: "Two luxury estates built on the sands of Newport Harbor, each with roughly 10,000 square feet of livable area, a private beach and a private dock. 2201 Bayside Drive sold for $24,500,000 and 2209 Bayside Drive sold for $23,000,000." },
  { q: "Was a Harvard Investment Group project featured on Netflix?", a: "Yes. The Corona del Mar project appears in Selling the OC, Season 3, on Netflix." },
  { q: "Who designed 2201 Bayside Drive?", a: "Brandon Architects, with interiors by Brooke Wagner Design. The home has five bedrooms and nine bathrooms on four levels, a rooftop deck, wine room, elevator, outdoor fire pit, pool, jacuzzi and a 6-car garage." },
  { q: "What is Hope for the Hurting?", a: "A 501(c)(3) charitable organization Mr. Cullen formed in 2015 to assist the less fortunate and provide a foundation for people to improve their lives. It operates four facilities in California and Indiana for men and women facing mental illness and/or addiction, and runs the Strike Out Against Drugs school program." },
  { q: "How can I contact Harvard Investment Group?", a: "Email greg@harvardinvestmentgroup.com, call (310) 702-5252, or send a message through the contact page. The office is at 6060 W Manchester Ave, Suite 304, Los Angeles, CA 90045." },
];

// ── Home hero: the ambient loops (cycle in order; add clips here as Michael approves them) + the welcome film slot ──
const HERO = {
  clips: [
    { src: "/assets/video/hero_1080.mp4", small: "/assets/video/hero_720.mp4", poster: "b2201-beach", label: "2201 Bayside Drive · Corona del Mar" },
    // Seedance 2.5 jobs 6ecdac60 (Hollywood Hills, drone toward the evening sky) and f77e576e (Newport Harbor aerial, out to the ocean), 10-30
    { src: "/assets/video/hero_hollywood_1080.mp4", small: "/assets/video/hero_hollywood_720.mp4", poster: "hh-01", label: "Hollywood Hills · Los Angeles" },
    { src: "/assets/video/hero_harbor_1080.mp4", small: "/assets/video/hero_harbor_720.mp4", poster: "cdm-13", label: "Newport Harbor · Corona del Mar" },
  ],
  // The avatar's "Welcome to Harvard Investment Group" walk-through film (Michael, 10-30). Placeholder until it exists.
  // Harrison's 30 s welcome film (approved 10-30, DELIVERY\welcome_film_v3). Loops muted in the hero; the sound icon
  // replays it from 0:00 with sound; "Talk to Harrison" sits directly under it and jumps to the stage.
  film: { poster: "film-harrison", eyebrow: "Welcome film", title: "Welcome to Harvard Investment Group", note: "A 30-second walk through the homes with Harrison", cta: "Talk to Harrison",
    src: "/assets/video/harrison-welcome_1080.mp4", small: "/assets/video/harrison-welcome_720.mp4",
    alt: "Harrison, Harvard Investment Group’s AI agent, in a modern foyer at golden hour" },
  // Captions for the three transparent breaks where the ambient loop shows through
  peeks: ["Corona del Mar · Newport Harbor", "Built on the sands of Newport Harbor", "Three decades. Southern California."],
};

// ── Avatar stage (placeholder until the avatar is built) ─────────────────────────────────────────────
const STAGE = {
  name: "Harrison",             // Greg picked Option B on 10-30; the agent is named Harrison (REVIEW: Harrison scripts card)
  // His recorded stage intro (approved 10-30, AVATAR\HARRISON\STAGE): the silent idle loop AND the sound-on intro.
  // Captions = harrison-intro.vtt, timings in site.js LINES (INTRO_END 28.4). The live conversation is not wired yet.
  intro: "/assets/video/harrison-intro.mp4",
  poster: "/assets/video/harrison-poster.jpg",
  badge: "AI agent",
  eyebrow: "Talk with us",
  title: ["Ask about investing,", "developing, or giving."],
  lede: "Press Talk to Harrison and ask what you would ask Greg’s office. Or tap an option on the panel.",
  cards: [
    { icon: "chart", title: "Invest with Harvard Investment Group", sub: "Value-added real estate and early stage businesses", href: "/investments/" },
    { icon: "building", title: "Development partnerships", sub: "Land, entitlements, construction and sales", href: "/developments/" },
    { icon: "heart", title: "Hope for the Hurting", sub: "Learn about the charity and how to give", href: "/philanthropic/" },
    { icon: "phone", title: "Contact Greg", sub: "Send a message or book a call", href: "/contact/" },
  ],
  home: "Tap an option below — or press Talk to speak with me.",
  note: "Prefer to type? This panel takes you to the right page.",
  soon: "The live conversation is arriving very soon. In the meantime, the options beside me open the right page.",
};

module.exports = { SITE, CONTACT_BLOCK, HOME, HERO, ABOUT, INVESTMENTS, DEVELOPMENTS, PHILANTHROPIC, CONTACT, IMG, FAQ, STAGE };
