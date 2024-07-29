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

const UpdateJob = asyncHandler( async(req, res) => {
   const { id } = req.params;
   const job = await Job.findById(id);
   if(!job){
    throw new ApiError(404, "Job not found.")
   }

   const jobCreator = job.userId.toString();
   const user = req.user._id.toString();
   if(jobCreator !== user){
        throw new ApiError(403, "Unauthorized access to update")
    }

    const jobInfo = req.body;

    const skills = jobInfo?.skills?.split(",");
    const newSkills = skills?.map(skill => skill?.trim());
    jobInfo.skills = newSkills

    await Job.findByIdAndUpdate(id, jobInfo, {
        runValidators: true,    //run the schema validtors on the updated document 
        new: true               // return the updated document instead of original
    });

    return res
    .status(200)
    .json(new ApiResponse(200, jobInfo, "Job Updated Successfully"))
})

//Filter 1. No filter   2. Filter by skills  3. Filter by Keywords(Not Done)

const filterJob = asyncHandler ( async(req, res) => {
    const {skills, keywords} = req.query;
    const filter= {}
    if(skills){
        const skillsArray = skills.split(",").map(skill => skill.trim());
        filter.skills = { $in: skillsArray };
    }
    
    const jobs = await Job.find(filter);

    return res
    .status(200)
    .json( new ApiResponse(200, jobs, "Jobs Fetched successfully") )

})



export { 
    createJob,
    getJob,
    deleteJob,
    UpdateJob,
    filterJob,

 }