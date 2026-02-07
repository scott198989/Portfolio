'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

function CoreMesh() {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!coreRef.current) return;
    const t = state.clock.getElapsedTime();
    coreRef.current.rotation.x = t * 0.28;
    coreRef.current.rotation.y = t * 0.38;
    coreRef.current.position.y = Math.sin(t * 0.8) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.2, 3]} />
        <MeshDistortMaterial
          color="#45f3d4"
          emissive="#1fbfa8"
          emissiveIntensity={0.25}
          roughness={0.12}
          metalness={0.85}
          clearcoat={1}
          clearcoatRoughness={0.1}
          distort={0.28}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({
  radius,
  speed,
  count,
  color,
}: {
  radius: number;
  speed: number;
  count: number;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle * 2) * 0.25,
        z: Math.sin(angle) * radius,
      };
    });
  }, [count, radius]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * speed;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => (
        <mesh key={`${color}-${index}`} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            metalness={0.3}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

function WireRings() {
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringARef.current) {
      ringARef.current.rotation.z = t * 0.18;
    }
    if (ringBRef.current) {
      ringBRef.current.rotation.z = -t * 0.14;
    }
  });

  return (
    <>
      <mesh ref={ringARef} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 24, 150]} />
        <meshBasicMaterial color="#45f3d4" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ringBRef} rotation={[Math.PI / 3.2, Math.PI / 4, 0]}>
        <torusGeometry args={[2.7, 0.012, 24, 150]} />
        <meshBasicMaterial color="#f8b85e" transparent opacity={0.28} />
      </mesh>
    </>
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 3, 4]} intensity={2} color="#45f3d4" />
      <pointLight position={[-4, -2, -4]} intensity={1.2} color="#f8b85e" />
      <directionalLight position={[0, 5, 2]} intensity={0.7} color="#d8f9ff" />

      <Stars radius={95} depth={60} count={1400} factor={2.8} fade speed={0.4} />

      <CoreMesh />
      <OrbitRing radius={2.6} speed={0.25} count={11} color="#45f3d4" />
      <OrbitRing radius={3.3} speed={-0.16} count={14} color="#f8b85e" />
      <WireRings />

      <Sparkles count={70} scale={8} size={1.8} speed={0.35} color="#8ee4ff" />
    </>
  );
}

function StaticFallback() {
  return (
    <div className="hero-canvas-fallback" aria-hidden="true">
      <div className="fallback-orb fallback-orb-a" />
      <div className="fallback-orb fallback-orb-b" />
      <div className="fallback-grid" />
      <div className="fallback-core" />
      <div className="fallback-ring fallback-ring-a" />
      <div className="fallback-ring fallback-ring-b" />
    </div>
  );
}

export default function HeroCanvas3D() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      const compactViewport = window.innerWidth < 920;
      setEnabled(!motionQuery.matches && !compactViewport);
    };

    update();
    window.addEventListener('resize', update);
    motionQuery.addEventListener('change', update);

    return () => {
      window.removeEventListener('resize', update);
      motionQuery.removeEventListener('change', update);
    };
  }, []);

  if (!enabled) {
    return <StaticFallback />;
  }

  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 6], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#071017', 6, 18]} />
        <HeroScene />
      </Canvas>
    </div>
  );
}
