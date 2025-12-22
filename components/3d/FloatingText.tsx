'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingTextProps {
  text: string;
  position?: [number, number, number];
  size?: number;
  color?: string;
  floatIntensity?: number;
}

export default function FloatingText({
  text,
  position = [0, 0, 0],
  size = 0.5,
  color = '#00d4ff',
  floatIntensity = 0.3
}: FloatingTextProps) {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = initialY + Math.sin(time) * floatIntensity;
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Center>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={size}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.01}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial
            color={color}
            metalness={0.5}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </Text3D>
      </Center>
    </group>
  );
}
