const { itemNotFound } = require('../../middleware/utils')

/**
 * Updates an item in database by id
 * @param {string} id - item id
 * @param model
 * @param {Object} req - request object
 */
const updateItem = (id = 0, model = {}, req = {}) => {
    return new Promise((resolve, reject) => {
        model.findByIdAndUpdate(
            id,
            req,
            {
                new: true,
                runValidators: true
            },
            async (error, item) => {
                try {
                    await itemNotFound(error, item, 'NOT_FOUND')
                    resolve(item)
                } catch (error) {
                    reject(error)
                }
            }
        )
    })
}

module.exports = { updateItem }
