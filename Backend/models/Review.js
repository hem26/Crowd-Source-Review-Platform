const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String
    },

    category:{
        type:String,
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

})

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;