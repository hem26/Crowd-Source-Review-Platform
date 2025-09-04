import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../Components/ReviewCard";
import UserHeader from "../Components/UserHeader";
const UserDashboard = () =>{
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [errors, setErrors] = useState(null);
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/review/getReview`).then(response=>{
            setReviews(response.data.data)
        }).catch(error=>{
            setReviews(error);
        })
    }, [])

    
    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black min-h-screen text-white">
           <UserHeader></UserHeader> 
           {reviews.length === 0 && !errors ? (
          <p className="text-gray-400">No reviews available.</p>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              title={review.title}
              image={review.image}
              redirectToDetails={()=>{ navigate(`/details-page/${review._id}`)}}
            />
          ))
        )}
        </div>
    )
}

export default UserDashboard;