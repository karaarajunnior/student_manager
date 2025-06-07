import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		const error = new Error("Authentication required");
		error.statusCode = 401;
		return next(error);
	}

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
		req.user = decoded;
		next();
	} catch (err) {
		err.statusCode = 401;
		err.message = "Invalid or expired token";
		next(err);
	}
};

export const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			const error = new Error(
				`Role ${req.user.role} is not authorized to access this resource`,
			);
			error.statusCode = 403;
			return next(error);
		}
		next();
	};
};
