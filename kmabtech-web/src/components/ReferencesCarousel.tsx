"use client";

import { useApi } from "@/lib/useApi";
import { Reference } from "@/lib/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/Theme/ThemeProvider";

export default function ReferencesCarousel() {
  const { data: references } = useApi<Reference[]>("/References");
  const { theme } = useTheme(); // ← THEME ALINDI
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

  // Çok akıcı akış için 6 kopya
  const items = [
    ...references,
    ...references,
    ...references,
    ...references,
    ...references,
    ...references,
  ];

  /* ========================
      TEMA'YA GÖRE RENK SETİ
  ========================= */
  const bgStart = theme === "dark" ? "#070b38" : "#f8f9ff";
  const bgMid   = theme === "dark" ? "#000a1f" : "#eef2ff";
  const bgEnd   = theme === "dark" ? "#001226" : "#e3eaff";

  const fadeLeft = theme === "dark" ? "#070b38" : "#f8f9ff";
  const fadeRight = fadeLeft;

  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";

  return (
    <section
      className="py-20 overflow-hidden select-none"
      style={{
        background: `linear-gradient(to bottom, ${bgStart}, ${bgMid}, ${bgEnd})`,
      }}
    >
      <h2
        className={`text-4xl font-bold text-center mb-16 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
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
                  className={`object-contain opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300`}
                />

                {/* Glow Hover */}
                <div
                  className="absolute inset-0 rounded-lg blur-sm transition-opacity duration-300"
                  style={{
                    background:
                      theme === "dark"
                        ? "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)"
                        : "linear-gradient(to right, transparent, rgba(0,0,0,0.08), transparent)",
                    opacity: 0,
                  }}
                />
              </div>

              <p
                className={`mt-3 text-sm uppercase tracking-wider font-medium transition-colors duration-300 group-hover:text-blue-400 ${textColor}`}
              >
                {ref.companyName}
              </p>
            </div>
          ))}
        </div>

        {/* LEFT FADE */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${fadeLeft}, transparent)`,
          }}
        />

        {/* RIGHT FADE */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to left, ${fadeRight}, transparent)`,
          }}
        />
      </div>
    </section>
  );
}
