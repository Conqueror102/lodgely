/**
 * SAMPLE LISTINGS — preview content only.
 * These illustrate how listings will look until live inventory is connected.
 * Every page that renders them shows a "Sample listing" label. Replace with real data before launch.
 */
import type { CountrySlug } from "@/data/places";

export const propertyTypes = ["Student Accommodation", "Apartments", "Rooms", "Houses", "Hostels", "Short-Term Stays"] as const;
export type PropertyType = (typeof propertyTypes)[number];

export type Listing = {
  slug: string; title: string; type: PropertyType; country: CountrySlug; city: string; area: string;
  university?: string; /** walking/riding time to the university, minutes */ campusMinutes?: number;
  price: number; period: "year" | "month" | "night"; bedrooms: number; bathrooms: number; size?: string;
  availableFrom: string; furnished: boolean; images: string[]; amenities: string[];
  summary: string; description: string[]; listedBy: "Property owner" | "Agent";
  moveInCosts: { label: string; amount: number }[];
  /** Position on the stylised city map, as percentages. */
  pin: { x: number; y: number }; tone: string;
};

const room = ["/accommodation-studio.png", "/how-explore.png", "/student-life.png"];
const building = ["/hero-apartments.png", "/how-explore.png", "/accommodation-studio.png"];
const house = ["/hero-house-cutout-v2.png", "/student-life.png", "/how-explore.png"];

export const listings: Listing[] = [
  {
    slug: "akoka-garden-self-contain", title: "Garden self-contain near UNILAG", type: "Student Accommodation", country: "nigeria", city: "lagos", area: "Akoka",
    university: "university-of-lagos", campusMinutes: 8, price: 650000, period: "year", bedrooms: 1, bathrooms: 1, size: "22 m²",
    availableFrom: "2026-11-01", furnished: true, images: room, tone: "sage",
    amenities: ["Wi-Fi ready", "Prepaid meter", "Water supply", "Study desk", "Security", "Wardrobe"],
    summary: "A bright, furnished room with a desk by the window and a short walk to the UNILAG gates.",
    description: ["A quiet self-contained room in a small compound on a residential street in Akoka. It has its own bathroom and kitchenette, a study desk and built-in wardrobe.", "The compound has a gate man, a borehole and a prepaid meter. It's an eight-minute walk to the main gate."],
    listedBy: "Property owner", pin: { x: 30, y: 38 },
    moveInCosts: [{ label: "Annual rent", amount: 650000 }, { label: "Caution fee (refundable)", amount: 50000 }, { label: "Agreement fee", amount: 30000 }],
  },
  {
    slug: "yaba-shared-flat-room", title: "Room in a shared flat, Yaba", type: "Rooms", country: "nigeria", city: "lagos", area: "Yaba",
    university: "university-of-lagos", campusMinutes: 15, price: 480000, period: "year", bedrooms: 1, bathrooms: 1,
    availableFrom: "2026-10-20", furnished: false, images: ["/how-explore.png", "/student-life.png", "/accommodation-studio.png"], tone: "cream",
    amenities: ["Shared kitchen", "Prepaid meter", "Water supply", "Security"],
    summary: "Your own room in a three-bedroom flat shared with two students, near Yaba's tech hub.",
    description: ["A private bedroom in a well-kept three-bedroom flat. The kitchen and living room are shared with two other tenants.", "Close to bus routes, cafés and markets. Around fifteen minutes to UNILAG by road."],
    listedBy: "Agent", pin: { x: 52, y: 52 },
    moveInCosts: [{ label: "Annual rent", amount: 480000 }, { label: "Caution fee (refundable)", amount: 40000 }],
  },
  {
    slug: "surulere-two-bedroom", title: "Two-bedroom flat in Surulere", type: "Apartments", country: "nigeria", city: "lagos", area: "Surulere",
    price: 2400000, period: "year", bedrooms: 2, bathrooms: 2, size: "85 m²",
    availableFrom: "2026-12-01", furnished: false, images: building, tone: "sand",
    amenities: ["Parking", "Prepaid meter", "Water supply", "Security", "Balcony"],
    summary: "A spacious two-bedroom flat in a gated block, good for sharing or a small family.",
    description: ["A two-bedroom flat with an en-suite master bedroom, a guest toilet and a balcony in a gated block of six flats.", "Central Mainland location with access to major roads."],
    listedBy: "Agent", pin: { x: 66, y: 72 },
    moveInCosts: [{ label: "Annual rent", amount: 2400000 }, { label: "Service charge", amount: 150000 }, { label: "Caution fee (refundable)", amount: 200000 }],
  },
  {
    slug: "agbowo-student-hostel", title: "Student hostel by UI main gate", type: "Hostels", country: "nigeria", city: "ibadan", area: "Agbowo",
    university: "university-of-ibadan", campusMinutes: 5, price: 280000, period: "year", bedrooms: 1, bathrooms: 1,
    availableFrom: "2026-10-15", furnished: true, images: ["/student-life.png", "/accommodation-studio.png", "/how-explore.png"], tone: "mint",
    amenities: ["Shared kitchen", "Reading room", "Water supply", "Security", "Bed & mattress"],
    summary: "Furnished hostel rooms with a shared reading room, five minutes from the main gate.",
    description: ["A purpose-built student hostel with single and shared rooms, a reading room and a shared kitchen on each floor.", "On-site caretaker and a gated entrance."],
    listedBy: "Property owner", pin: { x: 40, y: 34 },
    moveInCosts: [{ label: "Annual rent", amount: 280000 }, { label: "Caution fee (refundable)", amount: 20000 }],
  },
  {
    slug: "bodija-mini-flat", title: "Quiet mini flat in Bodija", type: "Apartments", country: "nigeria", city: "ibadan", area: "Bodija",
    university: "university-of-ibadan", campusMinutes: 14, price: 550000, period: "year", bedrooms: 1, bathrooms: 1, size: "40 m²",
    availableFrom: "2026-11-10", furnished: false, images: building, tone: "cream",
    amenities: ["Parking", "Prepaid meter", "Water supply", "Kitchen"],
    summary: "A calm one-bedroom flat on a residential street, ideal for postgraduates.",
    description: ["A one-bedroom mini flat with a separate living room and kitchen in a quiet compound.", "About fourteen minutes to UI by road."],
    listedBy: "Agent", pin: { x: 62, y: 58 },
    moveInCosts: [{ label: "Annual rent", amount: 550000 }, { label: "Agreement fee", amount: 30000 }],
  },
  {
    slug: "gwagwalada-shared-house", title: "Shared house near UniAbuja", type: "Student Accommodation", country: "nigeria", city: "abuja", area: "Gwagwalada",
    university: "university-of-abuja", campusMinutes: 10, price: 350000, period: "year", bedrooms: 1, bathrooms: 1,
    availableFrom: "2026-10-25", furnished: true, images: house, tone: "sage",
    amenities: ["Shared kitchen", "Water supply", "Security", "Study desk", "Bed & mattress"],
    summary: "Private rooms in a four-bedroom shared house, ten minutes from the main campus.",
    description: ["A four-bedroom bungalow converted for students, each with a private room and a shared kitchen and lounge.", "Ten minutes to the University of Abuja main campus."],
    listedBy: "Property owner", pin: { x: 28, y: 64 },
    moveInCosts: [{ label: "Annual rent", amount: 350000 }, { label: "Caution fee (refundable)", amount: 30000 }],
  },
  {
    slug: "wuse-furnished-studio", title: "Furnished studio in Wuse", type: "Short-Term Stays", country: "nigeria", city: "abuja", area: "Wuse",
    price: 45000, period: "night", bedrooms: 1, bathrooms: 1, size: "30 m²",
    availableFrom: "2026-10-10", furnished: true, images: room, tone: "sand",
    amenities: ["Wi-Fi", "Air conditioning", "Backup power", "Kitchen", "Security"],
    summary: "A fully furnished studio for short stays, close to offices and markets.",
    description: ["A furnished studio with a queen bed, kitchenette, air conditioning and Wi-Fi.", "Good for interns, visitors and anyone relocating who needs a base while they search."],
    listedBy: "Agent", pin: { x: 64, y: 36 },
    moveInCosts: [{ label: "Nightly rate", amount: 45000 }, { label: "Cleaning fee", amount: 10000 }],
  },
  {
    slug: "remera-student-room", title: "Student room in Remera", type: "Rooms", country: "rwanda", city: "kigali", area: "Remera",
    university: "university-of-rwanda", campusMinutes: 20, price: 120000, period: "month", bedrooms: 1, bathrooms: 1,
    availableFrom: "2026-10-15", furnished: true, images: ["/accommodation-studio.png", "/student-life.png", "/how-explore.png"], tone: "mint",
    amenities: ["Wi-Fi", "Water included", "Shared kitchen", "Study desk"],
    summary: "A furnished room in a shared house with Wi-Fi, close to bus routes.",
    description: ["A furnished room in a friendly four-bedroom house shared with students and young professionals.", "Water and Wi-Fi are included. Bus stops are a short walk away."],
    listedBy: "Property owner", pin: { x: 62, y: 44 },
    moveInCosts: [{ label: "First month's rent", amount: 120000 }, { label: "Deposit (refundable)", amount: 120000 }],
  },
  {
    slug: "kimironko-alu-shared-house", title: "Shared house near ALU", type: "Student Accommodation", country: "rwanda", city: "kigali", area: "Kimironko",
    university: "african-leadership-university", campusMinutes: 15, price: 150000, period: "month", bedrooms: 1, bathrooms: 1,
    availableFrom: "2026-11-01", furnished: true, images: house, tone: "sage",
    amenities: ["Fibre Wi-Fi", "Water included", "Garden", "Shared kitchen", "Security"],
    summary: "Furnished rooms in a garden house popular with ALU students.",
    description: ["Furnished rooms in a five-bedroom house with a garden, fibre internet and a shared kitchen.", "Around fifteen minutes to the ALU campus."],
    listedBy: "Agent", pin: { x: 74, y: 28 },
    moveInCosts: [{ label: "First month's rent", amount: 150000 }, { label: "Deposit (refundable)", amount: 150000 }],
  },
  {
    slug: "kacyiru-one-bedroom", title: "One-bedroom apartment in Kacyiru", type: "Apartments", country: "rwanda", city: "kigali", area: "Kacyiru",
    price: 450000, period: "month", bedrooms: 1, bathrooms: 1, size: "55 m²",
    availableFrom: "2026-11-15", furnished: true, images: building, tone: "cream",
    amenities: ["Wi-Fi", "Parking", "Security", "Balcony", "Backup water"],
    summary: "A furnished apartment with city views, close to offices and embassies.",
    description: ["A furnished one-bedroom apartment with a balcony overlooking the hills.", "Calm, central and close to offices."],
    listedBy: "Agent", pin: { x: 48, y: 30 },
    moveInCosts: [{ label: "First month's rent", amount: 450000 }, { label: "Deposit (refundable)", amount: 450000 }],
  },
  {
    slug: "nyamirambo-guest-room", title: "Guest room in Nyamirambo", type: "Short-Term Stays", country: "rwanda", city: "kigali", area: "Nyamirambo",
    price: 25000, period: "night", bedrooms: 1, bathrooms: 1,
    availableFrom: "2026-10-12", furnished: true, images: ["/how-explore.png", "/accommodation-studio.png", "/student-life.png"], tone: "sand",
    amenities: ["Wi-Fi", "Breakfast available", "Hot water", "Security"],
    summary: "A cosy guest room in Kigali's most colourful neighbourhood.",
    description: ["A private guest room with its own bathroom in a family-run house.", "A great base for a few nights while you look for something longer term."],
    listedBy: "Property owner", pin: { x: 26, y: 62 },
    moveInCosts: [{ label: "Nightly rate", amount: 25000 }],
  },
  {
    slug: "kicukiro-family-house", title: "Three-bedroom house in Kicukiro", type: "Houses", country: "rwanda", city: "kigali", area: "Kicukiro",
    price: 700000, period: "month", bedrooms: 3, bathrooms: 2, size: "160 m²",
    availableFrom: "2026-12-01", furnished: false, images: house, tone: "mint",
    amenities: ["Garden", "Parking", "Security", "Water tank", "Kitchen"],
    summary: "A family house with a garden on a quiet residential street.",
    description: ["A three-bedroom house with a garden, a separate kitchen and parking for two cars.", "Quiet and residential, with schools and shops nearby."],
    listedBy: "Agent", pin: { x: 58, y: 76 },
    moveInCosts: [{ label: "First month's rent", amount: 700000 }, { label: "Deposit (refundable)", amount: 1400000 }],
  },
];

export const getListing = (slug: string) => listings.find(listing => listing.slug === slug);

export function formatPrice(listing: Pick<Listing, "country" | "price">, amount = listing.price) {
  const value = new Intl.NumberFormat("en-NG").format(amount);
  return listing.country === "nigeria" ? `₦${value}` : `RWF ${value}`;
}

export const periodLabel = { year: "/ year", month: "/ month", night: "/ night" } as const;
