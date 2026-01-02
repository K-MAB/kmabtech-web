"use client";

import { useState, useEffect, useMemo } from "react";
import { api } from "@/services/api";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, Filter, RotateCcw, Box, Layers, Grid } from "lucide-react";

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
      api.getCategories(),
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
    <div className="relative min-h-screen bg-[#050505] text-white flex overflow-hidden selection:bg-blue-500/30 font-sans">
      
      {/* ARKA PLAN EFEKTLERİ */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03]" />
         <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* ================= SIDEBAR (FİLTRE PANELİ) ================= */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isFilterOpen ? 320 : 0, 
          opacity: isFilterOpen ? 1 : 0,
          borderRightWidth: isFilterOpen ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-20 h-screen bg-[#0A0A0C]/80 backdrop-blur-xl border-r border-white/5 overflow-hidden shrink-0 hidden lg:block"
      >
        <div className="w-[320px] p-8 flex flex-col h-full">
          
          {/* Sidebar Header */}
          <div className="flex items-center gap-3 text-white mb-8">
            <div className="p-2 bg-blue-600/20 rounded-lg text-blue-500">
               <Filter size={20} />
            </div>
            <h2 className="text-lg font-bold tracking-wide">FİLTRELER</h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
            {/* ARAMA */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-gray-500 tracking-widest uppercase flex items-center gap-2">
                <Search size={12} /> Ürün Ara
              </label>
              <div className="relative group">
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 pl-10 text-sm outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                  placeholder="Model adı yazın..."
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
              </div>
            </div>

            {/* KATEGORİLER */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-gray-500 tracking-widest uppercase flex items-center gap-2">
                <Layers size={12} /> Kategoriler
              </label>
              <div className="flex flex-col gap-1">
                <CategoryButton 
                  label="Tüm Koleksiyon" 
                  isActive={selectedCategory === "all"} 
                  onClick={() => setSelectedCategory("all")} 
                />
                {categories.map((cat) => (
                  <CategoryButton 
                    key={cat.id} 
                    label={cat.name} 
                    isActive={selectedCategory === cat.name} 
                    onClick={() => setSelectedCategory(cat.name)} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* SIFIRLA BUTTON */}
          <button 
            onClick={() => {setSearch(""); setSelectedCategory("all");}}
            className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all text-xs font-bold tracking-wide"
          >
            <RotateCcw size={14} /> FİLTRELERİ SIFIRLA
          </button>
        </div>
      </motion.aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10 scrollbar-hide">
        
        {/* Toggle Button (Floating) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="fixed left-6 bottom-6 z-50 bg-blue-600/90 backdrop-blur-md text-white w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-white/10 hover:bg-blue-500 transition-colors hidden lg:flex"
        >
          {isFilterOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </motion.button>

        {/* Header Area */}
        <div className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-lg border-b border-white/5 px-8 py-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
           <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                Commitra <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">3D</span>
              </h1>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <Box size={14} className="text-blue-500"/>
                Premium 3D Model Market
              </p>
           </div>
           
           <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
              <Grid size={16} className="text-gray-400" />
              <span className="text-xs font-mono text-gray-300">
                {loading ? "..." : filteredProducts.length} SONUÇ
              </span>
           </div>
        </div>

        {/* Content Grid */}
        <div className="p-8 pb-32">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <div className="relative w-16 h-16">
                 <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                 <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <span className="text-sm font-mono text-gray-500 animate-pulse">VERİLER YÜKLENİYOR...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-40 text-center">
               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <Search size={32} className="text-gray-600" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Sonuç Bulunamadı</h3>
               <p className="text-gray-500 max-w-xs">Aradığınız kriterlere uygun ürün bulunmamaktadır. Filtreleri temizlemeyi deneyin.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Kartın etrafına hover efekti için wrapper */}
                    <div className="h-full group relative hover:-translate-y-2 transition-transform duration-300">
                       <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500" />
                       <div className="relative h-full bg-[#0E0E12] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                          <ProductCard product={product} />
                       </div>
                    </div>
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

/* =======================================
   YARDIMCI COMPONENT: KATEGORİ BUTONU
   ======================================= */
function CategoryButton({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group overflow-hidden ${
        isActive 
          ? "text-white bg-blue-600 shadow-lg shadow-blue-900/50" 
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <div className="relative z-10 flex items-center justify-between">
        <span>{label}</span>
        {isActive && (
          <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
        )}
      </div>
      
      {/* Hover Light Effect */}
      {!isActive && (
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </button>
  );
}