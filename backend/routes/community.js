const express = require('express');
const router = express.Router();
const { Post, User, Trip, Comment, PostLike, sequelize } = require('../models');
const { protect } = require('../middleware/authMiddleware');

// Get all community posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
        {
          model: Trip,
          as: 'trip',
          attributes: ['id', 'name', 'coverPhoto', 'description'],
        },
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName'],
            }
          ]
        },
        {
          model: PostLike,
          as: 'likes',
        }
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching posts' });
  }
});

// Like/Unlike a post
router.post('/posts/:postId/like', protect, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const existingLike = await PostLike.findOne({
      where: { postId, userId }
    });

    if (existingLike) {
      await existingLike.destroy();
      return res.json({ message: 'Post unliked', liked: false });
    } else {
      await PostLike.create({ postId, userId });
      return res.json({ message: 'Post liked', liked: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error liking post' });
  }
});

// Add a comment to a post
router.post('/posts/:postId/comment', protect, async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const comment = await Comment.create({
      text,
      postId,
      userId
    });

    const fullComment = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName'],
        }
      ]
    });

    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error adding comment' });
  }
});

module.exports = router;
