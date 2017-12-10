const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

//register
router.post('/register', function(req, res, next){
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, function(err, user){
    if(err){
      res.json({success: false, msg: 'Failed to register user'});
    }
    else{
      res.json({success: true, msg: 'User registered'})
    }
  });
});

//authenticate
router.post('/authenticate', function(req, res, next){
  const username = req.body.username;
  const password = req.body.password;
  const rememberMe = req.body.rememberMe;

  User.getUserByUsername(username, function(err, user){
    if(err){
      throw err;
    }
    if(!user){
      return res.json({success: false, msg: "Username not found"});
    }
    User.comparePassword(password, user.password, function(err, isMatch){
      if(err){
        throw err;
      }
      if(isMatch){
        let token = null;
        if(rememberMe){
          token = jwt.sign({data: user}, config.secret,{
            expiresIn: 31540000 //1 year
          });
        }
        else{
          token = jwt.sign({data: user}, config.secret,{
            expiresIn: 86400 //24hrs
          });
        }
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      }
      else{
        return res.json({success: false, msg: 'Incorrect password'})
      }
    });
  });
});

//profile
router.get('/profile', passport.authenticate('jwt', {session: false}) , function(req, res, next){
  res.json({user: req.user});
});

module.exports = router;
