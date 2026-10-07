import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import CountryView from "../_places/country-view";

export const metadata: Metadata = seo({
  title: "Accommodation in Nigeria | Lodgely",
  description: "Find student accommodation, rooms, apartments and rentals in Nigeria. Explore active cities, local renting tips and nearby universities.",
  path: "/nigeria",
});

export default function NigeriaPage() {
  return <CountryView slug="nigeria" />;
}
