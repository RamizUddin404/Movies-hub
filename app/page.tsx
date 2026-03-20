import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ContentGrid from '@/components/ContentGrid';
import RecommendedSection from '@/components/RecommendedSection';
import Footer from '@/components/Footer';
import { getTrendingMovies, getLatestMovies, getPopularMovies } from '@/lib/tmdb';

export default async function Home() {
  // Fetch movies from TMDB API (auto-updates based on latest releases)
  const trendingMovies = await getTrendingMovies();
  const latestMovies = await getLatestMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <Hero />
      <RecommendedSection />
      <Features />
      <ContentGrid title="Trending Now" movies={trendingMovies} />
      <ContentGrid title="New Releases" movies={latestMovies} />
      <ContentGrid title="Popular Movies" movies={popularMovies} />
      <Footer />
    </main>
  );
}
