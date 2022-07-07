const express = require('express');
const router = express.Router();


//import controllers
const controllers = require('../controllers/userController')

// Register the user
router.post('/register',controllers.register)

 //  Login the user
router.post('/login',controllers.login)



module.exports = router;

