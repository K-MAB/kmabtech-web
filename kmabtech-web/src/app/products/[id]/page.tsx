"use client";

import { useState, useEffect, use, useMemo } from "react";
import { api } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeftCircle, 
  Box, 
  Layers, 
  Ruler, 
  ExternalLink, 
  Package, 
  Tag, 
  ShoppingCart, 
  X, 
  Maximize2 
} from "lucide-react";
import Link from "next/link";

/* 🔹 www ile gelen linkleri otomatik https yapar */
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
    // Number(id) diyerek string olan id'yi sayıya çeviriyoruz
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
    <div className="min-h-screen flex items-center justify-center bg-[#050616] text-white">
      <div className="animate-pulse text-2xl font-mono text-cyan-400 uppercase tracking-widest">Yükleniyor...</div>
    </div>
  );

  const currentImage = selected || images[0] || "/placeholder.jpg"; 

  // Dinamik olarak link rengi ve metinlerini belirleyen yardımcı fonksiyon
  const getLinkProps = (link: string) => {
    let name = "Online Mağaza";
    let colorClass = "text-blue-400"; // Varsayılan renk

    if (link.includes("shopier")) {
        name = "SHOPİER";
        colorClass = "text-blue-400";
    } else if (link.includes("trendyol")) {
        name = "TRENDYOL";
        colorClass = "text-orange-400";
    } else if (link.includes("kmabtech")) {
        name = "KMABTECH";
        colorClass = "text-yellow-400";
    }

    return { name, colorClass };
  };

  return (
    <div className="min-h-screen bg-[#050616] text-gray-100 pt-16 pb-28 font-sans overflow-x-hidden">
      
      {/* 🔹 TAM EKRAN RESİM MODAL (Lightbox) */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <motion.button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setIsZoomed(false)}
            >
              <X size={48} />
            </motion.button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={currentImage} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-cyan-500/10"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">

        {/* 🔹 GERİ DÖN */}
        <Link
          href="/products"
          className="flex items-center gap-2 text-cyan-400/60 hover:text-cyan-300 transition-all duration-300 mb-10 group"
        >
          <ArrowLeftCircle size={26} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm tracking-[0.2em] font-bold uppercase">Ürün Listesine Dön</span>
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">

          {/* 🔹 SOL TARAF: DEV RESİM ALANI (7 Kolon) */}
          <div className="xl:col-span-7 space-y-8">
            <div 
              className="relative h-[500px] md:h-[800px] w-full bg-black rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <motion.img
                key={currentImage} 
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#050616] via-transparent to-transparent opacity-70" />
              
              <div className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-xl p-5 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                <Maximize2 size={28} className="text-white" />
              </div>
            </div>

            {/* Galeri Thumbnails */}
            {images?.length > 1 && (
              <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
                {images.map((imgUrl: string, idx: number) => (
                  <button 
                    key={idx} 
                    onClick={() => setSelected(imgUrl)}
                    className={`relative min-w-[140px] h-28 rounded-[1.5rem] overflow-hidden transition-all duration-300 border-2 
                      ${selected === imgUrl ? 'border-cyan-500 scale-105 shadow-xl shadow-cyan-500/20' : 'border-white/5 hover:border-white/20'}`}
                  >
                    <img src={imgUrl} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>


          {/* 🔹 SAĞ TARAF: ÜRÜN BİLGİLERİ (5 Kolon) */}
          <div className="xl:col-span-5 flex flex-col space-y-12">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase">
                <Tag size={16} /> {product.categoryName || "Premium Collection"}
              </div>
              
<h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight
               bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500
               drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-500">
  {product.name}
</h1>

              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600">
                {product.price?.toLocaleString()}
                <span className="text-3xl font-bold text-gray-500 ml-3 uppercase tracking-tighter">₺</span>
              </div>
            </div>

            {/* Teknik Özellikler Grid */}
            <div className="grid grid-cols-2 gap-5">
              <SpecBox title="Renk" value={product.color} icon={<Box size={22} />} />
              <SpecBox title="Materyal" value={product.material} icon={<Layers size={22} />} />
              <SpecBox title="Boyut" value={product.dimensions} icon={<Ruler size={22} />} />
              <SpecBox title="Ağırlık" value={product.weight} icon={<Package size={22} />} />
            </div>

            {/* Kısa Özet */}
            <div className="relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 italic text-gray-400 text-lg leading-relaxed">
               <span className="absolute -top-4 left-6 text-6xl text-cyan-500/20 font-serif">"</span>
               {product.description?.slice(0, 160)}...
            </div>
          </div>
        </div>

        {/* 🔹 ALT KISIM: AÇIKLAMA VE YENİ SATIN ALMA KARTI */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* Detaylı Açıklama */}
           <div className="lg:col-span-8 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 p-12 rounded-[3rem]">
              <h2 className="text-3xl font-black mb-8 text-white uppercase tracking-widest border-b border-white/5 pb-6">
                Ürün Detayları
              </h2>
              <div className="text-xl text-gray-400 leading-loose whitespace-pre-wrap font-light">
                {product.description || "Bu ürün hakkında detaylı açıklama yakında eklenecektir."}
              </div>
           </div>

           {/* 🔹 YENİ TASARIM SİPARİŞ KARTI */}
           <div className="lg:col-span-4">
              <div className="relative overflow-hidden p-[2px] rounded-[3rem] bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                <div className="bg-[#0A0E1A] p-10 rounded-[2.9rem] h-full relative z-10">
                  
                  <div className="text-center mb-10">
                    <div className="inline-flex p-4 rounded-3xl bg-blue-500/10 text-blue-400 mb-6 border border-blue-500/20">
                      <ShoppingCart size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
                      ŞİMDİ SİPARİŞ VER
                    </h3>
                    <div className="h-1 w-12 bg-blue-500 mx-auto mt-4 rounded-full" />
                  </div>

                  <div className="space-y-4">
                    {[product.link1, product.link2, product.link3].filter(Boolean).map((link, index) => {
                      const { name, colorClass } = getLinkProps(link);
                      return (
                        <motion.a 
                          key={index} 
                          href={normalizeUrl(link)} 
                          target="_blank"
                          whileHover={{ scale: 1.03, x: 5 }}
                          whileTap={{ scale: 0.97 }}
                          className="group flex items-center justify-between w-full p-6 rounded-[1.5rem] 
                                     bg-white/[0.03] border border-white/10 hover:border-blue-500/50 
                                     transition-all duration-300 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          
                          <div className="flex flex-col relative z-10">
                            <span className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-1">RESMİ SATIŞ</span>
                            <span className={`font-black text-xl tracking-tight ${colorClass}`}>{name}</span>
                          </div>
                          
                          <div className="bg-white/5 p-3 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all relative z-10 shadow-xl">
                            <ExternalLink size={22} />
                          </div>
                        </motion.a>
                      );
                    })}
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-black tracking-widest text-gray-500 uppercase">
                    <span>HIZLI KARGO</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                    <span>ORİJİNAL ÜRÜN</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                    <span>GÜVENLİ</span>
                  </div>
                </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   📌 YARDIMCI BİLEŞENLER
========================================================== */

function SpecBox({ title, value, icon }: { title: string, value: string, icon: any }) {
  return (
    <div className="p-7 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-500 group">
      <div className="text-cyan-500 mb-4 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <div className="text-gray-500 text-[10px] uppercase font-black tracking-[0.2em] mb-1.5">{title}</div>
      <div className="text-white font-extrabold text-xl tracking-tight">{value || "Belirtilmedi"}</div>
    </div>
  );
}