const { default: mongoose } = require("mongoose");
const Comment = require("../models/Comment");
const Rating = require("../models/Rating");
const Reply = require("../models/Reply");

const Review = require("../models/Review");
const Voting = require("../models/Voting");

exports.postReview = async(req, res, next) =>{
    const { title, description, category } = req.body
    const imagePath = process.env.NODE_ENV === "production" ? req.file?.path : req.file?.filename;
    try{
        const review = await Review({
            title:title,
            description:description,
            image:imagePath,
            category:category,
            user:req.user._id
        })

        const saveReview = await review.save();
        

        res.status(200).json({
            success:true,
            message:"Review created Successfully",
            data:saveReview
        })

    }catch(error){
        console.error("Error in postReview", error.message);
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}



exports.postRatings = async(req, res, next) =>{
    const { user, review, stars} = req.body;

    try{
        const existingRating = await Rating.findOne({user, review})
        if(existingRating){
            return res.status(200).json({
                alreadyRated:true,
                msg:"You have already rated this review",
                data:existingRating
            })
        }
        
        const ratings = new Rating({user, review, stars})

        const saveRatings = await ratings.save();

        res.status(200).json({
            msg:"Rating Submitted Successfully",
            data:saveRatings
        })
    }catch(error){
        console.error("Error submitting rating: ", error);
        res.status(500).json({
            msg:"Internal Server Error",
            error:error.message
        })
    }
}


exports.postUpvote = async(req, res, next) =>{
    const { userId, reviewId } = req.body;

    try{
        const createVote = new Voting({userId, reviewId, type:"upvote"})
        const saveVote = await createVote.save();
        if(saveVote){
            res.status(200).json({
                msg:"Upvote Added",
                
            })
        }

    }catch(error){
        res.status(500).json({
            msg:"Internal Server Errors",
            error:error.message
        })
    }
}

exports.deleteUpvote = async(req, res, next)=>{
    try{
        const { userId, reviewId } = req.body;
        const deleteUpvote = await Voting.deleteOne({userId, reviewId, type:"upvote"})
        if(deleteUpvote){
                res.status(200).json({
                msg:"Your upvote has been delete"
            })
        }
    }catch(error){
        res.status(500).json({
            msg:"Internal Server Error",
            error:error.message
        })
    }
    
}

exports.postDownVote = async(req, res, next)=>{
    try{
        const { userId, reviewId} = req.body;
        const downVote = new Voting({userId, reviewId, type:"downvote"})
        const saveDownVote = await downVote.save();
        if(saveDownVote){
            res.status(200).json({
                msg:"Your downvote has been created"
            })
        }
    }catch(error){
        res.status(500).json({
            msg:"Internal Server",
            error:error.message
        })
    }

}

exports.postComments = async(req, res, next) =>{
    try{
        const { userId, reviewId, comment } = req.body;

        if(!userId || !reviewId || !comment?.trim()){
            return res.status(400).json({msg:"All fields are required"})
        }

        const addComment = new Comment({user:userId, review:reviewId, comment:comment.trim() }) 
        const saveComment = await addComment.save();
        if(saveComment){
            res.status(200).json({
                msg:"Comment Submitted Successfully",
                data:saveComment
            })
        }
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            msg:"Internal Server Error",
            error:error.message
        })
    }
}

exports.postReply = async(req, res, next) =>{
    try{
        const { userId, reviewId, commentId, reply} = req.body;
        if(!userId || !reviewId || !commentId || !reply?.trim()){
            return res.status(400).json({msg:"All fields are required"})
        }

        const addReply = new Reply({userId:userId, reviewId:reviewId, commentId:commentId, reply:reply.trim()})
        const saveReply = await addReply.save();
        if(saveReply){
            res.status(200).json({
                msg:"Reply submitted successful",
                data:saveReply
            })
        }

    }catch(error){
        res.status(500).json({
            msg:"Internal Server Error",
            error:error.message
        })
    }
}

exports.deleteDownVote = async(req, res, next) =>{
    try{
       const { userId, reviewId } =  req.body;
        const deleteVote = await Voting.deleteOne({reviewId, userId, type:"downvote"})
        if(deleteVote){
            res.status(200).json({
                msg:"Your downvote has been deleted"
            })
        }
    }catch(error){
        res.status(500).json({
            msg:"Internal Server Error",
            error:error.message
        })
    }
}

exports.getReview = async(req, res, next) =>{
    try{
        const reviews = await Review.find().sort({createdAt:-1}) // latest first
        res.status(200).json({
            success:true,
            data:reviews
        })
    }catch(error){
        res.status(500).json({
            success:true,
            message:"Failed to Load Message"
        })
    }
}

exports.getMyReviews = async(req, res, next)=>{
    try{
        const reviews = await Review.find({user:req.user._id}).sort({createdAt:-1})
        res.status(200).json({
            success:true,
            data:reviews
        })
    }catch(error){
        res.status(500).json({
            sucess:false,
            message:"Failed to fetch your reviews"
        })
    }
}

exports.getReviewById = async(req, res)=>{
    try{
        const review =await Review.findById(req.params.id).populate("user");
        if(!review){
            return res.status(404).json({
                success:false,
                message:"Review not found"
            });
        }
        res.status(200).json({
            success:true,
            data:review,
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error fetching review"
        })

    }
}

exports.getCommentByReviewId = async(req, res, next) =>{
    try{
        const { reviewId } = req.params;
        const comments = await Comment.find({review: reviewId}).populate("user", "firstName lastName").sort({createdAt:-1});
        if(comments){
            res.status(200).json({
                msg:"Get all comments successful",
                data:comments
            })
        }
    }catch(error){
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}

exports.getReplyById = async(req, res, next) =>{
    try{
        const { commentId } = req.params;
        
        if(!mongoose.Types.ObjectId.isValid(commentId)){
            return res.status(400).json({msg:"Invalid comment ID", data: []})
        }

        const replies = await Reply.find({commentId})
        .populate("userId", "firstName lastName")
        .populate("commentId", "comment")
        .populate("reviewId", "title").sort({createdAt:-1});
        if(replies){
            res.status(200).json({
                msg:"Get all replies quickly for comment ID",
                data:replies
            })
        }else{
            res.status(404).json({
                msg:"Data not found"
            })
        }
    }catch(error){
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }

}


exports.updateReview = async(req, res, next)=>{
    try{
        const reviewId = req.params.id;
        const {title, description, category} = req.body;

        let updateData = {
            title,
            description,
            category
        } 

        if(req.file){
            const imagePath = process.env.NODE_ENV === "production"
            ? req.file.path
            : req.file.filename;
            updateData.image = imagePath   
        }
        
        const update = await Review.findByIdAndUpdate(reviewId, updateData,
            {new:true, runValidators:true}
        );
        if(!update){
            return res.status(404).json({
                success: false,
                message:"Problems of updating the review"
            })
        }
        res.status(200).json({
            success:true,
            message:"Review has been updated "
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

exports.deleteReview = async(req, res, next) =>{
    try{
        const reviewId = req.params.id;
        console.log(reviewId);
        const deleteReviews = await Review.findByIdAndDelete(reviewId) 

        if(!deleteReviews){
            return res.status(404).json({
                success:false,
                message:"Review not found"
            })
        }
        res.status(200).json({
            success:true, 
            message: "Review deleted Successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server error",error
        })
    }
}

