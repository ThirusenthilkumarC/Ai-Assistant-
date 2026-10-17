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
      <div className={`flex gap-3 max-w-[94%] sm:max-w-[85%] md:max-w-[82%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-700 via-indigo-600 to-purple-500 flex items-center justify-center shadow-md shadow-purple-900/30 border border-purple-400/40 text-white">
              <User size={15} />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#121629] border border-purple-500/30 flex items-center justify-center shadow-md shadow-purple-900/30 overflow-hidden">
              <AiOrb state={isSpeakingThis ? 'speaking' : 'idle'} size="sm" />
            </div>
          )}
        </div>

        {/* Message Content Container */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header Tag / Sender Name */}
          <div className={`flex items-center gap-2 mb-1.5 px-1 text-xs text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="font-semibold text-slate-200 tracking-wide font-mono text-[11px]">
              {isUser ? 'YOU' : 'NOVA'}
            </span>
            {message.mode && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30 uppercase font-mono tracking-wider">
                {message.mode}
              </span>
            )}
            {message.isDemo && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-mono">
                <AlertCircle size={10} />
                Demo
              </span>
            )}
            <span className="text-[11px] text-slate-500">{formatTime(message.timestamp)}</span>
          </div>

          {/* Bubble Card */}
          <div
            className={`rounded-2xl p-4 sm:p-5 transition-all text-xs sm:text-sm leading-relaxed ${
              isUser
                ? 'bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-[#1e1b4b]/50 border border-purple-500/30 text-slate-100 rounded-tr-none shadow-xl'
                : message.isError
                ? 'bg-red-950/35 border border-red-500/40 text-red-200 rounded-tl-none shadow-xl'
                : 'glass-card text-slate-100 rounded-tl-none shadow-xl border border-white/[0.08] relative'
            }`}
          >
            {isUser ? (
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
            ) : (
              <div className="prose prose-invert max-w-none prose-p:my-2 prose-headings:text-purple-200 prose-headings:font-medium prose-a:text-purple-400 hover:prose-a:underline prose-strong:text-purple-200 prose-code:text-purple-300 prose-code:bg-[#0D1020]/90 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-purple-500/20 prose-li:my-1 break-words">
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
                        <code className="text-purple-300 bg-[#0D1020]/90 px-1.5 py-0.5 rounded border border-purple-500/20 font-mono text-[13px]" {...props}>
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
            <button
              onClick={handleCopyText}
              type="button"
              title="Copy message"
              className="p-1.5 rounded-lg text-slate-400 hover:text-purple-300 hover:bg-white/[0.04] transition-colors"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            </button>

            {!isUser && !message.isError && (
              <button
                onClick={handleSpeechToggle}
                type="button"
                title={isSpeakingThis ? 'Stop speaking' : 'Read aloud with voice'}
                className={`p-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs ${
                  isSpeakingThis
                    ? 'text-purple-300 bg-purple-950/70 border border-purple-500/40'
                    : 'text-slate-400 hover:text-purple-300 hover:bg-white/[0.04]'
                }`}
              >
                {isSpeakingThis ? (
                  <>
                    <VolumeX size={13} />
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 bg-purple-400 rounded-full animate-wave-1" />
                      <span className="w-0.5 bg-pink-400 rounded-full animate-wave-2" />
                      <span className="w-0.5 bg-purple-300 rounded-full animate-wave-3" />
                    </div>
                    <span className="text-[10px] font-mono">Speaking...</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={13} />
                    <span className="text-[10px] font-mono hidden sm:inline text-slate-400 hover:text-purple-300">Listen</span>
                  </>
                )}
              </button>
            )}

            {!isUser && onRetry && (
              <button
                onClick={() => onRetry(message.content)}
                type="button"
                title="Regenerate response"
                className="p-1.5 rounded-lg text-slate-400 hover:text-purple-300 hover:bg-white/[0.04] transition-colors"
              >
                <RotateCw size={13} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
