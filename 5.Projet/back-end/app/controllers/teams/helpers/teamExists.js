const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a team already exists in database
 * @param {string} name - name of item
 */
const teamExists = (name = '') => {
    return new Promise((resolve, reject) => {
        Team.findOne(
            {
                name
            },
            (error, item) => {
                if (error) {
                    return reject(buildErrObject(422, error.msg))
                }

                if (item) {
                    return reject(buildErrObject(422, 'CITY_ALREADY_EXISTS'))
                }
                resolve(false)
            }
        )
    })
}

module.exports = { teamExists }
