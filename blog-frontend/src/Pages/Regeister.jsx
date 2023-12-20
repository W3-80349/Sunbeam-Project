import React, {useState} from 'react'
import "./Register.css"
import { Button, TextField } from '@mui/material'
import {Link} from "react-router-dom"
import axios from 'axios'


const Regeister = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [isCheckBoxSuscribed, setIsCheckBoxSuscribed] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState("");

    const textChangeHandler = (event) => {
        // Update state based on the input's name
        const { name, value } = event.target;
        if (name === 'firstName') setFirstName(value);
        if (name === 'lastName') setLastName(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        if (name === 'mobileNo') setMobileNo(value);
        if (name === 'dateOfBirth') setDateOfBirth(value);

        // Check if all required fields have values
        checkUserObject();
    };

    
    const checkBoxHandler = (event) => {
      setIsCheckBoxSuscribed(event.target.checked);
    }

    const checkUserObject = () => {
        if (firstName && lastName && email && password && reEnteredPassword && mobileNo && dateOfBirth && isCheckBoxSuscribed) {
            setIsDisabled(false); // Enable the submit button
        } else {
            setIsDisabled(true); // Disable the submit button
        }
    };
    //Validation for Password
    const checkPassword = () => {
        // Password validation logic
        console.log(password+" "+reEnteredPassword)
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (password === reEnteredPassword ) { 
            if(password.match(passwordRegex)){
                setIsPasswordMatch(false);
                setPasswordErrorText("");
            }else{
                setIsPasswordMatch(true);
                setPasswordErrorText("should have :size > 8, 1-Uppercase, 1-Number");
            }
        } else {
            setIsPasswordMatch(true);
            setPasswordErrorText("Password Not Match!");

        }
    };

    const reEnteredPasswordChange = (event) => {
        setReEnteredPassword(event.target.value);
        console.log("ReEnteredPassword = "+reEnteredPassword);
        console.log("Password : "+password);
    }


    const[focusDOB, setFocusDOB] = useState();
    function setFocusOfDOB(){
        setFocusDOB("Date of Birth");
    }
    function setBlurOfDOB(){
        setFocusDOB("");
    }

    //Incomplete code-==============================================Here
    const submitButtonHandler = () =>
    {
        textChangeHandler();
        axios.post('/register', {
            email:email,
            firstName:firstName
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
// ================================================
  return (
    <div className="register-container">
        <div className="register-wrapper">
            <div className="register-leftside">
                <div className="registration-form">
                    <div className="hedding">Registration</div>

                        {/* TextField for First Name */}
                        <TextField
                            label="First Name" 
                            type='text'
                            variant="outlined"
                            required
                            name='firstName' 
                            className='textfield'
                            placeholder='First Name'
                            autoFocus={true}
                            onChange={textChangeHandler}
                        />

                         {/* TextField for Last Name */}
                        <TextField
                            label="Last Name" 
                            type='text'
                            variant="outlined"
                            required 
                            name='lastName'
                            className='textfield'
                            placeholder='Last Name'
                            onChange={textChangeHandler}
                        />

                         {/* TextField for Email */}
                        <TextField
                            label="Email" 
                            type='email'
                            variant="outlined"
                            required
                            name='email' 
                            className='textfield'
                            placeholder='examle@email.com'
                            onChange={textChangeHandler}
                        />

                         {/* TextField for password */}
                        <TextField
                            label="Password" 
                            type='password'
                            variant="outlined"
                            required
                            error = {isPasswordMatch}
                            name='password'
                            helperText={passwordErrorText}
                            className='textfield'
                            placeholder='Password'
                            onChange={textChangeHandler}
                        />

                         {/* TextField for reEnter Password */}
                         <TextField
                            label="Re-enter Password" 
                            type='password'
                            variant="outlined"
                            required 
                            onBlur={checkPassword}
                            name='reEnteredPassword'
                            className='textfield'
                            placeholder='Password'
                            onChange={reEnteredPasswordChange}
                        />
                        <TextField
                            label="Mobile No." 
                            type='number'
                            variant="outlined"
                            required 
                            name='mobileNo' 
                            className='textfield'
                            placeholder='Mobile No.'
                            onChange={textChangeHandler}
                        />
                        <TextField
                            label={focusDOB}
                            onFocus={setFocusOfDOB}
                            onBlur={setBlurOfDOB} 
                            type='date'
                            name='dateOfBirth'
                            variant="outlined"
                            required 
                            className='textfield'
                            onChange={textChangeHandler}
                        />
                        <div className="TandC">
                            <input type="checkbox" onChange={checkBoxHandler}/> Accept Terms and Conditions.
                            <span>Already have Account?</span> <Link to ="/login">Sign in.</Link>
                        </div> 
                    <div className="submitButton">
                        <Button variant="contained" disabled ={isDisabled}
                            onClick={submitButtonHandler}
                        >
                        Submit</Button>
                    </div>  
                </div>
            </div> 
            <div className="register-rightside">
                <span>Blog.</span>
            </div>
        </div>
    </div>
  )
}

export default Regeister