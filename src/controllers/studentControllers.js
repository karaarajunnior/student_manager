import StudentService from "../services/StudentService.js";

const studentService = new StudentService();

// Initialize tables
studentService.createTables().catch(console.error);
studentService.createLecturerTable().catch(console.error);

export const getStudents = async (req, res, next) => {
	try {
		const students = await studentService.getAllStudents();
		res.status(200).json({
			success: true,
			count: students.length,
			data: students,
		});
	} catch (error) {
		next(error);
	}
};

export const getStudent = async (req, res, next) => {
	try {
		const student = await studentService.getStudentById(req.params.id);
		if (!student || student.length === 0) {
			return res.status(404).json({
				success: false,
				error: "Student not found",
			});
		}
		res.status(200).json({
			success: true,
			data: student[0],
		});
	} catch (error) {
		next(error);
	}
};

export const addStudent = async (req, res, next) => {
	try {
		const result = await studentService.createStudent(req.body);
		res.status(201).json({
			success: true,
			message: "Student created successfully",
			data: {
				id: result.insertId,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				tel: req.body.tel,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const editStudent = async (req, res, next) => {
	try {
		const result = await studentService.updateStudent(req.params.id, req.body);
		if (result.affectedRows === 0) {
			return res.status(404).json({
				success: false,
				error: "Student not found or no changes made",
			});
		}
		res.status(200).json({
			success: true,
			message: "Student updated successfully",
		});
	} catch (error) {
		next(error);
	}
};

export const removeStudent = async (req, res, next) => {
	try {
		const result = await studentService.deleteStudent(req.params.id);
		if (result.affectedRows === 0) {
			return res.status(404).json({
				success: false,
				error: "Student not found",
			});
		}
		res.status(200).json({
			success: true,
			message: "Student deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

export const queryStudents = async (req, res, next) => {
	try {
		const { search, limit } = req.query;
		const students = await studentService.searchStudents(search, limit);
		res.status(200).json({
			success: true,
			count: students.length,
			data: students,
		});
	} catch (error) {
		next(error);
	}
};

export const getStudentCount = async (req, res, next) => {
	try {
		const count = await studentService.getStudentCount();
		res.status(200).json({
			success: true,
			count: count[0].count,
		});
	} catch (error) {
		next(error);
	}
};

export const loginStudent = async (req, res, next) => {
	try {
		const { tel } = req.body;
		const result = await studentService.loginStudent(tel);

		res.cookie("token", result.token, {
			httpOnly: true,
		});

		res.status(200).json({
			success: true,
			token: result.token,
			user: result.user,
		});
	} catch (error) {
		next(error);
	}
};

export const logoutStudent = (req, res) => {
	res.clearCookie("token");
	res.status(200).json({
		success: true,
		message: "Logged out successfully",
	});
};

export const getStudentProfile = async (req, res, next) => {
	try {
		const student = await studentService.getStudentById(req.user.id);
		if (!student || student.length === 0) {
			return res.status(404).json({
				success: false,
				error: "Student not found",
			});
		}

		const { password, ...profile } = student[0];
		res.status(200).json({
			success: true,
			data: profile,
		});
	} catch (error) {
		next(error);
	}
};
