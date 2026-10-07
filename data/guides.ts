export const guideCategories = ["Student Accommodation", "Nigeria", "Rwanda", "Rentals", "Property Management", "Property Digitization"] as const;

export type Guide = {
  slug: string; title: string; category: (typeof guideCategories)[number]; minutes: number;
  excerpt: string; image: string; tone: string;
  sections: { heading: string; body: string[]; checklist?: string[] }[];
};

export const guides: Guide[] = [
  {
    slug: "how-to-find-student-accommodation-in-nigeria", title: "How to find student accommodation in Nigeria", category: "Nigeria", minutes: 6,
    excerpt: "A practical plan for finding a safe, affordable place near campus before resumption.", image: "/how-search.png", tone: "sage",
    sections: [
      { heading: "Start before the rush", body: ["Off-campus demand peaks in the weeks before a new session. Starting early gives you time to compare options, inspect properly and avoid paying in a hurry."] },
      { heading: "Set your real budget", body: ["Rent in many Nigerian cities is often paid yearly. Beyond the rent itself, ask about caution fees, agreement fees, service charges and agency fees so you know the full cost of moving in."], checklist: ["Annual rent", "Refundable caution or deposit", "Agreement or legal fee", "Agency fee, if an agent is involved", "Service charge and utilities"] },
      { heading: "Choose the area, then the room", body: ["The neighbourhood shapes your daily life. Think about the route to your faculty, transport costs, water supply, power, security and noise. Visit at the time of day you'll actually be travelling."] },
      { heading: "Inspect and confirm", body: ["Inspect in person or by live video. Confirm who owns the property, who you are paying, and what is included. Keep every receipt and agreement."] },
    ],
  },
  {
    slug: "student-accommodation-in-kigali", title: "Student accommodation in Kigali", category: "Rwanda", minutes: 5,
    excerpt: "Neighbourhoods, monthly rent, deposits and getting around the hills.", image: "/student-life.png", tone: "sand",
    sections: [
      { heading: "Know your campus first", body: ["Institutions in Kigali can have more than one campus. Confirm where your classes will be before you choose a neighbourhood."] },
      { heading: "Monthly rent and deposits", body: ["Rent in Kigali is usually paid monthly, often with a deposit. Agree the deposit amount, the notice period and how the deposit will be returned, in writing."] },
      { heading: "Getting around", body: ["Kigali is hilly. A place that looks close on a map can mean a steep climb. Check moto and bus routes and try the journey before committing."], checklist: ["Route to campus at peak time", "Nearest bus stop", "Typical moto fare", "Is the road walkable after dark?"] },
      { heading: "Shared houses", body: ["Many students share houses. Ask how bills are split, who cleans shared spaces and what the house rules are."] },
    ],
  },
  {
    slug: "how-to-avoid-accommodation-scams", title: "How to avoid accommodation scams", category: "Rentals", minutes: 7,
    excerpt: "The warning signs, the questions to ask and what to do if something feels wrong.", image: "/how-secure.png", tone: "cream",
    sections: [
      { heading: "Common warning signs", body: ["Most accommodation scams follow a pattern. Be cautious when you see any of these."], checklist: ["Pressure to pay immediately to 'secure' the place", "A price far below similar places nearby", "No inspection allowed, or excuses for why you can't visit", "Payment requested to a personal account unrelated to the owner", "Photos that look copied from elsewhere"] },
      { heading: "Questions to ask", body: ["Ask whether you are speaking with the owner or an agent, and request supporting identity and property information. Ask who will sign the agreement and who receives payment."] },
      { heading: "Before you pay", body: ["Inspect the property in person or by live video. Read the agreement, confirm the recipient of every payment and keep copies of receipts and conversations."] },
      { heading: "If something feels off", body: ["Pause. Don't let urgency rush you. Save the listing details and messages, and use Lodgely's reporting or support channel where it is available. If you've lost money, contact your bank and the relevant authorities promptly."] },
    ],
  },
  {
    slug: "how-property-digitization-works", title: "How property digitization works", category: "Property Digitization", minutes: 5,
    excerpt: "What a digital property profile is, and why it helps owners, renters and institutions.", image: "/hero-apartments.png", tone: "mint",
    sections: [
      { heading: "From paper to profile", body: ["Property digitization connects a physical property to structured digital information: its location, photos, features, documents and history."] },
      { heading: "What goes into a profile", body: ["A digital property profile can bring together the things people need to make decisions."], checklist: ["Property ID and location", "Photos and amenities", "Availability and pricing", "Supporting documents", "Occupancy and listing history"] },
      { heading: "Why it matters", body: ["Clear, consistent information makes it easier for seekers to compare options and for owners to manage listings, enquiries and records in one place."] },
    ],
  },
  {
    slug: "property-management-in-africa", title: "Property management in Africa: a practical starter", category: "Property Management", minutes: 6,
    excerpt: "Listings, enquiries, records and occupancy, organised for owners and agents.", image: "/how-connect.png", tone: "sage",
    sections: [
      { heading: "Keep listings accurate", body: ["Out-of-date listings waste everyone's time. Update availability, pricing and photos as soon as anything changes."] },
      { heading: "Respond quickly and clearly", body: ["Seekers often contact several properties at once. Clear, prompt answers about cost, availability and inspection build trust."] },
      { heading: "Organise your records", body: ["Keep agreements, receipts and inspection notes together. A digital record makes renewals, disputes and handovers much easier."], checklist: ["Tenancy agreements", "Payment records", "Inspection reports", "Maintenance history"] },
    ],
  },
  {
    slug: "first-time-renter-checklist", title: "The first-time renter's checklist", category: "Student Accommodation", minutes: 4,
    excerpt: "Everything to check between your first search and your first night home.", image: "/how-move.png", tone: "sand",
    sections: [
      { heading: "Before you visit", body: ["Shortlist places that match your budget, location and must-haves, and prepare your questions."], checklist: ["Total cost of moving in", "What's included in the rent", "Who you'll sign with", "When it's available"] },
      { heading: "At the inspection", body: ["Check taps, sockets, locks, windows and signs of damp. Look at the route, the street and the neighbours."] },
      { heading: "Moving in", body: ["Take dated photos of the condition of the room, keep your agreement and receipts safe, and save emergency contacts for the owner or agent."] },
    ],
  },
];

export const getGuide = (slug: string) => guides.find(guide => guide.slug === slug);
