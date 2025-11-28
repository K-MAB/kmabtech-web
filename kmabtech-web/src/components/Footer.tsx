// src/components/Footer.tsx

import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const sections = [
        { 
            title: "Hizmetler", 
            links: [
                { name: "Web Geliştirme", href: "/services#web" },
                { name: "Yapay Zeka", href: "/services#ai" },
                { name: "Siber Güvenlik", href: "/services#security" }
            ] 
        },
        { 
            title: "Kurumsal", 
            links: [
                { name: "Projelerimiz", href: "/products" },
                { name: "Blog", href: "/blog" },
                { name: "İletişim", href: "/contact" }
            ] 
        },
    ];

    return (
        <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-10 pb-6">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    
                    {/* Sol Kısım: Logo ve Sosyal Medya */}
                    <div className="col-span-2">
                        <Link href="/" className="text-2xl font-mono font-bold text-gray-900 dark:text-gray-100">
                            {'<KMABTech/>'}
                        </Link>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                            Kurumsal, hızlı ve güvenilir yazılım çözümleriniz.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" aria-label="GitHub" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><Github size={20} /></a>
                            <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><Linkedin size={20} /></a>
                            <a href="#" aria-label="Email" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><Mail size={20} /></a>
                        </div>
                    </div>

                    {/* Navigasyon Alanları */}
                    {sections.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase">{section.title}</h3>
                            <ul className="space-y-3 text-sm">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Alt Kısım (Copyright) */}
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        &copy; {currentYear} KMABTech. Tüm hakları saklıdır.
                    </p>
                </div>
            </div>
        </footer>
    );
}