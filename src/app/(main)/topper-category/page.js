import { headers } from "next/headers";

import SchemaScript from "@/components/SchemaScript";
import {
  breadcrumbSchema,
  buildMetadata,
  fetchClientData,
  getSiteUrl,
  schemaGraph,
  webPageSchema,
} from "@/lib/seo";

import TopperCategoryPage from "./TopperCategoryClient";

export const revalidate = 3600;

const title = "Student Toppers and Academic Achievements";
const description =
  "Browse topper categories, academic achievers, ranks, scores, and student success profiles from Yaduvanshi Group of Institutions.";

export async function generateMetadata() {
  const headerList = await headers();
  return buildMetadata({
    title,
    description,
    path: "/topper-category",
    headerList,
  });
}

export default async function Page() {
  const headerList = await headers();
  const result = await fetchClientData("/api/client/toper-category", headerList, {
    params: { limit: 1000, sortBy: "Index_No", sortOrder: "ASC" },
  });
  const categories = result?.data || result || [];
  const siteUrl = getSiteUrl(headerList);
  const schema = schemaGraph(
    webPageSchema({
      siteUrl,
      path: "/topper-category",
      name: title,
      description,
      type: "CollectionPage",
    }),
    breadcrumbSchema(siteUrl, [
      { name: "Home", path: "/" },
      { name: "Toppers", path: "/topper-category" },
    ])
  );

  return (
    <>
      <SchemaScript schemaJson={schema} />
      <TopperCategoryPage initialCategories={categories} initialLoaded={Boolean(result)} />
    </>
  );
}
