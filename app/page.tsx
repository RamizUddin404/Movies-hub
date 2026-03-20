import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ContentGrid from '@/components/ContentGrid';
import RecommendedSection from '@/components/RecommendedSection';
import Footer from '@/components/Footer';
import { MOCK_MOVIES } from '@/data/movies';

export default function Home() {
  // Split mock movies into categories for the grids
  const trendingMovies = MOCK_MOVIES.slice(0, 6);
  const bengaliMovies = MOCK_MOVIES.filter(m => m.language.includes('Bengali')).slice(0, 6);
  const stockVideos = MOCK_MOVIES.filter(m => m.genres.includes('Stock')).slice(0, 6);

  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <Hero />
      <RecommendedSection />
      <Features />
      <ContentGrid title="Trending Movies" movies={trendingMovies} />
      <ContentGrid title="Latest Bengali Dubbed" movies={bengaliMovies} />
      <ContentGrid title="Copyright-Free Stock Videos" movies={stockVideos} />
      <Footer />
    </main>
  );
}
