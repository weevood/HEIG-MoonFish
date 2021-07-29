const mariadb = require.main.require('./app/models/mariadb')
const User = mariadb.models.User
const Resource = mariadb.models.Resource
const { handleError, buildErrObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { updateItem, getItem } = require('../../middleware/db')

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateProfileResume = async (req, res) => {
    try {
        const data = matchedData(req)
        const resume = await getItem(Resource, data.resumeId)
        if (resume.authorId !== req.user.id)
            res.status(403).json({ error: { msg: 'FORBIDDEN' } })
        res.status(200).json(await updateItem(User, req.user.id, { resumeId: resume.id }))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateProfileResume }
