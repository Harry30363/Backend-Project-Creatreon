import React, { useState } from 'react';

const VideoPost = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle video post submission logic
        console.log('Video URL:', videoUrl);
        console.log('Title:', title);
    };

    return (
        <form onSubmit={handleSubmit} className="video-post-form">
            <input
                type="text"
                placeholder="Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <button type="submit">Post Video</button>
        </form>
    );
};

export default VideoPost;
