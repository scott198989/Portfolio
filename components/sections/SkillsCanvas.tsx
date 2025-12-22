'use client';

import { useEffect, useState } from 'react';
import { isMobileDevice } from '@/lib/utils';

// Static version - safe for all devices
function StaticGear() {
  return (
    <div className="w-full h-full min-h-[300px] relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-24 h-24 text-cyan-400/40" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 30a20 20 0 100 40 20 20 0 000-40zm0 30a10 10 0 110-20 10 10 0 010 20z" />
          {[...Array(8)].map((_, i) => (
            <rect key={i} x="46" y="5" width="8" height="15" rx="2" transform={`rotate(${i * 45} 50 50)`} />
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function SkillsCanvas() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile (safe)

  useEffect(() => {
    const mobile = isMobileDevice();
    setIsMobile(mobile);
    setMounted(true);
  }, []);

  // Before mount OR on mobile: show static safe version
  if (!mounted || isMobile) {
    return <StaticGear />;
  }

  // Desktop only: full animated version
  return (
    <div className="w-full h-full min-h-[300px] relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <svg className="w-32 h-32 text-cyan-400/40 animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 30a20 20 0 100 40 20 20 0 000-40zm0 30a10 10 0 110-20 10 10 0 010 20z" />
            {[...Array(8)].map((_, i) => (
              <rect key={i} x="46" y="5" width="8" height="15" rx="2" transform={`rotate(${i * 45} 50 50)`} />
            ))}
          </svg>
          <svg className="absolute -right-8 -top-4 w-16 h-16 text-blue-400/40 animate-spin-reverse" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 35a15 15 0 100 30 15 15 0 000-30zm0 22a7 7 0 110-14 7 7 0 010 14z" />
            {[...Array(6)].map((_, i) => (
              <rect key={i} x="46" y="10" width="8" height="12" rx="2" transform={`rotate(${i * 60} 50 50)`} />
            ))}
          </svg>
          <svg className="absolute -left-6 -bottom-6 w-12 h-12 text-cyan-300/40 animate-spin-medium" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 35a15 15 0 100 30 15 15 0 000-30zm0 22a7 7 0 110-14 7 7 0 010 14z" />
            {[...Array(6)].map((_, i) => (
              <rect key={i} x="46" y="10" width="8" height="12" rx="2" transform={`rotate(${i * 60} 50 50)`} />
            ))}
          </svg>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />

      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="30%" x2="30%" y2="30%" stroke="url(#circuit-gradient)" strokeWidth="1" className="animate-circuit-1" />
        <line x1="70%" y1="70%" x2="100%" y2="70%" stroke="url(#circuit-gradient)" strokeWidth="1" className="animate-circuit-2" />
        <line x1="20%" y1="0" x2="20%" y2="25%" stroke="url(#circuit-gradient)" strokeWidth="1" className="animate-circuit-3" />
      </svg>
    </div>
  );
}
