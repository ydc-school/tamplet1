import Link from "next/link";
import { headers } from "next/headers";
import DefaultThemeLayout from "@/themes/default/layout";
import MainThemeLayout from "@/themes/main/layout";
import { getSubdomain } from "@/utils/getSubdomain";

export default async function MainLayout({ children }) {
  const headerList = await headers();
  const subdomain = getSubdomain(headerList);

  if (subdomain) {
    return <DefaultThemeLayout>{subdomain}{children}</DefaultThemeLayout>;
  }

  return <MainThemeLayout>{subdomain}{children}</MainThemeLayout>;
}