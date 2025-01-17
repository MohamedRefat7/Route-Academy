import express from "express";
import sequelize from "../DB/db.connection.js";
import Post from "../models/Post.models.js";
import User from "../models/User.models.js";
import Comment from "../models/Comment.models.js";

const router = express.Router();

router.post("/newPost", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const post = await Post.create({ title, content, userId });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ error: "Post not found." });
    if (post.userId !== userId)
      return res.status(403).json({ error: "Unauthorized." });
    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/details", async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title"],
      include: [
        { model: User, attributes: ["id", "name"] },
        { model: Comment, attributes: ["id", "content"] },
      ],
    });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/comment-count", async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [
        "id",
        "title",
        [sequelize.fn("COUNT", sequelize.col("comments.id")), "commentCount"],
      ],
      include: [{ model: Comment, attributes: [] }],
      group: ["Post.id"],
    });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
