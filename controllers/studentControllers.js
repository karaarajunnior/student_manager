import cors from "cors";
import dbprofile from "../config/db.js";
import queries from "./queries/queries.js";
const { select, insert, update, deleteStudent, byid } = queries;
export const getStudents = (req, res) => {
	dbprofile.query(select, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			res.send(rows);
			console.log(fields);
		}
	});
};

//getstudent using id
export const getStudent = (req, res) => {
	dbprofile.query(byid, [req.params.id], (err, rows, fields) => {
		try {
			return res.status(200).send(rows, fields);
		} catch (error) {
			return res.status(500).json({ error: "failed to fetch student" });
		}
	});
};

//add student
export const addStudent = (req, res) => {
	const { id, firstname, lastname, tel } = req.body;

	dbprofile.query(insert, [id, firstname, lastname, tel], (err, results) => {
		if (!id || !firstname || !lastname || !tel) {
			return res.status(401).json({ message: "all fields are mandatory" });
		} else {
			return res.json({ message: "student added successfully" });
		}
	});
};

update.replace("strin");

//delete student
export const removeStudent = (req, res) => {
	dbprofile.query(deleteStudent, [req.params.id], (err, results) => {
		if (req.body.id !== req.params.id) {
			return res.send("deleted");
		} else {
			return res.json({ ERROR: "Student with that id doesnot exist" });
		}
	});
};

//update student
export const editStudent = (req, res) => {
	const value = req.body;
	const ID = req.params.id;
	const setKey = Object.keys(value);
	const setValue = Object.values(value);
	if (setKey.length === 0) {
		return res.send("no fields to update");
	} else {
		try {
			dbprofile.query(update, [...setValue, ID], (err, results) => {
				try {
					console.log("here")
					return res.status(200).json({ message: `student updated` });
				} catch (error) {
					console.log("here 2")
					return res.status(400).json({ ERROR: "failed to update student" });
				}
			});
		} catch (error) {
			console.log(error);
		}
	}
};
