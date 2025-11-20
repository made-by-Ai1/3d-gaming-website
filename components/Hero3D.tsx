import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars, TorusKnot, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Hero3DProps {
  isLoggedIn: boolean;
  onCtaClick: () => void;
}

const AnimatedShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <TorusKnot 
        ref={meshRef} 
        args={[1, 0.3, 128, 16]} 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <MeshDistortMaterial
          color={hovered ? "#00f3ff" : "#b026ff"}
          emissive={hovered ? "#00f3ff" : "#5a0085"}
          emissiveIntensity={2}
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </TorusKnot>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      {/* @ts-ignore */}
      <ambientLight intensity={0.5} />
      {/* @ts-ignore */}
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f3ff" />
      {/* @ts-ignore */}
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff0099" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <AnimatedShape />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

export const Hero3D: React.FC<Hero3DProps> = ({ isLoggedIn, onCtaClick }) => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none text-center px-4">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple drop-shadow-[0_0_15px_rgba(176,38,255,0.5)] mb-4">
                آینده گیمینگ
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl drop-shadow-md mb-8">
                تجربه‌ای متفاوت در دنیای بازی‌های سه‌بعدی. به جمع هزاران گیمر ایرانی بپیوندید.
            </p>
            <button 
              onClick={onCtaClick}
              className="pointer-events-auto bg-neon-purple hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(176,38,255,0.6)] transition-all transform hover:scale-105 flex items-center gap-2"
            >
                <span>{isLoggedIn ? 'مشاهده پنل کاربری' : 'شروع کنید'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            </button>
        </div>

        {/* 3D Canvas */}
        <Canvas className="absolute inset-0 z-0 bg-slate-900">
            <Scene />
        </Canvas>
        
        {/* Gradient Fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
    </div>
  );
};