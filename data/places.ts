/**
 * Markets, cities and universities.
 * Keep this list to places where Lodgely actually operates or has useful inventory —
 * the content document asks us not to publish "available in" pages for anywhere else.
 */
export type CountrySlug = "nigeria" | "rwanda";

export type Country = {
  slug: CountrySlug; name: string; currency: string; currencyCode: string; rentRhythm: string;
  headline: string; intro: string; watermark: string; tone: string;
  facts: { label: string; value: string }[];
  tips: { title: string; copy: string }[];
};

export type City = {
  slug: string; country: CountrySlug; name: string; region: string; tagline: string; intro: string;
  /** Position on the stylised country map, as percentages. */
  map: { x: number; y: number };
  neighbourhoods: { name: string; vibe: string; goodFor: string[] }[];
  guidance: { title: string; copy: string }[];
};

export type University = {
  slug: string; name: string; short: string; city: string; country: CountrySlug;
  campus: string; intro: string; nearby: string[];
  tips: string[];
};

export const countries: Country[] = [
  {
    slug: "nigeria", name: "Nigeria", currency: "₦", currencyCode: "NGN", rentRhythm: "Often paid yearly",
    headline: "Find your place in Nigeria.", watermark: "Naija", tone: "sage",
    intro: "From busy campus neighbourhoods in Lagos to the student streets of Ibadan and the growing districts of Abuja, Lodgely helps you discover rooms, hostels, apartments and homes in Nigeria.",
    facts: [
      { label: "Active cities", value: "Lagos · Ibadan · Abuja" },
      { label: "Currency", value: "Nigerian naira (₦)" },
      { label: "Rent rhythm", value: "Often paid yearly, sometimes upfront" },
      { label: "Popular with students", value: "Self-contained rooms, hostels, shared flats" },
    ],
    tips: [
      { title: "Ask what the rent covers", copy: "Clarify whether service charges, security, waste, water and electricity are included, and how prepaid meters work." },
      { title: "Understand one-off fees", copy: "Agreement, caution or agency fees can be part of a move. Ask for every cost in writing before paying anything." },
      { title: "Inspect before you commit", copy: "Visit in person or by live video, check water supply, power backup, security and the route to campus or work." },
    ],
  },
  {
    slug: "rwanda", name: "Rwanda", currency: "RWF", currencyCode: "RWF", rentRhythm: "Usually paid monthly",
    headline: "Find your place in Rwanda.", watermark: "Murakaza", tone: "sand",
    intro: "Kigali is clean, hilly and well connected. Whether you're a student at a Kigali campus, an intern or a professional on the move, Lodgely helps you discover rooms, apartments and furnished stays.",
    facts: [
      { label: "Active city", value: "Kigali" },
      { label: "Currency", value: "Rwandan franc (RWF)" },
      { label: "Rent rhythm", value: "Usually monthly, with a deposit" },
      { label: "Popular with students", value: "Shared houses, rooms, furnished studios" },
    ],
    tips: [
      { title: "Think in hills and routes", copy: "Kigali's neighbourhoods sit on different hills. Check moto and bus routes to campus or work, not just the distance on a map." },
      { title: "Agree on the deposit", copy: "Ask how much deposit is required, what it covers and how and when it will be returned." },
      { title: "Check what's furnished", copy: "Furnished can mean very different things. Ask for a list of what stays in the unit before you agree." },
    ],
  },
];

export const cities: City[] = [
  {
    slug: "lagos", country: "nigeria", name: "Lagos", region: "Lagos State", map: { x: 14, y: 80 },
    tagline: "Big city energy. Room for your ambitions.",
    intro: "Lagos moves fast. Students around the University of Lagos often look at Akoka, Yaba and Bariga for walkable or short commutes, while professionals spread across the Mainland and Island.",
    neighbourhoods: [
      { name: "Akoka", vibe: "Right by the UNILAG gates, lively and student-heavy.", goodFor: ["Students", "Short walks to campus"] },
      { name: "Yaba", vibe: "Tech hub energy, cafés, markets and good transport links.", goodFor: ["Students", "Young professionals"] },
      { name: "Bariga", vibe: "Affordable options a short ride from campus.", goodFor: ["Budget-conscious", "Students"] },
      { name: "Surulere", vibe: "Established, central Mainland neighbourhood with more space.", goodFor: ["Families", "Professionals"] },
    ],
    guidance: [
      { title: "Commute is everything", copy: "Traffic can turn a short distance into a long trip. Test your route at the time you'll actually travel." },
      { title: "Ask about power and water", copy: "Check for prepaid meters, backup power arrangements and how water is supplied." },
      { title: "Flooding season", copy: "Ask neighbours or the owner how the street handles heavy rain before you commit." },
    ],
  },
  {
    slug: "ibadan", country: "nigeria", name: "Ibadan", region: "Oyo State", map: { x: 20, y: 68 },
    tagline: "A calmer pace. A proud student city.",
    intro: "Ibadan is home to the University of Ibadan and a large student community. Agbowo, Bodija and Samonda are familiar names for students looking off-campus.",
    neighbourhoods: [
      { name: "Agbowo", vibe: "Opposite UI, busy and very student-focused.", goodFor: ["Students", "Walk to campus"] },
      { name: "Bodija", vibe: "Quieter, residential and well established.", goodFor: ["Postgraduates", "Families"] },
      { name: "Samonda", vibe: "Close to campus with a mix of hostels and flats.", goodFor: ["Students", "Shared living"] },
      { name: "Orogun", vibe: "Further out with more affordable space.", goodFor: ["Budget-conscious", "Longer stays"] },
    ],
    guidance: [
      { title: "Plan around the session", copy: "Demand peaks before each academic session. Start looking early and confirm availability dates." },
      { title: "Check the road in", copy: "Some streets get rough in the rainy season. Ask how the route looks after a downpour." },
      { title: "Shared facilities", copy: "In hostels and shared flats, ask how kitchens, bathrooms and bills are shared." },
    ],
  },
  {
    slug: "abuja", country: "nigeria", name: "Abuja", region: "Federal Capital Territory", map: { x: 50, y: 52 },
    tagline: "Planned, green and growing.",
    intro: "Abuja's districts are spread out and well planned. The University of Abuja's main campus is in Gwagwalada, so many students live in and around the area council.",
    neighbourhoods: [
      { name: "Gwagwalada", vibe: "Home to the University of Abuja main campus.", goodFor: ["Students", "Affordable rooms"] },
      { name: "Wuse", vibe: "Central, busy and close to markets and offices.", goodFor: ["Professionals", "Short-term stays"] },
      { name: "Gwarinpa", vibe: "A large residential estate with plenty of options.", goodFor: ["Families", "Shared houses"] },
      { name: "Kubwa", vibe: "Affordable satellite town with a strong community feel.", goodFor: ["Budget-conscious", "Commuters"] },
    ],
    guidance: [
      { title: "Distances add up", copy: "Districts are far apart. Factor in the cost and time of your daily commute." },
      { title: "Estates have rules", copy: "Gated estates may have service charges and visitor rules. Ask for them up front." },
      { title: "Confirm documents", copy: "Ask who owns the property and who you'll sign with before any payment." },
    ],
  },
  {
    slug: "kigali", country: "rwanda", name: "Kigali", region: "City of Kigali", map: { x: 58, y: 42 },
    tagline: "A thousand hills. One place that feels like yours.",
    intro: "Kigali is home to University of Rwanda colleges, African Leadership University and a growing community of students, interns and professionals from across Africa and beyond.",
    neighbourhoods: [
      { name: "Kacyiru", vibe: "Central, calm and close to offices and embassies.", goodFor: ["Professionals", "Interns"] },
      { name: "Remera", vibe: "Busy and well connected, near the stadium and transport hubs.", goodFor: ["Students", "Shared houses"] },
      { name: "Nyamirambo", vibe: "Colourful, social and full of character.", goodFor: ["Budget-conscious", "Culture lovers"] },
      { name: "Kicukiro", vibe: "Residential, quieter and close to the airport side.", goodFor: ["Families", "Longer stays"] },
    ],
    guidance: [
      { title: "Check the climb", copy: "Some homes sit at the top of steep roads. Walk the route before you commit." },
      { title: "Monthly rent, clear deposit", copy: "Rent is usually monthly. Agree the deposit and notice period in writing." },
      { title: "Utilities and internet", copy: "Ask whether water, electricity and Wi-Fi are included or billed separately." },
    ],
  },
];

export const universities: University[] = [
  {
    slug: "university-of-lagos", name: "University of Lagos", short: "UNILAG", city: "lagos", country: "nigeria",
    campus: "Akoka, Yaba, Lagos",
    intro: "UNILAG's main campus sits on the Lagos Lagoon at Akoka. Many students live off-campus in nearby Akoka, Yaba, Bariga and Onike.",
    nearby: ["Akoka", "Yaba", "Bariga", "Onike"],
    tips: ["Start your search before resumption, when demand peaks.", "Walk or ride the route to your faculty at rush hour.", "Ask whether the rent is yearly and what one-off fees apply."],
  },
  {
    slug: "university-of-ibadan", name: "University of Ibadan", short: "UI", city: "ibadan", country: "nigeria",
    campus: "Oyo Road, Ibadan",
    intro: "UI is Nigeria's oldest university. Agbowo, Bodija, Samonda and Orogun are common off-campus choices.",
    nearby: ["Agbowo", "Bodija", "Samonda", "Orogun"],
    tips: ["Agbowo is closest to the main gate and fills up quickly.", "Check how water is supplied and stored.", "Clarify who handles repairs during the session."],
  },
  {
    slug: "university-of-abuja", name: "University of Abuja", short: "UniAbuja", city: "abuja", country: "nigeria",
    campus: "Main campus, Gwagwalada, FCT",
    intro: "The University of Abuja's main campus is in Gwagwalada. Students often look for rooms and shared flats within the area council.",
    nearby: ["Gwagwalada", "Dobi", "Kutunku", "Phase 3"],
    tips: ["Living in Gwagwalada saves a long commute from the city centre.", "Ask about security arrangements at night.", "Confirm availability dates against your session calendar."],
  },
  {
    slug: "university-of-rwanda", name: "University of Rwanda", short: "UR", city: "kigali", country: "rwanda",
    campus: "Several colleges, including campuses in Kigali and Huye",
    intro: "The University of Rwanda has colleges across the country, with several campuses in Kigali. Check which campus you'll study at before you search.",
    nearby: ["Nyarugenge", "Gikondo", "Remera", "Kicukiro"],
    tips: ["Confirm your college and campus first.", "Look at bus and moto routes between hills.", "Ask for the deposit and notice period in writing."],
  },
  {
    slug: "african-leadership-university", name: "African Leadership University", short: "ALU", city: "kigali", country: "rwanda",
    campus: "Kigali Innovation City, Kigali",
    intro: "ALU's Rwanda campus brings students from across Africa to Kigali. Many look for shared houses and furnished rooms with reliable internet.",
    nearby: ["Kimironko", "Kibagabaga", "Remera", "Gisozi"],
    tips: ["Reliable Wi-Fi matters. Ask for the provider and speed.", "Shared houses with other students are popular.", "Agree on furnishing in writing before you pay."],
  },
];

export const getCountry = (slug: string) => countries.find(country => country.slug === slug);
export const getCity = (country: string, slug: string) => cities.find(city => city.country === country && city.slug === slug);
export const getUniversity = (slug: string) => universities.find(university => university.slug === slug);
export const citiesIn = (country: string) => cities.filter(city => city.country === country);
export const universitiesIn = (filter: { country?: string; city?: string }) =>
  universities.filter(university => (!filter.country || university.country === filter.country) && (!filter.city || university.city === filter.city));
