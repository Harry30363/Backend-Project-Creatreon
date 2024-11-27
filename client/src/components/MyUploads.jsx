import React from 'react';
import './MyUploads.css'; // Add styles for the My Uploads page

const MyUploads = ({ uploads }) => {
  return (
    <div className="my-uploads">
      <h3>Your Uploads</h3>
      <ul>
        {uploads.length > 0 ? (
          uploads.map((upload, index) => (
            <li key={index}>
              {upload.type === 'Link' ? (
                <a href={upload.link} target="_blank" rel="noopener noreferrer">
                  {upload.link}
                </a>
              ) : upload.type === 'Image' ? (
                <img
                  src={`http://localhost:8080/uploads/${upload.name}`}
                  alt="Preview"
                  className="upload-preview-image"
                />
              ) : upload.type === 'Video' ? (
                <video
                  src={`http://localhost:8080/uploads/${upload.name}`}
                  controls
                  className="upload-preview-video"
                />
              ) : upload.type === 'Audio' ? (
                <audio
                  src={`http://localhost:8080/uploads/${upload.name}`}
                  controls
                  className="upload-preview-audio"
                />
              ) : (
                <span>{upload.name}</span>
              )}
            </li>
          ))
        ) : (
          <p>No uploads available.</p>
        )}
      </ul>
    </div>
  );
};

export default MyUploads;
