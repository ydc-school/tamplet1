import Link from "next/link";
import { headers } from "next/headers";
import Default from "@/themes/default/layout";
import MainThemeLayout from "@/themes/main/layout";

export default async function MainLayout({ children }) {
  const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  switch (subdomain) {

    default:
      return <Default>{children}</Default>;
  }
}