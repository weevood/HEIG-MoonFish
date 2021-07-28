const { initOptions } = require('./initOptions')

/**
 * Gets items from database
 * @param {Object} model - the Sequelize model
 * @param {Object} options - build and query options
 */
const getItems = async (model,  options = {}) => {
    return new Promise((resolve, reject) => {
        model.findAll(initOptions(options))
            .then(async item => {
                resolve(item)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { getItems }
