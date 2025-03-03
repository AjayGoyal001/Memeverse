import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import debounce from 'lodash.debounce';

const Explore = () => {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('likes');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMemes = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.imgflip.com/get_memes');
      const data = await response.json();
      setMemes(data.data.memes);
      setFilteredMemes(data.data.memes);
    } catch (error) {
      console.error('Error fetching memes:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      const filtered = memes.filter((meme) =>
        meme.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMemes(filtered);
    }, 300),
    [memes]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // Sorting function
  const handleSort = (option) => {
    setSortOption(option);
    let sortedMemes = [...filteredMemes];
    if (option === 'likes') sortedMemes.sort((a, b) => b.box_count - a.box_count);
    if (option === 'date') sortedMemes.reverse(); // Assuming API doesn't provide date
    setFilteredMemes(sortedMemes);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Explore Memes 🔥</h1>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search memes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full md:w-1/3 border rounded-md dark:bg-gray-800 dark:border-gray-600"
          />
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="likes">Most Popular</option>
            <option value="date">Newest</option>
          </select>
        </div>

        {/* Meme Grid */}
        {loading ? (
          <p className="text-center">Loading memes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMemes.slice(0, page * 10).map((meme) => (
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
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-6">
          {page * 10 < filteredMemes.length && (
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
