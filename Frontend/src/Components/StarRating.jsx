import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const StarRating = ({ userId, reviewId }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [checkRating, setCheckRating] = useState(false);
    const [showCheckRating, setShowCheckRating] = useState("");

    axios.defaults.withCredentials = true;

    const submitRating = async () => {
        if (checkRating) return;

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/review/clickRating`,
                {
                    user: userId,
                    review: reviewId,
                    stars: rating
                }
            );

            // Store backend message
            setShowCheckRating(data.msg);

            // If already rated, lock the stars
            if (data.alreadyRated || data.msg.includes("already")) {
                setCheckRating(true);
            } else {
                // Mark as rated after successful new rating
                setCheckRating(true);
            }

        } catch (error) {
            console.error("Failed to submit ", error);
            alert("Failed to submit rating");
        }
    };

    return (
        <div className="border-2 h-80 rounded-3xl mt-5 flex flex-col items-center">
            <h1 className="text-3xl mt-4">Rate it</h1>

            <div className="flex w-100 h-30">
                {checkRating ? (
                    <h1 className="text-green-600 font-bold text-2xl mt-10 ml-10">
                        {showCheckRating}
                    </h1>
                ) : (
                    [1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                            key={star}
                            className={`h-20 w-20 cursor-pointer transition-all duration-200 
                            ${(hover || rating) >= star ? "fill-yellow-400" : "fill-gray-400"}
                            ${checkRating ? "cursor-not-allowed" : ""}`}
                            onClick={() => !checkRating && setRating(star)}
                            onMouseEnter={() => !checkRating && setHover(star)}
                            onMouseLeave={() => !checkRating && setHover(null)}
                        />
                    ))
                )}
            </div>

            {!checkRating && (
                <button
                    onClick={submitRating}
                    disabled={rating === 0}
                    className="border-2 rounded-2xl w-40 h-10 text-xl hover:bg-white hover:text-black"
                >
                    Rate it
                </button>
            )}
        </div>
    );
};

export default StarRating;
