import express from "express";
import {
	getStudentCourses,
	getStudentcourse,
	enrollInCourse,
	updateEnrollment,
	addCourse,
} from "../controllers/CourseController.js"; // Adjust path as needed

const routes = express.Router();

//add course
routes.post("/course", addCourse);

// Course enrollment
routes.get("/students/:studentId/courses", getStudentCourses);
routes.post("/students/enroll", enrollInCourse);
routes.put("/students/:studentId/courses/:courseId", updateEnrollment);

// Alternative course fetch
routes.get("/students/:id/student-courses", getStudentcourse);

export default routes;
