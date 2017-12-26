'use strict';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import { User } from '../sqldb';

var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
      }
      // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
      if (req.query && typeof req.headers.authorization === 'undefined') {
        req.headers.authorization = `Bearer ${req.cookies.token}`;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.find({
        where: {
          _id: req.user._id
        }
      })
        .then(user => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(err => next(err));
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        return next();
      } else {
        return res.status(403).send('Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  return jwt.sign({ _id: id, role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}

export function roleBasedFilter(Model) {
  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      if (!req.user.role) {
        return res.status(403).send('Forbidden');
      }

      switch (req.user.role) {
        case 'admin':
          break;
        case 'data':
          const groupField = getRelateionFieldName(Model, 'Gropus');
          if (groupField) {
            req.query = Object.assign(req.query, {
              filter: [{ [groupField]: req.user.group_id }],
            });
          }
          break;
        case 'user':
        default:
          const userField = getRelateionFieldName(Model, 'Users');
          if (userField) {
            req.query = Object.assign(req.query, {
              filter: [{ [userField]: req.user._id }],
            });
          }
          break;
      }
      return next();
    });
}

function getRelateionFieldName(Model, targetModel) {
  let name = false;
  for (let attr of Model.rawAttributes) {
    if (attr.references && attr.references.model === targetModel) {
      name = attr.fieldName;
      break;
    }
  }

  return name;
}
