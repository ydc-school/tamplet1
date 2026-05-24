import { headers } from "next/headers";

import { absoluteUrl, fetchClientData, getSiteUrl } from "@/lib/seo";
import slugify from "@/utils/slugify";

const now = new Date();

function sitemapEntry(siteUrl, path, options = {}) {
  return {
    url: absoluteUrl(path, siteUrl),
    lastModified: options.lastModified ? new Date(options.lastModified) : now,
    changeFrequency: options.changeFrequency || "weekly",
    priority: options.priority ?? 0.7,
  };
}

export default async function sitemap() {
  const headerList = await headers();
  const siteUrl = getSiteUrl(headerList);

  const [pageCategories, blogs, galleryCategories, topperCategories, toppers] =
    await Promise.all([
      fetchClientData("/api/client/pages", headerList),
      fetchClientData("/api/client/blog", headerList, { params: { limit: 1000 } }),
      fetchClientData("/api/client/gallery-category", headerList, { params: { limit: 1000 } }),
      fetchClientData("/api/client/toper-category", headerList, { params: { limit: 1000 } }),
      fetchClientData("/api/client/toper", headerList, { params: { limit: 1000 } }),
    ]);

  const staticRoutes = [
    sitemapEntry(siteUrl, "/", { priority: 1, changeFrequency: "daily" }),
    sitemapEntry(siteUrl, "/blogs", { priority: 0.86, changeFrequency: "daily" }),
    sitemapEntry(siteUrl, "/gallery", { priority: 0.82 }),
    sitemapEntry(siteUrl, "/topper-category", { priority: 0.78 }),
  ];

  const cmsPages = (Array.isArray(pageCategories) ? pageCategories : [])
    .flatMap((category) => category.pages || [])
    .filter((page) => page?.Id && page?.Name)
    .map((page) =>
      sitemapEntry(siteUrl, `/pages/${page.Id}/${slugify(page.Name)}`, {
        priority: 0.74,
        changeFrequency: "monthly",
        lastModified: page.updatedAt,
      })
    );

  const blogRoutes = (blogs?.data || [])
    .filter((blog) => blog?.Id)
    .map((blog) =>
      sitemapEntry(siteUrl, `/blogs/${blog.Id}`, {
        priority: 0.76,
        changeFrequency: "monthly",
        lastModified: blog.updatedAt || blog.Date,
      })
    );

  const galleryCategoryRoutes = (galleryCategories?.data || [])
    .filter((category) => category?.Id)
    .map((category) =>
      sitemapEntry(siteUrl, `/gallery/${category.Id}`, {
        priority: 0.68,
        lastModified: category.updatedAt || category.Date,
      })
    );

  const galleryLists = await Promise.all(
    (galleryCategories?.data || [])
      .filter((category) => category?.Id)
      .map((category) =>
        fetchClientData("/api/client/gallery", headerList, {
          params: { Gallery_Category_Id: category.Id, limit: 1000 },
        }).then((result) => ({ categoryId: category.Id, galleries: result?.data || [] }))
      )
  );

  const galleryRoutes = galleryLists.flatMap(({ categoryId, galleries }) =>
    galleries
      .filter((gallery) => gallery?.Id)
      .map((gallery) =>
        sitemapEntry(siteUrl, `/gallery/${categoryId}/${gallery.Id}`, {
          priority: 0.64,
          lastModified: gallery.updatedAt,
        })
      )
  );

  const topperCategoryRoutes = (topperCategories?.data || [])
    .filter((category) => category?.Id)
    .map((category) =>
      sitemapEntry(siteUrl, `/topper-category/${category.Id}`, {
        priority: 0.66,
        lastModified: category.updatedAt,
      })
    );

  const studentRoutes = (toppers?.data || [])
    .filter((student) => student?.Id)
    .map((student) =>
      sitemapEntry(siteUrl, `/student/${student.Id}`, {
        priority: 0.58,
        changeFrequency: "monthly",
        lastModified: student.updatedAt,
      })
    );

  return [
    ...staticRoutes,
    ...cmsPages,
    ...blogRoutes,
    ...galleryCategoryRoutes,
    ...galleryRoutes,
    ...topperCategoryRoutes,
    ...studentRoutes,
  ].filter((entry, index, all) => all.findIndex((item) => item.url === entry.url) === index);
}
