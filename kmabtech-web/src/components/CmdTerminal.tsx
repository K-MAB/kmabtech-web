"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CmdTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="
        mx-auto 
        mt-40               /* 🔥 TERMINALI AŞAĞI ALIR */
        max-w-5xl          /* 🔥 GENİŞLİK ARTIRILDI */
        rounded-xl 
        overflow-hidden
        border border-gray-600 
        bg-black/95 
        backdrop-blur 
        shadow-[0_0_60px_rgba(0,255,255,0.25)]
      "
    >
      {/* CMD Üst Bar */}
      <div className="flex items-center justify-between px-5 py-2 bg-[#1b1b1b] border-b border-gray-700 text-gray-300 text-[15px]">
        <span>KMAB Terminal</span>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* CMD İçerik */}
      <div className="px-6 py-6 font-mono text-[17px] text-gray-200 whitespace-pre-wrap leading-relaxed">
        <div>Microsoft Windows [Version 10.0.26100.7171]</div>
        <div>(c) Microsoft Corporation. Tüm hakları saklıdır.</div>
        <br />

        <CmdTypeWriter />
      </div>
    </motion.div>
  );
}

/* ============================================
      CMD TYPEWRITER
============================================ */
function CmdTypeWriter() {
  const messages = [
    "Modern yazılım mimarileri ile işletmelerin dönüşümünü hızlandırıyoruz...",
    "Ölçeklenebilir servis mimarileri ve güvenli API altyapıları geliştiriyoruz...",
    "Performans odaklı kurumsal çözümler ile işletmeleri geleceğe taşıyoruz...",
    "Yazılım projelerinizi en iyi mühendislik pratikleri ile inşa ediyoruz..."
  ];

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const commandPrefix = "C:\\Users\\kmab>"; // 🔥 KMAB EKLENDİ

  useEffect(() => {
    if (subIndex === messages[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 900);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % messages.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex(subIndex + (deleting ? -1 : 1));
    }, deleting ? 20 : 35);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting]);

  return (
    <div className="text-green-400 text-[19px]">
      {commandPrefix} {messages[index].substring(0, subIndex)}
      <span className="animate-pulse">█</span>
    </div>
  );
}
