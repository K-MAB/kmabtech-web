'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/Theme/ThemeProvider';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

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
        { href: "/products", label: "Ürünler" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "İletişim" },
        { href: "/admin/dashboard", label: "Admin" },
    ];

    return (
        <header
            className={`
                sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-700
                ${isScrolled ? "bg-black/70 shadow-lg border-b border-white/10" : ""}
            `}
            style={{
                background: !isScrolled
                    ? "radial-gradient(circle, rgba(0,0,48,0.65) 0%, rgba(0,0,84,0.65) 66%, rgba(3,41,43,0.65) 100%)"
                    : undefined
            }}
        >
            <div className="container mx-auto max-w-7xl h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* LOGO */}
                <Link href="/" className="text-xl font-mono font-bold text-white">
                    {"<KMABTech />"}
                </Link>

                {/* DESKTOP MENU */}
                <nav className="hidden md:flex space-x-4 text-gray-200">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            active={pathname === item.href}
                        />
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    
                    {/* THEME TOGGLE */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-white hover:bg-white/10 rounded-full transition"
                    >
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU (SLIDE DOWN) */}
            <div
                className={`
                    md:hidden overflow-hidden transition-all duration-500 bg-black/70 
                    ${mobileOpen ? "max-h-96 py-4" : "max-h-0"}
                `}
            >
                <div className="flex flex-col space-y-3 px-6 text-gray-200">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`
                                text-base py-2 px-3 rounded-md transition
                                ${pathname === item.href
                                    ? "bg-white/10 text-blue-300"
                                    : "hover:bg-white/10 hover:text-white"
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

function NavLink({ href, label, active }: any) {
    return (
        <Link
            href={href}
            className={`
                text-sm px-3 py-1 rounded-md transition
                ${active ? "text-blue-300 bg-white/10" : "text-gray-300 hover:text-white"}
            `}
        >
            {label}
        </Link>
    );
}
