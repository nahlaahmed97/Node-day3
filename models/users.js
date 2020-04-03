const mongoose = require ('mongoose');
const bcrypt= require('bcrypt');
const userschema = new mongoose.Schema({
    firstName:{type: String , required: true , minlength: 5 },
    lastName:{type: String, required: true},
    email:{type: String , required: true,unique: true },
    password: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
})


// hash password before saving to database
userschema.pre('save', function(next)  {
    let user = this;
    bcrypt.hash(user.password, 10, function(error, hash) {
      if (error) {
        return next(error);
      } else {
        user.password = hash;
        next();
      }
    });
  });
const userModel = mongoose.model('User',userschema)

module.exports=userModel;