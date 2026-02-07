'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SparkEmitter() {
  const pointsRef = useRef<THREE.Points>(null);
  const sparkCount = 30;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(sparkCount * 3);
    const vel = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
      vel[i * 3] = (Math.random() - 0.5) * 0.15;
      vel[i * 3 + 1] = Math.random() * 0.1 + 0.05;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
    }

    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    const cycle = time % 4;
    const active = cycle < 0.8;

    for (let i = 0; i < sparkCount; i++) {
      const idx = i * 3;
      if (active) {
        posArray[idx] += velocities[idx] * 0.8;
        posArray[idx + 1] += velocities[idx + 1] * 0.8;
        posArray[idx + 2] += velocities[idx + 2] * 0.8;
        velocities[idx + 1] -= 0.002;
      } else {
        posArray[idx] = 0;
        posArray[idx + 1] = 0;
        posArray[idx + 2] = 0;
        velocities[idx] = (Math.random() - 0.5) * 0.15;
        velocities[idx + 1] = Math.random() * 0.1 + 0.05;
        velocities[idx + 2] = (Math.random() - 0.5) * 0.15;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = active ? Math.max(0, 1 - cycle * 1.2) : 0;
  });

  return (
    <points ref={pointsRef} position={[0, 1.5, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={sparkCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FFF"
        size={0.04}
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
