import { Montserrat, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";

import SchemaScript from "@/components/SchemaScript";
import { SchoolProvider } from "@/context/SchoolContext";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  SITE_NAME,
  buildMetadata,
  fetchClientData,
  getSiteUrl,
  organizationSchema,
  schemaGraph,
  websiteSchema,
} from "@/lib/seo";
import { getSeoData } from "@/utils/getSeoData";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
});


const DEFAULT_METADATA = {
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  robots: "index,follow",
  canonical: "/",
  favicon: "/logo/logo.png",
  og: {
    image: "/poster/34.png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export async function generateMetadata() {
  const headerList = await headers();
  const seo = await getSeoData(headerList);
  const d = DEFAULT_METADATA;

  const metadata = buildMetadata({
    title: seo?.Meta_Title || d.title,
    description: seo?.Meta_Description || d.description,
    keywords: seo?.Meta_Keywords
      ? seo.Meta_Keywords.split(",").map((item) => item.trim()).filter(Boolean)
      : d.keywords,
    robots: seo?.Robots || d.robots,
    path: seo?.Canonical_Url || d.canonical,
    image: seo?.OG_Image || seo?.Twitter_Image || d.og.image,
    type: seo?.OG_Type || d.og.type,
    headerList,
  });

  return {
    ...metadata,
    icons: {
      icon: seo?.Favicon_Url || d.favicon,
      apple: seo?.Favicon_Url || d.favicon,
    },
    openGraph: {
      ...metadata.openGraph,
      title: seo?.OG_Title || metadata.openGraph.title,
      description: seo?.OG_Description || metadata.openGraph.description,
      type: seo?.OG_Type || metadata.openGraph.type,
    },
    twitter: {
      ...metadata.twitter,
      card: seo?.Twitter_Card || d.twitter.card,
      title: seo?.Twitter_Title || metadata.twitter.title,
      description: seo?.Twitter_Description || metadata.twitter.description,
      images: seo?.Twitter_Image ? [seo.Twitter_Image] : metadata.twitter.images,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }) {
  const headerList = await headers();
  const [seo, schoolInfoResponse] = await Promise.all([
    getSeoData(headerList),
    fetchClientData("/api/client/school-info", headerList),
  ]);
  const siteUrl = getSiteUrl(headerList);
  const schoolInfo = Array.isArray(schoolInfoResponse)
    ? schoolInfoResponse[0]
    : schoolInfoResponse;
  const globalSchema = schemaGraph(
    organizationSchema(schoolInfo, siteUrl),
    websiteSchema(siteUrl)
  );

  return (
    <html lang="en-IN">
<head>
    <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
        rel="stylesheet" />
        </head>

      <body className={`${playfair.variable} ${montserrat.variable} antialiased`}>
        <SchemaScript schemaJson={globalSchema} />
        <SchemaScript schemaJson={seo?.Schema_Json} />
        <SchoolProvider>{children}</SchoolProvider>
      </body>
    </html>
  );
}
