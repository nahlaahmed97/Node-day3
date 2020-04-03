const express = require ('express');
const mongoose = require ('mongoose'); 
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')


const PORT = process.env.PORT || 5000;
const app = express();
mongoose.connect('mongodb://localhost:27017/blogSystem',{
 
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{if(!err) console.log('started connection')
    else console.log(err)   
})
app.use(express.json());
app.use(function log ( req , res , next ) {
    console.log(new Date(), req.method , req.url );
    // next('error while logging')
    next()
   
})
app.use('/users',userRouter)
app.use('/posts',postRouter)

// app.use((err,req,res,next) =>{
//     console.error(err)
//     res.status(500).send('Something broke!')  
// })
app.listen(PORT,(err)=>{
    if (!err) console.log('started')
})