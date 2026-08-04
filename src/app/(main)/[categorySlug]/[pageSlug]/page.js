import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import slugify from "@/utils/slugify";
import { headers } from "next/headers";
import { getSubdomain } from "@/utils/getSubdomain";








async function getPageData(categorySlug, pageSlug) {
    const headerList = await headers();
    const subdomain = getSubdomain(headerList);

    try {
        const baseUrl =
            process.env.NEXT_PUBLIC_SITE_URL ||
            process.env.NEXT_PUBLIC_API_BASE_URL ||
            "http://localhost:3000";



        const res = await fetch(`${baseUrl}/api/client/pages/${categorySlug}/${pageSlug}`, {
            cache: "no-store",
            headers: {
                "x-subdomain": subdomain ? subdomain : "main",
            }
        });

        console.log(res)
        if (!res.ok) return null;


        const json = await res.json();
        if (json.status !== "success" || !json.data) return null;


        return json.data;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { categorySlug, pageSlug } = await params;
    const page = await getPageData(categorySlug, pageSlug);

    if (!page) {
        return {
            title: "Page Not Found | Yaduvanshi Group",
            description: "The requested page could not be found.",
            robots: { index: false, follow: false },
        };
    }

    const readableName = page.Name
        ? page.Name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Page";

    const rawText = page.Page_Data
        ? page.Page_Data.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
        : "";
    const description = rawText.slice(0, 160) || `${readableName} — Yaduvanshi Group`;

    const siteName = "Yaduvanshi Group";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yaduvanshigroup.edu.in";

    // Name conflict fix: 'pageSlug' ke jagah 'formattedSlug' use kiya hai
    const formattedSlug = slugify(page.Name || pageSlug || "page");
    const pageUrl = `${siteUrl}/pages/${formattedSlug}/${categorySlug}`;

    return {
        title: `${readableName} | ${siteName}`,
        description,
        openGraph: {
            title: `${readableName} | ${siteName}`,
            description,
            url: pageUrl,
            siteName,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: `${readableName} | ${siteName}`,
            description,
        },
        alternates: {
            canonical: pageUrl,
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function Page({ params }) {
    const { categorySlug, pageSlug } = await params;
    const pageData = await getPageData(categorySlug, pageSlug);

    if (!pageData) {
        notFound();
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yaduvanshigroup.edu.in";
    const pageUrl = `${siteUrl}/pages/${slugify(pageData.Name || pageSlug)}/${categorySlug}`;
    const description = pageData.Page_Data
        ? pageData.Page_Data.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160)
        : "";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: pageData.Name?.replace(/-/g, " ") || "Page",
        description,
        url: pageUrl,
        publisher: {
            "@type": "Organization",
            name: "Yaduvanshi Group",
            url: siteUrl,
        },
    };

    return (
        <>
            <Script
                id="page-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a]">
                {/* Header Section */}
                <header className="mx-auto max-w-4xl px-6 pt-16 pb-12">
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
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Home
                    </Link>

                    <h1 className="font-serif text-3xl font-medium capitalize tracking-tight text-[#171717] sm:text-4xl md:text-5xl">
                        {pageData.Name.replace(/-/g, " ")}
                    </h1>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-4xl px-6 pb-24">
                    <article
                        className="text-[16px] leading-[1.8] text-[#404040]
                        [&_h1]:font-serif [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-[#171717] [&_h1]:mt-10 [&_h1]:mb-4
                        [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#171717] [&_h2]:mt-10 [&_h2]:mb-4
                        [&_h3]:font-serif [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#171717] [&_h3]:mt-8 [&_h3]:mb-3
                        [&_h4]:font-serif [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-[#171717] [&_h4]:mt-6 [&_h4]:mb-2
                        [&_p]:mb-6
                        [&_strong]:font-semibold [&_strong]:text-[#171717]
                        [&_em]:italic [&_em]:text-[#525252]
                        [&_a]:text-[#171717] [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-[#a3a3a3] transition-colors hover:[&_a]:decoration-[#171717]
                        [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-5
                        [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-5
                        [&_li]:mb-2
                        [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-[#171717] [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-[#525252]
                        [&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[#e5e5e5]
                        [&_table]:mb-6 [&_table]:w-full [&_table]:border-collapse
                        [&_th]:border-b [&_th]:border-[#e5e5e5] [&_th]:pb-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-[#171717]
                        [&_td]:border-b [&_td]:border-[#f5f5f5] [&_td]:py-3 [&_td]:text-sm [&_td]:text-[#404040]
                        [&_img]:my-8 [&_img]:max-w-full [&_img]:rounded-md"
                        dangerouslySetInnerHTML={{ __html: pageData.Page_Data }}
                    />
                </main>
            </div>
        </>
    );
}