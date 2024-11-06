import React, { useEffect, useState } from 'react';
import { getPosts, createPost } from '../services/api';
import PostCard from './PostCard';

const Feed = ({ token }) => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);

    const fetchPosts = async () => {
        const response = await getPosts();
        setPosts(response.data);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!title || !image) return;
        
        try {
            await createPost(title, image, token);
            fetchPosts();
            setTitle('');
            setImage(null);
        } catch (error) {
            console.error('Post creation failed', error);
        }
    };

    const handleVoteUpdate = (updatedPost) => {
        setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Feed</h2>
            <form onSubmit={handleUpload}>
                <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <button type="submit">Upload</button>
            </form>
            <div className="post-list">
                {posts.map(post => (
                    <PostCard key={post._id} post={post} token={token} onVote={handleVoteUpdate} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
