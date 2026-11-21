// Case-study content for every portfolio project, written from each supplied mockup.
// Figures shown inside the mockups belong to those designs and are not repeated as claims here.
export type FeatureIcon =
  | "search"
  | "team"
  | "shield"
  | "milestone"
  | "video"
  | "match"
  | "globe"
  | "dashboard"
  | "device"
  | "route"
  | "star"
  | "guide"
  | "map"
  | "cart"
  | "card"
  | "gift"
  | "track"
  | "calendar"
  | "bell"
  | "lock"
  | "folder"
  | "plane"
  | "hotel"
  | "visa"
  | "tag"
  | "chart"
  | "wallet"
  | "list"
  | "filter"
  | "pin"
  | "truck"
  | "support";

export type CaseStudy = {
  summary: string;
  platform: string;
  expertise: string[];
  tech?: string[];
  challenge: string;
  goal: string;
  approach: { title: string; body: string }[];
  features: { icon: FeatureIcon; title: string; body: string }[];
  outcome: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  talentbadger: {
    summary:
      "A marketplace for finding senior engineering specialists or assembling a team for a specific project.",
    platform: "Responsive web platform",
    expertise: ["Product strategy", "UX and UI design", "Web development", "Marketplace UX", "Cloud deployment"],
    tech: ["Next.js", "Node.js", "MongoDB", "AWS", "Docker", "Kubernetes"],
    challenge:
      "Advanced engineering work such as embedded firmware, medical device design and industrial controls is hard to describe and harder to staff. Companies needed a fast way to find proven specialists, and specialists needed a credible place to be found. The product had to communicate deep expertise without making the first step feel complicated.",
    goal: "Help a hiring team identify the right area of expertise and choose between a single specialist and a team.",
    approach: [
      {
        title: "Separate the two journeys",
        body: "Companies and specialists start in different places, so the first screen offers clear routes: find a specialist, build a team, or join the bench.",
      },
      {
        title: "Make expertise scannable",
        body: "Domain tags such as Embedded Firmware, PCB and Hardware and Medical Device Regulatory let a visitor recognise their problem in seconds.",
      },
      {
        title: "Answer the trust questions early",
        body: "Senior-only positioning, milestone-gated engagement and clear time-to-hire cues sit right below the headline.",
      },
      {
        title: "Carry the same choices onto mobile",
        body: "The phone layout retains the specialist and team entry points, with domains visible directly below.",
      },
    ],
    features: [
      { icon: "search", title: "Find specialists", body: "Browse vetted talent with advanced search and filtering." },
      { icon: "team", title: "Build a team", body: "Hire a single expert or assemble a full product team." },
      { icon: "shield", title: "Trusted and vetted", body: "Senior-only experts with proven experience." },
      { icon: "milestone", title: "Milestone-based", body: "A transparent, secure and flexible engagement model." },
    ],
    outcome:
      "A scalable, conversion-focused platform that helps innovative companies reach top engineering talent and bring complex products to life faster.",
  },
  evpitch: {
    summary:
      "A recruitment site built around short video introductions, with separate routes for candidates, recruiters and employers.",
    platform: "Responsive web platform",
    expertise: ["Product design", "UX research", "Web development", "Video workflows", "Matching logic"],
    challenge:
      "CVs flatten personality, and recruiters screen hundreds of similar documents. The platform had to serve three audiences, candidates, recruiters and companies, each with a different first step, while keeping video recording approachable for everyone from tradespeople to graduates.",
    goal: "Create a simple, modern and engaging platform where jobseekers can showcase their skills through video and connect with global job opportunities.",
    approach: [
      {
        title: "Three clear paths",
        body: "A How It Works section splits candidates, recruiters and companies, each with its own free starting point.",
      },
      {
        title: "Browse by field",
        body: "Industry navigation from Leadership and Engineering to Health Care and Film lets people start where they belong.",
      },
      {
        title: "Video at the centre",
        body: "Short private candidate pitches and public recruiter and company pitches make the first impression personal.",
      },
      {
        title: "Responsive by default",
        body: "Recording, browsing and applying work as well on a phone as on a laptop.",
      },
    ],
    features: [
      { icon: "video", title: "Video pitch upload", body: "Short video pitches that showcase skills and personality." },
      { icon: "match", title: "Smart matching", body: "Matching that connects candidates with relevant opportunities." },
      { icon: "shield", title: "Secure and verified", body: "Identity verification for trusted, genuine profiles." },
      { icon: "globe", title: "Global access", body: "Opportunities from companies worldwide, across industries." },
      { icon: "dashboard", title: "User dashboard", body: "Track progress, manage applications and grow a profile." },
      { icon: "device", title: "Responsive design", body: "A seamless experience across all devices." },
    ],
    outcome:
      "A recruitment experience that puts personality first, giving candidates a better way to be seen and recruiters a faster way to shortlist.",
  },
  walkthroughz: {
    summary:
      "A city exploration platform with curated walking routes, local recommendations and authentic experiences.",
    platform: "Responsive web platform",
    expertise: ["Discovery and planning", "UX and UI design", "Web development", "Content architecture", "Search and filtering"],
    challenge:
      "Travel inspiration is everywhere, but it is fragmented across maps, blogs and booking sites. Walk Throughz needed to turn that inspiration into a practical route, the right walk in the right neighbourhood, on any device.",
    goal: "Help travellers discover and experience cities in a more engaging and authentic way.",
    approach: [
      { title: "Start with the city", body: "City search gives visitors with a destination in mind a direct way to find relevant walks." },
      { title: "Make routes easy to compare", body: "Route cards use a photo and a short description to show what the walk covers before someone opens it." },
      { title: "Keep guides and walks close", body: "Local recommendations give visitors things to do around a route, while city guides provide context for planning." },
      { title: "Prioritize the route on mobile", body: "The smaller layout keeps discovery and route content within reach for someone browsing while travelling." },
    ],
    features: [
      { icon: "route", title: "Curated walking routes", body: "Handpicked routes for every city and interest." },
      { icon: "star", title: "Local recommendations", body: "The best restaurants, shops and hidden gems." },
      { icon: "guide", title: "City guides", body: "Detailed guides with tips, photos and insider information." },
      { icon: "map", title: "Multi-city support", body: "Explore destinations around the world." },
      { icon: "search", title: "Search by city or tour", body: "Find a city, tour or experience from one search bar." },
      { icon: "device", title: "Responsive design", body: "A seamless experience on all devices." },
    ],
    outcome:
      "A go-to platform for travellers who want to explore cities in a more meaningful way, combining strong visuals, useful information and a smooth experience.",
  },
  renbite: {
    summary: "A coffee and food-ordering app with nearby restaurants, favourites and order tracking.",
    platform: "iOS and Android app",
    expertise: ["Mobile UX and UI", "App development", "Ordering and payments", "Order tracking"],
    challenge:
      "Ordering coffee should take seconds, but discovery, menus, payment and order status often live in separate places. The app had to support a quick repeat order as well as an open-ended browse on a small screen.",
    goal: "Let customers move from a nearby recommendation or a saved favourite to checkout and order status.",
    approach: [
      { title: "Start from the moment", body: "A friendly greeting and a search for what you feel like today open every session." },
      { title: "Discovery that narrows", body: "Categories, nearby restaurants and recommendations move a browse towards a choice." },
      { title: "Confidence at checkout", body: "Multiple secure payment options keep the final step simple." },
      { title: "Follow-through", body: "Real-time tracking keeps the customer informed until the order arrives." },
    ],
    features: [
      { icon: "cart", title: "Easy ordering", body: "Browse, customise and order favourites with ease." },
      { icon: "card", title: "Secure payment", body: "Multiple payment options with strong security." },
      { icon: "gift", title: "Exclusive offers", body: "Access to deals and discounts inside the app." },
      { icon: "track", title: "Track and enjoy", body: "Follow an order in real time." },
    ],
    outcome:
      "A warm, easy-to-scan ordering experience that brings discovery, offers, payment and tracking into one familiar flow.",
  },
  "ffp-vault": {
    summary: "A personal organiser for financial records, important documents and upcoming due dates.",
    platform: "iOS and Android app",
    expertise: ["Mobile UX and UI", "Reminder workflows", "Secure storage", "Authentication"],
    challenge:
      "Loans, housing costs, insurance and documents are scattered across inboxes and drawers, so due dates get missed. The product had to make dates visible without feeling like a banking app, and treat personal information with care.",
    goal: "Bring upcoming due dates and the records behind them into the same mobile view.",
    approach: [
      { title: "Calendar first", body: "The month view and upcoming reminders make commitments visible at a glance." },
      { title: "Status you can read", body: "Paid automatically and manual action required are clearly separated." },
      { title: "Privacy by design", body: "PIN and device authentication protect what is stored in the vault." },
      { title: "A clear boundary", body: "The app organises records; it does not offer financial advice or banking." },
    ],
    features: [
      { icon: "folder", title: "Stay organised", body: "Store loans, housing costs, insurance and documents." },
      { icon: "bell", title: "Never miss a due date", body: "Track payments, renewals and deadlines with reminders." },
      { icon: "lock", title: "Secure and private", body: "Data protected with PIN and device authentication." },
      { icon: "calendar", title: "Everything in one place", body: "Records, reminders and documents in one secure vault." },
    ],
    outcome:
      "A calm, calendar-led view of records, due dates and reminders that helps people stay ahead of everyday commitments.",
  },
  besttrip: {
    summary: "A travel platform bringing flights, hotels, Umrah and visa options into one search and discovery flow.",
    platform: "Web platform",
    expertise: ["UX and UI design", "Web development", "Search UX", "Campaign components"],
    challenge:
      "Travellers compare dates, routes and services across several sites. For many customers a trip also involves Umrah packages or visa support, which most booking sites treat separately.",
    goal: "Keep flight search prominent and give visitors clear paths into hotels, Umrah packages and visa support.",
    approach: [
      { title: "Search first", body: "Trip type, travellers, cabin, route and dates sit together in one prominent panel." },
      { title: "Services side by side", body: "Flight, Umrah, Hotel and Visa tabs keep every travel need one click away." },
      { title: "Room for destination browsing", body: "Seasonal offers and destination cards sit below search for travellers who have yet to choose a route." },
      { title: "Clear actions", body: "One strong search action, separated from supporting information." },
    ],
    features: [
      { icon: "plane", title: "Flight search", body: "One-way and round trips with traveller and cabin options." },
      { icon: "map", title: "Umrah packages", body: "Pilgrimage travel alongside everyday trips." },
      { icon: "hotel", title: "Hotel stays", body: "Accommodation in the same planning flow." },
      { icon: "visa", title: "Visa assistance", body: "Visa options without leaving the site." },
      { icon: "tag", title: "Seasonal offers", body: "Promotional carousels for campaigns and deals." },
      { icon: "device", title: "Responsive layout", body: "Comfortable planning on any screen size." },
    ],
    outcome: "A travel website that brings practical search and destination discovery into one shared experience.",
  },
  "crypto-wallet": {
    summary: "A digital-asset dashboard presenting balances, market movement and transaction status in one view.",
    platform: "Web dashboard",
    expertise: ["Dashboard UX", "Data visualisation", "Fintech UI", "Web app development"],
    challenge:
      "Crypto dashboards get dense quickly: many assets, live prices, pending orders and history. People need an overview and the detail behind a single transaction without losing their place.",
    goal: "Give traders one clear workspace for balances, activity and transaction details.",
    approach: [
      { title: "Assets as navigation", body: "Bitcoin, Ethereum, Tether and other assets form a list that drives the whole view." },
      { title: "Overview at a glance", body: "Balance and chart sit at the top for a quick read of the position." },
      { title: "Separate pending and completed entries", body: "Transaction status is visible in the list, so readers can find an item still awaiting execution." },
      { title: "Detail in context", body: "Buy details stay next to the activity being reviewed." },
    ],
    features: [
      { icon: "wallet", title: "Multi-asset overview", body: "Every asset and balance in one list." },
      { icon: "chart", title: "Market chart", body: "Price movement for the selected asset." },
      { icon: "list", title: "Pending and completed", body: "Transaction states that are easy to tell apart." },
      { icon: "dashboard", title: "Transaction details", body: "A focused panel for the selected activity." },
    ],
    outcome: "An organised financial interface that puts an overview and transaction context in the same workspace.",
  },
  "gcl-storefront": {
    summary: "A broad online storefront with clear routes into categories, promotions and products.",
    platform: "E-commerce website",
    expertise: ["E-commerce UX", "Storefront design", "Catalogue architecture", "Web development"],
    challenge:
      "Large catalogues overwhelm. Visitors needed to reach TVs, electronics and everyday products quickly, while the store still promoted campaigns such as seasonal sports offers.",
    goal: "Make everyday discovery easier across a large catalogue.",
    approach: [
      { title: "Search and categories first", body: "An all-categories menu and a prominent search bar open every route." },
      { title: "Campaign hero", body: "A bold seasonal banner highlights the current offer without hiding navigation." },
      { title: "Visual shortcuts", body: "Shop by category tiles make browsing quick and visual." },
      { title: "Basket always close", body: "Account and basket entry points stay in reach on every page." },
    ],
    features: [
      { icon: "list", title: "Category navigation", body: "Clear routes into a large catalogue." },
      { icon: "search", title: "Product search", body: "Find products from any page." },
      { icon: "tag", title: "Promotional banners", body: "Campaigns and offers with clear calls to action." },
      { icon: "truck", title: "Service highlights", body: "Delivery and payment information near the products." },
    ],
    outcome: "A storefront with a clear hierarchy for search, categories and purchase discovery.",
  },
  beardfriends: {
    summary: "A barbershop discovery app with detailed filters for location, services, language and ratings.",
    platform: "iOS and Android app",
    expertise: ["Mobile UX and UI", "Search and filters", "Location features", "App development"],
    challenge:
      "Choosing a barber depends on more than a name: distance, price, language, payment options, opening hours and ratings. Those preferences had to fit a small screen without overwhelming anyone.",
    goal: "Help people find a barbershop that genuinely fits.",
    approach: [
      { title: "Location first", body: "Discovery starts from where the customer is right now." },
      { title: "Filters that make sense", body: "Sort by distance or price, then refine by language, payment and rating." },
      { title: "Trust signals", body: "Top-rated shops and verified listings help people decide." },
      { title: "Keep selected filters visible", body: "The dark interface uses stronger highlights for selected options so customers can see what is narrowing the list." },
    ],
    features: [
      { icon: "pin", title: "Find near you", body: "Discover barbershops near the current location." },
      { icon: "filter", title: "Smart filters", body: "Filter by distance, price, services, rating and more." },
      { icon: "star", title: "Top rated", body: "Choose based on real customer ratings." },
      { icon: "shield", title: "Trusted and reliable", body: "Verified listings and secure payments." },
    ],
    outcome: "A service-discovery app that makes a detailed set of preferences easy to explore on mobile.",
  },
  shopmart: {
    summary: "A mobile storefront for browsing fashion collections, comparing product cards and adding items to a basket.",
    platform: "iOS and Android app",
    expertise: ["Mobile commerce UX", "App development", "Catalogue and cart", "Payments"],
    challenge:
      "Mobile shoppers want inspiration and speed at the same time. Offers, categories and product details compete for very limited space.",
    goal: "Show offers, collections and individual items without making a shopper hunt for search or the basket.",
    approach: [
      { title: "A personal start", body: "A welcome message, search and basket at the top of every session." },
      { title: "Offers up front", body: "A seasonal sale banner leads straight into relevant products." },
      { title: "Visual categories", body: "Collections such as Summer, Evening and Formal, Casual and Office wear." },
      { title: "Scannable products", body: "Ratings, prices, sale badges and a quick add button on every card." },
    ],
    features: [
      { icon: "tag", title: "Best deals", body: "Discounts on selected items." },
      { icon: "list", title: "Browse by collection", body: "Collection tiles group products by season and occasion." },
      { icon: "star", title: "Compare products", body: "Cards show prices, ratings and sale labels in a consistent order." },
      { icon: "cart", title: "Add to basket", body: "An add control appears on each product card, with the basket reachable from the main screen." },
    ],
    outcome: "A shopping experience that gives customers several clear ways to find the next relevant product.",
  },
};
