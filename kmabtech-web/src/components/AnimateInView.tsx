// src/components/AnimateInView.tsx

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Sayfa kaydırılırken içeriği alttan yukarı hafifçe kaydırarak canlandıran bileşen
export function AnimateInView({ children, delay = 0, className = '' }: Props) {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay 
      } 
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible" // Görünür olduğunda animasyonu tetikler
      viewport={{ once: true, amount: 0.3 }} // Sadece bir kez, %30'u görünce
    >
      {children}
    </motion.div>
  );
}