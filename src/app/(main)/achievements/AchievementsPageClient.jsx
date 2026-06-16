"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { resolveAssetSrc } from "@/utils/media";

// ... (Helper functions: safeText, formatYear, etc., same rahegi)

function AchievementCard({ item, onSelect, index }) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = resolveAssetSrc(item?.Image, "");
  const hasImage = Boolean(imageSrc) && !imageError;
  const title = item?.Title || item?.Name || "Untitled Achievement";

  return (
    <article className="ap-card" style={{ animationDelay: `${Math.min(index * 70, 420)}ms` }}>
      <figure className="ap-card-media">
        {hasImage ? (
          <Image src={imageSrc} alt={title} fill unoptimized onError={() => setImageError(true)} className="ap-card-image" />
        ) : (
          <div className="ap-card-placeholder">Icon</div>
        )}
        <figcaption className="ap-year-chip">{formatYear(item?.Year)}</figcaption>
      </figure>

      <div className="ap-card-body">
        <h3>{title}</h3>
        <p>{item?.Description || "Tap to view details."}</p>
        <button onClick={() => onSelect(item)}>View Details</button>
      </div>
    </article>
  );
}

export default function AchievementsPageClient({ initialAchievements = [], initialLoaded = false }) {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [loading, setLoading] = useState(!initialLoaded);
  const [selected, setSelected] = useState(null);

  // ... (Fetch logic and search logic same rahegi)

  return (
    <main className="ap-root">
      <header className="ap-hero">
        <h1>Achievements</h1>
        <p>Browse our recognition and milestones.</p>
      </header>

      <section aria-label="Achievement List">
        <div className="ap-grid">
          {achievements.map((item, index) => (
            <AchievementCard key={item.Id} item={item} index={index} onSelect={setSelected} />
          ))}
        </div>
      </section>

      {selected && (
        <dialog open className="ap-modal-overlay" onClick={() => setSelected(null)}>
          <article className="ap-modal" onClick={(e) => e.stopPropagation()}>
            <header>
              <h2>{selected.Title}</h2>
              <button onClick={() => setSelected(null)}>Close</button>
            </header>
            
            <dl className="ap-detail-grid">
              <dt>Year</dt>
              <dd>{formatYear(selected.Year)}</dd>
              <dt>ID</dt>
              <dd>{selected.Id}</dd>
            </dl>
          </article>
        </dialog>
      )}
    </main>
  );
}