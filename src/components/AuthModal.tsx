import React, { useState } from 'react';
import { X, Crown, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signInWithGoogle, signInAsGuest } = useAuth();
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingGuest, setLoadingGuest] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setLoadingGoogle(true);
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error('Sign in failed:', err);
      setError(err?.message || 'Google Sign-in was cancelled or encountered an error.');
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleGuestSignIn = async () => {
    try {
      setError(null);
      setLoadingGuest(true);
      await signInAsGuest('Highway Traveler');
      onClose();
    } catch (err: any) {
      console.error('Guest sign in failed:', err);
      setError('Guest sign in failed. Please try again.');
    } finally {
      setLoadingGuest(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0b162f] text-amber-50 rounded-2xl border border-amber-500/40 shadow-2xl p-6 sm:p-8 text-center overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-amber-200/80 hover:text-white hover:bg-black/20 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Icon */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 mx-auto flex items-center justify-center border-2 border-amber-300 shadow-lg mb-4">
          <Crown className="w-7 h-7 text-amber-100" />
        </div>

        <h3 className="font-cinzel text-xl font-bold text-amber-100">
          Sign In to Nawab Dhaba
        </h3>
        <p className="text-xs text-amber-200/70 mt-1.5 mb-6 max-w-xs mx-auto font-marcellus">
          Track your table reservations, order status, and unlock royal dining privileges.
        </p>

        {error && (
          <div className="mb-4 p-2.5 rounded-lg bg-red-900/30 border border-red-500/40 text-red-200 text-xs">
            {error}
          </div>
        )}

        {/* Google Sign In Button */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={loadingGoogle || loadingGuest}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-100 text-slate-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-colors shadow-md cursor-pointer disabled:opacity-60"
            id="btn-google-signin"
          >
            {loadingGoogle ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-700" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-amber-500/20" />
            <span className="text-[10px] uppercase tracking-wider text-amber-400/60">or quick access</span>
            <div className="flex-1 h-px bg-amber-500/20" />
          </div>

          {/* Guest Sign In */}
          <button
            onClick={handleGuestSignIn}
            disabled={loadingGoogle || loadingGuest}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
          >
            {loadingGuest ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>Continue as Guest Diner</span>
          </button>
        </div>

        <div className="mt-6 text-[10px] text-amber-400/60">
          Secured by Firebase Authentication & Firestore
        </div>

      </div>
    </div>
  );
};
