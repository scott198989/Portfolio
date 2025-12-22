'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('../3d/HeroScene'), {
  ssr: false,
});

// Check if WebGL is available
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function StaticFallback() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 via-blue-600/5 to-purple-600/10 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse delay-500" />

      {/* Floating gear icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-cyan-400/30 text-8xl animate-bounce">⚙️</div>
      </div>
    </div>
  );
}

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setMounted(true);
    setWebglSupported(isWebGLAvailable());
  }, []);

  if (!mounted) {
    return <StaticFallback />;
  }

  if (!webglSupported) {
    return <StaticFallback />;
  }

  return (
    <ErrorBoundary fallback={<StaticFallback />}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        fallback={<StaticFallback />}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}
