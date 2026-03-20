'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Movie, MOCK_MOVIES } from '@/data/movies';

interface UserContextType {
  watchHistory: Movie[];
  addToHistory: (movie: Movie) => void;
  recommendations: Movie[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [watchHistory, setWatchHistory] = useState<Movie[]>([]);

  const addToHistory = (movie: Movie) => {
    setWatchHistory(prev => {
      // If already in history, move it to the front (most recently watched)
      const filtered = prev.filter(m => m.id !== movie.id);
      return [movie, ...filtered];
    });
  };

  const recommendations = useMemo(() => {
    if (watchHistory.length === 0) {
      // Default recommendations (e.g., highly rated or trending mix)
      return [MOCK_MOVIES[0], MOCK_MOVIES[4], MOCK_MOVIES[7], MOCK_MOVIES[12], MOCK_MOVIES[15], MOCK_MOVIES[2]];
    }

    // 1. Calculate genre frequencies from watch history
    const genreCounts: Record<string, number> = {};
    watchHistory.forEach(movie => {
      movie.genres.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });

    // 2. Sort genres by frequency to find user preferences
    const topGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    // 3. Score all unwatched movies based on top genres
    const unwatchedMovies = MOCK_MOVIES.filter(
      m => !watchHistory.some(watched => watched.id === m.id)
    );

    const scoredMovies = unwatchedMovies.map(movie => {
      let score = 0;
      movie.genres.forEach(genre => {
        const index = topGenres.indexOf(genre);
        if (index !== -1) {
          // Higher score for more frequent genres. 
          // If a genre is #1 (index 0), it gets the highest points.
          score += (topGenres.length - index);
        }
      });
      return { ...movie, score };
    });

    // 4. Sort by score and return top 6
    const sortedRecommendations = scoredMovies
      .filter(m => m.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    // If we don't have enough recommendations based on genres, pad with random unwatched movies
    if (sortedRecommendations.length < 6) {
      const remaining = unwatchedMovies
        .filter(m => !sortedRecommendations.some(r => r.id === m.id))
        .slice(0, 6 - sortedRecommendations.length);
      return [...sortedRecommendations, ...remaining];
    }

    return sortedRecommendations;
  }, [watchHistory]);

  return (
    <UserContext.Provider value={{ watchHistory, addToHistory, recommendations }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
