import Link from "next/link";
import { headers } from "next/headers";
import Default from "@/themes/default/layout";
import Ysnkosli from "@/themes/ysnkosli/layout";
import Ycemgh from "@/themes/ycemgh/layout";
import Main from "@/themes/main/layout";

export default async function MainLayout({ children }) {
  const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  switch (subdomain) {
    case "main":
      return <Main>{children}</Main>
    case "ysnkosli":
      return <Ysnkosli>{children}</Ysnkosli>
    case "ycemgh":
      return <Ycemgh>{children}</Ycemgh>
    default:
      return <Default>{children}</Default>;
  }
}