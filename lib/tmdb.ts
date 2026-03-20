import { Movie } from '@/data/movies';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

function mapTMDBMovie(tmdbMovie: any): Movie {
  return {
    id: tmdbMovie.id.toString(),
    title: tmdbMovie.title || tmdbMovie.name || 'Unknown Title',
    image: tmdbMovie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`
      : `https://picsum.photos/seed/${tmdbMovie.id}/400/600`,
    quality: tmdbMovie.vote_average > 7.5 ? '4K' : '1080p',
    language: tmdbMovie.original_language === 'hi' ? 'Hindi Dubbed' : 
              tmdbMovie.original_language === 'bn' ? 'Bengali Original' : 'Dual Audio',
    genres: tmdbMovie.genre_ids?.map((id: number) => GENRE_MAP[id]).filter(Boolean) || ['Action'],
    actors: [], 
    director: 'Unknown'
  };
}

// Fetch trending movies (Auto updates daily)
export async function getTrendingMovies(): Promise<Movie[]> {
  if (!TMDB_API_KEY) return getDynamicMockMovies('trending');
  
  try {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}&language=en-US`, { 
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.results.slice(0, 12).map(mapTMDBMovie);
  } catch (e) {
    console.error('Error fetching trending movies:', e);
    return getDynamicMockMovies('trending');
  }
}

// Fetch latest/now playing movies (Auto updates as new movies release)
export async function getLatestMovies(): Promise<Movie[]> {
  if (!TMDB_API_KEY) return getDynamicMockMovies('latest');
  
  try {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`, { 
      next: { revalidate: 3600 } 
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.results.slice(0, 12).map(mapTMDBMovie);
  } catch (e) {
    console.error('Error fetching latest movies:', e);
    return getDynamicMockMovies('latest');
  }
}

// Fetch popular movies
export async function getPopularMovies(): Promise<Movie[]> {
  if (!TMDB_API_KEY) return getDynamicMockMovies('popular');
  
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`, { 
      next: { revalidate: 3600 } 
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.results.slice(0, 12).map(mapTMDBMovie);
  } catch (e) {
    console.error('Error fetching popular movies:', e);
    return getDynamicMockMovies('popular');
  }
}

// Search movies
export async function searchMovies(query: string): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    // Fallback to mock search
    const { MOCK_MOVIES } = await import('@/data/movies');
    return MOCK_MOVIES.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genres.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
      movie.actors.some(a => a.toLowerCase().includes(query.toLowerCase()))
    );
  }
  
  try {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.results.slice(0, 12).map(mapTMDBMovie);
  } catch (e) {
    console.error('Error searching movies:', e);
    return [];
  }
}

// Fallback dynamic mock generator so the app still works and "auto updates" without an API key
function getDynamicMockMovies(category: string): Movie[] {
  // We'll just return a shuffled version of MOCK_MOVIES based on the current day
  // This simulates "auto updating" even without an API key
  const today = new Date().toISOString().split('T')[0];
  const seed = today.charCodeAt(today.length - 1) + category.charCodeAt(0);
  
  // We need to import MOCK_MOVIES here, but since it's a sync function, we'll just return a static list
  // Actually, let's just use a hardcoded fallback list for the dynamic mock to avoid circular dependencies
  return [
    { id: `dyn-${seed}-1`, title: 'The Quantum Paradox', image: `https://picsum.photos/seed/quant${seed}/400/600`, quality: '4K', language: 'Dual Audio', genres: ['Sci-Fi', 'Action'], actors: [], director: 'Unknown' },
    { id: `dyn-${seed}-2`, title: 'Midnight Shadows', image: `https://picsum.photos/seed/mid${seed}/400/600`, quality: '1080p', language: 'Hindi Dubbed', genres: ['Thriller', 'Mystery'], actors: [], director: 'Unknown' },
    { id: `dyn-${seed}-3`, title: 'Echoes of Eternity', image: `https://picsum.photos/seed/echo${seed}/400/600`, quality: '4K', language: 'Dual Audio', genres: ['Drama', 'Sci-Fi'], actors: [], director: 'Unknown' },
    { id: `dyn-${seed}-4`, title: 'Bengal Tiger', image: `https://picsum.photos/seed/tiger${seed}/400/600`, quality: '1080p', language: 'Bengali Original', genres: ['Action', 'Adventure'], actors: [], director: 'Unknown' },
    { id: `dyn-${seed}-5`, title: 'Lost City', image: `https://picsum.photos/seed/lost${seed}/400/600`, quality: '1080p', language: 'Hindi Dubbed', genres: ['Adventure', 'Action'], actors: [], director: 'Unknown' },
    { id: `dyn-${seed}-6`, title: 'Neon Dreams', image: `https://picsum.photos/seed/neon${seed}/400/600`, quality: '4K', language: 'Dual Audio', genres: ['Sci-Fi', 'Romance'], actors: [], director: 'Unknown' },
  ];
}
