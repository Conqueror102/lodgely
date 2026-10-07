import type { Metadata } from "next";

/** Public address of the site. Set NEXT_PUBLIC_SITE_URL in production so share links and the sitemap use the real domain. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const siteName = "Lodgely";
export const siteDescription = "Find student accommodation, rooms, apartments and rental properties in Nigeria and Rwanda. Connect with property owners, agents and institutions.";

/** The branded 1200×630 image shown when a page is shared. */
export const shareImage = { url: "/brand/og-image.png", width: 1200, height: 630, alt: "Lodgely: find your place, make it home" };

/** Page metadata with a canonical URL and matching Open Graph and Twitter cards. */
export function seo({ title, description, path, noindex = false }: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName, type: "website", locale: "en_NG", images: [shareImage] },
    twitter: { card: "summary_large_image", title, description, images: [shareImage.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
