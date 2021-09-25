/**
 * Creates a user with object info
 *
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
    return new Promise((resolve) => {
        let user = {
            uuid: req.uuid,
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
                id: req.id,
                ...user
            }
        }
        resolve(user)
    })
}

module.exports = { setUserInfo }
