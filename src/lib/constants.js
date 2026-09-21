
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

export const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  // {
  //   label: 'Atelier',
  //   href: 'https://luxuryleatherfurniturecare.com/',
  // },

{
  label: 'Atelier',
  href: '#atelier',
},

  {
    label: 'Before & After',
    href: '#before-after',
  },
  // {
  //   label: 'About Us',
  //   href: 'https://luxuryleatherfurniturecare.com/about-us/',
  // },

  {
  label: 'About Us',              
  href: '#more-services',       
},

  {
    label: 'Reviews',
    href: '#reviews',
  },
  {
    label: 'Contact',
    href: 'enquiry',
  },
];

export const SITE = {
  name: 'Luxury Leather and Furniture Care',
  phone: '+91 92892 38864',
  phoneHref: 'tel:+919289238864',
  // email: 'info@luxuryleatherfurniturecare.com',
  // emailHref: 'mailto:info@luxuryleatherfurniturecare.com',
  email: 'info@luxuryleatherfurniturecare.in',
emailHref: 'mailto:info@luxuryleatherfurniturecare.in',
  tagline: 'Bring Your Favourite Pieces Back to Life.',
};

export const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
  },
{
  label: 'WhatsApp',
  href: `https://wa.me/${WHATSAPP_NUMBER}`,
},
  {
    label: 'YouTube',
    href: 'https://youtube.com',
  },
];

export const NAVBAR_HEIGHT = 84;
