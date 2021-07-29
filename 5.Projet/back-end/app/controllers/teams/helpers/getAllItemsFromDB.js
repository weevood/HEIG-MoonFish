const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */
const getAllItemsFromDB = () => {
    return new Promise((resolve, reject) => {
        Team.find(
            {},
            '-updatedAt -createdAt',
            {
                sort: {
                    name: 1
                }
            },
            (error, items) => {
                if (error) {
                    return reject(buildErrObject(422, error.msg))
                }
                resolve(items)
            }
        )
    })
}

module.exports = { getAllItemsFromDB }
