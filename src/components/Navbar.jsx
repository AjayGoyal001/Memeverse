import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MemeVerse 🚀
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/explore" className="hover:text-blue-500">Explore</Link>
          <Link to="/upload" className="hover:text-blue-500">Upload</Link>
          <Link to="/leaderboard" className="hover:text-blue-500">Leaderboard</Link>
          <Link to="/profile" className="hover:text-blue-500">Profile</Link>
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="md:hidden flex flex-col items-center gap-4 mt-4"
        >
          <Link to="/explore" onClick={() => setIsOpen(false)}>Explore</Link>
          <Link to="/upload" onClick={() => setIsOpen(false)}>Upload</Link>
          <Link to="/leaderboard" onClick={() => setIsOpen(false)}>Leaderboard</Link>
          <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
