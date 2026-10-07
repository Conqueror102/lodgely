import type { Metadata } from "next";
import Finder, { type Filters } from "./finder";

export const metadata: Metadata = {
  title: "Find Accommodation | Lodgely",
  description: "Search student accommodation, rooms, apartments, hostels and homes in Nigeria and Rwanda. Filter by city, university, budget and move-in date.",
};

const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

export default async function FindAccommodation({ searchParams }: PageProps<"/accommodation">) {
  const query = await searchParams;
  const initial: Filters = {
    q: one(query.q), country: one(query.country), city: one(query.city), university: one(query.university),
    types: one(query.type) ? one(query.type).split(",") : [], budget: Number(one(query.budget)) || 0,
    moveIn: one(query.moveIn), furnished: one(query.furnished) === "1", savedOnly: false,
    sort: one(query.sort) || "recommended", view: one(query.view) === "map" ? "map" : "grid",
  };
  return <Finder initial={initial} />;
}
