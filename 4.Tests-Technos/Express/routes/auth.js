const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

// Validate an user
router.post('/', users.validate);

module.exports = router;
