import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-[#151F2D]/95 backdrop-blur-md border border-white/10 shadow-2xl text-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-[#A3E635] shrink-0 mt-0.5" />
          )}
          {toast.type === 'alert' && (
            <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-[#F8FAFC]">
            <p className="leading-snug">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors p-0.5 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

