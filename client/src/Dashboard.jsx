import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [file, setFile] = useState(null); // Temporary file storage
  const [link, setLink] = useState(''); // Temporary link storage
  const [selectedSection, setSelectedSection] = useState('Uploads'); // Track selected sidebar section

  // Fetch user-specific uploads from the server
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await axios.get('http://localhost:8080/uploads', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUploads(response.data);
      } catch (error) {
        console.error('Error fetching uploads:', error);
      }
    };

    fetchUploads();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setUploadType(null);
    setFile(null);
    setLink('');
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      console.log('Submit button clicked');
      const formData = new FormData();

      if (uploadType === 'Link' && link) {
        formData.append('link', link);
        formData.append('type', 'Link');
        console.log('Submitting link:', link);
      } else if (file) {
        formData.append('file', file);
        formData.append('type', uploadType);
        console.log('Submitting file:', file);
      } else {
        alert('Please upload a file or enter a link.');
        return;
      }

      const token = localStorage.getItem('token'); // Get token for authentication
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response from server:', response.data);
      setUploads([...uploads, response.data]); // Update the state with the new upload
      toggleModal(); // Close modal
    } catch (error) {
      console.error('Error during upload:', error);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div className="Dashboard_dashboard">
      {/* Sidebar */}
      <div className="Dashboard_sidebar">
        <ul>
          <li
            className={selectedSection === 'MyPage' ? 'active' : ''}
            onClick={() => setSelectedSection('MyPage')}
          >
            My Page
          </li>
          <li
            className={selectedSection === 'Uploads' ? 'active' : ''}
            onClick={() => setSelectedSection('Uploads')}
          >
            Uploads
          </li>
          <li
            className={selectedSection === 'Insights' ? 'active' : ''}
            onClick={() => setSelectedSection('Insights')}
          >
            Insights
          </li>
          <li
            className={selectedSection === 'Payouts' ? 'active' : ''}
            onClick={() => setSelectedSection('Payouts')}
          >
            Payouts
          </li>
          <li
            className={selectedSection === 'Community' ? 'active' : ''}
            onClick={() => setSelectedSection('Community')}
          >
            Community
          </li>
          <li
            className={selectedSection === 'Notifications' ? 'active' : ''}
            onClick={() => setSelectedSection('Notifications')}
          >
            Notifications
          </li>
          <li
            className={selectedSection === 'Settings' ? 'active' : ''}
            onClick={() => setSelectedSection('Settings')}
          >
            Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="Dashboard_content">
        <div className="Dashboard_header">
          <div className="Dashboard_profile">
            <div className="Dashboard_profile-pic"></div>
            <div className="Dashboard_profile-info">
              <h2>harry$$</h2>
              <a href="https://patreon.com/harry363">creatreon.com/harry363</a>
              <button onClick={toggleModal} className="Dashboard_create-button">
                Create
              </button>
            </div>
          </div>
        </div>

        {/* Conditionally render content based on the selected sidebar section */}
        {selectedSection === 'Uploads' && (
          <div className="Dashboard_upload-list">
            <h3>Your Uploads</h3>
            {uploads.length > 0 ? (
              <ul>
                {uploads.map((upload, index) => (
                  <li key={index}>
                    {upload.type === 'Link' ? (
                      <a href={upload.link} target="_blank" rel="noopener noreferrer">
                        {upload.link}
                      </a>
                    ) : (
                      <span>{upload.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No uploads yet. Start by creating one!</p>
            )}
          </div>
        )}
        {/* Add content for other sections as needed */}
        {selectedSection !== 'Uploads' && <p>Content for {selectedSection}</p>}

        {/* Modal for uploads */}
        {isModalOpen && (
          <div className="Dashboard_modal">
            <div className="Dashboard_modal-content">
              <h3>Upload {uploadType || 'Type'}</h3>
              <ul>
                <li onClick={() => setUploadType('Video')}>Video</li>
                <li onClick={() => setUploadType('Audio')}>Audio</li>
                <li onClick={() => setUploadType('Image')}>Image</li>
                <li onClick={() => setUploadType('Link')}>Link</li>
              </ul>
              {uploadType && (
                <div className="Dashboard_upload">
                  {uploadType === 'Link' ? (
                    <input
                      type="url"
                      placeholder="Enter the link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      required
                    />
                  ) : (
                    <input
                      type="file"
                      accept={
                        uploadType === 'Video'
                          ? 'video/*'
                          : uploadType === 'Audio'
                          ? 'audio/*'
                          : uploadType === 'Image'
                          ? 'image/*'
                          : '*'
                      }
                      onChange={handleFileChange}
                    />
                  )}
                  <button onClick={handleSubmit} className="Dashboard_submit-button">
                    Submit
                  </button>
                </div>
              )}
              <button onClick={toggleModal} className="Dashboard_close-button">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
