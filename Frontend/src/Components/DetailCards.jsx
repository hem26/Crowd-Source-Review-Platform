import CommentCards from "./CommentCards";
import StarRating from "./StarRating";
import Voting from "./Voting";

const DetailCards = ({ title, description, image, userId, reviewId }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const imageUrl = image?.startsWith("http")
    ? image
    : `${baseUrl}/uploads/${image}`;

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-gray-900 via-gray-700 to-gray-700 text-white shadow-md flex flex-col">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="rounded-lg shadow-md p-4 sm:p-6">
          {/* Title */}
          <h2 className="text-lg sm:text-2xl font-bold mb-2 break-words">
            {title}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base mb-4 break-words">{description}</p>

          {/* Image */}
          {image && (
            <div className="w-full flex justify-center">
              <img
                src={imageUrl}
                alt={title}
                className="w-full sm:w-auto max-h-64 sm:max-h-96 object-contain rounded border border-gray-300"
              />
            </div>
          )}
        </div>
      </div>

      {/* Fixed bottom section */}
      <div className=" p-4 flex flex-col gap-4">
        <StarRating userId={userId} reviewId={reviewId} />
        <Voting userId={userId} reviewId={reviewId} />
        <CommentCards userId={userId} reviewId={reviewId}></CommentCards>
      </div>
    </div>
  );
};

export default DetailCards;
