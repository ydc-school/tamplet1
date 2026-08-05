import TopSlider from "@/components/home/TopSlider";
import AchievementGallery from "./components/home/Achievementgallery";
import AdmissionSection from "./components/home/AdmissionSection";
import BlogSection from "./components/home/BlogSection";
import CollegetoperScoll from "./components/home/CollegetoperScoll";
import FounderMessage from "./components/home/FounderMessage";
import SchoolToperScoll from "./components/home/SchoolToperScoll";
import StudentToppers from "./components/home/StudentToppers";
import WelcomeSection from "./components/home/WelcomeSection";


export default function DefualtTheme() {
  return (
    <>

     <div className="w-full bg-white flex flex-col">
            <TopSlider />
            <WelcomeSection />
            <FounderMessage />
            <StudentToppers />
            <CollegetoperScoll />
            <SchoolToperScoll />
            <AdmissionSection />
            <AchievementGallery />
            <BlogSection />
          </div>
    </>
  );
}
