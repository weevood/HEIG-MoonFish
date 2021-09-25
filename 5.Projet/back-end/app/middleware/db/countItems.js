/**
 * Count the number of records matching the provided where clause
 *
 * @param {Object} model - the Sequelize model
 * @param {Object} filter - the filter
 */
const countItems = (model, filter = {}) => {
    return new Promise((resolve, reject) => {
        model.count({ where: filter })
            .then(
                records => resolve(records)
            )
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { countItems }
