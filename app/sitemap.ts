import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { cities, universities } from "@/data/places";
import { siteUrl } from "@/lib/seo";

const pages = [
  "/", "/accommodation", "/accommodation/student-accommodation", "/nigeria", "/rwanda", "/universities",
  "/landlords", "/list-your-property", "/agents", "/institutions", "/about", "/contact", "/guides", "/trust-and-safety",
];

/** Public pages only: sample listings and draft legal pages are kept out until they are real. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...pages,
    ...cities.map(city => `/${city.country}/${city.slug}`),
    ...universities.map(university => `/universities/${university.slug}`),
    ...guides.map(guide => `/guides/${guide.slug}`),
  ];
  return paths.map(path => ({ url: `${siteUrl}${path}`, changeFrequency: "weekly", priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8 }));
}
