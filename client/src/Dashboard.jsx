// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import axios from 'axios';

// const Dashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [uploadType, setUploadType] = useState(null);
//   const [uploads, setUploads] = useState([]);
//   const [file, setFile] = useState(null); // Temporary file storage
//   const [link, setLink] = useState(''); // Temporary link storage
//   const [selectedSection, setSelectedSection] = useState('Uploads'); // Track selected sidebar section

//   // Fetch user-specific uploads from the server
//   useEffect(() => {
//     const fetchUploads = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Get token from local storage
//         const response = await axios.get('http://localhost:8080/uploads', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUploads(response.data);
//       } catch (error) {
//         console.error('Error fetching uploads:', error);
//       }
//     };

//     fetchUploads();
//   }, []);

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//     setUploadType(null);
//     setFile(null);
//     setLink('');
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     try {
//       console.log('Submit button clicked');
//       const formData = new FormData();

//       if (uploadType === 'Link' && link) {
//         formData.append('link', link);
//         formData.append('type', 'Link');
//         console.log('Submitting link:', link);
//       } else if (file) {
//         formData.append('file', file);
//         formData.append('type', uploadType);
//         console.log('Submitting file:', file);
//       } else {
//         alert('Please upload a file or enter a link.');
//         return;
//       }

//       const token = localStorage.getItem('token'); // Get token for authentication
//       const response = await axios.post('http://localhost:8080/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log('Response from server:', response.data);
//       setUploads([...uploads, response.data]); // Update the state with the new upload
//       toggleModal(); // Close modal
//     } catch (error) {
//       console.error('Error during upload:', error);
//       alert('Upload failed. Please try again.');
//     }
//   };

//   return (
//     <div className="Dashboard_dashboard">
//       {/* Sidebar */}
//       <div className="Dashboard_sidebar">
//         <ul>
//           <li
//             className={selectedSection === 'MyPage' ? 'active' : ''}
//             onClick={() => setSelectedSection('MyPage')}
//           >
//             My Page
//           </li>
//           <li
//             className={selectedSection === 'Uploads' ? 'active' : ''}
//             onClick={() => setSelectedSection('Uploads')}
//           >
//             Uploads
//           </li>
//           <li
//             className={selectedSection === 'Insights' ? 'active' : ''}
//             onClick={() => setSelectedSection('Insights')}
//           >
//             Insights
//           </li>
//           <li
//             className={selectedSection === 'Payouts' ? 'active' : ''}
//             onClick={() => setSelectedSection('Payouts')}
//           >
//             Payouts
//           </li>
//           <li
//             className={selectedSection === 'Community' ? 'active' : ''}
//             onClick={() => setSelectedSection('Community')}
//           >
//             Community
//           </li>
//           <li
//             className={selectedSection === 'Notifications' ? 'active' : ''}
//             onClick={() => setSelectedSection('Notifications')}
//           >
//             Notifications
//           </li>
//           <li
//             className={selectedSection === 'Settings' ? 'active' : ''}
//             onClick={() => setSelectedSection('Settings')}
//           >
//             Settings
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="Dashboard_content">
//         <div className="Dashboard_header">
//           <div className="Dashboard_profile">
//             <div className="Dashboard_profile-pic"></div>
//             <div className="Dashboard_profile-info">
//               <h2>harry$$</h2>
//               <a href="https://patreon.com/harry363">creatreon.com/harry363</a>
//               <button onClick={toggleModal} className="Dashboard_create-button">
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Conditionally render content based on the selected sidebar section */}
//         {selectedSection === 'Uploads' && (
//           <div className="Dashboard_upload-list">
//             <h3>Your Uploads</h3>
//             {uploads.length > 0 ? (
//               <ul>
//                 {uploads.map((upload, index) => (
//                   <li key={index}>
//                     {upload.type === 'Link' ? (
//                       <a href={upload.link} target="_blank" rel="noopener noreferrer">
//                         {upload.link}
//                       </a>
//                     ) : (
//                       <span>{upload.name}</span>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No uploads yet. Start by creating one!</p>
//             )}
//           </div>
//         )}
//         {/* Add content for other sections as needed */}
//         {selectedSection !== 'Uploads' && <p>Content for {selectedSection}</p>}

//         {/* Modal for uploads */}
//         {isModalOpen && (
//           <div className="Dashboard_modal">
//             <div className="Dashboard_modal-content">
//               <h3>Upload {uploadType || 'Type'}</h3>
//               <ul>
//                 <li onClick={() => setUploadType('Video')}>Video</li>
//                 <li onClick={() => setUploadType('Audio')}>Audio</li>
//                 <li onClick={() => setUploadType('Image')}>Image</li>
//                 <li onClick={() => setUploadType('Link')}>Link</li>
//               </ul>
//               {uploadType && (
//                 <div className="Dashboard_upload">
//                   {uploadType === 'Link' ? (
//                     <input
//                       type="url"
//                       placeholder="Enter the link"
//                       value={link}
//                       onChange={(e) => setLink(e.target.value)}
//                       required
//                     />
//                   ) : (
//                     <input
//                       type="file"
//                       accept={
//                         uploadType === 'Video'
//                           ? 'video/*'
//                           : uploadType === 'Audio'
//                           ? 'audio/*'
//                           : uploadType === 'Image'
//                           ? 'image/*'
//                           : '*'
//                       }
//                       onChange={handleFileChange}
//                     />
//                   )}
//                   <button onClick={handleSubmit} className="Dashboard_submit-button">
//                     Submit
//                   </button>
//                 </div>
//               )}
//               <button onClick={toggleModal} className="Dashboard_close-button">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import axios from 'axios';

// const Dashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [uploadType, setUploadType] = useState(null);
//   const [uploads, setUploads] = useState([]);
//   const [file, setFile] = useState(null); // Temporary file storage
//   const [link, setLink] = useState(''); // Temporary link storage

//   // Fetch uploaded items from the server on component mount
//   useEffect(() => {
//     const fetchUploads = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/uploads');
//         setUploads(response.data);
//       } catch (error) {
//         console.error('Error fetching uploads:', error);
//       }
//     };
//     fetchUploads();
//   }, []);

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//     setUploadType(null);
//     setFile(null);
//     setLink('');
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     try {
//       console.log('Submit button clicked');
//       const formData = new FormData();
  
//       if (uploadType === 'Link' && link) {
//         formData.append('link', link);
//         formData.append('type', 'Link');
//         console.log('Submitting link:', link);
//       } else if (file) {
//         formData.append('file', file);
//         formData.append('type', uploadType);
//         console.log('Submitting file:', file);
//       } else {
//         alert('Please upload a file or enter a link.');
//         return;
//       }
  
//       const response = await axios.post('http://localhost:8080/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
  
//       console.log('Response from server:', response.data);
//       setUploads([...uploads, response.data]); // Update state
//       toggleModal(); // Close modal
//     } catch (error) {
//       console.error('Error during upload:', error);
//       alert('Upload failed. Please try again.');
//     }
//   };
  

//   return (
//     <div className="Dashboard_dashboard">
//       <div className="Dashboard_sidebar">
//         <ul>
//           <li>My page</li>
//           <li>User Uploads</li>
//           <li>Insights</li>
//           <li>Payouts</li>
//           <li>Community</li>
//           <li>Notifications</li>
//           <li>Settings</li>
//         </ul>
//       </div>
//       <div className="Dashboard_content">
//         <div className="Dashboard_header">
//           <div className="Dashboard_profile">
//             <div className="Dashboard_profile-pic"></div>
//             <div className="Dashboard_profile-info">
//               <h2>harry$$</h2>
//               <a href="https://patreon.com/harry363">creatreon.com/harry363</a>
//               <button onClick={toggleModal} className="Dashboard_create-button">
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="Dashboard_upload-list">
//           <h3>Your Uploads</h3>
//           <ul>
//             {uploads.map((upload, index) => (
//               <li key={index}>
//                 {upload.type === 'Link' ? (
//                   <a href={upload.link} target="_blank" rel="noopener noreferrer">
//                     {upload.link}
//                   </a>
//                 ) : (
//                   <span>{upload.name}</span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//         {isModalOpen && (
//           <div className="Dashboard_modal">
//             <div className="Dashboard_modal-content">
//               <h3>Upload {uploadType || 'Type'}</h3>
//               <ul>
//                 <li onClick={() => setUploadType('Video')}>Video</li>
//                 <li onClick={() => setUploadType('Audio')}>Audio</li>
//                 <li onClick={() => setUploadType('Image')}>Image</li>
//                 <li onClick={() => setUploadType('Link')}>Link</li>
//               </ul>
//               {uploadType && (
//                 <div className="Dashboard_upload">
//                   {uploadType === 'Link' ? (
//                     <input
//                       type="url"
//                       placeholder="Enter the link"
//                       value={link}
//                       onChange={(e) => setLink(e.target.value)}
//                       required
//                     />
//                   ) : (
//                     <input
//                       type="file"
//                       accept={
//                         uploadType === 'Video'
//                           ? 'video/*'
//                           : uploadType === 'Audio'
//                           ? 'audio/*'
//                           : uploadType === 'Image'
//                           ? 'image/*'
//                           : '*'
//                       }
//                       onChange={handleFileChange}
//                     />
//                   )}
//                   <button onClick={handleSubmit} className="Dashboard_submit-button">
//                     Submit
//                   </button>
//                 </div>
//               )}
//               <button onClick={toggleModal} className="Dashboard_close-button">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import axios from 'axios';

// const Dashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [uploadType, setUploadType] = useState(null);
//   const [uploads, setUploads] = useState([]);
//   const [file, setFile] = useState(null);
//   const [link, setLink] = useState('');

//   // Fetch uploaded items from the server on component mount
//   useEffect(() => {
//     const fetchUploads = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/uploads');
//         setUploads(response.data);
//       } catch (error) {
//         console.error('Error fetching uploads:', error);
//       }
//     };
//     fetchUploads();
//   }, []);

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//     setUploadType(null);
//     setFile(null);
//     setLink('');
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();

//       if (uploadType === 'Link' && link) {
//         formData.append('link', link);
//         formData.append('type', 'Link');
//       } else if (file) {
//         formData.append('file', file);
//         formData.append('type', uploadType);
//       } else {
//         alert('Please upload a file or enter a link.');
//         return;
//       }

//       const response = await axios.post('http://localhost:8080/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setUploads([...uploads, response.data]); // Update state
//       toggleModal(); // Close modal
//     } catch (error) {
//       console.error('Error during upload:', error);
//       alert('Upload failed. Please try again.');
//     }
//   };

//   return (
//     <div className="Dashboard_dashboard">
//       <div className="Dashboard_sidebar">
//         <ul>
//           <li>My page</li>
//           <li>My Uploads</li>
//           <li>Logout</li>
          
//         </ul>
//       </div>
//       <div className="Dashboard_content">
//         <div className="Dashboard_header">
//           <div className="Dashboard_profile">
//             <div className="Dashboard_profile-pic"></div>
//             <div className="Dashboard_profile-info">
//               <h2>harry$$</h2>
//               <a href="https://patreon.com/harry363">creatreon.com/harry363</a>
//               <button onClick={toggleModal} className="Dashboard_create-button">
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="Dashboard_upload-list">
//           <h3>Your Uploads</h3>
//           <ul>
//             {uploads.map((upload, index) => (
//               <li key={index}>
//                 {upload.type === 'Link' ? (
//                   <a href={upload.link} target="_blank" rel="noopener noreferrer">
//                     {upload.link}
//                   </a>
//                 ) : upload.type === 'Image' ? (
//                   <img src={`http://localhost:8080/uploads/${upload.name}`} alt="Preview" className="Dashboard_preview" />
//                 ) : upload.type === 'Video' ? (
//                   <video src={`http://localhost:8080/uploads/${upload.name}`} controls className="Dashboard_preview" />
//                 ) : upload.type === 'Audio' ? (
//                   <audio src={`http://localhost:8080/uploads/${upload.name}`} controls className="Dashboard_preview" />
//                 ) : (
//                   <span>{upload.name}</span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//         {isModalOpen && (
//           <div className="Dashboard_modal">
//             <div className="Dashboard_modal-content">
//               <h3>Upload {uploadType || 'Type'}</h3>
//               <ul>
//                 <li onClick={() => setUploadType('Video')}>Video</li>
//                 <li onClick={() => setUploadType('Audio')}>Audio</li>
//                 <li onClick={() => setUploadType('Image')}>Image</li>
//                 <li onClick={() => setUploadType('Link')}>Link</li>
//               </ul>
//               {uploadType && (
//                 <div className="Dashboard_upload">
//                   {uploadType === 'Link' ? (
//                     <input
//                       type="url"
//                       placeholder="Enter the link"
//                       value={link}
//                       onChange={(e) => setLink(e.target.value)}
//                       required
//                     />
//                   ) : (
//                     <input
//                       type="file"
//                       accept={
//                         uploadType === 'Video'
//                           ? 'video/*'
//                           : uploadType === 'Audio'
//                           ? 'audio/*'
//                           : uploadType === 'Image'
//                           ? 'image/*'
//                           : '*'
//                       }
//                       onChange={handleFileChange}
//                     />
//                   )}
//                   <button onClick={handleSubmit} className="Dashboard_submit-button">
//                     Submit
//                   </button>
//                 </div>
//               )}
//               <button onClick={toggleModal} className="Dashboard_close-button">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import axios from 'axios';

// const Dashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [uploadType, setUploadType] = useState(null);
//   const [uploads, setUploads] = useState([]);
//   const [file, setFile] = useState(null);
//   const [link, setLink] = useState('');
//   const [activeView, setActiveView] = useState('My Page'); // Track active sidebar option

//   // Fetch uploaded items from the server on component mount
//   useEffect(() => {
//     const fetchUploads = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/uploads');
//         setUploads(response.data);
//       } catch (error) {
//         console.error('Error fetching uploads:', error);
//       }
//     };
//     fetchUploads();
//   }, []);

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//     setUploadType(null);
//     setFile(null);
//     setLink('');
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();

//       if (uploadType === 'Link' && link) {
//         formData.append('link', link);
//         formData.append('type', 'Link');
//       } else if (file) {
//         formData.append('file', file);
//         formData.append('type', uploadType);
//       } else {
//         alert('Please upload a file or enter a link.');
//         return;
//       }

//       const response = await axios.post('http://localhost:8080/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setUploads([...uploads, response.data]); // Update state
//       toggleModal(); // Close modal
//     } catch (error) {
//       console.error('Error during upload:', error);
//       alert('Upload failed. Please try again.');
//     }
//   };

//   return (
//     <div className="Dashboard_dashboard">
//       {/* Sidebar */}
//       <div className="Dashboard_sidebar">
//         <ul>
//           <li onClick={() => setActiveView('My Page')} className={activeView === 'My Page' ? 'active' : ''}>
//             My Page
//           </li>
//           <li onClick={() => setActiveView('My Uploads')} className={activeView === 'My Uploads' ? 'active' : ''}>
//             My Uploads
//           </li>
//           <li>Logout</li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="Dashboard_content">
//         {/* Render content based on activeView */}
//         {activeView === 'My Page' && (
//           <div className="Dashboard_header">
//             <div className="Dashboard_profile">
//               <div className="Dashboard_profile-pic"></div>
//               <div className="Dashboard_profile-info">
//                 <h2>harry$$</h2>
//                 <a href="https://patreon.com/harry363">creatreon.com/harry363</a>
//                 <button onClick={toggleModal} className="Dashboard_create-button">
//                   Create
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeView === 'My Uploads' && (
//           <div className="Dashboard_upload-list">
//             <h3>Your Uploads</h3>
//             <ul>
//               {uploads.map((upload, index) => (
//                 <li key={index}>
//                   {upload.type === 'Link' ? (
//                     <a href={upload.link} target="_blank" rel="noopener noreferrer">
//                       {upload.link}
//                     </a>
//                   ) : upload.type === 'Image' ? (
//                     <img src={`http://localhost:8080/uploads/${upload.name}`} alt="Preview" className="Dashboard_preview" />
//                   ) : upload.type === 'Video' ? (
//                     <video src={`http://localhost:8080/uploads/${upload.name}`} controls className="Dashboard_preview" />
//                   ) : upload.type === 'Audio' ? (
//                     <audio src={`http://localhost:8080/uploads/${upload.name}`} controls className="Dashboard_preview" />
//                   ) : (
//                     <span>{upload.name}</span>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Modal for upload */}
//         {isModalOpen && (
//           <div className="Dashboard_modal">
//             <div className="Dashboard_modal-content">
//               <h3>Upload {uploadType || 'Type'}</h3>
//               <ul>
//                 <li onClick={() => setUploadType('Video')}>Video</li>
//                 <li onClick={() => setUploadType('Audio')}>Audio</li>
//                 <li onClick={() => setUploadType('Image')}>Image</li>
//                 <li onClick={() => setUploadType('Link')}>Link</li>
//               </ul>
//               {uploadType && (
//                 <div className="Dashboard_upload">
//                   {uploadType === 'Link' ? (
//                     <input
//                       type="url"
//                       placeholder="Enter the link"
//                       value={link}
//                       onChange={(e) => setLink(e.target.value)}
//                       required
//                     />
//                   ) : (
//                     <input
//                       type="file"
//                       accept={
//                         uploadType === 'Video'
//                           ? 'video/*'
//                           : uploadType === 'Audio'
//                           ? 'audio/*'
//                           : uploadType === 'Image'
//                           ? 'image/*'
//                           : '*'
//                       }
//                       onChange={handleFileChange}
//                     />
//                   )}
//                   <button onClick={handleSubmit} className="Dashboard_submit-button">
//                     Submit
//                   </button>
//                 </div>
//               )}
//               <button onClick={toggleModal} className="Dashboard_close-button">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [activeView, setActiveView] = useState('My Page'); // Track active sidebar option
  const [user, setUser] = useState(null); // User data (username)
  
  // Fetch user data (you can replace this with your API call to get user details)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/current-user'); // Assume this endpoint returns user data
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);
  
  // Fetch uploaded items from the server on component mount
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await axios.get('http://localhost:8080/uploads');
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
      const formData = new FormData();

      if (uploadType === 'Link' && link) {
        formData.append('link', link);
        formData.append('type', 'Link');
      } else if (file) {
        formData.append('file', file);
        formData.append('type', uploadType);
      } else {
        alert('Please upload a file or enter a link.');
        return;
      }

      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploads([...uploads, response.data]); // Update state
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
          <li onClick={() => setActiveView('My Page')} className={activeView === 'My Page' ? 'active' : ''}>
            My Page
          </li>
          <li onClick={() => setActiveView('My Uploads')} className={activeView === 'My Uploads' ? 'active' : ''}>
            My Uploads
          </li>
          <li >Logout</li>
          
        </ul>
      </div>

      {/* Main Content */}
      <div className="Dashboard_content">
        {activeView === 'My Page' && (
          <>
            {/* Welcome Banner */}
            <div className="Dashboard_welcome-banner">
              <h1>
                {new Date().getHours() < 12
                  ? 'Good Morning,'
                  : new Date().getHours() < 18
                  ? 'Good Afternoon,'
                  : 'Good Evening,'}{' '}
                {user ? user.username : 'User'}!
              </h1>
              <p>Welcome back to your creator dashboard.</p>
            </div>

            {/* Quick Stats */}
            <div className="Dashboard_quick-stats">
              <div>
                <h3>{uploads.length}</h3>
                <p>Uploads</p>
              </div>
              <div>
                <h3>1.2K</h3>
                <p>Followers</p>
              </div>
              <div>
                <h3>3.5K</h3>
                <p>Likes</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="Dashboard_recent-activity">
              <h3>Recent Activity</h3>
              <div className="Dashboard_recent-items">
                {uploads.slice(-3).map((upload, index) => (
                  <div key={index} className="Dashboard_recent-item">
                    {upload.type === 'Image' ? (
                      <img src={`http://localhost:8080/uploads/${upload.name}`} alt="Thumbnail" />
                    ) : upload.type === 'Video' ? (
                      <video src={`http://localhost:8080/uploads/${upload.name}`} controls />
                    ) : upload.type === 'Audio' ? (
                      <audio src={`http://localhost:8080/uploads/${upload.name}`} controls />
                    ) : (
                      <p>{upload.name || upload.link}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Section */}
            <div className="Dashboard_profile-info">
              <h2>{user ? user.username : 'User'}</h2>
              <a href="https://patreon.com/harry363">creatreon.com/harry363</a>
              <div className="Dashboard_create-section">
                <button onClick={toggleModal} className="Dashboard_create-button">
                  Create
                </button>
                <button className="Dashboard_edit-button">Edit Profile</button>
              </div>
            </div>
          </>
        )}

        {activeView === 'My Uploads' && (
          <div className="Dashboard_upload-list">
            <h3>Your Uploads</h3>
            <ul>
              {uploads.map((upload, index) => (
                <li key={index}>
                  {upload.type === 'Link' ? (
                    <a href={upload.link} target="_blank" rel="noopener noreferrer">
                      {upload.link}
                    </a>
                  ) : upload.type === 'Image' ? (
                    <img src={`http://localhost:8080/uploads/${upload.name}`} alt="Preview" />
                  ) : upload.type === 'Video' ? (
                    <video src={`http://localhost:8080/uploads/${upload.name}`} controls />
                  ) : upload.type === 'Audio' ? (
                    <audio src={`http://localhost:8080/uploads/${upload.name}`} controls />
                  ) : (
                    <span>{upload.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modal for upload */}
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
