"use client";

import { motion } from "framer-motion";

const features = [
  { icon: "⚡", title: "Hızlı Geliştirme" },
  { icon: "🔒", title: "Kurumsal Güvenlik" },
  { icon: "🚀", title: "Yüksek Performans" },
];

export default function FeatureHighlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full py-10"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 pt-60 gap-6 text-center ">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl py-6 backdrop-blur-md
                       hover:bg-white/10 transition-all duration-300 shadow-lg"
          >
            <div className="text-4xl mb-3">{f.icon}</div>

            <div className="text-lg font-semibold text-gray-200 tracking-wide">
              {f.title}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
