import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./src/routes/student.routes.js";
import courseRoutes from "./src/routes/course.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
	res.status(200).json({ status: "OK", timestamp: new Date() });
});

app.use(errorHandler);

export default app;
