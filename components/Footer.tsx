import { Film, Github, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Film className="w-6 h-6 text-indigo-500" />
              <span className="text-xl font-bold text-white tracking-tight">StreamHub</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Your ultimate entertainment hub. Enjoy a massive collection of Copyright-Free videos, trending movies, and exclusive Dual-Audio (Dubbed) content in crystal clear HD. No strikes, no worries—just pure entertainment.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Latest Movies</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Bengali Dubbed</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Hindi Dubbed</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Stock Videos</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">DMCA</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} StreamHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
