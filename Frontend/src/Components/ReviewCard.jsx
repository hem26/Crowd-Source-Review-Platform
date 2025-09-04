import { useLocation, useNavigate } from "react-router-dom";

const ReviewCard = ({ image, title, onDelete, onUpdate, redirectToDetails }) => {

    const navigate = useNavigate();

    const isAbsoluteUrl = image?.startsWith("http");
    const imageUrl = isAbsoluteUrl
        ? image
        : `${import.meta.env.VITE_API_URL}/uploads/${image}`;
    const location = useLocation();
    const isManageReview = location.pathname.includes("manage-review");

    
  return (
    <div className="w-72 h-80 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-indigo-500/40 duration-300">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover border-b border-gray-700"
      />
      <div className="p-4 flex flex-col justify-between h-40">
        <h2 className="text-lg font-semibold text-white line-clamp-2">
          {title}
        </h2>

        {isManageReview ? (
          <div className="mt-auto flex justify-between gap-2">
            <button className="bg-green-700 hover:bg-yellow-600 text-white text-sm py-1 px-3 rounded" onClick={onUpdate}>
              Update
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded" onClick={onDelete}>
              Delete
            </button>
          </div>
        ) : (
          <button className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 px-4 rounded" onClick={redirectToDetails}>
            Read More
          </button>
        )}

        
        
      </div>
    </div>
  );
};

export default ReviewCard;
