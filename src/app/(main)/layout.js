import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Popup from "@/components/layout/Popup";
import Link from "next/link";


export default function MainLayout({ children }) {
  return (
    <>
      <Popup />
      <main className="overflow-hidden">

        <Navbar />
        <div className="w-full ">
          {children}
        </div>
        <Footer />


        <button
          className="fixed bottom-8 right-8 bg-academic-teal text-white p-4 rounded-full shadow-2xl hover:bg-heritage-gold transition-all z-[100] group flex items-center gap-2 overflow-hidden w-14 hover:w-48">
          <span className="material-symbols-outlined">edit_calendar</span>
          <span className="whitespace-nowrap font-label-md opacity-0 group-hover:opacity-100 transition-opacity">Enquiry
            Form</span>
        </button>
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