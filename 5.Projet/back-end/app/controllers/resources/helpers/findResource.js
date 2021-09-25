const mariadb = require('../../../models/mariadb')
const Resource = mariadb.models.Resource
const ResourceCategories = mariadb.models.ResourceCategories
const { buildErrObject } = require('../../../middleware/utils')
const { getItem } = require('../../../middleware/db')

/**
 * Find resource by id
 *
 * @param {int} id - the resource´s id
 * @param {string} lang - the translation to load
 */
const findResource = (id = 0, lang = 'en') => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getItem(Resource, id, {
                // include: [ResourceCategories]
            }))
        } catch (error) {
            reject(buildErrObject(404, 'RESOURCE_DOES_NOT_EXIST'))
        }
    })
}

module.exports = { findResource }
