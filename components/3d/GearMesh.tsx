'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GearMeshProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
  teeth?: number;
  innerRadius?: number;
  outerRadius?: number;
  reverse?: boolean;
}

export default function GearMesh({
  position = [0, 0, 0],
  scale = 1,
  color = '#00d4ff',
  speed = 0.5,
  teeth = 12,
  innerRadius = 0.5,
  outerRadius = 1,
  reverse = false
}: GearMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const toothDepth = (outerRadius - innerRadius) * 0.3;
    const toothWidth = (2 * Math.PI) / (teeth * 2);

    // Create gear profile
    for (let i = 0; i < teeth; i++) {
      const angle = (i / teeth) * Math.PI * 2;
      const nextAngle = ((i + 1) / teeth) * Math.PI * 2;

      // Bottom of tooth
      const x1 = Math.cos(angle) * innerRadius;
      const y1 = Math.sin(angle) * innerRadius;

      // Top of tooth (start)
      const x2 = Math.cos(angle + toothWidth * 0.3) * outerRadius;
      const y2 = Math.sin(angle + toothWidth * 0.3) * outerRadius;

      // Top of tooth (end)
      const x3 = Math.cos(angle + toothWidth * 0.7) * outerRadius;
      const y3 = Math.sin(angle + toothWidth * 0.7) * outerRadius;

      // Valley before next tooth
      const x4 = Math.cos(nextAngle) * innerRadius;
      const y4 = Math.sin(nextAngle) * innerRadius;

      if (i === 0) {
        shape.moveTo(x1, y1);
      }

      shape.lineTo(x2, y2);
      shape.lineTo(x3, y3);
      shape.lineTo(x4, y4);
    }

    shape.closePath();

    // Create center hole
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius * 0.4, 0, Math.PI * 2, false);
    shape.holes.push(holePath);

    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [teeth, innerRadius, outerRadius]);

  useFrame((state) => {
    if (meshRef.current) {
      const direction = reverse ? -1 : 1;
      meshRef.current.rotation.z += speed * 0.01 * direction;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}
