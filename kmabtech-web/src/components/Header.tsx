"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/Theme/ThemeProvider";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Anasayfa" },
    { href: "/services", label: "Hizmetler" },
    { href: "/products", label: "Commitra3D" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "İletişim" },
  ];

  return (
 <header
  className={`
    sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-700
    ${isScrolled ? "shadow-lg border-b border-white/10" : ""}
  `}
  style={{
    background: isScrolled
      ? "radial-gradient(circle, rgba(0,0,48,0.65) 0%, rgba(0,0,84,0.65) 66%, rgba(3,41,43,0.65) 100%)"
      : "#050616",
  }}
>


      <div className="container mx-auto max-w-7xl h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Commitra Logo"
            className="h-15 w-auto"
          />
        </Link>


        {/* DESKTOP MENU */}
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={pathname === item.href}
              theme={theme}
            />
          ))}
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-3">

          {/* THEME TOGGLE BUTTON */}
         
          {/* MOBILE MENU BUTTON */}
          <button
            className={`
              md:hidden p-2 rounded-full transition
              ${theme === "dark" ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-200"}
            `}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-500 
          ${theme === "dark" ? "bg-black/70" : "bg-white/80"}
          ${mobileOpen ? "max-h-96 py-4" : "max-h-0"}
        `}
      >
        <div className="flex flex-col space-y-3 px-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`
                text-base py-2 px-3 rounded-md transition
                ${
                  pathname === item.href
                    ? theme === "dark"
                      ? "bg-white/10 text-blue-300"
                      : "bg-gray-200 text-blue-600"
                    : theme === "dark"
                    ? "text-gray-200 hover:bg-white/10 hover:text-white"
                    : "text-gray-900 hover:bg-gray-200 hover:text-black"
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ============================
   NAVLINK COMPONENT
============================ */
function NavLink({ href, label, active, theme }: any) {
  return (
    <Link
      href={href}
      className={`
        text-sm px-3 py-1 rounded-md transition
        ${
          active
            ? theme === "dark"
              ? "text-blue-300 bg-white/10"
              : "text-blue-600 bg-gray-200"
            : theme === "dark"
            ? "text-gray-300 hover:text-white"
            : "text-gray-800 hover:text-black"
        }
      `}
    >
      {label}
    </Link>
  );
}
