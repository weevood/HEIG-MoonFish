const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

// Retrieve all users
router.get('/', users.findAll);

// Retrieve a single user with id
router.get('/:id', users.findOne);

// Retrieve a single user by token
router.post('/me', users.findByToken);

// Create a new user
router.post('/', users.create);

// Update a user with id
router.put('/:id', users.update);

// Delete a user with id
router.delete('/:id', users.delete);

module.exports = router;
