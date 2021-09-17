const { itemNotFound } = require('../../middleware/utils')
const { queryToOptions } = require('../utils')

/**
 * Gets item from database by uuid
 * @param {Object} model - the Sequelize model
 * @param {uuid} uuid - the item uuid
 * @param {Object} options - build and query options
 */
const getItemByUuid = (model, uuid, options = {}) => {
    return new Promise(async (resolve, reject) => {
        options = await queryToOptions(options)
        options.where = {...options.where, uuid}
        model.findOne(options)
            .then(async item => {
                await itemNotFound(item, 'ITEM_NOT_FOUND')
                resolve(item)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { getItemByUuid }
