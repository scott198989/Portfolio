'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import ForgeCore from './ForgeCore';
import IndustrialGear from './IndustrialGear';
import ParticleField from './ParticleField';
import SparkEmitter from './SparkEmitter';

function Scene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[5, 3, 5]} intensity={1.8} color="#F97316" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#38BDF8" />
      <directionalLight position={[0, 8, 3]} intensity={0.6} color="#FAFAF9" />
      <fog attach="fog" args={['#0C0A09', 6, 20]} />

      <Stars radius={100} depth={50} count={2000} factor={3} saturation={0.2} fade speed={0.8} />

      <ForgeCore />

      <IndustrialGear position={[2.5, 0.5, 0]} scale={0.4} color="#A8A29E" speed={0.8} teeth={16} />
      <IndustrialGear position={[-2.5, -0.5, 0.5]} scale={0.35} color="#78716C" speed={0.6} teeth={12} reverse />
      <IndustrialGear position={[0, 2, -1]} scale={0.3} color="#F97316" speed={1} teeth={8} />
      <IndustrialGear position={[-1.5, -2, 0.5]} scale={0.25} color="#FB923C" speed={1.2} teeth={10} reverse />

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#F97316" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#A8A29E" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 2, 0]}>
        <torusGeometry args={[4, 0.01, 16, 100]} />
        <meshBasicMaterial color="#78716C" transparent opacity={0.1} />
      </mesh>

      <Sparkles count={80} scale={10} size={2} speed={0.5} color="#FB923C" />

      <ParticleField count={800} color="#F97316" size={0.02} speed={0.3} />

      <SparkEmitter />
    </>
  );
}

function CanvasFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-stone-600/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-accent/30 to-stone-600/20 shadow-[0_0_60px_rgba(249,115,22,0.3)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-accent/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-stone-700/20" />
    </div>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0">
      <Suspense fallback={<CanvasFallback />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 7], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
