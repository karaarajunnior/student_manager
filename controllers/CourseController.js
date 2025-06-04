import dbprofile from "../config/db.js";
import bcrypt from "bcrypt";
import { coursequeries } from "../queries/courses.query.js";

//create table
dbprofile.query(coursequeries.courseTable, (err, result) => {
	err ? console.log(err.stack) : console.log("table created");
});

//get all courses
export const getStudentCourses = (req, res) => {
	const { studentId } = req.params;

	try {
		dbprofile.query(coursequeries.getCourses, [studentId], (err, courses) => {
			res.status(200).json(courses);
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to fetch courses",
			error: error.message,
		});
	}
};

// get student course
export const getStudentcourse = (req, res) => {
	const result = dbprofile.query(coursequeries.getCourse, [req.params.id]);
	res.json(result[0]);
};

//add courses
export const addCourse = async (req, res) => {
	const { id, course_unit, code } = req.body;

	if (!id || !course_unit || !code) {
		return res.status(400).json({ error: "all fields are mandatory" });
	}

	const hashedCode = await bcrypt.hash(code, 8);

	dbprofile.query(
		coursequeries.createCourse,
		[id, course_unit, hashedCode],
		(error, result) => {
			try {
				return res.status(401).json({ msg: "added" });
			} catch (error) {
				res.status(500).json(error);
			}
		},
	);
};

//enroll student in courseunit
export const enrollInCourse = (req, res) => {
	const { studentId, courseId } = req.body;

	try {
		// Check if enrollment already exists
		dbprofile.query(
			coursequeries.checkEnrollment,
			[studentId, courseId],
			(err, existing) => {
				if (existing.length > 0) {
					return res.status(400).json({
						message: "Student is already enrolled in this course",
					});
				} else {
					console.error(err);
				}
			},
		);

		// Create new enrollment
		dbprofile.query(
			coursequeries.newEnrollment,
			[studentId, courseId],
			(err, result) => {
				if (error)
					return res.status(500).json({
						message: "Enrollment failed",
						error: error.message,
					});
			},
		);

		res.status(200).json({
			message: "Enrollment successful",
		});
	} catch (error) {
		console.error(error);
	}
};

//update enrollment
export const updateEnrollment = (req, res) => {
	const { studentId, courseId } = req.params;
	const { status } = req.body;

	try {
		dbprofile.query(coursequeries.updateEnrollment, [
			status,
			studentId,
			courseId,
		]);

		res.status(200).json({
			message: "Enrollment updated",
		});
	} catch (error) {
		res.status(500).json({
			message: "Update failed",
			error: error.message,
		});
	}
};
