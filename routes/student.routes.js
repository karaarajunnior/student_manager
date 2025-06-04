import express from "express";
import {
	getStudents,
	getStudent,
	addStudent,
	removeStudent,
	editStudent,
	getStudentCount,
	loginStudent,
	queryStudents,
} from "../controllers/studentControllers.js"; // Adjust path as needed

const router = express.Router();

// Student CRUD
router
	.route("/students/:id")
	.get(getStudent)
	.put(editStudent)
	.delete(removeStudent);
router.route("/students").get(getStudents).post(addStudent);

// Student login
router.post("/students/login", loginStudent);

// Search
router.get("/query", queryStudents);
router.get("/students/count/all", getStudentCount);

export default router;
