"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { resolveAssetSrc } from "@/utils/media";

function safeText(value) {
  if (value === null || value === undefined || value === "") return "N/A";
  return String(value);
}

function formatYear(value) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return safeText(value);
  return String(date.getFullYear());
}

function formatDateTime(value) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return safeText(value);

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function toTimestamp(value) {
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function getLatestYear(list = []) {
  const latest = list.reduce(
    (acc, item) => {
      const timestamp = toTimestamp(item?.Year);
      if (timestamp > acc.timestamp) {
        return {
          timestamp,
          label: formatYear(item?.Year),
        };
      }
      return acc;
    },
    { timestamp: 0, label: "N/A" }
  );

  return latest.label;
}

function normalizeIndex(value) {
  const index = Number(value);
  return Number.isFinite(index) && index > 0 ? index : Number.POSITIVE_INFINITY;
}

function sortAchievements(list = []) {
  return [...list].sort((a, b) => {
    const indexA = normalizeIndex(a?.Index_No);
    const indexB = normalizeIndex(b?.Index_No);
    if (indexA !== indexB) return indexA - indexB;

    const yearA = toTimestamp(a?.Year);
    const yearB = toTimestamp(b?.Year);
    if (yearA !== yearB) return yearB - yearA;

    return (b?.Id || 0) - (a?.Id || 0);
  });
}

function matchesSearch(item, query) {
  if (!query) return true;
  const searchBlob = [
    item?.Name,
    item?.Title,
    item?.Description,
    item?.Image,
    item?.Year && formatYear(item.Year),
    item?.Index_No,
    item?.Id,
  ]
    .map((value) => safeText(value).toLowerCase())
    .join(" ");

  return searchBlob.includes(query);
}

function AchievementCard({ item, onSelect, index }) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = resolveAssetSrc(item?.Image, "");
  const hasImage = Boolean(imageSrc) && !imageError;
  const title = item?.Title || item?.Name || "Untitled Achievement";

  return (
    <button
      type="button"
      className="ap-card"
      style={{ animationDelay: `${Math.min(index * 70, 420)}ms` }}
      onClick={() => onSelect(item)}
    >
      <div className="ap-card-media">
        {hasImage ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            unoptimized
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className="ap-card-image"
          />
        ) : (
          <div className="ap-card-placeholder">
            <svg width="42" height="42" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <div className="ap-card-overlay" />
        <span className="ap-year-chip">{formatYear(item?.Year)}</span>
        <span className="ap-open-chip">
          View Details
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>

      <div className="ap-card-body">
        <span className="ap-card-label">{safeText(item?.Name)}</span>
        <h3 className="ap-card-title">{title}</h3>
        {item?.Description ? (
          <p className="ap-card-desc">{item.Description}</p>
        ) : (
          <p className="ap-card-desc ap-card-desc-muted">Tap to view the complete achievement details.</p>
        )}

        <div className="ap-card-footer">
          <span className="ap-footer-pill">{formatYear(item?.Year)}</span>
          <span className="ap-footer-link">
            Open
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}

function DetailRow({ label, value, variant = "text" }) {
  return (
    <div className="ap-detail-item">
      <span className="ap-detail-label">{label}</span>
      <div className={`ap-detail-value ${variant === "mono" ? "mono" : ""}`}>
        {value}
      </div>
    </div>
  );
}

export default function AchievementsPageClient({
  initialAchievements = [],
  initialLoaded = false,
}) {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [loading, setLoading] = useState(!initialLoaded);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [modalImageError, setModalImageError] = useState(false);

  useEffect(() => {
    if (initialLoaded) return;

    const loadAchievements = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("/api/client/achievements");
        if (response.data.status === "success") {
          const payload = response.data.data;
          const list = Array.isArray(payload) ? payload : payload?.data || [];
          setAchievements(list);
        } else {
          setError(response.data.message || "Failed to load achievements.");
        }
      } catch (err) {
        setError("Unable to load achievements right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, [initialLoaded]);

  useEffect(() => {
    if (!selected) {
      document.body.style.overflow = "";
      return;
    }

    setModalImageError(false);
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  const sortedAchievements = sortAchievements(achievements);
  const trimmedSearch = searchQuery.trim();
  const query = trimmedSearch.toLowerCase();
  const visibleAchievements = sortedAchievements.filter((item) =>
    matchesSearch(item, query)
  );

  const latestYear = getLatestYear(achievements);

  const detailRows = selected
    ? [
        { label: "Achievement ID", value: safeText(selected.Id) },
        { label: "Branch ID", value: safeText(selected.Branch_Id) },
        { label: "Name", value: safeText(selected.Name) },
        { label: "Title", value: safeText(selected.Title) },
        { label: "Year", value: formatYear(selected.Year) },
        { label: "Index No", value: safeText(selected.Index_No) },
        {
          label: "Status",
          value: (
            <span className={`ap-status ${selected.Is_Active === "active" ? "active" : "inactive"}`}>
              {safeText(selected.Is_Active)}
            </span>
          ),
        },
        { label: "Image File", value: safeText(selected.Image), variant: "mono" },
        { label: "Created At", value: formatDateTime(selected.createdAt) },
        { label: "Updated At", value: formatDateTime(selected.updatedAt) },
      ]
    : [];

  const selectedImageSrc = selected ? resolveAssetSrc(selected.Image, "") : "";
  const selectedTitle = selected?.Title || selected?.Name || "Achievement";

  return (
    <>
      <style>{`
        .ap-root {
          min-height: 100vh;
          background: #f6f8fc;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .ap-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(196,160,72,0.06) 0%, transparent 68%);
          pointer-events: none;
        }
        .ap-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.02) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .ap-hero {
          width: 100%;
          padding: 110px 24px 54px;
          position: relative;
          z-index: 1;
          border-bottom: 1px solid rgba(196,160,72,0.12);
          background: linear-gradient(160deg, #f3f7fc 0%, #f6f8fc 100%);
        }
        .ap-hero::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c4a048, #e0c060, #c4a048, transparent);
        }
        .ap-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 0.9fr;
          gap: 28px;
          align-items: end;
        }
        @media (max-width: 900px) {
          .ap-hero-inner { grid-template-columns: 1fr; }
        }
        .ap-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .ap-ey-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c4a048;
        }
        .ap-ey-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #c4a048;
        }
        .ap-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 4vw, 50px);
          font-weight: 800;
          color: #10213a;
          line-height: 1.1;
          margin: 0 0 12px;
        }
        .ap-subtitle {
          font-size: 15px;
          color: #3a5a7a;
          line-height: 1.8;
          max-width: 58ch;
          margin: 0 0 18px;
        }
        .ap-breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          font-size: 12px;
          color: #5f7288;
        }
        .ap-breadcrumb a {
          color: #c4a048;
          text-decoration: none;
          font-weight: 600;
        }
        .ap-breadcrumb a:hover { text-decoration: underline; }

        .ap-panel {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(196,160,72,0.14);
          border-radius: 4px;
          padding: 18px;
          box-shadow: 0 18px 48px rgba(16,33,58,0.08);
          backdrop-filter: blur(10px);
        }
        .ap-search-wrap {
          position: relative;
        }
        .ap-search-wrap svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #5f7288;
        }
        .ap-search {
          width: 100%;
          border: 1px solid rgba(196,160,72,0.18);
          background: #fff;
          color: #10213a;
          font-family: inherit;
          font-size: 14px;
          padding: 13px 44px 13px 42px;
          outline: none;
          border-radius: 2px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ap-search::placeholder { color: #6b7f94; }
        .ap-search:focus {
          border-color: rgba(196,160,72,0.45);
          box-shadow: 0 0 0 3px rgba(196,160,72,0.12);
        }
        .ap-clear {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: rgba(196,160,72,0.08);
          color: #c4a048;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .ap-clear:hover { background: rgba(196,160,72,0.15); }

        .ap-summary {
          margin-top: 16px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 560px) {
          .ap-summary { grid-template-columns: 1fr; }
        }
        .ap-summary-card {
          border: 1px solid rgba(196,160,72,0.12);
          background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          border-radius: 4px;
          padding: 14px 16px;
        }
        .ap-summary-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c4a048;
          margin-bottom: 8px;
        }
        .ap-summary-value {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 800;
          color: #10213a;
          line-height: 1;
        }
        .ap-summary-note {
          margin-top: 6px;
          font-size: 12px;
          color: #5f7288;
        }

        .ap-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 86px;
          position: relative;
          z-index: 1;
        }
        .ap-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }
        .ap-toolbar-copy {
          font-size: 13px;
          color: #5f7288;
        }
        .ap-toolbar-copy strong {
          color: #10213a;
          font-weight: 700;
        }
        .ap-toolbar-chip {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #c4a048;
          background: rgba(196,160,72,0.08);
          border: 1px solid rgba(196,160,72,0.16);
          padding: 7px 10px;
          border-radius: 2px;
        }

        .ap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .ap-card {
          border: 1px solid rgba(196,160,72,0.12);
          border-radius: 4px;
          overflow: hidden;
          background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          box-shadow: 0 8px 28px rgba(0,0,0,0.18);
          text-align: left;
          padding: 0;
          cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          animation: ap-fade-in 0.55s ease both;
        }
        .ap-card:hover {
          transform: translateY(-5px);
          border-color: rgba(196,160,72,0.28);
          box-shadow: 0 22px 54px rgba(16,33,58,0.18);
        }
        .ap-card:focus-visible {
          outline: 3px solid rgba(196,160,72,0.28);
          outline-offset: 2px;
        }
        @keyframes ap-fade-in {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ap-card-media {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #f6f8fc;
        }
        .ap-card-image {
          object-fit: contain;
          transition: transform 0.4s ease;
        }
        .ap-card:hover .ap-card-image {
          transform: scale(1.04);
        }
        .ap-card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(196,160,72,0.16);
        }
        .ap-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(7,16,32,0) 0%, rgba(7,16,32,0.1) 100%);
          pointer-events: none;
        }
        .ap-year-chip {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          background: #c4a048;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          padding: 5px 10px;
          border-radius: 2px;
        }
        .ap-open-chip {
          position: absolute;
          right: 12px;
          bottom: 12px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16,33,58,0.9);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 8px 10px;
          border-radius: 2px;
        }

        .ap-card-body {
          padding: 18px 20px 20px;
        }
        .ap-card-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c4a048;
          margin-bottom: 10px;
        }
        .ap-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #10213a;
          line-height: 1.35;
          margin: 0 0 10px;
        }
        .ap-card-desc {
          font-size: 13px;
          color: #3a5a7a;
          line-height: 1.7;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 66px;
        }
        .ap-card-desc-muted {
          color: #6b7f94;
        }
        .ap-card-footer {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid rgba(196,160,72,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .ap-footer-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: #10213a;
          background: rgba(196,160,72,0.08);
          border: 1px solid rgba(196,160,72,0.14);
          padding: 6px 10px;
          border-radius: 999px;
        }
        .ap-footer-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c4a048;
        }

        .ap-empty,
        .ap-state {
          min-height: 40vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          padding: 48px 20px;
          border: 1px dashed rgba(196,160,72,0.18);
          border-radius: 6px;
          background: rgba(255,255,255,0.65);
        }
        .ap-state-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: #10213a;
          margin: 16px 0 8px;
        }
        .ap-state-text {
          font-size: 14px;
          line-height: 1.8;
          color: #5f7288;
          max-width: 54ch;
        }
        .ap-state-action {
          margin-top: 18px;
          border: none;
          background: #c4a048;
          color: #f6f8fc;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 12px 18px;
          border-radius: 2px;
          cursor: pointer;
          font-family: inherit;
        }
        .ap-state-action:hover { background: #e0c060; }

        .ap-spinner {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(196,160,72,0.12);
          border-top-color: #c4a048;
          animation: ap-spin 0.8s linear infinite;
        }
        @keyframes ap-spin { to { transform: rotate(360deg); } }

        .ap-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(7,16,32,0.82);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .ap-modal {
          width: 100%;
          max-width: 1040px;
          max-height: 92vh;
          overflow: hidden;
          background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          border: 1px solid rgba(196,160,72,0.2);
          border-top: 3px solid #c4a048;
          border-radius: 4px;
          box-shadow: 0 28px 80px rgba(0,0,0,0.52);
          position: relative;
        }
        .ap-modal-close {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 5;
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 3px;
          background: rgba(7,16,32,0.78);
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .ap-modal-close:hover {
          background: rgba(196,160,72,0.2);
          color: #c4a048;
        }
        .ap-modal-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          min-height: 0;
          max-height: 92vh;
        }
        @media (max-width: 900px) {
          .ap-modal-grid { grid-template-columns: 1fr; }
        }
        .ap-modal-media {
          position: relative;
          background: #f6f8fc;
          min-height: 320px;
          border-right: 1px solid rgba(196,160,72,0.1);
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .ap-modal-media {
            border-right: none;
            border-bottom: 1px solid rgba(196,160,72,0.1);
          }
        }
        .ap-modal-image {
          object-fit: contain;
        }
        .ap-modal-placeholder {
          width: 100%;
          height: 100%;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(196,160,72,0.2);
          padding: 20px;
        }
        .ap-modal-content {
          padding: 28px 30px 30px;
          overflow-y: auto;
        }
        @media (max-width: 560px) {
          .ap-modal-content { padding: 24px 20px 24px; }
        }
        .ap-modal-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #c4a048;
          margin-bottom: 10px;
        }
        .ap-modal-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 800;
          color: #10213a;
          line-height: 1.28;
          margin: 0 0 12px;
        }
        .ap-modal-desc {
          font-size: 15px;
          line-height: 1.85;
          color: #5f7288;
          margin: 0 0 22px;
          white-space: pre-line;
        }
        .ap-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        @media (max-width: 640px) {
          .ap-detail-grid { grid-template-columns: 1fr; }
        }
        .ap-detail-item {
          border: 1px solid rgba(196,160,72,0.12);
          background: rgba(255,255,255,0.75);
          border-radius: 4px;
          padding: 14px 14px 13px;
        }
        .ap-detail-label {
          display: block;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c4a048;
          margin-bottom: 8px;
        }
        .ap-detail-value {
          font-size: 14px;
          line-height: 1.75;
          color: #10213a;
          word-break: break-word;
        }
        .ap-detail-value.mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 13px;
        }
        .ap-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 10px;
          border-radius: 999px;
        }
        .ap-status.active {
          background: rgba(45, 180, 94, 0.12);
          color: #1f8a45;
        }
        .ap-status.inactive {
          background: rgba(107, 127, 148, 0.12);
          color: #5f7288;
        }
      `}</style>

      <section className="ap-root">
        <div className="ap-hero">
          <div className="ap-hero-inner">
            <div>
              <div className="ap-eyebrow">
                <span className="ap-ey-dot" />
                <span className="ap-ey-text">Recognition & Milestones</span>
              </div>
              <h1 className="ap-title">Achievements</h1>
              <p className="ap-subtitle">
                Browse every published achievement, search by name, title, year, or description,
                and open any card to see the full record in one place.
              </p>
              <div className="ap-breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <span>Achievements</span>
              </div>
            </div>

            <div className="ap-panel">
              <div className="ap-search-wrap">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  className="ap-search"
                  type="text"
                  placeholder="Search achievements..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                {searchQuery ? (
                  <button
                    type="button"
                    className="ap-clear"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : null}
              </div>

              <div className="ap-summary">
                <div className="ap-summary-card">
                  <div className="ap-summary-label">Total</div>
                  <div className="ap-summary-value">
                    {loading ? "..." : achievements.length}
                  </div>
                  <div className="ap-summary-note">Published achievements</div>
                </div>
                <div className="ap-summary-card">
                  <div className="ap-summary-label">Showing</div>
                  <div className="ap-summary-value">
                    {loading ? "..." : visibleAchievements.length}
                  </div>
                  <div className="ap-summary-note">Matching your search</div>
                </div>
                <div className="ap-summary-card">
                  <div className="ap-summary-label">Latest Year</div>
                  <div className="ap-summary-value">{loading ? "..." : latestYear}</div>
                  <div className="ap-summary-note">Newest highlighted record</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ap-body">
          <div className="ap-toolbar">
            <p className="ap-toolbar-copy">
              <strong>{loading ? 0 : visibleAchievements.length}</strong> achievement
              {visibleAchievements.length === 1 ? "" : "s"} found
            </p>
            <span className="ap-toolbar-chip">
              {trimmedSearch ? `Filter: ${trimmedSearch}` : "All achievements"}
            </span>
          </div>

          {loading && (
            <div className="ap-state">
              <div className="ap-spinner" />
              <h2 className="ap-state-title">Loading achievements...</h2>
              <p className="ap-state-text">Fetching the latest published achievements. Please wait a moment.</p>
            </div>
          )}

          {!loading && error && (
            <div className="ap-state">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#c4a048" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86l-8 14A2 2 0 004 21h16a2 2 0 001.71-3.14l-8-14a2 2 0 00-3.42 0z" />
              </svg>
              <h2 className="ap-state-title">Could not load achievements</h2>
              <p className="ap-state-text">{error}</p>
              <button
                type="button"
                className="ap-state-action"
                onClick={() => {
                  setLoading(true);
                  setError(null);
                  axios
                    .get("/api/client/achievements")
                    .then((response) => {
                      if (response.data.status === "success") {
                        const payload = response.data.data;
                        const list = Array.isArray(payload) ? payload : payload?.data || [];
                        setAchievements(list);
                      } else {
                        setError(response.data.message || "Failed to load achievements.");
                      }
                    })
                    .catch(() => setError("Unable to load achievements right now. Please try again."))
                    .finally(() => setLoading(false));
                }}
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && visibleAchievements.length === 0 && (
            <div className="ap-empty">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#c4a048" strokeWidth="1.4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h-6A2.5 2.5 0 002 8.5v9A2.5 2.5 0 004.5 20h15a2.5 2.5 0 002.5-2.5v-9A2.5 2.5 0 0019.5 6h-6m-3 0V3m0 3h3m-3 0H7.75A1.75 1.75 0 006 7.75V8" />
              </svg>
              <h2 className="ap-state-title">No achievements found</h2>
              <p className="ap-state-text">
                Try a different search term, or clear the search box to see the full list.
              </p>
              <button
                type="button"
                className="ap-state-action"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </button>
            </div>
          )}

          {!loading && !error && visibleAchievements.length > 0 && (
            <div className="ap-grid">
              {visibleAchievements.map((item, index) => (
                <AchievementCard
                  key={item.Id}
                  item={item}
                  index={index}
                  onSelect={(achievement) => setSelected(achievement)}
                />
              ))}
            </div>
          )}
        </div>

        {selected && (
          <div className="ap-modal-overlay" onClick={() => setSelected(null)}>
            <div
              className="ap-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="achievement-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="ap-modal-close"
                aria-label="Close achievement details"
                onClick={() => setSelected(null)}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="ap-modal-grid">
                <div className="ap-modal-media">
                  {selectedImageSrc && !modalImageError ? (
                    <Image
                      src={selectedImageSrc}
                      alt={selectedTitle}
                      fill
                      unoptimized
                      onError={() => setModalImageError(true)}
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className="ap-modal-image"
                    />
                  ) : (
                    <div className="ap-modal-placeholder">
                      <svg width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="ap-modal-content">
                  <div className="ap-modal-eyebrow">Achievement Detail</div>
                  <h2 className="ap-modal-title" id="achievement-modal-title">
                    {selectedTitle}
                  </h2>
                  {selected.Description ? (
                    <p className="ap-modal-desc">{selected.Description}</p>
                  ) : (
                    <p className="ap-modal-desc">
                      This achievement does not have a long description yet. The full record is shown below.
                    </p>
                  )}

                  <div className="ap-detail-grid">
                    {detailRows.map((row) => (
                      <DetailRow
                        key={row.label}
                        label={row.label}
                        value={row.value}
                        variant={row.variant}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
