"use client";

import { useState, useEffect, useMemo } from "react";
import { api } from "@/services/api";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, Filter, RotateCcw } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getProducts(),
      fetch(`${api.baseUrl}/api/Categories`).then(res => res.json())
    ]).then(([prodData, catData]) => {
      setProducts(prodData || []);
      setCategories(catData || []);
      setLoading(false);
    });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "all" || p.categoryName === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#05060B] text-white flex overflow-hidden">
      
      {/* ================= SIDEBAR (COLLAPSIBLE) ================= */}
      <motion.aside
        initial={false}
        animate={{ width: isFilterOpen ? 350 : 0, opacity: isFilterOpen ? 1 : 0 }}
        className="relative bg-[#0A0C14] border-r border-white/5 h-screen overflow-hidden shrink-0 hidden lg:block"
      >
        <div className="p-10 w-[350px] space-y-10">
          <div className="flex items-center gap-3 text-blue-500 mb-10">
            <Filter size={24} />
            <h2 className="text-xl font-black tracking-widest">FİLTRELER</h2>
          </div>

          {/* Search inside Sidebar */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Ürün Arama</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-blue-600 transition-all"
                placeholder="Model ismi..."
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Kategoriler</label>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setSelectedCategory("all")}
                className={`text-left px-5 py-4 rounded-xl font-bold transition-all ${selectedCategory === "all" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "hover:bg-white/5 text-gray-400"}`}
              >
                Tüm Koleksiyon
              </button>
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`text-left px-5 py-4 rounded-xl font-bold transition-all ${selectedCategory === cat.name ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "hover:bg-white/5 text-gray-400"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {setSearch(""); setSelectedCategory("all");}}
            className="flex items-center gap-2 text-gray-500 hover:text-white text-xs font-bold transition-colors pt-10"
          >
            <RotateCcw size={14} /> FİLTRELERİ SIFIRLA
          </button>
        </div>
      </motion.aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 h-screen overflow-y-auto relative scrollbar-hide">
        
        {/* Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="fixed left-4 bottom-4 z-50 bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        >
          {isFilterOpen ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
        </button>

        {/* Header */}
        <section className="pt-32 pb-16 px-10 text-center">
        
          <div className="relative z-10">
            <h2 className="text-5xl font-black mb-4">Commitra <span className="text-blue-600">3D</span></h2>
            <p className="text-gray-500 font-medium tracking-[0.2em] uppercase text-xs">Toplam {filteredProducts.length} adet sonuç listelendi</p>
          </div>
        </section>

        {/* Grid Container */}
        <div className="px-10 pb-40">
          {loading ? (
            <div className="flex justify-center py-40">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-12 justify-items-center items-stretch"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex" // Kartın yüksekliğini eşitlemek için zorunlu
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}