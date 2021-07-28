const db = require.main.require('./app/models')
const User = db.models.User
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {int} id - user id
 */
const updateProfileInDB = (req = {}, id = 0) => {
    return new Promise((resolve, reject) => {
        User.findByPkAndUpdate(
            id,
            req,
            {
                new: true,
                runValidators: true,
                select: '-role -_id -updatedAt -createdAt'
            },
            async (error, user) => {
                try {
                    await itemNotFound(error, user, 'NOT_FOUND')
                    resolve(user)
                } catch (error) {
                    reject(error)
                }
            }
        )
    })
}

module.exports = { updateProfileInDB }
