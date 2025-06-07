import { dbprofile } from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import QUERIES from "../queries/student.queries.js";
import dotenv from "dotenv";
dotenv.config();

class StudentService {
	constructor() {
		this.db = dbprofile;
	}

	async createTables() {
		const [result] = await this.db.query(QUERIES.tab);
		return result;
	}

	async createLecturerTable() {
		const [result] = await this.db.query(QUERIES.LecturerTable);
		return result;
	}

	async getAllStudents() {
		const [data] = await this.db.query(QUERIES.select);
		return data;
	}

	async getStudentById(id) {
		const [data] = await this.db.query(QUERIES.byid, [id]);
		return data;
	}

	async createStudent(studentData) {
		const { id, firstname, lastname, tel, password } = studentData;
		if (!id || !firstname || !lastname || !tel || !password) {
			throw new Error("All fields are mandatory");
		}

		const hashedPassword = await bcrypt.hash(password, 8);
		const [result] = await this.db.query(QUERIES.insert, [
			id,
			firstname,
			lastname,
			tel,
			hashedPassword,
		]);
		return result;
	}

	async updateStudent(id, studentData) {
		const { firstname, lastname, tel, password } = studentData;
		const hashedPassword = password ? await bcrypt.hash(password, 8) : password;

		const [result] = await this.db.query(QUERIES.update, [
			firstname,
			lastname,
			tel,
			hashedPassword,
			id,
		]);
		return result;
	}

	async deleteStudent(id) {
		const [result] = await this.db.query(QUERIES.deleteStudent, [id]);
		return result;
	}

	async searchStudents(searchTerm, limit) {
		const [rows] = await this.db.query(QUERIES.select);

		let filteredStudents = rows;
		if (searchTerm) {
			filteredStudents = filteredStudents.filter((student) =>
				student.firstname.toLowerCase().startsWith(searchTerm.toLowerCase()),
			);
		}

		if (limit) {
			filteredStudents = filteredStudents.slice(0, Number(limit));
		}

		return filteredStudents;
	}

	async getStudentCount() {
		const [result] = await this.db.query(QUERIES.COUNT);
		return result;
	}

	async loginStudent(tel, password) {
		const [data] = await this.db.query(QUERIES.StudentLogin, [tel, password]);

		if (data.length === 0) {
			throw new Error("Invalid credentials");
		}

		const isPasswordValid = await bcrypt.compare(password, data[0].password);
		if (!isPasswordValid) {
			throw new Error("Invalid credentials");
		}

		const token = jwt.sign(
			{
				id: data[0].id,
				tel: data[0].tel,
				firstname: data[0].firstname,
			},
			process.env.ACCESS_TOKEN,
			{ expiresIn: "1h" },
		);

		return {
			token,
			user: {
				id: data[0].id,
				firstname: data[0].firstname,
				lastname: data[0].lastname,
				tel: data[0].tel,
			},
		};
	}

	async validateStudentExists(id) {
		const student = await this.getStudentById(id);
		return student && student.length > 0;
	}
}

export default StudentService;
