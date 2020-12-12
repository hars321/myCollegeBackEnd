
const mongoose=require('mongoose');

const comment=mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    comment_data:String,
    likes:Number
})
const post=mongoose.Schema({
    data:String,
    like_count:Number,
    likes:[mongoose.Schema.Types.ObjectId],
    comment_count:Number,
    comments:[comment]
    
})
const PostSchema=mongoose.Schema({
    user:{
        name:String,
        email:String,
        image:String,
        password:String,
        phone:String
    },
    posts:[post],


});

module.exports=mongoose.model('Schema',PostSchema);