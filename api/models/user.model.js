import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    },
    avatar:{
        type:String,
        default: 'https://img.freepik.com/premium-photo/profile-icon-white-background_941097-161740.jpg',
    },
}, {timestamps:true});

const User=mongoose.model('User',userSchema);

export default User;