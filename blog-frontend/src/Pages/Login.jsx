import React from 'react'
import './Login.css'
import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import {Link} from "react-router-dom"

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const textChangeHandler = (event) => {
        const { name, value } = event.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    }

  return (
    <div className="login-container">
        <div className='navBar'>
            <span>Blog</span>
        </div>
        <div className="login-wrapper">
            <div className="loginpage-leftside">
                <span>Blog.</span>
                {/* <img src={Logo} alt="" /> */}
            </div>
            <div className="loginpage-rightside">
                <div className="loginForm">
                    <span style={
                        {
                            fontFamily:"Roboto",
                            fontSize:"30px",
                            fontWeight:900,
                            marginTop:"10px",
                        }
                    }>Login In</span>
                    <div className="user-Email">
                        <TextField
                                label="Email" 
                                type='email'
                                variant="standard" 
                               className='user-Email'
                               placeholder='Email'
                               autoFocus={true}
                               onChange={textChangeHandler}
                        />
                    </div>
                    <div className="user-Password">
                        <TextField
                                label="Password"
                                type='password' 
                                variant="standard" 
                                className='user-Password'
                                placeholder='Password'
                                onChange={textChangeHandler}
                        />

                        <div className="incorrect-message">
                            <span style={{color:"red", fontSize:"15px"}}>Invalid Email/Password</span>  
                        </div> 
                    </div>
                       
                    <div className="submit-button">
                        <Button variant="contained">
                        Submit</Button>
                    </div>    
                    <div className="forgetPasswordandRegister">
                        <div className="forgetPassword">
                            <span>forgotten your password?</span>
                        </div>
                        <div className="register">
                            Don't have an account?<Link to="/register"><span> Sign up.</span></Link>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    </div>
  )
}

export default Login