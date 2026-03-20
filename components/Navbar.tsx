'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Film, Search, Bell, User } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
