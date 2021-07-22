const Authentication = require.main.require('./app/models/authentication')
const { itemNotFound, buildErrObject, buildSuccObject } = require('../../../middleware/utils')

/**
 * Changes password in database
 * @param {string} id - user id
 * @param {Object} req - request object
 */
const changePasswordInDB = (id = 0, req = {}) => {
    return new Promise((resolve, reject) => {
        Authentication.findById(id, '+password', async (err, userAuth) => {
            try {
                await itemNotFound(err, userAuth, 'NOT_FOUND')

                // Assigns new password to user
                userAuth.password = req.newPassword

                // Saves in DB
                userAuth.save((error) => {
                    if (err) {
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
