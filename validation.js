const joi = require('@hapi/joi')

const registerValidation = (data) => {
	const schema = joi.object({
		first_name: joi.string().min(4).max(255).required(),
		last_name: joi.string().min(4).max(255).required(),
		email: joi.string().email().required(),
		password: joi.string().min(8).required(),
	})
	return schema.validate(data)
}

const loginValidation = (data) => {
	const schema = joi.object({
		email: joi.string().email().required(),
		password: joi.string().min(8).required(),
	})
	return schema.validate(data)
}

module.exports.loginValidation = loginValidation
module.exports.registerValidation = registerValidation
