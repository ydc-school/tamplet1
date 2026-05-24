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

import GalleryPage from "./GalleryPageClient";

export const revalidate = 3600;

const title = "Photo Gallery";
const description =
  "Explore campus photos, school events, achievements, activities, and student life at Yaduvanshi Group of Institutions.";

export async function generateMetadata() {
  const headerList = await headers();
  return buildMetadata({
    title,
    description,
    path: "/gallery",
    headerList,
  });
}

export default async function Page() {
  const headerList = await headers();
  const result = await fetchClientData("/api/client/gallery-category", headerList, {
    params: { limit: 1000, sortBy: "Index_No", sortOrder: "ASC" },
  });
  const categories = result?.data || result || [];
  const siteUrl = getSiteUrl(headerList);
  const schema = schemaGraph(
    webPageSchema({
      siteUrl,
      path: "/gallery",
      name: title,
      description,
      type: "ImageGallery",
    }),
    breadcrumbSchema(siteUrl, [
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ])
  );

  return (
    <>
      <SchemaScript schemaJson={schema} />
      <GalleryPage initialCategories={categories} initialLoaded={Boolean(result)} />
    </>
  );
}
