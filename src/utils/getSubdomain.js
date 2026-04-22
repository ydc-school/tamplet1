

export function getSubdomain(hostdata) {
  const host = hostdata.get("host") || "";

  // example: school1.example.com
  const hostname = host.split(":")[0]; // port hata diya
  const parts = hostname.split(".");

  let subdomain = null;

  if (parts.length >= 2) {
    subdomain = parts[0]; // school1
  }

  return subdomain;
}