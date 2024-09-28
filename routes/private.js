const express = require('express');
const router = express.Router();
const private = require("../controllers/privateController")
const protect  = require("../middlewares/auth")


// accessing the user
// route -> GET /api/private/
router.get('/', protect, private)

module.exports = router
