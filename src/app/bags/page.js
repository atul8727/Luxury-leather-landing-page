import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryModal from '@/components/modal/EnquiryModal';
import Hero from '@/components/sections/Hero';
import BagServices from '@/components/sections/BagServices/BagServices';
import Cities from '@/components/sections/Cities';
import BeforeAfter from '@/components/sections/BeforeAfter';
// import About from "@/components/sections/About";
import Maisons from '@/components/sections/Maisons';
import Process from '@/components/sections/Process';
import Reviews from '@/components/sections/Reviews';
import MoreServices from '@/components/sections/MoreServices';
import FAQ from '@/components/sections/FAQ';
// import CTA from "@/components/sections/CTA";
// import Contact from "@/components/sections/Contact";
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { BAG_PROCESS_STEPS } from '@/data/bagProcess';

import {
  BAG_BEFORE_AFTER,
  BAG_BEFORE_AFTER_EYEBROW,
  BAG_BEFORE_AFTER_TITLE,
  BAG_BEFORE_AFTER_DESCRIPTION,
} from '@/data/bagBeforeAfter';
import {
  BAG_MAISONS,
  BAG_MAISONS_EYEBROW,
  BAG_MAISONS_TITLE,
} from '@/data/bagMaisons';

export const metadata = {
  alternates: { canonical: '/bags' },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BagServices />
        {/* <Cities /> */}
        <BeforeAfter
          eyebrow={BAG_BEFORE_AFTER_EYEBROW}
          title={BAG_BEFORE_AFTER_TITLE}
          description={BAG_BEFORE_AFTER_DESCRIPTION}
          items={BAG_BEFORE_AFTER}
        />
        {/* <About /> */}
        <Maisons
          eyebrow={BAG_MAISONS_EYEBROW}
          title={BAG_MAISONS_TITLE}
          items={BAG_MAISONS}
        />
        <Process steps={BAG_PROCESS_STEPS} />
        <Reviews />
        <MoreServices />
        <FAQ />
        {/* <CTA /> */}
        {/* <Contact /> */}
      </main>
      <Footer />
      <EnquiryModal />
      <WhatsAppButton />
    </>
  );
}