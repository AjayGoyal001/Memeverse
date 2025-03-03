import { useState } from 'react';
import { motion } from 'framer-motion';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert('Please upload an image first.');
      return;
    }

    setUploading(true);
    
    // Upload to ImgBB (replace with your ImgBB API key)
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        alert('Meme uploaded successfully!');
        setImage(null);
        setCaption('');
        setPreview(null);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading meme:', error);
      alert('Something went wrong. Try again!');
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="container mx-auto max-w-lg bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Upload Your Meme</h1>
        
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4 w-full p-2 border rounded-md dark:border-gray-600" />

        {preview && (
          <motion.img 
            src={preview} 
            alt="Meme Preview" 
            className="w-full rounded-md mb-4" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
          />
        )}

        <textarea 
          placeholder="Add a funny caption..." 
          value={caption} 
          onChange={(e) => setCaption(e.target.value)} 
          className="w-full p-2 border rounded-md dark:border-gray-600 mb-4"
        />

        <button 
          onClick={handleSubmit} 
          disabled={uploading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {uploading ? 'Uploading...' : 'Upload Meme'}
        </button>
      </div>
    </div>
  );
};

export default Upload;
