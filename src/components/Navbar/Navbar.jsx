import React, { useState } from 'react';
import './Navbar.css';
import SearchBar from '../../ui/searchbar';

const Navbar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const API_KEY = '80381868060e4fdb0d2d52347e1552d9';
  const BASE_URL = 'https://api.themoviedb.org/3';

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
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
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

  const handleResultClick = (movieId) => {
    // Handle what happens when a movie is clicked
    console.log('Selected movie ID:', movieId);
    setShowDropdown(false);
  };

  return (
    <div id='navbar'>
      <h3>CineStar</h3>

      <div className="search-container">
        <SearchBar
          placeholder="Search for movies..."
          className="navbar-search"
          onSearch={handleSearch}
        />
        
       
        {error && <div className="search-error">{error}</div>}
        
        {showDropdown && (
          <div className="search-dropdown">
            {searchResults.map(movie => (
              <div 
                key={movie.id} 
                className="dropdown-item"
                onClick={() => handleResultClick(movie.id)}
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
    </div>
  );
};

export default Navbar;