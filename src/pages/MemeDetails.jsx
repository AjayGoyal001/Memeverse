import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(() => {
    return JSON.parse(localStorage.getItem(`likes-${id}`)) || 0;
  });
  const [comments, setComments] = useState(() => {
    return JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
  });
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => {
        const foundMeme = data.data.memes.find((m) => m.id === id);
        setMeme(foundMeme);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching meme:', error));
  }, [id]);

  const handleLike = () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    localStorage.setItem(`likes-${id}`, JSON.stringify(updatedLikes));
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="container mx-auto max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {loading ? (
          <p className="text-center">Loading meme...</p>
        ) : meme ? (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-center mb-4"
            >
              {meme.name}
            </motion.h1>
            <img src={meme.url} alt={meme.name} className="w-full rounded-md mb-4" />

            {/* Like & Share */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleLike}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                👍 {likes} Likes
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                🔗 Share
              </button>
            </div>

            {/* Comments Section */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Comments</h2>
              <div className="mb-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                />
                <button
                  onClick={handleAddComment}
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition w-full"
                >
                  Add Comment
                </button>
              </div>
              {comments.length > 0 ? (
                <ul className="space-y-2">
                  {comments.map((comment, index) => (
                    <li key={index} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md">
                      {comment}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No comments yet. Be the first to comment!</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center">Meme not found.</p>
        )}
      </div>
    </div>
  );
};

export default MemeDetails;
