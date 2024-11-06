import React from 'react';
import { votePost } from '../services/api';

const PostCard = ({ post, token, onVote }) => {
    const handleVote = async (voteType) => {
        try {
            const updatedPost = await votePost(post._id, voteType, token);
            onVote(updatedPost.data);
        } catch (error) {
            console.error('Vote failed', error);
        }
    };

    return (
        <div className="post-card">
            <h3>{post.title}</h3>
            <img src={`http://localhost:5000${post.imageUrl}`} alt={post.title} />
            <div>
                <button onClick={() => handleVote('yes')}>YES {post.yesVotes}</button>
                <button onClick={() => handleVote('no')}>NO {post.noVotes}</button>
            </div>
        </div>
    );
};

export default PostCard;
