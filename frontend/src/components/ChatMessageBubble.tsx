import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, RotateCw, Volume2, VolumeX, User, AlertCircle } from 'lucide-react';
import type { ChatMessage } from '../types';
import { CodeBlock } from './CodeBlock';
import { AiOrb } from './AiOrb';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  onRetry?: (content: string) => void;
  onSpeak?: (text: string) => void;
  isSpeakingThis?: boolean;
  onStopSpeak?: () => void;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  message,
  onRetry,
  onSpeak,
  isSpeakingThis = false,
  onStopSpeak
}) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleSpeechToggle = () => {
    if (isSpeakingThis) {
      onStopSpeak?.();
    } else {
      onSpeak?.(message.content);
    }
  };

  const formatTime = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className={`flex w-full my-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 max-w-[94%] sm:max-w-[85%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-400/50 text-white">
              <User size={18} />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-slate-900 border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/15 overflow-hidden">
              <AiOrb state={isSpeakingThis ? 'speaking' : 'idle'} size="sm" />
            </div>
          )}
        </div>

        {/* Message Content Container */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header Tag / Sender Name */}
          <div className={`flex items-center gap-2 mb-1.5 px-1 text-xs text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="font-semibold text-slate-200 tracking-wide font-mono text-[11px]">
              {isUser ? 'YOU' : 'NOVA AI'}
            </span>
            {message.mode && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 uppercase font-mono tracking-wider">
                {message.mode}
              </span>
            )}
            {message.isDemo && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40 flex items-center gap-1 font-mono">
                <AlertCircle size={10} />
                Demo Mode
              </span>
            )}
            <span className="text-[11px] text-slate-500">{formatTime(message.timestamp)}</span>
          </div>

          {/* Bubble Card */}
          <div
            className={`rounded-2xl p-4 sm:p-5 transition-all text-sm leading-relaxed ${
              isUser
                ? 'bg-gradient-to-r from-cyan-600/25 via-blue-600/30 to-blue-700/20 border border-cyan-500/40 text-slate-100 rounded-tr-none shadow-xl shadow-cyan-950/20'
                : message.isError
                ? 'bg-red-950/35 border border-red-500/50 text-red-200 rounded-tl-none shadow-xl'
                : 'glass-panel text-slate-100 rounded-tl-none shadow-xl border border-cyan-500/20 relative before:absolute before:top-4 before:bottom-4 before:left-0 before:w-[2px] before:bg-gradient-to-b before:from-cyan-400 before:to-violet-500 before:rounded-r'
            }`}
          >
            {isUser ? (
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
            ) : (
              <div className="prose prose-invert max-w-none prose-p:my-2 prose-headings:text-cyan-300 prose-headings:font-semibold prose-a:text-cyan-400 hover:prose-a:underline prose-strong:text-cyan-200 prose-code:text-cyan-300 prose-code:bg-slate-900/90 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-cyan-500/20 prose-li:my-1 break-words">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      const codeString = String(children).replace(/\n$/, '');

                      if (!inline && match) {
                        return <CodeBlock language={match[1]} code={codeString} />;
                      }

                      if (!inline && codeString.includes('\n')) {
                        return <CodeBlock language="text" code={codeString} />;
                      }

                      return (
                        <code className="text-cyan-300 bg-slate-900/90 px-1.5 py-0.5 rounded border border-cyan-500/25 font-mono text-[13px]" {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {/* Footer Action Buttons */}
          <div className={`flex items-center gap-1.5 mt-2 px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {/* Copy button */}
            <button
              onClick={handleCopyText}
              type="button"
              title="Copy message"
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>

            {/* Read Aloud button (for assistant messages) */}
            {!isUser && !message.isError && (
              <button
                onClick={handleSpeechToggle}
                type="button"
                title={isSpeakingThis ? 'Stop speaking' : 'Read aloud with voice'}
                className={`p-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs ${
                  isSpeakingThis
                    ? 'text-cyan-400 bg-cyan-950/70 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                    : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80'
                }`}
              >
                {isSpeakingThis ? (
                  <>
                    <VolumeX size={14} />
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 bg-cyan-400 rounded-full animate-wave-1" />
                      <span className="w-0.5 bg-cyan-300 rounded-full animate-wave-2" />
                      <span className="w-0.5 bg-cyan-400 rounded-full animate-wave-3" />
                    </div>
                    <span className="text-[11px] font-mono">Speaking...</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={14} />
                    <span className="text-[11px] font-mono hidden sm:inline text-slate-400 hover:text-cyan-300">Listen</span>
                  </>
                )}
              </button>
            )}

            {/* Retry button (if error or retryable) */}
            {!isUser && onRetry && (
              <button
                onClick={() => onRetry(message.content)}
                type="button"
                title="Regenerate response"
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 transition-colors"
              >
                <RotateCw size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
