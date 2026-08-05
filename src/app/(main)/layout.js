import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Mainconfig } from "@/themes/main/Mainconfig";



import Link from "next/link";


export default function MainLayout({ children }) {
  return true ? (
    <>

      {children}

    </>)
    : (
      <Mainconfig />
    )

}