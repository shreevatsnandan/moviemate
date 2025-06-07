"use client"
import React, { useState } from 'react';

// Hardcoded movie data based on the schema
const moviesData = [
  {
    _id: '1',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    duration: 148,
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    language: 'English',
    releaseDate: '2010-07-16',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    trailerUrl: ['https://www.youtube.com/watch?v=YoHD9XEInc0'],
    rating: 'PG-13',
    addedBy: 'admin1'
  },
  {
    _id: '2',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    duration: 142,
    genre: ['Drama'],
    language: 'English',
    releaseDate: '1994-09-23',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    trailerUrl: ['https://www.youtube.com/watch?v=6hB3S9bIaco'],
    rating: 'R',
    addedBy: 'admin1'
  },
  {
    _id: '3',
    title: 'Parasite',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    duration: 132,
    genre: ['Comedy', 'Drama', 'Thriller'],
    language: 'Korean',
    releaseDate: '2019-05-21',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
    trailerUrl: ['https://www.youtube.com/watch?v=5xH0HfJHsaY'],
    rating: 'R',
    addedBy: 'admin2'
  },
  {
    _id: '4',
    title: 'Spirited Away',
    description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
    duration: 125,
    genre: ['Animation', 'Adventure', 'Family'],
    language: 'Japanese',
    releaseDate: '2001-07-20',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    trailerUrl: ['https://www.youtube.com/watch?v=ByXuk9QqQkk'],
    rating: 'PG',
    addedBy: 'admin3'
  },
  {
    _id: '5',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    duration: 152,
    genre: ['Action', 'Crime', 'Drama'],
    language: 'English',
    releaseDate: '2008-07-18',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
    trailerUrl: ['https://www.youtube.com/watch?v=EXeTwQWrcwY'],
    rating: 'PG-13',
    addedBy: 'admin1'
  },
  {
    _id: '6',
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    duration: 154,
    genre: ['Crime', 'Drama'],
    language: 'English',
    releaseDate: '1994-10-14',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    trailerUrl: ['https://www.youtube.com/watch?v=s7EdQ4FqbhY'],
    rating: 'R',
    addedBy: 'admin2'
  },
  {
    _id: '7',
    title: 'The Lion King',
    description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    duration: 88,
    genre: ['Animation', 'Adventure', 'Drama'],
    language: 'English',
    releaseDate: '1994-06-24',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_.jpg',
    trailerUrl: ['https://www.youtube.com/watch?v=4sj1MT05lAA'],
    rating: 'G',
    addedBy: 'admin3'
  },
  {
    _id: '8',
    title: 'Avengers: Endgame',
    description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
    duration: 181,
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    language: 'English',
    releaseDate: '2019-04-26',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
    trailerUrl: ['https://www.youtube.com/watch?v=TcMBFSGVi1c'],
    rating: 'PG-13',
    addedBy: 'admin1'
  },
  {
    _id: '9',
    title: 'Your Name',
    description: 'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?',
    duration: 106,
    genre: ['Animation', 'Drama', 'Fantasy'],
    language: 'Japanese',
    releaseDate: '2016-08-26',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_.jpg',
    trailerUrl: ['https://www.youtube.com/watch?v=xU47nhruN-Q'],
    rating: 'PG',
    addedBy: 'admin2'
  },
  {
    _id: '10',
    title: 'The Godfather',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    duration: 175,
    genre: ['Crime', 'Drama'],
    language: 'English',
    releaseDate: '1972-03-24',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    trailerUrl: ['https://www.youtube.com/watch?v=sY1S34973zA'],
    rating: 'R',
    addedBy: 'admin3'
  }
];
const allGenres = [...new Set(moviesData.flatMap(movie => movie.genre))];
const allLanguages = [...new Set(moviesData.map(movie => movie.language))];
const allRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

const MovieBookingComponent = () => {
  const [filters, setFilters] = useState({
    genre: '',
    language: '',
    rating: '',
    searchQuery: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredMovies = moviesData.filter(movie => {
    return (
      (!filters.genre || movie.genre.includes(filters.genre)) &&
      (!filters.language || movie.language === filters.language) &&
      (!filters.rating || movie.rating === filters.rating) &&
      (!filters.searchQuery || 
        movie.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(filters.searchQuery.toLowerCase()))
    );
  });

  const handleBookTicket = (movieId) => {
    alert(`Booking ticket for movie ID: ${movieId}`);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Filters Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
            >
              <option value="">All Genres</option>
              {allGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              name="language"
              value={filters.language}
              onChange={handleFilterChange}
            >
              <option value="">All Languages</option>
              {allLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
            >
              <option value="">All Ratings</option>
              {allRatings.map(rating => (
                <option key={rating} value={rating}>{rating}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              type="text"
              placeholder="Search movies..."
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <div className="bg-white rounded-lg p-10 text-center shadow-sm">
          <h4 className="text-gray-600">No movies found matching your filters</h4>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <div key={movie._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src={movie.posterUrl} 
                alt={movie.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{movie.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {movie.language} • {movie.rating} • {formatDuration(movie.duration)}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {movie.genre.map(g => (
                    <span key={g} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">{g}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{movie.description}</p>
                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                  onClick={() => handleBookTicket(movie._id)}
                >
                  Book Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieBookingComponent;