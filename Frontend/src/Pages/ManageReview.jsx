import { useEffect, useState } from "react";
import ReviewCard from "../Components/ReviewCard";
import UserHeader from "../Components/UserHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageReview = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/review/getMyReview`, { withCredentials:true})
      .then((response) => {
        setReviews(response.data.data);
      },)
      .catch((err) => {
        console.log(err);
        setError("Something went wrong while fetching reviews.");
      });
  }, []);

  const handleDelete = async(id) =>{
    try{
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/review/deleteReview/${id}`, 
        {withCredentials: true}
      );
      setReviews((prev)=>prev.filter((review)=>review._id !== id));
    }catch(err){
      console.log("Error deleting review", err);
      alert("Failed to delete review");
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black min-h-screen text-white">
      <UserHeader />

      <div className="p-8 flex flex-wrap gap-8 justify-center">
        {error && <p className="text-red-500">{error}</p>}

        {reviews.length === 0 && !error ? (
          <p className="text-gray-400">No reviews available.</p>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              title={review.title}
              image={review.image}
              onDelete={()=>handleDelete(review._id)}
              onUpdate={()=>{
                navigate(`/update-review/${review._id}`);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ManageReview;
