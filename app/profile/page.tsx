'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlayCircle, Trash2, Settings, History, Bookmark, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthReady, watchHistory, watchlist, clearHistory, removeFromWatchlist, logOut } = useUser();
  const [activeTab, setActiveTab] = useState<'history' | 'watchlist' | 'settings'>('history');

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Please sign in to view your profile</h1>
            <p className="text-gray-400">You need an account to access watch history and your watchlist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-zinc-900/50 p-8 rounded-2xl border border-white/5">
            {user.photoURL ? (
              <Image 
                src={user.photoURL} 
                alt={user.displayName || 'User'} 
                width={96} 
                height={96} 
                className="rounded-full border-4 border-zinc-800"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-zinc-800">
                {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{user.displayName || 'StreamHub User'}</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'history' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <History className="w-4 h-4" />
              Watch History
            </button>
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'watchlist' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Watchlist
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              Account Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            
            {/* Watch History */}
            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Recently Watched</h2>
                  {watchHistory.length > 0 && (
                    <button 
                      onClick={clearHistory}
                      className="text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear History
                    </button>
                  )}
                </div>

                {watchHistory.length === 0 ? (
                  <div className="text-center py-12 bg-zinc-900/30 rounded-xl border border-white/5">
                    <History className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Your watch history is empty.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {watchHistory.map((movie, index) => (
                      <div key={`history-${movie.id}-${index}`} className="group relative flex flex-col gap-2">
                        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-zinc-800">
                          <Image
                            src={movie.image}
                            alt={movie.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-sm truncate group-hover:text-indigo-400 transition-colors">
                            {movie.title}
                          </h3>
                          <p className="text-gray-500 text-xs mt-1">{movie.language}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Watchlist */}
            {activeTab === 'watchlist' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white">Your Watchlist</h2>

                {watchlist.length === 0 ? (
                  <div className="text-center py-12 bg-zinc-900/30 rounded-xl border border-white/5">
                    <Bookmark className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Your watchlist is empty.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {watchlist.map((movie) => (
                      <div key={`watchlist-${movie.id}`} className="group relative flex flex-col gap-2">
                        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-zinc-800">
                          <Image
                            src={movie.image}
                            alt={movie.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                            <button className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-500 transition-colors">
                              <PlayCircle className="w-6 h-6" />
                            </button>
                            <button 
                              onClick={() => removeFromWatchlist(movie.id)}
                              className="bg-red-500/20 text-red-400 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-red-500/30 transition-colors flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              Remove
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-sm truncate group-hover:text-indigo-400 transition-colors">
                            {movie.title}
                          </h3>
                          <p className="text-gray-500 text-xs mt-1">{movie.language}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Account Settings */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl"
              >
                <div className="bg-zinc-900/50 rounded-2xl border border-white/5 p-6 space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Account Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                        <div className="text-white bg-black/50 px-4 py-2 rounded-lg border border-white/10">
                          {user.email}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Display Name</label>
                        <div className="text-white bg-black/50 px-4 py-2 rounded-lg border border-white/10">
                          {user.displayName || 'Not set'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-medium text-white mb-4">Danger Zone</h3>
                    <button 
                      onClick={logOut}
                      className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 px-6 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto justify-center"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out of All Devices
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
