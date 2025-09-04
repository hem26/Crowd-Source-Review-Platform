const mongoose  = require("mongoose");

const RatingSchema = mongoose.Schema({
    review:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    stars:{
        type:Number,
        min:1,
        max:5,
        required:true
    }
},  {timeStamps: true})

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;