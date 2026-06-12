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

  const handleMobileLink = () => {
    setOpen(false);
    setOpenCategory(null);
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>


      <div ref={menuRef}>
        <div />

        <header>
          <div>
            <Link href="/">
              <div style={{ backgroundColor: '#b45309' }}>
                <Image
                  src={logoSrc}
                  alt={`${schoolName} logo`}
                  width={120}
                  height={52}
                  onError={handleLogoError}
                  unoptimized
                  priority
                />
              </div>
              <div>
                <div>{loading ? "…" : schoolName}</div>
                <div>{loading ? "" : shortName}</div>
              </div>
            </Link>

            <div>
              <Image
                src="/poster/31y.png"
                alt="Admission Open"
                width={180}
                height={55}
                priority
              />
            </div>
          </div>
        </header>

        <nav>
          {/* Implement your logic for 'scrolled', 'open', and 'openCategory' 
      using inline styles or standard CSS classes linked to your stylesheet.
    */}
        </nav>
      </div>
    </>
  );
}