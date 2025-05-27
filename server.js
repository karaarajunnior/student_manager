const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const port = process.env.port || 3000;

app.use(express.json());
app.use(bodyParser.json());

//create connection to mysql
const dbprofile = mysql.createConnection({
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	database: process.env.database,
});

dbprofile.connect((error) => {
	error
		? console.log("failed to connect to the database")
		: app.listen(port, () => {
				console.log(`server running on port ${port}`);
				console.log("connected to the database");
		  });
});

//creating table
const tab = `create table if not exists data(
id int primary key auto_increment,
role varchar(12) not null
)`;

dbprofile.query(tab, (err, result) => {
	err ? console.log("error creating table", +err) : console.log(result);
});

//geting all students
app.get("/getStudent", (req, res) => {
	const sql = `select * from students`;
	dbprofile.query(sql, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			res.send(rows);
			console.log(fields);
		}
	});
});

//getstudent using id
app.get("/getStudent/:id", (req, res) => {
	const sql = `select * from students where ID = ?`;
	const ID = req.params.id;
	dbprofile.query(sql, [ID], (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).send(rows);
			console.log(fields);
		}
	});
});
app.post("/addStudent", (req, res) => {
	const sql =
		"insert into students (`id`, `firstname`, `lastname`,`tel`) values (?,?,?,?)";
	const { id, firstname, lastname, tel } = req.body;
	dbprofile.query(sql, [id, firstname, lastname, tel], (err, results) => {
		if (err) {
			return res.status(500).json("Error on inserting student");
			console.log("failure", +err);
		} else {
			return res.status(200).json({ message: "student added" });
			console.log(results);
		}
	});
});

//delete student
app.delete("/removeStudent/:id", (req, res) => {
	const sql = `DELETE from students where id = ?`;
	dbprofile.query(sql, [req.params.id], (err, results) => {
		if (err) {
			return res.status(500).json("Error");
			console.log("failed to delete", +err);
		} else {
			res.send("deleted successfully");
			console.log("deleted");
		}
	});
});

//update student
app.put("/editStudent/:id", (req, res) => {
	const sql =
		"update students set `firstname` = ? , `lastname` = ? , `tel` = ? where ID = ?";
	const values = [req.body.firstname, req.body.lastname, req.body.tel];
	dbprofile.query(sql, [...values, req.params.id], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "failed to update student" });
		} else {
			res.send("updated successfully");
		}
	});
});
