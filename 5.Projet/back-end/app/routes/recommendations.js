const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/auth')
const trimRequest = require('trim-request')
const { requiredRole } = require('../controllers/auth')
const { ROLE_USER } = require('../models/enums/roles')

const {
    getProjectsRecommendations,
    getProjectsRecosByTags,
    getProjectsRecosByMandates,
    getProjectsRecosByApplies,
} = require('../controllers/recommendations')

/*
 * Define all "Recommendations" routes
 */

// Get a set of projects recommendations
router.get('/projects', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getProjectsRecommendations)

// Get projects recommendations by tags similarities
router.get('/projects/tags', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getProjectsRecosByTags)

// Get projects recommendations based on mandates
router.get('/projects/mandates', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getProjectsRecosByMandates)

// Get projects recommendations based on other teams applies
router.get('/projects/applies', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getProjectsRecosByApplies)


module.exports = router
