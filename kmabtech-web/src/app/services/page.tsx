"use client";

import { useEffect, useState, useRef } from "react";
import { api } from "@/services/api";
import { Service } from "@/lib/types";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Zap,
  Shield,
  Code,
  GitBranch,
  Database,
  Globe,
  Cpu,
  Terminal,
  Server,
  Smartphone,
} from "lucide-react";
import { JSX } from "react";

// =============================
// HELPER: İkon ve Tema
// =============================
const getIcon = (title: string) => {
  if (title.includes("Web")) return <Globe className="w-6 h-6" />;
  if (title.includes("Yazılım")) return <Code className="w-6 h-6" />;
  if (title.includes("Mobil")) return <Smartphone className="w-6 h-6" />;
  if (title.includes("Siber") || title.includes("Güvenlik")) return <Shield className="w-6 h-6" />;
  if (title.includes("Masaüstü")) return <Terminal className="w-6 h-6" />;
  if (title.includes("Veri") || title.includes("Yapay")) return <Database className="w-6 h-6" />;
  if (title.includes("Sunucu") || title.includes("Cloud")) return <Server className="w-6 h-6" />;
  return <Zap className="w-6 h-6" />;
};

const getTheme = (index: number) => {
  const themes = [
    { color: "text-cyan-400", border: "border-cyan-500/50", shadow: "shadow-cyan-500/20", bg: "bg-cyan-500/10", gradient: "from-cyan-500" },
    { color: "text-purple-400", border: "border-purple-500/50", shadow: "shadow-purple-500/20", bg: "bg-purple-500/10", gradient: "from-purple-500" },
    { color: "text-emerald-400", border: "border-emerald-500/50", shadow: "shadow-emerald-500/20", bg: "bg-emerald-500/10", gradient: "from-emerald-500" },
    { color: "text-pink-400", border: "border-pink-500/50", shadow: "shadow-pink-500/20", bg: "bg-pink-500/10", gradient: "from-pink-500" },
  ];
  return themes[index % themes.length];
};

// =============================
// ANA SAYFA (Sadece Veri Çeker ve Loading Yönetir)
// =============================
export default function ServicesPage() {
  const [services, setServices] = useState<Service[] | null>(null);

  useEffect(() => {
    api.getServices()
      .then(setServices)
      .catch((err) => console.error("Services load error:", err));
  }, []);

  if (!services) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-400 font-mono text-sm animate-pulse">System Initializing...</span>
        </div>
      </div>
    );
  }

  // Veri geldikten sonra içeriği render et (Ref hatasını çözen kısım burası)
  return <ServicesContent services={services} />;
}

// =============================
// İÇERİK BİLEŞENİ (Animasyon ve Ref Burada)
// =============================
function ServicesContent({ services }: { services: Service[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // useScroll artık güvenli, çünkü bu bileşen sadece veri varsa render ediliyor
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden font-sans selection:bg-blue-500/30">
      {/* ARKA PLAN EFEKTLERİ */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      {/* CONTAINER REF BURADA */}
      <div className="relative z-10 container mx-auto px-4 py-24" ref={containerRef}>
        
        {/* HEADER */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">Algoritma & Servis Ağacı</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Dijital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500">Çözümlerimiz</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            {"<Commitra />"} olarak, karmaşık problemleri zarif kod yapılarına dönüştürüyoruz. İşte teknoloji yığınımız:
          </p>
        </div>

        {/* TIMELINE YAPISI */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* ORTA ÇİZGİ */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] md:-ml-[1px] bg-white/10 h-full">
            <motion.div 
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-cyan-400 to-purple-500 shadow-[0_0_20px_2px_rgba(59,130,246,0.5)]"
            />
          </div>

          <div className="space-y-12 md:space-y-24 pb-20">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              const theme = getTheme(index);

              return (
                <div key={service.id} className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* NODE NOKTASI */}
                  <div className="absolute left-[20px] md:left-1/2 -ml-[20px] md:-ml-[20px] w-10 h-10 rounded-full bg-[#050505] border border-white/20 z-20 flex items-center justify-center shadow-xl">
                    <div className={`w-3 h-3 rounded-full ${theme.bg.replace('/10','')} shadow-[0_0_10px_currentColor] ${theme.color}`} />
                  </div>

                  <div className="hidden md:block w-5/12" />

                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="w-full pl-16 md:pl-0 md:w-5/12"
                  >
                    <ServiceCard service={service} theme={theme} />
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================
// KART BİLEŞENİ (Değişmedi)
// =============================
function ServiceCard({ service, theme }: { service: Service; theme: any }) {
  return (
    <div className="group relative">
      <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${theme.gradient} to-transparent opacity-20 blur transition duration-500 group-hover:opacity-60`} />
      
      <div className="relative h-full bg-[#0a0a0c] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div className={`p-3 rounded-xl ${theme.bg} border ${theme.border} backdrop-blur-sm`}>
            <span className={theme.color}>
              {getIcon(service.titleTr)}
            </span>
          </div>
          <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
             ID: {String(service.id).padStart(3, '0')}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
          {service.titleTr}
        </h3>
        
        <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-6">
          {service.descriptionTr}
        </p>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
           {['High Performance', 'Scalable', 'Secure'].map((tag, i) => (
             <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 text-gray-500 border border-white/5">
                {tag}
             </span>
           ))}
        </div>

        <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${theme.gradient} to-transparent opacity-10 rounded-tr-2xl`} />
      </div>
    </div>
  );
}