const express = require('express');
const router = express.Router();
const private = require("../controllers/privateController")
const protect  = require("../middlewares/auth")


// accesing the user
router.get('/', protect, private)

module.exports = router
