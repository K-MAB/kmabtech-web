"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useTheme } from "@/components/Theme/ThemeProvider";

export default function SeparatorLine() {
  const { theme } = useTheme(); // 🔥 Tema (dark/light)
  const controls = useAnimation();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView]);

  /* ========= Tema Renkleri ========= */
  const gradient =
    theme === "dark"
      ? "bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600"
      : "bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300";

  const glow =
    theme === "dark"
      ? "shadow-[0_0_25px_rgba(88,28,135,0.85)]"
      : "shadow-[0_0_18px_rgba(150,120,255,0.5)]";

  return (
    <div ref={ref} className="w-full flex justify-center my-16">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {
            width: 0,
            opacity: 0,
          },
          visible: {
            width: "92%",
            opacity: 1,
            transition: {
              duration: 1.4,
              ease: "easeInOut",
            },
          },
        }}
        className={`
          h-[4px] 
          rounded-full 
          ${gradient}
          ${glow}
        `}
      />
    </div>
  );
}
