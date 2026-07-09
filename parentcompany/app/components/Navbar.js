"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Ecosystem", href: "/ecosystem" },
  { name: "Services", href: "/services" },
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href) => pathname === href;

  return (
    <nav
      className={`fixed left-1/2 top-4 z-[200] w-[min(96vw,1380px)] -translate-x-1/2 px-3 sm:px-4 transition-all duration-500 ease-out ${loaded ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
    >
      <div className={`relative rounded-full border px-6 py-3 backdrop-blur-2xl transition-all duration-500 ease-out sm:px-8 ${scrolled ? "border-black/5 bg-white/95 shadow-[0_20px_40px_rgba(0,0,0,0.08)] py-3" : "border-white/40 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"}`}>
        <div className="mx-auto flex items-center justify-between gap-6">

          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 group min-w-max">
            <div className={`relative h-10 w-10 md:h-12 md:w-12 transition-transform duration-500 group-hover:scale-105 ${scrolled ? "scale-95" : "scale-100"}`}>
              <Image
                src="/logo.png"
                alt="RiseMates Logo"
                fill
                className="object-contain drop-shadow-sm"
                priority
                unoptimized
              />
            </div>
            <span className={`text-lg md:text-xl font-black tracking-tighter transition-colors duration-300 ${scrolled ? "text-black" : "text-black"}`}>
              RiseMates<span className="font-light text-gray-400">Ventures</span>
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative whitespace-nowrap text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${isActive(link.href) ? "text-black" : "text-gray-500 hover:text-black"}`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gold transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            ))}
          </div>

          {/* Right: CTA & Mobile Toggle */}
          <div className="flex min-w-max items-center justify-end gap-4">
            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-gold hover:text-black hover:shadow-xl hover:shadow-gold/30"
            >
              Book Consultation
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:bg-gold hover:text-black lg:hidden shadow-lg"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out absolute top-full left-0 w-full mt-4 ${mobileOpen ? "max-h-[500px] opacity-100 translate-y-0" : "pointer-events-none max-h-0 opacity-0 -translate-y-4"}`}
        >
          <div className="rounded-[32px] border border-gray-100 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-[0.2em] transition-colors duration-300 ${isActive(link.href) ? "bg-gray-50 text-gold" : "text-gray-600 hover:bg-gray-50 hover:text-black"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-gold hover:text-black shadow-lg"
              >
                Book Consultation
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
