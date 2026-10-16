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
  // Dimensions based on size prop
  const sizeMap = {
    sm: { container: 'w-10 h-10', core: 'w-5 h-5', ring1: 'w-8 h-8', ring2: 'w-10 h-10' },
    md: { container: 'w-16 h-16', core: 'w-8 h-8', ring1: 'w-12 h-12', ring2: 'w-16 h-16' },
    lg: { container: 'w-28 h-28', core: 'w-14 h-14', ring1: 'w-22 h-22', ring2: 'w-28 h-28' },
    hero: { container: 'w-44 h-44 sm:w-56 sm:h-56', core: 'w-24 h-24 sm:w-28 sm:h-28', ring1: 'w-36 h-36 sm:w-44 sm:h-44', ring2: 'w-44 h-44 sm:w-56 sm:h-56' }
  };

  const currentSize = sizeMap[size];

  // Visual state styling parameters
  const getGlowColor = () => {
    switch (state) {
      case 'listening':
        return 'rgba(0, 229, 255, 0.85)';
      case 'thinking':
        return 'rgba(139, 92, 246, 0.85)';
      case 'speaking':
        return 'rgba(59, 130, 246, 0.9)';
      case 'idle':
      default:
        return 'rgba(0, 229, 255, 0.45)';
    }
  };

  // State text label
  const getStateLabel = () => {
    switch (state) {
      case 'listening':
        return 'LISTENING';
      case 'thinking':
        return 'COMPUTING';
      case 'speaking':
        return 'TRANSMITTING';
      case 'idle':
      default:
        return 'ONLINE';
    }
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : 'presentation'}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ' ? onClick() : null) : undefined}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${currentSize.container}`}
      title={onClick ? `NOVA Orb (${getStateLabel()}) - Click to interact` : `NOVA Orb (${getStateLabel()})`}
    >
      {/* Background Outer Soft Glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl pointer-events-none transition-colors duration-700"
        animate={
          reducedMotion
            ? { opacity: 0.5 }
            : {
                scale: state === 'listening' ? [1, 1.25, 1] : state === 'speaking' ? [1, 1.2, 1] : [1, 1.1, 1],
                opacity: state === 'listening' ? [0.6, 0.9, 0.6] : state === 'thinking' ? [0.5, 0.8, 0.5] : [0.35, 0.55, 0.35]
              }
        }
        transition={{
          repeat: Infinity,
          duration: state === 'thinking' ? 1.5 : state === 'listening' ? 1.8 : 3.5,
          ease: 'easeInOut'
        }}
        style={{
          background: `radial-gradient(circle, ${getGlowColor()} 0%, rgba(7, 11, 20, 0) 70%)`
        }}
      />

      {/* Outer Gyro Ring 1 */}
      <motion.div
        className={`absolute rounded-full border border-dashed border-cyan-400/40 pointer-events-none ${currentSize.ring2}`}
        animate={
          reducedMotion
            ? {}
            : {
                rotate: 360,
                scale: state === 'speaking' ? [1, 1.05, 1] : 1
              }
        }
        transition={{
          rotate: {
            repeat: Infinity,
            duration: state === 'thinking' ? 4 : 20,
            ease: 'linear'
          },
          scale: {
            repeat: Infinity,
            duration: 1.2,
            ease: 'easeInOut'
          }
        }}
        style={{
          borderTopColor: '#00E5FF',
          borderRightColor: 'rgba(0, 229, 255, 0.1)',
          borderBottomColor: '#8B5CF6',
          borderLeftColor: 'rgba(139, 92, 246, 0.1)'
        }}
      />

      {/* Intermediate Reverse Gyro Ring 2 */}
      <motion.div
        className={`absolute rounded-full border border-cyan-300/30 pointer-events-none ${currentSize.ring1}`}
        animate={
          reducedMotion
            ? {}
            : {
                rotate: -360,
                scale: state === 'listening' ? [1, 1.08, 1] : 1
              }
        }
        transition={{
          rotate: {
            repeat: Infinity,
            duration: state === 'thinking' ? 3 : 14,
            ease: 'linear'
          },
          scale: {
            repeat: Infinity,
            duration: 1.5,
            ease: 'easeInOut'
          }
        }}
        style={{
          borderTopColor: 'rgba(139, 92, 246, 0.6)',
          borderBottomColor: 'rgba(0, 229, 255, 0.6)'
        }}
      />

      {/* Listening Waveform Ripples (When LISTENING) */}
      {state === 'listening' && !reducedMotion && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/60 pointer-events-none"
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.35, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-cyan-300/40 pointer-events-none"
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.8, delay: 0.6, ease: 'easeOut' }}
          />
        </>
      )}

      {/* Orbiting Particles / Energy Sparks */}
      {!reducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: state === 'thinking' ? 2.5 : 9,
            ease: 'linear'
          }}
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#00E5FF]" />
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#8B5CF6]" />
        </motion.div>
      )}

      {/* Main Core Orb Layer */}
      <motion.div
        className={`relative rounded-full shadow-2xl flex items-center justify-center overflow-hidden z-10 transition-transform duration-300 group-hover:scale-105 ${currentSize.core}`}
        animate={
          reducedMotion
            ? {}
            : {
                scale:
                  state === 'listening'
                    ? [1, 1.15, 1]
                    : state === 'speaking'
                    ? [0.95, 1.12, 0.95]
                    : state === 'thinking'
                    ? [0.97, 1.05, 0.97]
                    : [1, 1.06, 1]
              }
        }
        transition={{
          repeat: Infinity,
          duration: state === 'speaking' ? 0.9 : state === 'listening' ? 1.4 : 3,
          ease: 'easeInOut'
        }}
        style={{
          background:
            state === 'thinking'
              ? 'radial-gradient(circle at 35% 35%, #00E5FF 0%, #3B82F6 40%, #8B5CF6 80%, #070B14 100%)'
              : state === 'listening'
              ? 'radial-gradient(circle at 35% 35%, #E0F2FE 0%, #00E5FF 40%, #0284C7 75%, #070B14 100%)'
              : state === 'speaking'
              ? 'radial-gradient(circle at 35% 35%, #F5F3FF 0%, #8B5CF6 40%, #3B82F6 75%, #070B14 100%)'
              : 'radial-gradient(circle at 35% 35%, #67E8F9 0%, #00E5FF 35%, #3B82F6 70%, #070B14 100%)',
          boxShadow: `0 0 30px ${getGlowColor()}, inset 0 0 15px rgba(255,255,255,0.4)`
        }}
      >
        {/* Futuristic Internal Shimmer & Lattice Lines */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent pointer-events-none" />

        {/* Dynamic Center Quantum Node */}
        <motion.div
          className="w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#ffffff] z-20 pointer-events-none"
          animate={
            reducedMotion
              ? {}
              : {
                  scale: state === 'thinking' ? [0.8, 1.4, 0.8] : [0.9, 1.15, 0.9],
                  opacity: state === 'listening' ? [0.7, 1, 0.7] : [0.85, 1, 0.85]
                }
          }
          transition={{
            repeat: Infinity,
            duration: state === 'thinking' ? 0.8 : 2,
            ease: 'easeInOut'
          }}
        />
      </motion.div>

      {/* State Badge for Hero size */}
      {size === 'hero' && (
        <div className="absolute -bottom-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md shadow-lg pointer-events-none">
          <span
            className={`w-2 h-2 rounded-full ${
              state === 'listening'
                ? 'bg-cyan-400 animate-ping'
                : state === 'thinking'
                ? 'bg-violet-400 animate-pulse'
                : state === 'speaking'
                ? 'bg-blue-400 animate-bounce'
                : 'bg-emerald-400'
            }`}
          />
          <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-200">
            {getStateLabel()}
          </span>
        </div>
      )}
    </div>
  );
};
