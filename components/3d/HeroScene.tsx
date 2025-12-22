'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';
import GearMesh from './GearMesh';
import ParticleField from './ParticleField';

export default function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation following mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.3,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.2,
        0.05
      );
    }
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff006e" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#00d4ff"
      />

      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Main group */}
      <group ref={groupRef}>
        {/* Central distorted sphere - represents AI/technology core */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh ref={sphereRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.5, 4]} />
            <MeshDistortMaterial
              color="#00d4ff"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.2}
              metalness={0.8}
              emissive="#00d4ff"
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>

        {/* Orbiting gears - mechatronics theme */}
        <GearMesh
          position={[2.5, 0.5, 0]}
          scale={0.4}
          color="#00d4ff"
          speed={0.8}
          teeth={16}
        />
        <GearMesh
          position={[-2.5, -0.5, 0.5]}
          scale={0.35}
          color="#06b6d4"
          speed={0.6}
          teeth={12}
          reverse
        />
        <GearMesh
          position={[0, 2, -1]}
          scale={0.3}
          color="#0ea5e9"
          speed={1}
          teeth={8}
        />
        <GearMesh
          position={[-1.5, -2, 0.5]}
          scale={0.25}
          color="#22d3ee"
          speed={1.2}
          teeth={10}
          reverse
        />

        {/* Orbital rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[3.5, 0.015, 16, 100]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[Math.PI / 4, Math.PI / 2, 0]}>
          <torusGeometry args={[4, 0.01, 16, 100]} />
          <meshBasicMaterial color="#0ea5e9" transparent opacity={0.15} />
        </mesh>
      </group>

      {/* Sparkles effect */}
      <Sparkles
        count={100}
        scale={10}
        size={2}
        speed={0.5}
        color="#00d4ff"
      />

      {/* Particle field */}
      <ParticleField count={1500} color="#00d4ff" size={0.02} speed={0.3} />
    </>
  );
}
