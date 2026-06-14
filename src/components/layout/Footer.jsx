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
        // Safely access deeply nested data with optional chaining and a fallback array
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

  const youtubeUrl = schoolInfo?.Youtube_Url ? `https://${schoolInfo.Youtube_Url}` : "#";
  const linkedinUrl = schoolInfo?.Linkedin_Url ? `https://linkedin.com/in/${schoolInfo.Linkedin_Url}` : "#";
  const instagramUrl = schoolInfo?.Instagram_Url ? `https://instagram.com/${schoolInfo.Instagram_Url}` : "#";
  const twitterUrl = schoolInfo?.Twitter_Url ? `https://twitter.com/${schoolInfo.Twitter_Url}` : "#";

  return (
    <>


      <footer className="bg-secondary-container text-primary border-t border-on-surface/10 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-16 py-16 max-w-[1280px] mx-auto">

          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <a href="/" className="flex flex-col gap-3">
              <div className="bg-[#b45309] p-2 rounded w-fit">
                <img
                  src={logoSrc}
                  alt={`${schoolName} Logo`}
                  className="object-contain w-10 h-10"
                  onError={handleLogoError}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-primary leading-tight">{loading ? "..." : schoolName}</span>
                <span className="text-xs text-secondary">{loading ? "" : shortName}</span>
              </div>
            </a>
            <p className="text-sm text-secondary max-w-xs">{schoolMotto}</p>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h6 className="font-bold text-xs tracking-widest uppercase text-primary mb-6">Resources</h6>
            <ul className="space-y-4">
              {useFullLinks.map((link) => (
                <li key={link.Id}>
                  <a href={link.Url || "#"} className="text-sm text-secondary hover:text-primary hover:underline transition-all">{link.Name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h6 className="font-bold text-xs tracking-widest uppercase text-primary mb-6">Quick Links</h6>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.Id}>
                  <a href={link.Url || "#"} className="text-sm text-secondary hover:text-primary hover:underline transition-all">{link.Name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location/Contact */}
          <div className="md:col-span-4">
            <h6 className="font-bold text-xs tracking-widest uppercase text-primary mb-6">Location</h6>
            <div className="text-sm text-secondary flex flex-col gap-4">
              <p>{address}</p>
              <div className="flex flex-col gap-1">
                <a href={`mailto:${email}`} className="hover:text-primary">{email}</a>
                <a href={`tel:${phone}`} className="hover:text-primary">{phone}</a>
                <a href={`http://${website}`} className="hover:text-primary" target="_blank" rel="noreferrer">{website}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-on-surface/10 py-8 px-6 md:px-16 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary">
          <span>© {new Date().getFullYear()} {schoolName}. All Rights Reserved.</span>
          <div className="flex gap-8 uppercase tracking-widest">
            <a href="/privacy-policy" className="hover:text-primary">Privacy</a>
            <a href="/terms" className="hover:text-primary">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}
