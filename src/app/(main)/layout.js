import Footer from "@/components/layout/Footer";
import Link from "next/link";
import MainThemeLayout from "@/themes/main/layout";


export default function MainLayout({ children }) {
  return (
    <>

      <MainThemeLayout>
        {children}

      </MainThemeLayout>

    </>


  )

}