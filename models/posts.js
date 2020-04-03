const mongoose = require('mongoose'); 
const UserModel  = require('./users')
const postSchema = new mongoose.Schema({
    title: { type: String, required: true},
    content:{type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref:'User',required: true }
})

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;