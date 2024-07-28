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



export { createJob }