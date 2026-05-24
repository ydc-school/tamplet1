import { headers } from "next/headers";
import { notFound } from "next/navigation";

import SchemaScript from "@/components/SchemaScript";
import {
  absoluteUrl,
  breadcrumbSchema,
  buildMetadata,
  cleanText,
  fetchClientData,
  getSiteUrl,
  readableName,
  schemaGraph,
  webPageSchema,
} from "@/lib/seo";

import TopperCategoryDetailPage from "./TopperCategoryDetailClient";

export const revalidate = 3600;

async function getTopperCategoryData(categoryId, headerList) {
  const [category, toppers] = await Promise.all([
    fetchClientData(`/api/client/toper-category/${categoryId}`, headerList),
    fetchClientData("/api/client/toper", headerList, {
      params: {
        topperCategoryId: categoryId,
        limit: 1000,
        sortBy: "Rank",
        sortOrder: "ASC",
      },
    }),
  ]);

  return {
    category,
    toppers: toppers?.data || [],
  };
}

export async function generateMetadata({ params }) {
  const { categoryId } = await params;
  const headerList = await headers();
  const { category } = await getTopperCategoryData(categoryId, headerList);
  const name = readableName(category?.Name || "Topper Category");

  return buildMetadata({
    title: `${name} Toppers`,
    description: cleanText(
      `${name} toppers, academic ranks, scores, and student achievement profiles.`,
      160
    ),
    path: `/topper-category/${categoryId}`,
    robots: category ? "index,follow" : "noindex,follow",
    headerList,
  });
}

export default async function Page({ params }) {
  const { categoryId } = await params;
  const headerList = await headers();
  const { category, toppers } = await getTopperCategoryData(categoryId, headerList);
  if (!category) notFound();

  const siteUrl = getSiteUrl(headerList);
  const name = readableName(category.Name || "Topper Category");
  const pageUrl = absoluteUrl(`/topper-category/${categoryId}`, siteUrl);
  const schema = schemaGraph(
    webPageSchema({
      siteUrl,
      path: `/topper-category/${categoryId}`,
      name: `${name} Toppers`,
      description: `${name} student topper profiles and academic achievements.`,
      type: "CollectionPage",
    }),
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#students`,
      itemListElement: toppers.map((student, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/student/${student.Id}`, siteUrl),
        name: student.Student_Name,
      })),
    },
    breadcrumbSchema(siteUrl, [
      { name: "Home", path: "/" },
      { name: "Toppers", path: "/topper-category" },
      { name, path: `/topper-category/${categoryId}` },
    ])
  );

  return (
    <>
      <SchemaScript schemaJson={schema} />
      <TopperCategoryDetailPage
        categoryId={categoryId}
        initialCategory={category}
        initialToppers={toppers}
        initialLoaded
      />
    </>
  );
}
