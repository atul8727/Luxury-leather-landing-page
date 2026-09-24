import { Roboto_Slab } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Single global font for the whole project.
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const robotoSlabBody = Roboto_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.luxuryleatherfurniturecare.com"),

  title: {
    default:
      "Luxury Leather and Furniture Care | Leather Cleaning & Restoration",
    template: "%s | Luxury Leather and Furniture Care",
  },

  description:
    "Expert leather cleaning, repair, restoration and protection for shoes, bags, jackets and furniture. Trusted by clients across Noida, Delhi, Bangalore, Hyderabad, Jaipur, Mumbai, Kolkata and Ludhiana.",

  keywords: [
    "leather restoration",
    "leather cleaning service",
    "shoe repair",
    "leather bag restoration",
    "leather furniture cleaning",
    "sneaker cleaning",
  ],

  openGraph: {
    title: "Luxury Leather and Furniture Care",
    description:
      "Bring your favourite leather pieces back to life. Expert cleaning, repair and restoration for shoes, bags, jackets and furniture.",
    url: "https://www.luxuryleatherfurniturecare.com",
    siteName: "Luxury Leather and Furniture Care",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Luxury Leather and Furniture Care",
    description:
      "Expert leather cleaning, repair, restoration and protection for shoes, bags, jackets and furniture.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${robotoSlab.variable} ${robotoSlabBody.variable}`}
    >
      <body className="font-body bg-cream text-ink antialiased">
        {children}

        {/* Google Ads Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-315165192"
          strategy="afterInteractive"
        />

        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-315165192');
          `}
        </Script>
      </body>
    </html>
  );
}
