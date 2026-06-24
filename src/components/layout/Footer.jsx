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
  
  // Latitude aur Longitude nikaalna fallback values ke sath (Mahendergarh ke coordinates fallback hain)
  const latitude = schoolInfo?.Latitude ?? "28.2801";
  const longitude = schoolInfo?.Longitude ?? "76.1517";


  

  return (
    <>
      <footer className="bg-deep-maroon text-on-primary border-t border-white/10 pt-16 pb-8">
        {/* Responsive layout ke liye grid ko 5 columns mein split kiya hai */}
        <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">

          {/* Column 1: Logo */}
          <div className="col-span-1">
            <div className="bg-white p-4 rounded-sm mb-6 inline-block">
              <Image
                src={logoSrc}
                alt={`${schoolName} Logo`}
                width={500}
                height={50}
                style={{ objectFit: "contain" }}
                onError={handleLogoError}
                unoptimized
              />
            </div>
            <p className="font-label-sm text-label-sm tracking-wide opacity-80 leading-relaxed mb-4">
              Affiliation no - 531034<br />
              School Code - 40991
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-heritage-gold transition-colors" href="#">
                <span className="material-symbols-outlined text-[20px]">public</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-heritage-gold transition-colors" href="#">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-heritage-gold transition-colors" href="#">
                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1">
            <h4 className="font-headline-md text-headline-md mb-8">Quick Links</h4>
            <ul className="space-y-4 font-label-md text-label-md">
              {quickLinks.map((link) => (
                <li key={link.Id}>
                  <Link href={link.Url || "#"} className="hover:text-heritage-gold transition-colors underline-offset-4 hover:underline">
                    {link.Name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us Details */}
          <div className="col-span-1">
            <h4 className="font-headline-md text-headline-md mb-8">Contact Us</h4>
            <div className="space-y-6 text-label-md font-label-md">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-heritage-gold shrink-0">location_on</span>
                <p className="opacity-80">{address}</p>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-heritage-gold shrink-0">call</span>
                <p className="opacity-80">
                  <a href={`tel:${phone}`} className="hover:text-heritage-gold transition-colors underline-offset-4 hover:underline">{phone}</a>
                  <br />or<br />
                  <a href={`tel:${phone2}`} className="hover:text-heritage-gold transition-colors underline-offset-4 hover:underline">{phone2}</a>
                </p>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-heritage-gold shrink-0">mail</span>
                <div>
                  <p className="opacity-80">
                    <a href={`mailto:${email}`} className="hover:text-heritage-gold transition-colors underline-offset-4 hover:underline">{email}</a>
                  </p>
                  <p className="opacity-80">
                    <a href="mailto:ydcmgh@gmail.com" className="hover:text-heritage-gold transition-colors underline-offset-4 hover:underline">ydcmgh@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4 & 5: Google Map Embed using Latitude & Longitude */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-headline-md text-headline-md mb-8">Our Location</h4>
            <div className="w-full h-[220px] rounded-md overflow-hidden border border-white/10 shadow-lg">
              <iframe
                title="Google Map Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
              ></iframe>
            </div>
          </div>

        </div>

        {/* Footer Icons & Copyright */}
        <div className="border-y border-white/10 py-6">
          <div className="max-w-container-max mx-auto px-gutter flex justify-center gap-10">
            <span className="material-symbols-outlined cursor-pointer hover:text-heritage-gold transition-all hover:scale-125">camera</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-heritage-gold transition-all hover:scale-125">face_nod</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-heritage-gold transition-all hover:scale-125">close</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-heritage-gold transition-all hover:scale-125">work</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-heritage-gold transition-all hover:scale-125">video_library</span>
          </div>
        </div>

        <div className="pt-8 text-center px-gutter">
          <p className="text-label-sm font-label-sm opacity-60">
            © Copyright 2018-2025 By Lotus Valley Gurgaon | Accelerating By Entab Infotech
          </p>
        </div>
      </footer>
    </>
  );
}