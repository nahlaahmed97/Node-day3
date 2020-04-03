const express = require('express')
const UserModel= require('../models/users')
const router = express.Router();
const bcrypt= require('bcrypt');
SALT_WORK_FACTOR=10;



router.get('/:id/posts',function(req , res){
    UserModel.findById(req.params.id).populate('posts').exec((err,posts)=>{
      if (err) return res.send(err);
        res.json(posts);
    })
})






router.get('/',(req,res)=>{
    UserModel.find({},(err,users)=>{
        if (err) return res.send(err);
        res.json(users)
    })
  
})



router.get('/:id',(req,res)=>
{
    UserModel.findById(req.params.id, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
    });
});

router.post('/',(req,res)=>{
    const { body : {firstName,lastName,email,password,posts} } = req
    const user = new UserModel({
        firstName,
        lastName,
        email,
        password,
        posts


    })
     console.log(user)
    user.save((err, user) => {
        if (err) return res.send(err);
        res.json(user);
        
    })
})

router.patch('/:id' , (req,res)=>{
   
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
    
        // hash the password using our new salt
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) return err;
    
            // override the cleartext password with the hashed one
            req.body.password = hash;
        
     
    UserModel.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
    }); });
});
});


router.delete("/:id", function(req, res) {
    UserModel.findByIdAndDelete(req.params.id, req.body, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
    });
});

module.exports = router;