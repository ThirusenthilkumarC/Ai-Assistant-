import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Image as ImageIcon, Lightbulb, Mic, MicOff, ArrowUp, Square, Loader2 } from 'lucide-react';
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
  onSelectMode?: (mode: AssistantMode) => void;
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
  onSelectMode,
  language,
  transcript = '',
  isSpeechRecognitionSupported
}) => {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
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

  const handleTriggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Append file reference note to input
      setInputText(prev => prev ? `${prev} [Attached: ${file.name}]` : `[Attached: ${file.name}] `);
    }
  };

  const cycleMode = () => {
    if (!onSelectMode) return;
    if (currentMode === 'general') onSelectMode('coding');
    else if (currentMode === 'coding') onSelectMode('study');
    else onSelectMode('general');
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-1 px-1 sm:px-2 relative z-20">
      <form
        onSubmit={handleSubmit}
        className={`relative rounded-3xl glass-composer p-3 sm:p-4 transition-all duration-300 ${
          isListening
            ? 'border-purple-400 shadow-[0_0_30px_rgba(139,92,246,0.3)] bg-[#141728]/95'
            : isGenerating
            ? 'border-purple-500/40 shadow-[0_0_25px_rgba(109,40,217,0.2)]'
            : 'border-white/[0.09]'
        }`}
      >
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".txt,.js,.ts,.py,.json,.md,.png,.jpg,.jpeg"
        />

        {/* Listening Waveform Bar */}
        {isListening && (
          <div className="flex items-center justify-between px-3 py-1.5 mb-2 rounded-xl bg-purple-950/70 border border-purple-500/40 text-xs text-purple-200">
            <div className="flex items-center gap-2.5">
              <div className="flex items-end gap-1 h-3.5">
                <span className="w-1 bg-cyan-400 rounded-full animate-wave-1" />
                <span className="w-1 bg-purple-400 rounded-full animate-wave-2" />
                <span className="w-1 bg-pink-400 rounded-full animate-wave-3" />
              </div>
              <span className="font-sans text-[11px] text-purple-200 font-medium">
                {language === 'ta' ? 'குரல் கேட்கிறது... பேசுங்கள்...' : 'Listening... Speak your message'}
              </span>
            </div>
            <button
              onClick={onStopListening}
              type="button"
              className="text-[11px] px-2 py-0.5 rounded bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500/40 transition-colors"
            >
              Done
            </button>
          </div>
        )}

        {/* Multiline Message Textarea matching reference image */}
        <textarea
          ref={textareaRef}
          rows={2}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message or drop a file..."
          disabled={isGenerating}
          className="w-full bg-transparent border-0 resize-none text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-0 min-h-[50px] max-h-36 py-1 px-1 leading-relaxed selection:bg-purple-500/30"
        />

        {/* Bottom Toolbar matching reference image */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] select-none">
          {/* Left Side: Files, Images, Reasoning pills */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Files Button */}
            <button
              type="button"
              onClick={handleTriggerFileSelect}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-slate-200 text-[11px] font-medium transition-colors"
              title="Attach File"
            >
              <Paperclip size={13} />
              <span>Files</span>
            </button>

            {/* Images Button */}
            <button
              type="button"
              onClick={handleTriggerFileSelect}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-slate-200 text-[11px] font-medium transition-colors"
              title="Attach Image"
            >
              <ImageIcon size={13} />
              <span>Images</span>
            </button>

            {/* Reasoning / Mode Toggle */}
            <button
              type="button"
              onClick={cycleMode}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[11px] font-medium transition-colors ${
                currentMode === 'coding'
                  ? 'bg-purple-900/30 text-purple-300 border-purple-500/40'
                  : currentMode === 'study'
                  ? 'bg-indigo-900/30 text-indigo-300 border-indigo-500/40'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-slate-400 hover:text-slate-200'
              }`}
              title={`Active Mode: ${currentMode.toUpperCase()}. Click to switch`}
            >
              <Lightbulb size={13} />
              <span className="hidden xs:inline">Reasoning</span>
            </button>
          </div>

          {/* Right Side: Microphone + Purple Circular Send Button */}
          <div className="flex items-center gap-2">
            {/* Microphone Button */}
            {isSpeechRecognitionSupported ? (
              <button
                type="button"
                onClick={isListening ? onStopListening : onStartListening}
                title={isListening ? 'Stop recording voice' : 'Voice Input (Speech-to-Text)'}
                className={`p-2 rounded-full transition-all ${
                  isListening
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse'
                    : 'text-slate-400 hover:text-purple-300 hover:bg-white/[0.05]'
                }`}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            ) : (
              <div
                title="Microphone not supported in this browser"
                className="p-2 text-slate-600 cursor-not-allowed"
              >
                <MicOff size={16} />
              </div>
            )}

            {/* Circular Purple Send Button matching reference */}
            {isGenerating || isSpeaking ? (
              <button
                type="button"
                onClick={onStopGenerating}
                title="Stop generation"
                className="w-9 h-9 rounded-full bg-purple-700/80 hover:bg-purple-600 text-white flex items-center justify-center transition-all shadow-md shadow-purple-900/40"
              >
                <Square size={13} className="fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!inputText.trim()}
                title="Send message (Enter)"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  inputText.trim()
                    ? 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-lg shadow-purple-900/50 active:scale-95'
                    : 'bg-white/[0.06] text-slate-600 cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <Loader2 size={15} className="animate-spin text-white" />
                ) : (
                  <ArrowUp size={16} className="stroke-[2.5]" />
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
