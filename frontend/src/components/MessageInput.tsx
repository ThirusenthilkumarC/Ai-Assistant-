import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Square, Loader2 } from 'lucide-react';
import type { AssistantMode, Language } from '../types';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onStopGenerating: () => void;
  isListening: boolean;
  isGenerating: boolean;
  isSpeaking: boolean;
  currentMode: AssistantMode;
  language: Language;
  transcript?: string;
  isSpeechRecognitionSupported: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onStartListening,
  onStopListening,
  onStopGenerating,
  isListening,
  isGenerating,
  isSpeaking,
  currentMode,
  language,
  transcript = '',
  isSpeechRecognitionSupported
}) => {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync transcription into input text when speech arrives
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [inputText]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isGenerating) return;

    if (isListening) {
      onStopListening();
    }

    onSendMessage(inputText.trim());
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const getPlaceholder = () => {
    if (isListening) {
      return language === 'ta'
        ? 'கேட்கிறது... தயவுசெய்து பேசுங்கள்...'
        : 'Listening... Speak your question now...';
    }

    if (currentMode === 'coding') {
      return language === 'ta'
        ? 'நிரல் குறியீட்டை உள்ளிடவும் அல்லது பிழைதிருத்த கேட்கவும்...'
        : 'Ask a coding question, paste code to debug, or request an explanation...';
    }

    if (currentMode === 'study') {
      return language === 'ta'
        ? 'கற்க விரும்பும் கல்வித் தலைப்பு அல்லது சூத்திரத்தை உள்ளிடவும்...'
        : 'Ask about any academic concept, formula, or request revision notes...';
    }

    return language === 'ta'
      ? 'NOVA-விடம் ஏதேனும் கேளுங்கள் (Enter அழுத்தி அனுப்பவும்)...'
      : 'Ask NOVA anything... (Enter to send, Shift+Enter for new line)';
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 pb-4 pt-1 select-none relative z-20">
      <form
        onSubmit={handleSubmit}
        className={`relative rounded-2xl glass-input p-2 sm:p-3 transition-all duration-300 shadow-2xl ${
          isListening
            ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,229,255,0.3)] bg-slate-900/95 ring-1 ring-cyan-400/50'
            : isGenerating
            ? 'border-violet-500/40 shadow-[0_0_25px_rgba(139,92,246,0.2)]'
            : 'border-cyan-500/25'
        }`}
      >
        {/* Active Listening Waveform Banner */}
        {isListening && (
          <div className="flex items-center justify-between px-3.5 py-2 mb-2 rounded-xl bg-cyan-950/80 border border-cyan-400/40 text-xs text-cyan-200 shadow-inner">
            <div className="flex items-center gap-3">
              {/* Dynamic Sound Wave Bars */}
              <div className="flex items-end gap-1 h-4">
                <span className="w-1 bg-cyan-400 rounded-full animate-wave-1 shadow-[0_0_8px_#00E5FF]" />
                <span className="w-1 bg-cyan-300 rounded-full animate-wave-2 shadow-[0_0_8px_#00E5FF]" />
                <span className="w-1 bg-blue-400 rounded-full animate-wave-3 shadow-[0_0_8px_#3B82F6]" />
                <span className="w-1 bg-cyan-400 rounded-full animate-wave-4 shadow-[0_0_8px_#00E5FF]" />
                <span className="w-1 bg-violet-400 rounded-full animate-wave-2 shadow-[0_0_8px_#8B5CF6]" />
              </div>
              <span className="font-mono font-medium tracking-wide">
                {language === 'ta'
                  ? 'குரல் உள்ளீடு செயலில் உள்ளது (பேசுங்கள்)...'
                  : 'Listening to your voice... Speak now'}
              </span>
            </div>
            <button
              onClick={onStopListening}
              type="button"
              className="text-xs px-2.5 py-1 rounded-md bg-cyan-900/60 hover:bg-cyan-800/80 text-cyan-200 border border-cyan-500/40 font-mono transition-colors"
            >
              Done Speaking
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          {/* Animated Microphone button */}
          {isSpeechRecognitionSupported ? (
            <button
              type="button"
              onClick={isListening ? onStopListening : onStartListening}
              title={isListening ? 'Stop recording voice' : 'Start voice input (Speech to Text)'}
              className={`p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex-shrink-0 relative overflow-hidden group ${
                isListening
                  ? 'bg-red-500/25 text-red-400 border border-red-500/60 shadow-[0_0_18px_rgba(239,68,68,0.4)] animate-pulse'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/35 active:scale-95'
              }`}
            >
              {isListening ? (
                <div className="flex items-center justify-center">
                  <MicOff size={20} />
                  <span className="absolute inset-0 rounded-xl border border-red-400/40 animate-ping pointer-events-none" />
                </div>
              ) : (
                <Mic size={20} className="group-hover:scale-110 transition-transform text-cyan-400" />
              )}
            </button>
          ) : (
            <div
              title="Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari."
              className="p-2.5 sm:p-3 text-slate-600 cursor-not-allowed flex-shrink-0"
            >
              <MicOff size={20} />
            </div>
          )}

          {/* Multiline auto-expanding textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={getPlaceholder()}
            disabled={isGenerating}
            className="flex-1 bg-transparent border-0 resize-none text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-0 max-h-44 py-2 px-1 leading-relaxed selection:bg-cyan-500/30"
          />

          {/* Action buttons (Stop generation OR Send) */}
          {isGenerating || isSpeaking ? (
            <button
              type="button"
              onClick={onStopGenerating}
              title="Stop response generation"
              className="p-2.5 sm:p-3 rounded-xl bg-violet-600/30 text-violet-300 border border-violet-500/50 hover:bg-violet-600/50 transition-all flex-shrink-0 shadow-lg shadow-violet-950/40 active:scale-95 flex items-center gap-1.5"
            >
              <Square size={16} className="fill-current text-violet-300" />
              <span className="text-xs font-mono hidden sm:inline">Stop</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!inputText.trim() || isGenerating}
              title="Send message (Enter)"
              className={`p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex-shrink-0 flex items-center justify-center ${
                inputText.trim() && !isGenerating
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 text-white shadow-[0_0_18px_rgba(0,229,255,0.45)] hover:brightness-110 active:scale-95 border border-cyan-400/40'
                  : 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-700/30'
              }`}
            >
              {isGenerating ? (
                <Loader2 size={18} className="animate-spin text-cyan-300" />
              ) : (
                <Send size={18} />
              )}
            </button>
          )}
        </div>

        {/* Composer Footer Chips & Shortcut Indicator */}
        <div className="flex items-center justify-between px-2 pt-2 border-t border-cyan-500/10 text-[11px] text-slate-400 select-none">
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-400 font-medium">
              {language === 'ta' ? 'தமிழ் (Tamil)' : 'English'}
            </span>
            <span className="text-slate-600">•</span>
            <span className="font-mono uppercase text-slate-400 tracking-wider">
              {currentMode} Mode
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
            <span className="px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-slate-300">Enter</span>
            <span>to send</span>
            <span className="text-slate-600">•</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-slate-300">Shift + Enter</span>
            <span>for new line</span>
          </div>
        </div>
      </form>
    </div>
  );
};
