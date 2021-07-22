const uuid = require('uuid')
const User = require.main.require('./app/models/user')
const Authentication = require.main.require('./app/models/authentication')
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
        const user = new User({
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
        })
        user.save((err, newUser) => {

            if (err) {
                reject(buildErrObject(422, err.message))
            }
            newUser = JSON.parse(JSON.stringify(newUser))

            const auth = new Authentication({
                userId: newUser.id,
                email,
                password,
                // lastLogin,
                // loginAttempts,
                // blockUntil,
                verification: uuid.v4()
            })

            auth.save((err, newUserAuth) => {
                if (err) {
                    reject(buildErrObject(422, err.message))
                }
                newUserAuth = JSON.parse(JSON.stringify(newUserAuth))

                delete newUserAuth.password
                delete newUserAuth.loginAttempts
                delete newUserAuth.blockUntil

                resolve(Object.assign({}, newUser, newUserAuth))
            })
        })
    })
}

module.exports = { createItemInDb }
