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
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div ref={menuRef} className="font-sans relative z-[999]">
      {/* Top Gold Line */}
      <div className="h-[4px] bg-amber-400 w-full" />

      {/* Header Branding */}
      <div className="bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-[194px] h-[54px] flex items-center justify-center relative transition-transform duration-300 group-hover:scale-[1.02]">
              <Image src={logoSrc} alt={schoolName} width={194} height={54} className="object-contain" onError={handleLogoError} unoptimized priority />
            </div>
            <div className="hidden sm:block">
              {schoolLoading ? (
                <div className="space-y-2">
                  <div className="h-5 w-48 bg-[#01327F]/10 animate-pulse rounded-md" />
                  <div className="h-3 w-24 bg-amber-400/20 animate-pulse rounded-md" />
                </div>
              ) : (
                <>
                  <h1 className="text-lg md:text-xl font-bold text-[#01327F] leading-tight tracking-tight transition-colors duration-300 group-hover:text-amber-500">{schoolName}</h1>
                  <p className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase mt-0.5">{shortName}</p>
                </>
              )}
            </div>
          </Link>
          <div className="relative transition-transform duration-300 hover:scale-[1.01]">
            <Image src="/poster/31y.png" alt="Admission Banner" width={180} height={55} className="object-contain max-h-[55px] rounded-xl" priority />
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`sticky top-0 z-[999] w-full transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md bg-[#01327F]/[0.02]" : "bg-[#01327F]"}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between">
          
          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center h-full gap-1">
            <li>
              <Link href="/" className={`px-4 h-[64px] flex items-center text-sm font-semibold tracking-wide transition-all duration-300 ${scrolled ? "text-[#01327F] hover:text-amber-500" : "text-white hover:text-amber-400"}`}>
                Home
              </Link>
            </li>

            {loadingPages ? (
              <div className="flex items-center gap-4 px-4">
                <div className="h-4 w-16 bg-white/20 animate-pulse rounded-full" />
                <div className="h-4 w-20 bg-white/20 animate-pulse rounded-full" />
                <div className="h-4 w-16 bg-white/20 animate-pulse rounded-full" />
              </div>
            ) : (
              categories?.map((cat) => (
                <li key={cat?.Id} className="group relative h-full flex items-center">
                  <button className={`px-4 h-[64px] flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-all duration-300 ${scrolled ? "text-[#01327F]" : "text-white"}`}>
                    <span className="group-hover:text-amber-400 transition-colors duration-300">{cat?.Name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 group-hover:rotate-180 ${scrolled ? "text-amber-500" : "text-amber-400"}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 hidden group-hover:block w-60 bg-white rounded-b-2xl transition-all duration-300 p-2 text-[#01327F]/10">
                    <div className="bg-white rounded-xl p-1.5 overflow-hidden">
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
          <div className="flex items-center gap-4 ml-auto">
            {/* Desktop CTA */}
            <Link href="/admission-form" className={`hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 ${scrolled ? "bg-[#01327F] text-white hover:bg-amber-500 hover:text-[#01327F]" : "bg-amber-400 text-[#01327F] hover:bg-amber-500"}`}>
              Student Admission &rarr;
            </Link>

            {/* Mobile Toggle Button */}
            <button className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${scrolled ? "bg-[#01327F]/5 text-[#01327F] hover:bg-[#01327F]/10" : "bg-white/10 text-white hover:bg-white/20"}`} onClick={() => setOpen(!open)} aria-label="Toggle navigation menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Panel */}
      <div className={`lg:hidden fixed inset-x-0 bottom-0 top-[128px] z-[998] bg-white transition-transform duration-300 ease-in-out transform ${open ? "translate-x-0" : "translate-x-full"} overflow-y-auto`}>
        <div className="flex flex-col p-6 gap-2 bg-[#01327F]/[0.02] min-h-full">
          <Link href="/" onClick={() => setOpen(false)} className="py-3.5 px-4 text-sm font-bold tracking-wide text-[#01327F] hover:bg-[#01327F]/[0.04] rounded-xl transition-all duration-200">
            Home
          </Link>
          
          {loadingPages ? (
            <div className="space-y-4 px-4 py-3">
              <div className="h-5 w-full bg-[#01327F]/5 animate-pulse rounded-lg" />
              <div className="h-5 w-full bg-[#01327F]/5 animate-pulse rounded-lg" />
              <div className="h-5 w-full bg-[#01327F]/5 animate-pulse rounded-lg" />
            </div>
          ) : (
            categories?.map((cat) => (
              <div key={cat?.Id} className="bg-white rounded-2xl overflow-hidden transition-all">
                <button onClick={() => setOpenCategory(openCategory === cat?.Id ? null : cat?.Id)} className="w-full flex justify-between items-center py-3.5 px-4 text-sm font-bold tracking-wide text-[#01327F] hover:bg-[#01327F]/[0.02] transition-all duration-200">
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
          
          <Link href="/admission-form" onClick={() => setOpen(false)} className="mt-6 bg-[#01327F] text-white text-center font-bold text-sm uppercase tracking-wider p-4 rounded-xl transition-all duration-300 hover:bg-amber-500 hover:text-[#01327F] active:scale-[0.99]">
            Student Admission
          </Link>
        </div>
      </div>
    </div>
  );
}