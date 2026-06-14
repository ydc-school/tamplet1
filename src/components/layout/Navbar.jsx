"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useSchool } from "@/context/SchoolContext";
import { useFallbackImage } from "@/hooks/useFallbackImage";
import slugify from "@/utils/slugify";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const { schoolInfo, loading } = useSchool();
  const { src: logoSrc, handleError: handleLogoError } = useFallbackImage(schoolInfo?.Logo_Url, "/logo/logo.png");

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get("/api/client/pages");
        if (response.data.status === "success") setCategories(response.data.data);
      } catch (error) { console.error("Error:", error); }
    };
    fetchPages();

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="relative z-[1000] font-sans">
      <div className="h-1.5 w-full bg-amber-500" /> {/* Gold Accent Strip */}
      
      {/* Branding Section */}
      <div className="bg-white py-6 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-5">
            <div className="w-[180px] h-[50px] relative">
              <Image src={logoSrc} alt="Logo" fill className="object-contain" onError={handleLogoError} priority />
            </div>
            {!loading && (
              <div>
                <h1 className="text-xl font-bold text-stone-900 tracking-tight">{schoolInfo?.School_Name}</h1>
                <p className="text-[10px] font-bold tracking-[0.25em] text-amber-800 uppercase">{schoolInfo?.Short_Name}</p>
              </div>
            )}
          </Link>
          <div className="hidden md:block">
            <Image src="/poster/31y.png" alt="Admission" width={160} height={45} className="object-contain" priority />
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`sticky top-0 transition-all ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-stone-900 text-white"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <ul className="hidden md:flex items-center h-full gap-8 text-sm font-medium">
            <li><Link href="/" className="hover:text-amber-500">Home</Link></li>
            {categories.map((cat) => (
              <li key={cat.Id} className="group relative h-full flex items-center cursor-pointer hover:text-amber-500">
                {cat.Name} <ChevronDown className="w-3 h-3 ml-1" />
                {/* Desktop Dropdown */}
                <div className="absolute top-full left-0 w-64 bg-white text-stone-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible border-t-2 border-amber-500">
                  {cat.pages?.map((p) => (
                    <Link key={p.Id} href={`/pages/${slugify(p.Name)}/${p.Id}`} className="block px-6 py-3 hover:bg-stone-50 text-xs uppercase font-bold tracking-wider">{p.Name}</Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <Link href="/admission-form" className="px-6 py-2 rounded-full text-[10px] font-bold uppercase bg-amber-500 text-stone-900 hover:bg-amber-600 transition">
            Admission →
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden"><Menu /></button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-[1100] bg-white p-8 md:hidden overflow-y-auto">
          <button onClick={() => setOpen(false)} className="absolute top-8 right-8"><X /></button>
          <div className="flex flex-col gap-6 text-xl font-serif mt-12">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            {categories.map((cat) => (
              <div key={cat.Id}>
                <button className="flex justify-between w-full font-bold text-amber-800" onClick={() => setOpenCategory(openCategory === cat.Id ? null : cat.Id)}>
                    {cat.Name} <ChevronDown />
                </button>
                {openCategory === cat.Id && (
                    <div className="flex flex-col gap-2 mt-4 ml-4">
                        {cat.pages?.map((p) => <Link key={p.Id} href={`/pages/${slugify(p.Name)}/${p.Id}`} onClick={() => setOpen(false)} className="text-sm">{p.Name}</Link>)}
                    </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}