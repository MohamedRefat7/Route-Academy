import express from "express";
import Comment from "../models/Comment.models.js";
import Post from "../models/Post.models.js";
import User from "../models/User.models.js";
import sequelize from "../DB/db.connection.js";

const router = express.Router();

// Create Bulk Comments
router.post("/", async (req, res) => {
  try {
    const comments = await Comment.bulkCreate(req.body);
    res.status(201).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a Specific Comment
router.patch("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;
    const comment = await Comment.findByPk(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found." });
    if (comment.userId !== userId)
      return res.status(403).json({ error: "Unauthorized." });
    await comment.update({ content });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Find or Create Comment
router.post("/find-or-create", async (req, res) => {
  try {
    const { content, postId, userId } = req.body;
    const [comment, created] = await Comment.findOrCreate({
      where: { content, postId, userId },
      defaults: { content, postId, userId },
    });
    res.status(201).json({ comment, created });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve Comments Containing a Specific Word
router.get("/search", async (req, res) => {
  try {
    const { word } = req.query;
    const { count, rows } = await Comment.findAndCountAll({
      where: {
        content: {
          [sequelize.Op.like]: `%${word}%`,
        },
      },
    });
    res.json({ count, comments: rows });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve the 3 Most Recent Comments for a Post
router.get("/newest/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Specific Comment with User and Post Details
router.get("/details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Post, attributes: ["id", "title"] },
      ],
    });
    if (!comment) return res.status(404).json({ error: "Comment not found." });
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
