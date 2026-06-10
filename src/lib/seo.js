import { resolveAssetSrc } from "@/utils/media";

export const SITE_NAME = "Yaduvanshi Group of Institutions";
export const DEFAULT_SITE_URL = "https://yaduvanshigroup.edu.in";
export const DEFAULT_DESCRIPTION =
  "Yaduvanshi Group of Institutions offers quality education, strong academics, campus facilities, achievements, admission updates, and student success stories.";
export const DEFAULT_KEYWORDS = [
  "Yaduvanshi Group of Institutions",
  "school admissions",
  "college in Haryana",
  "education",
  "student toppers",
  "campus facilities",
];

const DEFAULT_OG_IMAGE = "/poster/34.png";

export function cleanText(value = "", limit = 160) {
  const text = String(value || "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!limit || text.length <= limit) return text;
  return `${text.slice(0, limit - 1).trim()}...`;
}

export function readableName(value = "") {
  return String(value || "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function normalizeOrigin(value) {
  if (!value) return DEFAULT_SITE_URL;
  try {
    const url = new URL(value);
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function getSiteUrl(headerList) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (configured) return normalizeOrigin(configured);

  const host = headerList?.get?.("x-forwarded-host") || headerList?.get?.("host");
  if (!host) return DEFAULT_SITE_URL;

  const proto =
    headerList?.get?.("x-forwarded-proto") ||
    (host.includes("localhost") || host.startsWith("127.") ? "http" : "https");

  return normalizeOrigin(`${proto}://${host}`);
}

export function absoluteUrl(pathOrUrl, siteUrl = DEFAULT_SITE_URL) {
  if (!pathOrUrl) return undefined;
  const value = String(pathOrUrl);

  if (value.startsWith("//")) return `https:${value}`;
  try {
    return new URL(value).toString();
  } catch {
    return new URL(value.startsWith("/") ? value : `/${value}`, siteUrl).toString();
  }
}

export function getSubdomainFromHeaders(headerList) {
  const configured = process.env.NEXT_PUBLIC_DEFAULT_SUBDOMAIN || process.env.DEFAULT_SUBDOMAIN;
  const headerSubdomain = headerList?.get?.("x-subdomain");
  if (headerSubdomain) return headerSubdomain;

  const host = headerList?.get?.("x-forwarded-host") || headerList?.get?.("host");
  if (!host) return configured || null;

  const hostname = host.split(":")[0];
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    /^\d+\.\d+\.\d+\.\d+$/.test(hostname)
  ) {
    return configured || null;
  }

  const parts = hostname.split(".");
  return parts.length > 2 ? parts[0] : configured || parts[0] || null;
}

export async function fetchClientData(endpoint, headerList, options = {}) {
  try {
    const backendUrl =
      process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
    const url = new URL(endpoint, backendUrl);

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.set(key, value);
        }
      });
    }

    const subdomain = getSubdomainFromHeaders(headerList);
    const headers = { Accept: "application/json" };
    if (subdomain) headers["x-subdomain"] = subdomain;

    const response = await fetch(url, {
      headers,
      next: { revalidate: options.revalidate ?? 3600 },
    });

    if (!response.ok) return null;

    const json = await response.json();
    return json?.status === "success" ? json.data : null;
  } catch {
    return null;
  }
}

export function parseRobots(value = "index,follow") {
  if (typeof value === "object" && value !== null) return value;
  const robots = String(value || "index,follow").toLowerCase();
  return {
    index: !robots.includes("noindex"),
    follow: !robots.includes("nofollow"),
    googleBot: {
      index: !robots.includes("noindex"),
      follow: !robots.includes("nofollow"),
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  keywords = DEFAULT_KEYWORDS,
  robots = "index,follow",
  publishedTime,
  modifiedTime,
  siteName = SITE_NAME,
  headerList,
} = {}) {
  const siteUrl = getSiteUrl(headerList);
  const canonical = absoluteUrl(path, siteUrl);
  const metaTitle = cleanText(title || SITE_NAME, 68);
  const metaDescription = cleanText(description || DEFAULT_DESCRIPTION, 160);
  const ogImage = absoluteUrl(image || DEFAULT_OG_IMAGE, siteUrl);

  return {
    metadataBase: new URL(siteUrl),
    title: metaTitle,
    description: metaDescription,
    keywords,
    robots: parseRobots(robots),
    alternates: {
      canonical,
      languages: {
        "en-IN": canonical,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName,
      locale: "en_IN",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
    category: "education",
    creator: siteName,
    publisher: siteName,
  };
}

export function schemaGraph(...schemas) {
  const graph = schemas.flat().filter(Boolean);
  if (!graph.length) return null;
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function organizationSchema(schoolInfo, siteUrl = DEFAULT_SITE_URL) {
  const name = schoolInfo?.School_Name || SITE_NAME;
  const sameAs = [
    schoolInfo?.Youtube_Url,
    schoolInfo?.Linkedin_Url,
    schoolInfo?.Instagram_Url,
    schoolInfo?.Twitter_Url,
  ]
    .filter(Boolean)
    .map((url) => absoluteUrl(url, siteUrl));

  return {
    "@type": "EducationalOrganization",
    "@id": `${siteUrl}/#organization`,
    name,
    alternateName: schoolInfo?.Short_Name || undefined,
    url: siteUrl,
    logo: absoluteUrl(resolveAssetSrc(schoolInfo?.Logo_Url, "/logo/logo.png"), siteUrl),
    description: cleanText(schoolInfo?.Motto || DEFAULT_DESCRIPTION, 220),
    foundingDate: schoolInfo?.Established_Year || undefined,
    email: schoolInfo?.Email || undefined,
    telephone: schoolInfo?.Alternate_Phone || undefined,
    sameAs,
    address: {
      "@type": "PostalAddress",
      streetAddress: cleanText(schoolInfo?.Address, 180) || undefined,
      addressLocality: schoolInfo?.City || undefined,
      addressRegion: schoolInfo?.State || undefined,
      postalCode: schoolInfo?.Pin_Code || undefined,
      addressCountry: "IN",
    },
  };
}

export function websiteSchema(siteUrl = DEFAULT_SITE_URL) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: SITE_NAME,
    url: siteUrl,
    inLanguage: "en-IN",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function breadcrumbSchema(siteUrl, items = []) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, siteUrl),
    })),
  };
}

export function webPageSchema({ siteUrl, path, name, description, type = "WebPage" }) {
  const url = absoluteUrl(path, siteUrl);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description: cleanText(description || DEFAULT_DESCRIPTION, 180),
    inLanguage: "en-IN",
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function articleSchema({ blog, siteUrl, path, schoolInfo }) {
  const url = absoluteUrl(path, siteUrl);
  const title = blog?.Title || readableName(blog?.Name) || "Article";
  const image = blog?.Image ? absoluteUrl(`/uploads/${blog.Image}`, siteUrl) : absoluteUrl(DEFAULT_OG_IMAGE, siteUrl);

  return {
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: cleanText(title, 110),
    description: cleanText(blog?.Description || blog?.Content, 180),
    image: [image],
    datePublished: blog?.Date || blog?.createdAt || undefined,
    dateModified: blog?.updatedAt || blog?.Date || undefined,
    author: {
      "@type": "Person",
      name: blog?.Author || schoolInfo?.School_Name || SITE_NAME,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

export function faqSchema(items = []) {
  const mainEntity = items
    .filter((item) => item?.question && item?.answer)
    .map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: cleanText(item.answer, 300),
      },
    }));

  if (!mainEntity.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity,
  };
}

export function personSchema({ student, siteUrl, path }) {
  if (!student) return null;
  return {
    "@type": "Person",
    "@id": `${absoluteUrl(path, siteUrl)}#student`,
    name: student.Student_Name,
    image: student.Image ? absoluteUrl(`/uploads/${student.Image}`, siteUrl) : undefined,
    description: cleanText(student.Description, 180),
    alumniOf: { "@id": `${siteUrl}/#organization` },
  };
}
