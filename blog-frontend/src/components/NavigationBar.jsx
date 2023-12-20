import React, { useState } from 'react';
import "./NavigationBar.css";
import {Link, useLocation } from 'react-router-dom';
import Ideabulb from "../assets/ideabulb.png";
import SearchIcon from '@mui/icons-material/Search';
const NavigationBar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
  return (
    <div className="navbar-wrapper">
         <div className="navbar-container">
                <div className="navbar-logo">
                    <img src={Ideabulb} alt="" />
                    <span>Blog</span>
                 </div>
                 <div className="navbar-search">
                    
                    <SearchIcon className='searchIcon' style={{color:"black", height:"40px", width:"40px"}}/>
                    <input type='text' placeholder='Content is just something to talk about...'/>

                 </div>
                 <div className="navbar-items">
                    <ul>
                   
                        <li><Link to="/" className={activeLink === "/" ? "active" : ''} onClick={() => setActiveLink('/')}><span>Home</span></Link></li>
                        <li><Link to="/aboutus" className={activeLink === "/aboutus" ? "active" : ''} onClick={() => setActiveLink('/aboutus')}><span>About us</span></Link></li>
                        <li><Link className={activeLink === "/adrak" ? "active" : ''} onClick={() => setActiveLink('/adrak')}><span>Adrak</span></Link></li>
                        <li><Link className={activeLink === "/lassan" ? "active" : ''} onClick={() => setActiveLink('/lassan')}><span>Lassan</span></Link></li> 
                    </ul>
                 </div>
                 <div className="navbar-profile">

                 </div>
         </div>
    </div>
  )
}

export default NavigationBar