const { buildErrObject } = require('../../../middleware/utils')
const { getNodes } = require('../../../middleware/db/getNodes')

/**
 * Checks if a project already exists in database
 * @param {string} name - name of item
 */
const projectExists = (name = '') => {
    return new Promise((resolve, reject) => {
        getNodes('Project', {
            filters: { name }
        }).then(collection => {
            if (collection.length)
                return reject(buildErrObject(422, 'PROJECT_ALREADY_EXISTS'))
            resolve(false)
        }).catch(error => {
            return reject(buildErrObject(422, error.msg))
        })

    })
}

module.exports = { projectExists }
