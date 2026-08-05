
import Link from "next/link";
import DefaultThemeLayout from "@/themes/default/layout";
// import "../globals.css"

export default function MainLayout({ children }) {
  return (
    <>

      <DefaultThemeLayout>
        {children}
      </DefaultThemeLayout>

    </>


  )

}