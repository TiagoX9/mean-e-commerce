const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Product = require('../models/product');
const async = require('async');



router.get('/products', (req, res, next) => {
    const perPage = 10;
   const page = req.query.page;
   async.parallel([
       function (callback) {
           Product.count({  }, (err, count) => {
               let totalProducts = count;
               callback(err, totalProducts);
           });
       },
       function (callback) {
           Product.find({  })
               .skip(perPage * page)
               .limit(perPage)
               .populate('category')
               .populate('owner')
               .exec((err, products) => {
                   if (err) return next(err);
                   callback(err, products);
               });
       },
      
   ], function (err, results) {
       let totalProducts = results[0];
       let products = results[1];

       res.json({
           success: true,
           message: 'Successfully found products',
           products: products,
           totalProducts: totalProducts,
           pages: Math.ceil(totalProducts / perPage)
       });
   });
});


router.route('/categories')
 .get((req, res, next) => {
     Category.find({}, (err, category) => {
        res.json({
            success: true,
            message: 'successfully got categories',
            category: category
        })
     })
 })
 .post((req, res, next) => {
     let category = new Category();
     category.name = req.body.category;
     category.save();
     res.json({
         success: true,
         message: 'successfully posted'
     });
 });

 router.get('/categories/:id', (req, res, next) => {
     const perPage = 10;
    const page = req.query.page;
    async.parallel([
        function (callback) {
            Product.count({ category: req.params.id }, (err, count) => {
                let totalProducts = count;
                callback(err, totalProducts);
            });
        },
        function (callback) {
            Product.find({ category: req.params.id })
                .skip(perPage * page)
                .limit(perPage)
                .populate('category')
                .populate('owner')
                .exec((err, products) => {
                    if (err) return next(err);
                    callback(err, products);
                });
        },
        function (callback) {
            Category.findOne({ _id: req.params.id }, (err, category) => {
               callback(err, category)
            });
        }
    ], function (err, results) {
        let totalProducts = results[0];
        let products = results[1];
        let category = results[2];
        res.json({
            success: true,
            message: 'Successfully found categories',
            products: products,
            categoryName: category.name,
            totalProducts: totalProducts,
            pages: Math.ceil(totalProducts / perPage)
        });
    });
 });


 router.get('/product/:id', (req, res, next) => {
     Product.findById({ _id: req.params.id })
        .populate('category')
        .populate('owner')
        .exec((err, product) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Error, product not found'
                });
            } else {
                if (product) {
                    res.json({
                        success: true,
                        message: 'Product successfully found',
                        product: product
                    });
                }
            }
        });
 });

 module.exports = router;

