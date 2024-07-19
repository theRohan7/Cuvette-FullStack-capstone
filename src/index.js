import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/index.js"


dotenv.config({
    path: "./env"
})

connectDB()
.then(() =>{
    app.on("error", (err) =>{
        console.log("ERROR: ", err);
        throw err;
    })
})
.then(() =>{
    app.listen(process.env.POST || 8000, () =>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB Connection failed !!" , err);
})

