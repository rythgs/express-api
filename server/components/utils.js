'use strict';

import _ from 'lodash';

export function createFilter(req) {
  const params = {};

  if (req.query.fields) {
    params.attributes = req.query.fields;
  }

  params.limit = req.query.limit ? req.query.limit : 20;
  params.offset = req.query.offset ? req.query.offset : 0;
  params.where = req.query.filter ? req.query.filter : [];
  params.order = req.query.order ? req.query.order : [];

  console.log(params);

  return params;
}
