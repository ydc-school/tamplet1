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
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const { schoolInfo, loading } = useSchool();
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
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Helper: safely get a display name regardless of API field naming
  const getName = (item) =>
    item?.name ?? item?.Name ?? item?.Category_Name ?? item?.Page_Name ?? item?.title ?? "Untitled";

  // Helper: safely build a slug, falls back to provided slug field if text missing
  const getSlug = (item) => {
    const label = getName(item);
    if (item?.slug) return item.slug;
    if (item?.Slug) return item.Slug;
    return slugify(label || "");
  };

  const handleMobileLink = () => {
    setOpen(false);
    setOpenCategory(null);
  };

  // Helper: safely get sub-items regardless of API field naming
  const getChildren = (item) =>
    item?.sub_categories ?? item?.Sub_Categories ?? item?.children ?? item?.subcategories ?? [];

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div ref={menuRef} className="sticky top-0 z-50">
        {/* Top bar */}
        <div className="bg-[#01327F]">
          <div
            className={`max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 transition-all duration-300 ${
              scrolled ? "py-2" : "py-3"
            }`}
          >
            {/* Logo + School name */}
            <Link href="/" className="flex items-center gap-3 min-w-0">
              <div className="shrink-0 flex items-center justify-center bg-[#01327F]">
                <Image
                  src={logoSrc}
                  alt={`${schoolName} logo`}
                  width={84}
                  height={36}
                  onError={handleLogoError}
                  unoptimized
                  priority
                  className="object-contain w-[70%] h-auto"
                  style={{ width: "70%", height: "auto" }}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-bold text-base md:text-xl leading-tight truncate">
                  {loading ? "…" : schoolName}
                </span>
                <span className="text-blue-200 text-xs md:text-sm leading-tight truncate">
                  {loading ? "" : shortName}
                </span>
              </div>
            </Link>

            {/* Admission poster - desktop only */}
            <div className="hidden lg:block shrink-0">
              <Image
                src="/poster/31y.png"
                alt="Admission Open"
                width={180}
                height={55}
                priority
                className="object-contain"
              />
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="md:hidden text-white p-2 -mr-2"
            >
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:block bg-[#02418f]">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-1">
              <li>
                <Link
                  href="/"
                  className="block px-4 py-3 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Home
                </Link>
              </li>

              {categories.map((category) => {
                const children = getChildren(category);
                const hasChildren = children.length > 0;
                const isOpen = openCategory === (category.id ?? category.ID);

                return (
                  <li
                    key={category.id ?? category.ID ?? getName(category)}
                    className="relative"
                    onMouseEnter={() => hasChildren && setOpenCategory(category.id ?? category.ID)}
                    onMouseLeave={() => hasChildren && setOpenCategory(null)}
                  >
                    <Link
                      href={`/${getSlug(category)}`}
                      className="flex items-center gap-1 px-4 py-3 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                    >
                      {getName(category)}
                      {hasChildren && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>

                    {hasChildren && isOpen && (
                      <ul className="absolute left-0 top-full min-w-[220px] bg-[#01327F] py-2 z-50">
                        {children.map((sub) => (
                          <li key={sub.id ?? sub.ID ?? getName(sub)}>
                            <Link
                              href={`/${getSlug(category)}/${getSlug(sub)}`}
                              className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                            >
                              {getName(sub)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile menu drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 top-[64px] z-40 bg-[#01327F] overflow-y-auto">
          <ul className="flex flex-col px-4 py-2">
            <li>
              <Link
                href="/"
                onClick={handleMobileLink}
                className="block py-3 text-white text-base font-medium border-b border-white/10"
              >
                Home
              </Link>
            </li>

            {categories.map((category) => {
              const children = getChildren(category);
              const hasChildren = children.length > 0;
              const catId = category.id ?? category.ID;
              const isOpen = openCategory === catId;

              return (
                <li key={catId ?? getName(category)} className="border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/${getSlug(category)}`}
                      onClick={handleMobileLink}
                      className="flex-1 py-3 text-white text-base font-medium"
                    >
                      {getName(category)}
                    </Link>

                    {hasChildren && (
                      <button
                        onClick={() => setOpenCategory(isOpen ? null : catId)}
                        aria-label="Toggle submenu"
                        className="p-3 text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {hasChildren && isOpen && (
                    <ul className="pl-4 pb-2 flex flex-col gap-1">
                      {children.map((sub) => (
                        <li key={sub.id ?? sub.ID ?? getName(sub)}>
                          <Link
                            href={`/${getSlug(category)}/${getSlug(sub)}`}
                            onClick={handleMobileLink}
                            className="block py-2 text-sm text-white/80"
                          >
                            {getName(sub)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}

            {/* Admission poster - mobile */}
            <li className="pt-4 flex justify-center">
              <Image
                src="/poster/31y.png"
                alt="Admission Open"
                width={180}
                height={55}
                className="object-contain"
              />
            </li>
          </ul>
        </div>
      )}
    </>
  );
}