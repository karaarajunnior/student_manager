import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
import QUERIES from "../controllers/queries/queries.js";

const dbprofile = mysql.createConnection({
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	database: process.env.database,
});

dbprofile.connect((error) =>
	error
		? console.log("failed to connect to the database")
		: console.log("connected tothe database"),
);

//creating table
dbprofile.query(QUERIES.tab, (err, result) => {
	err ? console.log(err.stack) : console.log(result);
});

export default dbprofile;
