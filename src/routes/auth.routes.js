import express from "express";
import {
	loginStudent,
	logoutStudent,
} from "../controllers/studentControllers.js";
import { validateLogin } from "../validators/authValidator.js";

const router = express.Router();

router.post("/login", validateLogin, loginStudent);
router.post("/logout", logoutStudent);

export default router;
