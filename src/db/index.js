import mongoose from "mongoose";


const DB_NAME = "Cuvette";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB Connected successfully!! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGO DB Connection failed.", error);
        process.exit(1)
    }
}

export default connectDB;