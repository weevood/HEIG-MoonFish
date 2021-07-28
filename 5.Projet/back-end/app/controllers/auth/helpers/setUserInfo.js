/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
    return new Promise((resolve) => {
        let user = {
            firstName: req.firstName,
            lastName: req.lastName,
            phone: req.phone,
            street: req.street,
            zipCode: req.zipCode,
            city: req.city,
            state: req.state,
            country: req.country,
            resumeId: req.resumeId,
            lang: req.lang
        }
        if (req.role) {
            user = {
                ...user,
                role: req.role.name
            }
        }
        if (req.status) {
            user = {
                ...user,
                status: req.status.name
            }
        }
        // Adds verification for testing purposes
        if (process.env.NODE_ENV !== 'production') {
            user = {
                ...user,
                uuid: req.uuid
            }
        }
        resolve(user)
    })
}

module.exports = { setUserInfo }
