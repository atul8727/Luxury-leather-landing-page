import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromoModal from "@/components/modal/PromoModal";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Cities from "@/components/sections/Cities";
import BeforeAfter from "@/components/sections/BeforeAfter";
// import About from "@/components/sections/About";
import Maisons from "@/components/sections/Maisons";
import Process from "@/components/sections/Process";
import Reviews from "@/components/sections/Reviews";
import MoreServices from "@/components/sections/MoreServices";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* <About /> */}
        <Services />
        <BeforeAfter />
         <Maisons />
        {/* <Cities /> */}
        <Process />
        <Reviews />
        <MoreServices />
        <FAQ />
        {/* <CTA /> */}
        {/* <Contact /> */}
      </main>
      <Footer />
      {/* <PromoModal /> */}
    </>
  );
}
