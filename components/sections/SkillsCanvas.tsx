'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Float, OrbitControls } from '@react-three/drei';
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

export default function SkillsCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <Suspense fallback={null}>
        <SkillsScene />
      </Suspense>
    </Canvas>
  );
}
