import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/routes.js";

app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.listen(process.env.port, () => {
	console.log(`server running on port ${process.env.port}`);
});
