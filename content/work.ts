const suppliedWork = [
  {
    slug: "talentbadger",
    industry: "SaaS and startups",
    title: "A talent marketplace for advanced engineering.",
    projectName: "Talent Badger",
    type: "dashboard",
    cover: {
      src: "/Projects/talentbadger.jpg",
      width: 1280,
      height: 853,
      alt: "Talent Badger engineering talent marketplace, shown on desktop and mobile",
    },
  },
  {
    slug: "renbite",
    industry: "E-commerce and retail",
    title: "Your next coffee, a little closer.",
    projectName: "Renbite",
    type: "mobile",
    cover: {
      src: "/Projects/renbite.jpg",
      width: 1280,
      height: 960,
      alt: "Renbite coffee-ordering app and its mobile restaurant discovery interface",
    },
  },
  {
    slug: "crypto-wallet",
    industry: "Fintech",
    title: "Digital assets, in one clear view.",
    projectName: "Crypto Wallet",
    type: "dashboard",
    cover: {
      src: "/Projects/crypto-wallet.png",
      width: 1085,
      height: 824,
      alt: "Crypto Wallet dashboard showing asset balances, transactions and a chart",
    },
  },
  {
    slug: "ffp-vault",
    industry: "Fintech",
    title: "A more organized financial life.",
    projectName: "FFP Vault",
    type: "mobile",
    cover: {
      src: "/Projects/ffp_vault.jpg",
      width: 1280,
      height: 960,
      alt: "FFP Vault financial document and reminder app shown on a phone",
    },
  },
  {
    slug: "besttrip",
    industry: "Travel",
    title: "From discovery to your next destination.",
    projectName: "BestTrip",
    type: "dashboard",
    cover: {
      src: "/Projects/besttrip.png",
      width: 865,
      height: 638,
      alt: "BestTrip travel website with flight search and destination offers",
    },
  },
  {
    slug: "gcl-storefront",
    industry: "E-commerce and retail",
    title: "More room for everyday discovery.",
    projectName: "GCL storefront",
    type: "commerce",
    cover: {
      src: "/Projects/gcl-storefront.webp",
      width: 1600,
      height: 822,
      alt: "GCL online storefront showing product categories and shopping offers",
    },
  },
  {
    slug: "evpitch",
    industry: "SaaS and startups",
    title: "Make a first impression with a video pitch.",
    projectName: "Elevator Video Pitch",
    type: "dashboard",
    cover: {
      src: "/Projects/evpitch.jpg",
      width: 1280,
      height: 853,
      alt: "Elevator Video Pitch recruitment platform on desktop and mobile",
    },
  },
  {
    slug: "walkthroughz",
    industry: "Travel",
    title: "Discover a city, one walk at a time.",
    projectName: "Walk Throughz",
    type: "dashboard",
    cover: {
      src: "/Projects/walkthroughz.jpg",
      width: 1280,
      height: 853,
      alt: "Walk Throughz city exploration platform with walking tours and city guides",
    },
  },
  {
    slug: "beardfriends",
    industry: "Lifestyle",
    title: "Find a barbershop that fits.",
    projectName: "Beardfriends",
    type: "mobile",
    cover: {
      src: "/Projects/beardfriends.jpg",
      width: 1280,
      height: 960,
      alt: "Beardfriends mobile barbershop discovery and filtering interface",
    },
  },
  {
    slug: "shopmart",
    industry: "E-commerce and retail",
    title: "Your style. Your store.",
    projectName: "Shopmart",
    type: "mobile",
    cover: {
      src: "/Projects/shopmart.jpg",
      width: 1280,
      height: 960,
      alt: "Shopmart shopping app showing product discovery, categories and fashion collections",
    },
  },
];
const projectNotes: Record<
  string,
  { challenge: string; approach: string; result: string; stack: string[] }
> = {
  talentbadger: {
    challenge:
      "An engineering talent marketplace needs to explain specialist expertise without making the first step feel complicated.",
    approach:
      "The experience brings specialist discovery, team building and a clear call to action together. Desktop and mobile layouts carry the same product positioning, with supporting information organised around the decision a visitor needs to make.",
    result:
      "A focused marketplace presentation that connects the product story to finding a specialist or exploring a team.",
    stack: ["Talent discovery", "Marketplace UX", "Responsive interface"],
  },
  renbite: {
    challenge:
      "A food-and-coffee discovery experience has to help a person move from browsing to a useful next action on a small screen.",
    approach:
      "The interface combines search, restaurant discovery, categories and clear mobile navigation. Product imagery and an easy-to-scan hierarchy help the customer understand what is available.",
    result:
      "A mobile ordering concept with a clear route through discovery, product choices and everyday use.",
    stack: ["Mobile commerce", "Product discovery", "Navigation"],
  },
  "crypto-wallet": {
    challenge:
      "A digital-asset dashboard has to present balances, transactions and status information in a way that remains readable.",
    approach:
      "The dashboard separates the asset list, the account overview and transaction detail. Search, visual status and a chart support different levels of attention without hiding the important information.",
    result:
      "An organised financial interface that puts an overview and transaction context in the same workspace.",
    stack: ["Dashboard design", "Financial interface", "Information hierarchy"],
  },
  "ffp-vault": {
    challenge:
      "Personal financial records and reminders become difficult to manage when dates and documents live in separate places.",
    approach:
      "The portfolio presents a calendar-led mobile experience with upcoming reminders, simple status cues and distinct areas for records and navigation. The product explains its role as an organisation tool.",
    result:
      "A considered mobile view of records, due dates and reminders, with a clear boundary around the product?s purpose.",
    stack: ["Mobile UX", "Record organisation", "Reminder workflows"],
  },
  besttrip: {
    challenge:
      "Travel search needs to make several decisions?destination, date and travel preferences?feel like one understandable task.",
    approach:
      "The presented website puts flight search first and uses destination imagery and offer cards to support exploration. Navigation separates different travel services while keeping the main search easy to find.",
    result:
      "A travel interface that brings practical search and destination discovery into a shared experience.",
    stack: ["Travel search", "Web experience", "Product discovery"],
  },
  "gcl-storefront": {
    challenge:
      "A broad online catalog needs clear routes into products without overwhelming a visitor with every category at once.",
    approach:
      "The storefront combines search, category navigation, promotional areas and a basket entry point. Product categories and service information create multiple routes into shopping.",
    result:
      "A storefront presentation with a clear hierarchy for search, categories and purchase discovery.",
    stack: ["E-commerce UX", "Catalog navigation", "Storefront design"],
  },
  evpitch: {
    challenge:
      "A recruitment product has to explain what makes a video introduction useful to both candidates and recruiters.",
    approach:
      "The project presentation uses distinct candidate and recruiter paths, a clear explanation of the product and responsive views of the core experience.",
    result:
      "A recruitment-platform presentation that makes the video-pitch concept and its main user journeys understandable.",
    stack: ["Recruitment platform", "Product positioning", "Responsive UX"],
  },
  walkthroughz: {
    challenge:
      "A city-exploration product needs to connect inspiration with a practical way to find a route or local experience.",
    approach:
      "The designs bring destination imagery, walking routes, local recommendations and search together across desktop and mobile.",
    result:
      "A travel-discovery presentation with a clear route from a city idea to an experience worth exploring.",
    stack: ["Travel discovery", "Content navigation", "Responsive UX"],
  },
  beardfriends: {
    challenge:
      "Finding a barbershop involves preferences such as location, service, language and availability, not just a business name.",
    approach:
      "The mobile interface shown in the portfolio groups those preferences into a focused filter experience, with clear controls for refining a search.",
    result:
      "A service-discovery interface that makes a detailed set of preferences easier to explore on mobile.",
    stack: ["Service discovery", "Mobile filters", "Customer experience"],
  },
  shopmart: {
    challenge:
      "A mobile store needs to balance offers, category browsing and individual product information within limited screen space.",
    approach:
      "The experience combines a prominent search field, visual categories and scannable product cards with familiar mobile navigation.",
    result:
      "A shopping experience that gives a customer several clear ways to find the next relevant product.",
    stack: ["Mobile commerce", "Product cards", "Catalog UX"],
  },
};
export const work = suppliedWork.map((w) => ({
  ...w,
  ...projectNotes[w.slug],
  client: w.projectName,
  quote: "",
}));
