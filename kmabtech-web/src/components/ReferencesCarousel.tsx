"use client";

import { useApi } from "@/lib/useApi";
import { Reference } from "@/lib/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ReferencesCarousel() {
  const { data: references } = useApi<Reference[]>("/References");
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isPaused, setIsPaused] = useState(false);

  const SPEED = 1.2;

  useEffect(() => {
    if (!trackRef.current || !references || isPaused) return;

    const track = trackRef.current;
    let x = 0;
    let lastTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      x -= SPEED * (deltaTime / 16);

      track.style.transform = `translateX(${x}px)`;

      const first = track.children[0] as HTMLElement;
      const w = first.offsetWidth + 64;

      if (Math.abs(x) >= w) {
        track.appendChild(first);
        x += w;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current!);
  }, [references, isPaused]);

  if (!references) return null;

  const items = [...references, ...references, ...references, ...references, ...references, ...references];

  return (
    <section
      className="
        py-20 overflow-hidden select-none 
        bg-gradient-to-b 
        from-[#070b38] 
        via-[#000a1f] 
        to-[#001226]
      "
    >
      <h2 className="text-4xl font-bold text-center text-white mb-16">
        Müşterilerimiz ve Referanslarımız
      </h2>

      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex items-center gap-16 whitespace-nowrap will-change-transform py-4"
          style={{
            transition: isPaused ? "transform 0.3s ease" : "none",
          }}
        >
          {items.map((ref, i) => (
            <div
              key={`${ref.id}-${i}`}
              className="flex-shrink-0 flex flex-col items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <div className="relative group">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${ref.logoUrl}`}
                  alt={ref.companyName}
                  width={160}
                  height={80}
                  className="object-contain grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-sm" />
              </div>
              <p className="text-gray-300 text-sm uppercase mt-3 tracking-wider font-medium group-hover:text-white transition-colors duration-300">
                {ref.companyName}
              </p>
            </div>
          ))}
        </div>

        {/* SOL Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 
          bg-gradient-to-r from-[#070b38] to-transparent 
          z-10" 
        />

        {/* SAĞ Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 
          bg-gradient-to-l from-[#070b38] to-transparent 
          z-10" 
        />
      </div>
    </section>
  );
}
