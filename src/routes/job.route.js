import { Router } from "express";
import { verifyJWT } from "../middleware/auth.meddileware.js";
import { createJob } from "../controller/job.controller.js";

const router = Router();

router.route("/create-job").post(verifyJWT, createJob)


export default router;