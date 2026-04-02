// lib/getTheme.js
export async function getTheme() {
  const res = await fetch("/api/client/theme", {
    cache: "no-store",
  });

  return res.json();
}