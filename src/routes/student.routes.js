import express from "express";
import {
	getStudents,
	getStudent,
	addStudent,
	editStudent,
	removeStudent,
	queryStudents,
	getStudentCount,
	getStudentProfile,
} from "../controllers/studentControllers.js";
import { authenticate } from "../middleware/authMiddleWare.js";
import { validateStudent } from "../validators/studentValidator.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/search", queryStudents);
router.get("/count", getStudentCount);

router.use(authenticate);

router.get("/profile", getStudentProfile);
router.get("/:id", getStudent);
router.post("/", validateStudent, addStudent);
router.put("/:id", validateStudent, editStudent);
router.delete("/:id", removeStudent);

export default router;
