const mariadb = require.main.require('./app/models/mariadb')
const Authentication = mariadb.models.Authentication
const { buildSuccObject } = require('../../middleware/utils')

/**
 * Delete an item from database by id
 * @param {Object} model - the Sequelize model
 * @param {int} id - the item id
 */
const deleteItem = (model, id) => {
    return new Promise((resolve, reject) => {
        const pk = (model === Authentication ? { userId: id } : { id })
        model.destroy({ where: pk })
            .then(
                deletedRows => {
                    if (deletedRows !== 1) {
                        reject('DELETE_ERROR')
                    }
                    resolve(buildSuccObject('DELETED'))
                }
            )
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { deleteItem }
