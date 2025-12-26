"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { api } from "@/services/api";
import { ArrowUpRight } from "lucide-react";

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
    <Link href={`/products/${product.id}`} className="block h-full w-full">
      <motion.div
        whileHover={{ y: -10 }}
        className="group relative flex flex-col h-full w-full bg-[#0F121D] border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]"
      >
        {/* --- IMAGE AREA --- */}
        {/* Aspect-square veya aspect-[4/5] kullanarak genişliğe göre yüksekliği otomatik ayarlarız */}
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-black flex-shrink-0">
          <div className="absolute inset-0 z-20 pointer-events-none">
            <motion.div 
              initial={{ x: "-150%", skewX: -25 }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent absolute top-0"
            />
          </div>

          <motion.img
            src={img}
            alt={product.name}
            // object-cover: Alanı tamamen doldurur, boşluk bırakmaz.
            // w-full h-full: Kapsayıcının genişliği neyse ona sığar.
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0F121D] via-transparent to-transparent opacity-80" />

          <div className="absolute top-4 right-4 z-30">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="p-6 flex flex-col flex-1 min-h-0">
          <div className="flex-1 space-y-2">
            <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight line-clamp-1 group-hover:text-blue-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 font-medium leading-relaxed">
              {product.description || "Premium tasarım koleksiyon parçası."}
            </p>
          </div>

          <div className="mt-6 pt-4 flex items-center justify-between border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mb-1">FİYAT</span>
              <span className="text-xl font-black text-white">
                {product.price.toLocaleString()} <span className="text-blue-500 text-sm">₺</span>
              </span>
            </div>

            <div className="bg-white text-black px-4 py-2.5 rounded-xl font-bold text-[10px] tracking-tighter hover:bg-blue-600 hover:text-white transition-all">
              İNCELE
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}