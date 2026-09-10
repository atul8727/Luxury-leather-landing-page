import Image from "next/image";
import Container from "@/components/ui/Container"; 
import SectionHeading from "@/components/ui/SectionHeading"; 
import { BEFORE_AFTER } from "@/data/beforeAfter"; 
import BeforeAfterCard from "./BeforeAfterCard"; 

function ShoeIcon({ className = "" }) {
  return (
    <div className={`relative h-5 w-[42px] ${className}`}>
      <Image
        src="/icons/Vector.png" 
        alt=""
        fill
        sizes="42px"
        className="object-contain brightness-0 invert" 
        aria-hidden="true"
      />
    </div>
  );
}
 
export default function BeforeAfter() { 
  return ( 
    <section id="before-after" className="bg-results py-20 lg:py-28"> 
      <Container> 
        {/* Heading Section with White Image Icon */}
        <div className="flex flex-col items-center text-center">
          <ShoeIcon className="mb-2" />
          <SectionHeading 
            eyebrow="Before &amp; After" 
            title="Real Work. Real Results." 
            tone="light" 
            description="We offer expert leather repair for wallets, jackets, handbags, shoes and furniture. Our experienced professionals repair scratches, rips, faded colour, cuts and other damage — working confidently across nubuck, patent, coated canvas, metallic leather and suede." 
          /> 
        </div>
 
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"> 
          {BEFORE_AFTER.map((item) => ( 
            <BeforeAfterCard key={item.id} item={item} /> 
          ))} 
        </div> 
 
        <p className="mt-8 text-center text-[13px] text-navbar-text/60"> 
          Drag the handle, or use the arrow keys once focused, to compare before and after. 
        </p> 
      </Container> 
    </section> 
  ); 
}