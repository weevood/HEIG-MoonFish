const { buildErrObject } = require('../../middleware/utils')

/**
 * Creates a new item in database
 * @param {Object} model - the Sequelize model
 * @param {Object} values - the values to update
 * @param {Object} options - build and query options
 */
const createItem = (model, values = {}, options = {}) => {

    return new Promise((resolve, reject) => {
        if (Object.keys(values).length === 0)
            reject(buildErrObject(422, 'NO_VALUES'))
        model.create(values, options)
            .then(item => {
                resolve(item)
            })
            .catch(error => {
                reject(error)
            })
    })

}

module.exports = { createItem }
