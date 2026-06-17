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
import SchemaScript from "@/components/SchemaScript";
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
        <WelcomeSection />
        <HistorySection />
        <AchievementsSection />
        <NoticeSection />
        <FounderMessage />
        <StudentToppers />
        <AchievementGallery />
        <FacilitySection />
        <AdmissionSection />
        <BlogSection />
        
        <section className="w-full bg-[#f6f8fc] px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <header className="flex flex-col items-center text-center space-y-2 mb-12">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c4a048]">
                Help Center
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-black text-[#10213a] tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="w-12 h-1 bg-[#c4a048] rounded-full mt-2" />
            </header>

            <div className="grid gap-6 md:grid-cols-3">
              {HOME_FAQS.map((item) => (
                <article
                  key={item.question}
                  className="rounded-[2rem] border border-[rgba(196,160,72,0.14)] bg-white p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-start space-y-4"
                >
                  <header>
                    <h3 className="font-serif text-lg font-black leading-snug text-[#10213a]">
                      {item.question}
                    </h3>
                  </header>
                  <p className="text-sm font-medium leading-relaxed text-[#3a5a7a]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}