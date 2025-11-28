// src/app/layout.tsx

import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import { Header } from '@/components/Header';      // ⭐ NAVBAR BURADA EKLENDİ
import { Inter } from 'next/font/google';
import type { Metadata } from "next";

import './globals.css';
import "highlight.js/styles/atom-one-dark.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: "KMABTech - Kurumsal Yazılım Çözümleri",
    description: "ASP.NET Core ve Next.js gücüyle kurumsal web ve API geliştirme.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="tr" className={inter.className} suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    
                    {/* ⭐⭐ NAVBAR BURADA ÇALIŞIR ⭐⭐ */}
                    <Header />

                    {/* Sayfa içerikleri */}
                    {children}

                </ThemeProvider>
            </body>
        </html>
    );
}
