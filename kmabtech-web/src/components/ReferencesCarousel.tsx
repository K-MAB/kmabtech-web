"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { api } from "@/services/api";
import { Reference } from "@/lib/types";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MousePointer2 } from "lucide-react";

export default function ReferencesSpotlight() {
  const [references, setReferences] = useState<Reference[]>([]);

  useEffect(() => {
    api.getReferences()
      .then(setReferences)
      .catch(console.error);
  }, []);

  if (!references || references.length === 0) return null;

  return (
    <section className="relative py-32 bg-black overflow-hidden selection:bg-blue-500/30">
      
      {/* GLOBAL ARKA PLAN IŞIKLARI */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent opacity-40 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" /> {/* Noise texture varsa */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-24">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 font-mono mb-6"
          >
             <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"/>
             MÜŞTERİLERİMİZİN DAİMA YANINDAYIZ
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Referanslarımız</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Firmaların dijital dönüşüm yolculuklarında onlara güç veriyoruz.
          </p>
        </div>

        {/* SPOTLIGHT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {references.map((ref) => (
            <SpotlightCard key={ref.id} reference={ref} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* =========================================
   SPOTLIGHT CARD COMPONENT (Sihir Burada)
   ========================================= */
function SpotlightCard({ reference }: { reference: Reference }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative border border-white/10 bg-gray-900/20 overflow-hidden rounded-3xl"
      onMouseMove={handleMouseMove}
    >
      {/* 1. SPOTLIGHT EFFECT (Mouse'u takip eden ışık) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* 2. KART İÇERİĞİ */}
      <div className="relative h-full min-h-[280px] p-8 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl transition-all duration-500 hover:bg-black/20">
        
        {/* Dekoratif Izgara (Sadece Hover'da görünür) */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 bg-center" />
        
        {/* Logo Container */}
        <div className="relative z-10 w-full h-32 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
           <div className="relative w-48 h-24 filter grayscale contrast-50 opacity-50 transition-all duration-500 group-hover:filter-none group-hover:opacity-100 group-hover:scale-110">
             <Image
                src={reference.logoUrl.startsWith("http") ? reference.logoUrl : `${api.baseUrl}${reference.logoUrl}`}
                alt={reference.companyName}
                fill
                className="object-contain drop-shadow-2xl"
             />
           </div>
        </div>

        {/* Metin Bilgisi */}
        <div className="absolute bottom-8 left-0 right-0 text-center opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
           <h3 className="text-white font-bold text-lg tracking-wide">{reference.companyName}</h3>
           <p className="text-blue-500/80 text-xs uppercase font-mono mt-1 tracking-widest">Çözüm Ortağı</p>
        </div>
        
        {/* Köşe Işıltısı */}
        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
           <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        </div>

      </div>
    </div>
  );
}