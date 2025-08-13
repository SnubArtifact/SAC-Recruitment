import React from 'react'
import { useState, useEffect } from 'react'
import './Popular.css'
import Card from '../../ui/card.jsx'

const Popular = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
      const fetchPopularMovies = async () => {
        try {
          const apiKey = import.meta.env.API_KEY || '80381868060e4fdb0d2d52347e1552d9'
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
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
      setVisibleCount(prev => prev + 6); 
    };
  
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


export default Popular
