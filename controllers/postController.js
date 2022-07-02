//import model
const Post = require("../models/postModel");
const mongoose = require("mongoose");

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single posts
const getPost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such post" });
  const post = await Post.findById(id);
  if (!post) return res.status(400).json({ error: "Not found" });
  return res.status(200).json(post);
};

// Create new post
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "No such post" });
    const post = await Post.findOneAndDelete({_id:id});
    if (!post) return res.status(400).json({ error: "Not found" });
    return res.status(200).json(post);
};

// Update a post
const updatePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "No such post" });
    const post = await Post.findOneAndUpdate({_id:id},{...req.body});
    if (!post) return res.status(400).json({ error: "Not found" });
    return res.status(200).json(post);
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost
};
