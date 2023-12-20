import React from 'react'
import NavigationBar from '../components/NavigationBar'
import Environment from "../assets/categoryicons/environment.png"
import Political from "../assets/categoryicons/politics.png"
import Gamming from "../assets/categoryicons/games.png"
import Technology from "../assets/categoryicons/tech.png"
import Sports from "../assets/categoryicons/sports.png"


import "./Home.css"
import { Link } from 'react-router-dom/cjs/react-router-dom'
const Home = () => {
    
  return (
    <div className="home-container">
        <div className="home-wrapper">
                <NavigationBar/>  
             <div className="home-content">
                <div className="home-leftcolumn">
                  <Link to="/createpost"><button className='addcontent'>+ Write my Story</button></Link>
                  <span className='list-headding'>Trendings Topics</span>
                  <ul className="trending-list">
                    
                  </ul>
                </div>
                <div className="home-midcolumn">

                </div>
                <div className="home-rightcolumn">
                  <span className='list-headding'>Top-Category</span>
                  <ul className="category-list">
              
              <li>
                <img src={Environment} alt="Environment" />
                <span>Environment</span>
              </li>
              <li>
                <img src={Political} alt="Political" />
                <span>Politics</span>
              </li>
              <li>
                <img src={Technology} alt="Technology" />
                <span>Technology</span>
              </li>
              
              <li>
                <img src={Gamming} alt="Gamming" />
                <span>Gamming</span>
              </li>
              <li>
                <img src={Sports} alt="Sports" />
                <span>Sports</span>
              </li>
            </ul>
                  <span className='list-headding'>Sub-Category</span>

                </div>
             </div>
        </div>
    </div>
  )
}

export default Home

