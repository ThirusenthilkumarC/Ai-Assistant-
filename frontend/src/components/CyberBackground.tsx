import React, { useMemo } from 'react';

interface CyberBackgroundProps {
  reducedMotion?: boolean;
}

export const CyberBackground: React.FC<CyberBackgroundProps> = ({ reducedMotion = false }) => {
  // Generate random stable background stars
  const stars = useMemo(() => {
    return Array.from({ length: 45 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* 1. Deep Space Atmospheric Gradient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,229,255,0.06)_0%,_rgba(7,11,20,0)_70%)] blur-3xl" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.07)_0%,_rgba(7,11,20,0)_70%)] blur-3xl" />
      <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.04)_0%,_rgba(7,11,20,0)_70%)] blur-3xl" />

      {/* 2. Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* 3. Star Dust / Floating Particles */}
      {!reducedMotion &&
        stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-cyan-300 transition-opacity"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(0, 229, 255, 0.8)`,
              animation: `pulseGlow ${star.duration}s ease-in-out infinite ${star.delay}s`
            }}
          />
        ))}

      {/* 4. Top Horizon Neon Glow Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
    </div>
  );
};
