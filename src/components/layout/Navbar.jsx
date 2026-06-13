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
  const [loadingPages, setLoadingPages] = useState(true);
  const menuRef = useRef(null);

  const { schoolInfo, loading: schoolLoading } = useSchool();
  const { src: logoSrc, handleError: handleLogoError } = useFallbackImage(
    schoolInfo?.Logo_Url,
    "/logo/logo.png"
  );

  const schoolName = schoolInfo?.School_Name ?? "Yaduvanshi";
  const shortName = schoolInfo?.Short_Name ?? "Degree College";

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get("/api/client/pages");
        if (response.data?.status === "success") {
          setCategories(response.data?.data ?? []);
        }
      } catch (error) { 
        console.error("Error fetching pages:", error); 
      } finally {
        setLoadingPages(false);
      }
    };
    fetchPages();
    
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div ref={menuRef} className="font-sans relative z-[999]">
      {/* Top Gold Line */}
      <div className="h-[4px] bg-amber-400 w-full" />

      {/* Header Branding */}
      <div className="bg-white border-b border-gray-100 lg:border-none">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
            <div className="w-[150px] h-[45px] sm:w-[194px] sm:h-[54px] flex items-center justify-center relative transition-transform duration-300 group-hover:scale-[1.02]">
              <Image src={logoSrc} alt={schoolName} fill className="object-contain" onError={handleLogoError} unoptimized priority />
            </div>
            <div className="hidden xs:block sm:block">
              {schoolLoading ? (
                <div className="space-y-2">
                  <div className="h-5 w-36 sm:w-48 bg-[#01327F]/10 animate-pulse rounded-md" />
                  <div className="h-3 w-20 sm:w-24 bg-amber-400/20 animate-pulse rounded-md" />
                </div>
              ) : (
                <>
                  <h1 className="text-base sm:text-lg md:text-xl font-bold text-[#01327F] leading-tight tracking-tight transition-colors duration-300 group-hover:text-amber-500">{schoolName}</h1>
                  <p className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-amber-500 uppercase mt-0.5">{shortName}</p>
                </>
              )}
            </div>
          </Link>
          <div className="relative transition-transform duration-300 hover:scale-[1.01] w-full sm:w-auto flex justify-center sm:justify-end">
            <Image src="/poster/31y.png" alt="Admission Banner" width={180} height={55} className="object-contain max-h-[45px] sm:max-h-[55px] rounded-xl" priority />
          </div>
        </div>
      </div>

      {/* Main Nav Navigation */}
      <nav className={`sticky top-0 z-[999] w-full transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md text-[#01327F]" : "bg-[#01327F] text-white"}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[56px] sm:h-[64px] flex items-center justify-between">
          
          <span className="lg:hidden font-bold text-sm tracking-wider uppercase">
            {scrolled ? <span className="text-[#01327F]">Menu</span> : <span className="text-white">Menu</span>}
          </span>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center h-full gap-1">
            <li>
              <Link href="/" className={`px-4 h-[64px] flex items-center text-sm font-semibold tracking-wide transition-all duration-300 ${scrolled ? "text-[#01327F] hover:text-amber-500" : "text-white hover:text-amber-400"}`}>
                Home
              </Link>
            </li>

            {loadingPages ? (
              <div className="flex items-center gap-4 px-4">
                <div className="h-4 w-16 bg-current opacity-20 animate-pulse rounded-full" />
                <div className="h-4 w-20 bg-current opacity-20 animate-pulse rounded-full" />
              </div>
            ) : (
              categories?.map((cat) => (
                <li key={cat?.Id} className="group relative h-full flex items-center">
                  <button className={`px-4 h-[64px] flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-all duration-300 ${scrolled ? "text-[#01327F]" : "text-white"}`}>
                    <span className="group-hover:text-amber-400 transition-colors duration-300">{cat?.Name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 group-hover:rotate-180 ${scrolled ? "text-amber-500" : "text-amber-400"}`} />
                  </button>
                  
                  <div className="absolute top-full left-0 hidden group-hover:block w-60 bg-white rounded-b-2xl shadow-xl p-2 z-[1000]">
                    <div className="bg-white rounded-xl p-1.5 overflow-hidden border border-gray-100">
                      {cat?.pages?.map((p) => (
                        <Link key={p?.Id} href={`/pages/${slugify(p?.Name ?? "")}/${p?.Id}`} className="block px-4 py-3 text-[13.5px] font-medium text-[#01327F] hover:bg-[#01327F]/[0.04] hover:text-amber-500 rounded-xl transition-all duration-200 capitalize">
                          {p?.Name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>

          {/* CTA & Mobile trigger arrangement */}
          <div className="flex items-center gap-4">
            <Link href="/admission-form" className={`hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 ${scrolled ? "bg-[#01327F] text-white hover:bg-amber-500 hover:text-[#01327F]" : "bg-amber-400 text-[#01327F] hover:bg-amber-500"}`}>
              Student Admission &rarr;
            </Link>

            {/* Mobile Toggle Button */}
            <button className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${scrolled ? "bg-[#01327F]/5 text-[#01327F] hover:bg-[#01327F]/10" : "bg-white/10 text-white hover:bg-white/20"}`} onClick={() => setOpen(!open)} aria-label="Toggle navigation menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* FIXED MOBILE DRAWER PANEL - Pure screen-height based overlay */}
      <div className={`lg:hidden fixed inset-0 z-[1001] bg-white transition-all duration-300 ease-in-out ${open ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"}`}>
        
        {/* Mobile Menu Header inside Drawer */}
        <div className="flex items-center justify-between px-4 h-[56px] border-b border-gray-100 bg-[#01327F] text-white">
          <span className="font-bold text-sm tracking-wider uppercase">Navigation Menu</span>
          <button onClick={() => setOpen(false)} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto h-[calc(100vh-56px)] bg-[#01327F]/[0.02] p-4 flex flex-col gap-2 pb-28">
          <Link href="/" onClick={() => setOpen(false)} className="py-3.5 px-4 text-sm font-bold tracking-wide text-[#01327F] hover:bg-[#01327F]/[0.04] rounded-xl transition-all duration-200">
            Home
          </Link>
          
          {loadingPages ? (
            <div className="space-y-4 px-4 py-3">
              <div className="h-5 w-full bg-[#01327F]/5 animate-pulse rounded-lg" />
              <div className="h-5 w-full bg-[#01327F]/5 animate-pulse rounded-lg" />
            </div>
          ) : (
            categories?.map((cat) => (
              <div key={cat?.Id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100/50">
                <button onClick={() => setOpenCategory(openCategory === cat?.Id ? null : cat?.Id)} className="w-full flex justify-between items-center py-3.5 px-4 text-sm font-bold tracking-wide text-[#01327F] transition-all duration-200">
                  <span>{cat?.Name}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-500 transition-transform duration-300 ${openCategory === cat?.Id ? "rotate-180" : ""}`} />
                </button>
                
                {openCategory === cat?.Id && (
                  <div className="bg-[#01327F]/[0.02] px-2 pb-2 pt-1 space-y-1">
                    {cat?.pages?.map((p) => (
                      <Link key={p?.Id} href={`/pages/${slugify(p?.Name ?? "")}/${p?.Id}`} onClick={() => setOpen(false)} className="block py-3 px-6 text-[13px] font-semibold text-[#01327F]/80 hover:text-amber-500 transition-all duration-200 capitalize rounded-xl">
                        {p?.Name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
          
          <Link href="/admission-form" onClick={() => setOpen(false)} className="mt-4 bg-[#01327F] text-white text-center font-bold text-sm uppercase tracking-wider p-4 rounded-xl shadow-lg transition-all duration-300 hover:bg-amber-500 hover:text-[#01327F] active:scale-[0.99]">
            Student Admission
          </Link>
        </div>
      </div>
    </div>
  );
}