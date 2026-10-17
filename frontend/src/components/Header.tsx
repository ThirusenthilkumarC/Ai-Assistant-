import React from 'react';
import {
  Menu,
  Volume2,
  VolumeX,
  Trash2,
  Settings,
  Sparkles,
  Code2,
  GraduationCap,
  AlertTriangle,
  XCircle,
  Bot
} from 'lucide-react';
import type { AssistantMode, BackendStatus, Language } from '../types';

interface HeaderProps {
  currentMode: AssistantMode;
  onSelectMode: (mode: AssistantMode) => void;
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
  onSelectMode,
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
  const modes: { id: AssistantMode; labelEn: string; labelTa: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'general',
      labelEn: 'General',
      labelTa: 'பொது',
      icon: <Sparkles size={14} />,
      color: 'from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/40'
    },
    {
      id: 'coding',
      labelEn: 'Coding',
      labelTa: 'நிரல்',
      icon: <Code2 size={14} />,
      color: 'from-cyan-500/20 to-teal-500/20 text-cyan-300 border-cyan-500/40'
    },
    {
      id: 'study',
      labelEn: 'Study',
      labelTa: 'கல்வி',
      icon: <GraduationCap size={14} />,
      color: 'from-violet-500/20 to-purple-500/20 text-violet-300 border-violet-500/40'
    }
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6 py-2.5 bg-[#0B1220]/85 backdrop-blur-2xl border-b border-cyan-500/20 select-none">
      {/* Left Area: Mobile Menu & Assistant Mode Selector */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onOpenMobileMenu}
          type="button"
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
          aria-label="Toggle navigation drawer"
        >
          <Menu size={20} />
        </button>

        {/* Brand Name on Mobile when Sidebar Collapsed */}
        <div className="md:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
            <Bot size={16} />
          </div>
          <span className="font-extrabold text-sm tracking-wider font-mono text-cyan-300">
            NOVA
          </span>
        </div>

        {/* Header Mode Selector Pills */}
        <div className="hidden sm:flex items-center rounded-xl bg-slate-900/90 border border-slate-700/70 p-1 gap-1">
          {modes.map(mode => {
            const isActive = currentMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => onSelectMode(mode.id)}
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${mode.color} shadow-[0_0_12px_rgba(0,229,255,0.2)] border`
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {mode.icon}
                <span>{language === 'ta' ? mode.labelTa : mode.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Backend / AI Status Pill */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/70 text-[11px] font-mono cursor-pointer hover:border-cyan-500/40 transition-colors"
          title={`Backend Status: ${backendStatus.message}`}
          onClick={onOpenSettings}
        >
          {backendStatus.connected ? (
            backendStatus.configured ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 hidden xs:inline font-medium">Gemini Online</span>
              </>
            ) : (
              <>
                <AlertTriangle size={12} className="text-amber-400" />
                <span className="text-amber-300 hidden xs:inline font-medium">Demo Mode</span>
              </>
            )
          ) : (
            <>
              <XCircle size={12} className="text-red-400" />
              <span className="text-red-400 hidden xs:inline font-medium">Offline</span>
            </>
          )}
        </div>
      </div>

      {/* Right Area: Language Switcher, Voice Toggle, Clear, Settings */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Language Selector Switcher */}
        <div className="flex items-center rounded-xl bg-slate-900/90 border border-slate-700/80 p-0.5">
          <button
            onClick={() => onLanguageChange('en')}
            type="button"
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              language === 'en'
                ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-500/50 shadow-sm'
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
                ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-500/50 shadow-sm'
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
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_14px_rgba(0,229,255,0.25)]'
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
