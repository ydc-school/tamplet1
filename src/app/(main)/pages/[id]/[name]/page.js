

import DynamicPage from "./Dynamicpage";

// ─── SEO: dynamic metadata per page ────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    // Fetch from your internal API (server-side, so absolute URL needed)
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/client/pages/${id}`, {
      // Revalidate every 1 hour; adjust as needed
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Page not found");

    const json = await res.json();

    if (json.status !== "success" || !json.data) throw new Error("No data");

    const page = json.data;

    // Human-readable title: replace hyphens, capitalize
    const readableName = page.Name
      ? page.Name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Page";

    // Strip HTML tags from Page_Data for a clean description
    const rawText = page.Page_Data
      ? page.Page_Data.replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
      : "";
    const description = rawText.slice(0, 160) || `${readableName} — Yaduvanshi Group`;

    const siteName = "Yaduvanshi Group";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yaduvanshigroup.edu.in";
    const pageUrl = `${siteUrl}/pages/${id}`;

    return {
      title: `${readableName} | ${siteName}`,
      description,

      // ── Open Graph ──────────────────────────────────────────────────────
      openGraph: {
        title: `${readableName} | ${siteName}`,
        description,
        url: pageUrl,
        siteName,
        type: "article",
        // Add og:image if your page data ever includes a cover image
        // images: page.Cover_Image ? [{ url: page.Cover_Image }] : [],
      },

      // ── Twitter Card ────────────────────────────────────────────────────
      twitter: {
        card: "summary",
        title: `${readableName} | ${siteName}`,
        description,
      },

      // ── Canonical URL ───────────────────────────────────────────────────
      alternates: {
        canonical: pageUrl,
      },

      // ── Robots ──────────────────────────────────────────────────────────
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    // Fallback metadata on fetch failure
    return {
      title: "Page | Yaduvanshi Group",
      description: "Explore pages from Yaduvanshi Group — leading educational institutions across Haryana and Rajasthan.",
      robots: { index: false, follow: false }, // don't index error states
    };
  }
}

// ─── Page component ─────────────────────────────────────────────────────────
export default function Page({ params }) {
  return <DynamicPage params={params} />;
}
