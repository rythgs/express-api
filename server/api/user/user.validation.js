import Joi from 'joi';
import commonValidation from '../../components/validation';

export default Object.assign({}, commonValidation, {
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
});
