const { buildSuccObject } = require("../../middleware/utils")

/**
 * Updates an item in database by id
 * @param {int} id - item id
 * @param model
 * @param {Object} req - request object
 */
const updateItem = (id = 0, model = {}, req = {}) => {
    return new Promise((resolve, reject) => {

        model.update(req, {
            where: { id: id }
        })
            .then(
                num => {
                    if (num) {
                        resolve(buildSuccObject('ITEM_UPDATED'))
                    }
                    throw { message: 'UPDATE_ERROR' }
                }
            )
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { updateItem }
