import type { Metadata } from "next";
import CountryView from "../_places/country-view";

export const metadata: Metadata = {
  title: "Accommodation in Rwanda | Lodgely",
  description: "Find student accommodation, rooms, apartments and rentals in Rwanda. Explore active cities, local renting tips and nearby universities.",
};

export default function RwandaPage() {
  return <CountryView slug="rwanda" />;
}
