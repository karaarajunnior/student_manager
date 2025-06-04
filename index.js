import app from "./app.js";

const run = () => {
	app.listen(process.env.port, () => {
		console.log(`server running on port ${process.env.port}`);
	});
};

run();
