import express from "express";
import {
	getStudentCourses,
	getStudentcourse,
	addCourse,
	enrollInCourse,
	updateEnrollment,
} from "../controllers/courseController.js";
import { authenticate } from "../middleware/authMiddleWare.js";
import {
	validateCourse,
	validateEnrollment,
} from "../validators/courseValidator.js";

const router = express.Router();

// Protected routes
router.use(authenticate);

router.get("/student/:studentId", getStudentCourses);
router.get("/:id", getStudentcourse);
router.post("/", validateCourse, addCourse);
router.post("/enroll", validateEnrollment, enrollInCourse);
router.put(
	"/enroll/:studentId/:courseId",
	validateEnrollment,
	updateEnrollment,
);

export default router;
