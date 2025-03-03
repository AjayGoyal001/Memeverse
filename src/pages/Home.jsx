import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { theme } = useTheme();
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => {
        setMemes(data.data.memes.slice(0, 10)); // Fetch top 10 trending memes
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching memes:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto py-10 px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-6"
        >
          Welcome to MemeVerse 🚀
        </motion.h1>
        <p className="text-lg mb-6">Explore, Upload, and Enjoy Memes!</p>
        <Link to="/explore" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Explore Memes
        </Link>

        <h2 className="text-2xl font-semibold mt-10 mb-4">🔥 Trending Memes</h2>

        {loading ? (
          <p>Loading memes...</p>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {memes.map((meme) => (
              <motion.div 
                key={meme.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <Link to={`/meme/${meme.id}`}>
                  <img src={meme.url} alt={meme.name} className="w-full h-48 object-cover rounded-md" />
                </Link>
                <p className="mt-2 font-semibold">{meme.name}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
