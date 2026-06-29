import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Popup from "@/components/layout/Popup";


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
      </main>
    </>
  );
}