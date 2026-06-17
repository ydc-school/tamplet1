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

  return (
    <footer className="w-full bg-[#f6f8fc] text-[#5f7288] font-sans relative overflow-hidden border-t-[3px] border-[#c4a048] selection:bg-[#c4a048]/20">
      
      {/* Background Glow Flourish */}
      <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse,rgba(196,160,72,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Graphic Crest Divider */}
      <div className="flex items-center justify-center gap-3.5 pt-7 mb-0">
        <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-transparent to-[#c4a048]/30" />
        <svg className="text-[#c4a048]/70 flex-shrink-0" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <div className="flex-1 max-w-[200px] h-px bg-gradient-to-l from-transparent to-[#c4a048]/30" />
      </div>

      {/* Main Column Grid Layout */}
      <div className="max-w-[1280px] mx-auto px-8 pt-9 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr] gap-10 lg:gap-12 relative z-10">

        {/* Column 1: Institutional Branding */}
        <div className="flex flex-col space-y-5">
          <Link href="/" className="flex items-center gap-3 no-underline group focus:outline-none">
            <div className="w-[120px] h-[52px] bg-white flex items-center justify-center flex-shrink-0 rounded-lg p-1 shadow-sm border border-slate-100">
              <Image
                src={logoSrc}
                alt={`${schoolName} Logo`}
                width={500}
                height={50}
                className="object-contain"
                onError={handleLogoError}
                unoptimized
              />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#10213a] line-clamp-1 leading-snug group-hover:text-[#c4a048] transition-colors duration-200 uppercase tracking-tight">
                {loading ? "Loading…" : schoolName}
              </h2>
              <div className="font-sans text-[10px] font-black tracking-[0.25em] uppercase text-[#c4a048] mt-0.5">
                {loading ? "" : shortName}
              </div>
            </div>
          </Link>

          <p className="font-sans text-[13.5px] leading-relaxed text-slate-500 max-w-[300px]">
            {schoolMotto}
          </p>

          {/* Social Profiles Platform Controls */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <a href={youtubeUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded bg-white border border-[#c4a048]/20 flex items-center justify-center text-slate-400 transition-all duration-300 hover:border-[#c4a048] hover:text-[#c4a048] hover:bg-[#c4a048]/10 hover:-translate-y-0.5 shadow-sm" title="YouTube">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.75 15.5V8.5l6.25 3.5-6.25 3.5z" /></svg>
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded bg-white border border-[#c4a048]/20 flex items-center justify-center text-slate-400 transition-all duration-300 hover:border-[#c4a048] hover:text-[#c4a048] hover:bg-[#c4a048]/10 hover:-translate-y-0.5 shadow-sm" title="Instagram">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.8 1.7 5 5 .1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.2 3.3-1.7 4.8-5 5-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.2-4.8-1.7-5-5C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8.2-3.3 1.7-4.8 5-5 1.2-.1 1.6-.1 4.7-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.0 8.3 0 8.7 0 12s0 3.7.1 4.9C.3 21.3 2.7 23.7 7.1 23.9 8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4A6.2 6.2 0 0012 5.8zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z" /></svg>
            </a>
            <a href={twitterUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded bg-white border border-[#c4a048]/20 flex items-center justify-center text-slate-400 transition-all duration-300 hover:border-[#c4a048] hover:text-[#c4a048] hover:bg-[#c4a048]/10 hover:-translate-y-0.5 shadow-sm" title="Twitter">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.25.2 2.25.2v2.47H15.2c-1.25 0-1.64.78-1.64 1.58v1.88h2.8l-.45 2.9h-2.35V22c4.78-.75 8.44-4.91 8.44-9.93z" /></svg>
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded bg-white border border-[#c4a048]/20 flex items-center justify-center text-slate-400 transition-all duration-300 hover:border-[#c4a048] hover:text-[#c4a048] hover:bg-[#c4a048]/10 hover:-translate-y-0.5 shadow-sm" title="LinkedIn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM3.56 20.45h3.57V9H3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" /></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Useful Navigation Profiles */}
        <div>
          <h3 className="font-serif text-[15px] font-bold text-[#10213a] tracking-tight uppercase mb-5 pb-2.5 border-b border-[#c4a048]/20 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#c4a048] rounded-full flex-shrink-0" />
            Useful Links
          </h3>
          <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
            {useFullLinks.map((link) => (
              <li key={link.Id} className="p-0 m-0">
                <Link 
                  href={link.Url || "#"} 
                  className="font-sans text-[13.5px] text-slate-500 no-underline flex items-center gap-1.5 transition-all duration-200 before:content-['›'] before:text-[#c4a048] before:text-[16px] before:font-bold before:leading-none hover:text-[#c4a048] hover:translate-x-1 focus:outline-none"
                >
                  {link.Name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Quick Navigation Profiles */}
        <div>
          <h3 className="font-serif text-[15px] font-bold text-[#10213a] tracking-tight uppercase mb-5 pb-2.5 border-b border-[#c4a048]/20 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#c4a048] rounded-full flex-shrink-0" />
            Quick Links
          </h3>
          <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.Id} className="p-0 m-0">
                <Link 
                  href={link.Url || "#"} 
                  className="font-sans text-[13.5px] text-slate-500 no-underline flex items-center gap-1.5 transition-all duration-200 before:content-['›'] before:text-[#c4a048] before:text-[16px] before:font-bold before:leading-none hover:text-[#c4a048] hover:translate-x-1 focus:outline-none"
                >
                  {link.Name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Core Information */}
        <div>
          <h3 className="font-serif text-[15px] font-bold text-[#10213a] tracking-tight uppercase mb-5 pb-2.5 border-b border-[#c4a048]/20 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#c4a048] rounded-full flex-shrink-0" />
            Contact Us
          </h3>

          <div className="space-y-4">
            {/* Field: Address */}
            <div className="flex items-start gap-3 text-[13.5px] text-slate-500">
              <div className="w-8 h-8 rounded bg-[#c4a048]/10 border border-[#c4a048]/15 flex items-center justify-center flex-shrink-0 text-[#c4a048]">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="leading-relaxed font-medium">{address}</span>
            </div>

            {/* Field: Email */}
            <a href={`mailto:${email}`} className="flex items-center gap-3 text-[13.5px] text-slate-500 no-underline transition-colors duration-200 hover:text-[#c4a048] group focus:outline-none">
              <div className="w-8 h-8 rounded bg-[#c4a048]/10 border border-[#c4a048]/15 flex items-center justify-center flex-shrink-0 text-[#c4a048] group-hover:bg-[#c4a048]/20 group-focus:bg-[#c4a048]/20 transition-colors">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="truncate font-medium">{email}</span>
            </a>

            {/* Field: Responsive Phone Numbers */}
            <div className="flex flex-wrap items-center gap-y-2 text-[13.5px] text-slate-500 font-medium">
              <a href={`tel:${phone}`} className="flex items-center gap-3 no-underline transition-colors duration-200 hover:text-[#c4a048] group focus:outline-none">
                <div className="w-8 h-8 rounded bg-[#c4a048]/10 border border-[#c4a048]/15 flex items-center justify-center flex-shrink-0 text-[#c4a048] group-hover:bg-[#c4a048]/20 group-focus:bg-[#c4a048]/20 transition-colors">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>{phone}</span>
              </a>

              {phone2 && (
                <a href={`tel:${phone2}`} className="no-underline transition-colors duration-200 hover:text-[#c4a048] ml-2 pl-2 border-l border-slate-200 leading-none focus:outline-none">
                  {phone2}
                </a>
              )}
            </div>

            {/* Field: Website Identity */}
            <a href={`http://${website}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[13.5px] text-slate-500 no-underline transition-colors duration-200 hover:text-[#c4a048] group focus:outline-none">
              <div className="w-8 h-8 rounded bg-[#c4a048]/10 border border-[#c4a048]/15 flex items-center justify-center flex-shrink-0 text-[#c4a048] group-hover:bg-[#c4a048]/20 group-focus:bg-[#c4a048]/20 transition-colors">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <span className="font-medium">{website}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Corporate Metadata Bottom Bar */}
      <div className="border-t border-slate-200/60 bg-[#eef2f7]">
        <div className="max-w-[1280px] mx-auto px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-slate-600 font-medium tracking-wide">
          <p>© {new Date().getFullYear()} {loading ? "Yaduvanshi" : schoolName}. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-slate-600 no-underline transition-colors duration-200 hover:text-[#c4a048] focus:outline-none">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-600 no-underline transition-colors duration-200 hover:text-[#c4a048] focus:outline-none">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}