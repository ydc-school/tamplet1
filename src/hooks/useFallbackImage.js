"use client";

import { useEffect, useState } from "react";
import { resolveAssetSrc } from "@/utils/media";

export function useFallbackImage(source, fallback = "/logo/logo.png") {
  const resolvedSource = resolveAssetSrc(source, fallback);
  const [src, setSrc] = useState(resolvedSource);

  useEffect(() => {
    setSrc(resolvedSource);
  }, [resolvedSource]);

  const handleError = () => {
    setSrc((current) => (current === fallback ? current : fallback));
  };

  return { src, handleError, fallback };
}

