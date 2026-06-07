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
} from "@/lib/seo";

import GalleryDetailPage from "./GalleryDetailClient";

export const revalidate = 3600;

async function getGalleryData(categoryId, galleryId, headerList) {
  const [category, gallery] = await Promise.all([
    fetchClientData(`/api/client/gallery-category/${categoryId}`, headerList),
    fetchClientData(`/api/client/gallery/${galleryId}`, headerList),
  ]);

  return {
    category,
    gallery,
    images: gallery?.img || [],
  };
}

export async function generateMetadata({ params }) {
  const { categoryId, galleryId } = await params;
  const headerList = await headers();
  const { gallery, images } = await getGalleryData(categoryId, galleryId, headerList);
  const name = readableName(gallery?.Name || "Photo Album");

  return buildMetadata({
    title: `${name} Photo Gallery`,
    description: cleanText(
      gallery?.Description || `View photos from ${name} at Yaduvanshi Group of Institutions.`,
      160
    ),
    path: `/gallery/${categoryId}/${galleryId}`,
    image: images[0]?.Image ? `/uploads/${images[0].Image}` : undefined,
    robots: gallery ? "index,follow" : "noindex,follow",
    headerList,
  });
}

export default async function Page({ params }) {
  const { categoryId, galleryId } = await params;
  const headerList = await headers();
  const { category, gallery, images } = await getGalleryData(categoryId, galleryId, headerList);
  if (!gallery) notFound();

  const siteUrl = getSiteUrl(headerList);
  const categoryName = readableName(category?.Title || category?.Name || "Gallery");
  const galleryName = readableName(gallery.Name || "Photo Album");
  const pageUrl = absoluteUrl(`/gallery/${categoryId}/${galleryId}`, siteUrl);
  const schema = schemaGraph(
    {
      "@type": "ImageGallery",
      "@id": `${pageUrl}#gallery`,
      url: pageUrl,
      name: `${galleryName} Photo Gallery`,
      description: cleanText(gallery.Description, 180),
      image: images.map((image) => absoluteUrl(`/uploads/${image.Image}`, siteUrl)),
      isPartOf: { "@id": `${siteUrl}/#website` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    breadcrumbSchema(siteUrl, [
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
      { name: categoryName, path: `/gallery/${categoryId}` },
      { name: galleryName, path: `/gallery/${categoryId}/${galleryId}` },
    ])
  );

  return (
    <>
      <SchemaScript schemaJson={schema} />
      <GalleryDetailPage
        categoryId={categoryId}
        galleryId={galleryId}
        initialGallery={{ Name: gallery.Name, Description: gallery.Description }}
        initialImages={images}
        initialLoaded
      />
    </>
  );
}
