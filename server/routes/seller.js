const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Product = require('../models/product');
const checkJWT = require('../middlewares/jwt');
// this is only for testing to see we can add more than one products successfully
const faker = require('faker');

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
 .get(checkJWT, (req, res, next) => {
     Product.find({ owner: req.decoded.user._id })
        .populate('owner')
        .populate('category')
        .exec((err, products) => {
            if (products ){
                res.json({
                    success: true,
                    message: 'You successfully received your products',
                    products: products
                });
            }
        });
 })
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


 // only for testing to make sure we can add more products successfulyy
 router.get('/test', (req, res, next) => {
     for (i = 0; i < 15, i++;) {
        let product = new Product();
        product.owner =  '5ab687b1637eeb1dd32958b8';
        product.category = "5ab5f369d48dd32404f54da3";
   
        product.image = faker.image.nightlife();
        product.title = faker.commerce.productMaterial();
        product.description = faker.lorem.words();
        product.price = faker.commerce.price();
   
        product.save();

     }
    
     res.json({
         success: true,
         message: 'added 15 products'
     })
 })

module.exports = router;