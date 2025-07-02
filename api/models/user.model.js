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
        default: "https://www.bing.com/ck/a?!&&p=de694d01fa2a721ba2b7f48147488b3e740ec56bcfb85b4c608d28bdc9407d1fJmltdHM9MTc1MTQxNDQwMA&ptn=3&ver=2&hsh=4&fclid=10794f42-a218-652d-0070-5a89a36764cd&u=a1L2ltYWdlcy9zZWFyY2g_cT1wcm9maWxlK2ltYWdlJmlkPTI3MzNBNDVGRkJDMDZFRTEyODkzMTkzQ0E1M0U0NzM0RTZENDg3RTAmRk9STT1JQUNGSVI&ntb=1",
    },
}, {timestamps:true});

const User=mongoose.model('User',userSchema);

export default User;