const mongoose = require("mongoose");

const VotingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    reviewId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
        required:true
    },
    type:{
        type:String,
        enum:["upvote","downvote"],
        required:true
    }
})

const Voting = mongoose.model("Voting", VotingSchema);

module.exports = Voting;