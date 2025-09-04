import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserHeader from "../Components/UserHeader";

const MAX_WORDS = 300;

const UpdateReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    category: ""
  });

  const [wordCount, setWordCount] = useState(0);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      console.warn("ID is missing in params");
      setError("Invalid review ID.");
      return;
    }

    const fetchReview = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/review/getReviewById/${id}`);

        const review = data.data;

        if (!review || !review.description) {
          throw new Error("Invalid response from server");
        }

        setInput({
          title: review.title || "",
          description: review.description || "",
          category: review.category || ""
        });

        setWordCount(review.description.trim().split(/\s+/).length || 0);
      } catch (err) {
        console.error("Error fetching review:", err);
        setError("Failed to load review. Please try again.");
      }
    };

    fetchReview();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === "description") {
      const words = value.trim().split(/\s+/).filter(Boolean).length;
      setWordCount(words);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (wordCount > MAX_WORDS) {
      alert("Description exceeds 300 words.");
      return;
    }

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("category", input.category);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      setError("");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/review/updateReview/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      navigate("/home");
    } catch (err) {
      console.error("Update Failed:", err);
      setError("Failed to update review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen">
      <UserHeader />
      <div className="w-full flex flex-col items-center">
        <h1 className="text-white mt-8 text-center text-4xl font-bold">Update Review</h1>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="border-blue-700 shadow-[0_0_20px_#22d3ee] flex flex-col w-[90%] md:w-[60%] mt-10 p-8 rounded-3xl gap-4"
        >
          {/* Title */}
          <label className="text-white text-xl">Title</label>
          <input
            type="text"
            name="title"
            value={input.title}
            placeholder="Enter the title"
            className="border-2 text-white p-2 rounded-xl bg-transparent"
            onChange={handleChange}
            required
          />

          {/* Description */}
          <label className="text-white text-xl">Description</label>
          <textarea
            name="description"
            value={input.description}
            placeholder="Write your review..."
            className="border-2 text-white p-2 rounded-xl bg-transparent"
            rows="6"
            onChange={handleChange}
            required
          />
          <p className="text-sm text-gray-300">Words: {wordCount}/{MAX_WORDS}</p>

          {/* Image */}
          <label className="text-white text-xl">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="border-2 text-white rounded-xl bg-transparent"
            onChange={handleImageChange}
          />

          {/* Category */}
          <label className="text-white text-xl">Category</label>
          <select
            name="category"
            value={input.category}
            onChange={handleChange}
            required
            className="border-2 text-white p-2 rounded-xl bg-transparent"
          >
            <option value="" disabled>Select Category</option>
            <option value="food">Food</option>
            <option value="movie">Movies</option>
            <option value="hotel-booking">Hotel</option>
            <option value="books">Books and Literature</option>
            <option value="courses">Courses and Colleges</option>
            <option value="other">Other</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`border-2 w-40 h-10 self-center border-white text-white transition rounded-3xl mt-4 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-transparent hover:bg-white hover:text-black"
            }`}
          >
            {loading ? "Submitting..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateReview;
