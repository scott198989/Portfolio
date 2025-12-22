'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Float, Sparkles } from '@react-three/drei';
import GearMesh from '../3d/GearMesh';

function ContactScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <GearMesh position={[0, 0, 0]} scale={1.2} color="#00d4ff" teeth={20} speed={0.2} />
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <GearMesh position={[1.8, -0.5, 0]} scale={0.6} color="#06b6d4" teeth={14} speed={0.3} reverse />
      </Float>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.4}>
        <GearMesh position={[-1.5, 0.8, 0]} scale={0.5} color="#0ea5e9" teeth={10} speed={0.4} />
      </Float>

      <Sparkles count={50} scale={5} size={1} speed={0.3} color="#00d4ff" />
    </>
  );
}

export default function ContactCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ContactScene />
      </Suspense>
    </Canvas>
  );
}
