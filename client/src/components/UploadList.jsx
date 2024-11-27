import React, { useEffect, useState } from 'react';
import api from '../services/api';

const UploadList = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await api.get('/uploads'); // Fetch user-specific uploads
        setUploads(response.data);
      } catch (error) {
        console.error('Error fetching uploads:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  if (loading) {
    return <p>Loading uploads...</p>;
  }

  return (
    <div className="upload-list">
      <h3>Your Uploads</h3>
      {uploads.length > 0 ? (
        <ul>
          {uploads.map((upload) => (
            <li key={upload.id}>
              {upload.type === 'Link' ? (
                <a href={upload.link} target="_blank" rel="noopener noreferrer">
                  {upload.link}
                </a>
              ) : (
                <span>{upload.name}</span> // Display file name
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No uploads yet. Start by uploading a file or link!</p>
      )}
    </div>
  );
};

export default UploadList;
