import { getSubdomain } from "./getSubdomain";

export async function getSeoData(headers) {
  try {
    const  subdomain  = getSubdomain(headers);

    const res = await fetch(
      `http://localhost:3000/api/client/seo`,
      {
        next: { revalidate: 3600 }, // 1 hour cache
        headers: {
          ...(subdomain && { "x-subdomain": subdomain }),
        },
      }
    );

    const json = await res.json();
    // console.log(json)


    if (json.status === "success") {
      return json.data;
    }
    return null;
  } catch (err) {
    // console.error("SEO fetch error:", err);
    return null;
  }
}