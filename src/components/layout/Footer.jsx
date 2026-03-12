"use client";
import Image from "next/image";
import { useSchool } from "@/context/SchoolContext";

export default function Footer() {
  const { schoolInfo, loading } = useSchool();

  // ── Safe values with fallbacks ────────────────────────────────────────────
  const schoolName = schoolInfo?.School_Name ?? "Yaduvanshi";
  const shortName = schoolInfo?.Short_Name ?? "Degree College";
  const address = schoolInfo?.Address ?? "Bucholi Road, Mahendergarh, Haryana, PIN-123029";
  const email = schoolInfo?.Email ?? "ydcmgh@gmail.com";
  const phone = schoolInfo?.Alternate_Phone ?? "+91 8607062323";
  const website = schoolInfo?.Website ?? "www.ydu.com";
  const logoUrl = schoolInfo?.Logo_Url
    ? `/uploads/${schoolInfo.Logo_Url}`
    : "/logo/6.png";

  // Social links
  const youtubeUrl = schoolInfo?.Youtube_Url ? `https://${schoolInfo.Youtube_Url}` : "#";
  const linkedinUrl = schoolInfo?.Linkedin_Url ? `https://linkedin.com/in/${schoolInfo.Linkedin_Url}` : "#";
  const instagramUrl = schoolInfo?.Instagram_Url ? `https://instagram.com/${schoolInfo.Instagram_Url}` : "#";
  const twitterUrl = schoolInfo?.Twitter_Url ? `https://twitter.com/${schoolInfo.Twitter_Url}` : "#";

  return (
    <footer className="w-full bg-[#0a1930] text-gray-300 mt-0 border-t border-white/10 relative overflow-hidden">
      {/* Decorative background subtle glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-auto px-3 h-16  py-6 relative bg-white rounded-full flex items-center justify-center shadow-lg ">
              <Image
                src={logoUrl}
                alt={`${schoolName} Logo`}
                width={300}
                height={82}
                className="object-contain"
                onError={(e) => { e.currentTarget.src = "/logo/6.png"; }}
              />
            </div>
            <div>
              <h2 className="text-xl font-black text-white leading-none capitalize">
                {loading ? "Loading…" : schoolName}
              </h2>
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-1">
                {loading ? "" : shortName}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Among the top residential Colleges in India. Established under the aegis of Rao Chiranji Lal Samriti Jan Seva Trust, Mahendergarh.
          </p>

          {/* Social icons */}
          <div className="flex gap-3 mt-6">
            {/* YouTube */}
            <a href={youtubeUrl} target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.75 15.5V8.5l6.25 3.5-6.25 3.5z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href={instagramUrl} target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.8 1.7 5 5 .1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.2 3.3-1.7 4.8-5 5-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.2-4.8-1.7-5-5C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8.2-3.3 1.7-4.8 5-5 1.2-.1 1.6-.1 4.7-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.0 8.3 0 8.7 0 12s0 3.7.1 4.9C.3 21.3 2.7 23.7 7.1 23.9 8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4A6.2 6.2 0 0012 5.8zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z" />
              </svg>
            </a>
            {/* Twitter / X */}
            <a href={twitterUrl} target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-sky-500 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href={linkedinUrl} target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-700 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM3.56 20.45h3.57V9H3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 flex items-center group">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 group-hover:w-4 transition-all"></span>
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            <li className="hover:text-blue-400 hover:translate-x-1 cursor-pointer transition-all">Home</li>
            <li className="hover:text-blue-400 hover:translate-x-1 cursor-pointer transition-all">Profile</li>
            <li className="hover:text-blue-400 hover:translate-x-1 cursor-pointer transition-all">Gallery</li>
            <li className="hover:text-blue-400 hover:translate-x-1 cursor-pointer transition-all">Founder's Message</li>
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 flex items-center group">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 group-hover:w-4 transition-all"></span>
            Academics
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            <li className="hover:text-blue-400 hover:translate-x-1 cursor-pointer transition-all">B.A. (Bachelor of Arts)</li>
            <li className="hover:text-blue-400 hover:translate-x-1 cursor-pointer transition-all">B.Sc. (Bachelor of Science)</li>
            <li className="hover:text-blue-400 hover:translate-x-1 cursor-pointer transition-all">B.Com (Bachelor of Commerce)</li>
            <li className="hover:text-blue-400 hover:translate-x-1 cursor-pointer transition-all">M.Sc. (Master of Science)</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 flex items-center group">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 group-hover:w-4 transition-all"></span>
            Contact Us
          </h3>
          <div className="space-y-4 text-sm text-gray-400">
            {/* Address */}
            <p className="flex items-start gap-3 hover:text-gray-200 transition-colors cursor-pointer">
              <svg className="w-5 h-5 mt-0.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {address}
            </p>
            {/* Email */}
            <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-gray-200 transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {email}
            </a>
            {/* Phone */}
            <a href={`tel:${phone}`} className="flex items-center gap-3 hover:text-gray-200 transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {phone}
            </a>
            {/* Website */}
            <a href={`http://${website}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gray-200 transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {website}
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-white/10 bg-[#071324] relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-medium">
          <p>© Copyright {loading ? "Yaduvanshi" : schoolName}. All Rights Reserved.</p>
          <div className="mt-2 md:mt-0 flex gap-4">
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}