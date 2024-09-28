const express = require('express');
const router = express.Router();

//import controllers
const controllers = require('../controllers/postController')

// GET all post
// GET /api/posts/
router.get('/',controllers.getAllPosts)

// GET all post for an user
// GET /api/posts/mail/:email
router.get('/mail/:email',controllers.getAllPostsUser)

//GET a single post
router.get('/:id',controllers.getPost)

// POST a new post
router.post('/',controllers.createPost)

// DELETE a post
router.delete('/:id/:email',controllers.deletePost)

// UPDATE a post
router.patch('/:id',controllers.updatePost)

module.exports = router;