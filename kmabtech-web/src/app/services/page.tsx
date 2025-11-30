"use client";

import { useApi } from "@/lib/useApi";
import { Service } from "@/lib/types";
import { motion } from "framer-motion";
import { Zap, Shield, Code, GitBranch, Database, Globe, Cpu } from "lucide-react";

export default function ServicesPage() {
  const { data: services } = useApi<Service[]>("/Services");

  const icons: Record<string, JSX.Element> = {
    Web: <Globe size={40} className="text-cyan-400" />,
    Yazılım: <Code size={40} className="text-blue-400" />,
    Mobil: <Zap size={40} className="text-yellow-400" />,
    Siber: <Shield size={40} className="text-red-400" />,
    Masaüstü: <GitBranch size={40} className="text-green-400" />,
    Veri: <Database size={40} className="text-purple-400" />,
  };

  if (!services) return <div className="min-h-screen bg-[#00002b] flex items-center justify-center text-white">Sistem Yükleniyor...</div>;

  return (
    <div
      className="min-h-screen py-24 px-4 sm:px-8 overflow-hidden relative"
      style={{
        background: "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,43,1) 35%, rgba(0,14,18,1) 100%)",
      }}
    >
      <div className="text-center mb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block p-3 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm"
        >
          <Cpu className="text-cyan-400 w-8 h-8" />
        </motion.div>
        <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
          Hizmetlerimiz
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          {"<KMABTech />"}
        </p>
      </div>

      {/* --- ALGORİTMA AĞACI YAPISI --- */}
      <div className="max-w-7xl mx-auto relative">
        
        {/* MERKEZİ OMURGA (ANA HAT) */}
        {/* Masaüstünde ortada, mobilde solda çizgi */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] md:-ml-[1px] bg-gradient-to-b from-cyan-500/20 via-blue-500/50 to-purple-500/20 h-full">
            <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "linear" }}
                className="w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
            />
        </div>

        <div className="space-y-24">
          {services.map((service, index) => {
            const isEven = index % 2 === 0; // Masaüstünde: Çiftler SOL, Tekler SAĞ

            return (
              <div 
                key={service.id} 
                className={`relative flex items-center md:justify-between ${
                    // Mobilde hepsi sağa yaslansın (pl-20), Masaüstünde normal
                    "flex-col md:flex-row" 
                }`}
              >
                {/* --- MASAÜSTÜ İÇİN BOŞLUK DÜZENİ --- */}
                {/* Eğer Çift ise: Kutu (Sol) - Boşluk (Sağ) */}
                {/* Eğer Tek ise: Boşluk (Sol) - Kutu (Sağ) */}
                
                {/* SOL TARAFTAKİ ALAN (Masaüstü) */}
                <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? "order-2 md:order-1" : "order-2 md:order-1 md:invisible"}`}>
                   {isEven && <ServiceCard service={service} icons={icons} dir="left" />}
                </div>

                {/* --- MERKEZİ DÜĞÜM (NODE) --- */}
                <div className="absolute left-8 md:left-1/2 -ml-[9px] md:-ml-[10px] w-5 h-5 md:w-5 md:h-5 rounded-full bg-[#00002b] border-2 border-cyan-400 z-10 shadow-[0_0_10px_cyan] flex items-center justify-center order-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                </div>

                {/* SAĞ TARAFTAKİ ALAN (Masaüstü) */}
                <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${!isEven ? "order-2 md:order-3" : "order-2 md:order-3 md:invisible"}`}>
                   {!isEven && <ServiceCard service={service} icons={icons} dir="right" />}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- KART BİLEŞENİ VE BAĞLANTI ÇİZGİSİ ---
function ServiceCard({ service, icons, dir }: { service: Service, icons: any, dir: "left" | "right" }) {
    return (
        <div className="relative group">
            
            {/* BAĞLANTI KOLU (Connector) */}
            {/* Karttan merkeze giden yatay çizgi */}
            <motion.div 
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "100%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`
                    absolute top-1/2 h-[2px] bg-cyan-500/50 shadow-[0_0_8px_rgba(0,255,255,0.3)]
                    hidden md:block w-[10%] pointer-events-none
                    ${dir === "left" ? "-right-[12%] w-[12%]" : "-left-[12%] w-[12%]"}
                `}
            />

            {/* KARTIN KENDİSİ */}
            <motion.div
                initial={{ opacity: 0, x: dir === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative z-20"
            >
                <div className="
                    relative overflow-hidden rounded-2xl p-[1px]
                    bg-gradient-to-br from-cyan-500/40 via-blue-500/20 to-transparent
                    hover:from-cyan-400 hover:via-purple-500 hover:to-blue-500
                    transition-all duration-500 group-hover:scale-[1.02]
                ">
                    <div className="bg-[#0a0a16]/90 backdrop-blur-xl rounded-2xl p-8 h-full min-h-[280px] flex flex-col justify-center relative">
                        
                        {/* Arka Plan Dekorasyon (Circuit Lines) */}
                        <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full -mr-16 -mt-16 blur-2xl transition-all group-hover:bg-cyan-400/20" />

                        <div className="flex items-center gap-5 mb-5 relative z-10">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-cyan-400/50 transition-colors">
                                {Object.keys(icons).find(key => service.titleTr.includes(key)) 
                                    ? icons[Object.keys(icons).find(key => service.titleTr.includes(key))!] 
                                    : <Zap size={32} className="text-gray-400" />}
                            </div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                                {service.titleTr}
                            </h3>
                        </div>

                        <p className="text-gray-400 text-base leading-relaxed relative z-10">
                            {service.descriptionTr}
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-cyan-500/80 group-hover:text-cyan-400 transition-colors cursor-pointer">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                            Sistemi İncele
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}