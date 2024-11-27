import React, { useState } from 'react';

const AudioPost = () => {
    const [audioUrl, setAudioUrl] = useState('');
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle audio post submission logic
        console.log('Audio URL:', audioUrl);
        console.log('Title:', title);
    };

    return (
        <form onSubmit={handleSubmit} className="audio-post-form">
            <input
                type="text"
                placeholder="Audio URL"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <button type="submit">Post Audio</button>
        </form>
    );
};

export default AudioPost;
