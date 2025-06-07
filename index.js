import App from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.DB_PORT || 5000;

const start = () => {
	App.listen(port, () => {
		console.log(`server running on port ${port}`);
	});
};

start();
