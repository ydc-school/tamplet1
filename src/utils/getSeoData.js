

export async function getSeoData(headers) {
  try {
        const subdomain = headers.get('x-subdomain');

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/client/seo`,
      {
        next: { revalidate: 3600 }, // 1 hour cache
        headers: {
          "x-subdomain": subdomain ? subdomain : "main",
        }
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