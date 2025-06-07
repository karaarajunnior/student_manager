// import dotenv from "dotenv";
// import { createPool } from "mysql2/promise.js";
// dotenv.config();

// export const dbprofile = () => {
// 	try {
// 		const pool = createPool({
// 			host: process.env.DB_HOST,
// 			user: process.env.DB_USER,
// 			password: process.env.DB_PASSWORD,
// 			database: process.env.DB_NAME,
// 			connectionLimit: 8,
// 		});
// 		return pool;
// 	} catch (error) {
// 		console.error("✂ connection failed");
// 		throw error;
// 	}
// };

// config.js
import dotenv from "dotenv";
import { createPool } from "mysql2/promise";
dotenv.config();

export const dbprofile = createPool({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "123",
	database: process.env.DB_NAME || "student_mgr",
	connectionLimit: 8,
});
