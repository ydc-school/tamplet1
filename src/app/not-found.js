export const metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center bg-[#f6f8fc] px-6 py-24 overflow-hidden">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#c4a048 1px, transparent 1px), linear-gradient(90deg, #c4a048 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <section className="relative z-10 max-w-lg text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-[#c4a048]" />
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c4a048]">
            Error 404
          </p>
          <span className="w-8 h-[1px] bg-[#c4a048]" />
        </div>

        {/* Heading */}
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#10213a] leading-tight">
          Page not found
        </h1>
        
        {/* Description */}
        <p className="mt-6 text-base leading-8 text-[#3a5a7a] max-w-md mx-auto">
          The requested scholarly content may have moved, been archived, or the link provided is currently unavailable.
        </p>

        {/* Action Button */}
        <div className="mt-10">
          <a href="/" className="inline-block px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] bg-[#10213a] text-white hover:bg-[#c4a048] transition-colors duration-300">
            Return to Homepage
          </a>
        </div>
      </section>
    </main>
  );
}