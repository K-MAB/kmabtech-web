"use client";

import { useState, useEffect, use } from "react";
import { api } from "@/services/api";
import { motion } from "framer-motion";
import { ArrowLeftCircle, Box, Layers, Ruler } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [selected, setSelected] = useState(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    api.getProductById(id).then((data) => {
      setProduct(data);
      if (data.imageUrls?.length > 0) {
        setSelected(`${api.baseUrl}${data.imageUrls[0]}`);
      }
    });
  }, [id]);

  if (!product) return <div className="text-white">Yükleniyor...</div>;

  const images = product.imageUrls?.map((x) => `${api.baseUrl}${x}`);

  return (
    <div className="min-h-screen bg-[#070B1A] text-gray-200 pt-10 pb-20">
      <div className="container mx-auto px-6">

        {/* GERİ DÖN */}
        <Link
          href="/products"
          className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition mb-6"
        >
          <ArrowLeftCircle size={26} />
          <span className="text-sm tracking-wide">Ürün Listesine Dön</span>
        </Link>

        {/* ÜST BÖLÜM — SOLDA BÜYÜK RESİM, SAĞDA ÖZELLİKLER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* ===============================
                SOL BÜYÜK ANA RESİM
          =============================== */}
          <div
            className="relative h-[450px] bg-[#050814] rounded-2xl overflow-hidden border border-[#1A2744] shadow-[0_0_20px_rgba(0,150,255,0.25)]"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {/* 3D yazıcı alttan yukarı dolma efekti */}
            <motion.img
              src={selected}
              className="absolute inset-0 w-full h-full object-contain"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />

            {/* Yazıcı kafası çizgisi */}
            <motion.div
              className="absolute left-0 w-full h-[3px] bg-blue-400 shadow-[0_0_12px_rgba(0,170,255,1)]"
              initial={{ bottom: "0%" }}
              animate={{ bottom: ["0%", "100%"] }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />

            {/* Hover kırılma sadece resme */}
            {hover && (
              <>
                {/* sol */}
                <motion.img
                  src={selected}
                  className="absolute inset-0 w-full h-full object-contain opacity-40"
                  style={{ clipPath: "inset(0 66% 0 0)" }}
                  animate={{ x: -12 }}
                />

                {/* orta */}
                <motion.img
                  src={selected}
                  className="absolute inset-0 w-full h-full object-contain opacity-50"
                  style={{ clipPath: "inset(0 33% 0 33%)" }}
                  animate={{ y: -8 }}
                />

                {/* sağ */}
                <motion.img
                  src={selected}
                  className="absolute inset-0 w-full h-full object-contain opacity-40"
                  style={{ clipPath: "inset(0 0 0 66%)" }}
                  animate={{ x: 12 }}
                />
              </>
            )}
          </div>

          {/* ===============================
                SAĞ TARAF ÜRÜN BİLGİLERİ
          =============================== */}
          <div className="space-y-10">

            <div>
              <p className="text-blue-400 text-xs font-mono tracking-widest uppercase">
                {product.categoryName}
              </p>

              <h1 className="text-5xl font-extrabold text-white mt-2">
                {product.name}
              </h1>

              <div className="text-6xl font-mono font-bold text-blue-300 mt-6">
                {product.price}
                <span className="text-xl text-gray-400"> ₺</span>
              </div>
            </div>

            {/* Teknik Özellikler */}
            <div
              className="
                grid grid-cols-2 gap-6 p-8 
                bg-[#10192E]/70 backdrop-blur-xl 
                border border-[#1A2A4A] rounded-2xl
                shadow-[0_0_25px_rgba(0,150,255,0.15)]
              "
            >
              <Spec title="Renk" value={product.color} icon={<Box size={14} />} />
              <Spec title="Materyal" value={product.material} icon={<Layers size={14} />} />
              <Spec title="Boyut" value={product.dimensions} icon={<Ruler size={14} />} />
              <Spec title="Ağırlık" value={product.weight} />
            </div>
          </div>
        </div>

        {/* ======================================================
              ALT GALERİ — TÜM RESİMLER BURADA
        ====================================================== */}
        {images?.length > 1 && (
          <div className="flex gap-4 mt-16 overflow-x-auto pb-3">
            {images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(imgUrl)}
                className="
                  w-24 h-24 rounded-xl overflow-hidden 
                  border border-[#1A2744] 
                  hover:border-blue-400 transition
                "
              >
                <img src={imgUrl} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* ======================================================
              EN ALTA ÜRÜN AÇIKLAMASI GELECEK
        ====================================================== */}
        <div
          className="
            p-8 mt-16 bg-[#0D1428]/60 backdrop-blur-xl 
            border border-[#1A2A4A] rounded-2xl 
            shadow-[0_0_20px_rgba(0,150,255,0.12)]
          "
        >
          <h2 className="text-xl font-semibold text-blue-300 mb-3 tracking-wide">
            Ürün Açıklaması
          </h2>
          <p className="text-gray-300 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

/* Specs */
function Spec({ title, value, icon }) {
  return (
    <div className="space-y-1">
      <span className="text-gray-400 text-xs uppercase flex items-center gap-2 tracking-wider">
        {icon} {title}
      </span>
      <p className="text-lg text-gray-200 font-medium">{value || "-"}</p>
    </div>
  );
}
