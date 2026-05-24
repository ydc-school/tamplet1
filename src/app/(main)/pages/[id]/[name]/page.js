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

import DynamicPage from "./Dynamicpage";

export const revalidate = 3600;

async function getPageData(id, headerList) {
  return fetchClientData(`/api/client/pages/${id}`, headerList);
}

export async function generateMetadata({ params }) {
  const { id, name } = await params;
  const headerList = await headers();
  const page = await getPageData(id, headerList);
  const readableTitle = readableName(page?.Name || name || "Page");
  const description = cleanText(
    page?.Page_Data || `${readableTitle} from Yaduvanshi Group of Institutions.`,
    160
  );

  return buildMetadata({
    title: `${readableTitle} | Yaduvanshi Group`,
    description,
    path: `/pages/${id}/${name}`,
    type: "article",
    robots: page ? "index,follow" : "noindex,follow",
    headerList,
  });
}

export default async function Page({ params }) {
  const { id, name } = await params;
  const headerList = await headers();
  const page = await getPageData(id, headerList);
  if (!page) notFound();

  const siteUrl = getSiteUrl(headerList);
  const readableTitle = readableName(page.Name || name);
  const schema = schemaGraph(
    webPageSchema({
      siteUrl,
      path: `/pages/${id}/${name}`,
      name: readableTitle,
      description: cleanText(page.Page_Data, 180),
      type: "Article",
    }),
    breadcrumbSchema(siteUrl, [
      { name: "Home", path: "/" },
      { name: readableTitle, path: `/pages/${id}/${name}` },
    ])
  );

  return (
    <>
      <SchemaScript schemaJson={schema} />
      <DynamicPage id={id} name={name} initialPageData={page} initialLoaded />
    </>
  );
}
