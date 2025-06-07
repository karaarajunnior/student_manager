import { CourseService } from "../services/CourseService.js";

const courseService = new CourseService();

// Initialize course table
courseService.createCourseTable().catch(console.error);

export const getStudentCourses = async (req, res, next) => {
	try {
		const courses = await courseService.getStudentCourses(req.params.studentId);
		res.status(200).json({
			success: true,
			count: courses.length,
			data: courses,
		});
	} catch (error) {
		next(error);
	}
};

export const getStudentcourse = async (req, res, next) => {
	try {
		const course = await courseService.getCourseById(req.params.id);
		if (!course) {
			return res.status(404).json({
				success: false,
				error: "Course not found",
			});
		}
		res.status(200).json({
			success: true,
			data: course,
		});
	} catch (error) {
		next(error);
	}
};

export const addCourse = async (req, res, next) => {
	try {
		const result = await courseService.createCourse(req.body);
		res.status(201).json({
			success: true,
			message: "Course created successfully",
			data: {
				id: result.insertId,
				course_unit: req.body.course_unit,
				code: req.body.code,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const enrollInCourse = async (req, res, next) => {
	try {
		const { studentId, courseId } = req.body;
		await courseService.enrollStudent(studentId, courseId);
		res.status(200).json({
			success: true,
			message: "Enrollment successful",
		});
	} catch (error) {
		next(error);
	}
};

export const updateEnrollment = async (req, res, next) => {
	try {
		const { studentId, courseId } = req.params;
		const { status } = req.body;
		await courseService.updateEnrollment(studentId, courseId, status);
		res.status(200).json({
			success: true,
			message: "Enrollment updated successfully",
		});
	} catch (error) {
		next(error);
	}
};
