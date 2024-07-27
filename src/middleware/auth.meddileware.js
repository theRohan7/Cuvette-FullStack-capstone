import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler( async(req, res, next)=>{
    try {
        
        const token =  req.headers["authorization"]
    
        if(!token){
            throw new ApiError(401, "Unauthorized Request")
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
       
        const user =  await User.findById(decodedToken?._id).select("-password ")
        
        if(!user){
            throw new ApiError(401, "Invalid  token")
        }
    
        req.user = user;
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid  token")
        
    }
})