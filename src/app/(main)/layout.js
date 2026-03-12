import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";


export default function MainLayout({ children }) {
  return (
    <>
      <main className=" ">
        <Navbar />
        <div className="w-full ">
          {children}
        </div>
        <Footer />
      </main>
    </>
  );
}