
// import AchievementsSection from "@/components/home/AchievementsSection";
import AdmissionSection from "@/components/home/AdmissionSection";
import TopSlider from "@/components/home/TopSlider";
// import HistorySection from "@/components/home/HistorySection";
// import NoticeSection from "@/components/home/NoticeSection";
import StudentToppers from "@/components/home/StudentToppers";
import WelcomeSection from "@/components/home/WelcomeSection";
import FounderMessage from "@/components/home/FounderMessage";
import BlogSection from "@/components/home/BlogSection";
import AchievementGallery from "@/components/home/Achievementgallery";
// import FacilitySection from "@/components/home/FacilitySection";
// import StudentSwiper from "@/components/home/StudentSwiper";
import PhotoGallery from "@/components/home/PhotoGallery";
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
import { Hero } from "@/components/home/Hero";
import { ScollCard } from "@/components/ui/ScollCard";
import CollegetoperScoll from "@/components/home/CollegetoperScoll";
import SchoolToperScoll from "@/components/home/SchoolToperScoll";
import Popup from "@/components/layout/Popup";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";



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

export default async function DefaultTheme() {
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




            <main className="overflow-hidden">
                <Navbar />
                <div className="w-full ">


                    <SchemaScript schemaJson={schema} />
                    <Popup />
                    <div className="w-full bg-white flex flex-col">
                        <TopSlider />
                        <WelcomeSection />
                        <FounderMessage />
                        <StudentToppers />
                        <CollegetoperScoll />
                        <SchoolToperScoll />
                        {/* <PhotoGallery /> */}
                        {/* <ScollCard /> */}
                        <AdmissionSection />
                        <AchievementGallery />
                        <BlogSection />

                        {/* <Hero /> */}
                        {/* <WelcomeSection />
        <HistorySection />
        <AchievementsSection />
        <NoticeSection />
        <FounderMessage />
        <AchievementGallery />
        <StudentSwiper /> */}
                        {/* <CourseSection /> */}
                        {/* <FacilitySection />
        <AdmissionSection />
        <BlogSection /> */}

                    </div>
                </div>
                <Footer />
                <Link href="https://yaduvanshigroup.edu.in/careers-form">
                    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100]">
                        <button
                            className="bg-secondary text-white py-4 px-2 [writing-mode:vertical-lr] rotate-180 font-label-md text-label-sm tracking-widest hover:bg-deep-maroon transition-colors shadow-lg">
                            CURRENT OPENINGS
                        </button>
                    </div>
                </Link>
            </main>
        </>
    );
}








