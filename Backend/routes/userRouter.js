const express = require("express");
const { postUserSubmit , postLogin, getCreateAuthenticate, getAuthenticate, logout, getRequireLogin } = require("../controller/authController");
const { requireLogin } = require("../middleware/requiredLogin");
const userRouter = express.Router();

// Working on submitting the form for the post
//Post Signup
userRouter.post("/user/register", postUserSubmit);

// Post Login
userRouter.post("/user/login", postLogin)

userRouter.get("/dashboards", requireLogin, getRequireLogin);


// Code of google client
userRouter.get("/auth/google", getCreateAuthenticate);

userRouter.get("/auth/google/callback", getAuthenticate, (req, res)=>{
    try{
        if(!req.user){
            console.error("Google auth failed: req.user is undefined");
            return res.redirect("http://localhost:5173/login");
        }

        req.session.isLoggedIn = true;
        req.session.user = {
            id: req.user._id.toString(),
            email: req.user.email
        }

        req.session.save((err)=>{
            if(err){
                console.error("Session save error", err);
                return res.redirect("http://localhost:5173/login")
            }
            console.log("Session saved for Google Login:", req.session.user);
            res.redirect("http://localhost:5173/home");
        })

    }catch(error){
        console.error("Google Callback Error", error);
        res.redirect("http://localhost:5173/login");
    }
    
})

userRouter.get("/logout", logout);



module.exports = userRouter;


