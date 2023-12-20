import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        value:{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            dateOfBirth: '',
            mobileNo: '',
        }
    }

})