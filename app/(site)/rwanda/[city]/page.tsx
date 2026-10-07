import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { notFound } from "next/navigation";
import { citiesIn, getCity } from "@/data/places";
import CityView from "../../_places/city-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return citiesIn("rwanda").map(city => ({ city: city.slug }));
}

export async function generateMetadata({ params }: PageProps<"/rwanda/[city]">): Promise<Metadata> {
  const city = getCity("rwanda", (await params).city);
  return city ? seo({ title: `Accommodation in ${city.name}, Rwanda | Lodgely`, description: city.intro, path: `/rwanda/${city.slug}` }) : {};
}

export default async function CityPage({ params }: PageProps<"/rwanda/[city]">) {
  const city = getCity("rwanda", (await params).city);
  if (!city) notFound();
  return <CityView city={city} />;
}
