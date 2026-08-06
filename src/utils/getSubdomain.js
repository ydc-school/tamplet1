
export function getSubdomain(host) {
  if (!host) return null;

  const hostname = host.split(":")[0].toLowerCase();
  const rootDomain =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN || "yaduvanshigroup.edu.in";

 
  if (hostname.endsWith(".localhost")) {
    return hostname.replace(".localhost", "") || null;
  }

  // Root domain (yaduvanshigroup.edu.in)
  if (hostname === rootDomain || hostname === `www.${rootDomain}`) {
    return null;
  }

  // Subdomain (ydcmgh.yaduvanshigroup.edu.in)
  if (hostname.endsWith(`.${rootDomain}`)) {
    return hostname.replace(`.${rootDomain}`, "") || null;
  }

  // Generic domains (api.example.com)
  const parts = hostname.split(".");
  if (parts.length > 2 && parts[0] !== "www") {
    return parts.slice(0, -2).join(".");
  }

  return null;
}

