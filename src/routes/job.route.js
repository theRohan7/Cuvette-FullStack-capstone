import { Router } from "express";
import { verifyJWT } from "../middleware/auth.meddileware.js";
import { createJob, getJob, deleteJob } from "../controller/job.controller.js";

const router = Router();

router.route("/create-job").post(verifyJWT, createJob)
router.route("/:id").get(verifyJWT, getJob)
router.route("/delete/:id").delete(verifyJWT, deleteJob)


export default router;