const { itemNotFound } = require('../../middleware/utils')

/**
 * Gets item from database by id
 * @param {Object} model - the Sequelize model
 * @param {int} id - the item id
 * @param {Object} options - build and query options
 */
const getItem = (model, id, options = {}) => {
    return new Promise((resolve, reject) => {
        model.findByPk(id, options)
            .then(async item => {
                await itemNotFound(item, 'ITEM_NOT_FOUND')
                resolve(item)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { getItem }
