const express = require('express');
const router = express.Router();

//register
router.get('/register', function(req, res, next){
  res.send('REGISTER');
});

//authenticate
router.get('/authenticate', function(req, res, next){
  res.send('AUTHENTICATE');
});

//profile
router.get('/profile', function(req, res, next){
  res.send('PROFILE');
});

//validate
router.get('/validate', function(req, res, next){
  res.send('VALIDATE');
});

module.exports = router;
