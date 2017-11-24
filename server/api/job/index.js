'use strict';

var express = require('express');
var controller = require('./job.controller');

var router = express.Router();

import path from 'path';
import multer from 'multer';

const upload = multer({
  dest: './uploads',
  fileFilter(req, file, callback) {
    const filetypes = /zip/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return callback(null, true);
    }
    return callback(null, false);
  }
});

router.post('/upload', upload.single('thumbnail'), controller.upload);

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
