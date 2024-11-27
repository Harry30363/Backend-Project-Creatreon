import React, { useState } from 'react';
import api from '../services/api';

const UploadForm = () => {
  const [type, setType] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('type', type);
    if (type === 'Link') {
      formData.append('link', link);
    } else {
      formData.append('file', file);
    }

    try {
      await api.post('/upload', formData);
      alert('Upload successful!');
    } catch (error) {
      console.error('Error uploading:', error.message);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="">Select Type</option>
        <option value="Link">Link</option>
        <option value="File">File</option>
      </select>
      {type === 'Link' && <input type="text" placeholder="Enter Link" onChange={(e) => setLink(e.target.value)} />}
      {type === 'File' && <input type="file" onChange={(e) => setFile(e.target.files[0])} />}
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
