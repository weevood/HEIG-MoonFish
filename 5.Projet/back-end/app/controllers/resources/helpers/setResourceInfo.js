/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setResourceInfo = (req = {}) => {
    return new Promise((resolve) => {
        if (typeof req !== 'undefined') {
            if (process.env.NODE_ENV === 'production') {
                delete req.dataValues.id
            }
            delete req.dataValues.authorId
            delete req.dataValues.projectId
            delete req.dataValues.createdAt
            delete req.dataValues.updatedAt
            resolve(req)
        }
    })
}

module.exports = { setResourceInfo }
