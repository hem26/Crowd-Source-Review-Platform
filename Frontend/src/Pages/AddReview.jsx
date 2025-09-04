import axios from "axios";
import { useState } from "react";
import UserHeader from "../Components/UserHeader";

const MAX_WORDS = 300;

const AddReview = () => {
  const [wordCount, setWordCount] = useState(0);
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: null,
    category: ""
  });
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      const words = value.trim().split(/\s+/);
      const newWordCount = value.trim() === "" ? 0 : words.length;
      if (newWordCount > MAX_WORDS) return;
      setWordCount(newWordCount);
    }

    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput((prev) => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.image) {
      alert("Please upload an image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("image", input.image);
    formData.append("category", input.category);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/review/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Response from server:", response.data);

      if (response.data?.success || response.status === 200) {
        alert("✅ Review Submitted Successfully");
        setTimeout(() => {
            alert("Request is taking too long. Please try again.");
        }, 10000);
      } else {
        alert("⚠️ Unexpected response from server. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error submitting review:", error);
      alert("❌ Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen">
      <UserHeader />
      <div className="w-full flex flex-col items-center">
        <h1 className="text-white mt-8 text-center text-4xl font-bold">
          Create your Review
        </h1>

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
          <p className="text-sm text-gray-300">
            Words: {wordCount}/{MAX_WORDS}
          </p>

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
            <option value="" disabled>
              Select Category
            </option>
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
            {loading ? "Submitting..." : "Create Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
