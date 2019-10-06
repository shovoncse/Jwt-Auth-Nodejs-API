const Joi = require('@hapi/joi');



const registerValidation = (data) => {

  const regSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  
  })

 return  regSchema.validate(data);

};

const loginValidation = (data) => {

  const loginSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  
  })

 return  loginSchema.validate(data);

};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;