const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type : String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type : String,
        required: true,
    },
    phone:{
        type : String,
        required: true,
        undefined: true,
        trim: true
    },
    dateOfBirth: {
        type : String,
        required: true,

    },
    isVerified: {
        type : Boolean,
        default: false
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('User', userSchema)