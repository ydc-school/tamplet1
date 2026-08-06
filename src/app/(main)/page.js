import React from 'react'
import Default from '@/themes/default/Page'
import Main from '@/themes/main/MainTheme'
import { headers } from "next/headers";
import { getSubdomain } from "@/utils/getSubdomain";
export default async function page() {
   const headerList = await headers();
    const subdomain = getSubdomain(headerList);
  
    if (subdomain) {
      return <Default />;
    }
  
    return <Main />;
  }
