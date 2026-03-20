import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SchoolProvider } from "@/context/SchoolContext";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SchoolProvider>
          {children}
        </SchoolProvider>
      </body>
    </html>
  );
}
