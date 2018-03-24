const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Product = require('../models/product');

// well that would be better if you go to Amazon web services then creat S3 then make it public and replace these keys (it's an easy procedure)
const s3 = new aws.S3({
    accessKeyId: 'AKIAJFEMPGDYYWODGSJQ',
    secretAccessKey: 'AkjJWqK+9PJ9F8i8FROt/5xbo/HDQkfb85kgM4/Kc'
})

module.exports = router;