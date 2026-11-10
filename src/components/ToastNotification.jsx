import React from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastNotification = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border text-sm transition-all duration-300 animate-slide-up ${
              isSuccess
                ? 'bg-emerald-950 text-white border-emerald-800'
                : isError
                ? 'bg-rose-950 text-white border-rose-800'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            {isSuccess && <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />}
            {isError && <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />}
            {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />}

            <div className="flex-1 leading-snug font-medium text-xs sm:text-sm">
              {toast.message}
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors focus:outline-none"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

