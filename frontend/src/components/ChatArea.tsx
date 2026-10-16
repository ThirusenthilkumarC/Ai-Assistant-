import React, { useRef, useEffect } from 'react';
import { Sparkles, Code2, GraduationCap, Globe, ArrowRight } from 'lucide-react';
import type { AiState, AssistantMode, ChatMessage, Language } from '../types';
import { AiOrb } from './AiOrb';
import { ChatMessageBubble } from './ChatMessageBubble';

interface ChatAreaProps {
  messages: ChatMessage[];
  aiState: AiState;
  currentMode: AssistantMode;
  language: Language;
  onSelectSuggestion: (prompt: string, mode?: AssistantMode, lang?: Language) => void;
  onRetryMessage: (content: string) => void;
  onSpeakMessage: (text: string) => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  reducedMotion: boolean;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  aiState,
  language,
  onSelectSuggestion,
  onRetryMessage,
  onSpeakMessage,
  isSpeaking,
  onStopSpeaking,
  reducedMotion
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages or thinking state
  useEffect(() => {
    if (messages.length > 0 || aiState === 'thinking') {
      messagesEndRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }, [messages, aiState, reducedMotion]);

  // Suggestions definitions based on selected language
  const suggestions = [
    {
      id: 'coding-concept',
      titleEn: 'Explain a Programming Concept',
      descEn: 'Break down closures, async/await, or recursion',
      titleTa: 'நிரலாக்கக் கருத்தை விளக்குங்கள்',
      descTa: 'Async/Await அல்லது Algorithms எளிய முறையில்',
      icon: <Code2 size={20} className="text-cyan-400" />,
      promptEn: 'Explain how async/await and promises work in JavaScript under the hood with a clean example.',
      promptTa: 'JavaScript-ல் Promises மற்றும் Async/Await எவ்வாறு செயல்படுகிறது என்பதை எளிய தமிழில் விளக்குங்கள்.',
      suggestedMode: 'coding' as AssistantMode,
      borderGlow: 'hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]'
    },
    {
      id: 'debug-code',
      titleEn: 'Help Me Debug My Code',
      descEn: 'Fix errors, memory leaks, and logic flaws',
      titleTa: 'என் குறியீட்டில் உள்ள பிழையைத் திருத்துங்கள்',
      descTa: 'பிழைகள், Syntax issues மற்றும் தீர்வுகளை கண்டறிய',
      icon: <Sparkles size={20} className="text-blue-400" />,
      promptEn: 'Help me debug this TypeScript code: TypeError: Cannot read properties of undefined (reading "map"). How do I fix it safely?',
      promptTa: 'TypeError: Cannot read properties of undefined என்ற பிழை ஏன் ஏற்படுகிறது? அதைத் தீர்க்கும் வழியை விளக்குங்கள்.',
      suggestedMode: 'coding' as AssistantMode,
      borderGlow: 'hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]'
    },
    {
      id: 'teach-academic',
      titleEn: 'Teach Me Something New',
      descEn: 'Master complex academic & CS theories easily',
      titleTa: 'ஒரு புதிய கல்வித் தலைப்பை கற்றுத்தாருங்கள்',
      descTa: 'கணினி நெட்வொர்க்கிங் அல்லது AI கணிதம்',
      icon: <GraduationCap size={20} className="text-violet-400" />,
      promptEn: 'Teach me the concept of Neural Networks and Backpropagation using a clear, intuitive real-world analogy.',
      promptTa: 'செயற்கை நுண்ணறிவில் (AI) Machine Learning மற்றும் Deep Learning இடையேயான வித்தியாசத்தை விளக்குங்கள்.',
      suggestedMode: 'study' as AssistantMode,
      borderGlow: 'hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]'
    },
    {
      id: 'tamil-chat',
      titleEn: 'Chat with Me in Tamil',
      descEn: 'Converse fluently in natural Tamil or Tanglish',
      titleTa: 'தமிழுடன் உரையாடுங்கள் (தமிழ் பேச்சு)',
      descTa: 'இயற்கையான தமிழில் குரல் மற்றும் உரை உரையாடல்',
      icon: <Globe size={20} className="text-teal-400" />,
      promptEn: 'வணக்கம் NOVA! நீங்கள் என்னென்ன உதவிகளைச் செய்வீர்கள் என்று சுருக்கமாகக் கூறுங்கள்.',
      promptTa: 'வணக்கம் NOVA! நீங்கள் என்னென்ன உதவிகளைச் செய்வீர்கள் என்று சுருக்கமாகக் கூறுங்கள்.',
      suggestedMode: 'general' as AssistantMode,
      suggestedLang: 'ta' as Language,
      borderGlow: 'hover:border-teal-500/50 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-8 py-6 relative">
      {/* Background cyber grid effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* When NO messages exist, render Hero Empty State */}
      {messages.length === 0 ? (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] max-w-3xl mx-auto text-center px-2">
          {/* Main Animated AI Orb */}
          <div className="mb-6">
            <AiOrb state={aiState} size="hero" reducedMotion={reducedMotion} />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-mono">
            {language === 'ta' ? 'வணக்கம், நான் NOVA.' : "Hello, I'm NOVA."}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-lg font-light">
            {language === 'ta'
              ? 'உங்கள் நுண்ணறிவு தனிநபர் உதவியாளர் பேசவும் உதவவும் தயாராக உள்ளது.'
              : 'Your intelligent companion is ready.'}
          </p>

          {/* Four Interactive Suggestion Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full text-left">
            {suggestions.map(s => (
              <div
                key={s.id}
                onClick={() =>
                  onSelectSuggestion(
                    language === 'ta' ? s.promptTa : s.promptEn,
                    s.suggestedMode,
                    s.suggestedLang || language
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectSuggestion(
                      language === 'ta' ? s.promptTa : s.promptEn,
                      s.suggestedMode,
                      s.suggestedLang || language
                    );
                  }
                }}
                className={`p-4 rounded-2xl glass-panel transition-all duration-300 cursor-pointer group flex items-start gap-3.5 ${s.borderGlow}`}
              >
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/60 group-hover:scale-110 transition-transform flex-shrink-0">
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                      {language === 'ta' ? s.titleTa : s.titleEn}
                    </h3>
                    <ArrowRight
                      size={14}
                      className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {language === 'ta' ? s.descTa : s.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Conversation Message Stream */
        <div className="relative z-10 max-w-3xl mx-auto space-y-1">
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

          {/* Thinking / Computing Loading Indicator */}
          {aiState === 'thinking' && (
            <div className="flex items-start gap-3 my-4">
              <div className="w-9 h-9 rounded-full bg-slate-900 border border-violet-500/40 flex items-center justify-center shadow-lg shadow-violet-500/20 overflow-hidden flex-shrink-0">
                <AiOrb state="thinking" size="sm" reducedMotion={reducedMotion} />
              </div>
              <div className="glass-panel rounded-2xl rounded-tl-none p-4 text-xs font-mono text-cyan-300 flex items-center gap-2 border border-cyan-500/20">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>
                  {language === 'ta' ? 'NOVA சிந்திக்கிறது...' : 'NOVA is thinking and synthesizing response...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} className="h-4" />
        </div>
      )}
    </div>
  );
};
