import React, { useState } from 'react';
import './Navbar.css';
import SearchBar from '../../ui/searchbar';

const Navbar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY ;
  

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();
      setSearchResults(data.results);
      setShowDropdown(data.results.length > 0);
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
      setShowDropdown(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (movie) => {
    setSelectedMovie(movie);
    setShowDropdown(false);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div id='navbar'>
      
      <h3 style={{transform: 'translateY(25px) translateX(30px)', width:'50%', color:'white'}}>CineStar</h3>

      <div className="search-container">
        <SearchBar
          placeholder="Search for movies..."
          className="navbar-search"
          onSearch={handleSearch}
        />
        
        {isLoading && <div className="search-loading">Loading...</div>}
        {error && <div className="search-error">{error}</div>}
        
        {showDropdown && (
          <div className="search-dropdown">
            {searchResults.map(movie => (
              <div 
                key={movie.id} 
                className="dropdown-item"
                onClick={() => handleResultClick(movie)}
              >
                <div className="movie-poster">
                  {movie.poster_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`} 
                      alt={movie.title} 
                    />
                  ) : (
                    <div className="poster-placeholder">No Image</div>
                  )}
                </div>
                <div className="movie-info">
                  <div className="movie-title">{movie.title}</div>
                  <div className="movie-year">
                    {movie.release_date ? movie.release_date.split('-')[0] : 'Unknown year'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
      {selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" >
            <button className="close-button" onClick={closeModal}>×</button>
            <div className="modal-poster">
              <img
                src={
                  selectedMovie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                    : 'https://via.placeholder.com/300x450'
                }
                alt={selectedMovie.title}
              />
            </div>
            <div className="modal-details">
              <h2>{selectedMovie.title}</h2>
              <p className="release-date">
                {selectedMovie.release_date || 'Release date not available'}
              </p>
              <p className="rating">
                Rating: {selectedMovie.vote_average ? `${selectedMovie.vote_average}/10` : 'Not rated'}
              </p>
              <p className="overview">
                {selectedMovie.overview || 'No overview available.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;