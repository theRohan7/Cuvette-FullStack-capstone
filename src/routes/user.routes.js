import { Router } from "express";
import { loginUser, registerUser, changePassword } from "../controller/user.controller.js"
import { verifyJWT } from "../middleware/auth.meddileware.js";



const router = Router()


router.route("/register").post( registerUser)
router.route("/login").post( loginUser)
router.route("/change-password").post(verifyJWT, changePassword)



export default router;