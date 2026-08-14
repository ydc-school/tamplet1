import React from 'react';
import Default from '@/themes/default/Page';
import Ysnmgh from '@/themes/ysnmgh/Page';
import Main from '@/themes/main/MainTheme';
import { headers } from "next/headers";
import { getSubdomain } from "@/utils/getSubdomain";

export default async function Page() {
  const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  if (subdomain && subdomain !== 'main') {
    return <Default />;
  }

  else if (subdomain && subdomain == 'ysnmgh') {
    return <Ysnmgh />;
  }

  return <Main />;
}