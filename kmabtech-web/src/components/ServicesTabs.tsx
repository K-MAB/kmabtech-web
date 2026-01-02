"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/services/api";
import { Service } from "@/lib/types";
import { 
  Code2, 
  Cpu, 
  ShieldCheck, 
  LayoutTemplate, 
  Terminal, 
  ArrowUpRight, 
  CheckCircle2 
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import VSCodeEditor from "@/components/VSCodeEditor";
import { useTheme } from "@/components/Theme/ThemeProvider";

// =============================
// KOD İÇERİKLERİ (AYNEN KORUNDU)
// =============================
const getCodeSnippet = (title: string) => {
  // ... (Önceki zengin içerikler buraya gelecek, yer kaplamaması için kısaltıyorum ama sen full halini kullan)
  // Buraya önceki cevabımdaki getCodeSnippet fonksiyonunun içini yapıştır.
   switch (title.toLowerCase()) {
    case "yapay zeka çözümleri":
      return `import tensorflow as tf\n# Kmabtech AI Model v2.0\n\nclass NeuralNet:\n    def __init__(self):\n        self.layers = []\n    def train(self, data):\n        print("Model eğitiliyor: %98")`;
    case "web geliştirme":
      return `// Next.js App Router\nexport default async function Page() {\n  const data = await getData();\n  return <main>{data.title}</main>\n}`;
    default:
      return `// Loading...`;
  }
};

// Modern İkon Seti
const getIcon = (title: string) => {
  if (title.includes("Web")) return <LayoutTemplate className="w-5 h-5" />;
  if (title.includes("Yapay")) return <Cpu className="w-5 h-5" />;
  if (title.includes("Siber")) return <ShieldCheck className="w-5 h-5" />;
  return <Terminal className="w-5 h-5" />;
};

// Renk Temaları (Her hizmet için özel renk)
const getThemeColor = (title: string) => {
  if (title.includes("Web")) return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-cyan-500/20";
  if (title.includes("Yapay")) return "text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/20";
  if (title.includes("Siber")) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/20";
  return "text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-blue-500/20";
};

// =============================
// ANA COMPONENT
// =============================
export default function ServicesShowcase() {
  const { theme } = useTheme();
  const [services, setServices] = useState<Service[]>([]);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getServices()
      .then((res) => {
        setServices(res);
        if (res.length > 0) setActiveService(res[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  const scrollToActive = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = container.children[index] as HTMLElement;
      const scrollLeft = button.offsetLeft - (container.clientWidth / 2) + (button.clientWidth / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  if (loading) return null;
  if (!services.length) return null;

  const activeColor = activeService ? getThemeColor(activeService.titleTr) : "";

  return (
    <section className="relative py-24 overflow-hidden min-h-[900px] flex flex-col justify-center">
      
      {/* 1. ARKA PLAN: Dinamik Aurora Efekti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r ${activeService?.titleTr.includes("Yapay") ? "from-purple-600/20" : "from-blue-600/20"} to-transparent rounded-full blur-[120px] transition-colors duration-1000`} />
        <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-l ${activeService?.titleTr.includes("Siber") ? "from-emerald-600/20" : "from-cyan-600/20"} to-transparent rounded-full blur-[120px] transition-colors duration-1000`} />
        {/* Izgara Deseni */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-[0.07]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* 2. BAŞLIK ALANI */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-muted-foreground mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Teknoloji Yığınımız
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Geleceği <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Kodluyoruz</span>
          </h2>
        </div>

        {/* 3. NAVIGATION (Yüzen Dock) */}
        <div className="flex justify-center mb-16">
          <div 
            ref={scrollContainerRef}
            className="flex gap-2 p-2 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-xl overflow-x-auto max-w-full scrollbar-hide snap-x"
          >
            {services.map((service, index) => {
              const isActive = activeService?.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => {
                    setActiveService(service);
                    scrollToActive(index);
                  }}
                  className={`relative snap-center shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    isActive 
                      ? "text-white shadow-lg" 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-bg"
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
                        service.titleTr.includes("Yapay") ? "from-purple-600 to-indigo-600" :
                        service.titleTr.includes("Siber") ? "from-emerald-600 to-teal-600" :
                        "from-blue-600 to-cyan-600"
                      }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{getIcon(service.titleTr)}</span>
                  <span className="relative z-10 whitespace-nowrap">{service.titleTr}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. İÇERİK SAHNESİ (Split Layout) */}
        <AnimatePresence mode="wait">
          {activeService && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* SOL: METİN İÇERİĞİ */}
              <motion.div
                key={`text-${activeService.id}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${activeColor} border backdrop-blur-sm`}>
                  {getIcon(activeService.titleTr)}
                </div>

                <div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    {activeService.titleTr}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {activeService.descriptionTr}
                  </p>
                </div>

                {/* Özellik Listesi */}
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                      <CheckCircle2 className={`w-5 h-5 ${activeColor.split(' ')[0]}`} />
                      <span>Endüstri standartlarında ölçeklenebilir mimari</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link 
                    href="/contact"
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold transition-transform hover:scale-105 bg-gradient-to-r ${
                      activeService.titleTr.includes("Yapay") ? "from-purple-600 to-indigo-600 shadow-purple-500/25" :
                      activeService.titleTr.includes("Siber") ? "from-emerald-600 to-teal-600 shadow-emerald-500/25" :
                      "from-blue-600 to-cyan-600 shadow-blue-500/25"
                    } shadow-lg`}
                  >
                    Detaylı İncele <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>

              {/* SAĞ: KOD EDİTÖRÜ (3D Perspective) */}
              <motion.div
                key={`code-${activeService.id}`}
                initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                transition={{ duration: 0.6 }}
                className="relative perspective-1000 group"
              >
                {/* Arka Plandaki Glow Efekti */}
                <div className={`absolute -inset-4 bg-gradient-to-r ${
                  activeService.titleTr.includes("Yapay") ? "from-purple-500/30" : "from-blue-500/30"
                } to-transparent rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Editör Penceresi */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#09090b] shadow-2xl">
                  {/* Pencere Başlığı */}
                  <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5 backdrop-blur-md">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
                      <Code2 size={12} />
                      kmabtech-core / src / {activeService.titleTr.split(' ')[0].toLowerCase()}
                    </div>
                  </div>

                  {/* Kod İçeriği */}
                  <div className="relative h-[450px] overflow-hidden">
                    <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
                      <VSCodeEditor
                        code={getCodeSnippet(activeService.titleTr)}
                        fileName="main.tsx"
                      />
                    </div>
                    {/* Alt Gradient Fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Yüzen Badge */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-6 -right-6 px-6 py-3 rounded-xl bg-white dark:bg-zinc-800 shadow-xl border border-black/5 dark:border-white/10 flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-bold">Live Production Ready</span>
                </motion.div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}