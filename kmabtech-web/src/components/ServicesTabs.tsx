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
  CheckCircle2,
  Database,
  Globe
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import VSCodeEditor from "@/components/VSCodeEditor";
import { useTheme } from "@/components/Theme/ThemeProvider";

// =============================
// 1. ZENGİNLEŞTİRİLMİŞ UZUN KOD İÇERİKLERİ
// =============================
const getCodeSnippet = (title: string) => {
  switch (title.toLowerCase()) {
    case "yapay zeka çözümleri":
      return `import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np
import pandas as pd

# Kmabtech Enterprise AI Engine v4.2
# High-Performance Neural Network for Predictive Analysis

class DeepLearningModel:
    def __init__(self, input_shape, num_classes):
        self.input_shape = input_shape
        self.num_classes = num_classes
        self.model = self._build_architecture()

    def _build_architecture(self):
        """Constructs the deep neural network layers with optimization"""
        print("[INFO] Initializing neural architecture...")
        model = models.Sequential()
        
        # Feature Extraction Block (Convolutional)
        model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=self.input_shape))
        model.add(layers.MaxPooling2D((2, 2)))
        model.add(layers.BatchNormalization())
        
        # Deep Learning Block
        model.add(layers.Conv2D(64, (3, 3), activation='relu'))
        model.add(layers.MaxPooling2D((2, 2)))
        model.add(layers.Dropout(0.25)) # Prevent overfitting
        
        # Dense Classification Layers
        model.add(layers.Flatten())
        model.add(layers.Dense(128, activation='relu'))
        model.add(layers.Dropout(0.5))
        model.add(layers.Dense(self.num_classes, activation='softmax'))
        
        print("[SUCCESS] Model architecture built successfully.")
        return model

    def train(self, x_train, y_train, epochs=50):
        """Executes the training pipeline"""
        print(f"[STATUS] Starting training pipeline for {epochs} epochs...")
        
        self.model.compile(optimizer='adam',
                          loss='sparse_categorical_crossentropy',
                          metrics=['accuracy'])
                          
        history = self.model.fit(
            x_train, y_train, 
            epochs=epochs, 
            validation_split=0.2,
            batch_size=64
        )
        return history

# Pipeline Execution
if __name__ == "__main__":
    ai_engine = DeepLearningModel((28, 28, 1), 10)
    print("AI System Ready for Data Ingestion...")`;

    case "web geliştirme":
      return `"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Card, Metric } from '@kmabtech/ui';

// Kmabtech Enterprise Dashboard Component
// Real-time data visualization and user management interface

export default function AnalyticsDashboard({ initialData }: { initialData: any }) {
  const [metrics, setMetrics] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  // Real-time WebSocket connection for live updates
  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);
    
    socket.onopen = () => {
      console.log('[SYSTEM] Connected to real-time stream');
    };

    socket.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setMetrics(prev => ({
        ...prev,
        activeUsers: update.activeUsers,
        serverLoad: update.cpuUsage,
        revenue: update.currentRevenue
      }));
    };

    return () => socket.close();
  }, []);

  if (isLoading) return <div className="animate-pulse h-96 bg-zinc-900 rounded-xl" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-black/50 backdrop-blur-xl">
      {/* Revenue Metric Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl"
      >
        <h3 className="text-zinc-400 font-medium mb-2">Total Monthly Revenue</h3>
        <div className="flex items-baseline gap-3">
           <span className="text-4xl font-bold text-white">
             \${metrics.revenue.toLocaleString()}
           </span>
           <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold">
             +20.1%
           </span>
        </div>
      </motion.div>
      
      {/* Main Chart Area */}
      <div className="md:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
         <h3 className="text-white font-semibold mb-4">User Growth Traffic</h3>
         <AreaChart 
            data={metrics.history} 
            categories={['users', 'sessions']} 
            colors={['blue', 'purple']}
         />
      </div>
    </div>
  );
}`;

    case "yapay zeka entegrasyonu":
        return `import { OpenAI } from "openai";
import { VectorStore } from "./lib/vector-store";
import { RateLimiter } from "./middleware/rate-limit";

// Kmabtech RAG (Retrieval-Augmented Generation) API
// Handles context-aware AI responses for enterprise data

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message, contextId } = await req.json();
    
    // 1. Security Check
    const isAllowed = await RateLimiter.check(req.headers.get("x-ip"));
    if (!isAllowed) return new Response("Rate limit exceeded", { status: 429 });

    console.log(\`[AI-AGENT] Processing query for context: \${contextId}\`);

    // 2. Retrieve Semantic Context
    const vectorStore = new VectorStore("kmabtech-index");
    const relevantDocs = await vectorStore.similaritySearch(message, 3);
    
    const contextBlock = relevantDocs.map(doc => doc.content).join("\\n");

    // 3. Generate Response
    const stream = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { 
          role: "system", 
          content: \`You are an expert AI assistant. Use this context: \${contextBlock}\` 
        },
        { role: "user", content: message }
      ],
      stream: true,
      temperature: 0.2
    });

    // 4. Stream to Client
    return new Response(stream.toReadableStream());

  } catch (error) {
    console.error("[CRITICAL] AI Service Error:", error);
    return new Response(JSON.stringify({ error: "Service unavailable" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}`;

    case "siber güvenlik":
        return `#!/bin/bash
# Kmabtech Automated Security Hardening Suite v3.1
# Targets: Linux Servers (Debian/Ubuntu/CentOS)

LOG_FILE="/var/log/kmabtech_hardening.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

log "Starting security audit and hardening process..."

# 1. Network Security & Firewall Configuration
log "Configuring UFW Firewall Rules..."
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
# Block common attack vectors
ufw deny 23/tcp  # Telnet
ufw deny 21/tcp  # FTP
ufw --force enable

# 2. SSH Hardening (CIS Benchmark Compliance)
log "Applying SSH Security Policies..."
SSH_CONFIG="/etc/ssh/sshd_config"
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' $SSH_CONFIG
sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' $SSH_CONFIG
sed -i 's/#MaxAuthTries 6/MaxAuthTries 3/' $SSH_CONFIG
sed -i 's/#LoginGraceTime 2m/LoginGraceTime 60/' $SSH_CONFIG
systemctl restart sshd

# 3. Intrusion Detection Setup
if ! command -v fail2ban-client &> /dev/null; then
    log "Installing Fail2Ban Intrusion Prevention..."
    apt-get update && apt-get install -y fail2ban
    
    # Configure Jail
    cat > /etc/fail2ban/jail.local << EOL
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
EOL
    systemctl restart fail2ban
fi

log "Security hardening completed successfully. System requires reboot."
exit 0`;

    default:
      return `// Loading source code...
// Please wait while we fetch the repository content.`;
  }
};

// =============================
// YARDIMCI FONKSİYONLAR
// =============================
const getIcon = (title: string) => {
  if (title.includes("Web")) return <LayoutTemplate className="w-5 h-5" />;
  if (title.includes("Yapay") || title.includes("Entegrasyon")) return <Cpu className="w-5 h-5" />;
  if (title.includes("Siber")) return <ShieldCheck className="w-5 h-5" />;
  return <Terminal className="w-5 h-5" />;
};

const getFileName = (title: string) => {
    if (title.includes("Web")) return "Dashboard.tsx";
    if (title.includes("Entegrasyon")) return "route.ts";
    if (title.includes("Siber")) return "hardening.sh";
    return "model_training.py";
};

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
    <section className="relative py-24 overflow-hidden min-h-[1000px] flex flex-col justify-center">
      
      {/* 1. ARKA PLAN: Dinamik Aurora Efekti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r ${activeService?.titleTr.includes("Yapay") ? "from-purple-600/20" : "from-blue-600/20"} to-transparent rounded-full blur-[120px] transition-colors duration-1000`} />
        <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-l ${activeService?.titleTr.includes("Siber") ? "from-emerald-600/20" : "from-cyan-600/20"} to-transparent rounded-full blur-[120px] transition-colors duration-1000`} />
        {/* Izgara Deseni */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-[0.07]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* 2. BAŞLIK ALANI */}
        <div className="text-center mb-16">
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
        <div className="flex justify-center mb-20">
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

        {/* 4. İÇERİK SAHNESİ */}
        <AnimatePresence mode="wait">
          {activeService && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              
              {/* SOL: METİN İÇERİĞİ */}
              <motion.div
                key={`text-${activeService.id}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-8 lg:pr-8"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${activeColor} border backdrop-blur-sm`}>
                  {getIcon(activeService.titleTr)}
                </div>

                <div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    {activeService.titleTr}
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {activeService.descriptionTr}
                  </p>
                </div>

                {/* Özellik Listesi */}
                <div className="space-y-4 pt-4">
                  {[
                      "Endüstri standartlarında ölçeklenebilir mimari", 
                      "Yüksek performanslı veri işleme pipeline'ları",
                      "Enterprise seviye güvenlik protokolleri"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-base font-medium text-foreground/90">
                      <CheckCircle2 className={`w-6 h-6 ${activeColor.split(' ')[0]}`} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <Link 
                    href="/services"
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold transition-all hover:scale-105 hover:shadow-2xl bg-gradient-to-r ${
                      activeService.titleTr.includes("Yapay") ? "from-purple-600 to-indigo-600 shadow-purple-500/30" :
                      activeService.titleTr.includes("Siber") ? "from-emerald-600 to-teal-600 shadow-emerald-500/30" :
                      "from-blue-600 to-cyan-600 shadow-blue-500/30"
                    } shadow-lg`}
                  >
                    Detaylı İncele <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>

              {/* SAĞ: KOD EDİTÖRÜ (3D Perspective & BÜYÜTÜLMÜŞ) */}
              <motion.div
                key={`code-${activeService.id}`}
                initial={{ opacity: 0, scale: 0.95, rotateY: 5 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: -5 }}
                transition={{ duration: 0.6 }}
                className="relative perspective-1000 group w-full"
              >
                {/* Arka Plandaki Glow Efekti */}
                <div className={`absolute -inset-4 bg-gradient-to-r ${
                  activeService.titleTr.includes("Yapay") ? "from-purple-500/20" : 
                  activeService.titleTr.includes("Siber") ? "from-emerald-500/20" : 
                  "from-blue-500/20"
                } to-transparent rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                {/* Editör Penceresi - YÜKSEKLİK ARTIRILDI (h-[600px]) */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e0e10] shadow-2xl ring-1 ring-white/5">
                  
                  {/* Pencere Başlığı */}
                  <div className="flex items-center justify-between px-6 py-4 bg-[#18181b] border-b border-white/5 backdrop-blur-md">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors shadow-sm" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors shadow-sm" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors shadow-sm" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground/60 flex items-center gap-2">
                      <Code2 size={12} />
                      kmabtech-core / src / {getFileName(activeService.titleTr)}
                    </div>
                    <div className="w-10"></div> {/* Spacer for symmetry */}
                  </div>

                  {/* Kod İçeriği - YÜKSEKLİK ARTIRILDI */}
                  <div className="relative h-[600px] overflow-hidden bg-[#0e0e10]">
                    <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
                      <VSCodeEditor
                        code={getCodeSnippet(activeService.titleTr)}
                        fileName={getFileName(activeService.titleTr)}
                      />
                    </div>
                    
                    {/* Alt Gradient Fade (Daha yumuşak) */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0e0e10] to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Yüzen Badge */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 px-5 py-3 rounded-xl bg-[#18181b] shadow-2xl border border-white/10 flex items-center gap-3 z-20"
                >
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <span className="text-sm font-semibold text-white">Production Ready</span>
                </motion.div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}