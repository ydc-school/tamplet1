"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useSchool } from "@/context/SchoolContext";
import { useFallbackImage } from "@/hooks/useFallbackImage";
import slugify from "@/utils/slugify";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { schoolInfo, loading } = useSchool();
  const { src: logoSrc, handleError: handleLogoError } = useFallbackImage(schoolInfo?.Logo_Url, "/logo/logo.png");

  useEffect(() => {
    axios.get("/api/client/pages").then((res) => setCategories(res.data.data || []));
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "nb-scrolled" : ""}>
      {/* Branding Section */}
      <section className="nb-branding" aria-label="Branding">
        <Link href="/">
          <figure>
            <Image src={logoSrc} alt={schoolInfo?.School_Name || "Logo"} width={120} height={52} onError={handleLogoError} priority />
          </figure>
          <h1>{loading ? "…" : schoolInfo?.School_Name}</h1>
        </Link>
        <figure aria-label="Admission Advertisement">
          <Image src="/poster/31y.png" alt="Admission Open" width={180} height={55} />
        </figure>
      </section>

      {/* Primary Navigation */}
      <nav aria-label="Main Navigation">
        <ul>
          <li><Link href="/">Home</Link></li>
          {categories.map((cat) => (
            <li key={cat.Id}>
              {cat.pages?.length > 0 ? (
                <details>
                  <summary>{cat.Name}</summary>
                  <ul>
                    {cat.pages.map((page) => (
                      <li key={page.Id}>
                        <Link href={`/pages/${slugify(page.Name)}/${page.Id}`}>{page.Name.replace(/-/g, " ")}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <span>{cat.Name}</span>
              )}
            </li>
          ))}
        </ul>
        <Link href="/admission-form">Student Admission</Link>
        <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">Menu</button>
      </nav>

      {/* Mobile Navigation Panel */}
      {isMobileMenuOpen && (
        <dialog open onClose={() => setIsMobileMenuOpen(false)}>
          <nav aria-label="Mobile Navigation">
            <button onClick={() => setIsMobileMenuOpen(false)}>Close</button>
            <ul>
              <li><Link href="/">Home</Link></li>
              {/* Additional mobile links... */}
            </ul>
          </nav>
        </dialog>
      )}
    </header>
  );
}