import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'


import "./globals.css";
import { SchoolProvider } from "@/context/SchoolContext";

import { getTheme } from "@/utils/applyTheme";
import { getSeoData } from "@/utils/getSeoData";
import SchemaScript from "@/components/SchemaScript";
import { headers } from "next/headers";




const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-source',
  display: 'swap',
})









const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});










const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Yaduvanshi Degree College, Mahendergarh",
//   description:
//     "Yaduvanshi Degree College, Mahendergarh is among the top residential colleges in India.",
//   metadataBase: new URL("https://ydcmgh.yaduvanshigroup.edu.in"),

//   icons: {
//     icon: "/assets/img/favicon/favicon-32x32.png",
//     apple: "/assets/img/favicon/apple-touch-icon.png",
//   },

//   themeColor: "#ff3300",

//   alternates: {
//     canonical: "/",
//   },
// };












// Default metadata — jab SEO data na mile
const DEFAULT_METADATA = {
  title: "Yaduvanshi Group of Institutions",
  description: "Yaduvanshi Group of Institutions — Quality Education Since 1995.",
  keywords: "yaduvanshi, college, haryana, education",
  robots: "index, follow",
  canonical: "https://yaduvanshigroup.edu.in",
  favicon: "/assets/img/favicon/favicon-32x32.png",
  og: {
    title: "Yaduvanshi Group of Institutions",
    description: "Quality Education Since 1995.",
    image: null,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yaduvanshi Group of Institutions",
    description: "Quality Education Since 1995.",
    image: null,
  },
};

export async function generateMetadata() {
  const headerList = await headers();
  const seo = await getSeoData(2, headerList);

  const d = DEFAULT_METADATA; // shorthand

  return {
    title:       seo?.Meta_Title       || d.title,
    description: seo?.Meta_Description || d.description,
    keywords:    seo?.Meta_Keywords    || d.keywords,
    robots:      seo?.Robots           || d.robots,

    alternates: {
      canonical: seo?.Canonical_Url || d.canonical,
    },

    icons: {
      icon: seo?.Favicon_Url || d.favicon,
    },

    openGraph: {
      title:       seo?.OG_Title       || d.og.title,
      description: seo?.OG_Description || d.og.description,
      images:      seo?.OG_Image       ? [{ url: seo.OG_Image }] : d.og.image ? [{ url: d.og.image }] : [],
      type:        seo?.OG_Type        || d.og.type,
    },

    twitter: {
      card:        seo?.Twitter_Card        || d.twitter.card,
      title:       seo?.Twitter_Title       || d.twitter.title,
      description: seo?.Twitter_Description || d.twitter.description,
      images:      seo?.Twitter_Image       ? [seo.Twitter_Image] : d.twitter.image ? [d.twitter.image] : [],
    },
  };
}











export default async function RootLayout({ children }) {

   const headerList = await headers(); // ✅ async ke andar
  const seo = await getSeoData(2, headerList); // ✅ headers pass


  // const toRgb = (hex) => {
  //   if (!hex) return "0 0 0";

  //   const c = hex.replace("#", "");
  //   const n = parseInt(c, 16);

  //   return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
  // };

  // let theme;

  // try {
  //   const res = await fetch(
  //     `http://localhost:3000/api/client/theme/1`,
  //     {
  //       cache: "no-store",
  //     }
  //   );

  //   if (!res.ok) throw new Error("Fetch failed");

  //   theme = await res.json();

    

  // } catch (err) {
  //   console.error("Theme fetch failed:", err);

  //   theme = {
  //     primaryColor: "#000000",
  //     secondaryColor: "#666666",
  //     accentColor: "#999999",
  //     backgroundColor: "#ffffff",
  //     textColor: "#000000",
  //   };
  // }

  // const style = {
  //   "--primary": theme.data.primaryColor,
  //   "--secondary": toRgb(theme.data.secondaryColor),
  //   "--accent": toRgb(theme.data.accentColor),
  //   "--bg": toRgb(theme.data.backgroundColor),
  //   "--text": toRgb(theme.data.textColor),
  // };

  return (
    <html lang="en">
        <head>
        {/* Schema JSON-LD */}
        <SchemaScript schemaJson={seo?.Schema_Json} />
      </head>
      <body
        // style={style}  // ✅ IMPORTANT (tum bhool gaye the)
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${sourceSans.variable} antialiased`}
      >
        <SchoolProvider>
          {children}
        </SchoolProvider>
      </body>
    </html>
  );
}
