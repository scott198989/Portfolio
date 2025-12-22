'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import ErrorBoundary from '../ErrorBoundary';

// Lazy load the heavy 3D scene
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('../3d/HeroScene'), {
  ssr: false,
});

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-cyan-500/5 to-blue-600/5" />
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 flex items-center justify-center">
          <div className="text-cyan-400/50 text-6xl animate-pulse">⚙️</div>
        </div>
      }
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}
