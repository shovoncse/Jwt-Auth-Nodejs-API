const Joi = require('@hapi/joi');

const schema = {
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),

}

const {error} = (reqBody) => Joi.validate(reqBody, schema);

module.exports = error;