"use client";

import { useState, useEffect, use, useMemo } from "react";
import { api } from "@/services/api";
import { motion } from "framer-motion";
import { ArrowLeftCircle, Box, Layers, Ruler, ExternalLink, Package, Tag, ShoppingCart } from "lucide-react";
import Link from "next/link";

/* 🔹 www ile gelen linkleri otomatik https yapar */
function normalizeUrl(url?: string) {
  if (!url) return "#";
  if (!url.startsWith("http")) return "https://" + url;
  return url;
}

/* ==========================================================
   📌 ANA SAYFA — PRODUCT DETAIL PAGE (MODERN AESTHETIC - CTA TAŞINDI)
========================================================== */
export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    // Number(id) diyerek string olan id'yi sayıya çeviriyoruz
    api.getProductById(Number(id)).then((data) => {
      setProduct(data);
      if (data.imageUrls?.length > 0) {
        setSelected(`${api.baseUrl}${data.imageUrls[0]}`);
      }
    });
  }, [id]);

  // ✅ DÜZELTME: useMemo buraya (if bloğunun üzerine) taşındı.
  // product null olabileceği için 'product?.imageUrls' şeklinde güvenli erişim kullanıldı.
  const images = useMemo(() => 
    product?.imageUrls?.map((x: string) => `${api.baseUrl}${x}`) || []
  , [product]);

  // Product yüklenene kadar gösterilecek yükleme ekranı
  // Bu return ifadesi artık useMemo'dan sonra çalışıyor.
  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050616] text-white">
      <div className="animate-pulse text-2xl font-mono text-cyan-400">YÜKLENİYOR...</div>
    </div>
  );

  const currentImage = selected || images[0] || "/placeholder.jpg"; 

  // Dinamik olarak link rengi ve metinlerini belirleyen yardımcı fonksiyon
  const getLinkProps = (link: string, index: number) => {
    let name = "Online Mağaza";
    let colorClass = "text-gray-200 border-gray-600/30 hover:bg-[#1A253F]";
    let iconClass = "text-gray-400";

    if (link.includes("shopier")) {
        name = "SHOPİER";
        colorClass = "text-blue-300 border-blue-600/50 hover:bg-blue-900/40";
        iconClass = "text-blue-400";
    } else if (link.includes("trendyol")) {
        name = "TRENDYOL";
        colorClass = "text-orange-300 border-orange-600/50 hover:bg-orange-900/40";
        iconClass = "text-orange-400";
    } else if (link.includes("kmabtech")) {
        name = "kmabtech.com çok yakında";
        colorClass = "text-yellow-300 border-yellow-600/50 hover:bg-yellow-900/40";
        iconClass = "text-yellow-400";
    }

    return { name, colorClass, iconClass };
  };


  return (
    <div className="min-h-screen bg-[#050616] text-gray-100 pt-16 pb-28 font-sans">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* 🔹 GERİ DÖN */}
        <Link
          href="/products"
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 mb-12 group"
        >
          <ArrowLeftCircle size={30} className="transition-all duration-500 group-hover:rotate-6 group-hover:scale-110" />
          <span className="text-base tracking-widest font-semibold uppercase">Ürün Listesine Dön</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* 🔹 SOL ANA BÜYÜK RESİM ve GALERİ */}
          <div className="order-1">
            <div
              className="relative h-[550px] bg-gradient-to-br from-[#090C22] to-[#050616] rounded-[2rem] p-4 overflow-hidden 
                         border border-cyan-800/50 shadow-2xl shadow-cyan-900/50
                         transition-all duration-500 hover:scale-[1.01]"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {/* Ana Resim */}
              <motion.img
                key={currentImage} 
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl p-2 bg-[#000000]/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />

              {/* Hologram/Slicing Effect (Sadece görsel zenginlik için korunmuştur) */}
              {hover && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 0.2 }} 
                    transition={{ delay: 0.2 }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-color-blue-900)_0%,_transparent_60%)] pointer-events-none" 
                  />
                  <motion.div 
                    className="absolute inset-0 border-4 border-cyan-400/50 opacity-0"
                    initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    animate={{ opacity: 0.5, clipPath: "polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </>
              )}
            </div>
            
            {/* ALT GALERİ */}
            {images?.length > 1 && (
              <div className="flex gap-4 mt-8 overflow-x-auto pb-3 pt-1">
                {images.map((imgUrl: string, idx: number) => (
                  <button key={idx} onClick={() => setSelected(imgUrl)}
                    className={`min-w-[100px] h-24 rounded-2xl overflow-hidden transition-all duration-300
                                border-4 ${selected === imgUrl 
                                  ? 'border-cyan-500 shadow-lg shadow-cyan-500/30 scale-105' 
                                  : 'border-[#1A2744] hover:border-blue-400/50'}`}>
                    <img src={imgUrl} alt={`Ürün resmi ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>


          {/* 🔹 ÜRÜN BİLGİLERİ - SAĞ TARAF */}
          <div className="space-y-12 order-2">

            {/* BAŞLIK VE FİYAT */}
            <div>
              <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400/80 mb-2">
                <Tag size={18} />
                <span>{product.categoryName || "Kategori Bilgisi"}</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-white leading-tight drop-shadow-lg">
                {product.name}
              </h1>

              <div className="text-5xl font-black mt-8 text-transparent bg-clip-text 
                           bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse-slow">
                {product.price}
                <span className="text-3xl font-bold text-gray-400 ml-2"> ₺</span>
              </div>
            </div>

            {/* 🔹 Teknik Özellikler */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-8 p-10 bg-gradient-to-br from-[#0D1428]/60 to-[#0A0E18]/60 
                             border border-blue-900/50 backdrop-blur-md rounded-[2rem] 
                             shadow-xl shadow-blue-900/40">
              <Spec title="Renk" value={product.color} icon={<Box size={20} className="text-blue-400" />} />
              <Spec title="Materyal" value={product.material} icon={<Layers size={20} className="text-cyan-400" />} />
              <Spec title="Boyut" value={product.dimensions} icon={<Ruler size={20} className="text-teal-400" />} />
              <Spec title="Ağırlık" value={product.weight} icon={<Package size={20} className="text-emerald-400" />} />
            </div>

            {/* NOT: SATIN AL BÖLÜMÜ BURADAN KALDIRILDI, EN ALTTA TAŞINACAK */}
            
          </div>
        </div>
        
        {/* 🔹 TAŞINAN SATIN AL LİNKLERİ (Tüm Sayfa Genişliğinde) */}
        {(product.link1 || product.link2 || product.link3) && (
            <div className="mt-24">
                <div className="p-10 bg-gradient-to-br from-[#0A0E18] to-[#0D1428] border border-[#1A2A4A]
                               rounded-[2rem] shadow-2xl shadow-cyan-900/20">
                    <h3 className="text-3xl font-bold text-cyan-300 border-b border-cyan-800/50 pb-4 mb-8 flex items-center gap-3">
                        <ShoppingCart size={28} />
                        HEMEN SATIN ALMAK İÇİN MAĞAZA SEÇİN
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Linkler */}
                        {[product.link1, product.link2, product.link3].filter(Boolean).map((link, index) => {
                            const { name, colorClass, iconClass } = getLinkProps(link, index + 1);
                            return (
                                <motion.a 
                                    key={index}
                                    href={normalizeUrl(link)} target="_blank" rel="noopener noreferrer"
                                    className={`flex items-center justify-between px-8 py-5 rounded-2xl transition-all duration-300 
                                                border-2 font-mono tracking-wider ${colorClass} shadow-md shadow-black/30
                                                text-xl font-bold`}
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 255, 255, 0.4)' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="font-semibold text-lg">{name}</span>
                                    <ExternalLink size={24} className={`ml-4 ${iconClass}`} />
                                </motion.a>
                            );
                        })}
                    </div>
                </div>
            </div>
        )}

        {/* ÜRÜN AÇIKLAMASI */}
        <div className="p-10 mt-24 bg-gradient-to-br from-[#090C22] to-[#050616] border border-cyan-800/50 
                         backdrop-blur-md rounded-[2rem] shadow-2xl shadow-blue-900/20">
          <h2 className="text-3xl font-bold text-cyan-300 border-b border-cyan-800/50 pb-4 mb-6">
            Ürün Açıklaması
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">
            {product.description || "Bu ürüne ait bir açıklama bulunmamaktadır."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   📌 SPEC COMPONENT
========================================================== */
type SpecProps = {
  title: string;
  value?: string | number | null;
  icon?: React.ReactNode;
};

function Spec({ title, value, icon }: SpecProps) {
  return (
    <div className="space-y-2">
      <span className="text-gray-400 text-xs uppercase flex items-center gap-2 tracking-widest font-semibold border-b border-gray-700/50 pb-1">
        {icon} {title}
      </span>
      <p className="text-2xl text-white font-extrabold mt-1 tracking-tight">
        {value ?? "N/A"}
      </p>
    </div>
  );
}