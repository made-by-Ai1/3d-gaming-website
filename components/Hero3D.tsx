
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Hero3DProps {
  isLoggedIn: boolean;
  onCtaClick: () => void;
}

// Helper component for Action Buttons with Glass effect
const ActionButton = ({ position, color, label }: { position: [number, number, number], color: string, label?: string }) => {
  return (
    <group position={position}>
      {/* Button Base */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.1, 32]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Glass Top */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.15, 32]} />
        <meshPhysicalMaterial 
            color={color} 
            transmission={0.6} 
            thickness={1} 
            roughness={0.1} 
            metalness={0.1}
            emissive={color}
            emissiveIntensity={0.6}
        />
      </mesh>
      {/* Inner Light Core */}
      <mesh position={[0, 0.02, 0]}>
         <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
         <meshBasicMaterial color="white" opacity={0.5} transparent />
      </mesh>
    </group>
  );
};

const GamepadModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.rotation.x = 0.5 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  const bodyColor = "#0f172a"; // Deep Dark Blue/Black
  const gripColor = "#1e293b"; // Slightly lighter for texture
  const accentColor = hovered ? "#00f3ff" : "#b026ff";

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
      <group ref={groupRef} scale={0.9} rotation={[0.5, 0, 0]}>
        
        {/* --- MAIN CHASSIS --- */}
        
        {/* Center Bridge */}
        <RoundedBox args={[2.4, 1.1, 0.4]} radius={0.15} position={[0, 0.2, 0]}>
           <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.5} />
        </RoundedBox>

        {/* Left Grip (Angled) */}
        <group position={[-1.3, -0.6, 0.2]} rotation={[0, 0, 0.4]}>
            <RoundedBox args={[0.95, 2.2, 0.6]} radius={0.35} smoothness={4}>
                <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.5} />
            </RoundedBox>
            {/* Textured Grip Area */}
            <mesh position={[-0.05, 0.2, 0.31]}>
                <boxGeometry args={[0.8, 1.6, 0.05]} />
                <meshStandardMaterial color={gripColor} roughness={0.9} />
            </mesh>
        </group>

        {/* Right Grip (Angled) */}
        <group position={[1.3, -0.6, 0.2]} rotation={[0, 0, -0.4]}>
             <RoundedBox args={[0.95, 2.2, 0.6]} radius={0.35} smoothness={4}>
                <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.5} />
            </RoundedBox>
             {/* Textured Grip Area */}
             <mesh position={[0.05, 0.2, 0.31]}>
                <boxGeometry args={[0.8, 1.6, 0.05]} />
                <meshStandardMaterial color={gripColor} roughness={0.9} />
             </mesh>
        </group>

        {/* Top Bumper Bar & Triggers */}
        <group position={[0, 0.9, -0.2]}>
            {/* L1/R1 Bridge */}
            <RoundedBox args={[2.8, 0.35, 0.4]} radius={0.1}>
                 <meshStandardMaterial color="#334155" roughness={0.3} />
            </RoundedBox>
            
            {/* L2 Trigger */}
            <group position={[-1.2, -0.1, -0.1]} rotation={[-0.2, 0, 0]}>
                 <RoundedBox args={[0.7, 0.4, 0.2]} radius={0.05}>
                    <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
                 </RoundedBox>
            </group>
             {/* R2 Trigger */}
             <group position={[1.2, -0.1, -0.1]} rotation={[-0.2, 0, 0]}>
                 <RoundedBox args={[0.7, 0.4, 0.2]} radius={0.05}>
                    <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
                 </RoundedBox>
            </group>
        </group>


        {/* --- FACEPLATE ELEMENTS --- */}
        
        {/* Center Touchpad / Display */}
        <group position={[0, 0.4, 0.22]}>
            <mesh>
                <boxGeometry args={[1.3, 0.75, 0.05]} />
                <meshStandardMaterial color="#0b0f19" />
            </mesh>
            {/* Neon Glow Border */}
            <mesh position={[0, 0.38, 0]}>
                 <boxGeometry args={[1.3, 0.02, 0.05]} />
                 <meshBasicMaterial color={accentColor} />
            </mesh>
            {/* Speaker Grills */}
            <group position={[0, -0.2, 0.03]}>
               {[...Array(5)].map((_, i) => (
                 <mesh key={i} position={[(i-2)*0.1, 0, 0]}>
                    <circleGeometry args={[0.02, 8]} />
                    <meshBasicMaterial color="#333" />
                 </mesh>
               ))}
            </group>
        </group>

        {/* Analog Sticks */}
        <group position={[-0.85, -0.4, 0.3]}>
            {/* Base Dome */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* Stick Stem */}
            <mesh position={[0, 0.2, 0]}>
                <cylinderGeometry args={[0.1, 0.12, 0.4, 16]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            {/* Stick Cap */}
            <mesh position={[0, 0.4, 0]}>
                 <cylinderGeometry args={[0.32, 0.32, 0.1, 32]} />
                 <meshStandardMaterial color="#222" roughness={0.9} />
                 {/* Indent */}
                 <mesh position={[0, 0.05, 0]}>
                    <cylinderGeometry args={[0.28, 0.25, 0.05, 32]} />
                    <meshStandardMaterial color="#1a1a1a" />
                 </mesh>
                 {/* Neon Ring Under Cap */}
                 <mesh position={[0, -0.08, 0]} rotation={[Math.PI/2, 0, 0]}>
                    <torusGeometry args={[0.3, 0.02, 16, 32]} />
                    <meshBasicMaterial color={accentColor} toneMapped={false} />
                 </mesh>
            </mesh>
        </group>

        <group position={[0.85, -0.9, 0.3]}>
             {/* Base Dome */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
                <meshStandardMaterial color="#111" />
            </mesh>
             {/* Stick Stem */}
            <mesh position={[0, 0.2, 0]}>
                <cylinderGeometry args={[0.1, 0.12, 0.4, 16]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            {/* Stick Cap */}
            <mesh position={[0, 0.4, 0]}>
                 <cylinderGeometry args={[0.32, 0.32, 0.1, 32]} />
                 <meshStandardMaterial color="#222" roughness={0.9} />
                 <mesh position={[0, 0.05, 0]}>
                    <cylinderGeometry args={[0.28, 0.25, 0.05, 32]} />
                    <meshStandardMaterial color="#1a1a1a" />
                 </mesh>
                 <mesh position={[0, -0.08, 0]} rotation={[Math.PI/2, 0, 0]}>
                    <torusGeometry args={[0.3, 0.02, 16, 32]} />
                    <meshBasicMaterial color={accentColor} toneMapped={false} />
                 </mesh>
            </mesh>
        </group>

        {/* D-Pad (Left) */}
        <group position={[-1.6, 0.3, 0.35]}>
             {/* Cross Shape */}
             <group>
                <RoundedBox args={[0.3, 0.9, 0.1]} radius={0.04}>
                    <meshStandardMaterial color="#222" />
                </RoundedBox>
                <RoundedBox args={[0.9, 0.3, 0.1]} radius={0.04}>
                    <meshStandardMaterial color="#222" />
                </RoundedBox>
                {/* Center Dish */}
                <mesh position={[0,0,0.02]} rotation={[Math.PI/2, 0, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
                    <meshStandardMaterial color="#181818" />
                </mesh>
             </group>
        </group>

        {/* Action Buttons (Right) */}
        <group position={[1.6, 0.3, 0.35]} rotation={[0, 0, -Math.PI/8]}>
            <ActionButton position={[0, 0.38, 0]} color="#ef4444" label="B" /> {/* Red - Top */}
            <ActionButton position={[0.38, 0, 0]} color="#3b82f6" label="A" /> {/* Blue - Right */}
            <ActionButton position={[0, -0.38, 0]} color="#22c55e" label="Y" /> {/* Green - Bottom */}
            <ActionButton position={[-0.38, 0, 0]} color="#eab308" label="X" /> {/* Yellow - Left */}
        </group>

        {/* Start/Select/Menu Buttons */}
        <group position={[0, -0.2, 0.25]}>
             {/* Left Btn */}
             <mesh position={[-0.4, 0, 0]}>
                 <capsuleGeometry args={[0.05, 0.15, 4, 8]} />
                 <meshStandardMaterial color="#64748b" />
             </mesh>
             {/* Right Btn */}
             <mesh position={[0.4, 0, 0]}>
                 <capsuleGeometry args={[0.05, 0.15, 4, 8]} />
                 <meshStandardMaterial color="#64748b" />
             </mesh>
             {/* PS/Home Button */}
             <mesh position={[0, -0.1, 0]} rotation={[Math.PI/2, 0, 0]}>
                 <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
                 <meshStandardMaterial color="#0f172a" />
             </mesh>
             <mesh position={[0, -0.1, 0.03]} rotation={[Math.PI/2, 0, 0]}>
                 <cylinderGeometry args={[0.08, 0.08, 0.02, 32]} />
                 <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={2} />
             </mesh>
        </group>

      </group>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      {/* @ts-ignore */}
      <ambientLight intensity={0.4} />
      {/* @ts-ignore */}
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
      {/* @ts-ignore */}
      <pointLight position={[-10, -5, -10]} intensity={1} color="#ff0099" />
      {/* @ts-ignore */}
      <spotLight position={[0, 5, 5]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <GamepadModel />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
    </>
  );
};

export const Hero3D: React.FC<Hero3DProps> = ({ isLoggedIn, onCtaClick }) => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none text-center px-4">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple drop-shadow-[0_0_25px_rgba(176,38,255,0.6)] mb-6 tracking-tight">
                آینده گیمینگ
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-lg mb-10 font-medium leading-relaxed">
                تجربه‌ای متفاوت در دنیای بازی‌های سه‌بعدی. <br/>به جمع هزاران گیمر حرفه‌ای بپیوندید.
            </p>
            <button 
              onClick={onCtaClick}
              className="pointer-events-auto bg-neon-purple hover:bg-purple-600 text-white font-bold py-4 px-10 rounded-2xl shadow-[0_0_25px_rgba(176,38,255,0.6)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 border border-white/10 backdrop-blur-sm group"
            >
                <span>{isLoggedIn ? 'ورود به پنل کاربری' : 'شروع ماجراجویی'}</span>
                <div className="bg-white/20 p-1 rounded-lg group-hover:translate-x-1 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                </div>
            </button>
        </div>

        {/* 3D Canvas */}
        <Canvas className="absolute inset-0 z-0 bg-slate-950" shadows>
            <Scene />
        </Canvas>
        
        {/* Gradient Fades */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-900/50 to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};
