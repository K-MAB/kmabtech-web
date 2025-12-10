"use client";

import { useState, useEffect, useMemo } from "react";
import { api } from "@/services/api";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

/* ✅ ProductCard ile %100 uyumlu hale getirildi */
interface Product {
  id: string | number;
  name: string;                 // ✅ ARTIK ZORUNLU
  description?: string;
  price: number;
  categoryName?: string;
  color?: string;
  imageUrls: string[];
}

interface Category {
  id: number;
  name: string;
  color: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [loading, setLoading] = useState(true);

  /* ✅ VERİLERİ ÇEK */
  useEffect(() => {
    api.getProducts().then((data: Product[]) => {
      setProducts(data || []);
      setLoading(false);
    });

    fetch(`${api.baseUrl}/api/Categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data || []));
  }, []);

  /* ✅ RENKLER */
  const colors = useMemo(() => {
    return [
      "all",
      ...Array.from(
        new Set(products.map((p) => p.color).filter(Boolean) as string[])
      ),
    ];
  }, [products]);

  /* ✅ FİLTRELEME */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const name = p.name.toLowerCase();
      const searchText = search.toLowerCase();

      const matchesSearch =
        searchText === "" || name.includes(searchText);

      const matchesCategory =
        selectedCategory === "all" ||
        p.categoryName === selectedCategory;

      const matchesColor =
        selectedColor === "all" || p.color === selectedColor;

      return matchesSearch && matchesCategory && matchesColor;
    });
  }, [products, search, selectedCategory, selectedColor]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedColor("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] to-[#070B1A] text-white">

      {/* ================= HERO ================= */}
      <section className="pt-28 pb-20 text-center relative">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text mb-6">
          KMAB-3D
        </h1>

        <p className="text-gray-400 mb-8 text-lg">
          3D baskı, teknoloji ve yazılım ürünleri
        </p>

        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ürün ara..."
            className="w-full bg-[#0E132B] border border-cyan-500/30 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-cyan-500 shadow-lg"
          />
        </div>
      </section>

      {/* ================= ANA ALAN ================= */}
      <main className="w-10xl px-20 pb-40 md:flex gap-20">

        {/* ✅ FİLTRE */}
        <aside className="hidden md:block w-72 flex-shrink-0">
          <div className="sticky top-32 p-6 rounded-2xl bg-[#0f172a]/90 border border-cyan-500/20 space-y-6">

            <h2 className="text-xl font-bold text-cyan-300 flex gap-2">
              <SlidersHorizontal /> Gelişmiş Filtreler
            </h2>

            <button
              onClick={resetFilters}
              className="w-full py-2 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-pink-600"
            >
              <RotateCcw size={18} /> Sıfırla
            </button>

            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <ColorFilter
              colors={colors}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </div>
        </aside>

        {/* ✅ ÜRÜN KARTLARI */}
        <section className="flex-1">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 lg:grid-cols-5 gap-10"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl shadow-[0_0_35px_rgba(56,189,248,0.25)]"
                  >
                    {/* ✅ HATA ARTIK %100 YOK */}
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

      </main>
    </div>
  );
}

/* ================= FİLTRE BİLEŞENLERİ ================= */

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }: any) => (
  <div>
    <h3 className="text-cyan-400 mb-3 font-semibold">Kategoriler</h3>
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setSelectedCategory("all")}
        className={`px-4 py-1 rounded-full ${
          selectedCategory === "all" ? "bg-cyan-600" : "bg-slate-700"
        }`}
      >
        Tümü
      </button>
      {categories.map((cat: any) => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategory(cat.name)}
          style={{ backgroundColor: cat.color }}
          className="px-4 py-1 rounded-full text-white"
        >
          {cat.name}
        </button>
      ))}
    </div>
  </div>
);

const ColorFilter = ({ colors, selectedColor, setSelectedColor }: any) => (
  <div>
    <h3 className="text-cyan-400 mb-3 font-semibold">Renk</h3>
    <div className="flex flex-wrap gap-2">
      {colors.map((color: string) => (
        <button
          key={color}
          onClick={() => setSelectedColor(color)}
          className={`px-4 py-1 rounded-full ${
            selectedColor === color ? "bg-cyan-600" : "bg-slate-700"
          }`}
        >
          {color === "all" ? "Tümü" : color}
        </button>
      ))}
    </div>
  </div>
);
