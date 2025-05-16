require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        lowercase:true,
        maxLength: 50
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type: String,
        required: true,
        trim:true,
        minLength:6
    }
})

const AddReviewButtonDesignSchema = mongoose.Schema({
    image: {
        type:String,
    },
    title: {
        type: String,
        required: true,
        minLength:3,
    },
    category:{
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
})

const User = mongoose.model("User", UserSchema);
const AddReview = mongoose.model("AddReview", AddReviewButtonDesignSchema);


module.exports = {
    User,
    AddReview
}