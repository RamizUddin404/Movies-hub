'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { Movie } from '@/data/movies';
import { useUser } from '@/context/UserContext';
import { searchMovies } from '@/lib/tmdb';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { addToHistory } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus input after animation
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Clear query when closed, using setTimeout to avoid synchronous setState in effect warning
      setTimeout(() => {
        setQuery('');
        setResults([]);
      }, 0);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const searchResults = await searchMovies(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-xl overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search Input Header */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-6 mt-4">
              <Search className="w-8 h-8 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search by title, actor, director, or genre..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-2xl md:text-4xl text-white placeholder:text-gray-600 focus:outline-none"
              />
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-8 h-8 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Search Results */}
            <div className="mt-8 pb-20">
              {isSearching ? (
                <div className="text-center py-20">
                  <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">Searching for movies...</p>
                </div>
              ) : query.trim() && results.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-2xl text-gray-500">No results found for &quot;{query}&quot;</p>
                  <p className="text-gray-600 mt-2">Try searching for a different title, actor, director, or genre.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                  {results.map((movie, index) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => {
                        addToHistory(movie);
                        onClose();
                      }}
                      className="group relative flex flex-col gap-2 cursor-pointer"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-zinc-800">
                        <Image
                          src={movie.image}
                          alt={movie.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex flex-col items-center gap-2">
                            <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
                            <span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded-full">Click to Watch</span>
                          </div>
                        </div>
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <span className="px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-md">
                            {movie.quality}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-sm truncate group-hover:text-indigo-400 transition-colors">
                          {movie.title}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1 truncate">
                          {movie.actors.length > 0 ? movie.actors.join(', ') : movie.director}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
