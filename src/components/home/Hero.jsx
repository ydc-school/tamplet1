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
    <section>
      {/* Background Decorators */}
      <div>
        <div />
        <div />
      </div>

      <div>
        <div>
          {/* School Badge */}
          <div>
            <div>
              <Image
                src={logoSrc}
                alt={`${schoolInfo?.School_Name ?? "School"} Logo`}
                width={40}
                height={40}
                onError={handleLogoError}
                unoptimized
              />
            </div>
            <div>
              <h2>
                {schoolInfo?.School_Name ?? "Yaduvanshi Degree College"}
              </h2>
              <div>
                <span />
                <p>
                  {schoolInfo?.City ?? "Mahendergarh"}, {schoolInfo?.State ?? "Haryana"}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Heading */}
          <h1>
            {schoolInfo?.Motto
              ? <>{schoolInfo.Motto} through <span>Holistic Education</span>.</>
              : <>Empowering futures through <span>Holistic Education</span>.</>
            }
          </h1>

          {/* Description */}
          <p>
            {schoolInfo?.Address && schoolInfo?.City
              ? `Located at ${schoolInfo.Address}, ${schoolInfo.City}, ${schoolInfo.State} — ${schoolInfo.Pin_Code}. Affiliated with ${schoolInfo.Board_Affiliation ?? "leading boards"}, offering quality ${schoolInfo.Medium_Of_Instruction ?? "English"}-medium education.`
              : "Among the top residential Colleges in India. Established under the aegis of Rao Chiranji Lal Samriti Jan Seva Trust. We offer a serene, pollution-free environment conducive to complete child development."
            }
          </p>

          {/* Contact Helpline */}
          <div>
            <div>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
            </div>
            <p>
              Admission Helpline: {schoolInfo?.Contact_Person_Phone ?? schoolInfo?.Alternate_Phone ?? "+91 8607062323"}
            </p>
          </div>

          {/* Actions */}
          <div>
            <button>
              Apply Now
              <span>→</span>
            </button>

            <button>
              Explore Courses
            </button>
          </div>
        </div>

        {/* Featured Image Section */}
        <div>
          <div />

          <div>
            <Image
              src="/logo/5.png"
              alt={`${schoolInfo?.School_Name ?? "College"} Campus`}
              fill
              priority
              style={{ objectFit: "cover" }}
            />

            <div />

            <div>
              <span>🏫</span> {schoolInfo?.Short_Name ?? "Top Residential College"}
            </div>

            <div>
              <div>
                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div>
                <h4>
                  {schoolInfo?.Students ? `${schoolInfo.Students}+ Students` : "Holistic Growth"}
                </h4>
                <p>
                  {schoolInfo?.Teachers ? `${schoolInfo.Teachers} Expert Faculty` : "Expert Faculty & Trust"}
                  {schoolInfo?.Experience ? ` • ${schoolInfo.Experience} Yrs Experience` : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
