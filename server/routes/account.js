const express = require("express");
const jwt = require("jsonwebtoken");
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

      const token = jwt.sign({ user: user }, config.secret, {
        expiresIn: "7d"
      });
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
            // problem is in here
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
                    message: 'Token works , succesfully login',
                    token: token
                });
            };
        }
    });
});

module.exports = router;