"use client";

import { useApi } from "@/lib/useApi";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// API BASE URL
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// API MODEL
interface BlogPostDetail {
  id: number;
  titleTr: string;
  titleEn?: string;
  contentTr: string;
  contentEn?: string;
  imageUrl?: string;
  createdAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const { id } = params;

  // API İsteği
  const { data: post, loading } = useApi<BlogPostDetail>(
    id ? `/BlogPosts/${id}` : null
  );

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Okuma süresi hesaplama
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading || !post) {
    return (
      <div className="min-h-screen bg-[#00002b] flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="animate-pulse text-cyan-400">Veri yükleniyor...</p>
      </div>
    );
  }

  // Tarih formatlama
  const formattedDate = new Date(post.createdAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Kesin doğru resim URL'i
  const fullImageUrl = post.imageUrl
    ? API_BASE + post.imageUrl
    : "/no-image.png";

  return (
    <div className="min-h-screen bg-[#020024] text-gray-200 relative pb-20">

      {/* PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 origin-left z-50 shadow-[0_0_10px_cyan]"
        style={{ scaleX }}
      />

      {/* HERO */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        
        {/* KAPAK FOTO */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fullImageUrl}
            alt={post.titleTr}
            className="w-full h-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#020024] via-[#020024]/60 to-transparent" />
        </div>

        {/* SAYFA BAŞI */}
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 max-w-5xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Geri Dön */}
            <Link
              href="/blog"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors group"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Listeye Dön
            </Link>

            {/* BAŞLIK */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
              {post.titleTr}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm sm:text-base text-gray-300">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <Calendar size={18} className="text-purple-400" />
                <span>{formattedDate}</span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <Clock size={18} className="text-blue-400" />
                <span>{calculateReadingTime(post.contentTr)} dk okuma</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* İÇERİK */}
      <div className="max-w-4xl mx-auto px-6 sm:px-12 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-[#0a0a16]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          {/* HTML content render */}
          <article
            className="
              prose prose-invert prose-lg max-w-none
              prose-headings:text-transparent prose-headings:bg-clip-text
              prose-headings:bg-gradient-to-r prose-headings:from-cyan-400 prose-headings:to-blue-500
              prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-cyan-500 prose-blockquote:bg-white/5
              prose-blockquote:p-4 prose-blockquote:rounded-r-lg
              prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-white/10
              text-gray-300 leading-relaxed
            "
            dangerouslySetInnerHTML={{ __html: post.contentTr }}
          />

          {/* Paylaş alanı */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">Bu yazıyı paylaş:</span>
              <button className="p-3 bg-white/5 rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors">
                <Share2 size={20} />
              </button>
            </div>

            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-black/40 rounded border border-white/5">
                #Teknoloji
              </span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-black/40 rounded border border-white/5">
                #Yazılım
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Arka Plan Efektleri */}
      <div className="fixed top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

    </div>
  );
}
