const { isValidEmail } = require("../Validtaor/validator");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

require("dotenv").config();

var OTP;

//User Email verification
const userEmailVerification = async function(request, response) {
    console.log("User email verification");
    
        let email = request.body.email;
        let firstName = request.body.firstName;
        // Nodemailer setup
        const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.AUTH_EMAIL,
          pass: process.env.AUTH_PASSWORD,
        },
      });
      
        // Generate a 6-digit OTP
         const generateOTP = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };
      
        // Send OTP via email
          const sendOTPByEmail = async (email, otp) => {
           const mailOptions = {
           from: process.env.AUTH_EMAIL,
           to: email,
           subject: "Your OTP Code",
           text:`Hi ${firstName},

                 Welcome to Blog Management Application.
                 Do not Share Your OTP Code.
                 This is your OTP: ${otp}.
           
                 Regards,
                 Team Blog Management Application`,
         };
      
         try {
          await transporter.sendMail(mailOptions);
         } catch (error) {
          console.error("Error sending OTP:", error);
         }
        };
    
        OTP = generateOTP();
        await sendOTPByEmail(email, OTP);

        return response.status(201).send({status: 'OK', message:`Your OTP Code ${OTP}`});
}





//User Regestration controller

const createUser = async function(request, response) {
    try{
        const requestBody = request.body;

        if (Object.keys(requestBody).length == 0) {
            return response.status(400).send({ status: false, message: "Request Body is empty !" });
        }

        // Destructuring the request body
        const {firstName, lastName, email, password, phone, dateOfBirth, otp} = requestBody;

        //checking if the user with the given email or phone is already registered!
        const isEmailExist = await userModel.findOne({ email: email });
        if (isEmailExist) {
            return response.status(400).send({ status: false, message: "User with this Email Already Exist!" });
        }

        const isPhoneExist = await userModel.findOne({ phone: phone });
        if (isPhoneExist) {
            return response.status(400).send({ status: false, message: "User with this Phone Number Already Exist!" })
        }

        //hashing the password and storing in request body object
        const hashedPasswords = await bcrypt.hash(password, 10);
        requestBody.password = hashedPasswords;

        // verify email
        if (otp !== OTP) {
            return response.status(400).send({ status: false, message: "Invalid OTP. Registration failed." });
        }
        
        //If email is verified by otp then setting uses as Verifed user
        requestBody.isVerified = true;

        //Storing new User document in Database
        const newUser = await userModel.create(requestBody);
        if(newUser){
            response.status(201).send({ status: true, message: "Registration Sucessfull!", data: newUser});
        } else {
            return response.status(400).send({status:false, message: "Regestration Unsuccessfull !"});
        } 
    }
    catch(error) {
        response.status(500).send({ status: false, message: error.message });
    }
}







//User Login Controller Function

const loginUser = async function(request, response) {
    try {
        const {email, password} = request.body; //Destructuring

        // checking Input of Email
        if (!email) {
            return res.status(400).send({ status: false, message: "Email is empty" })
        }
        // cheking input of Password
        if (!password) {
            return res.status(400).send({ status: false, message: "Password is Empty" })
        }

        if(!isValidEmail(email)){
            return response.status(400).send({staus: false, message : "Invalid email!"})
        }

        //find the user in the database and check if they exist!
        const isUserExist = await userModel.findOne({ email: email });
        if(!isUserExist){
            return response.status(401).send({staus: false, message : "User Not Found!"})
        } 
        console.log(email, password)

        //decrypt the password
        const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);
        if(!isPasswordMatched){
            return response.status(400).send({status:false, message:"Incorrect Password!" })
        }

        //Createing a JSON WEB TOKEN and send it to client
        const expirationTime = Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60; // 90 days * 24 hours * 60 minutes * 60 seconds
        const token = jwt.sign({
            userId: isUserExist._id,
            iat: Math.floor(Date.now() / 1000),
            exp: expirationTime
        },
        process.env.TOKEN_KEY
        )
        console.log(token);
        response.status(200).send({ status: true, message: " User Login Successfull", data: { user: isUserExist, token: token} })

    } catch (error) {
        response.status(500).send({ status: false, message: error.message });
    }
}



module.exports = {userEmailVerification, createUser, loginUser};

 