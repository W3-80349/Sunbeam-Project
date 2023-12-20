import React from 'react'
import notfoundimage from "../../src/assets/notfound.png"
import "./NotFound.css"

const NotFound = () => {
  return (
    <div className="notfound-container">
        <div className="notfound-wrapper">
            <div className="notfound-image">
                <img src={notfoundimage} alt="" />
            </div>
            <div className="notfound-text">
                <h1>404 Page not Found!</h1>
            </div> 
            <h1>"Kidhar <span style={{color:"red"}}>"Bhai"</span> Kidhar? Khaha Jana Hai tujhe?"</h1>   
        </div>
    </div>
  )
}

export default NotFound