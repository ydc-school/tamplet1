import { Playfair_Display, Source_Sans_3 } from "next/font/google";
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

// Typography optimization for editorial feel
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Added 400 for better body/quote versatility
  variable: "--font-playfair",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"], // Added 300 for delicate UI elements
  variable: "--font-source",
  display: "swap",
});

// ... (generateMetadata remains the same as your logic is robust)

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
    <html lang="en-IN" className="scroll-smooth">
      <body className={`${playfair.variable} ${sourceSans.variable} font-sans bg-white text-stone-900 antialiased selection:bg-amber-100 selection:text-amber-900`}>
        {/* Global SEO Schemas */}
        <SchemaScript schemaJson={globalSchema} />
        <SchemaScript schemaJson={seo?.Schema_Json} />
        
        {/* Main Application Shell */}
        <SchoolProvider>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </SchoolProvider>
      </body>
    </html>
  );
}