import React from 'react';
import { ChevronLeft, ChevronRight, Lock, RotateCw, Share2, Plus } from 'lucide-react';

interface WindowFrameProps {
  children: React.ReactNode;
  url?: string;
  onRefresh?: () => void;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  children,
  url = 'nova.ai',
  onRefresh
}) => {
  return (
    <div className="min-h-screen w-full bg-[#080A16] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* 1. Deep Atmospheric Night Sky with Nebula Backlighting */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 50% 10%, rgba(109, 40, 217, 0.18) 0%, transparent 60%),
            radial-gradient(circle at 10% 80%, rgba(36, 59, 104, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 90% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            #080A16
          `
        }}
      />

      {/* 2. Floating Desktop Application Window Container */}
      <div className="relative z-10 w-full max-w-[1440px] h-[92vh] min-h-[640px] max-h-[960px] rounded-2xl md:rounded-[28px] bg-[#0D1020]/95 backdrop-blur-3xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.7),_0_0_50px_rgba(109,40,217,0.12)] flex flex-col overflow-hidden">
        {/* Top Browser Window Header Bar */}
        <div className="h-11 px-4 bg-[#0B0D1B]/95 border-b border-white/[0.08] flex items-center justify-between select-none flex-shrink-0">
          {/* Left: Traffic Lights & Navigation */}
          <div className="flex items-center gap-4">
            {/* macOS-style Traffic light dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20 hover:brightness-110 transition-all cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20 hover:brightness-110 transition-all cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20 hover:brightness-110 transition-all cursor-pointer" />
            </div>

            {/* Navigation Chevrons */}
            <div className="hidden sm:flex items-center gap-1 text-slate-500">
              <button
                type="button"
                className="p-1 rounded hover:bg-white/5 hover:text-slate-300 transition-colors"
                title="Back"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="p-1 rounded hover:bg-white/5 hover:text-slate-300 transition-colors"
                title="Forward"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Center: Address Bar Pill */}
          <div className="flex-1 max-w-md mx-4">
            <div className="flex items-center justify-between px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-white/15 text-xs text-slate-300 transition-all">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-purple-600/40 flex items-center justify-center">
                  <Lock size={10} className="text-purple-300" />
                </div>
                <span className="font-sans font-medium tracking-wide text-slate-200">
                  {url}
                </span>
              </div>
              <button
                type="button"
                onClick={onRefresh}
                className="text-slate-500 hover:text-purple-300 transition-colors p-0.5"
                title="Reload"
              >
                <RotateCw size={11} />
              </button>
            </div>
          </div>

          {/* Right: Window Action Icons */}
          <div className="flex items-center gap-2 text-slate-500">
            <button
              type="button"
              className="p-1.5 rounded-lg hover:bg-white/5 hover:text-slate-300 transition-colors hidden sm:block"
              title="Share"
            >
              <Share2 size={14} />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-lg hover:bg-white/5 hover:text-slate-300 transition-colors"
              title="New Tab"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>

        {/* Inner Content Area */}
        <div className="flex-1 flex overflow-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
};
