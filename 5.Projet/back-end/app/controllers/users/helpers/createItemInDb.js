const uuid = require('uuid')
const { hash } = require("../../../middleware/auth");
const db = require.main.require('./app/models')
const User = db.models.User
const Authentication = db.models.Authentication
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItemInDb = ({
                            firstName = '',
                            lastName = '',
                            phone = '',
                            street = '',
                            zipCode = '',
                            city = '',
                            state = '',
                            country = '',
                            role = '',
                            language = '',
                            email = '',
                            password = '',
                        }) => {
    return new Promise((resolve, reject) => {
        const user = {
            uuid: uuid.v4(),
            firstName,
            lastName,
            phone,
            street,
            zipCode,
            city,
            state,
            country,
            // status: 0,
            role,
            language
        }
        User.create(user)
            .then(async newUser => {
                newUser = JSON.parse(JSON.stringify(newUser))
                const auth = {
                    userId: newUser.id,
                    email,
                    password: await hash(password),
                    // lastLogin,
                    // loginAttempts,
                    // blockUntil,
                    verification: uuid.v4()
                }
                Authentication.create(authentication)
                    .then(newUserAuth => {
                        newUserAuth = JSON.parse(JSON.stringify(newUserAuth))

                        delete newUserAuth.password
                        delete newUserAuth.loginAttempts
                        delete newUserAuth.blockUntil

                        resolve(Object.assign({}, newUser, newUserAuth))
                    })
                    .catch(error => {
                        reject(buildErrObject(422, error.message))
                    });
            })
            .catch(error => {
                reject(buildErrObject(422, error.message))
            });
    })
}

module.exports = { createItemInDb }
