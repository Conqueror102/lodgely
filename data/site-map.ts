/** One source of truth for navigation: header mega menu, quick-jump search, footer and breadcrumbs. */
export type NavLink = { label: string; href: string; hint: string; icon: string; keywords?: string };
export type NavGroup = { id: string; label: string; tagline: string; links: NavLink[] };

export const navGroups: NavGroup[] = [
  {
    id: "find", label: "Find a place", tagline: "Rooms, hostels, apartments and homes near where life happens.",
    links: [
      { label: "Find Accommodation", href: "/accommodation", hint: "Search, filter and compare places", icon: "search", keywords: "search listings rent rooms apartments" },
      { label: "Student Accommodation", href: "/accommodation/student-accommodation", hint: "Housing around your campus", icon: "student-center", keywords: "students hostel campus" },
      { label: "Universities", href: "/universities", hint: "Accommodation near your university", icon: "university", keywords: "unilag ui alu campus" },
      { label: "Nigeria", href: "/nigeria", hint: "Lagos, Ibadan and Abuja", icon: "location", keywords: "lagos ibadan abuja naija" },
      { label: "Rwanda", href: "/rwanda", hint: "Kigali and beyond", icon: "location", keywords: "kigali" },
    ],
  },
  {
    id: "partners", label: "Partner with us", tagline: "Digital tools for the people who make places possible.",
    links: [
      { label: "For Property Owners", href: "/landlords", hint: "Reach seekers and manage listings", icon: "home", keywords: "landlord owner" },
      { label: "List Your Property", href: "/list-your-property", hint: "A guided step-by-step application", icon: "key", keywords: "add listing apply" },
      { label: "For Agents", href: "/agents", hint: "Leads, listings and verification", icon: "handshake", keywords: "agent realtor kyc" },
      { label: "For Institutions", href: "/institutions", hint: "Housing partnerships for campuses", icon: "university", keywords: "university school partnership" },
    ],
  },
  {
    id: "learn", label: "Learn", tagline: "Clear guidance for every step of your move.",
    links: [
      { label: "Resources & Guides", href: "/guides", hint: "Renting, scams and student housing", icon: "document", keywords: "blog articles help" },
      { label: "Trust & Safety", href: "/trust-and-safety", hint: "Verification, safety and reporting", icon: "shield", keywords: "scam fraud report safe" },
      { label: "About Lodgely", href: "/about", hint: "Our mission and where we're going", icon: "help", keywords: "mission company" },
      { label: "Contact & Partnerships", href: "/contact", hint: "Questions, support and partnerships", icon: "user-group-man-man", keywords: "support email help" },
      { label: "Legal", href: "/legal", hint: "Terms, privacy, KYC and policies", icon: "document", keywords: "terms privacy cookies refund" },
    ],
  },
];

export const allLinks: NavLink[] = [
  { label: "Home", href: "/", hint: "Back to the Lodgely homepage", icon: "home", keywords: "start landing" },
  ...navGroups.flatMap(group => group.links),
];
