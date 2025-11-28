'use client';

import { useApi } from '@/lib/useApi';
import { Reference } from '@/lib/types';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const SPEED = 30; // kaç saniyede tam tur

export default function ReferencesCarousel() {
  const { data: references, loading, error } = useApi<Reference[]>('/References');

  const controls = useAnimation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Infinite loop logic
  const startLoop = async (trackWidth: number) => {
    if (!trackWidth) return;

    // Başlangıç pozisyonu
    controls.set({ x: 0 });

    // Sonsuz loop
    controls.start({
      x: -trackWidth,
      transition: {
        duration: SPEED,
        ease: "linear",
        repeat: Infinity,
      }
    });
  };

  useEffect(() => {
    if (!references || !trackRef.current) return;

    // Track genişliği (tek set)
    const singleWidth = trackRef.current.scrollWidth / 2;
    setWidth(singleWidth);

    startLoop(singleWidth);
  }, [references]);

  if (!references || loading || error) return null;

  // Sonsuzluk için 2 set yeterli
  const items = [...references, ...references];

  return (
    <section className="py-16 overflow-hidden relative">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        Müşterilerimiz ve Referanslarımız
      </h2>

      <div className="relative w-full overflow-hidden">

        {/* Fade Left */}
        <div className="absolute left-0 top-0 w-32 sm:w-40 h-full z-10 bg-gradient-to-r from-[#070b38] to-transparent pointer-events-none"></div>

        {/* Fade Right */}
        <div className="absolute right-0 top-0 w-32 sm:w-40 h-full z-10 bg-gradient-to-l from-[#070b38] to-transparent pointer-events-none"></div>

        {/* Moving Track */}
        <motion.div
          ref={trackRef}
          animate={controls}
          className="flex items-center gap-14 sm:gap-20 whitespace-nowrap"
          style={{ width: width * 2 }}
        >
          {items.map((ref, i) => (
            <div
              key={i}
              className="flex flex-col items-center opacity-80 hover:opacity-100 transition-all"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${ref.logoUrl}`}
                alt={ref.companyName}
                width={110}
                height={60}
                className="object-contain grayscale opacity-90 hover:grayscale-0 transition-all"
              />
              <span className="text-[10px] sm:text-xs text-gray-300 mt-2 tracking-wide uppercase">
                {ref.companyName}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
