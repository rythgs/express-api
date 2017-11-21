const Joi = require('joi');

export default {
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string()
    }
  },
  create: {
    body: {
      name: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string()
    }
  }
};
