import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";
const Voting = ({reviewId, userId}) => {
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);

  const clickUpvote = async() => {
    if(!upvote){
      setUpvote(true);
      setDownvote(false);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/review/clickUpvote`, {reviewId, userId})
    }else{
      setUpvote(false);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/review/deleteUpvote`, {reviewId, userId} )
    }
  };

  const clickDownvote = async() => {
    if(!downvote){
      setDownvote(true);
      setUpvote(false);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/review/clickDownVote`, {reviewId, userId})
    }else{
      setDownvote(false);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/review/deleteDownVote`, {reviewId, userId})
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-evenly mt-10 h-20 rounded-2xl">
      <div
        className={`flex flex-row gap-5 h-10 border-2 w-full mt-4 ${
          upvote ? "bg-gray-900 text-white border-gray-900 cursor-pointer" : ""
        }`}
        onClick={clickUpvote}
      >
        <HandThumbUpIcon
          className={`ml-20 ${upvote ? "fill-yellow-300" : ""}`}
        />
        <h1 className="text-2xl cursor-pointer">Upvote</h1>
      </div>
      
      <div
        className={`flex flex-row gap-5 h-10 border-2 w-full mt-4 ${
          downvote
            ? "bg-gray-900 text-white border-gray-900 cursor-pointer"
            : ""
        }`}
        onClick={clickDownvote}
      >
        <HandThumbDownIcon
          className={`ml-15 ${downvote ? "fill-yellow-300" : ""}`}
        />
        <h1 className="text-2xl cursor-pointer">Downvote</h1>
      </div>
    </div>
  );
};

export default Voting;
