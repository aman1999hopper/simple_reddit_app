const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Create a post
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    const { title } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;
    const post = new Post({ title, imageUrl, createdBy: req.user.id });
    await post.save();
    res.status(201).json(post);
});

// Get all posts
router.get('/', async (req, res) => {
    const posts = await Post.find().populate('createdBy', 'username');
    res.json(posts);
});

// Vote on a post
router.post('/:postId/vote', authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const { voteType } = req.body;  // "yes" or "no"
    
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (voteType === "yes") post.yesVotes += 1;
    if (voteType === "no") post.noVotes += 1;

    await post.save();
    res.json(post);
});

module.exports = router;
