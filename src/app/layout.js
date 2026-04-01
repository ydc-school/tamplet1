import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'


import "./globals.css";
import { SchoolProvider } from "@/context/SchoolContext";

import { getTheme } from "@/utils/applyTheme";



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

export const metadata = {
  title: "Yaduvanshi Degree College, Mahendergarh",
  description:
    "Yaduvanshi Degree College, Mahendergarh is among the top residential colleges in India.",
  metadataBase: new URL("https://ydcmgh.yaduvanshigroup.edu.in"),

  icons: {
    icon: "/assets/img/favicon/favicon-32x32.png",
    apple: "/assets/img/favicon/apple-touch-icon.png",
  },

  themeColor: "#ff3300",

  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({ children }) {

  const toRgb = (hex) => {
    if (!hex) return "0 0 0";

    const c = hex.replace("#", "");
    const n = parseInt(c, 16);

    return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
  };

  let theme;

  try {
    const res = await fetch(
      `http://localhost:3000/api/client/theme/1`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Fetch failed");

    theme = await res.json();

    

  } catch (err) {
    console.error("Theme fetch failed:", err);

    theme = {
      primaryColor: "#000000",
      secondaryColor: "#666666",
      accentColor: "#999999",
      backgroundColor: "#ffffff",
      textColor: "#000000",
    };
  }

  const style = {
    "--primary": theme.data.primaryColor,
    "--secondary": toRgb(theme.data.secondaryColor),
    "--accent": toRgb(theme.data.accentColor),
    "--bg": toRgb(theme.data.backgroundColor),
    "--text": toRgb(theme.data.textColor),
  };

  return (
    <html lang="en">
      <body
        style={style}  // ✅ IMPORTANT (tum bhool gaye the)
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${sourceSans.variable} antialiased`}
      >
        <SchoolProvider>
          {children}
        </SchoolProvider>
      </body>
    </html>
  );
}
