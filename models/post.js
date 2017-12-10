const mongoose = require('mongoose');
const config = require('../config/database');

//user schema
const postSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: String, 
        required: true
    }
});

const Post = module.exports = mongoose.model('Post', postSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addPost = function(newPost, callback){
    newPost.save(callback());
}