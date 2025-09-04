const mongoose = require("mongoose");

const ReplySchema = mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reviewId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
        required:true
    },
    commentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        required:true
    },
    reply:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }


})

const Reply = mongoose.model("Reply", ReplySchema);


module.exports = Reply;