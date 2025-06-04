import dbprofile from "../config/db.js";
import queries from "../queries/student.queries.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Promisify from "node:util";
import QUERIES from "../queries/student.queries.js";

//creating tables
dbprofile.query(queries.tab, (err, result) => {
	err ? console.log(err.stack) : console.log("table created");
});

dbprofile.query(queries.LecturerTable, (err, result) => {
	err ? console.log(err.stack) : console.log("table created");
});

//get all students
export const getStudents = (req, res) => {
	console.log(res);
	dbprofile.query(queries.select, (err, data) => {
		try {
			return res.status(200).json({ data: data });
		} catch (error) {
			console.log(err);
		}
	});
};

//getstudent using id
export const getStudent = (req, res) => {
	dbprofile.query(queries.byid, [req.params.id], (err, data) => {
		try {
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json({ error: "failed to fetch student" });
		}
	});
};

//add student
export const addStudent = async (req, res) => {
	const { id, firstname, lastname, tel, password } = req.body;

	if (!id || !firstname || !lastname || !tel || !password) {
		return res.status(400).json({ error: "all fields are mandatory" });
	}

	const hashedPassword = await bcrypt.hash(password, 8);

	dbprofile.query(
		queries.insert,
		[id, firstname, lastname, tel, hashedPassword],
		(error, result) => {
			try {
				return res.status(401).json({ msg: "created" });
			} catch (error) {
				res.status(500).json(error);
			}
		},
	);
};

//delete student
export const removeStudent = (req, res) => {
	dbprofile.query(QUERIES.deleteStudent, [req.params.id], (err, results) => {
		err
			? res.json({ ERROR: "Student with that id doesnot exist" })
			: res.send("deleted");
	});
};

//update student
export const editStudent = (req, res) => {
	const value = [
		req.body.firstname,
		req.body.lastname,
		req.body.tel,
		req.body.password,
	];

	dbprofile.query(QUERIES.update, [...value, req.params.id], (err, results) => {
		try {
			console.log("here");
			return res.status(200).json({ message: `student updated` });
		} catch (error) {
			console.log("here 2");
			return res.status(400).json({ ERROR: "failed to update student" });
		}
	});
};

// //search student by name
export const queryStudents = (req, res) => {
	const value = req.body;
	const setValue = Object.values(value);
	let sortedStudent = [...setValue];

	const { search, limit } = req.query;
	console.log(typeof sortedStudent);
	if (search) {
		sortedStudent = sortedStudent.filter((student) => {
			return student.firstname.startsWith(search);
		});
	}
	if (limit) {
		sortedStudent = sortedStudent.slice(0, Number(limit));
	}
	if (sortedStudent.length < 1) {
		return res.json({ success: true, data: [sortedStudent] });
	}

	return res.send(sortedStudent);
};

//number of students
export const getStudentCount = (req, res) => {
	const result = dbprofile.query(QUERIES.COUNT);
	res.json({ result: JSON.stringify(result) });
};
//student login
export const loginStudent = async (req, res) => {
	const { tel } = req.body;

	dbprofile.query(queries.StudentLogin, tel, (error, data) => {
		if (error) return res.json("login error");
		if (data[0].length > 0) {
			bcrypt.compare(req.body.password, data[0].password, (err, result) => {
				if (err) return res.json("password compare error");
				if (result) {
					return res.json("success");
				} else {
					const name = req.body.firstname;
					const token = jwt.sign({ name }, process.env.ACCESS_TOKEN, {
						expiresIn: "1h",
					});
					res.cookie("token", token);
					return res.send("password matched unsuccessful");
				}
			});
		} else {
			return res.json("tel doesnt exist");
		}
	});
};
