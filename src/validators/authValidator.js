import Joi from "joi";

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    tel: Joi.string().min(10).max(15).required(),
    password: Joi.string().min(6).required(),
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