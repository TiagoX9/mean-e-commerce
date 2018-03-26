const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Product = require('../models/product');
const async = require('async');

/////////////// testing async ///////////////////

router.get('/test', (req, res, next) => {
    function abc (callback) {
        var firstName = 'Javid';
        callback(null, firstName);
    }

    function xyz (firstName, callback) {
        var lastName = 'Abd';
        console.log(`my firstname is ${firstName} and lastname ${lastName}`);
    }

    async.waterfall([abc, xyz])
})


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
     Product.find({ category: req.params.id })
        .populate('category')
        .exec((err, products) => {
            Product.count({ category: req.params.id }, (err, totalProducts) => {
                res.json({
                    success: true,
                    message: 'category per page',
                    products: products,
                    categoryName: products[0].category.name,
                    totalProducts: totalProducts,
                    pages: Math.ceil(totalProducts / perPage)
                });
            });
        });
 });

 module.exports = router;

