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
      style={{ animationDelay: `${Math.min(index * 70, 420)}ms` }}
      onClick={() => onSelect(item)}
    >
      {/* Media Area */}
      <div>
        {hasImage ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            unoptimized
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
        ) : (
          <div>
            <svg width="42" height="42" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <div />
        <span>{formatYear(item?.Year)}</span>
        <span>
          View Details
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>

      {/* Body */}
      <div>
        <span>{safeText(item?.Name)}</span>
        <h3>{title}</h3>
        {item?.Description ? (
          <p>{item.Description}</p>
        ) : (
          <p>Tap to view the complete achievement details.</p>
        )}

        {/* Footer */}
        <div>
          <span>{formatYear(item?.Year)}</span>
          <span>
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
    <div>
      <span>{label}</span>
      <div style={{ fontFamily: variant === "mono" ? "monospace" : "inherit" }}>
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


      <section>
        {/* Hero Section */}
        <div>
          <div>
            <div>
              <div>
                <span />
                <span>Recognition & Milestones</span>
              </div>
              <h1>Achievements</h1>
              <p>
                Browse every published achievement, search by name, title, year, or description,
                and open any card to see the full record in one place.
              </p>
              <div>
                <Link href="/">Home</Link>
                <span>/</span>
                <span>Achievements</span>
              </div>
            </div>

            {/* Search Panel */}
            <div>
              <div>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search achievements..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : null}
              </div>

              {/* Summary Cards */}
              <div>
                <div>
                  <div>Total</div>
                  <div>{loading ? "..." : achievements.length}</div>
                  <div>Published achievements</div>
                </div>
                <div>
                  <div>Showing</div>
                  <div>{loading ? "..." : visibleAchievements.length}</div>
                  <div>Matching your search</div>
                </div>
                <div>
                  <div>Latest Year</div>
                  <div>{loading ? "..." : latestYear}</div>
                  <div>Newest highlighted record</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body/List Section */}
        <div>
          <div>
            <p>
              <strong>{loading ? 0 : visibleAchievements.length}</strong> achievement
              {visibleAchievements.length === 1 ? "" : "s"} found
            </p>
            <span>
              {trimmedSearch ? `Filter: ${trimmedSearch}` : "All achievements"}
            </span>
          </div>

          {/* States: Loading, Error, Empty */}
          {loading && (
            <div>
              <div />
              <h2>Loading achievements...</h2>
              <p>Fetching the latest published achievements. Please wait a moment.</p>
            </div>
          )}

          {!loading && error && (
            <div>
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#c4a048" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86l-8 14A2 2 0 004 21h16a2 2 0 001.71-3.14l-8-14a2 2 0 00-3.42 0z" />
              </svg>
              <h2>Could not load achievements</h2>
              <p>{error}</p>
              <button type="button" onClick={() => { /* ...fetch logic */ }}>
                Retry
              </button>
            </div>
          )}

          {!loading && !error && visibleAchievements.length === 0 && (
            <div>
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#c4a048" strokeWidth="1.4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h-6A2.5 2.5 0 002 8.5v9A2.5 2.5 0 004.5 20h15a2.5 2.5 0 002.5-2.5v-9A2.5 2.5 0 0019.5 6h-6m-3 0V3m0 3h3m-3 0H7.75A1.75 1.75 0 006 7.75V8" />
              </svg>
              <h2>No achievements found</h2>
              <p>Try a different search term, or clear the search box to see the full list.</p>
              <button type="button" onClick={() => setSearchQuery("")}>
                Clear Search
              </button>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && visibleAchievements.length > 0 && (
            <div>
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

        {/* Modal */}
        {selected && (
          <div onClick={() => setSelected(null)}>
            <div role="dialog" aria-modal="true" aria-labelledby="achievement-modal-title" onClick={(e) => e.stopPropagation()}>
              <button type="button" aria-label="Close achievement details" onClick={() => setSelected(null)}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div>
                {/* Modal Media */}
                <div>
                  {selectedImageSrc && !modalImageError ? (
                    <Image
                      src={selectedImageSrc}
                      alt={selectedTitle}
                      fill
                      unoptimized
                      onError={() => setModalImageError(true)}
                      sizes="(max-width: 900px) 100vw, 50vw"
                    />
                  ) : (
                    <div>
                      <svg width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Modal Body */}
                <div>
                  <div>Achievement Detail</div>
                  <h2 id="achievement-modal-title">{selectedTitle}</h2>
                  {selected.Description ? (
                    <p>{selected.Description}</p>
                  ) : (
                    <p>This achievement does not have a long description yet. The full record is shown below.</p>
                  )}

                  <div>
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
