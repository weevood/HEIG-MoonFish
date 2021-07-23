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
        Authentication.findByPk(id)
            .then(async (userAuth) => {
                await itemNotFound(error, userAuth, 'NOT_FOUND')

                // Saves in DB
                Authentication.update(
                    { password: req.newPassword },
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
                    });

            })
            .catch(error => {
                reject(error)
            });

    })
}

module.exports = { changePasswordInDB }
