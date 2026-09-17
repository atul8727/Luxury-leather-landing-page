'use client';

import Image from 'next/image';

const SOCIALS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/luxuryleatherandfurniturecare',
    icon: '/icons/Group 76.png',
  },
  {
    name: 'X',
    href: 'https://x.com/luxuryleatherfc?mx=2',
    icon: '/icons/Group 77.png',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/luxury-leather-and-furniture-care/home/',
    icon: '/icons/Group 78.png',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/luxuryleatherandfurniturecare/',
    icon: '/icons/Group 79.png',
  },
];

export default function SocialRail() {
  return (
    <div
      className="
        absolute right-5 top-1/2 z-20
        hidden -translate-y-1/2 sm:flex
        flex-col items-center
      "
    >
      {/* Social Icons */}
      <div className="flex flex-col items-center gap-3">
        {SOCIALS.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full
              transition-all duration-300
              hover:scale-110
            "
          >
            <Image src={social.icon} alt={social.name} width={36} height={36} className="h-9 w-9 object-contain" draggable={false} />
          </a>
        ))}
      </div>
    </div>
  );
}
