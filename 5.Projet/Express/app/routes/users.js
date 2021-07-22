const express = require('express')
const router = express.Router()
require.main.require('./config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })
const trimRequest = require('trim-request')
const { roleAuthorization } = require('../controllers/auth')

const {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/users')

const {
    validateCreateUser,
    validateGetUser,
    validateUpdateUser,
    validateDeleteUser
} = require('../controllers/users/validators')

/*
 * Define all "Users" routes
 */

// Get all users
router.get('/', requireAuth, roleAuthorization(['admin']), trimRequest.all, getUsers)

// Create a new user
router.post('/', requireAuth, roleAuthorization(['admin']), trimRequest.all, validateCreateUser, createUser)

// Get a user by id
router.get('/:id', requireAuth, roleAuthorization(['admin']), trimRequest.all, validateGetUser, getUser)

// Update a user by id
router.patch('/:id', requireAuth, roleAuthorization(['admin']), trimRequest.all, validateUpdateUser, updateUser)

// Delete a user
router.delete('/:id', requireAuth, roleAuthorization(['admin']), trimRequest.all, validateDeleteUser, deleteUser)

module.exports = router
