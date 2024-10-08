import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,  
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// Routes import
import userRouter from "./routes/user.routes.js"
import jobRouter from "./routes/job.route.js"
import authRouter from "./routes/auth.route.js"

// Routes Declaration

app.use("/api/v1/users", userRouter)
//actual route would be  " http://localhost:3000/api/v1/users/.... "
app.use("/api/v1/job", jobRouter)
//actual route would be  " http://localhost:3000/api/v1/job/.... "
app.use("/api/v1/auth", authRouter )
//actual route would be  " http://localhost:3000/api/v1/auth/.... "




export { app };