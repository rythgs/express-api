'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';
import validate from 'express-validation';
import validation from './user.validation';

var router = new Router();

router.get('/', auth.hasRole('admin'), validate(validation.list), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), validate(validation.passwordChange), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('admin'), validate(validation.create), controller.create);

module.exports = router;
