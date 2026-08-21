import React from 'react'
import { Montserrat, Playfair_Display } from "next/font/google";
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import "./index.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap", // 🆕 Prevent FOIT (Flash of Invisible Text)
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});



export default function Layout({ children }) {
  return (
    <>
    
      <main className="overflow-hidden">
        <Navbar />
        <div className="w-full">
          {children}
        </div>
        <Footer/>
      </main>
    </>
  )
}
