'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { Movie } from '@/data/movies';
import { useUser } from '@/context/UserContext';

interface ContentGridProps {
  title: string;
  movies: Movie[];
}

export default function ContentGrid({ title, movies }: ContentGridProps) {
  const { addToHistory, addToWatchlist, removeFromWatchlist, watchlist } = useUser();

  if (!movies || movies.length === 0) return null;

  return (
    <section className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => {}}
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
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToHistory(movie);
                      }}
                      className="flex flex-col items-center gap-2 hover:scale-110 transition-transform"
                    >
                      <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded-full">Watch</span>
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
                <div className="flex items-center justify-between mt-1">
                  <p className="text-gray-500 text-xs">{movie.language}</p>
                  <p className="text-gray-600 text-[10px] uppercase tracking-wider">{movie.genres[0]}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
