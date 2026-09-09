import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/constants";

const ICONS = {
  Facebook: "/icons/Group 76.png",
  X: "/icons/Group 77.png",
  Twitter: "/icons/Group 77.png",
  LinkedIn: "/icons/Group 78.png",
  Instagram: "/icons/Group 79.png",
};

const SOCIALS = ["Facebook", "X", "LinkedIn", "Instagram"];

export default function SocialRail() {
  return (
    <div
      className="
        absolute right-5 top-1/2 z-20
        hidden -translate-y-1/2 sm:flex
        flex-col items-center
      "
    >
      {/* Top Line */}
      {/* <span className="mb-4 h-10 w-px bg-white/40" /> */}

      {/* EXACTLY 4 ICONS */}
      <div className="flex flex-col items-center gap-3">
        {SOCIALS.map((social) => {
          const link = SOCIAL_LINKS.find(
            (item) => item.label.toLowerCase() === social.toLowerCase()
          );

          return (
            <a
              key={social}
              href={link?.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social}
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-full
                transition-all duration-300
                hover:scale-110
              "
            >
              <Image
                src={ICONS[social]}
                alt={social}
                width={36}
                height={36}
                priority
                className="h-9 w-9 object-contain"
              />
            </a>
          );
        })}
      </div>

      {/* Bottom Line */}
      {/* <span className="mt-4 h-10 w-px bg-white/40" /> */}
    </div>
  );
}