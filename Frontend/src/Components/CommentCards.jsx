import { UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";

const CommentCards = ({ userId, reviewId }) => {
  const [displayBtn, setDisplayBtn] = useState(false);
  const [input, setInput] = useState({ comment: "" });
  const [input1, setInput1] = useState({ comment1: "" });
  const [comments, setComments] = useState([]);
  const [displaysubcomment, setDisplaySubcomment] = useState(null);
  const [displayReplyBtn, setDisplayReplyBtn] = useState(null);
  const [openReplies, setOpenReplies] = useState(null);
  const [showAllReplies, setShowAllReplies] = useState({});

  const fetchComments = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/review/getComment/${reviewId}`)
      .then((response) => {
        setComments(response.data.data || []);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchReplies = (commentId) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/review/getReply/${commentId}`)
      .then((response) => {
        console.log(response.data.data);
        setShowAllReplies((prev) => ({
          ...prev,
          [commentId]: response.data.data || []
        }));
      })
      .catch(console.error);
  };

  useEffect(()=>{
    fetchReplies();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.comment.trim()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/review/submitComment`,
        { userId, reviewId, comment: input.comment },
        { withCredentials: true }
      );
      setInput({ comment: "" });
      setDisplayBtn(false);
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment: ", error);
    }
  };

  const handleSubmit1 = async (e, commentId) => {
    e.preventDefault();
    if (!input1.comment1.trim()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/review/submitReply`,
        { userId, reviewId, commentId, reply: input1.comment1 },
        { withCredentials: true }
      );
      setInput1({ comment1: "" });
      setDisplaySubcomment(null);
      fetchReplies(commentId); // refresh replies after posting
    } catch (error) {
      console.error("Error submitting reply: ", error);
    }
  };

  const handleToDisplayReply = (commentId) => {
    console.log(commentId);
    if (openReplies === commentId) {
      setOpenReplies(null); // collapse only
    } else {
      setOpenReplies(commentId);
      fetchReplies(commentId);
    }
  };

  return (
    <div className="w-full p-2 border-gray-600">
      {/* Input + Buttons */}
      <div className="flex items-center gap-3">
        <UserCircleIcon className="h-8 w-8 text-gray-300 flex-shrink-0" />
        <form className="flex-1" onSubmit={handleSubmit}>
          <input
            type="text"
            name="comment"
            value={input.comment}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            placeholder="Write a comment and share your opinion"
            className="w-full px-4 py-2 rounded-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-white placeholder-gray-400"
            onClick={() => setDisplayBtn(true)}
          />
          {displayBtn && (
            <div className="mt-3 flex gap-3">
              <button type="submit" className="border-2 px-4 py-1 rounded-3xl cursor-pointer">
                Ok
              </button>
              <button
                type="button"
                className="border-2 px-4 py-1 rounded-3xl"
                onClick={() => setDisplayBtn(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-white mb-2">
          Comments ({comments.length})
        </h2>
        <div className="space-y-2">
          {comments.map((c) => (
            <div key={c._id} className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              <p className="text-gray-200">{c.user?.firstName} {c.user?.lastName}</p>
              <p className="text-gray-200">{c.comment}</p>
              <p className="cursor-pointer underline" onClick={() => setDisplaySubcomment(c._id)}>Reply</p>
              <p className="cursor-pointer underline" onClick={() => handleToDisplayReply(c._id)}>All Replies</p>

              {displaysubcomment === c._id && (
                <form onSubmit={(e) => handleSubmit1(e, c._id)}>
                  <input
                    type="text"
                    placeholder="Reply it"
                    name="comment1"
                    onChange={(e) => setInput1({ ...input1, [e.target.name]: e.target.value })}
                    value={input1.comment1}
                    className="border-2 rounded-3xl w-full px-4 mt-3"
                    onClick={() => setDisplayReplyBtn(c._id)}
                  />
                  {displayReplyBtn === c._id && (
                    <>
                      <button className="border-2 px-4 py-1 rounded-3xl cursor-pointer mt-2">Ok</button>
                      <button
                        type="button"
                        className="border-2 px-4 py-1 rounded-3xl ml-4"
                        onClick={() => setDisplayReplyBtn(null)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </form>
              )}

              {openReplies === c._id && (
                <div className="ml-6 mt-2 space-y-1">
                  {showAllReplies[c._id]?.length > 0 ? (
                    showAllReplies[c._id].map((r) => (
                      <p key={r._id} className="text-gray-400">
                        {r.userId?.firstName} {r.userId?.lastName}: {r.reply}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No replies yet</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentCards;
