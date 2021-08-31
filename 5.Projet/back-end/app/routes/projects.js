const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/auth')
const trimRequest = require('trim-request')
const { requiredRole } = require('../controllers/auth')
const { ROLE_ADMIN, ROLE_USER, ROLE_MODERATOR } = require('../models/enums/roles')

const {
    applyProject,
    arbitrateProject,
    createProject,
    deleteProject,
    developProject,
    feedbackProject,
    getProject,
    getProjectResources,
    getProjectTeams,
    getProjects,
    updateProject,
    updateProjectStatus,
} = require('../controllers/projects')

const {
    validateApplyProject,
    validateArbitrateProject,
    validateCreateProject,
    validateDeleteProject,
    validateDevelopProject,
    validateFeedbackProject,
    validateGetProject,
    validateUpdateProject,
    validateUpdateProjectStatus,
} = require('../controllers/projects/validators')

/*
 * Define all "Projects" routes
 */

// Get all projects
router.get('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getProjects)

// Create a project (MANDATES)
router.post('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateCreateProject, createProject)

// Get a project by uuid
router.get('/:uuid', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetProject, getProject)

// Update a project by uuid
router.patch('/:uuid', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateUpdateProject, updateProject)

// Update a project status
router.patch('/:uuid/status/:status', requireAuth, requiredRole(ROLE_MODERATOR), trimRequest.all, validateUpdateProjectStatus, updateProjectStatus)

// Get all project resources
router.get('/:uuid/resources', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetProject, getProjectResources)

// Get all project teams
router.get('/:uuid/teams', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetProject, getProjectTeams)

// Arbitrate a project (ARBITRATES)
router.put('/:uuid/arbitrate', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateArbitrateProject, arbitrateProject)

// Leave a project (APPLIES)
router.put('/:uuid/apply', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateApplyProject, applyProject)

// Leave a project (DEVELOPS)
router.put('/:uuid/develop', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateDevelopProject, developProject)

// Note and feedback a project (MANDATES mark + feedback)
router.put('/:uuid/feedback', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateFeedbackProject, feedbackProject)

// Delete a project
router.delete('/:uuid', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateDeleteProject, deleteProject)

module.exports = router
