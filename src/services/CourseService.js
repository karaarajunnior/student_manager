import { dbprofile } from "../config/config.js";
import bcrypt from "bcrypt";
import { coursequeries } from "../queries/courses.query.js";

class CourseService {
	constructor() {
		this.db = dbprofile; 
	}

	async createCourseTable() {
		return await this.db.query(coursequeries.courseTable);
	}

	async getStudentCourses(studentId) {
		const [rows] = await this.db.query(coursequeries.getCourses, [studentId]);
		return rows;
	}

	async getCourseById(courseId) {
		const [rows] = await this.db.query(coursequeries.getCourse, [courseId]);
		return rows[0] || null;
	}

	async createCourse(courseData) {
		const { id, course_unit, code } = courseData;
		if (!id || !course_unit || !code) {
			throw new Error("All fields are mandatory");
		}

		const hashedCode = await bcrypt.hash(code, 8);
		const [result] = await this.db.query(coursequeries.createCourse, [
			id,
			course_unit,
			hashedCode,
		]);
		return result;
	}

	async checkEnrollment(studentId, courseId) {
		const [rows] = await this.db.query(coursequeries.checkEnrollment, [
			studentId,
			courseId,
		]);
		return rows;
	}

	async enrollStudent(studentId, courseId) {
		const existingEnrollment = await this.checkEnrollment(studentId, courseId);
		if (existingEnrollment.length > 0) {
			throw new Error("Student is already enrolled in this course");
		}

		const [result] = await this.db.query(coursequeries.newEnrollment, [
			studentId,
			courseId,
		]);
		return result;
	}

	async updateEnrollment(studentId, courseId, status) {
		const [result] = await this.db.query(coursequeries.updateEnrollment, [
			status,
			studentId,
			courseId,
		]);
		return result;
	}

	async validateCourseExists(courseId) {
		const course = await this.getCourseById(courseId);
		return course !== null;
	}
}

export { CourseService };
