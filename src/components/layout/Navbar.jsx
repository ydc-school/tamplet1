"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useSchool } from "@/context/SchoolContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const menuRef = useRef(null);

  const { schoolInfo, loading } = useSchool();

  const schoolName = schoolInfo?.School_Name ?? "Yaduvanshi";
  const shortName = schoolInfo?.Short_Name ?? "Degree College";
  const logoUrl = schoolInfo?.Logo_Url
    ? `/uploads/${schoolInfo.Logo_Url}`
    : "/logo/logo.png";

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

  // Close mobile menu on route click
  const handleMobileLink = () => setOpen(false);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav ref={menuRef} className="w-full h-[72px] bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">

        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-36   sm:w-44 md:w-56 h-full relative flex-shrink-0">
            <Image
              src={logoUrl}
              alt={`${schoolName} Logo`}
              width={502}
              height={82}
              className="object-contain  h-full"
              onError={(e) => { e.currentTarget.src = "/logo/logo.png"; }}
            />
          </div>
          <div className="hidden sm:block min-w-0">
            <h1 className="text-base md:text-lg font-black text-gray-900 leading-none capitalize truncate">
              {loading ? "Loading…" : schoolName}
            </h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
              {loading ? "" : shortName}
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 lg:gap-8 text-[14px] lg:text-[15px] font-bold text-gray-700">
          <li className="cursor-pointer text-blue-600">
            <Link href="/">Home</Link>
          </li>

          {categories.map((category) => (
            <li
              key={category.Id}
              className="relative group cursor-pointer hover:text-blue-600 transition-colors capitalize"
            >
              <span className="flex items-center gap-1">
                {category.Name}
                {category.pages?.length > 0 && (
                  <svg className="w-3 h-3 mt-0.5 opacity-50 group-hover:opacity-100 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </span>
              {category.pages?.length > 0 && (
                <ul className="absolute left-0 top-full mt-3 w-52 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 overflow-hidden">
                  {category.pages.map((page) => (
                    <li key={page.Id} className="hover:bg-blue-50 transition-colors">
                      <Link
                        href={`/pages/${page.Id}`}
                        className="block px-4 py-2.5 capitalize text-sm font-medium text-gray-700 hover:text-blue-600"
                      >
                        {page.Name.replace(/-/g, " ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="https://yo-dalo.in/admission-Form"
          className="hidden md:block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 lg:px-5 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
        >
          Student Login
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className={`w-5 h-[2px] bg-gray-800 transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`w-5 h-[2px] bg-gray-800 transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`w-5 h-[2px] bg-gray-800 transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu — Slide Down */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        } overflow-y-auto`}
      >
        <div className="px-4 pb-6 pt-3">
          <ul className="flex flex-col text-[15px] font-bold text-gray-700">

            <li className="border-b border-gray-50">
              <Link
                href="/"
                onClick={handleMobileLink}
                className="block py-3 text-blue-600"
              >
                Home
              </Link>
            </li>

            {categories.map((category) => (
              <li key={category.Id} className="border-b border-gray-50">
                <button
                  onClick={() =>
                    setOpenCategory(openCategory === category.Id ? null : category.Id)
                  }
                  className="w-full flex items-center justify-between py-3 capitalize text-left hover:text-blue-600 transition-colors"
                >
                  {category.Name}
                  {category.pages?.length > 0 && (
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${openCategory === category.Id ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {/* Mobile Submenu */}
                {category.pages?.length > 0 && (
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openCategory === category.Id ? "max-h-96 mb-2" : "max-h-0"
                    }`}
                  >
                    <ul className="pl-4 flex flex-col border-l-2 border-blue-100 ml-1">
                      {category.pages.map((page) => (
                        <li key={page.Id}>
                          <Link
                            href={`/pages/${page.Id}`}
                            onClick={handleMobileLink}
                            className="block py-2 text-sm font-medium text-gray-500 hover:text-blue-600 capitalize"
                          >
                            {page.Name.replace(/-/g, " ")}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <Link
            href="https://yo-dalo.in/admission-Form"
            onClick={handleMobileLink}
            className="mt-5 flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-200"
          >
            Student Login
          </Link>
        </div>
      </div>
    </nav>
  );
}