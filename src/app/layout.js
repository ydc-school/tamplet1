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
  title: "Yaduvanshi Degree College",
  description: "Among the top residential colleges in India.",
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
