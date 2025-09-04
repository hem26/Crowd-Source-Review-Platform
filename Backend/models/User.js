const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:[true, "First name is required"]
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        unique:[true, "Email is Required"],
        required:true,
    },
    password:{ // Local Login
        type:String,
        required: function(){
            // Only required if Not a Google or Facebook Login
            return !this.googleId 
        }
    },
    
    // OAuth fields 
    googleId:String,

})




const User = mongoose.model("User", UserSchema);

module.exports = User;