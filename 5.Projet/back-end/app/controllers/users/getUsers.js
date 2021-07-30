const mariadb = require.main.require('./app/models/mariadb')
const User = mariadb.models.User
const { handleError } = require('../../middleware/utils')
const { getItems } = require('../../middleware/db')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUsers = async (req, res) => {
    try {
        const options = req.query

        let includes = []
        if (req.query.fields) {
            // Convert relations fields to includes
            let fields = []
            req.query.fields.split(',').forEach((field) => {
                if (field === 'role' || field === 'roleId') {
                    includes.push('role')
                } else if (field === 'status' || field === 'statusId') {
                    includes.push('status')
                } else
                    fields.push(field)
            });
            options.fields = fields
        } else {
            // Add relations by default
            includes.push('role')
            includes.push('status')
        }
        options.include = includes

        res.status(200).json(await getItems(User, options))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUsers }
