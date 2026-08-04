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

// ─── Fonts ─────────────────────────────────
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap", // 🆕 Prevent FOIT (Flash of Invisible Text)
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

// ─── Metadata Generation ───────────────────
export async function generateMetadata() {
  const headerList = await headers();
  const seo = await getSeoData(headerList);

  const metadata = buildMetadata({
    title: seo?.Meta_Title || SITE_NAME,
    description: seo?.Meta_Description || DEFAULT_DESCRIPTION,
    keywords: seo?.Meta_Keywords
      ? seo.Meta_Keywords.split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : DEFAULT_KEYWORDS,
    robots: seo?.Robots || "index,follow",
    path: seo?.Canonical_Url || "/",
    image: seo?.OG_Image || seo?.Twitter_Image || undefined,
    type: seo?.OG_Type || "website",
    headerList,
  });

  const favicon = seo?.Favicon_Url || "/logo/logo.png";

  return {
    ...metadata,

    // Icons
    icons: {
      icon: favicon,
      apple: favicon,
    },

    // OpenGraph Overrides
    openGraph: {
      ...metadata.openGraph,
      title: seo?.OG_Title || metadata.openGraph.title,
      description: seo?.OG_Description || metadata.openGraph.description,
      type: seo?.OG_Type || metadata.openGraph.type,
    },

    // Twitter Overrides
    twitter: {
      ...metadata.twitter,
      card: seo?.Twitter_Card || "summary_large_image",
      title: seo?.Twitter_Title || metadata.twitter.title,
      description: seo?.Twitter_Description || metadata.twitter.description,
      images: seo?.Twitter_Image
        ? [seo.Twitter_Image]
        : metadata.twitter.images,
    },

    // Site Verification
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
        other: {
          "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION,
        },
      }),
    },

    // Additional Meta
    formatDetection: {
      telephone: false, // 🆕 Prevent iOS auto-linking phone numbers
    },

    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://yaduvanshigroup.edu.in"
    ),
  };
}

// ─── Viewport Config ───────────────────────
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

// ─── Root Layout ───────────────────────────
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

  // Build Global Schema (Organization + WebSite)
  const globalSchema = schemaGraph(
    organizationSchema(schoolInfo, siteUrl),
    websiteSchema(siteUrl)
  );

  // Custom Schema from DB — only if different
  const customSchema = seo?.Schema_Json;
  const shouldRenderCustomSchema =
    customSchema &&
    typeof customSchema === "object" &&
    Object.keys(customSchema).length > 0;

  return (
    <html lang="en-IN">
      <head>
        {/* Critical Meta Tags */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />

        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//admin.yaduvanshigroup.edu.in" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        {/* Preconnect for External Resources */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Material Icons (Consider self-hosting for production) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased`}
      >
        {/* Global Schema (Organization + WebSite) */}
        <SchemaScript schemaJson={globalSchema} />

        {/* Custom Schema from Database (if exists) */}
        {shouldRenderCustomSchema && (
          <SchemaScript schemaJson={customSchema} />
        )}

        <SchoolProvider>{children}</SchoolProvider>
      </body>
    </html>
  );
}