import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import CountryView from "../_places/country-view";

export const metadata: Metadata = seo({
  title: "Accommodation in Rwanda | Lodgely",
  description: "Find student accommodation, rooms, apartments and rentals in Rwanda. Explore active cities, local renting tips and nearby universities.",
  path: "/rwanda",
});

export default function RwandaPage() {
  return <CountryView slug="rwanda" />;
}
