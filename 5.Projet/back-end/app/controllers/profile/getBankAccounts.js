const { handleError } = require('../../middleware/utils')
const { findUserBankAccounts, setBankAccountsInfo } = require('../users/helpers')

/**
 * Get profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBankAccounts = async (req, res) => {
    try {
        const userDetails = await findUserBankAccounts(req.user.uuid)
        res.status(200).json(await setBankAccountsInfo(userDetails.bankaccounts))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getBankAccounts }
