import { getSubdomain } from "./getSubdomain";

export async function getTheme(headers) {

  try {
    const subdomain = getSubdomain(headers);

    const res = await fetch(
      `http://localhost:3000/api/client/seo`,
      {
        cache: "no-store",
        headers: {
          ...(subdomain && { "x-subdomain": subdomain }),
        },
      }
    );

    const json = await res.json();


    if (json.status === "success") {
      return json.data;
    }
    return null;
  } catch (err) {
    // console.error("SEO fetch error:", err);
    return null;
  }
}