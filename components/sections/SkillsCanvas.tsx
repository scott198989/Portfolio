'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import { Float, OrbitControls } from '@react-three/drei';
import ErrorBoundary from '../ErrorBoundary';
import GearMesh from '../3d/GearMesh';

function SkillsScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <group>
          <GearMesh position={[0, 0, 0]} scale={0.8} color="#00d4ff" teeth={16} speed={0.3} />
          <GearMesh position={[1.4, 0.6, 0]} scale={0.5} color="#06b6d4" teeth={12} speed={0.4} reverse />
          <GearMesh position={[-1.2, -0.8, 0]} scale={0.4} color="#0ea5e9" teeth={10} speed={0.5} />
        </group>
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
    </>
  );
}

function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

function StaticFallback() {
  return (
    <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-lg flex items-center justify-center">
      <div className="text-cyan-400/40 text-5xl animate-pulse">⚙️</div>
    </div>
  );
}

export default function SkillsCanvas() {
  const [mounted, setMounted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setMounted(true);
    setWebglSupported(isWebGLAvailable());
  }, []);

  if (!mounted || !webglSupported) {
    return <StaticFallback />;
  }

  return (
    <ErrorBoundary fallback={<StaticFallback />}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        fallback={<StaticFallback />}
      >
        <Suspense fallback={null}>
          <SkillsScene />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}
