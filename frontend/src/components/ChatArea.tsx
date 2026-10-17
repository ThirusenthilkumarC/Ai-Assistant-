import React, { useRef, useEffect } from 'react';
import { Sparkles, Code2, GraduationCap, HelpCircle, ArrowRight } from 'lucide-react';
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
  onOrbClick?: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  aiState,
  currentMode,
  language,
  onSelectSuggestion,
  onRetryMessage,
  onSpeakMessage,
  isSpeaking,
  onStopSpeaking,
  reducedMotion,
  onOrbClick
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages or thinking state
  useEffect(() => {
    if (messages.length > 0 || aiState === 'thinking') {
      messagesEndRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }, [messages, aiState, reducedMotion]);

  // Suggested prompt cards according to specification:
  // • Explain a concept
  // • Help me debug code
  // • Learn something new
  // • Answer my question
  const suggestions = [
    {
      id: 'explain-concept',
      titleEn: 'Explain a concept',
      descEn: 'Break down complex algorithms, async/await, or design patterns',
      titleTa: 'ஒரு கருத்தை விளக்குங்கள்',
      descTa: 'அல்காரிதம்கள் அல்லது தொழில்நுட்ப கருத்துக்கள் எளிய முறையில்',
      icon: <Code2 size={20} className="text-cyan-400" />,
      badge: 'CODING',
      promptEn: 'Explain how async/await and Promises work in JavaScript under the hood with a concise example.',
      promptTa: 'JavaScript-ல் Promises மற்றும் Async/Await எவ்வாறு செயல்படுகிறது என்பதை எளிய தமிழில் விளக்குங்கள்.',
      suggestedMode: 'coding' as AssistantMode,
      borderGlow: 'hover:border-cyan-500/60 hover:shadow-[0_0_25px_rgba(0,229,255,0.18)]'
    },
    {
      id: 'debug-code',
      titleEn: 'Help me debug code',
      descEn: 'Identify runtime bugs, memory leaks, and syntax flaws',
      titleTa: 'குறியீட்டுப் பிழையைத் திருத்துங்கள்',
      descTa: 'Runtime errors, syntax issues மற்றும் தீர்வுகளை கண்டறிய',
      icon: <Sparkles size={20} className="text-blue-400" />,
      badge: 'DEBUG',
      promptEn: 'Help me debug this TypeScript error: "TypeError: Cannot read properties of undefined (reading \'map\')". How do I handle it safely?',
      promptTa: 'TypeError: Cannot read properties of undefined என்ற பிழை ஏன் ஏற்படுகிறது? அதைத் தீர்க்கும் வழியை விளக்குங்கள்.',
      suggestedMode: 'coding' as AssistantMode,
      borderGlow: 'hover:border-blue-500/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.18)]'
    },
    {
      id: 'learn-new',
      titleEn: 'Learn something new',
      descEn: 'Explore neural networks, quantum computing, or CS theory',
      titleTa: 'புதிய ஒன்றைக் கற்றுக் கொள்ளுங்கள்',
      descTa: 'Neural Networks அல்லது கணினி அறிவியல் கோட்பாடுகள்',
      icon: <GraduationCap size={20} className="text-violet-400" />,
      badge: 'ACADEMIC',
      promptEn: 'Teach me the core concepts of Neural Networks and Attention mechanisms using an intuitive real-world analogy.',
      promptTa: 'செயற்கை நுண்ணறிவில் (AI) Machine Learning மற்றும் Deep Learning இடையேயான வித்தியாசத்தை விளக்குங்கள்.',
      suggestedMode: 'study' as AssistantMode,
      borderGlow: 'hover:border-violet-500/60 hover:shadow-[0_0_25px_rgba(139,92,246,0.18)]'
    },
    {
      id: 'answer-question',
      titleEn: 'Answer my question',
      descEn: 'Ask any question in natural English or fluent Tamil (தமிழ்)',
      titleTa: 'என் கேள்விக்கு விடையளியுங்கள்',
      descTa: 'இயற்கையான தமிழ் மற்றும் ஆங்கிலத்தில் எந்த கேள்விக்கும் பதில்',
      icon: <HelpCircle size={20} className="text-teal-400" />,
      badge: 'GENERAL',
      promptEn: 'What is the fundamental difference between concurrency and parallelism in computer systems?',
      promptTa: 'வணக்கம் NOVA! கணினி அமைப்புகளில் Concurrency மற்றும் Parallelism இடையேயான வேறுபாடு என்ன?',
      suggestedMode: 'general' as AssistantMode,
      borderGlow: 'hover:border-teal-500/60 hover:shadow-[0_0_25px_rgba(45,212,191,0.18)]'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-8 py-6 relative z-10 flex flex-col">
      {/* When NO messages exist, render Hero Empty State */}
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto text-center px-2 py-4">
          {/* Main Animated AI Orb */}
          <div className="mb-7">
            <AiOrb
              state={aiState}
              size="hero"
              onClick={onOrbClick}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-mono">
            {language === 'ta' ? 'வணக்கம், நான் NOVA.' : "Hello, I'm NOVA."}
          </h1>

          {/* Subtitle & Current Mode Pill */}
          <p className="text-base sm:text-lg text-slate-400 mb-3 max-w-lg font-light tracking-wide">
            {language === 'ta'
              ? 'உங்கள் அறிவார்ந்த AI தோழன் உதவத் தயாராக உள்ளது.'
              : 'Your intelligent AI companion.'}
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="uppercase tracking-wider">{currentMode} Assistant Mode</span>
          </div>

          {/* Four Interactive Suggestion Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full text-left">
            {suggestions.map(s => (
              <div
                key={s.id}
                onClick={() =>
                  onSelectSuggestion(
                    language === 'ta' ? s.promptTa : s.promptEn,
                    s.suggestedMode,
                    language
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectSuggestion(
                      language === 'ta' ? s.promptTa : s.promptEn,
                      s.suggestedMode,
                      language
                    );
                  }
                }}
                className={`p-4 sm:p-5 rounded-2xl glass-panel shimmer-hover transition-all duration-300 cursor-pointer group flex items-start gap-4 border border-cyan-500/20 ${s.borderGlow}`}
              >
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all flex-shrink-0 shadow-lg">
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm sm:text-base text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                        {language === 'ta' ? s.titleTa : s.titleEn}
                      </h3>
                      <span className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase">
                        {s.badge}
                      </span>
                    </div>
                    <ArrowRight
                      size={15}
                      className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {language === 'ta' ? s.descTa : s.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Conversation Message Stream */
        <div className="max-w-3xl w-full mx-auto space-y-1">
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

          {/* Typing / Thinking Loading Indicator */}
          {aiState === 'thinking' && (
            <div className="flex items-start gap-3 my-4 animate-in fade-in duration-200">
              <div className="w-9 h-9 rounded-full bg-slate-900 border border-violet-500/50 flex items-center justify-center shadow-lg shadow-violet-500/20 overflow-hidden flex-shrink-0">
                <AiOrb state="thinking" size="sm" reducedMotion={reducedMotion} />
              </div>
              <div className="glass-panel-glow rounded-2xl rounded-tl-none p-4 text-xs font-mono text-cyan-300 flex items-center gap-3 border border-cyan-500/30 shadow-xl">
                {/* Miniature animated sound wave bars */}
                <div className="flex items-end gap-1 h-4">
                  <span className="w-1 bg-cyan-400 rounded-full animate-wave-1" />
                  <span className="w-1 bg-violet-400 rounded-full animate-wave-2" />
                  <span className="w-1 bg-blue-400 rounded-full animate-wave-3" />
                  <span className="w-1 bg-cyan-300 rounded-full animate-wave-4" />
                </div>
                <span className="tracking-wide">
                  {language === 'ta'
                    ? 'NOVA சிந்திக்கிறது மற்றும் பதிலை உருவாக்குகிறது...'
                    : 'NOVA is synthesizing response...'}
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
