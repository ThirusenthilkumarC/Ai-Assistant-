import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Square, CornerDownLeft } from 'lucide-react';
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
      return language === 'ta' ? 'கேட்கிறது... தயவுசெய்து பேசுங்கள்...' : 'Listening... Speak your question now...';
    }

    if (currentMode === 'coding') {
      return language === 'ta'
        ? 'உங்கள் நிரல் குறியீட்டை அல்லது பிழையை உள்ளிடவும்...'
        : 'Ask a coding question, paste code to debug, or request an explanation...';
    }

    if (currentMode === 'study') {
      return language === 'ta'
        ? 'நீங்கள் கற்க விரும்பும் பாடக் கருத்தை உள்ளிடவும்...'
        : 'Ask about any academic concept, formula, or request revision notes...';
    }

    return language === 'ta'
      ? 'NOVA-விடம் ஏதேனும் கேளுங்கள் (Shift+Enter புதிய வரி)...'
      : 'Message NOVA... (Enter to send, Shift+Enter for newline)';
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 pb-4 pt-1 select-none">
      <form
        onSubmit={handleSubmit}
        className={`relative rounded-2xl glass-input p-2 sm:p-2.5 transition-all duration-300 ${
          isListening
            ? 'border-cyan-400 shadow-[0_0_25px_rgba(0,229,255,0.3)] bg-slate-900/90'
            : 'border-cyan-500/20'
        }`}
      >
        {/* Active Listening indicator strip */}
        {isListening && (
          <div className="flex items-center justify-between px-3 py-1 mb-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-xs text-cyan-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono font-medium">
                {language === 'ta' ? 'குரல் உள்ளீடு செயலில் உள்ளது (Listening...)' : 'Live Voice Input Active'}
              </span>
            </div>
            <button
              onClick={onStopListening}
              type="button"
              className="text-xs text-cyan-400 hover:text-white underline font-mono"
            >
              Done speaking
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          {/* Microphone button */}
          {isSpeechRecognitionSupported ? (
            <button
              type="button"
              onClick={isListening ? onStopListening : onStartListening}
              title={isListening ? 'Stop listening' : 'Start voice input (Speech to Text)'}
              className={`p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex-shrink-0 ${
                isListening
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 border border-transparent hover:border-cyan-500/30'
              }`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          ) : (
            <div
              title="Voice recognition is not supported on this browser. Use Chrome or Edge."
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
            className="flex-1 bg-transparent border-0 resize-none text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-0 max-h-44 py-2 px-1 leading-relaxed"
          />

          {/* Action buttons (Stop generation OR Send) */}
          {isGenerating || isSpeaking ? (
            <button
              type="button"
              onClick={onStopGenerating}
              title="Stop response"
              className="p-2.5 sm:p-3 rounded-xl bg-violet-600/30 text-violet-300 border border-violet-500/50 hover:bg-violet-600/50 transition-all flex-shrink-0 shadow-lg shadow-violet-950/30"
            >
              <Square size={18} className="fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!inputText.trim() || isGenerating}
              title="Send message (Enter)"
              className={`p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex-shrink-0 ${
                inputText.trim() && !isGenerating
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:brightness-110 active:scale-95'
                  : 'bg-slate-800/60 text-slate-600 cursor-not-allowed border border-slate-700/40'
              }`}
            >
              <Send size={18} />
            </button>
          )}
        </div>

        {/* Input Helper Footer */}
        <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-400 select-none">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-cyan-400/80">{language === 'ta' ? 'தமிழ்' : 'English'}</span>
            <span>•</span>
            <span className="font-mono uppercase text-slate-400">{currentMode} mode</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-slate-400 font-mono">
            <span>Enter</span>
            <CornerDownLeft size={10} />
            <span className="ml-1 text-slate-400">to send</span>
          </div>
        </div>
      </form>
    </div>
  );
};
