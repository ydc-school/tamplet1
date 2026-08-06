
import Popup from "@/components/layout/Popup";
import { WhatsappPOP } from "./componests/layout/WhatsappPOP";
import { BlinkButton } from "./componests/home/BlinkButton";


import Branch from "./componests/home/Branch";
import AnimationedCourses from "./componests/home/AnimationedCourses";
import Footer from "./componests/layout/Footer";
import Navbar from "./componests/layout/Navbar";
import SchemaScript from "@/components/SchemaScript";
import WelcomeSection from "./componests/home/WelcomeSection";
import TopSlider from "./componests/home/TopSlider";

export default function MainTheme() {
  return (
    <>

      <div className="w-full relative bg-white flex flex-col">
        <Popup />
        <WhatsappPOP />
        <BlinkButton />
        <TopSlider />
        <WelcomeSection />
        <Branch />
        <AnimationedCourses />
      </div>

    </>
  );
}
