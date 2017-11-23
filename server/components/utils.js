'use strict';

import _ from 'lodash';

export function createFilter(req) {
  const params = {};

  if (!_.isEmpty(req.query.fields)) {
    params.attributes = req.query.fields;
  }

  params.limit = req.query.limit ? req.query.limit : 20;
  params.offset = req.query.offset ? req.query.offset : 0;
  params.where = req.query.filter ? req.query.filter : [];
  params.order = req.query.order ? req.query.order : [];

  console.log(params);

  return params;
}

export function appendRoleDefaultFilter(req, params = {}) {
  if (
    !_.isEmpty(req.user)
    && !_.isEmpty(req.user._id)
    && req.user.role === 'data'
  ) {
    params.where.push({ group_id: req.user.group_id });
  }
}
