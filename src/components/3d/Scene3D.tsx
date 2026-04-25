"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingShape({ position, color, speed = 1, size = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5} position={position}>
      <Sphere args={[size, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={1}
          metalness={0.8}
          transparent
          opacity={0.05}
        />
      </Sphere>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        {/* Only extremely subtle shapes if any, moving them far back */}
        <FloatingShape position={[2, 1, -5]} color="#ffffff" size={0.5} speed={1} />
        <FloatingShape position={[-2, -1, -6]} color="#ffffff" size={0.8} speed={0.5} />
      </Canvas>
    </div>
  );
}
