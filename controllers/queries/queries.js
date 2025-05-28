const QUERIES = {
	select: "select * from students",
	byid: "select * from students where ID = ?",
	insert:
		"insert into students (`id`, `firstname`, `lastname`,`tel`) values (?,?,?,?)",
	deleteStudent: "DELETE from students where id = ?",
	update:
		"update students set `firstname` = ? , `lastname` = ? , `tel` = ? where ID = ?",
	tab: `create table if not exists data(
            id int primary key auto_increment,
            role varchar(12) not null
         )`,
};
export default QUERIES;
