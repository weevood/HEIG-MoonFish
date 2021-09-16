const mariadb = require('../../models/mariadb')
const User = mariadb.models.User
const Resource = mariadb.models.Resource
const { handleError, buildErrObject, buildSuccObject } = require('../../middleware/utils')
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
        if (resume.authorId !== req.user.id) {
            res.status(403).json({ error: { msg: 'FORBIDDEN' } })
            return
        }
        await updateItem(User, req.user.id, { resumeId: resume.id })
        res.status(200).json(buildSuccObject('RESUME_UPDATED'))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateProfileResume }
