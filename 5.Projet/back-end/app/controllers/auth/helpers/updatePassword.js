const db = require.main.require('./app/models')
const Authentication = db.models.Authentication
const { itemNotFound, buildSuccObject, buildErrObject } = require('../../../middleware/utils')
const { hash } = require("../../../middleware/auth")

/**
 * Updates a user password in database
 * @param {int} id - user id
 * @param {string} password - the new password
 */
const updatePassword = (id = 0, password) => {
    return new Promise((resolve, reject) => {
        Authentication.findByPk(id)
            .then(async (userAuth) => {
                await itemNotFound(null, userAuth, 'NOT_FOUND')

                // Saves in DB
                Authentication.update(
                    { password: await hash(password) },
                    { where: { userId: userAuth.userId } })
                    .then(
                        num => {
                            if (num) {
                                resolve(buildSuccObject('PASSWORD_CHANGED'))
                            }
                            throw { message: 'UPDATE_ERROR' }
                        }
                    )
                    .catch(error => {
                        return reject(buildErrObject(422, error.message))
                    })

            })
            .catch(error => {
                reject(error)
            })

    })
}

module.exports = { updatePassword }
