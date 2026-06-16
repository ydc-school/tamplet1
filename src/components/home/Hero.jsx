"use client";
import Image from "next/image";
import { useSchool } from "@/context/SchoolContext";
import { useFallbackImage } from "@/hooks/useFallbackImage";

export const Hero = () => {
  const { schoolInfo } = useSchool();
  const { src: logoSrc, handleError: handleLogoError } = useFallbackImage(
    schoolInfo?.Logo_Url,
    "/logo/logo.png"
  );

  return (
    <article>
      <header>
        {/* Branding/Logo badge */}
        <figure>
          <Image
            src={logoSrc}
            alt={`${schoolInfo?.School_Name ?? "School"} Logo`}
            width={40}
            height={40}
            onError={handleLogoError}
            unoptimized
          />
          <figcaption>
            <h2>{schoolInfo?.School_Name ?? "Yaduvanshi Degree College"}</h2>
            <address>
              {schoolInfo?.City ?? "Mahendergarh"}, {schoolInfo?.State ?? "Haryana"}
            </address>
          </figcaption>
        </figure>

        <h1>
          {schoolInfo?.Motto || "Empowering futures"} through <span>Holistic Education</span>.
        </h1>
      </header>

      <main>
        <p>
          {schoolInfo?.Address && schoolInfo?.City
            ? `Located at ${schoolInfo.Address}, ${schoolInfo.City}, ${schoolInfo.State} — ${schoolInfo.Pin_Code}. Affiliated with ${schoolInfo.Board_Affiliation ?? "leading boards"}, offering quality ${schoolInfo.Medium_Of_Instruction ?? "English"}-medium education.`
            : "Among the top residential Colleges in India. Established under the aegis of Rao Chiranji Lal Samriti Jan Seva Trust. We offer a serene, pollution-free environment conducive to complete child development."
          }
        </p>

        {/* Contact Info */}
        <a href={`tel:${schoolInfo?.Contact_Person_Phone || "+918607062323"}`}>
          Admission Helpline: {schoolInfo?.Contact_Person_Phone ?? schoolInfo?.Alternate_Phone ?? "+91 8607062323"}
        </a>

        {/* CTAs */}
        <nav>
          <button>Apply Now</button>
          <button>Explore Courses</button>
        </nav>
      </main>

      <aside>
        <figure>
          <Image
            src="/logo/5.png"
            alt={`${schoolInfo?.School_Name ?? "College"} Campus`}
            width={600}
            height={500}
            priority
          />
        </figure>
        
        {/* Stats Summary */}
        <section>
          <h3>{schoolInfo?.Students ? `${schoolInfo.Students}+ Students` : "Holistic Growth"}</h3>
          <p>
            {schoolInfo?.Teachers ? `${schoolInfo.Teachers} Expert Faculty` : "Expert Faculty & Trust"}
            {schoolInfo?.Experience ? ` • ${schoolInfo.Experience} Yrs Experience` : ""}
          </p>
        </section>
      </aside>
    </article>
  );
};