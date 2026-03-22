import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'


import "./globals.css";
import { SchoolProvider } from "@/context/SchoolContext";





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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${sourceSans.variable} antialiased`}
      >
        <SchoolProvider>
          {children}
        </SchoolProvider>
      </body>
    </html>
  );
}
