import AchievementsSection from "@/components/home/AchievementsSection";
import AdmissionSection from "@/components/home/AdmissionSection";
import CourseSection from "@/components/home/CourseSection";
import { Hero } from "@/components/home/Hero";
import TopSlider from "@/components/home/TopSlider";
import HistorySection from "@/components/home/HistorySection";
import NoticeSection from "@/components/home/NoticeSection";
import StudentToppers from "@/components/home/StudentToppers";
import WelcomeSection from "@/components/home/WelcomeSection";
import FounderMessage from "@/components/home/FounderMessage";

export default function Home() {
  return (
    <div className="w-full bg-white flex flex-col">
      <TopSlider />
      <Hero />
      <WelcomeSection />
      <FounderMessage />
      <CourseSection />
      <AdmissionSection />
      <HistorySection />
      <AchievementsSection />
      <StudentToppers />
      <NoticeSection />

    </div>
  );
}
