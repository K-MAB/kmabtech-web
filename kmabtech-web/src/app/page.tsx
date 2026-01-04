"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Terminal, Cpu, Globe, Zap } from "lucide-react";
import ServicesTabs from "@/components/ServicesTabs";
import ReferencesCarousel from "@/components/ReferencesCarousel";
import Footer from "@/components/Footer";
import WorkFlowSection from "@/components/buisnessflow";
import { AnimateInView } from "@/components/AnimateInView";
import Cube from "@/components/cube"; // Assuming this exists as a 3D component
import ScrollingText from "@/components/CmdTerminal"; // Assuming this is the marquee

// Background Grid Component
const BackgroundGrid = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
  </div>
);

export default function HomePage() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND */}
      <BackgroundGrid />

      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* SOL TARAF: TEXT CONTENT */}
            <div className="flex flex-col justify-center text-center lg:text-left pt-10 lg:pt-0">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit mx-auto lg:mx-0 mb-6 backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold leading-tight mb-6"
              >
                Modern Yazılım <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 animate-gradient-x">
                   Çözümleriyle
                </span> <br />
                İşinizi Dönüştürün.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                İşletmenizi dijital dünyada bir adım öne taşımak için modern,
                ölçeklenebilir ve yüksek performanslı yazılım çözümleri sunuyoruz.
                Geleceğe hazır teknolojilerle işinizi en güçlü haline getiriyoruz.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              >
                <Link
                  href="/services"
                  className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    Hizmetleri Keşfet <ArrowRight size={18} />
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  Bize Ulaşın
                </Link>
              </motion.div>
            </div>

            {/* SAĞ TARAF: 3D CUBE & VISUALS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Arkadaki Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px]" />
              
              <div className="relative z-10 w-full max-w-md aspect-square">
                 <Cube /> 
              </div>

              {/* Dekoratif Yüzen Kartlar */}
              <FloatingCard icon={Terminal} text="Clean Code" top="10%" left="-10%" delay={1} />
              <FloatingCard icon={Cpu} text="AI Powered" bottom="20%" right="-5%" delay={1.5} />
              <FloatingCard icon={Globe} text="Global Scale" top="40%" right="-20%" delay={2} />
            </motion.div>

          </div>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="animate-bounce" />
        </motion.div>
      </section>

      {/* ============ MARQUEE SECTION ============ */}
    

      {/* ============ HİZMETLER ============ */}
      <section className="relative py-24 z-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <AnimateInView className="container mx-auto px-4">
           {/* Section Header */}
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                 Neler <span className="text-blue-500">Yapıyoruz?</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                 Uçtan uca dijital dönüşüm için ihtiyacınız olan tüm teknoloji yığını tek bir çatı altında.
              </p>
           </div>
           <ServicesTabs />
        </AnimateInView>
      </section>

      {/* ============ İŞ AKIŞI (WORKFLOW) ============ */}
      <div className="relative z-10">
         <WorkFlowSection />
      </div>

      {/* ============ REFERANSLAR ============ */}
      <section className="relative py-24 z-10 overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
        
        <AnimateInView className="container mx-auto px-4">
           <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                 Bize <span className="text-purple-500">Güvenenler</span>
              </h2>
           </div>
           <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
             <ReferencesCarousel />
           </div>
        </AnimateInView>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-10 border-t border-white/10 bg-[#020205]">
        <Footer />
      </footer>

    </div>
  );
}

// Helper: Yüzen Dekoratif Kartlar
function FloatingCard({ icon: Icon, text, top, left, right, bottom, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className="absolute hidden lg:flex items-center gap-3 px-4 py-3 bg-[#101015]/80 border border-white/10 rounded-xl backdrop-blur-md shadow-2xl"
      style={{ top, left, right, bottom }}
    >
      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
        <Icon size={20} />
      </div>
      <span className="text-sm font-semibold text-gray-200">{text}</span>
    </motion.div>
  );
}