const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a team already exists excluding itself
 * @param {int} id - id of item
 * @param {string} name - name of item
 */
const teamExistsExcludingItself = (id = 0, name = '') => {
    return new Promise((resolve, reject) => {
        Team.findOne(
            {
                name,
                _id: {
                    $ne: id
                }
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

module.exports = { teamExistsExcludingItself }
