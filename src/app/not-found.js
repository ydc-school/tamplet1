export const metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
  /* UI PROMPT — 404 PAGE: Centered layout min-h 60vh, bg #f6f8fc.
     Eyebrow "404" (gold uppercase 10px) + H1 "Page not found" (Playfair 4xl, navy #10213a).
     Description paragraph (#3a5a7a). Calm helpful tone matching site design system.
     Full prompt: UI_PROMPTS.md → Section 27 */
    <main className="flex min-h-[60vh] items-center justify-center bg-[#f6f8fc] px-6 py-20">
      <section className="max-w-xl text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c4a048]">
          404
        </p>
        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-bold text-[#10213a]">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#3a5a7a]">
          The page may have moved, been removed, or the link may be incorrect.
        </p>
      </section>
    </main>
  );
}
