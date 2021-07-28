const { itemNotFound } = require('../../middleware/utils')

/**
 * Gets item from database by id
 * @param {int} id - item id
 * @param model
 */
const getItem = (id = 0, model = {}) => {
    return new Promise((resolve, reject) => {
        model.findByPk(id)
            .then(async (result) => {
                await itemNotFound(null, result, 'ITEM_NOT_FOUND')
                resolve(item)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { getItem }
