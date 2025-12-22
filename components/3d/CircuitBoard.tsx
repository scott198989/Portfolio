'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CircuitBoardProps {
  position?: [number, number, number];
  scale?: number;
}

export default function CircuitBoard({ position = [0, 0, 0], scale = 1 }: CircuitBoardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRefs = useRef<THREE.Mesh[]>([]);

  const { lines, nodes } = useMemo(() => {
    const lineData: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    const nodeData: THREE.Vector3[] = [];

    // Create grid-like circuit pattern
    const gridSize = 8;
    const spacing = 0.5;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i - gridSize / 2) * spacing;
        const y = (j - gridSize / 2) * spacing;

        // Random chance to create a node
        if (Math.random() > 0.6) {
          nodeData.push(new THREE.Vector3(x, y, 0));

          // Create connecting lines
          if (Math.random() > 0.5 && i < gridSize - 1) {
            lineData.push({
              start: new THREE.Vector3(x, y, 0),
              end: new THREE.Vector3(x + spacing, y, 0)
            });
          }
          if (Math.random() > 0.5 && j < gridSize - 1) {
            lineData.push({
              start: new THREE.Vector3(x, y, 0),
              end: new THREE.Vector3(x, y + spacing, 0)
            });
          }
        }
      }
    }

    return { lines: lineData, nodes: nodeData };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
    }

    // Animate pulse effects
    pulseRefs.current.forEach((pulse, i) => {
      if (pulse) {
        const time = state.clock.getElapsedTime();
        const scale = 1 + Math.sin(time * 2 + i) * 0.3;
        pulse.scale.setScalar(scale);
        (pulse.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(time * 2 + i) * 0.3;
      }
    });
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Circuit lines */}
      {lines.map((line, i) => {
        const points = [line.start, line.end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={`line-${i}`}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial color="#00d4ff" opacity={0.6} transparent />
          </line>
        );
      })}

      {/* Circuit nodes */}
      {nodes.map((node, i) => (
        <group key={`node-${i}`} position={[node.x, node.y, node.z]}>
          {/* Core */}
          <mesh>
            <circleGeometry args={[0.05, 16]} />
            <meshBasicMaterial color="#00d4ff" />
          </mesh>
          {/* Pulse effect */}
          <mesh ref={(el) => { if (el) pulseRefs.current[i] = el; }}>
            <ringGeometry args={[0.06, 0.08, 16]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
