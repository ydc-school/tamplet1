"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useSchool } from "@/context/SchoolContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // ── School info from context ──────────────────────────────────────────────
  const { schoolInfo, loading } = useSchool();

  // School values with safe fallbacks
  const schoolName = schoolInfo?.School_Name ?? "Yaduvanshi";
  const shortName = schoolInfo?.Short_Name ?? "Degree College";
  const logoUrl = schoolInfo?.Logo_Url
    ? `/uploads/${schoolInfo.Logo_Url}`
    : "/logo/6.png";

  // ── Navigation pages ──────────────────────────────────────────────────────
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




  useEffect(() => {
    console.log(schoolInfo)
  }, [schoolInfo]);

  return (
    <nav className="w-full h-[72px] bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-56 h-10 relative  rounded-full flex items-center justify-center ">
            <Image
              src={logoUrl}
              alt={`${schoolName} Logo`}
              width={502}
              height={82}
              className="object-contain"
              onError={(e) => { e.currentTarget.src = "/logo/6.png"; }}
            />
          </div>
          <div>
            <h1 className="text-lg font-black text-gray-900 leading-none capitalize">
              {loading ? "Loading…" : schoolName}
            </h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
              {loading ? "" : shortName}
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-[15px] font-bold text-gray-700">

          <li className="cursor-pointer text-blue-600">
            <Link href="/">Home</Link>
          </li>

          {categories.map((category) => (
            <li key={category.Id} className="relative group cursor-pointer hover:text-blue-600 transition-colors capitalize">
              {category.Name}
              {category.pages && category.pages.length > 0 && (
                <ul className="absolute left-0 top-full mt-3 w-48 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {category.pages.map((page) => (
                    <li key={page.Id} className="px-4 py-2 hover:bg-gray-50 capitalize">
                      <Link href={`/pages/${page.Id}`}>{page.Name.replace(/-/g, " ")}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          <li className="cursor-pointer hover:text-blue-600 transition-colors">
            Contact Us
          </li>

        </ul>

        <button className="hidden md:block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-blue-500/20 transition-all transform hover:-translate-y-0.5">
          Student Login
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-[2px] bg-gray-800"></span>
          <span className="w-6 h-[2px] bg-gray-800"></span>
          <span className="w-6 h-[2px] bg-gray-800"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-6">
          <ul className="flex flex-col gap-4 pt-4 text-[15px] font-bold text-gray-700">
            <li><Link href="/">Home</Link></li>
            {categories.map((category) => (
              <li key={category.Id} className="capitalize">
                {category.Name}
                {category.pages && category.pages.length > 0 && (
                  <ul className="pl-4 mt-2 flex flex-col gap-2 border-l border-gray-100">
                    {category.pages.map((page) => (
                      <li key={page.Id} className="text-gray-500 font-medium hover:text-blue-600 active:text-blue-600">
                        <Link href={`/pages/${page.Id}`}>{page.Name.replace(/-/g, " ")}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>Contact Us</li>
          </ul>

          <button className="mt-5 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg text-sm font-bold shadow-md">
            Student Login
          </button>
        </div>
      )}
    </nav>
  );
}