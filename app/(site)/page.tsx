import Hero from "@/components/home/hero";
import Ecosystem from "@/components/home/ecosystem";
import Accommodation from "@/components/home/accommodation";
import Students from "@/components/home/students";
import HowWorks from "@/components/home/how-works";
import Partners from "@/components/home/partners";
import Trust from "@/components/home/trust";
import Faq from "@/components/home/faq";

/** The landing page. The shared header and footer come from the (site) layout. */
export default function Home() {
  return (
    <>
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
