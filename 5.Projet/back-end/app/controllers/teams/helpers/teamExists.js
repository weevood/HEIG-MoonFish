const { buildErrObject } = require('../../../middleware/utils')
const { getNodes } = require('../../../middleware/db/getNodes')

/**
 * Checks if a team already exists in database
 * @param {string} name - name of item
 */
const teamExists = (name = '') => {
    return new Promise((resolve, reject) => {
        getNodes('Team', {
            filters: { name }
        }).then(collection => {
            if (collection.length)
                return reject(buildErrObject(422, 'TEAM_ALREADY_EXISTS'))
            resolve(false)
        }).catch(error => {
            return reject(buildErrObject(422, error.msg))
        })

    })
}

module.exports = { teamExists }
