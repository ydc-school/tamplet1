const NULLISH_ASSET_VALUES = new Set(["", "null", "undefined"]);

export function resolveAssetSrc(value, fallback = "/logo/logo.png") {
  if (typeof value !== "string") return fallback;

  const trimmed = value.trim();
  if (!trimmed) return fallback;

  const lower = trimmed.toLowerCase();
  if (NULLISH_ASSET_VALUES.has(lower)) return fallback;

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("//")) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  if (trimmed.startsWith("uploads/")) {
    return `/${trimmed}`;
  }

  return `/uploads/${trimmed}`;
}

