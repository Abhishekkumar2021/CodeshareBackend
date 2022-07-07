//import model
const Post = require("../models/postModel");
const mongoose = require("mongoose");

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ sucesss:false, error: err.message });
  }
};
// Get all posts for an user
const getAllPostsUser = async (req, res) => {
  const {email} = req.params;
  try {
    const posts = await Post.find({email}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ sucesss:false, error: err.message });
  }
};

// Get a single posts
const getPost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({sucesss:false, error: "No such post" });
  const post = await Post.findById(id);
  if (!post) return res.status(400).json({sucesss:false, error: "Not found" });
  return res.status(200).json(post);
};

// Create new post
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({sucesss:false, error: err.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
    const { id,email } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({sucesss:false, error: "No such post" });
      const post = await Post.findById(id);
      if (!post) return res.status(400).json({ sucesss:false,error: "Post not found" });
      if(post.email!==email) return res.status(400).json({ sucesss:false,error: "You can't delete this post" });
      await Post.findOneAndDelete({_id:id});
      return res.status(200).json(post);
};

// Update a post
const updatePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({sucesss:false, error: "No such post" });
    const post = await Post.findOneAndUpdate({_id:id},{...req.body});
    if (!post) return res.status(400).json({ sucesss:false,error: "Not found" });
    return res.status(200).json(post);
};

module.exports = {
  createPost,
  getAllPosts,
  getAllPostsUser,
  getPost,
  deletePost,
  updatePost
};
