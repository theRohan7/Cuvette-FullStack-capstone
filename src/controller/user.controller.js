import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"



const registerUser = asyncHandler( async(req, res) => {
    
    const { name, email, password } = req.body;

    if(name === ""){
        throw new ApiError(400, "Name is Required")
    }
    if(email === ""){
        throw new ApiError(400, "E-mail is Required")
    }
    if(password === ""){
        throw new ApiError(400, "Name is Required")
    }

    const existedUser = await User.findOne({email}) 

    if(existedUser){
        throw new ApiError(409, "User with email already exists!!")
    }


    const user = await User.create({
        name,
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select(" -password")

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while Registering.")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200, createdUser, "User registered Successfully.")
    )
}
)

const loginUser = asyncHandler( async(req, res) => {
    const{email, password} = req.body;

    if(!email){
        throw new ApiError(400, "email is Required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404, "User does not exists.")
    }

    const checkPassword = await user.isPasswordCorrect(password)

    if(!checkPassword){
        throw new ApiError(500, "Invalid user credentials")
    }

    const token = jwt.sign(
        {
            _id: user._id
        },
        process.env.TOKEN_SECRET
    );

    const loggedinUser = await User.findById(user._id).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedinUser,
                token
            },
            "User logged in successfully."
        )
    )
})

const changePassword = asyncHandler ( async(req,res) =>{
    const {oldpassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldpassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Old Password is wrong")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Password chnaged successfully.")
    )
})






export {
    registerUser,
    loginUser,
    changePassword
    
};