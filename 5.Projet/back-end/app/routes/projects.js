const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/auth')
const trimRequest = require('trim-request')
const { requiredRole } = require('../controllers/auth')
const { ROLE_ADMIN, ROLE_USER } = require('../models/enums/roles')

const {
    applyProject,
    arbitrateProject,
    createProject,
    deleteProject,
    developProject,
    getProject,
    getProjects,
    updateProject,
} = require('../controllers/projects')

const {
    validateApplyProject,
    validateArbitrateProject,
    validateCreateProject,
    validateDeleteProject,
    validateDevelopProject,
    validateGetProject,
    validateUpdateProject,
} = require('../controllers/projects/validators')

/*
 * Define all "Projects" routes
 */

// Get all projects
router.get('/', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, getProjects)

// Create a project (MANDATES)
router.post('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateCreateProject, createProject)

// Get a project by uuid
router.get('/:uuid', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetProject, getProject)

// Update a project by uuid
router.patch('/:uuid', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateUpdateProject, updateProject)

// Arbitrate a project (ARBITRATES)
router.put('/:id/arbitrates', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateArbitrateProject, arbitrateProject)

// Leave a project (APPLIES)
router.put('/:id/applies', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateApplyProject, applyProject)

// Leave a project (DEVELOPS)
router.put('/:id/develops', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateDevelopProject, developProject)

// Delete a project
router.delete('/:id', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateDeleteProject, deleteProject)

module.exports = router
