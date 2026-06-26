import AchievementsSection from "@/components/home/AchievementsSection";
import AdmissionSection from "@/components/home/AdmissionSection";
import TopSlider from "@/components/home/TopSlider";
import HistorySection from "@/components/home/HistorySection";
import NoticeSection from "@/components/home/NoticeSection";
import StudentToppers from "@/components/home/StudentToppers";
import WelcomeSection from "@/components/home/WelcomeSection";
import FounderMessage from "@/components/home/FounderMessage";
import BlogSection from "@/components/home/BlogSection";
import AchievementGallery from "@/components/home/Achievementgallery";
import FacilitySection from "@/components/home/FacilitySection";
import Branch from "@/components/home/Branch";
import SchemaScript from "@/components/SchemaScript";
import {BlinkButton} from "@/components/home/BlinkButton";
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  getSiteUrl,
  schemaGraph,
  webPageSchema,
} from "@/lib/seo";
import { headers } from "next/headers";

const HOME_TITLE = "Yaduvanshi Group of Institutions | Quality Education";
const HOME_DESCRIPTION =
  "Explore academics, admissions, facilities, achievements, notices, student toppers, galleries, and latest updates from Yaduvanshi Group of Institutions.";

const HOME_FAQS = [
  {
    question: "How can students apply for admission?",
    answer:
      "Students can use the admission section to review current admission updates and contact the institution for application guidance.",
  },
  {
    question: "Where are latest school notices published?",
    answer:
      "Latest notices are published on the homepage notice section with important announcements and updates.",
  },
  {
    question: "Where can parents view achievements and campus life?",
    answer:
      "Parents can view achievements, student toppers, facilities, blogs, and photo galleries from the main navigation and homepage sections.",
  },
];

export async function generateMetadata() {
  const headerList = await headers();
  return buildMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: "/",
    headerList,
  });
}

export default async function Home() {
  const headerList = await headers();
  const siteUrl = getSiteUrl(headerList);
  const schema = schemaGraph(
    webPageSchema({
      siteUrl,
      path: "/",
      name: HOME_TITLE,
      description: HOME_DESCRIPTION,
    }),
    breadcrumbSchema(siteUrl, [{ name: "Home", path: "/" }]),
    faqSchema(HOME_FAQS)
  );

  return (
    <>
      <SchemaScript schemaJson={schema} />
      <div className="w-full bg-white flex flex-col">
        <TopSlider />
        {/* <Hero /> */}
        <WelcomeSection />
        <AchievementsSection />
        <Branch/>
        <BlinkButton />
        {/* <HistorySection />
        <AchievementGallery />
        <NoticeSection />
        <FounderMessage />
        <StudentToppers /> */}
        {/* <CourseSection /> */}
        {/* <FacilitySection /> */}
        {/* <AdmissionSection />
        <BlogSection /> */}
      </div>
    </>
  );
}
