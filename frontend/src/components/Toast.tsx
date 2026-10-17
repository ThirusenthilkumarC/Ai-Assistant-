import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 size={15} className="text-emerald-400" />;
            case 'warning':
              return <AlertTriangle size={15} className="text-amber-400" />;
            case 'error':
              return <AlertTriangle size={15} className="text-red-400" />;
            case 'info':
            default:
              return <Info size={15} className="text-purple-300" />;
          }
        };

        const getBorder = () => {
          switch (toast.type) {
            case 'success':
              return 'border-emerald-500/30 bg-[#0E1222]/95';
            case 'warning':
              return 'border-amber-500/30 bg-[#0E1222]/95';
            case 'error':
              return 'border-red-500/30 bg-[#0E1222]/95';
            case 'info':
            default:
              return 'border-purple-500/30 bg-[#0E1222]/95';
          }
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3 rounded-xl border shadow-2xl backdrop-blur-md text-xs text-slate-200 transition-all animate-in slide-in-from-bottom-2 duration-200 ${getBorder()}`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {getIcon()}
              <span className="truncate">{toast.text}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              type="button"
              className="text-slate-400 hover:text-white p-1"
            >
              <X size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
