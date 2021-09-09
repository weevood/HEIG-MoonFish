const { queryToOptions } = require('../utils')

/**
 * Get items from MariaDB database matching the query options
 *
 * @param {Object} model - the Sequelize model
 * @param {Object} options - build and query options
 */

const getItems = async (model, options = {}) => {
    return new Promise(async (resolve, reject) => {
        options = await queryToOptions(options)
        model.findAll(options)
            .then(async item => {
                resolve(item)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { getItems }
