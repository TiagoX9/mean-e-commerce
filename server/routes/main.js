const express = require('express');
const router = express.Router();
const Category = require('../models/account');

router.route('/categories')
 .get()
 .post((req, res, next) => {
    let category = new Category();
    category.name = req.body.category;
    category.save();
    res.json({
        success: true,
        message: 'successful'
    });
 });

 module.exports = router;