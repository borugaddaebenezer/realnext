import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
// import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({
    msg: "The test works",
  });
};

export const updateUser = async (req, res, next) => {
  console.log("this is the form data received",req.body)
  const userId = req.userId;
  console.log('userid from diff sources are',userId,req.params.id);
  
  if (userId != req.params.id)
    return next(errorHandler("You can update Your Own Account Only!", 401));
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        username: req.body.username,
        password:req.body.password,
        email: req.body.email,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  );
  console.log(updatedUser);
  
  const {password,...rest} = updatedUser._doc;
  res.status(200).json(rest)
};

export const deleteUser = async (req,res,next)=>{
  const deleteId = req.userId;
  const id = req.params.id;
  if(deleteId!=id){
    return next(errorHandler("You can delete your own account only!",401))
  }
  else{
    try{
      const dbRes = await User.findByIdAndDelete(deleteId)
      res.clearCookie("access_token")
  res.status(200).json({
    success:true,
    msg:"Success User has been deleted!"
  })
    }catch(err){
      return next(errorHandler("There seem to be an issue with the servers",401))
    }
  }
}

export const showUserListings = async (req,res,next)=>{
  const userId = req.userId;
  const user = req.params.id;
  console.log(userId);
  console.log(user);
  
  if(userId!=user){
    return next(errorHandler("Access Denied",401))
  }
  try {
    const listings = await Listing.find({userRef:userId})
    res.status(200).json(listings)
    
  } catch (error) {
    return next(error)
  }
}

export const getUser = async (req,res,next)=>{
  try {
    const landLordId = req.params.id
  const user = await User.findById(landLordId)
  if(!user){
    return next(errorHandler("User not Found",404))
  }
  else{
    const {password:pass,...rest} = user
    return res.status(200).json(rest)
  }
  } catch (error) {
    return next(error)
  }
  
}