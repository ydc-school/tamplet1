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
      {/*
        UI PROMPT — HOMEPAGE (Landing Page) full section order:
        1.TopSlider (hero) 2.WelcomeSection 3.HistorySection 4.AchievementsSection (stats)
        5.NoticeSection 6.FounderMessage 7.StudentToppers 8.AchievementGallery
        9.FacilitySection 10.AdmissionSection 11.BlogSection 12.FAQ Section
        Global: white bg, Playfair headings, gold #c4a048 accents, navy #10213a text.
        Full prompts: UI_PROMPTS.md → Homepage Sections 4-15
      */}
      <div className="w-full bg-white flex flex-col">
        <TopSlider />
        {/* <Hero /> */}
        <WelcomeSection />
        <HistorySection />
        <AchievementsSection />
        <NoticeSection />
        <FounderMessage />
        <StudentToppers />
        <AchievementGallery />
        {/* <CourseSection /> */}
        <FacilitySection />
        <AdmissionSection />
        <BlogSection />
        {/*
          UI PROMPT — FAQ SECTION (Homepage):
          Container: max-w-5xl centered, bg #f6f8fc, py-16 px-6.
          Centered header: eyebrow "Help Center" (gold uppercase 10px) + H2 "Frequently Asked Questions" (Playfair).
          3-column grid (1 col mobile): white cards, rounded border rgba(196,160,72,0.14), p-5.
          Each card: question H3 (navy Playfair bold) + answer paragraph (text-sm #3a5a7a leading-7).
          Full prompt: UI_PROMPTS.md → Section 15
        */}
        <section className="w-full bg-[#f6f8fc] px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[#c4a048]">
              Help Center
            </p>
            <h2 className="mt-3 text-center font-[var(--font-playfair)] text-3xl font-bold text-[#10213a]">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {HOME_FAQS.map((item) => (
                <article
                  key={item.question}
                  className="rounded border border-[rgba(196,160,72,0.14)] bg-white p-5"
                >
                  <h3 className="font-[var(--font-playfair)] text-lg font-bold text-[#10213a]">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#3a5a7a]">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
