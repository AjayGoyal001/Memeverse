import { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState([]);

  useEffect(() => {
    // Simulating fetching top liked memes from local storage
    const storedMemes = JSON.parse(localStorage.getItem('likedMemes')) || [];
    
    // Sorting memes by likes (assuming each meme has { id, url, likes })
    const sortedMemes = storedMemes.sort((a, b) => b.likes - a.likes).slice(0, 10);
    setTopMemes(sortedMemes);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Leaderboard 🏆</h1>

        {topMemes.length > 0 ? (
          <ul className="space-y-4">
            {topMemes.map((meme, index) => (
              <li key={meme.id} className="flex items-center space-x-4 bg-gray-200 dark:bg-gray-700 p-4 rounded-md">
                <span className="text-xl font-bold">{index + 1}.</span>
                <img src={meme.url} alt={`Meme ${index + 1}`} className="w-16 h-16 object-cover rounded-md" />
                <span className="text-lg font-semibold">{meme.likes} Likes</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No memes ranked yet. Start liking memes to see them here!</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
