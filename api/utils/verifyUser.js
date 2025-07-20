import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  
  if (!token) return next(errorHandler("UnAuthorized!", 401));
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          return next(errorHandler("UnAuthorized", 401));
        }
        req.userId = user.id;
        console.log("Hey from the verify user!")
        next();
      });
  } catch (error) {
    next(errorHandler("There seems to be an issue with the token",401))
  } 
};