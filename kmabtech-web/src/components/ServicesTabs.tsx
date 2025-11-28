"use client";

import { useState, useEffect } from "react";
import { useApi } from "@/lib/useApi";
import { Service } from "@/lib/types";

import { Code, GitBranch, Zap, Shield } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import VSCodeEditor from "@/components/VSCodeEditor";

// =============================
//  Kod içerikleri
// =============================
const getCodeSnippet = (title: string) => {
  switch (title.toLowerCase()) {
    case "yapay zeka çözümleri":
      return `
import numpy as np
from tensorflow import keras

def build_model():
    model = keras.Sequential([
        keras.layers.Dense(128, activation='relu'),
        keras.layers.Dense(64, activation='relu'),
        keras.layers.Dense(1, activation='sigmoid'),
    ])

    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    return model

data = np.random.rand(200, 10)
labels = np.random.randint(0, 2, 200)

model = build_model()
model.fit(data, labels, epochs=25, batch_size=8)

print("Yapay zeka modeli başarıyla eğitildi!")
`;

    case "web geliştirme":
      return `
import React from "react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-6xl font-bold text-blue-400">
        Modern Web Geliştirme
      </h1>

      <p className="text-gray-300 mt-4 text-xl">
        Next.js + Tailwind CSS ile yüksek performanslı uygulamalar.
      </p>

      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg">
        Daha Fazla
      </button>
    </main>
  );
}
`;

    case "yapay zeka entegrasyonu":
      return `
import axios from "axios";

export async function analyzeImage(imageUrl) {
  const payload = {
    image: imageUrl,
    mode: "advanced",
    options: { face: true, objects: true }
  };

  const response = await axios.post(
    "https://api.kmabtech.ai/analyze",
    payload,
    { headers: { "x-api-key": "YOUR_KEY" } }
  );

  return response.data;
}

async function run() {
  console.log("Analiz başlıyor...");
  const result = await analyzeImage("test.png");
  console.log(result);
}

run();
`;

    case "siber güvenlik":
      return `
import scanner from "kmab-security";

async function scan() {
  const result = await scanner.run({
    url: "https://example.com",
    tests: ["xss", "sql-injection", "csrf"]
  });

  console.log(result.report);
}

scan();
`;

    case "sızma testi":
      return `
import pentest from "kmab-pentest";

async function startPentest() {
  console.log("Sızma testi başlıyor...");

  const result = await pentest.run({
    target: "192.168.1.20",
    mode: "full-scan",
    attackLevel: "high",
  });

  console.log("Rapor:");
  console.log(result);
}

startPentest();
`;

    case "masaüstü uygulama geliştirme":
      return `
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    backgroundColor: "#1e1e1e",
  });

  win.loadURL("https://kmabtech.com");
}

app.whenReady().then(createWindow);
`;

    default:
      return `// Kod bulunamadı...`;
  }
};

// =============================
//  Ana Component
// =============================
export default function ServicesTabs() {
  const { data: services } = useApi<Service[]>("/Services");
  const [activeService, setActiveService] = useState<Service | null>(null);

  useEffect(() => {
    if (services && services.length > 0 && !activeService) {
      setActiveService(services[0]);
    }
  }, [services]);

  if (!services) return null;

  return (
    <section className="py-20">
      <h2 className="text-5xl font-bold text-center mb-16 text-gray-200">
        Geliştirme Alanlarımız
      </h2>

      {/* ⭐ ANA CONTAINER */}
      <div
        className="
        max-w-[1600px] mx-auto rounded-2xl p-[3px]
        bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600
        shadow-[0_0_60px_25px_rgba(88,28,135,0.45)]
        "
      >
        <div className="rounded-2xl bg-gray-900 border border-gray-700 p-10">

          {/* ⭐ TABS */}
          <div className="flex space-x-3 overflow-x-auto mb-10">
            {services.map((service) => (
              <motion.button
                key={service.id}
                layout
                onClick={() => setActiveService(service)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-lg text-base transition-all
                  ${
                    activeService?.id === service.id
                      ? "bg-blue-600 text-white shadow-xl"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }
                `}
                transition={{
                  ease: [0.22, 1, 0.36, 1],
                  duration: 0.6,
                }}
              >
                {service.titleTr.includes("Web") && <Code size={18} />}
                {service.titleTr.includes("Yapay") && <Zap size={18} />}
                {service.titleTr.includes("Siber") && <Shield size={18} />}
                {service.titleTr.includes("Masaüstü") && <GitBranch size={18} />}
                <span>{service.titleTr}</span>
              </motion.button>
            ))}
          </div>

          {/* ⭐ CONTENT + EDITOR */}
          <AnimatePresence mode="wait">
            {activeService && (
              <>
                {/* ⭐ EDITOR */}
                <motion.div
                  key={activeService.titleTr + "-editor"}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{
                    duration: 3.0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mb-12"
                >
                  <VSCodeEditor
                    code={getCodeSnippet(activeService.titleTr)}
                    fileName={activeService.titleTr + ".ts"}
                  />
                </motion.div>

                {/* ⭐ YAZI ALTA */}
                <motion.div
                  key={activeService.titleTr + "-content"}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-center"
                >
                  <h3 className="text-4xl font-bold mb-3">
                    {activeService.titleTr}
                  </h3>

                  <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
                    {activeService.descriptionTr}
                  </p>

                  <Link
                    href="/contact"
                    className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-lg"
                  >
                    Detaylı Teklif Al
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
