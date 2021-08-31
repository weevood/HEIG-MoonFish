const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/auth')
const trimRequest = require('trim-request')
const { requiredRole } = require('../controllers/auth')
const { ROLE_ADMIN, ROLE_USER } = require('../models/enums/roles')

const {
    createNotification,
    deleteNotification,
    getNotification,
    getNotifications,
    updateNotification,
    setNotificationRead,
} = require('../controllers/notifications')

const {
    validateCreateNotification,
    validateDeleteNotification,
    validateGetNotification,
    validateUpdateNotification,
    validateReadNotification,
} = require('../controllers/notifications/validators')

/*
 * Define all "Notifications" routes
 */

// Get all notifications
router.get('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getNotifications)

// Create a notification
router.post('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateCreateNotification, createNotification)

// Get a notification by id
router.get('/:id', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetNotification, getNotification)

// Update a notification by id
router.patch('/:id', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateUpdateNotification, updateNotification)

// Delete a notification (Mark as read)
// router.delete('/:id', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateDeleteNotification, deleteNotification)
router.delete('/:id', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateReadNotification, setNotificationRead)

module.exports = router
