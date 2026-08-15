import React from 'react';

export default function Navbar({
  logoSrc = "https://lh3.googleusercontent.com/aida-public/AB6AXuAvFmsxcKW2BEQt2CWVR5p10s_Li3NjAsRb6N8M19NaEzL5EHuBA57JGztBzxBBzK7Uj45eIeN7Q238LUZpNRIcyxswyNVwChIVsMMW47KJyw8TO6F7-aEoS6QsdT8msQfDYYkDWZ5k7K4po5L0EjppUyDltn_F5RHYJX0wt441LdThS-1ZwR_DZhLrTvMJ7KTF2EhXoZxamuAlY_KNMC565btWTp13miz32_55bwNhN-DpUvUDAynDeduba95jH5rFlaE",
  logoAlt = "LUXE Logo",
  links = [
    { label: "Home", href: "#", isActive: true },
    { label: "Products", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" }
  ],
  onMenuClick
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-unit py-2 md:px-stack-sm md:py-stack-sm w-[calc(100%-48px)] max-w-container-max mx-auto mt-stack-md rounded-full bg-surface/80 dark:bg-surface-container/80 backdrop-blur-md">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#121212] overflow-hidden shrink-0">
        <img alt={logoAlt} className="w-6 h-6 object-contain" src={logoSrc} />
      </div>

      <ul className="hidden md:flex items-center gap-gutter font-body-md text-body-md tracking-tight">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className={
                link.isActive
                  ? "text-primary dark:text-inverse-primary font-semibold border-b-2 border-primary pb-1 active:scale-95 transition-transform"
                  : "text-on-surface-variant dark:text-on-secondary-container hover:text-primary transition-colors hover:opacity-80 transition-all duration-300 active:scale-95"
              }
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        aria-label="Menu"
        onClick={onMenuClick}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F1F3F5] hover:opacity-80 transition-all duration-300 active:scale-95 text-on-surface shrink-0"
      >
        <span className="material-symbols-outlined" data-icon="menu">menu</span>
      </button>
    </nav>
  );
}