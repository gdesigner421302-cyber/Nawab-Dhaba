import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInAnonymously, 
  signOut, 
  onAuthStateChanged, 
  User,
  db,
  doc,
  setDoc,
  serverTimestamp
} from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAsGuest: (guestName?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signInAsGuest: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser && !currentUser.isAnonymous) {
        try {
          await setDoc(doc(db, 'users', currentUser.uid), {
            uid: currentUser.uid,
            displayName: currentUser.displayName || 'Guest Royal Diner',
            email: currentUser.email || '',
            photoURL: currentUser.photoURL || '',
            lastLoginAt: serverTimestamp(),
          }, { merge: true });
        } catch (err) {
          console.error('Error syncing user profile:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google sign in error:', err);
      // If popup was closed by user or blocked, fallback gracefully
      throw err;
    }
  };

  const signInAsGuest = async (guestName = 'Guest Traveler') => {
    try {
      const res = await signInAnonymously(auth);
      if (res.user) {
        await setDoc(doc(db, 'users', res.user.uid), {
          uid: res.user.uid,
          displayName: guestName,
          isAnonymous: true,
          lastLoginAt: serverTimestamp(),
        }, { merge: true });
      }
    } catch (err) {
      console.error('Guest sign in error:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
