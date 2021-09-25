const mariadb = require('../../models/mariadb')
const Authentication = mariadb.models.Authentication
const { buildErrObject, buildSuccObject } = require('../../middleware/utils')

/**
 * Update an item in database by id
 *
 * @param {Object} model - the Sequelize model
 * @param {int|Object} id - the item id
 * @param {Object} values - the values to update
 */
const updateItem = (model, id = 0, values = {}) => {
    return new Promise((resolve, reject) => {

        if (Object.keys(values).length === 0)
            reject(buildErrObject(422, 'NO_VALUES'))

        if (typeof id === 'string')
            id = parseInt(id)

        if (typeof id === 'number')
            id = (model === Authentication ? { userId: id } : { id })

        model.update(values, { where: id })
            .then(
                res => {
                    let updatedRows = res[0]
                    if (updatedRows !== 1) {
                        reject(buildErrObject(422, 'UPDATE_ERROR'))
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
