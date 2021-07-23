/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
    return new Promise((resolve) => {
        let user = {
            id: req.id,
            firstname: req.firstname,
            lastname: req.lastname,
            role: req.role,
            status: req.status
        }
        // Adds verification for testing purposes
        if (process.env.NODE_ENV !== 'production') {
            user = {
                ...user,
                verification: req.verification
            }
        }
        resolve(user)
    })
}

module.exports = { setUserInfo }
