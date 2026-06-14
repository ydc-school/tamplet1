"use client"
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Search, ExternalLink } from "lucide-react";
// Assuming these exist in your project path, kept as per your logic
// import { useSchool } from "@/context/SchoolContext";
// import { useFallbackImage } from "@/hooks/useFallbackImage";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // MOCK: Replace these with your actual context hooks
  const schoolInfo = { School_Name: "Heritage Academy", Short_Name: "Degree College", Logo_Url: "" };
  const loading = false;
  const logoSrc = "/logo/logo.png";
  const handleLogoError = (e) => (e.target.src = "/logo/fallback.png");

  const schoolName = schoolInfo?.School_Name ?? "Heritage Academy";
  const shortName = schoolInfo?.Short_Name ?? "Degree College";

  useEffect(() => {
    const fetchPages = async () => {
      try {
        // Keeping your fetching logic
        // const response = await axios.get("/api/client/pages");
        // if (response.data.status === "success") setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };
    fetchPages();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header 
      className={`bg-secondary-container sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "border-on-surface/20 py-2" : "border-on-surface/10 py-4"
      }`}
      ref={menuRef}
    >
      <div className="flex justify-between items-center w-full px-6 md:px-16 max-w-[1280px] mx-auto">
        {/* Brand Logo & Name */}
        <a href="/" className="flex items-center gap-3">
          <div className="bg-secondary-container p-2 rounded">
             <img src={logoSrc} alt="Logo" className="w-10 h-10 object-contain" onError={handleLogoError} />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-primary leading-tight">{loading ? "..." : schoolName}</span>
            <span className="text-xs text-secondary">{loading ? "" : shortName}</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {["Academics", "Admissions", "Campus Life", "About"].map((item) => (
            <a key={item} href="#" className="font-medium text-sm text-secondary hover:text-primary transition-colors uppercase tracking-widest">
              {item}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-surface-variant/20 transition-all">
            <Search className="w-5 h-5 text-primary" />
          </button>
          
          <button className="hidden md:block bg-primary text-white text-xs px-6 py-3 uppercase tracking-widest font-bold hover:opacity-90 transition-opacity">
            Apply Now
          </button>

          <button 
            className="md:hidden p-2" 
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="text-primary" /> : <Menu className="text-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-surface shadow-xl p-6 md:hidden animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-6">
            {["Academics", "Admissions", "Campus Life", "About"].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-lg font-medium text-primary border-b border-surface-variant pb-2"
                onClick={() => setOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="w-full bg-primary text-white py-4 uppercase font-bold">Apply Now</button>
          </div>
        </div>
      )}
    </header>
  );
}