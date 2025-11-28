"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function SeparatorLine() {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,      // Sadece 1 defa animasyon
    threshold: 0.2,         // %20 görünce tetikle
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <div ref={ref} className="w-full flex justify-center my-16">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { 
            width: 0,
            opacity: 0 
          },
          visible: {
            width: "90%",
            opacity: 1,
            transition: {
              duration: 1.4,
              ease: "easeInOut"
            }
          }
        }}
        className="
          h-[4px]
          rounded-full 
          bg-gradient-to-r 
          from-purple-600 
          via-indigo-500 
          to-blue-600
          shadow-[0_0_20px_rgba(88,28,135,0.8)]
        "
      />
    </div>
  );
}
