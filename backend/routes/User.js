const express = require("express");
const zod = require("zod");
const { User, AddReview } = require("../models/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = express.Router();

const {default: mongoose} = require("mongoose");

const SignUpValidations = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    userName: zod.string().email(),
    password: zod.string()
})

const SignInValidations = zod.object({
    userName: zod.string().email(),
    password: zod.string()
})

const AddReviewValidations = zod.object({
    image: zod.string(),
    title:zod.string(),
    category:zod.string(),
    description:zod.string()
})

router.post("/signup", async(req, res)=>{
    // Check if input is in form of string or not.
    const { success } = SignUpValidations.safeParse(req.body);
    if(!success){
        res.status(411).json({
            msg: "Invalid Inputs"
        })
    }

    // Check if user exists or not..
    const existingUser = await User.findOne({
        userName: req.body.userName
    })

    if(existingUser){
        res.status(411).json({
            msg: "Username is already exists"
        })
    }

    // If not creating user database
    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.status(200).json({
        msg: "User registered successfully",
        token: token
    })
    
})

router.post("/signin", async(req,res)=>{
    const session = await mongoose.startSession();

    const { success } = SignInValidations.safeParse(req.body);
    if(!success){
        res.status(411).json({
            msg:"Invalid Inputs"
        })
    }

    const existingUser = await User.findOne({
        userName: req.body.userName,
        password: req.body.password
    }).session(session)

    if(existingUser){
        const token = jwt.sign({
            userId: existingUser._id
        }, JWT_SECRET)

        res.json({
            token:token
        })
        return;
    }

})


router.post("/addReview", async(req, res)=>{
    const { success } = AddReviewValidations.safeParse(req.body);
    if(!success){
        res.status(411).json({
            msg: "Incorrect Inputs"
        })
    }


    const existingReview = await AddReview.findOne({
        title: req.body.title
    });
    const productId = existingReview._id;
    if(existingReview){
        return res.status(411).json({
            msg: "The Review  has already existed " + productId
        })
    }

    await AddReview.create({
        image: req.body.image,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description  
    })

    res.status(200).json({
        msg: "Review has been added successfully"
    })


})

router.get("/addReview/:id", async(req, res)=>{
    try{
        const getReviewById = await AddReview.findOne(req.params.id)

        if(!getReviewById){
            return res.status(404).json({
                msg:"Not getting review because of error"
            })
        }

        res.status(200).json({
            msg:"Review has been get successfully"
        })
    }catch{
        res.status(500).json({
            msg:"Server error"
        })
    }
})

router.put("/addReview/:id", async(req, res)=>{
    try{
        const updatedReview = await AddReview.findByIdAndUpdate(req.params.id, {
            title:req.body.title,
            category: req.body.category,
            description: req.body.description
        },
            {new: true}
        )
        
        if(!updatedReview){
            res.status(404).json({
                msg: "Review has not been updated"
            })
        }
        res.status(200).json({
            msg:"Review has been updated successfully"
        })


    }catch{
        res.status(500).json({
            msg:"Server error"
        })
    }
    

})

router.delete("/addReview/:id", async(req, res)=>{
    const paramsId = req.params.id;

    try{
        const deleteReview = await findByIdAndDelete(paramsId);

        if(!deleteReview){
            res.status(404).json({
                msg:"Not Deleted Yet"
            })
        }

        res.status(200).json({
            msg:"Review has been deleted"
        })

    }catch{
        res.status(500).json({
            msg:"Server error..."
        })
    }

    
    
})


module.exports = router;