import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  language?: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language = 'code', code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Failed to copy to clipboard', err);
    }
  };

  // Clean language tag
  const displayLang = language.replace('language-', '').toUpperCase() || 'CODE';

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-cyan-500/20 bg-slate-950/90 shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-cyan-500/10 text-xs">
        <div className="flex items-center gap-2 text-cyan-400 font-mono font-medium">
          <Terminal size={14} className="text-cyan-400" />
          <span>{displayLang}</span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/30 transition-all text-xs"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono text-slate-200 selection:bg-cyan-500/30">
        <pre className="!bg-transparent !p-0 !m-0">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
