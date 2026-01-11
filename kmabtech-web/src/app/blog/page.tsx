"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { motion } from "framer-motion";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

// API MODEL
interface BlogPost {
  id: number;
  titleTr: string;
  contentTr: string;
  imageUrl?: string;
  author?: string;
  createdAt: string;
  tags?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getBlogPosts(); // 🔥 TEK DOĞRU KAYNAK
        setPosts(data);
      } catch (err) {
        console.error("Bloglar alınamadı", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.titleTr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.contentTr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00002b] flex flex-col items-center justify-center text-white gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="animate-pulse text-cyan-400">Veriler Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-32 pb-20 px-4 sm:px-8 relative overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,43,1) 35%, rgba(0,14,18,1) 100%)",
      }}
    >
      {/* BAŞLIK */}
      <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
        >
          Teknoloji Günlükleri
        </motion.h1>

        <p className="text-gray-400 text-lg mb-10">
          Yazılım, teknoloji, geliştirme süreçleri ve Commitra haberleri.
        </p>

        {/* Arama */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-xl mx-auto group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500" />

          <div className="relative bg-[#0a0a16] rounded-xl flex items-center px-4 py-3 border border-white/10 group-hover:border-white/20">
            <Search className="text-gray-400 w-6 h-6 mr-3" />
            <input
              type="text"
              placeholder="Makale ara (örn: Next.js, Yapay Zeka)..."
              className="bg-transparent w-full focus:outline-none text-white placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>
      </div>

      {/* BLOG GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            Aradığınız kriterlere uygun yazı bulunamadı.
          </div>
        )}
      </div>

      {/* Glow */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
    </div>
  );
}

// ---------------------------------------------------------------------
// BLOG CARD
// ---------------------------------------------------------------------
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const fullImageUrl = post.imageUrl
    ? api.baseUrl + post.imageUrl
    : "/no-image.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <Link href={`/blog/${post.id}`} className="block h-full">
        <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-blue-500/0 rounded-2xl group-hover:from-cyan-500/50 group-hover:via-purple-500/50 group-hover:to-blue-500/50 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />

        <div className="relative h-full bg-[#0e0e1a]/80 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300 shadow-xl">
          <div className="h-56 overflow-hidden bg-gray-900">
            <img
              src={fullImageUrl}
              alt={post.titleTr}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-purple-400" />
                {formattedDate}
              </span>

              <span className="flex items-center gap-1">
                <User size={14} className="text-blue-400" />
                {post.author || "Admin"}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
              {post.titleTr}
            </h3>

            <p className="text-gray-400 text-sm line-clamp-3 mb-6">
              {post.contentTr.replace(/<[^>]+>/g, "").substring(0, 120)}...
            </p>

            <div className="pt-4 border-t border-white/5 mt-auto">
              <span className="flex items-center text-sm font-semibold text-cyan-500 gap-2">
                Devamını Oku
                <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
