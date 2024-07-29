import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.model.js"

const createJob = asyncHandler ( async(req, res) => {

    const jobInfo = req.body;

    const skills = jobInfo.skills?.split(",") || []; // Splits the  string into an array of strings.
    const newSkills = skills?.map(skill => skill?.trim()); // removes the leading and trailling spaces.
    jobInfo.skills = newSkills;

    const user = req.user;
    jobInfo.userId = user._id

    const job = await Job.create(jobInfo);
    await job.save();

    return res
    .status(200)
    .json(
         new ApiResponse(200, jobInfo, "Job created successfully.")
    )
})

const getJob = async (req, res) =>{
    const {id} = req.params;
    const job = await Job.findById(id);

    if(!job){
        throw new ApiError(404, "Job not found.")
    }

    return res
    .status(200)
    .json( new ApiResponse(200, job, "Jobs fetched successfully"))
}

const deleteJob = asyncHandler( async(req, res) =>{
     const { id } = req.params;
     const job = await Job.findById(id);

     const jobCreator = job.userId.toString();
     const user = req.user._id.toString();
     if(jobCreator !== user){
        throw new ApiError(403, "Unauthorized access to delete")
    }

    await Job.findByIdAndDelete(id)
    
    return res
    .status(200)
    .json(new ApiResponse(200, "Job deleted successfully"))

})



export { 
    createJob,
    getJob,
    deleteJob,

 }