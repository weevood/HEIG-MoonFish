const { buildSuccObject, itemNotFound } = require('../../middleware/utils')

/**
 * Deletes an item from database by id
 * @param {string} id - id of item
 * @param model
 */
const deleteItem = (id = 0, model = {}) => {
    return new Promise((resolve, reject) => {
        model.findByIdAndRemove(id, async (error, item) => {
            try {
                await itemNotFound(error, item, 'NOT_FOUND')
                resolve(buildSuccObject('DELETED'))
            } catch (error) {
                reject(error)
            }
        })
    })
}

module.exports = { deleteItem }
