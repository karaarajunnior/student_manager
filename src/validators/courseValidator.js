import Joi from "joi";

export const validateCourse = (req, res, next) => {
	const schema = Joi.object({
		id: Joi.number().required(),
		course_unit: Joi.string().min(2).max(50).required(),
		code: Joi.string().min(2).max(20).required(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).json({
			success: false,
			error: error.details[0].message.replace(/"/g, ""),
		});
	}

	next();
};

export const validateEnrollment = (req, res, next) => {
	const schema = Joi.object({
		studentId: Joi.number().required(),
		courseId: Joi.number().required(),
		status: Joi.string().valid("active", "completed", "dropped").optional(),
	});

	const { error } = schema.validate(
		req.params.id ? { ...req.params, ...req.body } : req.body,
	);
	if (error) {
		return res.status(400).json({
			success: false,
			error: error.details[0].message.replace(/"/g, ""),
		});
	}

	next();
};
