"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { motion } from "framer-motion";

interface Props {
  code: string;
  fileName: string;
  height?: string;
}

export default function VSCodeEditor({ code, fileName, height }: Props) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      {/* DIŞ IŞIK ÇERÇEVE */}
      <div
        className="
          w-full max-w-none
          relative rounded-xl p-[2px]
          bg-gradient-to-r from-purple-500 via-violet-600 to-blue-500
          shadow-[0_0_40px_10px_rgba(109,40,217,0.45)]
        "
      >
        {/* İÇ KUTU */}
        <div className="bg-[#1e1e1e] rounded-lg border border-[#3a3a3a] overflow-visible w-full">

          {/* ÜST BAR */}
          <div className="flex items-center bg-[#2d2d2d] border-b border-[#3a3a3a] px-4 h-10">
            <div className="flex space-x-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <span className="ml-6 text-gray-300 text-sm">{fileName}</span>
          </div>

          {/* KOD ALANI — TAM GENİŞLİK + SCROLL YOK */}
          <div
            className="
              w-full
              px-6 sm:px-8 md:px-12 
              py-6
              overflow-visible
            "
            style={{
              height: height || "auto",
            }}
          >
            <pre className="
              text-[15px] sm:text-[16px] 
              leading-7 
              whitespace-pre-wrap 
              break-words
              w-full
            ">
              <code ref={codeRef} className="language-javascript w-full">
                {code}
              </code>
            </pre>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
