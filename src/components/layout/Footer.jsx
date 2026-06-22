"use client";
import Image from "next/image";
import { useSchool } from "@/context/SchoolContext";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useFallbackImage } from "@/hooks/useFallbackImage";

export default function Footer() {
  const { schoolInfo, loading } = useSchool();
  const [quickLinks, setQuickLinks] = useState([]);
  const [useFullLinks, setUseFullLinks] = useState([]);
  const { src: logoSrc, handleError: handleLogoError } = useFallbackImage(
    schoolInfo?.Logo_Url,
    "/logo/logo.png"
  );

  // Fetch Quick Links
  useEffect(() => {
    axios.get("/api/client/quick-link")
      .then((res) => {
        setQuickLinks(res?.data?.data?.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch quick links:", err);
      });
  }, []);

  // Fetch Useful Links
  useEffect(() => {
    axios.get("/api/client/useful-link")
      .then((res) => {
        setUseFullLinks(res?.data?.data?.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch useful links:", err);
      });
  }, []);

  const schoolName = schoolInfo?.School_Name ?? "Yaduvanshi";
  const shortName = schoolInfo?.Short_Name ?? "Degree College";
  const address = schoolInfo?.Address ?? "Bucholi Road, Mahendergarh, Haryana, PIN-123029";
  const email = schoolInfo?.Email ?? "ydcmgh@gmail.com";
  const phone = schoolInfo?.Alternate_Phone ?? "+91 8607062323";
  const phone2 = schoolInfo?.Contact_Person_Phone ?? "8607062323";
  const website = schoolInfo?.Website ?? "www.ydu.com";
  const schoolMotto = schoolInfo?.Motto ?? "Among the top residential Colleges in India. Established under the aegis of Rao Chiranji Lal Samriti Jan Seva Trust, Mahendergarh.";

  const youtubeUrl = schoolInfo?.Youtube_Url ? `${schoolInfo.Youtube_Url}` : "#";
  const linkedinUrl = schoolInfo?.Linkedin_Url ? `${schoolInfo.Linkedin_Url}` : "#";
  const instagramUrl = schoolInfo?.Instagram_Url ? `${schoolInfo.Instagram_Url}` : "#";
  const twitterUrl = schoolInfo?.Twitter_Url ? `${schoolInfo.Twitter_Url}` : "#";

  // 1. Loading and Brand State Logic
  const displaySchoolName = loading ? "Loading…" : schoolName;
  const displayShortName = loading ? "" : shortName;
  const displayFooterCopyright = loading ? "Yaduvanshi" : schoolName;
  const currentYear = new Date().getFullYear();

  // 2. Logo Configuration
  const logoConfig = {
    src: logoSrc,
    alt: `${schoolName} Logo`,
    width: 500,
    height: 50,
    style: { objectFit: "contain" },
    onError: handleLogoError,
    unoptimized: true
  };

  // 3. Social Media Links Map
  const socialLinks = [
    { id: "youtube", title: "YouTube", url: youtubeUrl },
    { id: "instagram", title: "Instagram", url: instagramUrl },
    { id: "twitter", title: "Twitter", url: twitterUrl },
    { id: "linkedin", title: "LinkedIn", url: linkedinUrl }
  ];

  // 4. Navigation Links Mapping (Dynamic Arrays)
  const structuredUsefulLinks = useFullLinks.map((link) => ({
    id: link.Id,
    url: link.Url || "#",
    name: link.Name
  }));

  const structuredQuickLinks = quickLinks.map((link) => ({
    id: link.Id,
    url: link.Url || "#",
    name: link.Name
  }));

  // 5. Contact Information Data Objects
  const contactDetails = {
    address: address,
    email: {
      display: email,
      href: `mailto:${email}`
    },
    phones: [
      { display: phone, href: `tel:${phone}` },
      ...(phone2 ? [{ display: phone2, href: `tel:${phone2}` }] : [])
    ],
    website: {
      display: website,
      href: `http://${website}`
    }
  };

  // 6. Legal / Bottom Links
  const legalLinks = [
    { href: "/privacy-policy", name: "Privacy Policy" },
    { href: "/terms", name: "Terms & Conditions" }
  ];

  return (
    <footer className="bg-surface dark:bg-surface-dim full-width py-12 border-t border-outline-variant transition-opacity opacity-90 hover:opacity-100 font-body-md text-text-main">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand & Logo Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Image 
              src={logoConfig.src} 
              alt={logoConfig.alt} 
              width={logoConfig.width} 
              height={logoConfig.height} 
              style={logoConfig.style} 
              onError={logoConfig.onError}
              unoptimized={logoConfig.unoptimized}
              className="h-12 w-auto object-contain"
            />
          </div>
          <div>
            <h3 className="font-headline-md text-heritage-navy uppercase tracking-wider mb-1">
              {displaySchoolName}
            </h3>
            <p className="font-label-caps text-label-caps text-academic-gold">
              {displayShortName}
            </p>
          </div>
          <p className="text-body-md text-text-muted leading-relaxed">
            {schoolMotto}
          </p>
        </div>

        {/* Useful Links Section */}
        <div>
          <h4 className="font-label-caps text-label-caps text-heritage-navy uppercase mb-4 pb-2 border-b-2 border-academic-gold/30 inline-block">
            Useful Links
          </h4>
          <ul className="flex flex-col gap-2">
            {structuredUsefulLinks.length > 0 ? (
              structuredUsefulLinks.map((link) => (
                <li key={link.id}>
                  <Link 
                    href={link.url} 
                    className="font-body-md text-text-muted hover:text-academic-gold transition-colors duration-200 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="font-body-md text-text-muted italic">No links available</li>
            )}
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="font-label-caps text-label-caps text-heritage-navy uppercase mb-4 pb-2 border-b-2 border-academic-gold/30 inline-block">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2">
            {structuredQuickLinks.length > 0 ? (
              structuredQuickLinks.map((link) => (
                <li key={link.id}>
                  <Link 
                    href={link.url} 
                    className="font-body-md text-text-muted hover:text-academic-gold transition-colors duration-200 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="font-body-md text-text-muted italic">No links available</li>
            )}
          </ul>
        </div>

        {/* Contact Info & Socials Section */}
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="font-label-caps text-label-caps text-heritage-navy uppercase mb-4 pb-2 border-b-2 border-academic-gold/30 inline-block">
              Contact Us
            </h4>
            <p className="font-body-md text-text-muted leading-relaxed mb-3">
              {contactDetails.address}
            </p>
            <div className="flex flex-col gap-1 text-body-md text-text-muted">
              {contactDetails.phones.map((phoneObj, idx) => (
                <a key={idx} href={phoneObj.href} className="hover:text-academic-gold transition-colors">
                  Phone: {phoneObj.display}
                </a>
              ))}
              <a href={contactDetails.email.href} className="hover:text-academic-gold transition-colors break-all">
                Email: {contactDetails.email.display}
              </a>
              <a href={contactDetails.website.href} target="_blank" rel="noopener noreferrer" className="hover:text-academic-gold transition-colors">
                Web: {contactDetails.website.display}
              </a>
            </div>
          </div>

          {/* Social Links Sub-section */}
          <div className="pt-2">
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                social.url !== "#" && (
                  <a 
                    key={social.id} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-label-caps text-label-caps text-heritage-navy hover:text-academic-gold transition-colors duration-200"
                  >
                    {social.title}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Horizontal Divider Line */}
      <hr className="border-outline-variant max-w-container-max mx-auto px-gutter my-6" />

      {/* Bottom Footer Copyright & Legal Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-gutter w-full max-w-container-max mx-auto gap-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <span className="font-label-caps text-label-caps text-heritage-navy tracking-wider">
            {displayFooterCopyright.toUpperCase()}
          </span>
          <nav className="flex gap-6">
            {legalLinks.map((link, idx) => (
              <Link 
                key={idx} 
                className="font-body-md text-body-md text-text-muted hover:text-academic-gold transition-colors" 
                href={link.href}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="text-center md:text-right">
          <p className="font-body-md text-body-md text-text-muted">
            Copyright @{currentYear} {displayFooterCopyright} Education Foundation
          </p>
        </div>
      </div>
    </footer>
  );
}