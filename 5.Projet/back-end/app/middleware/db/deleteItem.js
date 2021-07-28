const { buildSuccObject, itemNotFound } = require('../../middleware/utils')

/**
 * Deletes an item from database by id
 * @param {int} id - id of item
 * @param model
 */
const deleteItem = (id = 0, model = {}) => {
    return new Promise((resolve, reject) => {
        model.destroy({
            where: { id: id }
        })
            .then(
                async num => {
                    if (num) {
                        resolve(buildSuccObject('DELETED'))
                    }
                    throw { message: 'DELETE_ERROR' }
                }
            )
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { deleteItem }
