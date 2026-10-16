import React, { useState } from 'react';
import {
  X,
  Volume2,
  Globe,
  Trash2,
  Sliders,
  ExternalLink,
  Key,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import type { AppSettings, AssistantMode, BackendStatus } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (updates: Partial<AppSettings>) => void;
  onClearHistory: () => void;
  backendStatus: BackendStatus;
  onRefreshBackendStatus: () => Promise<void>;
  availableVoices: SpeechSynthesisVoice[];
  totalConversations: number;
  onExportData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onClearHistory,
  backendStatus,
  onRefreshBackendStatus,
  availableVoices,
  totalConversations,
  onExportData
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'voice' | 'ai' | 'about'>('general');
  const [isTestingStatus, setIsTestingStatus] = useState(false);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTestingStatus(true);
    try {
      await onRefreshBackendStatus();
    } finally {
      setIsTestingStatus(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
      <div
        className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl glass-panel-glow bg-[#0B1220]/95 border border-cyan-500/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Sliders size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide font-mono">
                NOVA AI SETTINGS
              </h2>
              <p className="text-xs text-slate-400">Configure assistant preferences and connectivity</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center px-6 border-b border-cyan-500/15 gap-4 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('general')}
            type="button"
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'general'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe size={14} />
            General & Data
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            type="button"
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'voice'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Volume2 size={14} />
            Voice & Speech
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            type="button"
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ai'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key size={14} />
            AI Provider & Setup
          </button>
          <button
            onClick={() => setActiveTab('about')}
            type="button"
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'about'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info size={14} />
            About NOVA
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* TAB 1: General & Data */}
          {activeTab === 'general' && (
            <div className="space-y-5">
              {/* Language selection */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2 font-mono uppercase tracking-wider">
                  Default Language
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ language: 'en' })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      settings.language === 'en'
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950/20'
                        : 'bg-slate-900/70 border-slate-700/60 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-semibold text-sm">English</div>
                    <div className="text-xs text-slate-400 mt-0.5">International English responses</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ language: 'ta' })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      settings.language === 'ta'
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950/20'
                        : 'bg-slate-900/70 border-slate-700/60 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-semibold text-sm">தமிழ் (Tamil)</div>
                    <div className="text-xs text-slate-400 mt-0.5">தமிழ் மற்றும் தங்கிலீஷ் ஆதரவு</div>
                  </button>
                </div>
              </div>

              {/* Default Mode selection */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2 font-mono uppercase tracking-wider">
                  Default Assistant Mode
                </label>
                <select
                  value={settings.mode}
                  onChange={e => onUpdateSettings({ mode: e.target.value as AssistantMode })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="general">AI Assistant (General Purpose)</option>
                  <option value="coding">Coding Assistant (Software & Debugging)</option>
                  <option value="study">Study Assistant (Computer Science & Academia)</option>
                </select>
              </div>

              {/* Reduced Motion Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/70 border border-slate-700/60">
                <div>
                  <div className="font-medium text-slate-200 text-sm">Reduced Motion</div>
                  <div className="text-xs text-slate-400">Reduce gyroscope spins and pulse animations</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.reducedMotion}
                  onChange={e => onUpdateSettings({ reducedMotion: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-800 border-slate-700 cursor-pointer"
                />
              </div>

              {/* Data & History Controls */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-200 text-sm">Local Conversation Storage</span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    {totalConversations} Saved {totalConversations === 1 ? 'Chat' : 'Chats'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Conversations are saved securely in your browser's localStorage. No private messages or API keys are stored on external databases.
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={onExportData}
                    type="button"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-600 transition-colors"
                  >
                    Export All Chats (JSON)
                  </button>
                  <button
                    onClick={onClearHistory}
                    type="button"
                    className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-xs font-medium text-red-300 border border-red-500/40 transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 size={12} />
                    Clear All Chats
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Voice & Speech */}
          {activeTab === 'voice' && (
            <div className="space-y-5">
              {/* Voice output toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/70 border border-slate-700/60">
                <div>
                  <div className="font-medium text-slate-200 text-sm">Enable Spoken Responses</div>
                  <div className="text-xs text-slate-400">Read assistant responses aloud automatically</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.voice.enabled}
                  onChange={e =>
                    onUpdateSettings({
                      voice: { ...settings.voice, enabled: e.target.checked }
                    })
                  }
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-800 border-slate-700 cursor-pointer"
                />
              </div>

              {/* Preferred Voice Dropdown */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2 font-mono uppercase tracking-wider">
                  Synthesizer Voice ({availableVoices.length} detected)
                </label>
                <select
                  value={settings.voice.voiceURI}
                  onChange={e =>
                    onUpdateSettings({
                      voice: { ...settings.voice, voiceURI: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs font-mono"
                >
                  <option value="">Default (Auto-select based on language)</option>
                  {availableVoices.map(voice => (
                    <option key={voice.voiceURI} value={voice.voiceURI}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Tamil voice support depends on installed OS voices (e.g., Windows Microsoft Valluvar or browser speech packs).
                </p>
              </div>

              {/* Speech Rate Slider */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Speech Rate</span>
                  <span className="font-mono text-cyan-400">{settings.voice.rate}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.75"
                  step="0.05"
                  value={settings.voice.rate}
                  onChange={e =>
                    onUpdateSettings({
                      voice: { ...settings.voice, rate: parseFloat(e.target.value) }
                    })
                  }
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Speech Pitch Slider */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Voice Pitch</span>
                  <span className="font-mono text-cyan-400">{settings.voice.pitch}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={settings.voice.pitch}
                  onChange={e =>
                    onUpdateSettings({
                      voice: { ...settings.voice, pitch: parseFloat(e.target.value) }
                    })
                  }
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 3: AI Provider & Setup */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              {/* Connection Status Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {backendStatus.connected ? (
                      backendStatus.configured ? (
                        <CheckCircle2 size={18} className="text-emerald-400" />
                      ) : (
                        <AlertTriangle size={18} className="text-amber-400" />
                      )
                    ) : (
                      <XCircle size={18} className="text-red-400" />
                    )}
                    <span className="font-semibold text-white">
                      {backendStatus.connected
                        ? backendStatus.configured
                          ? 'Google Gemini AI Connected'
                          : 'Running in Demo Mode'
                        : 'Backend Server Unreachable'}
                    </span>
                  </div>
                  <button
                    onClick={handleTestConnection}
                    disabled={isTestingStatus}
                    type="button"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 border border-slate-600 transition-colors"
                  >
                    <RefreshCw size={12} className={isTestingStatus ? 'animate-spin' : ''} />
                    Test Connection
                  </button>
                </div>

                <div className="text-xs text-slate-300 font-mono space-y-1 bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                  <div>Provider: <span className="text-cyan-400">{backendStatus.provider}</span></div>
                  <div>Model: <span className="text-cyan-400">{backendStatus.model}</span></div>
                  <div>Status Info: <span className="text-slate-400">{backendStatus.message}</span></div>
                </div>
              </div>

              {/* Instructions on how to add API Key */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold text-xs font-mono uppercase tracking-wider">
                  <Key size={14} />
                  How to Enable Live Gemini AI
                </div>
                <ol className="text-xs text-slate-300 list-decimal list-inside space-y-1.5 leading-relaxed">
                  <li>
                    Get a free API key from{' '}
                    <a
                      href="https://aistudio.google.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:underline inline-flex items-center gap-1 font-mono"
                    >
                      Google AI Studio <ExternalLink size={10} />
                    </a>
                  </li>
                  <li>
                    Open the file <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">backend/.env</code> in your editor.
                  </li>
                  <li>
                    Add your key: <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">GEMINI_API_KEY=your_key_here</code>
                  </li>
                  <li>
                    Restart or reload the backend, then click <strong>Test Connection</strong> above!
                  </li>
                </ol>
                <p className="text-[11px] text-slate-400 italic">
                  * Note: For security, API keys are kept strictly on the backend and never exposed to the frontend browser.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: About NOVA AI */}
          {activeTab === 'about' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                <Sparkles size={32} className="text-white" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-mono tracking-wider">NOVA AI</h3>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">
                  "Your Voice. Your Intelligence. Your Assistant."
                </p>
              </div>

              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                NOVA AI is a futuristic personal assistant application combining real-time AI, voice synthesis, speech recognition, and dedicated assistance modes for programming and academic learning.
              </p>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 space-y-1.5 text-left max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Author:</span>
                  <span className="font-medium text-white">Thirusenthilkumar C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">GitHub:</span>
                  <a
                    href="https://github.com/ThirusenthilkumarC"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    ThirusenthilkumarC <ExternalLink size={10} />
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stack:</span>
                  <span className="text-slate-200">React, TypeScript, Express, Gemini</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Version:</span>
                  <span className="text-cyan-400 font-mono">1.0.0</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-950/80 border-t border-cyan-500/15 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white text-xs font-semibold shadow-md transition-all font-mono"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
