"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useSchool } from "@/context/SchoolContext";
import { useFallbackImage } from "@/hooks/useFallbackImage";
import slugify from "@/utils/slugify";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const menuRef = useRef(null);

  const { schoolInfo } = useSchool();
  const { src: logoSrc, handleError: handleLogoError } = useFallbackImage(
    schoolInfo?.Logo_Url,
    "/logo/logo.png"
  );

  // API से कैटेगरीज और उनके पेजेस लोड करना
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get("/api/client/pages");
        if (response.data.status === "success") {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };
    fetchPages();
  }, []);

  // बाहर क्लिक करने पर मेनू बंद करने के लिए
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMobileLink = () => {
    setOpen(false);
    setOpenCategory(null);
  };

  return (
    <div ref={menuRef}>
      <nav className="bg-heritage-navy dark:bg-primary text-on-primary dark:text-inverse-on-surface docked full-width top sticky z-50 border-b-2 border-academic-gold shadow-md transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center px-gutter py-4 w-full max-w-container-max mx-auto">
          
          {/* लोगो सेक्शन */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <img 
                alt="School Logo" 
                className="h-12 w-auto object-contain" 
                src={logoSrc} 
                onError={handleLogoError}
              />
            </Link>
          </div>

          
          <div className="hidden md:flex items-center gap-8">
            <Link 
              className="font-label-caps text-label-caps text-academic-gold border-b-2 border-academic-gold pb-1 transition-all duration-300" 
              href="/"
            >
              Home
            </Link>

            {categories.map((cat) => (
              <div key={cat.Id} className="relative group py-2">
                {cat.pages?.length > 0 ? (
                  <>
                    {/* ड्रॉपडाउन ट्रिगर बटन */}
                    <button className="font-label-caps text-label-caps text-white hover:text-academic-gold transition-colors duration-200 flex items-center gap-1 focus:outline-none">
                      {cat.Name}
                      <svg className="h-3 w-3 transform transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* ड्रॉपडाउन बॉक्स */}
                    <div className="absolute left-0 mt-2 w-52 bg-heritage-navy border border-academic-gold/20 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
                      {cat.pages.map((page) => (
                        <Link
                          key={page.Id}
                          href={`/pages/${slugify(page.Name)}/${page.Id}`}
                          className="block font-label-caps text-xs text-white hover:text-academic-gold px-3 py-2 transition-colors duration-150"
                        >
                          {page.Name.replace(/-/g, " ")}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <button className="font-label-caps text-label-caps text-white hover:text-academic-gold transition-colors duration-200 focus:outline-none">
                    {cat.Name}
                  </button>
                )}
              </div>
            ))}
          </div>

         
          <button 
            onClick={() => setOpen(!open)} 
            className="md:hidden text-white hover:text-academic-gold focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      
        <div 
          className={`${open ? "flex" : "hidden"} md:hidden bg-heritage-navy border-t border-academic-gold/20 flex-col p-4 gap-3`}
          id="mobile-menu"
        >
          <Link onClick={handleMobileLink} className="font-label-caps text-label-caps text-academic-gold" href="/">Home</Link>
          
          {categories.map((cat) => (
            <div key={cat.Id} className="flex flex-col w-full">
              <hr className="border-academic-gold/10 my-1" />
              
              {cat.pages?.length > 0 ? (
                <>
                  <button
                    className="w-full text-left font-label-caps text-label-caps text-white flex justify-between items-center py-1"
                    onClick={() => setOpenCategory(openCategory === cat.Id ? null : cat.Id)}
                  >
                    <span>{cat.Name}</span>
                    <svg className={`h-4 w-4 transform transition-transform ${openCategory === cat.Id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  
                  <div className={`flex flex-col pl-4 gap-2 transition-all duration-200 overflow-hidden ${openCategory === cat.Id ? "max-h-60 mt-2 mb-1" : "max-h-0"}`}>
                    {cat.pages.map((page) => (
                      <Link
                        key={page.Id}
                        href={`/pages/${slugify(page.Name)}/${page.Id}`}
                        onClick={handleMobileLink}
                        className="font-label-caps text-xs text-gray-300 hover:text-academic-gold"
                      >
                        {page.Name.replace(/-/g, " ")}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <span className="font-label-caps text-label-caps text-white py-1">{cat.Name}</span>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}