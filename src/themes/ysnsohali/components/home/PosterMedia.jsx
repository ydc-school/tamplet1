"use client";

import Image from "next/image";

const VIDEO_SOURCE_PATTERN = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;

export const resolvePosterAssetSrc = (value) => {
  if (!value) return "";

  const src = String(value).trim();

  if (!src) return "";
  if (/^https?:\/\//i.test(src) || src.startsWith("/")) return src;
  if (src.startsWith("uploads/")) return `/${src}`;

  return `/uploads/${src}`;
};

export const isPosterVideo = (value) => VIDEO_SOURCE_PATTERN.test(String(value || "").trim());

export const hasPosterMedia = (slide) => Boolean(slide?.Image && String(slide.Image).trim() !== "");

export default function PosterMedia({
  slide,
  alt = "Poster",
  className = "",
  priority = false,
}) {
  const imageValue = slide?.Image ? String(slide.Image).trim() : "";
  const imageSrc = imageValue ? resolvePosterAssetSrc(imageValue) : "";

  if (!imageSrc) {
    return null;
  }

  if (isPosterVideo(imageValue)) {
    return (
      <video
        className={`absolute inset-0 h-full w-full ${className}`.trim()}
        src={imageSrc}
        autoPlay
        muted
        playsInline
        loop
        controls={false}
        preload="metadata"
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes="100vw"
      className={className}
      priority={priority}
    />
  );
}
