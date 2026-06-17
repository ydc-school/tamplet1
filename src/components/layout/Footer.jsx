"use client";
import Image from "next/image";
import Link from "next/link";
import { useSchool } from "@/context/SchoolContext";
import { useFallbackImage } from "@/hooks/useFallbackImage";

export default function Footer() {
  const { schoolInfo, loading } = useSchool();
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
    <footer>
      {/*
        UI PROMPT — FOOTER:
        4-column grid (stacked on mobile):
          Col 1 — Brand: logo, school name H2, short name, motto, social icons (YouTube, Instagram, Twitter, LinkedIn).
          Col 2 — Useful Links: heading + vertical link list.
          Col 3 — Quick Links: heading + vertical link list.
          Col 4 — Contact: address, email, phone in <address> tag.
        Bottom bar: © year + school name | Privacy Policy + Terms links.
        Colors: navy #10213a headings, gold #c4a048 accents, bg dark navy or #f6f8fc.
        Full prompt: UI_PROMPTS.md → Section 3
      */}
      <section>
        {/* Brand Section */}
        <article>
          <Link href="/">
            <figure>
              <Image src={logoSrc} alt={schoolInfo?.School_Name || "Logo"} width={500} height={50} onError={handleLogoError} />
            </figure>
            <h2>{loading ? "Loading…" : schoolInfo?.School_Name}</h2>
            <p>{schoolInfo?.Short_Name}</p>
          </Link>
          <p>{schoolInfo?.Motto}</p>
          
          <nav aria-label="Social Media">
            <a href={`https://${schoolInfo?.Youtube_Url}`} target="_blank" rel="noreferrer">YouTube</a>
            <a href={`https://instagram.com/${schoolInfo?.Instagram_Url}`} target="_blank" rel="noreferrer">Instagram</a>
            <a href={`https://twitter.com/${schoolInfo?.Twitter_Url}`} target="_blank" rel="noreferrer">Twitter</a>
            <a href={`https://linkedin.com/in/${schoolInfo?.Linkedin_Url}`} target="_blank" rel="noreferrer">LinkedIn</a>
          </nav>
        </article>

        {/* Links Sections */}
        <nav aria-label="Useful Links">
          <h3>Useful Links</h3>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            {/* Add your dynamic mapping here */}
          </ul>
        </nav>

        <nav aria-label="Quick Links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/admissions">Admissions</Link></li>
          </ul>
        </nav>

        {/* Contact Section */}
        <section aria-labelledby="contact-heading">
          <h3 id="contact-heading">Contact Us</h3>
          <address>
            <p>{schoolInfo?.Address}</p>
            <a href={`mailto:${schoolInfo?.Email}`}>{schoolInfo?.Email}</a>
            <a href={`tel:${schoolInfo?.Contact_Person_Phone}`}>{schoolInfo?.Contact_Person_Phone}</a>
          </address>
        </section>
      </section>

      {/* Bottom Bar */}
      <section>
        <p>&copy; {new Date().getFullYear()} {schoolInfo?.School_Name}. All Rights Reserved.</p>
        <nav aria-label="Legal">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
        </nav>
      </section>
    </footer>
  );
}