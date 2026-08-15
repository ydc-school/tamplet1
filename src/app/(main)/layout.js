import Link from "next/link";
import { headers } from "next/headers";
import Default from "@/themes/default/layout";
import Main from "@/themes/main/layout";
import Ysnsohali from "@/themes/ysnsohali/layout";

export default async function MainLayout({ children }) {
  const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  switch (subdomain) {
    case "ysnsohali":
      return <Ysnsohali>{children}</Ysnsohali>
    case "main":
      return <Main>{children}</Main>
    default:
      return <Default>{children}</Default>;
  }
}