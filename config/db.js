import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
import QUERIES from "../queries/student.queries.js";

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

let str =
	'�Bi�D�\x16\x07�2MlFlO�\t�ϐ��8v�#�:Md�z\x165\x10+:��}\x10[��P\x17k&���:Hum�����="';
console.log(str.length);
export default dbprofile;
