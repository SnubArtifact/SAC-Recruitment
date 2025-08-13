import React from 'react'
import './Landing.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import Card from '../ui/card.jsx'

import Popular from '../components/Popular/Popular.jsx'









function Landing() {
    return (
       <>
        <Navbar/>
        <section id='landing'>
            <div id='carousel-container'>
                <div id='carousel-gallery'>
                    
                   <img src='/images/madmax.webp' alt='Mad Max' id='carousel-image'/>
                    <h1 id='carousel-title'>Your movies at a glance.</h1>
                  
                </div>
            </div>
            
            
            <Popular/>

           

           
        </section>
        </>
    )
}

export default Landing
