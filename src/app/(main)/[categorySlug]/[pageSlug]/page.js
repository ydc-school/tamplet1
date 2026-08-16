import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import slugify from "@/utils/slugify";
import { headers } from "next/headers";


// ─── Helper: HTML entity decode ─────────────────────────────
function decodeHtmlEntities(text) {
  if (!text) return "";
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

// ─── Helper: Clean text for meta ────────────────────────────
function cleanTextForMeta(html, maxLength = 158) {
  if (!html) return "";
  const decoded = decodeHtmlEntities(html);
  const plainText = decoded.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  if (plainText.length <= maxLength) return plainText;

  // Smart truncate — last complete sentence or word ke baad cut karo
  const truncated = plainText.slice(0, maxLength);
  const lastPeriod = truncated.lastIndexOf(".");
  const lastSpace = truncated.lastIndexOf(" ");

  // Agar period milta hai last 30 chars mein, to wahan cut karo
  if (lastPeriod > maxLength - 30) {
    return truncated.slice(0, lastPeriod + 1);
  }

  // Nahi to last complete word pe cut karo
  return truncated.slice(0, lastSpace) + "...";
}

// ─── Helper: Format name for display ────────────────────────
function formatReadableName(name) {
  if (!name) return "Page";
  return name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}


export async function getPageData(categorySlug, pageSlug) {
  try {
    const headersList = await headers();
    const subdomain = headersList.get('x-subdomain');
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "http://localhost:3000";

    const res = await fetch(
      `${baseUrl}/api/client/pages/${categorySlug}/${pageSlug}`,
      {
        cache: "no-store",
        headers: {
          "x-subdomain": subdomain,
        },
      }
    );

    if (!res.ok) return null;

    const json = await res.json();
    if (json.status !== "success" || !json.data) return null;

    return json.data;
  } catch {
    return null;
  }
}

// ─── Metadata Generation ────────────────────────────────────
export async function generateMetadata({ params }) {
  const { categorySlug, pageSlug } = await params;
  const page = await getPageData(categorySlug, pageSlug);

  // ─── 404 Page Metadata ──────────────────────────────────
  if (!page) {
    return {
      title: "Page Not Found | Yaduvanshi Group",
      description:
        "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  }

  // ─── Extract Data ───────────────────────────────────────
  const readableName = formatReadableName(page.Name);
  const description = cleanTextForMeta(page.Page_Data, 158);
  const siteName = "Yaduvanshi Group";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://yaduvanshigroup.edu.in";

  // URL construction with validation
  const formattedSlug = slugify(page.Name || pageSlug || "page");
  const cleanCategory = categorySlug ? slugify(categorySlug) : "pages";
  const pageUrl = `${siteUrl}/pages/${formattedSlug}/${cleanCategory}`;

  // Default OG image — ideally a page-specific image
  const ogImageUrl = page.Image_URL || `${siteUrl}/logo/logo.png`;

  // Keywords — customize based on category
  const baseKeywords = [
    "Yaduvanshi Group",
    "schools Haryana",
    "colleges Rajasthan",
    "engineering college",
    "B.Ed college",
  ];

  if (categorySlug === "about-us") {
    baseKeywords.push("vision mission", "chairman message", "management committee");
  } else if (categorySlug === "achievements") {
    baseKeywords.push("student achievements", "NEET results", "JEE results");
  }

  const keywords = baseKeywords.join(", ");

  return {
    title: `${readableName} | ${siteName}`,
    description,

    // Keywords meta tag
    keywords,

    // Canonical & Language
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-IN": pageUrl,
      },
    },

    // Open Graph
    openGraph: {
      title: `${readableName} | ${siteName}`,
      description,
      url: pageUrl,
      siteName,
      type: "article",
      locale: "en_IN",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: readableName,
          type: "image/png",
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: `${readableName} | ${siteName}`,
      description,
      images: [ogImageUrl],
      creator: "@YaduvanshiGroup", // if you have a Twitter handle
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Other meta
    category: "education",
    creator: "Yaduvanshi Group of Institutions",
    publisher: "Yaduvanshi Group of Institutions",
  };
}

// ─── Page Component ─────────────────────────────────────────
export default async function Page({ params }) {
  const { categorySlug, pageSlug } = await params;
  const pageData = await getPageData(categorySlug, pageSlug);

  if (!pageData) {
    notFound();
  }

  // ─── Prepare Data ──────────────────────────────────────
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://yaduvanshigroup.edu.in";

  const cleanCategory = categorySlug ? slugify(categorySlug) : "pages";
  const pageUrl = `${siteUrl}/pages/${slugify(pageData.Name || pageSlug)}/${cleanCategory}`;

  const description = cleanTextForMeta(pageData.Page_Data, 158);
  const readableName = formatReadableName(pageData.Name);
  const categoryName = formatReadableName(categorySlug);

  // ─── Structured Data ───────────────────────────────────
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: readableName,
    description,
    url: pageUrl,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: "Yaduvanshi Group",
      url: siteUrl,
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: "Yaduvanshi Group of Institutions",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo/logo.png`,
      },
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryName,
        item: `${siteUrl}/${cleanCategory}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: readableName,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a]">
        {/* Header Section */}
        <header className="mx-auto max-w-4xl px-6 pt-16 pb-12">
          {/* Breadcrumb Navigation */}
          <nav
            className="mb-6 flex items-center gap-2 text-xs font-medium text-[#737373]"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-[#171717] transition-colors uppercase tracking-wider"
            >
              Home
            </Link>
            <svg
              className="h-3 w-3 text-[#a3a3a3]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            {/* <Link
              href={`/${cleanCategory}`}
              className="hover:text-[#171717] transition-colors uppercase tracking-wider"
            >
              {categoryName}
            </Link> */}
            <svg
              className="h-3 w-3 text-[#a3a3a3]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-[#171717] font-semibold uppercase tracking-wider">
              {readableName}
            </span>
          </nav>

          {/* Back to Home Link */}
          <Link
            href="/"
            className="group mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#737373] transition-colors hover:text-[#171717]"
          >
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Home
          </Link>

          {/* Page Title — H1 */}
          <h1 className="font-serif text-3xl font-medium capitalize tracking-tight text-[#171717] sm:text-4xl md:text-5xl">
            {readableName}
          </h1>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-4xl px-6 pb-24">
          <article
             className="page"
            dangerouslySetInnerHTML={{ __html: pageData.Page_Data }}
          />
        </main>
      </div>
    </>
  );
}