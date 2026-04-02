import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'


import "./globals.css";
import { SchoolProvider } from "@/context/SchoolContext";

import { getTheme } from "@/utils/applyTheme";
import { getSeoData } from "@/utils/getSeoData";
import SchemaScript from "@/components/SchemaScript";




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



export async function generateMetadata() {
  const seo = await getSeoData(1); // apna Branch_Id dalo

  if (!seo) return {}; // fallback — koi metadata nahi
 

  return {
    title: seo.Meta_Title,
    description: seo.Meta_Description,
    keywords: seo.Meta_Keywords,
    robots: seo.Robots,
    alternates: {
      canonical: seo.Canonical_Url,
    },
    openGraph: {
      title: seo.OG_Title,
      description: seo.OG_Description,
      images: seo.OG_Image ? [{ url: seo.OG_Image }] : [],
      type: seo.OG_Type,
    },
    twitter: {
      card: seo.Twitter_Card,
      title: seo.Twitter_Title,
      description: seo.Twitter_Description,
      images: seo.Twitter_Image ? [seo.Twitter_Image] : [],
    },
  };
} 












export default async function RootLayout({ children }) {

//  const seo = await getSeoData(2);



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
        {/* <SchemaScript schemaJson={seo?.Schema_Json} /> */}
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
