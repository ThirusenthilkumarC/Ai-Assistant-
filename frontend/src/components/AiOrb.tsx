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
    sm: {
      container: 'w-10 h-10',
      core: 'w-5 h-5',
      ring1: 'w-8 h-8',
      ring2: 'w-10 h-10',
      waveform: 'h-3'
    },
    md: {
      container: 'w-16 h-16',
      core: 'w-8 h-8',
      ring1: 'w-12 h-12',
      ring2: 'w-16 h-16',
      waveform: 'h-4'
    },
    lg: {
      container: 'w-32 h-32',
      core: 'w-16 h-16',
      ring1: 'w-24 h-24',
      ring2: 'w-32 h-32',
      waveform: 'h-6'
    },
    hero: {
      container: 'w-48 h-48 sm:w-60 sm:h-60',
      core: 'w-24 h-24 sm:w-30 sm:h-30',
      ring1: 'w-36 h-36 sm:w-46 sm:h-46',
      ring2: 'w-48 h-48 sm:w-60 sm:h-60',
      waveform: 'h-8'
    }
  };

  const currentSize = sizeMap[size];

  // Visual state glow colors
  const getGlowColor = () => {
    switch (state) {
      case 'listening':
        return 'rgba(0, 229, 255, 0.88)';
      case 'thinking':
        return 'rgba(139, 92, 246, 0.9)';
      case 'speaking':
        return 'rgba(59, 130, 246, 0.95)';
      case 'idle':
      default:
        return 'rgba(0, 229, 255, 0.5)';
    }
  };

  // State text label
  const getStateLabel = () => {
    switch (state) {
      case 'listening':
        return 'LISTENING';
      case 'thinking':
        return 'PROCESSING';
      case 'speaking':
        return 'SPEAKING';
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
      title={onClick ? `NOVA Core (${getStateLabel()}) - Click to interact` : `NOVA Core (${getStateLabel()})`}
    >
      {/* 1. Deep Atmospheric Outer Nebula Glow */}
      <motion.div
        className="absolute inset-[-10%] rounded-full blur-3xl pointer-events-none transition-colors duration-700"
        animate={
          reducedMotion
            ? { opacity: 0.5 }
            : {
                scale: state === 'listening' ? [1, 1.3, 1] : state === 'speaking' ? [1, 1.25, 1] : [1, 1.12, 1],
                opacity: state === 'listening' ? [0.65, 0.95, 0.65] : state === 'thinking' ? [0.6, 0.88, 0.6] : [0.4, 0.6, 0.4]
              }
        }
        transition={{
          repeat: Infinity,
          duration: state === 'thinking' ? 1.4 : state === 'listening' ? 1.6 : 3.8,
          ease: 'easeInOut'
        }}
        style={{
          background: `radial-gradient(circle, ${getGlowColor()} 0%, rgba(7, 11, 20, 0) 70%)`
        }}
      />

      {/* 2. Concentric Radar Acoustic Ripples (When Listening) */}
      {state === 'listening' && !reducedMotion && (
        <>
          <div className="absolute inset-0 rounded-full border border-cyan-400/70 animate-radar-sweep pointer-events-none" />
          <div
            className="absolute inset-0 rounded-full border border-cyan-300/40 animate-radar-sweep pointer-events-none"
            style={{ animationDelay: '0.6s' }}
          />
          <div
            className="absolute inset-0 rounded-full border border-blue-400/30 animate-radar-sweep pointer-events-none"
            style={{ animationDelay: '1.2s' }}
          />
        </>
      )}

      {/* 3. Outer Gyroscope Ring (Clockwise) with Segmented Ticks */}
      <motion.div
        className={`absolute rounded-full border border-dashed pointer-events-none ${currentSize.ring2}`}
        animate={
          reducedMotion
            ? {}
            : {
                rotate: 360,
                scale: state === 'speaking' ? [1, 1.06, 1] : state === 'listening' ? [1, 1.04, 1] : 1
              }
        }
        transition={{
          rotate: {
            repeat: Infinity,
            duration: state === 'thinking' ? 3.5 : 22,
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
          borderRightColor: 'rgba(0, 229, 255, 0.15)',
          borderBottomColor: '#8B5CF6',
          borderLeftColor: 'rgba(139, 92, 246, 0.15)',
          borderWidth: size === 'hero' ? '2px' : '1px'
        }}
      />

      {/* 4. Intermediate Reverse Gyroscope Ring (Counter-Clockwise) */}
      <motion.div
        className={`absolute rounded-full border pointer-events-none ${currentSize.ring1}`}
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
            duration: state === 'thinking' ? 2.8 : 15,
            ease: 'linear'
          },
          scale: {
            repeat: Infinity,
            duration: 1.5,
            ease: 'easeInOut'
          }
        }}
        style={{
          borderTopColor: 'rgba(139, 92, 246, 0.8)',
          borderRightColor: 'rgba(59, 130, 246, 0.2)',
          borderBottomColor: 'rgba(0, 229, 255, 0.8)',
          borderLeftColor: 'rgba(59, 130, 246, 0.2)',
          borderWidth: '1px'
        }}
      />

      {/* 5. Orbiting Quantum Energy Sparks */}
      {!reducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: state === 'thinking' ? 2.2 : 9,
            ease: 'linear'
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-200 shadow-[0_0_14px_#00E5FF]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-violet-300 shadow-[0_0_12px_#8B5CF6]" />
        </motion.div>
      )}

      {/* 6. Central 3D Quantum Core Sphere */}
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
                    ? [0.94, 1.14, 0.94]
                    : state === 'thinking'
                    ? [0.96, 1.06, 0.96]
                    : [1, 1.05, 1]
              }
        }
        transition={{
          repeat: Infinity,
          duration: state === 'speaking' ? 0.9 : state === 'listening' ? 1.3 : 3.2,
          ease: 'easeInOut'
        }}
        style={{
          background:
            state === 'thinking'
              ? 'radial-gradient(circle at 35% 35%, #E0E7FF 0%, #8B5CF6 35%, #3B82F6 70%, #070B14 100%)'
              : state === 'listening'
              ? 'radial-gradient(circle at 35% 35%, #ECFEFF 0%, #00E5FF 35%, #0284C7 70%, #070B14 100%)'
              : state === 'speaking'
              ? 'radial-gradient(circle at 35% 35%, #F5F3FF 0%, #8B5CF6 35%, #3B82F6 70%, #070B14 100%)'
              : 'radial-gradient(circle at 35% 35%, #A5F3FC 0%, #00E5FF 30%, #2563EB 70%, #070B14 100%)',
          boxShadow: `0 0 35px ${getGlowColor()}, inset 0 0 20px rgba(255,255,255,0.45)`
        }}
      >
        {/* Specular Hologram Sheen */}
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/70 via-transparent to-transparent pointer-events-none" />

        {/* Dynamic Center Quantum Node */}
        <motion.div
          className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_16px_#ffffff] z-20 pointer-events-none"
          animate={
            reducedMotion
              ? {}
              : {
                  scale: state === 'thinking' ? [0.8, 1.4, 0.8] : [0.9, 1.2, 0.9],
                  opacity: state === 'listening' ? [0.8, 1, 0.8] : [0.85, 1, 0.85]
                }
          }
          transition={{
            repeat: Infinity,
            duration: state === 'thinking' ? 0.8 : 2,
            ease: 'easeInOut'
          }}
        />
      </motion.div>

      {/* 7. Live Soundwave Bars (When Listening or Speaking) for Hero size */}
      {size === 'hero' && (state === 'listening' || state === 'speaking') && (
        <div className="absolute -top-7 flex items-end justify-center gap-1.5 h-6 z-20 pointer-events-none">
          <span className="w-1 bg-cyan-400 rounded-full animate-wave-1 shadow-[0_0_6px_#00E5FF]" />
          <span className="w-1 bg-blue-400 rounded-full animate-wave-2 shadow-[0_0_6px_#3B82F6]" />
          <span className="w-1 bg-violet-400 rounded-full animate-wave-3 shadow-[0_0_6px_#8B5CF6]" />
          <span className="w-1 bg-cyan-300 rounded-full animate-wave-4 shadow-[0_0_6px_#00E5FF]" />
          <span className="w-1 bg-blue-400 rounded-full animate-wave-2 shadow-[0_0_6px_#3B82F6]" />
        </div>
      )}

      {/* 8. State Badge for Hero size */}
      {size === 'hero' && (
        <div className="absolute -bottom-8 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-cyan-500/35 backdrop-blur-md shadow-xl pointer-events-none">
          <span
            className={`w-2 h-2 rounded-full ${
              state === 'listening'
                ? 'bg-cyan-400 animate-ping'
                : state === 'thinking'
                ? 'bg-violet-400 animate-pulse'
                : state === 'speaking'
                ? 'bg-blue-400 animate-bounce'
                : 'bg-emerald-400 shadow-[0_0_8px_#10B981]'
            }`}
          />
          <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-200 font-semibold">
            {getStateLabel()}
          </span>
        </div>
      )}
    </div>
  );
};
