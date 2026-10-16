import React from 'react';
import { Menu, Volume2, VolumeX, Trash2, Settings, Sparkles, Code2, GraduationCap, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import type { AssistantMode, BackendStatus, Language } from '../types';

interface HeaderProps {
  currentMode: AssistantMode;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  onClearChat: () => void;
  onOpenSettings: () => void;
  onOpenMobileMenu: () => void;
  backendStatus: BackendStatus;
  hasMessages: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  language,
  onLanguageChange,
  voiceEnabled,
  onToggleVoice,
  onClearChat,
  onOpenSettings,
  onOpenMobileMenu,
  backendStatus,
  hasMessages
}) => {
  const getModeInfo = () => {
    switch (currentMode) {
      case 'coding':
        return {
          label: language === 'ta' ? 'நிரலாக்க உதவியாளர்' : 'Coding Assistant',
          icon: <Code2 size={14} className="text-cyan-400" />,
          color: 'border-cyan-500/30 text-cyan-300 bg-cyan-950/40'
        };
      case 'study':
        return {
          label: language === 'ta' ? 'கல்வி உதவியாளர்' : 'Study Assistant',
          icon: <GraduationCap size={14} className="text-violet-400" />,
          color: 'border-violet-500/30 text-violet-300 bg-violet-950/40'
        };
      case 'general':
      default:
        return {
          label: language === 'ta' ? 'பொது உதவியாளர்' : 'AI Assistant',
          icon: <Sparkles size={14} className="text-blue-400" />,
          color: 'border-blue-500/30 text-blue-300 bg-blue-950/40'
        };
    }
  };

  const modeInfo = getModeInfo();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6 py-3 bg-[#0B1220]/80 backdrop-blur-xl border-b border-cyan-500/15 select-none">
      {/* Left Area: Mobile hamburger & Mode Badge */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onOpenMobileMenu}
          type="button"
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
          aria-label="Toggle navigation drawer"
        >
          <Menu size={20} />
        </button>

        {/* Current Active Mode Badge */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${modeInfo.color}`}>
          {modeInfo.icon}
          <span className="tracking-wide">{modeInfo.label}</span>
        </div>

        {/* Backend Status Pill */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-[11px] font-mono cursor-pointer"
          title={`Backend: ${backendStatus.message}`}
          onClick={onOpenSettings}
        >
          {backendStatus.connected ? (
            backendStatus.configured ? (
              <>
                <CheckCircle2 size={12} className="text-emerald-400" />
                <span className="text-emerald-400">Gemini Online</span>
              </>
            ) : (
              <>
                <AlertTriangle size={12} className="text-amber-400" />
                <span className="text-amber-300">Demo Mode</span>
              </>
            )
          ) : (
            <>
              <XCircle size={12} className="text-red-400" />
              <span className="text-red-400">Server Offline</span>
            </>
          )}
        </div>
      </div>

      {/* Right Area: Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Language Selector Switcher */}
        <div className="flex items-center rounded-xl bg-slate-900/90 border border-slate-700/80 p-0.5">
          <button
            onClick={() => onLanguageChange('en')}
            type="button"
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              language === 'en'
                ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => onLanguageChange('ta')}
            type="button"
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              language === 'ta'
                ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            தமிழ்
          </button>
        </div>

        {/* Voice Toggle Button */}
        <button
          onClick={onToggleVoice}
          type="button"
          title={voiceEnabled ? 'Spoken responses enabled' : 'Spoken responses muted'}
          className={`p-2 rounded-xl transition-all ${
            voiceEnabled
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/80 border border-slate-700/60'
          }`}
        >
          {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        {/* Clear Current Chat Button (if messages exist) */}
        {hasMessages && (
          <button
            onClick={onClearChat}
            type="button"
            title="Clear current chat"
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-900/80 border border-slate-700/60 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        )}

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          type="button"
          title="Open settings"
          className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-900/80 border border-slate-700/60 transition-colors"
        >
          <Settings size={16} />
        </button>
      </div>
    </header>
  );
};
