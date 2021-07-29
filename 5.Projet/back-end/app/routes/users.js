const express = require('express')
const router = express.Router()
const { requireAuth } = require('./requireAuth')
const trimRequest = require('trim-request')
const { roleAuthorization } = require('../controllers/auth')
const { ROLE_ADMIN, ROLE_MODERATOR } = require('../models/enums/roles')

const {
    banUser,
    deleteUser,
    getUser,
    getUsers,
    giveUserRole,
    updateUser,
} = require('../controllers/users')

const {
    validateGetUser,
    validateUpdateUser,
    validateDeleteUser,
    validateGiveUserRole
} = require('../controllers/users/validators')

/*
 * Define all "Users" routes
 */

// Get all users
router.get('/', requireAuth, roleAuthorization([ROLE_ADMIN]), trimRequest.all, getUsers)

// Get a user by id
router.get('/:id', requireAuth, roleAuthorization([ROLE_ADMIN, ROLE_MODERATOR]), trimRequest.all, validateGetUser, getUser)

// Update a user by id
router.patch('/:id', requireAuth, roleAuthorization([ROLE_ADMIN]), trimRequest.all, validateUpdateUser, updateUser)

// Assign a role to user
router.patch('/:id/roles', requireAuth, roleAuthorization([ROLE_ADMIN, ROLE_MODERATOR]), trimRequest.all, validateGiveUserRole, giveUserRole)

// Ban a user by id
router.patch('/:id/ban', requireAuth, roleAuthorization([ROLE_ADMIN, ROLE_MODERATOR]), trimRequest.all, validateDeleteUser, banUser)

// Delete a user
router.delete('/:id', requireAuth, roleAuthorization([ROLE_ADMIN]), trimRequest.all, validateDeleteUser, deleteUser)

module.exports = router
