'use client';

import { motion } from "framer-motion";

export default function RotatingCube() {
  return (
    <div className="flex items-center justify-center h-[300px] w-[300px]">
      <motion.div
        animate={{
          rotateX: 360,
          rotateY: 360,
        }}
        transition={{
          duration: 6,
          ease: "linear",
          repeat: Infinity,
        }}
        className="relative w-40 h-40 preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {["front", "back", "left", "right", "top", "bottom"].map((face) => (
          <div
            key={face}
            className="absolute w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600/80 border border-white/20 flex items-center justify-center text-white font-bold text-xl"
            style={{
              transform: {
                front: "translateZ(80px)",
                back: "rotateY(180deg) translateZ(80px)",
                left: "rotateY(-90deg) translateZ(80px)",
                right: "rotateY(90deg) translateZ(80px)",
                top: "rotateX(90deg) translateZ(80px)",
                bottom: "rotateX(-90deg) translateZ(80px)",
              }[face]!,
            }}
          >
            {face}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
