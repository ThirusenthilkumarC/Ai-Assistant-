import React from 'react';
import { motion } from 'framer-motion';
import type { AiState } from '../types';

interface AiOrbProps {
  state: AiState;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  onClick?: () => void;
  reducedMotion?: boolean;
}

export const AiOrb: React.FC<AiOrbProps> = ({
  state = 'idle',
  size = 'hero',
  onClick,
  reducedMotion = false
}) => {
  // Dimension maps - exact scale relative to the reference image
  const sizeMap = {
    sm: { container: 'w-8 h-8', sphere: 'w-8 h-8', glow: 'blur-md' },
    md: { container: 'w-12 h-12', sphere: 'w-12 h-12', glow: 'blur-lg' },
    lg: { container: 'w-16 h-16', sphere: 'w-16 h-16', glow: 'blur-xl' },
    hero: { container: 'w-[74px] h-[74px]', sphere: 'w-[74px] h-[74px]', glow: 'blur-2xl' }
  };

  const currentSize = sizeMap[size];

  // Visual state styling
  const isListening = state === 'listening';
  const isThinking = state === 'thinking';
  const isSpeaking = state === 'speaking';

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : 'presentation'}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ' ? onClick() : null) : undefined}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${currentSize.container} animate-orb-float`}
      title={onClick ? `NOVA Orb (${state.toUpperCase()}) - Click to interact` : `NOVA Orb (${state.toUpperCase()})`}
    >
      {/* 1. Outer Cosmic Nebula Glow Halo */}
      <motion.div
        className={`absolute inset-[-18%] rounded-full pointer-events-none transition-all duration-700 ${currentSize.glow}`}
        animate={
          reducedMotion
            ? { opacity: 0.6 }
            : {
                scale: isListening ? [1, 1.25, 1] : isSpeaking ? [1, 1.2, 1] : isThinking ? [1, 1.15, 1] : [1, 1.08, 1],
                opacity: isListening ? [0.75, 1, 0.75] : isThinking ? [0.7, 0.95, 0.7] : [0.55, 0.8, 0.55]
              }
        }
        transition={{
          repeat: Infinity,
          duration: isThinking ? 1.5 : isListening ? 1.6 : 3.6,
          ease: 'easeInOut'
        }}
        style={{
          background: isListening
            ? 'radial-gradient(circle, rgba(0, 229, 255, 0.8) 0%, rgba(139, 92, 246, 0.6) 45%, rgba(8, 10, 22, 0) 70%)'
            : isThinking
            ? 'radial-gradient(circle, rgba(168, 85, 247, 0.85) 0%, rgba(236, 72, 153, 0.6) 50%, rgba(8, 10, 22, 0) 75%)'
            : isSpeaking
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.85) 0%, rgba(59, 130, 246, 0.6) 50%, rgba(8, 10, 22, 0) 75%)'
            : 'radial-gradient(circle, rgba(168, 85, 247, 0.7) 0%, rgba(109, 40, 217, 0.5) 45%, rgba(36, 59, 104, 0.3) 65%, rgba(8, 10, 22, 0) 80%)'
        }}
      />

      {/* 2. Concentric Acoustic Ripples (When Listening) */}
      {isListening && !reducedMotion && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border border-cyan-400/80 pointer-events-none"
            initial={{ scale: 0.9, opacity: 0.9 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-purple-400/60 pointer-events-none"
            initial={{ scale: 0.9, opacity: 0.9 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.6, delay: 0.5, ease: 'easeOut' }}
          />
        </>
      )}

      {/* 3. Outer Crystal Glass Sphere Container */}
      <div
        className={`relative rounded-full overflow-hidden shadow-2xl border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${currentSize.sphere}`}
        style={{
          boxShadow: '0 0 25px rgba(139, 92, 246, 0.5), inset 0 0 15px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* A. Swirling Cosmic Galaxy Interior */}
        <div
          className={`absolute inset-[-20%] rounded-full pointer-events-none ${
            isThinking ? 'animate-cosmic-swirl-fast' : 'animate-cosmic-swirl'
          }`}
          style={{
            background:
              'radial-gradient(circle at 35% 35%, #F472B6 0%, #A855F7 25%, #6D28D9 50%, #1E1B4B 75%, #080A16 100%)',
            backgroundBlendMode: 'screen',
            filter: 'contrast(125%) saturate(140%)'
          }}
        >
          {/* Swirling Nebula Galaxy Dust */}
          <div
            className="absolute inset-0 opacity-75"
            style={{
              backgroundImage: `
                radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.85) 0%, rgba(236, 72, 153, 0.6) 18%, transparent 40%),
                radial-gradient(circle at 30% 70%, rgba(0, 229, 255, 0.7) 0%, rgba(99, 102, 241, 0.5) 25%, transparent 50%),
                radial-gradient(circle at 75% 65%, rgba(217, 70, 239, 0.8) 0%, transparent 35%)
              `
            }}
          />
        </div>

        {/* B. Quantum Star Nodes / Cosmic Dust Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[28%] left-[34%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          <div className="absolute top-[52%] left-[62%] w-1 h-1 rounded-full bg-pink-200 shadow-[0_0_6px_#f472b6]" />
          <div className="absolute top-[68%] left-[38%] w-1 h-1 rounded-full bg-cyan-200 shadow-[0_0_6px_#00e5ff]" />
        </div>

        {/* C. Crystal Glass 3D Specular Highlight (The Glass Bubble Sheen) */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 32% 22%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.25) 20%, transparent 45%)'
          }}
        />

        {/* D. Inner Shadow Rim to Give Depth & Curvature */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow:
              'inset 0 -6px 12px rgba(8, 10, 22, 0.9), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 0 10px rgba(109, 40, 217, 0.5)'
          }}
        />
      </div>

      {/* 4. Miniature Audio Waveform Pill when Listening or Speaking */}
      {(isListening || isSpeaking) && size === 'hero' && (
        <div className="absolute -bottom-6 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#121629]/90 border border-purple-500/40 shadow-lg pointer-events-none">
          <span className="w-1 bg-cyan-400 rounded-full animate-wave-1" />
          <span className="w-1 bg-purple-400 rounded-full animate-wave-2" />
          <span className="w-1 bg-pink-400 rounded-full animate-wave-3" />
          <span className="text-[10px] font-mono text-purple-200 uppercase tracking-wider ml-1">
            {isListening ? 'Listening' : 'Speaking'}
          </span>
        </div>
      )}
    </div>
  );
};
