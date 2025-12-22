'use client';

import { useEffect, useState } from 'react';

export default function ContactCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg">
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl animate-float-medium" />

      {/* Main gear */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <svg
            className="w-24 h-24 text-cyan-400/50 animate-spin-very-slow"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M50 30a20 20 0 100 40 20 20 0 000-40zm0 30a10 10 0 110-20 10 10 0 010 20z" />
            {[...Array(10)].map((_, i) => (
              <rect
                key={i}
                x="46"
                y="5"
                width="8"
                height="12"
                rx="2"
                transform={`rotate(${i * 36} 50 50)`}
              />
            ))}
          </svg>

          {/* Secondary gears */}
          <svg
            className="absolute -right-10 top-0 w-14 h-14 text-blue-400/40 animate-spin-reverse"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <circle cx="50" cy="50" r="15" />
            {[...Array(7)].map((_, i) => (
              <rect
                key={i}
                x="46"
                y="15"
                width="8"
                height="10"
                rx="2"
                transform={`rotate(${i * (360/7)} 50 50)`}
              />
            ))}
          </svg>

          <svg
            className="absolute -left-8 -bottom-2 w-12 h-12 text-cyan-300/40 animate-spin-medium"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <circle cx="50" cy="50" r="15" />
            {[...Array(5)].map((_, i) => (
              <rect
                key={i}
                x="46"
                y="15"
                width="8"
                height="10"
                rx="2"
                transform={`rotate(${i * 72} 50 50)`}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Sparkles */}
      {mounted && [...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-twinkle"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
    </div>
  );
}
