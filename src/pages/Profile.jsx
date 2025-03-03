import { useEffect, useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Meme Lover',
    bio: 'I love memes! 😂',
    profilePic: 'https://via.placeholder.com/150',
  });

  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);

  useEffect(() => {
    // Load liked memes from local storage
    const storedLikes = JSON.parse(localStorage.getItem('likedMemes')) || [];
    setLikedMemes(storedLikes);

    // Load user-uploaded memes from local storage (or API later)
    const storedUploads = JSON.parse(localStorage.getItem('uploadedMemes')) || [];
    setUploadedMemes(storedUploads);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Profile Info */}
        <div className="flex items-center space-x-4">
          <img src={profile.profilePic} alt="Profile" className="w-20 h-20 rounded-full" />
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">{profile.bio}</p>
          </div>
        </div>

        {/* Uploaded Memes */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Your Uploaded Memes</h2>
          {uploadedMemes.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {uploadedMemes.map((meme, index) => (
                <img key={index} src={meme.url} alt="Uploaded Meme" className="w-full h-40 object-cover rounded-md" />
              ))}
            </div>
          ) : (
            <p>No memes uploaded yet.</p>
          )}
        </div>

        {/* Liked Memes */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Liked Memes</h2>
          {likedMemes.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {likedMemes.map((meme, index) => (
                <img key={index} src={meme.url} alt="Liked Meme" className="w-full h-40 object-cover rounded-md" />
              ))}
            </div>
          ) : (
            <p>You haven't liked any memes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
