import React from 'react';
import Default from '@/themes/default/Page';
import Main from '@/themes/main/Page';
import { headers } from "next/headers";
import { getSubdomain } from "@/utils/getSubdomain";

export default async function Page() {
    const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  switch (subdomain) {

    default:
      return <Default />;
  }
}