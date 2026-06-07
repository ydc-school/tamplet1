import { headers } from "next/headers";
import { notFound } from "next/navigation";

import SchemaScript from "@/components/SchemaScript";
import {
  articleSchema,
  breadcrumbSchema,
  buildMetadata,
  cleanText,
  fetchClientData,
  getSiteUrl,
  readableName,
  schemaGraph,
} from "@/lib/seo";

import BlogDetailPage from "./BlogDetailClient";

export const revalidate = 3600;

async function getBlog(id, headerList) {
  return fetchClientData(`/api/client/blog/${id}`, headerList);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const headerList = await headers();
  const blog = await getBlog(id, headerList);

  if (!blog) {
    return buildMetadata({
      title: "Blog Not Found",
      description: "The requested article could not be found.",
      path: `/blogs/${id}`,
      robots: "noindex,follow",
      headerList,
    });
  }

  const title = blog.Title || readableName(blog.Name);
  return buildMetadata({
    title,
    description: cleanText(blog.Description || blog.Content, 160),
    path: `/blogs/${id}`,
    image: blog.Image ? `/uploads/${blog.Image}` : undefined,
    type: "article",
    publishedTime: blog.Date,
    modifiedTime: blog.updatedAt,
    headerList,
  });
}

export default async function Page({ params }) {
  const { id } = await params;
  const headerList = await headers();
  const blog = await getBlog(id, headerList);
  if (!blog) notFound();

  const siteUrl = getSiteUrl(headerList);
  const title = blog.Title || readableName(blog.Name);
  const schema = schemaGraph(
    articleSchema({ blog, siteUrl, path: `/blogs/${id}` }),
    breadcrumbSchema(siteUrl, [
      { name: "Home", path: "/" },
      { name: "Blogs", path: "/blogs" },
      { name: title, path: `/blogs/${id}` },
    ])
  );

  return (
    <>
      <SchemaScript schemaJson={schema} />
      <BlogDetailPage id={id} initialBlog={blog} initialLoaded />
    </>
  );
}
