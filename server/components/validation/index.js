import Joi from 'joi';

export default {
  list: {
    query: {
      fields: Joi.array(),
      offset: Joi.number(),
      limit: Joi.number(),
      filter: Joi.array(),
      order: [Joi.string(), Joi.array()]
    }
  },
  create: {},
  update: {},
  delete: {}
};
