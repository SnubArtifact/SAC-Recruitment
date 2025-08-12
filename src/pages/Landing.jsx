import React from 'react'
import './Landing.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import Card from '../ui/card.jsx'
import Trending from '../components/Trending/Trending.jsx'









function Landing() {
    return (
       <>
        <Navbar/>
        <section id='landing'>
            <div id='carousel-container'>
                <div id='carousel-gallery'>
                    hello
                </div>
            </div>
            
            <Trending/>

           

           
        </section>
        </>
    )
}

export default Landing
