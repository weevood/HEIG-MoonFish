const { matchedData } = require('express-validator')
const { verifyUser, findUserAuthByEmail } = require('./helpers')
const { handleError } = require('../../middleware/utils')

/**
 * Verify function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const verify = async (req, res) => {
    try {
        const data = matchedData(req)
        const userAuth = await findUserAuthByEmail(data.email)
        if (userAuth.verification !== data.verification)
            res.status(403).json({ error: { msg: 'FORBIDDEN' } })
        res.status(200).json(await verifyUser(userAuth))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { verify }
