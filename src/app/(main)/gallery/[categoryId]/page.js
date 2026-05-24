import { headers } from "next/headers";
import { notFound } from "next/navigation";

import SchemaScript from "@/components/SchemaScript";
import {
  breadcrumbSchema,
  buildMetadata,
  cleanText,
  fetchClientData,
  getSiteUrl,
  readableName,
  schemaGraph,
  webPageSchema,
} from "@/lib/seo";

import GalleryCategoryPage from "./GalleryCategoryClient";

export const revalidate = 3600;

async function getCategoryData(categoryId, headerList) {
  const [category, galleries] = await Promise.all([
    fetchClientData(`/api/client/gallery-category/${categoryId}`, headerList),
    fetchClientData("/api/client/gallery", headerList, {
      params: { Gallery_Category_Id: categoryId, limit: 1000 },
    }),
  ]);

  return { category, galleries: galleries?.data || [] };
}

export async function generateMetadata({ params }) {
  const { categoryId } = await params;
  const headerList = await headers();
  const { category } = await getCategoryData(categoryId, headerList);
  const name = readableName(category?.Title || category?.Name || "Gallery Category");
  const description = cleanText(
    category?.Description || `View ${name} photo albums, campus events, and school activities.`,
    160
  );

  return buildMetadata({
    title: `${name} Photo Albums`,
    description,
    path: `/gallery/${categoryId}`,
    robots: category ? "index,follow" : "noindex,follow",
    headerList,
  });
}

export default async function Page({ params }) {
  const { categoryId } = await params;
  const headerList = await headers();
  const { category, galleries } = await getCategoryData(categoryId, headerList);
  if (!category) notFound();

  const siteUrl = getSiteUrl(headerList);
  const name = readableName(category.Title || category.Name || "Gallery Category");
  const schema = schemaGraph(
    webPageSchema({
      siteUrl,
      path: `/gallery/${categoryId}`,
      name: `${name} Photo Albums`,
      description: cleanText(category.Description || name, 180),
      type: "CollectionPage",
    }),
    breadcrumbSchema(siteUrl, [
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
      { name, path: `/gallery/${categoryId}` },
    ])
  );

  return (
    <>
      <SchemaScript schemaJson={schema} />
      <GalleryCategoryPage
        categoryId={categoryId}
        initialCategory={category}
        initialGalleries={galleries}
        initialLoaded
      />
    </>
  );
}
