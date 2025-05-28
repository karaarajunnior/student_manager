import express from "express";
const router = express.Router();
import {
	getStudent,
	getStudents,
	removeStudent,
	addStudent,
	editStudent,
} from "../controllers/studentControllers.js";

router.route("/").get(getStudents).post(addStudent);
router.route("/:id").get(getStudent);
router.route("/:id").put(editStudent);
router.route("/:id").delete(removeStudent);

export default router;
