import type { Metadata } from "next";
import { seo, siteDescription, siteName, siteUrl } from "@/lib/seo";
import Hero from "@/components/home/hero";
import Ecosystem from "@/components/home/ecosystem";
import Accommodation from "@/components/home/accommodation";
import Students from "@/components/home/students";
import HowWorks from "@/components/home/how-works";
import Partners from "@/components/home/partners";
import Trust from "@/components/home/trust";
import Faq from "@/components/home/faq";

export const metadata: Metadata = seo({
  title: "Lodgely | Student Accommodation & Property Platform in Africa",
  description: siteDescription,
  path: "/",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: siteName, url: siteUrl, logo: `${siteUrl}/brand/lodgely-mark.png`, description: siteDescription },
    {
      "@type": "WebSite", "@id": `${siteUrl}/#website`, name: siteName, url: siteUrl, publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: { "@type": "SearchAction", target: `${siteUrl}/accommodation?q={search_term_string}`, "query-input": "required name=search_term_string" },
    },
  ],
};

/** The landing page. The shared header and footer come from the (site) layout. */
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Hero />
      <Ecosystem />
      <Accommodation />
      <Students />
      <HowWorks />
      <Partners />
      <Trust />
      <Faq />
    </>
  );
}
