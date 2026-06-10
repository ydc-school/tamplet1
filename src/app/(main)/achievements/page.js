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

import AchievementsPageClient from "./AchievementsPageClient";

export const revalidate = 3600;

const title = "Achievements";
const description =
  "Browse every published achievement from Yaduvanshi Group of Institutions, search by name, title, year, or description, and open complete details in a modal.";

export async function generateMetadata() {
  const headerList = await headers();
  return buildMetadata({
    title,
    description,
    path: "/achievements",
    headerList,
  });
}

export default async function Page() {
  const headerList = await headers();
  const achievementsResult = await fetchClientData("/api/client/achievements", headerList, {
    params: { limit: 1000 },
  });
  const achievements = Array.isArray(achievementsResult)
    ? achievementsResult
    : achievementsResult?.data || [];
  const siteUrl = getSiteUrl(headerList);
  const schema = schemaGraph(
    webPageSchema({
      siteUrl,
      path: "/achievements",
      name: title,
      description,
      type: "CollectionPage",
    }),
    breadcrumbSchema(siteUrl, [
      { name: "Home", path: "/" },
      { name: "Achievements", path: "/achievements" },
    ])
  );

  return (
    <>
      <SchemaScript schemaJson={schema} />
      <AchievementsPageClient
        initialAchievements={achievements}
        initialLoaded={Boolean(achievementsResult)}
      />
    </>
  );
}
