"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { api } from "@/services/api";
import { useState } from "react";

type Product = {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrls?: string[];
};

export default function ProductCard({ product }: { product: Product }) {

  const img =
    product.imageUrls && product.imageUrls.length > 0
      ? `${api.baseUrl}${product.imageUrls[0]}`
      : "/no-image.png";

  const [hover, setHover] = useState(false);

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        className="cursor-pointer"
        style={{ perspective: 1200 }}
      >
        <div
          className="
            bg-[#0E1225]/70 backdrop-blur-xl 
            border border-[#1A2744] rounded-2xl
            shadow-[0_0_20px_rgba(0,150,255,0.15)]
            overflow-hidden h-[430px]
            flex flex-col
          "
        >
          {/* ============================================
                IMAGE AREA — 3D PRINTER FROM-BOTTOM BUILD
          ============================================ */}
          <div className="relative h-2/3 overflow-hidden bg-[#050814]">

            {/* --- Ürün alttan yukarı çıkıyormuş gibi --- */}
             <motion.img
    src={img}
    className="absolute inset-0 w-full h-full object-cover"
    initial={{ clipPath: "inset(100% 0 0 0)" }}
    animate={{ clipPath: "inset(0% 0 0 0)" }}
    transition={{ duration: 1.8, ease: "easeInOut" }}
  />

            {/* --- Yazıcı çizgisi --- */}
            <motion.div
              className="absolute left-0 w-full h-[3px] bg-blue-400 shadow-[0_0_12px_rgba(0,170,255,1)]"
              initial={{ bottom: "0%" }}
              animate={{ bottom: ["0%", "100%"] }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />

            {/* ============================================
                  ONLY IMAGE FRACTURE ON HOVER
              ============================================ */}
            {hover && (
              <>
                <motion.img
                  src={img}
                  className="absolute inset-0 w-full h-full object-contain opacity-40"
                  style={{ clipPath: "inset(0 66% 0 0)" }}
                  animate={{ x: -12 }}
                  transition={{ type: "spring", stiffness: 70 }}
                />

                <motion.img
                  src={img}
                  className="absolute inset-0 w-full h-full object-contain opacity-50"
                  style={{ clipPath: "inset(0 33% 0 33%)" }}
                  animate={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 70 }}
                />

                <motion.img
                  src={img}
                  className="absolute inset-0 w-full h-full object-contain opacity-40"
                  style={{ clipPath: "inset(0 0 0 66%)" }}
                  animate={{ x: 12 }}
                  transition={{ type: "spring", stiffness: 70 }}
                />
              </>
            )}
          </div>

          {/* ============================================
                TEXT AREA
          ============================================ */}
          <div className="h-1/3 p-5 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-white">
              {product.name}
            </h3>

            <p className="text-gray-400 text-sm line-clamp-2">
              {product.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-300">
                {product.price} <span className="text-gray-400">₺</span>
              </span>

              <span className="text-xs px-4 py-1 rounded border border-blue-500/60 text-blue-300 font-mono">
                İNCELE
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
