import React from 'react'
import Navbar from './componests/layout/Navbar'
import Footer from './componests/layout/Footer'
import { Hanken_Grotesk, Public_Sans } from 'next/font/google';
import Popup from '@/components/layout/Popup';
import "./index.css";
export const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-hanken-grotesk', // CSS Variable name
});

// Public Sans Font setup
export const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-public-sans', // CSS Variable name
});




export default function MainThemeLayout({ children }) {
  return (
    <>
      <Popup />
      <main className="overflow-hidden">
        <Navbar />
        <div className="w-full">
          {children}
        </div>
        <Footer />
      </main>
    </>
  )
}
