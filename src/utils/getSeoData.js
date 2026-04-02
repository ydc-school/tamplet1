export async function getSeoData(branchId) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/client/seo/${branchId}`,
      { next: { revalidate: 3600 } } // 1 hour cache
    );
    const json = await res.json();
    

    if (json.status === 'success') {
  
      return json.data;
    }
    return null;
  } catch (err) {
    console.error('SEO fetch error:', err);
    return null;
  }
}