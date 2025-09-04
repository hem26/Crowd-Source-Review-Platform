const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    review:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    comment: {
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;