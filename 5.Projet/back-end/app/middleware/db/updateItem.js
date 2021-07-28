const db = require.main.require('./app/models')
const Authentication = db.models.Authentication
const { buildSuccObject } = require('../../middleware/utils')

/**
 * Update an item in database by id
 * @param {Object} model - the Sequelize model
 * @param {int} id - the item id
 * @param {Object} values - the values to update
 */
const updateItem = (model, id, values = {}) => {
    return new Promise((resolve, reject) => {
        const pk = (model === Authentication ? { userId: id } : { id })
        model.update(values, { where: pk })
            .then(
                res => {
                    let updatedRows = res[0]
                    if (updatedRows !== 1) {
                        reject('UPDATE_ERROR')
                    }
                    resolve(buildSuccObject('UPDATED'))
                }
            )
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { updateItem }
