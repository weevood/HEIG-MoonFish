const db = require.main.require('./app/models')
const Authentication = db.models.Authentication
const { itemNotFound, buildErrObject, buildSuccObject } = require('../../../middleware/utils')

/**
 * Changes password in database
 * @param {string} id - user id
 * @param {Object} req - request object
 */
const changePasswordInDB = (id = 0, req = {}) => {
    return new Promise((resolve, reject) => {
        Authentication.findById(id, '+password', async (error, userAuth) => {
            try {
                await itemNotFound(error, userAuth, 'NOT_FOUND')

                // Assigns new password to user
                userAuth.password = req.newPassword

                // Saves in DB
                userAuth.save((error) => {
                    if (error) {
                        return reject(buildErrObject(422, error.message))
                    }
                    resolve(buildSuccObject('PASSWORD_CHANGED'))
                })
            } catch (error) {
                reject(error)
            }
        })
    })
}

module.exports = { changePasswordInDB }
