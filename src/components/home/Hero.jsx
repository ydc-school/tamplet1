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
    <section className="relative py-24 bg-surface overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-secondary-container opacity-20 -z-10 rounded-bl-[100px]" />

      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div className="space-y-8">
          {/* School Badge */}
          <div className="flex items-center gap-4 p-2 bg-secondary-container/50 w-fit rounded-full pr-6">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
              <Image src={logoSrc} alt="Logo" width={40} height={40} onError={handleLogoError} unoptimized />
            </div>
            <div>
              <h2 className="font-label-caps text-sm text-primary tracking-wider">
                {schoolInfo?.School_Name ?? "Yaduvanshi Degree College"}
              </h2>
            </div>
          </div>

          {/* Hero Heading */}
          <h1 className="font-headline-lg text-primary leading-tight">
            {schoolInfo?.Motto ? (
              <>{schoolInfo.Motto} through <span className="italic font-serif text-secondary">Holistic Education</span>.</>
            ) : (
              <>Empowering futures through <span className="italic font-serif text-secondary">Holistic Education</span>.</>
            )}
          </h1>

          {/* Description */}
          <p className="font-body-lg text-secondary max-w-lg">
            {schoolInfo?.Address 
              ? `Located at ${schoolInfo.Address}, ${schoolInfo.City}. Affiliated with ${schoolInfo.Board_Affiliation ?? "leading boards"}, offering quality education.`
              : "Among the top residential Colleges in India. Established under the aegis of Rao Chiranji Lal Samriti Jan Seva Trust."
            }
          </p>

          {/* Contact Helpline */}
          <div className="flex items-center gap-3 text-primary font-semibold bg-surface-container p-4 rounded-lg w-fit">
            <span className="material-symbols-outlined">call</span>
            <span>Admission Helpline: {schoolInfo?.Contact_Person_Phone ?? "+91 8607062323"}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="bg-primary text-on-primary px-8 py-4 font-label-caps hover:opacity-90 transition-all flex items-center gap-2">
              Apply Now <span>→</span>
            </button>
            <button className="border border-primary text-primary px-8 py-4 font-label-caps hover:bg-primary hover:text-on-primary transition-all">
              Explore Courses
            </button>
          </div>
        </div>

        {/* Featured Image Section */}
        <div className="relative aspect-[4/5] w-full">
          <div className="absolute inset-0 bg-primary opacity-5 rounded-tl-[80px]" />
          <Image
            src="/logo/5.png"
            alt="Campus"
            fill
            className="object-cover rounded-tl-[80px]"
            priority
          />
          
          {/* Growth Stats Overlay */}
          <div className="absolute -bottom-8 -left-8 bg-surface p-6 shadow-xl border-l-4 border-primary flex gap-4 items-center">
            <div className="text-primary"><span className="material-symbols-outlined text-4xl">school</span></div>
            <div>
              <h4 className="font-headline-sm text-primary">
                {schoolInfo?.Students ? `${schoolInfo.Students}+ Students` : "Holistic Growth"}
              </h4>
              <p className="text-secondary text-sm">
                {schoolInfo?.Teachers ? `${schoolInfo.Teachers} Expert Faculty` : "Expert Faculty"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};