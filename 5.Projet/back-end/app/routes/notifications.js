const express = require('express')
const router = express.Router()
const t = require('trim-request')
const { auth } = require('../middleware/auth')
const { role } = require('../controllers/auth')
const { ROLE_USER } = require('../models/enums/roles')

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
router.get('/', auth, role(ROLE_USER), t.all, getNotifications)

// Get a notification by id
router.get('/:id', auth, role(ROLE_USER), t.all, validateGetNotification, getNotification)

// Create a notification
router.post('/', auth, role(ROLE_USER), t.all, validateCreateNotification, createNotification)

// Update a notification by id
router.patch('/:id', auth, role(ROLE_USER), t.all, validateUpdateNotification, updateNotification)

// Delete a notification (Mark as read instead of permanent deletion)
// router.delete('/:id', auth, role(ROLE_ADMIN), t.all, validateDeleteNotification, deleteNotification)
router.delete('/:id', auth, role(ROLE_USER), t.all, validateReadNotification, setNotificationRead)

module.exports = router
