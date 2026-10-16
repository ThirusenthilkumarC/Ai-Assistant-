import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = true,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl glass-panel-glow bg-[#0B1220]/95 border border-cyan-500/30 p-5 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex-shrink-0">
            <AlertTriangle size={20} />
          </div>
          <h3 className="font-bold text-white text-base">{title}</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{message}</p>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onCancel}
            type="button"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className={`px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-md ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-500 shadow-red-950/40'
                : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-950/40'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
