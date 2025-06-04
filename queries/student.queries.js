const QUERIES = {
	select: "select id, firstname, lastname,tel from students",
	byid: "select id, firstname, lastname,tel from students where ID = ?",
	insert:
		"insert into students (`id`, `firstname`, `lastname`,`tel`,`password`) values (?,?,?,?,?)",
	deleteStudent: "DELETE from students where id = ?",
	update:
		"update students set `firstname` = ? , `lastname` = ? , `tel` = ? ,`password` = ? where ID = ?",
	tab: `create table if not exists data(
            id int primary key auto_increment,
            role varchar(12) not null
         )`,

	LecturerTable: `create table if not exists Lecturers(id int primary key auto_increment,name varchar(25))`,
	StudentLogin: "SELECT * FROM students WHERE tel = ? ",
	COUNT: "SELECT COUNT(*) as count FROM students",
};
export default QUERIES;
