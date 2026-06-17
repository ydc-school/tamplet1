import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Popup from "@/components/layout/Popup";


export default function MainLayout({ children }) {
  return (
    <>
      {/* UI PROMPT — MAIN LAYOUT: Popup modal (site load) → Navbar (sticky header) → Page content → Footer.
          Popup: full-screen poster slider overlay. Navbar: 2-section header (branding + nav menu).
          Footer: 4-column grid + bottom copyright bar. All pages share this shell.
          Full prompt: UI_PROMPTS.md → Layout Components */}
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