"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { api } from "@/services/api";
import { ShoppingCart, ArrowUpRight } from "lucide-react";

type Product = {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrls?: string[];
};

export default function ProductCard({ product }: { product: Product }) {
  const img = product.imageUrls && product.imageUrls.length > 0
      ? `${api.baseUrl}${product.imageUrls[0]}`
      : "/no-image.png";

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <motion.div
        whileHover={{ y: -10 }}
        className="group relative flex flex-col h-full w-[380px] bg-[#0F121D] border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]"
      >
        {/* --- IMAGE AREA (380x480) --- */}
        <div className="relative w-full h-[480px] flex-shrink-0 overflow-hidden bg-black">
          {/* Flare Efekti (Işık Süzmesi) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <motion.div 
              initial={{ x: "-150%", skewX: -25 }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent absolute top-0"
            />
          </div>

          <motion.img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F121D] via-transparent to-transparent opacity-90" />

          {/* Hover Detail Icon */}
          <div className="absolute top-6 right-6 z-30">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-blue-600/40">
              <ArrowUpRight size={24} />
            </div>
          </div>
        </div>

        {/* --- CONTENT AREA (flex-1 ile boyu eşitler) --- */}
        <div className="p-8 flex flex-col flex-1 justify-between gap-6">
          <div className="space-y-3">
            <h3 className="text-white font-extrabold text-3xl tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-400 text-base line-clamp-3 font-medium leading-relaxed">
              {product.description || "Premium kalite standartlarında üretilmiş özel tasarım koleksiyon parçası."}
            </p>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.3em] mb-1">BİRİM FİYAT</span>
              <span className="text-3xl font-black text-white">
                {product.price.toLocaleString()} <span className="text-blue-500 text-lg font-bold">₺</span>
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-4 rounded-2xl font-black text-xs tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl"
            >
              İNCELE
            </motion.button>
          </div>
        </div>

        {/* Arka Plan Glow (Parlayan Neon Kenar) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </Link>
  );
}