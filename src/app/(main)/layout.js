import Link from "next/link";
import { headers } from "next/headers";
import DefaultThemeLayout from "@/themes/default/layout";
import MainThemeLayout from "@/themes/main/layout";
import Ysnmgh from "@/themes/ysnmgh/layout";

export default async function MainLayout({ children }) {
  const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  if (subdomain === 'ysnmgh') {
    return <Ysnmgh>{children}</Ysnmgh>;
  }

  if (subdomain && subdomain !== 'main') {
    return <DefaultThemeLayout>{children}</DefaultThemeLayout>;
  }

  return <MainThemeLayout>{children}</MainThemeLayout>;
}