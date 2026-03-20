'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { Movie, MOCK_MOVIES } from '@/data/movies';
import { auth, db } from '@/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError } from '@/lib/firestore-errors';

interface UserContextType {
  user: FirebaseUser | null;
  isAuthReady: boolean;
  watchHistory: Movie[];
  watchlist: Movie[];
  addToHistory: (movie: Movie) => void;
  clearHistory: () => void;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: string) => void;
  recommendations: Movie[];
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [watchHistory, setWatchHistory] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);

      if (currentUser) {
        // Create user doc if it doesn't exist
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            const userData: any = {
              uid: currentUser.uid,
              email: currentUser.email,
              watchHistory: [],
              watchlist: [],
              createdAt: serverTimestamp()
            };
            if (currentUser.displayName) userData.displayName = currentUser.displayName;
            if (currentUser.photoURL) userData.photoURL = currentUser.photoURL;
            
            await setDoc(userRef, userData);
          }
        } catch (error) {
          handleFirestoreError(error, 'create' as any, `users/${currentUser.uid}`);
        }
      } else {
        setWatchHistory([]);
        setWatchlist([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady || !user) return;

    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setWatchHistory(data.watchHistory || []);
        setWatchlist(data.watchlist || []);
      }
    }, (error) => {
      handleFirestoreError(error, 'get' as any, `users/${user.uid}`);
    });

    return () => unsubscribe();
  }, [user, isAuthReady]);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const addToHistory = async (movie: Movie) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      try {
        // Remove the movie if it already exists to move it to the front
        const newHistory = [movie, ...watchHistory.filter(m => m.id !== movie.id)];
        await updateDoc(userRef, {
          watchHistory: newHistory
        });
      } catch (error) {
        handleFirestoreError(error, 'update' as any, `users/${user.uid}`);
      }
    } else {
      setWatchHistory(prev => {
        const filtered = prev.filter(m => m.id !== movie.id);
        return [movie, ...filtered];
      });
    }
  };

  const clearHistory = async () => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userRef, { watchHistory: [] });
      } catch (error) {
        handleFirestoreError(error, 'update' as any, `users/${user.uid}`);
      }
    } else {
      setWatchHistory([]);
    }
  };

  const addToWatchlist = async (movie: Movie) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      try {
        if (!watchlist.some(m => m.id === movie.id)) {
          await updateDoc(userRef, {
            watchlist: [movie, ...watchlist]
          });
        }
      } catch (error) {
        handleFirestoreError(error, 'update' as any, `users/${user.uid}`);
      }
    } else {
      setWatchlist(prev => {
        if (!prev.some(m => m.id === movie.id)) {
          return [movie, ...prev];
        }
        return prev;
      });
    }
  };

  const removeFromWatchlist = async (movieId: string) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userRef, {
          watchlist: watchlist.filter(m => m.id !== movieId)
        });
      } catch (error) {
        handleFirestoreError(error, 'update' as any, `users/${user.uid}`);
      }
    } else {
      setWatchlist(prev => prev.filter(m => m.id !== movieId));
    }
  };

  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  useEffect(() => {
    import('@/lib/tmdb').then(({ getPopularMovies }) => {
      getPopularMovies().then(movies => {
        setRecommendations(movies.slice(0, 6));
      });
    });
  }, [watchHistory]);

  return (
    <UserContext.Provider value={{ 
      user, 
      isAuthReady, 
      watchHistory, 
      watchlist,
      addToHistory, 
      clearHistory,
      addToWatchlist,
      removeFromWatchlist,
      recommendations, 
      signIn, 
      logOut 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
