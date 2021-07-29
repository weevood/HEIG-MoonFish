const { initOptions } = require('./initOptions')

/**
 * Get items from database
 * @param {Object} model - the Sequelize model
 * @param {Object} options - build and query options
 */
const getItems = async (model,  options = {}) => {
    return new Promise((resolve, reject) => {
        options = initOptions(options)
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
