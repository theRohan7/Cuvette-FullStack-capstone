import { Router } from "express";
import { verifyJWT } from "../middleware/auth.meddileware.js";
import { createJob, getJob, deleteJob, UpdateJob, filterJob } from "../controller/job.controller.js";

const router = Router();

router.route("/create-job").post(verifyJWT, createJob)
router.route("/:id").get(verifyJWT, getJob)
router.route("/delete/:id").delete(verifyJWT, deleteJob)
router.route("/update/:id").post(verifyJWT, UpdateJob)
router.route("/").get(verifyJWT, filterJob)


export default router;