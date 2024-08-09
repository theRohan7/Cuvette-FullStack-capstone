import { Router } from "express";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const router = Router()

router.route("/verify-token").post(asyncHandler ( async (req, res, next) => {
    const token = req.headers['authorization'];
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = verifiedToken._id;
    const user = await User.findById(userId);
    return res
    .status(200)
    .json(
        new ApiResponse(200, {email:user.email, name: user.name}, " successfully.")
   )
} ))



export default router