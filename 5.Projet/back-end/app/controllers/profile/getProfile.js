const db = require.main.require('./app/models')
const User = db.models.User
const { handleError, itemNotFound } = require('../../middleware/utils')

/**
 * Get profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProfile = async (req, res) => {
    try {
        res.status(200).json(
            await new Promise((resolve, reject) => {
                User.findByPk(req.user.id)
                    .then(async item => {
                        await itemNotFound(null, item, 'NOT_FOUND')
                        delete item.id
                        delete item.updatedAt
                        delete item.createdAt
                        resolve(item)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProfile }
