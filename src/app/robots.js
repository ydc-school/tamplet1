import { headers } from "next/headers";

import { getSiteUrl } from "@/lib/seo";

export default async function robots() {
  const headerList = await headers();
  const siteUrl = getSiteUrl(headerList);

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/uploads/"],
        disallow: [
          "/api/",
          "/admin/",
          "/login",
          "/dashboard",
          "/toper-category/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
