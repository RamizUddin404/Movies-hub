'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Film, Search, Bell, User, LogOut } from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, signIn, logOut, isAuthReady } = useUser();

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <Film className="w-8 h-8 text-indigo-500" />
                <span className="text-xl font-bold text-white tracking-tight">StreamHub</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Movies</Link>
                <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Dubbed</Link>
                <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Stock Videos</Link>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button className="text-gray-300 hover:text-white transition-colors" aria-label="Notifications">
                <Bell className="w-5 h-5" />
              </button>
              
              {isAuthReady && (
                user ? (
                  <div className="flex items-center gap-4">
                    <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      {user.photoURL ? (
                        <Image 
                          src={user.photoURL} 
                          alt={user.displayName || 'User'} 
                          width={32} 
                          height={32} 
                          className="rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                          {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-300 hidden sm:block">
                        {user.displayName || user.email?.split('@')[0]}
                      </span>
                    </Link>
                    <button 
                      onClick={logOut}
                      className="text-gray-300 hover:text-white transition-colors" 
                      aria-label="Sign Out"
                      title="Sign Out"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={signIn}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
