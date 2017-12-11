const express = require('express');
const router = express.Router();
const config = require('../config/database');

const Post = require('../models/post');

router.post('/post', function(req, res, next){
  let newPost = new Post({
    name: req.body.name,
    id: req.body.id,
    content: req.body.content,
    time: req.body.time
  });

  Post.addPost(newPost, function(err, user){
    if(err){
      res.json({success: false, msg: 'Failed save post'});
    }
    else{
      res.json({success: true, msg: 'Post saved'})
    }
  });
});

module.exports = router;
