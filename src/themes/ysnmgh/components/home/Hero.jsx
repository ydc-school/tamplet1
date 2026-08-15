import React from 'react';

export default function HeroSection({
  title = "Elevate Your Digital Experience",
  subtitle = "Discover unparalleled clarity and structural elegance designed for high-velocity workflows.",
  primaryButtonText = "Get Started",
  secondaryButtonText = "Learn More",
  onPrimaryClick,
  onSecondaryClick,
  features = [
    {
      icon: "speed",
      title: "High Velocity",
      description: "Streamlined workflows that get out of your way, allowing content to take center stage."
    },
    {
      icon: "design_services",
      title: "Minimalist Aesthetics",
      description: "A fixed grid layout with expansive whitespace and deep charcoal accents for calm authority."
    },
    {
      title: "Structural Elegance",
      description: "Hierarchy achieved through ambient shadows and tonal layering, creating a tactile and responsive environment.",
      bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYe57rzlF6jtAoD8qU2qoFdBOWL5564vl0V96lMZifqUdd6JmP6e6h7e_1aAYERWhYltJYdL7q63KnhjYbDh3NHDp44zyDAdUjHngGzzn9ReawIIbsW_eKkTdaqiT9SCdsBic22CjBnA3479Nqv8lxOUHZiKtpcIVkMhEGUp6urRN-6tULEjMR7N01skyua9VAyj4yo1SiWZxmYoi0I7OE5l_GO6moZsAQMNh-FAGZwcuZmg2_E-eeuw",
      bgAlt: "A serene, abstract digital landscape featuring soft, sweeping curves in varying shades of light gray and subtle blues, embodying a minimalist and calming aesthetic suitable for a high-end UI design background. The lighting is diffused and ambient, enhancing the floating effect of the structural elements."
    }
  ]
}) {
  return (
    <main className="pt-[140px] pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-4 md:grid-cols-12 gap-gutter">
      {/* Hero Section */}
      <section className="col-span-4 md:col-span-12 min-h-[60vh] flex flex-col justify-center items-center text-center space-y-stack-md">
        <h1 className="font-display-lg text-display-lg text-primary max-w-4xl">
          {title}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          {subtitle}
        </p>
        <div className="flex gap-4 mt-stack-md">
          <button
            onClick={onPrimaryClick}
            className="px-6 py-3 rounded-full bg-[#121212] text-on-primary font-label-md text-label-md hover:opacity-80 transition-opacity"
          >
            {primaryButtonText}
          </button>
          <button
            onClick={onSecondaryClick}
            className="px-6 py-3 rounded-full bg-surface border border-outline-variant text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors"
          >
            {secondaryButtonText}
          </button>
        </div>
      </section>

      {/* Bento Grid Feature Section */}
      <section className="col-span-4 md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-stack-lg">
        {/* Feature Card 1 */}
        {features[0] && (
          <div className="bg-surface rounded-[24px] p-8 transition-shadow duration-300 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" data-icon={features[0].icon}>
                {features[0].icon}
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary">
              {features[0].title}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {features[0].description}
            </p>
          </div>
        )}

        {/* Feature Card 2 */}
        {features[1] && (
          <div className="bg-surface rounded-[24px] p-8 transition-shadow duration-300 flex flex-col gap-4 md:col-span-2 relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-4 max-w-md">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" data-icon={features[1].icon}>
                  {features[1].icon}
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">
                {features[1].title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {features[1].description}
              </p>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-surface-container-low to-transparent pointer-events-none opacity-50"></div>
          </div>
        )}

        {/* Feature Card 3 */}
        {features[2] && (
          <div className="bg-surface rounded-[24px] p-8 transition-shadow duration-300 flex flex-col gap-4 md:col-span-3 min-h-[300px] relative group">
            <div className="absolute inset-0 rounded-[24px] overflow-hidden">
              <img
                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                data-alt={features[2].bgAlt}
                src={features[2].bgImage}
                alt=""
              />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center justify-center h-full gap-4 max-w-2xl mx-auto">
              <h3 className="font-headline-lg text-headline-lg text-primary">
                {features[2].title}
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                {features[2].description}
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}