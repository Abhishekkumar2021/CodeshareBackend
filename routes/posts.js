const express = require('express');
const router = express.Router();

//import controllers
const controllers = require('../controllers/postController')

// GET all workouts
router.get('/',controllers.getAllPosts)

//GET a single workout
router.get('/:id',controllers.getPost)

// POST a new workout
router.post('/',controllers.createPost)

// DELETE a workout
router.delete('/:id',controllers.deletePost)

// UPDATE a workout
router.patch('/:id',controllers.updatePost)

module.exports = router;