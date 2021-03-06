const express = require("express");
const jwt = require('jsonwebtoken');
const checkJWT = require('../middlewares/jwt');
const config = require("../config/config");
const User = require("../models/user");

const router = express.Router();

router.post('/signup', (req, res, next) => {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.photo = user.jAvatar();
  user.isSeller = req.body.isSeller;

  User.findOne({ email: req.body.email }, (err, addedUser) => {
    if (addedUser) {
      res.json({
        success: false,
        message: "Sorry, Email has been taken, try another one."
      });
    } else if (err) {
      console.log(`error happened: ${err}`);
    } else {
      user.save();

      const token = jwt.sign({ user: user }, config.secret, { expiresIn: "7d" });
      res.json({
        success: true,
        message: "Token works",
        token: token
      });
    }
  });
});


router.post('/login', (req, res) => {

    User.findOne( { email: req.body.email }, (err, user) => {
        if (err) console.log(`error happenned again : ${err}`);

        if (!user) {
            res.json({
                success: false,
                message: 'User againnnnnnnnnnnnn not found, try again.'
            });
        } else if (user)  {
            const validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'wrong password, try again.'
                });
            } else {
                const token = jwt.sign( { user: user }, config.secret, { expiresIn: '7d' });
                res.json({
                    success: true,
                    message: 'Token works, succesfully login',
                    token: token
                });
            };
        }
    });
});

// this is easy way and much cleaner to combine post() and get() under route

router.route('/profile')
.get(checkJWT, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
        res.json({
            success: true,
            user: user,
            message: 'Successfull'
        });
    });
}) 
.post(checkJWT, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
        if (err) return next(err);

        if (req.body.name) { user.name = req.body.name };
        req.body.email ? user.email = req.body.email : null;
        if (req.body.password) user.password = req.body.password;
        user.isSeller = req.body.isSeller;

        user.save()
        res.json({
            success: true,
            message: 'Successfully edited'
        })

    })
});

router.route('/address')
.get(checkJWT, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
        res.json({
            success: true,
            address: user.address,
            message: 'Succesfull'
        });
    });
})
.post(checkJWT, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
        if (err) return next(err);

        if (req.body.adrs1) user.address.adrs1 = req.body.adrs1;
        if (req.body.adrs2) user.address.adrs2 = req.body.adrs2;
        if (req.body.street) user.address.street = req.body.street;
        if (req.body.city) user.address.city = req.body.city;
        if (req.body.state) user.address.state = req.body.state;
        if (req.body.country) user.address.country = req.body.country;
        if (req.body.postalCode) user.address.postalCode = req.body.postalCode;

        user.save();
        res.json({
            success: true,
            message: 'changed the address information'
        })
    })
})


module.exports = router;
