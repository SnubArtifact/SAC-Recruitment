import React from 'react'
import './Trending.css'
import Card from '../../ui/card.jsx'

const Trending = () => {
  return (
     <div id="trending">
                <h2>Trending now</h2>
                <div id="trending-movies">
                    
                    <Card 
                    imageUrl="https://via.placeholder.com/150"
                    title={movie.title}
                    subtitle={movie.releaseDate}
                    ><p>this movie is ass</p></Card>
                    <div className="movie-card">Movie 2</div>
                    <div className="movie-card">Movie 3</div>
                    <div className="movie-card">Movie 4</div>
                    <div className="movie-card">Movie 5</div>
                </div>
            </div>
            
  )
}

export default Trending
