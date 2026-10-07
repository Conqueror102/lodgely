import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { notFound } from "next/navigation";
import { citiesIn, getCity } from "@/data/places";
import CityView from "../../_places/city-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return citiesIn("nigeria").map(city => ({ city: city.slug }));
}

export async function generateMetadata({ params }: PageProps<"/nigeria/[city]">): Promise<Metadata> {
  const city = getCity("nigeria", (await params).city);
  return city ? seo({ title: `Accommodation in ${city.name}, Nigeria | Lodgely`, description: city.intro, path: `/nigeria/${city.slug}` }) : {};
}

export default async function CityPage({ params }: PageProps<"/nigeria/[city]">) {
  const city = getCity("nigeria", (await params).city);
  if (!city) notFound();
  return <CityView city={city} />;
}
