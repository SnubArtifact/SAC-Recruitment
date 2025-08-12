import React, { useState, useEffect } from 'react'
import './Trending.css'
import Card from '../../ui/card.jsx'


const Trending = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const apiKey = import.meta.env.API_KEY || '80381868060e4fdb0d2d52347e1552d9'
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch trending movies')
        }
        
        const data = await response.json()
        setMovies(data.results)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingMovies()
  }, [])

  const showMoreMovies = () => {
    setVisibleCount(prev => prev + 6); 
  };

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div id="trending">
      <h2 id='trending-now'>Trending now</h2>
      <div id="trending-movies">
        {movies.slice(0, visibleCount).map((movie) => (
          <Card
            key={movie.id}
            imageUrl={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : 'https://via.placeholder.com/150'
            }
            title={movie.title}
            subtitle={movie.release_date}
          >
           
          </Card>

           
      
      
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
    
    </div>
  )
}

export default Trending