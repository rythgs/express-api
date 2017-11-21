'use strict';
import express from 'express';
import config from '../config/environment';
import {User} from '../sqldb';
import validate from 'express-validation';
import validation from '../api/user/user.validation';

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/local', validate(validation.login), require('./local').default);

export default router;
