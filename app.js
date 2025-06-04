import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/student.routes.js";
import routes from "./routes/courses.routes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use("/api", routes);
app.use((error, req, res, next) => {
	console.error(error);
	res.status(500).send("something broke🎗");
});

export default app;
