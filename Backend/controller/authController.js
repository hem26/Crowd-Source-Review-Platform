const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const passport = require("passport");

exports.postUserSubmit = [
    check("firstName")
        .trim()
        .isLength({min:2}),
        
    check("lastName")
    .trim()
    .isLength({min:2}),
        
    check("email")
    .trim(),


    check("confirmPassword")
    .trim()
    .custom((value, {req})=>{

    if(value !=req.body.password){
        throw new Error("Passwords do not match")
        }
        return true;
    }),

    check("terms")
    .notEmpty()
    .custom((value, {req})=>{
        if(value != "on"){
            throw new Error("Please accept the terms and conditions");
        }
        return true;
    })
    
    , async(req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors);
            return res.status(422).json({errors:errors.array()})
        }

       try{
        
        const {firstName, lastName, email, password} = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ msg: "User already exists with this email" });
        }

        bcrypt.hash(password, 12).then(async hashedPassword=>{
            const user = new User({
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:hashedPassword,
            })

            await user.save();
            console.log(firstName, lastName, email, hashedPassword);
            res.status(200).json({
                msg:"Post Submitted Successfully"
            })
        })
    }catch(error){
        console.log("Error while submitting the information:", error);

        res.status(411).json({
            msg:"Internal errors has occured while submitting"
        })
    }
}]

exports.postLogin = async(req, res, next) =>{
    try{
        const {email, password} = req.body;

        // Check if user exists - 
        

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                isLoggedIn:false,
                msg:"Invalid Email"
            })
        }
        
        if(!user.password || typeof user.password != "string"){
            return res.status(422).json({

                msg:"User has no valid password set"
            })
        }

        try{
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(422).json({
                    isLoggedIn:false,
                    msg:"Wrong Password"
                })
            }

            req.session.isLoggedIn = true;
            req.session.user = {
                id:user._id,
                email:user.email
            }

            req.session.save(err=>{
                if(err){
                    console.log("Session save error", err);
                    return res.status(500).json({
                        isLoggedIn:false,
                        msg:"Session Error"
                    });
                }
            })

            console.log(req.session.user);
            res.status(200).json({
                isLoggedIn:true,
                msg:"Login Successful"
            })

        }catch(error){
            console.log("bcrypt error", error, "user.password", user.password);
            return res.status(422).json({
                isLoggedIn:false,
                msg:"Password to compare"
            })
        }
        
    }
    catch(error){
        res.status(500).json({
            isLoggedIn:false,
            msg:"Internal Server Error"
        })
    }
}

exports.getRequireLogin = async(req, res)=>{
    try{
        const userId = req.session.user?.id;
        if(!userId){
            return res.status(401).json({ msg: "Unauthorized"});
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({msg:"User not found"})
        }
        console.log(user);
        res.status(200).json({
            msg:user.email,
            user:req.session.user
        })
    }catch(error){
        res.status(500).json({msg:"Internal server error"});
    }
    
}

exports.getCreateAuthenticate = passport.authenticate("google",{scope: ["profile", "email"]});


exports.getAuthenticate = passport.authenticate("google",{
    failureRedirect:"http://localhost:5173/login",
    session:true
})



exports.logout = (req, res)=>{
    req.logout(err=>{
        if(err){
            return res.status(500).json({
                msg:"Logout Failed"
            })
        }
        req.session.destroy(err=>{
            if(err) return res.status(500).json({
                msg:"Session destruction failed"
            })

            res.clearCookie("connect.sid",{
                path:"/",
                httpOnly:true,
                secure:false,
                sameSite:"lax"
            });
            return res.json({msg:"Logged Out Successfully"})
        })
    })
}

