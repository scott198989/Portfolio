'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}

export default function ParticleField({
  count = 800,
  color = '#F97316',
  size = 0.02,
  speed = 0.3,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime * speed;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Gentle vortex movement
      posArray[idx] += Math.sin(time + i * 0.1) * 0.002;
      posArray[idx + 1] += Math.cos(time + i * 0.05) * 0.001;
      posArray[idx + 2] += Math.sin(time + i * 0.08) * 0.001;

      // Boundary wrap
      if (Math.abs(posArray[idx]) > 6) posArray[idx] *= -0.9;
      if (Math.abs(posArray[idx + 1]) > 6) posArray[idx + 1] *= -0.9;
      if (Math.abs(posArray[idx + 2]) > 6) posArray[idx + 2] *= -0.9;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
