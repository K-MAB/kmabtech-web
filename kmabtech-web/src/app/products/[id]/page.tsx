"use client";

import { useState, useEffect, use, useMemo } from "react";
import { api } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Box, 
  Layers, 
  Ruler, 
  ExternalLink, 
  Package, 
  Tag, 
  ShoppingCart, 
  X, 
  Maximize2,
  CheckCircle2,
  Share2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* Link Düzenleyici Helper */
function normalizeUrl(url?: string) {
  if (!url) return "#";
  if (!url.startsWith("http")) return "https://" + url;
  return url;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    api.getProductById(Number(id)).then((data) => {
      setProduct(data);
      if (data.imageUrls?.length > 0) {
        setSelected(`${api.baseUrl}${data.imageUrls[0]}`);
      }
    });
  }, [id]);

  const images = useMemo(() => 
    product?.imageUrls?.map((x: string) => `${api.baseUrl}${x}`) || []
  , [product]);

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white gap-4">
       <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
       <div className="animate-pulse text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">Veriler İşleniyor...</div>
    </div>
  );

  const currentImage = selected || images[0] || "/placeholder.jpg"; 

  // Dinamik Link Stilleri
  const getLinkStyle = (link: string) => {
    if (link.includes("shopier")) return { name: "SHOPIER İLE AL", bg: "bg-blue-600", border: "border-blue-500", shadow: "shadow-blue-900/40" };
    if (link.includes("trendyol")) return { name: "TRENDYOL'DA GÖR", bg: "bg-orange-600", border: "border-orange-500", shadow: "shadow-orange-900/40" };
    return { name: "SATIN AL", bg: "bg-purple-600", border: "border-purple-500", shadow: "shadow-purple-900/40" };
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* ARKA PLAN EFEKTLERİ */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03]" />
         <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* ZOOM MODAL */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <motion.button 
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              onClick={() => setIsZoomed(false)}
            >
              <X size={32} />
            </motion.button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={currentImage} 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl shadow-blue-500/10"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 max-w-[1400px]">

        {/* HEADER: GERİ BUTONU VE KATEGORİ */}
        <div className="flex items-center justify-between mb-12">
           <Link
             href="/products"
             className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-bold text-gray-300"
           >
             <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
             KOLEKSİYONA DÖN
           </Link>

           <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">
              <Tag size={14} /> {product.categoryName || "Premium"}
           </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-20">

          {/* 🔹 SOL TARAF: GÖRSEL SAHNESİ (7 Kolon) */}
          <div className="xl:col-span-7 flex flex-col gap-6">
            
            {/* Ana Görsel */}
            <motion.div 
              layoutId={`product-${product.id}`}
              className="relative aspect-square md:aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0A0C14] group cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              {/* Görsel Arka Işığı */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
              
              <motion.img
                key={currentImage} 
                src={currentImage}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover md:object-contain transition-transform duration-700 group-hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />

              {/* Hover İkonu */}
              <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/20 text-white">
                    <Maximize2 size={24} />
                 </div>
              </div>
            </motion.div>

            {/* Thumbnails */}
            {images?.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((imgUrl: string, idx: number) => (
                  <button 
                    key={idx} 
                    onClick={() => setSelected(imgUrl)}
                    className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      selected === imgUrl 
                        ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105' 
                        : 'border-white/10 hover:border-white/30 grayscale hover:grayscale-0'
                    }`}
                  >
                    <img src={imgUrl} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 🔹 SAĞ TARAF: BİLGİ VE KONTROL PANELİ (5 Kolon) */}
          <div className="xl:col-span-5 flex flex-col">
            
            {/* Başlık Alanı */}
            <div className="mb-8 pb-8 border-b border-white/5">
               <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-none">
                 {product.name}
               </h1>
               <div className="flex items-center gap-6">
                  <div className="text-3xl md:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {product.price?.toLocaleString()} 
                    <span className="text-xl ml-1 text-gray-500">₺</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider">
                     <CheckCircle2 size={14} /> Stokta
                  </div>
               </div>
            </div>

            {/* Açıklama */}
            <div className="prose prose-invert prose-lg text-gray-400 leading-relaxed mb-10">
               <p>{product.description || "Bu özel tasarım parça için detaylı açıklama yakında eklenecektir."}</p>
            </div>

            {/* Teknik Özellikler (Glass Cards) */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <SpecItem label="Materyal" value={product.material} icon={Layers} />
              <SpecItem label="Boyutlar" value={product.dimensions} icon={Ruler} />
              <SpecItem label="Renk" value={product.color} icon={Box} />
              <SpecItem label="Ağırlık" value={product.weight} icon={Package} />
            </div>

            {/* SATIN ALMA KARTI (Sticky-like feel) */}
            <div className="mt-auto bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 p-6 rounded-[2rem] backdrop-blur-md">
               <div className="flex items-center gap-3 mb-6 text-white/80">
                  <ShoppingCart size={20} className="text-blue-500" />
                  <span className="font-bold tracking-wide text-sm uppercase">Satın Alma Seçenekleri</span>
               </div>

               <div className="space-y-3">
                 {[product.link1, product.link2, product.link3].filter(Boolean).map((link, index) => {
                    const style = getLinkStyle(link);
                    return (
                      <a
                        key={index}
                        href={normalizeUrl(link)}
                        target="_blank"
                        className={`group relative flex items-center justify-between w-full p-4 rounded-xl border transition-all duration-300 overflow-hidden ${style.bg} ${style.border} ${style.shadow} hover:scale-[1.02] active:scale-[0.98]`}
                      >
                         <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                         
                         <span className="relative z-10 font-bold text-white tracking-wider flex items-center gap-2">
                           {style.name}
                         </span>
                         
                         <div className="relative z-10 bg-white/20 p-2 rounded-lg text-white group-hover:bg-white group-hover:text-black transition-colors">
                            <ExternalLink size={18} />
                         </div>
                      </a>
                    );
                 })}
               </div>
               
               <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium cursor-pointer hover:text-white transition-colors">
                  <Share2 size={14} />
                  <span>Bu ürünü paylaş</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   YARDIMCI BİLEŞENLER
========================================================== */

function SpecItem({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0F111A] border border-white/5 hover:border-blue-500/30 transition-colors group">
      <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 group-hover:text-white group-hover:bg-blue-500 transition-colors">
         <Icon size={18} />
      </div>
      <div>
         <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-0.5">{label}</div>
         <div className="text-sm font-semibold text-gray-200">{value || "Standart"}</div>
      </div>
    </div>
  );
}