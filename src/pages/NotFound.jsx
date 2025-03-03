import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Oops! Looks like you took a wrong turn. 🤦‍♂️</p>
      <img 
        src="https://media.giphy.com/media/3o7aCTfyhYawdOXcFW/giphy.gif" 
        alt="Confused Meme" 
        className="w-80 rounded-md shadow-lg mb-6"
      />
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Go Back Home 🏠
      </Link>
    </div>
  );
};

export default NotFound;
