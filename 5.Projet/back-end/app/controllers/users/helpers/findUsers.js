const mariadb = require('../../../models/mariadb')
const User = mariadb.models.User
const { buildErrObject } = require('../../../middleware/utils')
const { getItems } = require('../../../middleware/db')

/**
 * Find users from query
 *
 * @param {Object} options - build and query options
 */
const findUsers = (options = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let includes = []
            if (options.fields) {
                // Convert relations fields to includes
                let fields = []
                options.fields.split(',').forEach((field) => {
                    if (field === 'role' || field === 'roleId') {
                        includes.push('role')
                    } else if (field === 'status' || field === 'statusId') {
                        includes.push('status')
                    } else
                        fields.push(field)
                })
                options.fields = fields
            } else {
                // Add relations by default
                includes.push('role')
                includes.push('status')
            }
            options.include = includes
            resolve(await getItems(User, options))
        } catch (error) {
            reject(buildErrObject(404, 'USERS_NOT_FOUND'))
        }
    })
}

module.exports = { findUsers }
