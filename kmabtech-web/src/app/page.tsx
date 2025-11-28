"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Code, Server } from "lucide-react";
import ServicesTabs from "@/components/ServicesTabs";
import ReferencesCarousel from "@/components/ReferencesCarousel";
import Footer from "@/components/Footer";
import { AnimateInView } from "@/components/AnimateInView";
import { ElementType } from "react";
import Cube from "@/components/cube";

export default function HomePage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(circle,rgba(2, 0, 36, 1) 0%, rgba(0, 0, 43, 1) 35%, rgba(0, 14, 18, 1) 100%)",
      }}
    >
      {/* ============ HERO SECTION ============ */}
      <section className="min-h-[calc(100vh-64px)] px-6 sm:px-8 lg:px-12 pt-28 sm:pt-20 lg:pt-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* SOL TARAF */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Modern Yazılım Çözümleriyle İşinizi Dönüştürün.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-lg mx-auto lg:mx-0">
              ASP.NET Core ve Next.js gücüyle kurumsal, hızlı ve güvenilir web siteleri geliştiriyoruz.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                href="/services"
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg 
                hover:bg-blue-700 transition transform hover:scale-105 border border-blue-500/50 text-center"
              >
                Hizmetleri Keşfet
              </Link>

              <Link
                href="/contact"
                className="px-8 py-3 border border-gray-400 text-gray-200 font-semibold rounded-full 
                hover:bg-white/10 transition text-center"
              >
                Bize Ulaşın
              </Link>
            </div>
          </motion.div>

          {/* ============ SAĞ TARAF – 3D KÜP ============ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="flex justify-center lg:justify-end mt-10 lg:mt-0"
          >
            <Cube />
          </motion.div>

        </div>
      </section>

      {/* ============ HİZMETLER ============ */}
      <div className="pt-10 pb-20">
        <AnimateInView delay={0.2} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesTabs />
        </AnimateInView>
      </div>

      {/* ============ İŞ AKIŞI ============ */}
      <div className="py-20 border-t border-white/10 bg-white/[0.02] backdrop-blur-sm">
        <AnimateInView delay={0.2} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white drop-shadow-lg">
            İş Akışımız ve Farkımız
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <InfoCard title="Planlama ve Analiz" description="Projenizi detaylı şekilde analiz ederiz." icon={Shield} />
            <InfoCard title="Geliştirme ve Entegrasyon" description="Modern teknolojilerle gelişmiş arayüzler oluştururuz." icon={Code} />
            <InfoCard title="Dağıtım ve Destek" description="Canlıya alma, optimizasyon ve güvenlik desteği sağlarız." icon={Server} />
          </div>

        </AnimateInView>
      </div>

      {/* ============ REFERANSLAR ============ */}
      <div className="pt-10 pb-20">
        <AnimateInView delay={0.2}>
          <ReferencesCarousel />
        </AnimateInView>
      </div>

      {/* ============ FOOTER ============ */}
      <div className="bg-black/50 backdrop-blur-md border-t border-white/10">
        <Footer />
      </div>

    </div>
  );
}

/* ===== INFO CARD ===== */
interface InfoCardProps {
  title: string;
  description: string;
  icon: ElementType;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon: Icon }) => (
  <div className="p-6 bg-black/20 backdrop-blur-md rounded-xl shadow-xl border border-white/10 hover:bg-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 text-center md:text-left">
    <Icon size={36} className="text-blue-400 mb-4 mx-auto md:mx-0" />
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);
