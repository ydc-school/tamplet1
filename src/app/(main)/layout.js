import Link from "next/link";
import { headers } from "next/headers";
import DefaultThemeLayout from "@/themes/default/layout";
import MainThemeLayout from "@/themes/main/layout";


export default async function MainLayout({ children }) {
  const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  if (subdomain && subdomain !== 'main') {
    return <DefaultThemeLayout>{subdomain}{children}</DefaultThemeLayout>;
  }

  return <MainThemeLayout>{subdomain}{children}</MainThemeLayout>;
}