import React from 'react'
import { useState, useEffect } from 'react'
import './Popular.css'
import Card from '../../ui/card.jsx'

const Popular = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleCount, setVisibleCount] = useState(6)
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const API_KEY = import.meta.env.VITE_API_KEY ;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch popular movies')
        }
        
        const data = await response.json()
        setMovies(data.results)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularMovies()
  }, [])

  const showMoreMovies = () => {
    setVisibleCount(prev => prev + 6)
  }

  const handleCardClick = (movie) => {
    setSelectedMovie(movie)
  }

  const closeModal = () => {
    setSelectedMovie(null)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div id="popular">
      <h2 id='popular-now'>Popular</h2>
      <div id="popular-movies">
        {movies.slice(0, visibleCount).map((movie) => (
          <div key={movie.id} onClick={() => handleCardClick(movie)}>
            <Card
              imageUrl={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : 'https://via.placeholder.com/150'
              }
              title={movie.title}
              subtitle={movie.release_date}
            />
          </div>
        ))}
      </div>
      
      {visibleCount < movies.length && (
        <button 
          onClick={showMoreMovies}
          id="show-more-btn"
        >
          Show More
        </button>
      )}
      
      
      {selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
              <p className="release-date">{selectedMovie.release_date}</p>
              <p className="rating">Rating: {selectedMovie.vote_average}/10</p>
              <p className="overview">{selectedMovie.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Popular