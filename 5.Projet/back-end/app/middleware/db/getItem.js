const { itemNotFound } = require('../../middleware/utils')

/**
 * Gets item from database by id
 * @param {string} id - item id
 * @param model
 */
const getItem = (id = 0, model = {}) => {
    return new Promise((resolve, reject) => {
        model.findById(id, async (error, item) => {
            try {
                await itemNotFound(error, item, 'NOT_FOUND')
                resolve(item)
            } catch (error) {
                reject(error)
            }
        })
    })
}

module.exports = { getItem }
