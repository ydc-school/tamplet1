"use client";
import Image from "next/image";
import { useSchool } from "@/context/SchoolContext";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const { schoolInfo, loading } = useSchool();
  const [quickLinks, setQuickLinks] = useState([]);
  const [useFullLinks, setUseFullLinks] = useState([]);

  useEffect(() => {
    axios.get("/api/client/quick-link")
      .then((res) => setQuickLinks(res.data.data.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios.get("/api/client/useful-link")
      .then((res) => setUseFullLinks(res.data.data.data))
      .catch(() => {});
  }, []);

  const schoolName  = schoolInfo?.School_Name    ?? "Yaduvanshi";
  const shortName   = schoolInfo?.Short_Name     ?? "Degree College";
  const address     = schoolInfo?.Address        ?? "Bucholi Road, Mahendergarh, Haryana, PIN-123029";
  const email       = schoolInfo?.Email          ?? "ydcmgh@gmail.com";
  const phone       = schoolInfo?.Alternate_Phone ?? "+91 8607062323";
  const website     = schoolInfo?.Website        ?? "www.ydu.com";
  const schoolMotto = schoolInfo?.Motto          ?? "Among the top residential Colleges in India. Established under the aegis of Rao Chiranji Lal Samriti Jan Seva Trust, Mahendergarh.";
  const logoUrl     = schoolInfo?.Logo_Url ? `/uploads/${schoolInfo.Logo_Url}` : "/logo/logo.png";

  const youtubeUrl  = schoolInfo?.Youtube_Url   ? `https://${schoolInfo.Youtube_Url}` : "#";
  const linkedinUrl = schoolInfo?.Linkedin_Url  ? `https://linkedin.com/in/${schoolInfo.Linkedin_Url}` : "#";
  const instagramUrl= schoolInfo?.Instagram_Url ? `https://instagram.com/${schoolInfo.Instagram_Url}` : "#";
  const twitterUrl  = schoolInfo?.Twitter_Url   ? `https://twitter.com/${schoolInfo.Twitter_Url}` : "#";

  return (
    <>
      <style>{`

        .ft-root {
          background: #f6f8fc;
          color: #5f7288;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
          border-top: 3px solid #c4a048;
        }

        /* Subtle radial glow */
        .ft-root::before {
          content: '';
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(196,160,72,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Crest divider pattern */
        .ft-divider-top {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 28px 0 0;
          margin-bottom: 0;
        }
        .ft-divider-line {
          flex: 1;
          max-width: 200px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(196,160,72,0.3));
        }
        .ft-divider-line.rev {
          background: linear-gradient(to left, transparent, rgba(196,160,72,0.3));
        }
        .ft-crest-icon {
          color: #c4a048;
          opacity: 0.7;
        }

        .ft-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 36px 32px 48px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 640px) {
          .ft-main { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .ft-main { grid-template-columns: 1.6fr 1fr 1fr 1.3fr; gap: 48px; }
        }

        /* Brand */
        .ft-brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          text-decoration: none;
        }
        .ft-logo-ring {
          width: 120px;
          height: 52px;
           border-radius: 0%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
         
          flex-shrink: 0;
          box-shadow: 0 0 0 2px #c4a048, 0 0 0 4px rgba(196,160,72,0.15);
        }
        .ft-brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #10213a;
          line-height: 1.2;
        }
        .ft-brand-sub {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c4a048;
          margin-top: 2px;
        }
        .ft-motto {
          font-size: 13.5px;
          line-height: 1.75;
          color: #5f7288;
          margin-bottom: 22px;
          max-width: 300px;
        }

        /* Social icons */
        .ft-socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .ft-social {
          width: 36px;
          height: 36px;
          border-radius: 4px;
          border: 1px solid rgba(196,160,72,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5f7288;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .ft-social:hover {
          border-color: #c4a048;
          color: #c4a048;
          background: rgba(196,160,72,0.08);
          transform: translateY(-2px);
        }

        /* Columns */
        .ft-col-title {
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          font-weight: 600;
          color: #10213a;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(196,160,72,0.2);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ft-col-dot {
          width: 6px;
          height: 6px;
          background: #c4a048;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .ft-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ft-link {
          font-size: 13.5px;
          color: #5f7288;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: all 0.2s;
        }
        .ft-link::before {
          content: '›';
          color: #c4a048;
          font-size: 16px;
          line-height: 1;
        }
        .ft-link:hover {
          color: #c4a048;
          transform: translateX(3px);
        }

        /* Contact */
        .ft-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 14px;
          font-size: 13.5px;
          color: #5f7288;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-contact-item:hover { color: #c4a048; }
        .ft-contact-icon {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          background: rgba(196,160,72,0.1);
          border: 1px solid rgba(196,160,72,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #c4a048;
        }

        /* Bottom bar */
        .ft-bottom {
          border-top: 1px solid rgba(15, 23, 42, 0.06);
          background: #eef2f7;
        }
        .ft-bottom-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 32px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
          justify-content: space-between;
          font-size: 12.5px;
          color: #3d5066;
        }
        @media (min-width: 640px) {
          .ft-bottom-inner { flex-direction: row; gap: 0; }
        }
        .ft-bottom-links {
          display: flex;
          gap: 20px;
        }
        .ft-bottom-link {
          color: #3d5066;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-bottom-link:hover { color: #c4a048; }
      `}</style>

      <footer className="ft-root">
        {/* Decorative top divider */}
        <div className="ft-divider-top">
          <div className="ft-divider-line" />
          <svg className="ft-crest-icon" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <div className="ft-divider-line rev" />
        </div>

        <div className="ft-main">

          {/* Brand */}
          <div>
            <Link href="/" className="ft-brand-logo">
              <div className="ft-logo-ring">
                <Image
                  src={logoUrl}
                  alt={`${schoolName} Logo`}
                  width={500}
                  height={50}
                  style={{ objectFit: "contain",  }}
                  onError={(e) => { e.currentTarget.src = "/logo/logo.png"; }}
                />
              </div>
              <div>
                <div className="ft-brand-name">{loading ? "Loading…" : schoolName}</div>
                <div className="ft-brand-sub">{loading ? "" : shortName}</div>
              </div>
            </Link>

            <p className="ft-motto">{schoolMotto}</p>

            <div className="ft-socials">
              {/* YouTube */}
              <a href={youtubeUrl} target="_blank" rel="noreferrer" className="ft-social" title="YouTube">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.75 15.5V8.5l6.25 3.5-6.25 3.5z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="ft-social" title="Instagram">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.8 1.7 5 5 .1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.2 3.3-1.7 4.8-5 5-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.2-4.8-1.7-5-5C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8.2-3.3 1.7-4.8 5-5 1.2-.1 1.6-.1 4.7-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.0 8.3 0 8.7 0 12s0 3.7.1 4.9C.3 21.3 2.7 23.7 7.1 23.9 8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4A6.2 6.2 0 0012 5.8zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a href={twitterUrl} target="_blank" rel="noreferrer" className="ft-social" title="Twitter">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href={linkedinUrl} target="_blank" rel="noreferrer" className="ft-social" title="LinkedIn">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM3.56 20.45h3.57V9H3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="ft-col-title">
              <span className="ft-col-dot" />
              Useful Links
            </h3>
            <ul className="ft-links-list">
              {useFullLinks.map((link) => (
                <li key={link.Id}>
                  <Link href={link.Url} className="ft-link">{link.Name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="ft-col-title">
              <span className="ft-col-dot" />
              Quick Links
            </h3>
            <ul className="ft-links-list">
              {quickLinks.map((link) => (
                <li key={link.Id}>
                  <Link href={link.Url} className="ft-link">{link.Name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="ft-col-title">
              <span className="ft-col-dot" />
              Contact Us
            </h3>

            <div>
              {/* Address */}
              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span style={{ lineHeight: "1.5" }}>{address}</span>
              </div>

              {/* Email */}
              <a href={`mailto:${email}`} className="ft-contact-item">
                <div className="ft-contact-icon">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                {email}
              </a>

              {/* Phone */}
              <a href={`tel:${phone}`} className="ft-contact-item">
                <div className="ft-contact-icon">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                {phone}
              </a>

              {/* Website */}
              <a href={`http://${website}`} target="_blank" rel="noreferrer" className="ft-contact-item">
                <div className="ft-contact-icon">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                {website}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="ft-bottom">
          <div className="ft-bottom-inner">
            <p>© {new Date().getFullYear()} {loading ? "Yaduvanshi" : schoolName}. All Rights Reserved.</p>
            <div className="ft-bottom-links">
              <Link href="/privacy-policy" className="ft-bottom-link">Privacy Policy</Link>
              <Link href="/terms" className="ft-bottom-link">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
