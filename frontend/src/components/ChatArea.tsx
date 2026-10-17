import React, { useRef, useEffect } from 'react';
import { Code2, Compass, Brain, MoreHorizontal, ChevronDown, CheckCircle2, AlertTriangle, XCircle, Menu } from 'lucide-react';
import type { AiState, AssistantMode, ChatMessage, Language, BackendStatus } from '../types';
import { AiOrb } from './AiOrb';
import { ChatMessageBubble } from './ChatMessageBubble';

interface ChatAreaProps {
  messages: ChatMessage[];
  aiState: AiState;
  currentMode: AssistantMode;
  onSelectMode: (mode: AssistantMode) => void;
  language: Language;
  onSelectSuggestion: (prompt: string, mode?: AssistantMode, lang?: Language) => void;
  onRetryMessage: (content: string) => void;
  onSpeakMessage: (text: string) => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  reducedMotion: boolean;
  onOrbClick?: () => void;
  onOpenSettings: () => void;
  onOpenMobileMenu?: () => void;
  backendStatus: BackendStatus;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  aiState,
  currentMode,
  onSelectMode,
  language,
  onSelectSuggestion,
  onRetryMessage,
  onSpeakMessage,
  isSpeaking,
  onStopSpeaking,
  reducedMotion,
  onOrbClick,
  onOpenSettings,
  onOpenMobileMenu,
  backendStatus
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = React.useState(false);

  // Auto-scroll to bottom on new messages or thinking state
  useEffect(() => {
    if (messages.length > 0 || aiState === 'thinking') {
      messagesEndRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }, [messages, aiState, reducedMotion]);

  // Three exact suggested prompt cards matching the reference image
  const suggestionCards = [
    {
      id: 'explain-code',
      icon: <Code2 size={16} className="text-purple-300" />,
      titleEn: 'Explain this Code',
      descEn: 'Can you find the bug in this JavaScript snippet and suggest solutions?',
      titleTa: 'இந்த குறியீட்டை விளக்குங்கள்',
      descTa: 'JavaScript குறியீட்டில் உள்ள பிழையைக் கண்டறிந்து சரிசெய்ய முடியுமா?',
      promptEn: 'Can you explain how this JavaScript snippet works, identify any potential bugs, and suggest a cleaner implementation?\n\n```javascript\nconst data = await fetch("/api/items");\nconst result = data.json();\nreturn result.map(i => i.name);\n```',
      promptTa: 'இந்த JavaScript குறியீடு எவ்வாறு செயல்படுகிறது என்பதை விளக்கி, இதில் ஏதேனும் பிழை உள்ளதா எனக் கண்டறிந்து சரிசெய்யவும்:\n\n```javascript\nconst data = await fetch("/api/items");\nconst result = data.json();\nreturn result.map(i => i.name);\n```',
      suggestedMode: 'coding' as AssistantMode
    },
    {
      id: 'plan-project',
      icon: <Compass size={16} className="text-purple-300" />,
      titleEn: 'Plan a Project',
      descEn: 'Create a practical, step-by-step roadmap for your software idea.',
      titleTa: 'ஒரு திட்டத்தை வகுக்கவும்',
      descTa: 'உங்கள் மென்பொருள் யோசனைக்கான நடைமுறை படிநிலைகளை உருவாக்கவும்.',
      promptEn: 'Create a comprehensive, step-by-step project roadmap to build a modern full-stack web application from scratch with milestones.',
      promptTa: 'புதிய மென்பொருள் திட்டத்தை தொடங்குவதற்கான படிநிலைகள் மற்றும் திட்ட வரைபடத்தை (Project Roadmap) உருவாக்கவும்.',
      suggestedMode: 'general' as AssistantMode
    },
    {
      id: 'brainstorm-ideas',
      icon: <Brain size={16} className="text-purple-300" />,
      titleEn: 'Brainstorm Ideas',
      descEn: 'Discover creative ideas, unique angles, and new possibilities.',
      titleTa: 'புதிய யோசனைகளை ஆராயுங்கள்',
      descTa: 'படைப்பாற்றல்மிக்க யோசனைகள் மற்றும் புதிய வாய்ப்புகளை கண்டறியவும்.',
      promptEn: 'Brainstorm 5 innovative and practical AI-assisted developer tools that solve real productivity bottlenecks today.',
      promptTa: 'மென்பொருள் உருவாக்குநர்களின் உற்பத்தித்திறனை அதிகரிக்கும் 5 புதுமையான AI கருவிகளுக்கான யோசனைகளை வழங்கவும்.',
      suggestedMode: 'study' as AssistantMode
    }
  ];

  const getModeLabel = () => {
    switch (currentMode) {
      case 'coding':
        return 'NOVA 4.0e (Coding)';
      case 'study':
        return 'NOVA 4.0e (Study)';
      case 'general':
      default:
        return 'NOVA 4.0e';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0D1020]/90 rounded-2xl md:rounded-[24px] border border-white/[0.08] m-2 md:m-3 p-4 md:p-6 overflow-hidden relative shadow-2xl">
      {/* Background Subtle Gradient Lighting matching reference */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-[24px]"
        style={{
          background: `
            radial-gradient(circle at 50% 30%, rgba(109, 40, 217, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(36, 59, 104, 0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* TOP HEADER BAR INSIDE MAIN PANEL */}
      <div className="flex items-center justify-between pb-3 relative z-20 flex-shrink-0">
        {/* Top-Left: Mobile Menu & Model Selector Pill matching "Nebula 4.0e v" in reference */}
        <div className="flex items-center gap-2">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              type="button"
              className="md:hidden p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-300"
              title="Open Sidebar"
            >
              <Menu size={16} />
            </button>
          )}

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsModelDropdownOpen(prev => !prev)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-medium text-slate-200 transition-all cursor-pointer shadow-sm"
            >
            <span className="tracking-wide">{getModeLabel()}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {/* Model Selector Dropdown Menu */}
          {isModelDropdownOpen && (
            <div className="absolute top-10 left-0 w-52 rounded-xl bg-[#141829] border border-white/10 shadow-2xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Assistant Mode
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectMode('general');
                  setIsModelDropdownOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                  currentMode === 'general' ? 'bg-purple-900/40 text-purple-200 font-medium' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>NOVA General 4.0e</span>
                {currentMode === 'general' && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectMode('coding');
                  setIsModelDropdownOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                  currentMode === 'coding' ? 'bg-purple-900/40 text-purple-200 font-medium' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>NOVA Coding Pro</span>
                {currentMode === 'coding' && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectMode('study');
                  setIsModelDropdownOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                  currentMode === 'study' ? 'bg-purple-900/40 text-purple-200 font-medium' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>NOVA Academic Tutor</span>
                {currentMode === 'study' && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
              </button>

              <div className="border-t border-white/10 mt-1 pt-1 px-2 py-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                {backendStatus.configured ? (
                  <CheckCircle2 size={12} className="text-emerald-400" />
                ) : backendStatus.connected ? (
                  <AlertTriangle size={12} className="text-amber-400" />
                ) : (
                  <XCircle size={12} className="text-red-400" />
                )}
                <span className="truncate">
                  {backendStatus.configured ? 'Gemini 2.5 Active' : 'Demo Mode Active'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

        {/* Top-Right: Circular three-dot button matching reference */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          title="Settings & Options"
        >
          <MoreHorizontal size={15} />
        </button>
      </div>

      {/* CENTER HERO SECTION OR CONVERSATION STREAM */}
      <div className="flex-1 overflow-y-auto px-1 sm:px-4 py-2 relative z-10 flex flex-col justify-start">
        {messages.length === 0 ? (
          /* HERO EMPTY STATE — EXACT MATCH TO REFERENCE */
          <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto text-center px-2 py-6">
            {/* Cosmic AI Orb */}
            <div className="mb-6">
              <AiOrb
                state={aiState}
                size="hero"
                onClick={onOrbClick}
                reducedMotion={reducedMotion}
              />
            </div>

            {/* Exact Welcome Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-2 tracking-tight font-sans">
              Welcome to your cognitive co-pilot
            </h1>

            {/* Exact Subtitle */}
            <p className="text-sm sm:text-base text-slate-400 mb-8 max-w-lg leading-relaxed font-normal">
              {language === 'ta'
                ? 'நான் NOVA. நீங்கள் என்னிடம் குறியீடு எழுதவோ, திட்டமிடவோ அல்லது புதிய யோசனைகளை ஆராயவோ கேட்கலாம்.'
                : "I am NOVA. You can ask me to write, code, plan, or explore any idea."}
            </p>

            {/* Three Suggested Prompt Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full text-left">
              {suggestionCards.map(card => (
                <div
                  key={card.id}
                  onClick={() =>
                    onSelectSuggestion(
                      language === 'ta' ? card.promptTa : card.promptEn,
                      card.suggestedMode,
                      language
                    )
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onSelectSuggestion(
                        language === 'ta' ? card.promptTa : card.promptEn,
                        card.suggestedMode,
                        language
                      );
                    }
                  }}
                  className="p-4 sm:p-5 rounded-2xl glass-card flex flex-col justify-between cursor-pointer group select-none"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-purple-300 group-hover:border-purple-400/50 group-hover:scale-105 transition-all">
                      {card.icon}
                    </div>
                    <h3 className="font-medium text-xs sm:text-sm text-slate-100 group-hover:text-purple-300 transition-colors">
                      {language === 'ta' ? card.titleTa : card.titleEn}
                    </h3>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-400 line-clamp-3">
                    {language === 'ta' ? card.descTa : card.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ACTIVE CONVERSATION STREAM */
          <div className="max-w-3xl w-full mx-auto space-y-2 py-2">
            {messages.map((msg, index) => (
              <ChatMessageBubble
                key={msg.id || index}
                message={msg}
                onRetry={onRetryMessage}
                onSpeak={onSpeakMessage}
                isSpeakingThis={isSpeaking}
                onStopSpeak={onStopSpeaking}
              />
            ))}

            {/* Thinking / Synthesizing State */}
            {aiState === 'thinking' && (
              <div className="flex items-start gap-3 my-4 animate-in fade-in duration-200">
                <div className="w-8 h-8 rounded-full bg-[#121629] border border-purple-500/40 flex items-center justify-center shadow-lg shadow-purple-900/30 overflow-hidden flex-shrink-0">
                  <AiOrb state="thinking" size="sm" reducedMotion={reducedMotion} />
                </div>
                <div className="glass-card rounded-2xl rounded-tl-none p-3.5 text-xs text-purple-200 flex items-center gap-2.5 border border-purple-500/30 shadow-xl">
                  <div className="flex items-end gap-1 h-3.5">
                    <span className="w-1 bg-purple-400 rounded-full animate-wave-1" />
                    <span className="w-1 bg-pink-400 rounded-full animate-wave-2" />
                    <span className="w-1 bg-indigo-400 rounded-full animate-wave-3" />
                  </div>
                  <span className="font-sans text-[11px] text-slate-300">
                    {language === 'ta' ? 'NOVA பதிலைத் தயாரிக்கிறது...' : 'NOVA is thinking...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>
    </div>
  );
};
