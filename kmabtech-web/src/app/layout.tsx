// src/app/layout.tsx

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { Header } from "@/components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import "highlight.js/styles/atom-one-dark.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "KMABTech | Yapay Zeka & 3D Baskı Figür Teknolojileri",
    template: "%s | KMABTech",
  },
  description:
    "KMABTech ve KMAB3D ile yapay zeka destekli 3D baskı figür üretimi, özel tasarım modeller ve kurumsal yazılım çözümleri.",
  keywords: [
    "kmabtech",
    "kmab3d",
    "3d baskı figür",
    "yapay zeka 3d baskı",
    "özel tasarım 3d figür",
    "3d yazıcı figür",
    "kişiye özel 3d baskı",
    "kurumsal yazılım",
    "sızma testi",
    "siber güvenlik uygulamaları",
    "next.js",
    "asp.net core",
  ],
  authors: [{ name: "KMABTech" }],
  creator: "KMABTech",
  publisher: "KMABTech",
  metadataBase: new URL("https://www.kmabtech.com"),

  openGraph: {
    title: "KMABTech | Yapay Zeka & 3D Baskı Figür",
    description:
      "Yapay zeka destekli 3D baskı figürler, özel üretim modeller ve ileri teknoloji çözümleri.",
    url: "https://www.kmabtech.com",
    siteName: "KMABTech",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // 1200x630 önerilir
        width: 1200,
        height: 630,
        alt: "KMABTech Yapay Zeka ve 3D Baskı Figür",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "KMABTech | Yapay Zeka & 3D Baskı Figür",
    description:
      "KMABTech & KMAB3D ile yapay zeka destekli 3D baskı figür çözümleri.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" className={inter.className} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
