/**
 * Legal page outlines. The approved policy text must come from Lodgely's legal team —
 * until it is supplied, each page shows its structure and a clear "pending approval" notice.
 * Paste approved text into `body` for each section when it is ready.
 */
export type LegalPage = { slug: string; title: string; short: string; summary: string; sections: { heading: string; body?: string }[] };

export const legalPages: LegalPage[] = [
  { slug: "terms", title: "Terms of Service", short: "Terms", summary: "The rules for using Lodgely's website and services.", sections: [{ heading: "Who we are and how to contact us" }, { heading: "Using Lodgely" }, { heading: "Accounts and eligibility" }, { heading: "Listings, enquiries and bookings" }, { heading: "Fees and payments" }, { heading: "Your responsibilities" }, { heading: "Limitation of liability" }, { heading: "Changes to these terms" }, { heading: "Governing law" }] },
  { slug: "privacy", title: "Privacy Policy", short: "Privacy", summary: "What personal data we collect, why, and the choices you have.", sections: [{ heading: "Data we collect" }, { heading: "How we use your data" }, { heading: "Legal bases for processing" }, { heading: "Sharing your data" }, { heading: "International transfers" }, { heading: "How long we keep data" }, { heading: "Your rights" }, { heading: "Contact and complaints" }] },
  { slug: "cookies", title: "Cookie Policy", short: "Cookies", summary: "How we use cookies and similar technologies.", sections: [{ heading: "What cookies are" }, { heading: "Cookies we use" }, { heading: "Managing your preferences" }] },
  { slug: "kyc", title: "KYC Policy", short: "KYC", summary: "How we verify the identity of users, owners and agents.", sections: [{ heading: "Who must complete verification" }, { heading: "Documents we may request" }, { heading: "How verification data is handled" }, { heading: "Outcomes and appeals" }] },
  { slug: "property-verification", title: "Property Verification Policy", short: "Property verification", summary: "What property verification covers and what it does not.", sections: [{ heading: "What we check" }, { heading: "What verification does not guarantee" }, { heading: "Re-verification and changes" }, { heading: "Reporting a listing" }] },
  { slug: "refunds", title: "Refund Policy", short: "Refunds", summary: "When refunds apply to payments made through Lodgely.", sections: [{ heading: "Payments covered by this policy" }, { heading: "Eligibility for refunds" }, { heading: "How to request a refund" }, { heading: "Timelines" }] },
  { slug: "disclaimer", title: "Disclaimer", short: "Disclaimer", summary: "Important limits on the information shown on Lodgely.", sections: [{ heading: "Listing information" }, { heading: "Future and experimental features" }, { heading: "No investment advice" }, { heading: "Third-party links" }] },
];

export const getLegalPage = (slug: string) => legalPages.find(page => page.slug === slug);
