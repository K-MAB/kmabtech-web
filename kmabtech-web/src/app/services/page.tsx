"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Service } from "@/lib/types";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Code,
  GitBranch,
  Database,
  Globe,
  Cpu,
} from "lucide-react";
import { JSX } from "react";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[] | null>(null);

  useEffect(() => {
    api
      .getServices()
      .then(setServices)
      .catch((err) => {
        console.error("Services load error:", err);
      });
  }, []);

  const icons: Record<string, JSX.Element> = {
    Web: <Globe size={40} className="text-cyan-400" />,
    Yazılım: <Code size={40} className="text-blue-400" />,
    Mobil: <Zap size={40} className="text-yellow-400" />,
    Siber: <Shield size={40} className="text-red-400" />,
    Masaüstü: <GitBranch size={40} className="text-green-400" />,
    Veri: <Database size={40} className="text-purple-400" />,
  };

  if (!services) {
    return (
      <div className="min-h-screen bg-[#00002b] flex items-center justify-center text-white">
        Sistem Yükleniyor...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-24 px-4 sm:px-8 overflow-hidden relative"
      style={{
        background:
          "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,43,1) 35%, rgba(0,14,18,1) 100%)",
      }}
    >
      {/* BAŞLIK */}
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
          {"<Commitra />"}
        </p>
      </div>

      {/* ALGORİTMA AĞACI */}
      <div className="max-w-7xl mx-auto relative">
        {/* MERKEZ ÇİZGİ */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] md:-ml-[1px] bg-gradient-to-b from-cyan-500/20 via-blue-500/50 to-purple-500/20">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
          />
        </div>

        <div className="space-y-24">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className="relative flex flex-col md:flex-row items-center"
              >
                {/* SOL */}
                <div
                  className={`w-full md:w-[45%] pl-20 md:pl-0 ${
                    isEven ? "block" : "hidden md:block md:invisible"
                  }`}
                >
                  {isEven && (
                    <ServiceCard service={service} icons={icons} dir="left" />
                  )}
                </div>

                {/* NODE */}
                <div className="absolute left-8 md:left-1/2 -ml-[10px] w-5 h-5 rounded-full bg-[#00002b] border-2 border-cyan-400 z-10 shadow-[0_0_10px_cyan] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                </div>

                {/* SAĞ */}
                <div
                  className={`w-full md:w-[45%] pl-20 md:pl-0 ${
                    !isEven ? "block" : "hidden md:block md:invisible"
                  }`}
                >
                  {!isEven && (
                    <ServiceCard service={service} icons={icons} dir="right" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* SERVICE CARD */
/* ================================================= */

function ServiceCard({
  service,
  icons,
  dir,
}: {
  service: Service;
  icons: Record<string, JSX.Element>;
  dir: "left" | "right";
}) {
  const iconKey = Object.keys(icons).find((k) =>
    service.titleTr.includes(k)
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: dir === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative z-20"
    >
      <div className="rounded-2xl p-[1px] bg-gradient-to-br from-cyan-500/40 via-blue-500/20 to-transparent">
        <div className="bg-[#0a0a16]/90 backdrop-blur-xl rounded-2xl p-8 min-h-[280px]">
          <div className="flex items-center gap-5 mb-5">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              {iconKey ? icons[iconKey] : <Zap size={32} className="text-gray-400" />}
            </div>
            <h3 className="text-2xl font-bold text-white">
              {service.titleTr}
            </h3>
          </div>

          <p className="text-gray-400 leading-relaxed">
            {service.descriptionTr}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
