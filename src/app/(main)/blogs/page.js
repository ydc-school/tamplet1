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

import BlogsListPage from "./BlogsListClient";

export const revalidate = 3600;

const title = "Education Blog, School News and Student Updates";
const description =
  "Read school updates, education insights, achievements, admission news, and student-focused articles from Yaduvanshi Group of Institutions.";

export async function generateMetadata() {
  const headerList = await headers();
  return buildMetadata({
    title,
    description,
    path: "/blogs",
    headerList,
  });
}

export default async function Page() {
  const headerList = await headers();
  const blogResult = await fetchClientData("/api/client/blog", headerList, {
    params: { page: 1, limit: 10 },
  });
  const siteUrl = getSiteUrl(headerList);
  const schema = schemaGraph(
    webPageSchema({
      siteUrl,
      path: "/blogs",
      name: title,
      description,
      type: "CollectionPage",
    }),
    breadcrumbSchema(siteUrl, [
      { name: "Home", path: "/" },
      { name: "Blogs", path: "/blogs" },
    ])
  );

  return (
    <>
      <SchemaScript schemaJson={schema} />
      <BlogsListPage
        initialBlogs={blogResult?.data || []}
        initialPagination={blogResult?.pagination}
        initialLoaded={Boolean(blogResult)}
      />
    </>
  );
}
