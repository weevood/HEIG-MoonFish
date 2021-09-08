const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
const { requireAuth } = require('../middleware/auth')
const { requiredRole } = require('../controllers/auth')
const { ROLE_USER, ROLE_MODERATOR } = require('../models/enums/roles')

const {
    createResource,
    deleteResource,
    getResource,
    getResources,
    updateResource,
} = require('../controllers/resources')

const {
    validateCreateResource,
    validateDeleteResource,
    validateGetResource,
    validateUpdateResource,
} = require('../controllers/resources/validators')

/*
 * Define all "Resources" routes
 */

// Get all resources
router.get('/', requireAuth, requiredRole(ROLE_MODERATOR), trimRequest.all, getResources)

// Get a resource by id
router.get('/:id', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetResource, getResource)

// Create a resource
router.post('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateCreateResource, createResource)

// Update a resource by id
router.patch('/:id', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateUpdateResource, updateResource)

// Delete a resource
router.delete('/:id', requireAuth, requiredRole(ROLE_MODERATOR), trimRequest.all, validateDeleteResource, deleteResource)

module.exports = router
