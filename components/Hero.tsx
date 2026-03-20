'use client';

import { motion } from 'motion/react';
import { Play, Info } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/cinema/1920/1080"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-medium text-gray-200 uppercase tracking-wider">100% Copyright-Free</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
            Unlimited Movies.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Zero Copyright.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Welcome to our ultimate entertainment hub! Enjoy a massive collection of Copyright-Free videos, trending movies, and exclusive Dual-Audio (Dubbed) content in crystal clear HD.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
              <Play className="w-5 h-5 fill-current" />
              Start Watching
            </button>
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md px-8 py-4 rounded-full font-bold transition-colors">
              <Info className="w-5 h-5" />
              More Info
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
