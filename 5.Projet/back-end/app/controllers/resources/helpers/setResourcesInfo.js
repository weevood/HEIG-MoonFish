const { setResourceInfo } = require('./setResourceInfo')

/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setResourcesInfo = (req = {}) => {
    return new Promise((resolve) => {
        let resources = []
        if (typeof req !== 'undefined') {
            resources = req.map(function (item) {
                if (process.env.NODE_ENV === 'production') {
                    delete item.dataValues.id
                }
                delete item.dataValues.createdAt
                delete item.dataValues.updatedAt
                return item;
            });
        }
        resolve(resources)
    })
}

module.exports = { setResourcesInfo }
