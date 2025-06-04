export const coursequeries = {
	courseTable: `
	           create table if not exists courses(
               id int primary key auto_increment,
               course_unit varchar(12) not null
                )`,
	getCourses: `
               SELECT c.*, sc.enrollment_date, sc.status 
               FROM courses c
               JOIN student_courses sc ON c.id = sc.course_id
               WHERE sc.student_id = ?
           `,
	createCourse:
		"insert into courses (`id`, `course_unit`, `code`) values (?,?,?)",
	getCourse: "SELECT * FROM courses WHERE student_id = ?",
	checkEnrollment:
		"SELECT * FROM student_courses WHERE student_id = ? AND course_id = ?",
	newEnrollment:
		"INSERT INTO student_courses (student_id, course_id) VALUES (?, ?)",
	updateEnrollment:
		"UPDATE student_courses SET status = ? WHERE student_id = ? AND course_id = ?",
};
