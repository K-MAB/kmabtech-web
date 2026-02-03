"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/Theme/ThemeProvider";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isProducts = pathname && pathname.startsWith("/products");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Anasayfa" },
    { href: "/services", label: "Hizmetler" },
    { href: "/products", label: "Commitra3D" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <>
      {/* DESKTOP HEADER (SCROLL EDİNCE KÜÇÜLEN ADA) */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
          isProducts ? "py-6 bg-[#050505]/80 border-b border-white/5 backdrop-blur-xl" : isScrolled ? "py-4" : "py-6"
        }`} 
      >
        <div
          className={`
            relative flex items-center justify-between px-6 py-3 transition-all duration-300
            ${
              isProducts
                ? "w-full max-w-7xl mx-auto bg-transparent rounded-none"
                : isScrolled
                  ? "w-[90%] md:w-[60%] bg-[#050616]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] rounded-none"
                  : "w-full max-w-7xl bg-transparent border-transparent rounded-full" 
            }
          `}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
             <div className="">
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
                <img
                  src="/logo.png"
                  alt="Commitra Logo"
                  className="h-20 w-auto relative z-10 transition-transform group-hover:scale-105"
                />
             </div>
             <span className={`font-bold text-xl tracking-tight hidden sm:block ${isScrolled ? "text-white" : "text-white"}`}>
               Commitra
             </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={pathname === item.href}
                isScrolled={isScrolled}
              />
            ))}
          </nav>

          {/* AKSİYON BUTONU */}
          <div className="hidden md:flex items-center gap-4">
             <Link
               href="/contact"
               className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black font-medium text-sm overflow-hidden transition-all hover:bg-gray-200"
             >
               <span className="relative z-10">İletişim</span>
               <ArrowUpRight size={16} className="relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
             </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-[#050616] pt-24 px-6 md:hidden"
          >
             <div className="flex flex-col gap-6">
                {navItems.map((item, i) => (
                   <motion.div
                     key={item.href}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                   >
                     <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`text-3xl font-bold ${
                           pathname === item.href ? "text-blue-400" : "text-white/60"
                        }`}
                     >
                        {item.label}
                     </Link>
                   </motion.div>
                ))}
                
                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3 }}
                   className="mt-8"
                >
                   <Link
                     href="/contact"
                     onClick={() => setMobileOpen(false)}
                     className="block w-full text-center py-4 bg-blue-600 text-white rounded-xl font-bold text-lg"
                   >
                      Bizimle Çalışın
                   </Link>
                </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================
   NAVLINK COMPONENT
============================ */
function NavLink({ href, label, active, isScrolled }: any) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300
        ${active ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"}
      `}
    >
      {active && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-white/10 rounded-full border border-white/5 shadow-inner"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </Link>
  );
}