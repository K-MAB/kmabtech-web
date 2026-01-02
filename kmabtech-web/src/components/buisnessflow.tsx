"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  PenTool, 
  Code2, 
  TestTube2, 
  Rocket, 
  ArrowRight 
} from "lucide-react";

// =============================
// VERİ & İÇERİK (ZENGİNLEŞTİRİLDİ)
// =============================
const workflowSteps = [
  {
    id: "01",
    title: "Keşif & Strateji",
    description: "Projenin hedeflerini, hedef kitleyi ve teknik gereksinimleri analiz ederek detaylı bir yol haritası (roadmap) çıkarırız.",
    icon: Search,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50"
  },
  {
    id: "02",
    title: "UX/UI Tasarım",
    description: "Kullanıcı deneyimini (UX) merkeze alarak, markanıza uygun modern ve etkileyici arayüz tasarımları (UI) hazırlarız.",
    icon: PenTool,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "group-hover:border-purple-500/50"
  },
  {
    id: "03",
    title: "Agile Geliştirme",
    description: "Sprintler halinde, ölçeklenebilir ve temiz kod mimarisi ile yazılımı inşa ederiz. Süreç boyunca şeffaf iletişim kurarız.",
    icon: Code2,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "group-hover:border-indigo-500/50"
  },
  {
    id: "04",
    title: "QA & Test",
    description: "Otomasyon testleri, güvenlik taramaları ve performans testleri ile hatasız bir ürün deneyimi garanti ederiz.",
    icon: TestTube2,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "group-hover:border-pink-500/50"
  },
  {
    id: "05",
    title: "DevOps & Lansman",
    description: "CI/CD süreçleriyle kesintisiz canlıya alma (deployment) sağlar, sunucu optimizasyonu ve 7/24 destek sunarız.",
    icon: Rocket,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "group-hover:border-green-500/50"
  }
];

// =============================
// ANA COMPONENT
// =============================
export default function WorkFlowSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Arka Plan Dekoru (Opsiyonel) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Başlık Alanı */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-500/10 rounded-full"
          >
            Nasıl Çalışıyoruz?
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight"
          >
            Fikirden Ürüne <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              5 Adımlı Mükemmellik
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Sadece kod yazmıyoruz; işinizi büyütmek için stratejik bir teknoloji ortaklığı kuruyoruz. İşte başarıya giden yol haritamız.
          </motion.p>
        </div>

        {/* Kartlar Grid Yapısı */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative p-6 rounded-2xl border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${step.border} border-border`}
            >
              {/* Arka Plandaki Dev Numara (01, 02...) */}
              <div className="absolute right-4 top-4 text-6xl font-black text-foreground/5 select-none transition-colors group-hover:text-foreground/10">
                {step.id}
              </div>

              {/* İkon */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${step.bg} ${step.color}`}>
                <step.icon size={24} />
              </div>

              {/* İçerik */}
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Bağlantı Çizgisi (Sadece Desktop ve son eleman hariç) */}
              {index !== workflowSteps.length - 1 && (
                <div className="hidden xl:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-muted-foreground/30">
                  <ArrowRight size={20} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}