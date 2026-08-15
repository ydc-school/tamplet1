import TopSlider from "@/components/home/TopSlider";
import AchievementGallery from "./components/home/Achievementgallery";
import AdmissionSection from "./components/home/AdmissionSection";
import BlogSection from "./components/home/BlogSection";
import CollegetoperScoll from "./components/home/CollegetoperScoll";
import FounderMessage from "./components/home/FounderMessage";
import StudentToppers from "./components/home/StudentToppers";
import WelcomeSection from "./components/home/WelcomeSection";
import Popup from "@/components/layout/Popup";
import HeroSection from "./components/home/Hero";


export default function Home() {
  return (
    <>

      <div className="w-full bg-white flex flex-col">
        <HeroSection />
        {/* <Popup />
        <TopSlider />
        <WelcomeSection />
        <FounderMessage />
        <StudentToppers />
        <CollegetoperScoll />
        <AdmissionSection />
        <AchievementGallery />
        <BlogSection /> */}
      </div>
    </>
  );
}
