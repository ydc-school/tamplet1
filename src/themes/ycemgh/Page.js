import AdmissionSection from "../default/components/home/AdmissionSection";
import FounderMessage from "../default/components/home/FounderMessage";
import RandomGallery from "../default/components/home/RandomGallery";
import TopSlider from "../default/components/home/TopSlider";
import WelcomeSection from "../default/components/home/WelcomeSection";
import Popup from "../default/components/layout/Popup";

 

export default function Home() {
  return (
    <>

      <div className="w-full bg-white flex flex-col">
        <Popup />
        <TopSlider />
        <WelcomeSection />
        <FounderMessage />
        {/* <StudentToppers />
        <CollegetoperScoll /> */}
        <AdmissionSection />
        <RandomGallery />
      </div>
    </>
  );
}
