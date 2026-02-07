'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function ForgeCore() {
  const meshRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mouse.x * 0.3,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.y * 0.2,
        0.05
      );
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh>
          <dodecahedronGeometry args={[1.5, 3]} />
          <MeshDistortMaterial
            color="#78716C"
            attach="material"
            distort={0.22}
            speed={1.2}
            roughness={0.15}
            metalness={0.9}
            emissive="#F97316"
            emissiveIntensity={0.15}
          />
        </mesh>
        <pointLight position={[0, 0, 0]} intensity={1.5} color="#F97316" distance={6} />
      </Float>
    </group>
  );
}
