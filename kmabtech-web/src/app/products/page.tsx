"use client";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div
      className="
        relative min-h-screen 
        bg-gradient-to-b from-[#070B1A] to-[#0C1229]
        text-gray-200 overflow-hidden
      "
    >

      {/* === PARALLAX BACKGROUND LIGHT EFFECT === */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
      >
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-blue-600 blur-[150px]"
          animate={{
            x: [0, 200, -200, 0],
            y: [0, -150, 150, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* === PAGE HEADER === */}
      <motion.div
        className="text-center pt-20 pb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[0_0_35px_rgba(0,150,255,0.5)]">
          ÜRÜN KATALOĞU
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          3D animasyonlu ürün kartlarıyla koleksiyonumuzu keşfedin.
        </p>
      </motion.div>

      {/* === PRODUCT GRID === */}
      <div className="container mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-blue-400 font-mono">YÜKLENİYOR...</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
