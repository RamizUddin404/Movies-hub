'use client';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { PlayCircle, Sparkles, History } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Movie } from '@/data/movies';

export default function RecommendedSection() {
  const { recommendations, watchHistory, addToHistory, watchlist, addToWatchlist, removeFromWatchlist } = useUser();

  const renderMovieCard = (movie: Movie, index: number) => (
    <motion.div
      key={movie.id}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => {}}
      className="group relative flex flex-col gap-2 cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-zinc-800 border border-white/5 shadow-lg">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToHistory(movie);
              }}
              className="flex flex-col items-center gap-2 hover:scale-110 transition-transform"
            >
              <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
              <span className="text-white text-xs font-medium bg-indigo-600/80 px-2 py-1 rounded-full backdrop-blur-sm">Watch Now</span>
            </button>
          </div>
        </div>
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-md">
            {movie.quality}
          </span>
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              const inWatchlist = watchlist.some(m => m.id === movie.id);
              if (inWatchlist) {
                removeFromWatchlist(movie.id);
              } else {
                addToWatchlist(movie);
              }
            }}
            className={`p-2 rounded-full text-white transition-colors ${
              watchlist.some(m => m.id === movie.id) 
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-black/60 hover:bg-indigo-600'
            }`}
            title={watchlist.some(m => m.id === movie.id) ? "Remove from Watchlist" : "Add to Watchlist"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={watchlist.some(m => m.id === movie.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-white font-medium text-sm truncate group-hover:text-indigo-400 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {movie.genres.map(genre => (
            <span key={genre} className="text-gray-400 text-[10px] bg-white/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-16 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Watch History Section (Only show if there is history) */}
        {watchHistory.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-6 h-6 text-gray-400" />
              <h2 className="text-2xl font-bold text-white">Continue Watching</h2>
            </div>
            <div className="flex overflow-x-auto pb-6 gap-4 md:gap-6 snap-x hide-scrollbar">
              <AnimatePresence>
                {watchHistory.slice(0, 6).map((movie, index) => (
                  <div key={movie.id} className="min-w-[140px] md:min-w-[180px] snap-start">
                    {renderMovieCard(movie, index)}
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Recommended For You</h2>
              </div>
              <p className="text-gray-400 text-sm">
                {watchHistory.length > 0 
                  ? "Personalized picks based on your watch history." 
                  : "Top trending picks to get you started. Click a movie to personalize!"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {recommendations.map((movie, index) => renderMovieCard(movie, index))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
