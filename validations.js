const Joi = require('@hapi/joi')

//Registration
const regValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    pass: Joi.string().min(6).required(),
    name: Joi.string().min(6).required(),
    conpass: Joi.ref('pass')
  })
  return schema.validate(data)
}

//Login
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    pass: Joi.string().min(6).required(),
    nurl: Joi.string()
  })
  return schema.validate(data)
}

module.exports.regValidation = regValidation
module.exports.loginValidation = loginValidation