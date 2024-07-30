import mongoose, {Schema} from "mongoose";


const jobSchema = new Schema(
    {
        companyName: {
            type: String,
            required: true
        },
        logoURL: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        },
        jobType: {
            type: String,
            default: "Full-time",
            enum: ["Full-time", "Part-time", "Contract", "Freelance"],
        },
        remote: {
            type: Boolean,
            required: true
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        about: {
            type: String
        },
        skills: {
           type: Array,
           required: true  
        },
        information: {
            type: String
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }

    }
)

export const Job = mongoose.model("Job", jobSchema);



