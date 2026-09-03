import React from 'react';
import Default from '@/themes/default/Page';
import Ycemgh from '@/themes/ycemgh/Page';
import Main from '@/themes/main/Page';
import { headers } from "next/headers";
import { getSubdomain } from "@/utils/getSubdomain";

export default async function Page() {
  const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  switch (subdomain) {
    case "main":
      return <Main />;
    case "ycemgh":
      return <Ycemgh />;
    default:
      return <Default />;
  }
}