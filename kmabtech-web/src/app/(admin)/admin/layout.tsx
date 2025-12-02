'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, LogOut, FileText, Briefcase, Package } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (isLoginPage) {
            setIsAuthorized(true);
            return;
        }

        const token = localStorage.getItem('jwtToken');

        if (!token) {
            router.push('/admin/login');
        } else {
            setIsAuthorized(true);
        }
    }, [router, pathname, isLoginPage]);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        router.push('/admin/login');
    };

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
                Yetki Kontrolü Yapılıyor...
            </div>
        );
    }

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex bg-gray-900 text-gray-100">
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col fixed h-full z-10 top-0 left-0">

                <div className="h-16 flex items-center justify-center border-b border-gray-700 shrink-0">
                    <h1 className="text-xl font-bold tracking-wider">
                        KMAB<span className="text-blue-500">ADMIN</span>
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Genel</p>

                    {/* DASHBOARD */}
                    <Link
                        href="/admin/dashboard"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors 
                            ${pathname === '/admin/dashboard'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>

                    <p className="text-xs font-semibold text-gray-500 uppercase mt-6 mb-2">İçerik Yönetimi</p>

                    {/* HİZMETLER */}
                    <Link
                        href="/admin/services"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors 
                            ${pathname === '/admin/services'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <Briefcase size={20} />
                        <span>Hizmetler</span>
                    </Link>

                    {/* KATEGORİLER */}
                    <Link
                        href="/admin/categories"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors 
                            ${pathname.startsWith('/admin/categories')
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <Briefcase size={20} />
                        <span>Kategoriler</span>
                    </Link>

                    {/* ÜRÜNLER */}
                    <Link
                        href="/admin/products"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors 
                            ${pathname.startsWith('/admin/products')
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <Package size={20} />
                        <span>Ürünler</span>
                    </Link>

                    {/* REFERANSLAR */}
                    <Link
                        href="/admin/references"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors 
                            ${pathname.startsWith('/admin/references')
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <Users size={20} />
                        <span>Referanslar</span>
                    </Link>

                    {/* BLOG */}
                    <Link
                        href="/admin/blog"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors 
                            ${pathname.startsWith('/admin/blog')
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <FileText size={20} />
                        <span>Blog Yazıları</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-700 bg-gray-800 shrink-0">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Çıkış Yap</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 ml-64 bg-gray-900 min-h-screen">
                {children}
            </main>
        </div>
    );
}
