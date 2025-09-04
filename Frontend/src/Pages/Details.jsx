import { useParams } from "react-router-dom";
import UserHeader from "../Components/UserHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import DetailCards from "../Components/DetailCards";
import UserListCards from "../Components/UserListCards";
import QuestionList from "../Components/QuestionList";

const Details = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null); // Changed to a single review

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/review/getReviewById/${id}`
        );
        console.log("Fetched Review", data.data);
        setReview(data.data); // Assuming response shape is { data: { ...review } }
      } catch (error) {
        console.error("Error fetching review:", error);
        alert("Internal Server Error");
      }
    };

    fetchReview();
  }, [id]);

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <UserHeader />
      <div className="flex flex-1 overflow-hidden">
        <UserListCards />
        <div className="flex-1 overflow-y-auto">
          {review && (
            <DetailCards
              title={review.title}
              description={review.description}
              image={review.image}
              userId={review.user._id}
              reviewId={review._id}
            />
          )}
        </div>
        <QuestionList />
      </div>
    </div>
  );
};

export default Details;
