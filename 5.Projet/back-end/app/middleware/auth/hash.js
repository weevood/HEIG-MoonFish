const bcrypt = require('bcrypt')
const { SALT_FACTOR } = require.main.require('./config/constants')

/**
 * Hash a user password
 *
 * @param {string} password the password to hash
 * @return {string} the hashed password
 */
const hash = async (password) => {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_FACTOR, function (error, hash) {
            if (error) {
                reject(error)
            }
            resolve(hash)
        })
    })
}

module.exports = { hash }
