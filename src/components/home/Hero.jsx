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
    <section className="relative bg-white overflow-hidden py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Decorators */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#01327F]/[0.04] rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/[0.06] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          {/* School Badge */}
          <div className="inline-flex items-center gap-3 bg-[#01327F]/[0.03] p-2 pr-4 rounded-full self-start max-w-full">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white shrink-0 flex items-center justify-center relative">
              <Image
                src={logoSrc}
                alt={`${schoolInfo?.School_Name ?? "School"} Logo`}
                width={40}
                height={40}
                onError={handleLogoError}
                unoptimized
                className="object-contain"
              />
            </div>
            <div className="min-w-0 flex flex-col">
              <h2 className="text-xs font-bold text-[#01327F] tracking-wide truncate">
                {schoolInfo?.School_Name ?? "Yaduvanshi Degree College"}
              </h2>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-semibold mt-0.5">
                <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                <p className="truncate">
                  {schoolInfo?.City ?? "Mahendergarh"}, {schoolInfo?.State ?? "Haryana"}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#01327F] leading-tight tracking-tight">
            {schoolInfo?.Motto
              ? <>{schoolInfo.Motto} through <span className="text-amber-500">Holistic Education</span>.</>
              : <>Empowering futures through <span className="text-amber-500">Holistic Education</span>.</>
            }
          </h1>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl">
            {schoolInfo?.Address && schoolInfo?.City
              ? `Located at ${schoolInfo.Address}, ${schoolInfo.City}, ${schoolInfo.State} — ${schoolInfo.Pin_Code}. Affiliated with ${schoolInfo.Board_Affiliation ?? "leading boards"}, offering quality ${schoolInfo.Medium_Of_Instruction ?? "English"}-medium education.`
              : "Among the top residential Colleges in India. Established under the aegis of Rao Chiranji Lal Samriti Jan Seva Trust. We offer a serene, pollution-free environment conducive to complete child development."
            }
          </p>

          {/* Contact Helpline */}
          <div className="inline-flex items-center gap-2.5 bg-[#01327F]/[0.04] text-[#01327F] px-4 py-2.5 rounded-xl self-start text-xs md:text-sm font-bold">
            <div className="text-amber-500 shrink-0">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
            </div>
            <p>
              Admission Helpline: {schoolInfo?.Contact_Person_Phone ?? schoolInfo?.Alternate_Phone ?? "+91 8607062323"}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button className="inline-flex items-center gap-2 bg-[#01327F] text-white px-6 py-3 rounded-xl font-bold text-sm md:text-base hover:bg-amber-400 hover:text-[#01327F] transition-all duration-200 group active:scale-95">
              Apply Now
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>

            <button className="inline-flex items-center font-bold text-sm md:text-base text-[#01327F] hover:text-amber-500 px-5 py-3 rounded-xl hover:bg-[#01327F]/5 transition-all duration-200 active:scale-95">
              Explore Courses
            </button>
          </div>
        </div>

        {/* Featured Image Section */}
        <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[420px] lg:h-[480px] mt-6 lg:mt-0">
          <div className="absolute inset-0 bg-[#01327F]/[0.03] rounded-2xl transform translate-x-3 translate-y-3 hidden sm:block" />

          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#01327F]/5 group">
            <Image
              src="/logo/5.png"
              alt={`${schoolInfo?.School_Name ?? "College"} Campus`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-102"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#01327F]/80 via-[#01327F]/10 to-transparent" />

            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#01327F] text-xs font-black tracking-wide px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <span>🏫</span> {schoolInfo?.Short_Name ?? "Top Residential College"}
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-[#01327F] text-amber-400 flex items-center justify-center shrink-0">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm md:text-base font-extrabold text-[#01327F] truncate">
                  {schoolInfo?.Students ? `${schoolInfo.Students}+ Students` : "Holistic Growth"}
                </h4>
                <p className="text-xs text-gray-500 font-semibold truncate mt-0.5">
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