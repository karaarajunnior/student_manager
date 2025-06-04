import express from "express";
import joi from "joi";

const studentValidation = (req, res) => {
	const studentSchema = joi.object({
		id: joi.number(),
		firstname: joi.string().required(),
		lastname: joi.string().required(),
		tel: joi.string().min(10).max(12),
		password: joi.string().min(6).required,
	});
	const { error } = studentSchema.validate(req.body);

	error ? res.json({ message: "invalid credentials", error }) : null;
};
