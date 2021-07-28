const { handleError, itemNotFound } = require('../../middleware/utils')
const { findUser } = require('../auth/helpers');
const { setUserInfo } = require('../auth/helpers/setUserInfo');

/**
 * Get profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProfile = async (req, res) => {
    try {
        res.status(200).json(
            await new Promise((resolve, reject) => {
                findUser(req.user.id)
                    .then(async item => {
                        await itemNotFound(item, 'NOT_FOUND')
                        resolve(await setUserInfo(item))
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
