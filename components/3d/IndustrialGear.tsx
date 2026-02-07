'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface IndustrialGearProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
  teeth?: number;
  innerRadius?: number;
  outerRadius?: number;
  reverse?: boolean;
}

export default function IndustrialGear({
  position = [0, 0, 0],
  scale = 1,
  color = '#A8A29E',
  speed = 0.5,
  teeth = 12,
  innerRadius = 0.5,
  outerRadius = 1,
  reverse = false,
}: IndustrialGearProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const toothWidth = (2 * Math.PI) / (teeth * 2);

    for (let i = 0; i < teeth; i++) {
      const angle = (i / teeth) * Math.PI * 2;
      const nextAngle = ((i + 1) / teeth) * Math.PI * 2;

      const x1 = Math.cos(angle) * innerRadius;
      const y1 = Math.sin(angle) * innerRadius;
      const x2 = Math.cos(angle + toothWidth * 0.3) * outerRadius;
      const y2 = Math.sin(angle + toothWidth * 0.3) * outerRadius;
      const x3 = Math.cos(angle + toothWidth * 0.7) * outerRadius;
      const y3 = Math.sin(angle + toothWidth * 0.7) * outerRadius;
      const x4 = Math.cos(nextAngle) * innerRadius;
      const y4 = Math.sin(nextAngle) * innerRadius;

      if (i === 0) shape.moveTo(x1, y1);
      shape.lineTo(x2, y2);
      shape.lineTo(x3, y3);
      shape.lineTo(x4, y4);
    }

    shape.closePath();

    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius * 0.4, 0, Math.PI * 2, false);
    shape.holes.push(holePath);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.25,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3,
    });
  }, [teeth, innerRadius, outerRadius]);

  useFrame(() => {
    if (meshRef.current) {
      const direction = reverse ? -1 : 1;
      meshRef.current.rotation.z += speed * 0.01 * direction;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        metalness={0.85}
        roughness={0.15}
        emissive={color}
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}
