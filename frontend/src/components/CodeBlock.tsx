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

  const displayLang = language.replace('language-', '').toUpperCase() || 'CODE';

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0A0D1A] shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#0F1324] border-b border-white/[0.06] text-xs">
        <div className="flex items-center gap-2 text-purple-300 font-mono text-[11px] font-medium">
          <Terminal size={13} className="text-purple-400" />
          <span>{displayLang}</span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.04] hover:bg-purple-900/30 text-slate-300 hover:text-purple-200 border border-white/[0.08] hover:border-purple-500/30 transition-all text-[11px]"
        >
          {copied ? (
            <>
              <Check size={11} className="text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={11} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-3.5 overflow-x-auto text-[12px] sm:text-[13px] leading-relaxed font-mono text-slate-200 selection:bg-purple-500/30">
        <pre className="!bg-transparent !p-0 !m-0">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
