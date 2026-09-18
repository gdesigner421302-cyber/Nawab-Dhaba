import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Nawab Dhaba App:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070e1e] text-amber-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0b162f] border border-amber-500/40 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="font-cinzel text-xl font-bold text-amber-100">
              Nawab Dhaba
            </h2>
            <p className="text-xs text-amber-200/80">
              Something encountered an unexpected issue while loading the experience.
            </p>
            {this.state.error?.message && (
              <div className="p-3 rounded-lg bg-black/40 border border-amber-500/20 text-left font-mono text-[11px] text-amber-300/80 break-words">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="gold-btn py-2.5 px-6 rounded-xl font-bold text-slate-950 text-xs flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Page</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
