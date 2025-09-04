const express = require("express");
const { postReview, getReview, deleteReview, updateReview, getReviewById, getMyReviews, postRatings, postUpvote, deleteUpvote, postDownVote, deleteDownVote, postComments, getCommentByReviewId, postReply, getReplyById } = require("../controller/reviewController");
const upload = require("../middleware/upload");
const { requireLogin } = require("../middleware/requiredLogin");
const reviewRouter = express.Router();



reviewRouter.post("/create", requireLogin, upload.single("image"), postReview);
reviewRouter.post("/clickRating", postRatings);
reviewRouter.post("/clickUpvote", postUpvote);
reviewRouter.post("/clickDownVote", postDownVote);
reviewRouter.post("/submitComment", postComments)
reviewRouter.post("/submitReply", postReply);


reviewRouter.get("/getReview", getReview);
reviewRouter.get("/getMyReview", requireLogin, getMyReviews);
reviewRouter.get("/getReviewById/:id", getReviewById);
reviewRouter.get("/getComment/:reviewId", getCommentByReviewId);
reviewRouter.get("/getReply/:commentId", getReplyById);

reviewRouter.put("/updateReview/:id", upload.single("image"), updateReview);
reviewRouter.delete("/deleteReview/:id", deleteReview);
reviewRouter.post("/deleteUpvote",deleteUpvote);
reviewRouter.post("/deleteDownVote", deleteDownVote);

module.exports = reviewRouter;