export interface Movie {
  id: string;
  title: string;
  image: string;
  quality: string;
  language: string;
  genres: string[];
  actors: string[];
  director: string;
}

export const MOCK_MOVIES: Movie[] = [
  // Action / Sci-Fi
  { id: '1', title: 'Cyber City', image: 'https://picsum.photos/seed/cyber/400/600', quality: '4K', language: 'Dual Audio', genres: ['Sci-Fi', 'Action'], actors: ['Keanu Reeves', 'Carrie-Anne Moss'], director: 'Lana Wachowski' },
  { id: '2', title: 'The Last Stand', image: 'https://picsum.photos/seed/stand/400/600', quality: '1080p', language: 'Hindi Dubbed', genres: ['Action', 'Thriller'], actors: ['Arnold Schwarzenegger', 'Forest Whitaker'], director: 'Kim Jee-woon' },
  { id: '3', title: 'Galactic Wars', image: 'https://picsum.photos/seed/galactic/400/600', quality: '4K', language: 'Dual Audio', genres: ['Sci-Fi', 'Adventure'], actors: ['Mark Hamill', 'Harrison Ford'], director: 'George Lucas' },
  
  // Drama / Romance
  { id: '4', title: 'Dhaka Nights', image: 'https://picsum.photos/seed/dhaka/400/600', quality: '1080p', language: 'Bengali Original', genres: ['Drama', 'Romance'], actors: ['Shakib Khan', 'Jaya Ahsan'], director: 'Mostofa Sarwar Farooki' },
  { id: '5', title: 'Tears of Joy', image: 'https://picsum.photos/seed/tears/400/600', quality: '1080p', language: 'Hindi Dubbed', genres: ['Drama', 'Comedy'], actors: ['Shah Rukh Khan', 'Kajol'], director: 'Karan Johar' },
  { id: '6', title: 'Endless Love', image: 'https://picsum.photos/seed/love/400/600', quality: '4K', language: 'Dual Audio', genres: ['Romance', 'Drama'], actors: ['Ryan Gosling', 'Rachel McAdams'], director: 'Nick Cassavetes' },
  
  // Horror / Thriller
  { id: '7', title: 'The Shadows', image: 'https://picsum.photos/seed/shadows/400/600', quality: '1080p', language: 'Bengali Dubbed', genres: ['Horror', 'Thriller'], actors: ['Parambrata Chatterjee', 'Raima Sen'], director: 'Srijit Mukherji' },
  { id: '8', title: 'Silent Echo', image: 'https://picsum.photos/seed/echo/400/600', quality: '4K', language: 'Dual Audio', genres: ['Thriller', 'Mystery'], actors: ['Leonardo DiCaprio', 'Mark Ruffalo'], director: 'Martin Scorsese' },
  { id: '9', title: 'Dark Woods', image: 'https://picsum.photos/seed/woods/400/600', quality: '1080p', language: 'Hindi Dubbed', genres: ['Horror', 'Mystery'], actors: ['Vicky Kaushal', 'Bhumi Pednekar'], director: 'Bhanu Pratap Singh' },
  
  // Stock Videos / Nature
  { id: '10', title: 'Ocean Waves', image: 'https://picsum.photos/seed/ocean/400/600', quality: '4K', language: 'No Audio', genres: ['Nature', 'Stock'], actors: [], director: 'Nature' },
  { id: '11', title: 'Mountain Peak', image: 'https://picsum.photos/seed/mountain/400/600', quality: '4K', language: 'No Audio', genres: ['Nature', 'Stock'], actors: [], director: 'Nature' },
  { id: '12', title: 'City Timelapse', image: 'https://picsum.photos/seed/cityscape/400/600', quality: '4K', language: 'No Audio', genres: ['Urban', 'Stock'], actors: [], director: 'Urban Explorer' },
  
  // Comedy / Adventure
  { id: '13', title: 'Crazy Trip', image: 'https://picsum.photos/seed/trip/400/600', quality: '1080p', language: 'Bengali Dubbed', genres: ['Comedy', 'Adventure'], actors: ['Dev', 'Koel Mallick'], director: 'Raj Chakraborty' },
  { id: '14', title: 'Laugh Out Loud', image: 'https://picsum.photos/seed/laugh/400/600', quality: '1080p', language: 'Hindi Dubbed', genres: ['Comedy'], actors: ['Akshay Kumar', 'Paresh Rawal'], director: 'Priyadarshan' },
  { id: '15', title: 'Jungle Quest', image: 'https://picsum.photos/seed/jungle/400/600', quality: '4K', language: 'Dual Audio', genres: ['Adventure', 'Action'], actors: ['Dwayne Johnson', 'Kevin Hart'], director: 'Jake Kasdan' },
  
  // More Bengali
  { id: '16', title: 'Kolkata Diaries', image: 'https://picsum.photos/seed/kolkata/400/600', quality: '1080p', language: 'Bengali Original', genres: ['Drama', 'Mystery'], actors: ['Abir Chatterjee', 'Paoli Dam'], director: 'Kaushik Ganguly' },
  { id: '17', title: 'Sonar Kella', image: 'https://picsum.photos/seed/sonar/400/600', quality: '1080p', language: 'Bengali Original', genres: ['Adventure', 'Mystery'], actors: ['Soumitra Chatterjee', 'Santosh Dutta'], director: 'Satyajit Ray' },
  { id: '18', title: 'Bhooter Raja', image: 'https://picsum.photos/seed/bhoot/400/600', quality: '1080p', language: 'Bengali Original', genres: ['Comedy', 'Fantasy'], actors: ['Goopy', 'Bagha'], director: 'Satyajit Ray' },
];
