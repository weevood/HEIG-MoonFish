const mariadb = require('../../../models/mariadb')
const Resource = mariadb.models.Resource
const ResourceCategories = mariadb.models.ResourceCategories
const { buildErrObject } = require('../../../middleware/utils')
const { getItems } = require('../../../middleware/db')

/**
 * Find user from query
 *
 * @param {Object} options - build and query options
 * @param {string} lang - the translation to load
 */
const findResources = (options = {}, lang = 'en') => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getItems(Resource, {
                ...options,
                // include: [ResourceCategories]
            }))
        } catch (error) {
            reject(buildErrObject(404, 'RESOURCES_NOT_FOUND'))
        }
    })
}

module.exports = { findResources }
