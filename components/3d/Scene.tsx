'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Preload } from '@react-three/drei';

interface SceneProps {
  children: React.ReactNode;
  className?: string;
}

export default function Scene({ children, className = '' }: SceneProps) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
