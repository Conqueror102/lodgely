import type { Metadata } from "next";
import CountryView from "../_places/country-view";

export const metadata: Metadata = {
  title: "Accommodation in Nigeria | Lodgely",
  description: "Find student accommodation, rooms, apartments and rentals in Nigeria. Explore active cities, local renting tips and nearby universities.",
};

export default function NigeriaPage() {
  return <CountryView slug="nigeria" />;
}
