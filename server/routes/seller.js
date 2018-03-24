const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Product = require('../models/product');
const checkJWT = require('../middlewares/jwt');

// well that would be better if you go to Amazon web services then creat S3 then make it public and replace these keys (it's an easy procedure)
const s3 = new aws.S3({
    accessKeyId: 'AKIAJFEMPGDYYWODGSJQ',
    secretAccessKey: 'AkjJWqK+9PJ9F8i8FROt/5xbo/HDQkfb85kgM4/K'
})


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'mean-commerce',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
          }
    })
});


router.route('/products')
 .get()
 .post([checkJWT, upload.single('product_image')], (req, res, next) => {
     let product = new Product();
     product.category = req.body.categoryId;
     product.owner = req.decoded.user._id;
     product.title = req.body.title;
     product.description = req.body.description;
     product.image = req.file.location;
     product.price = req.body.price;
     product.save();
     res.json({
         success: true,
         message: 'Successfully posted your product',

     });
 });

module.exports = router;