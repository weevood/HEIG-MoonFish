const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { setBankAccountsInfo, findUserBankAccounts } = require('./helpers')

/**
 * Get user bank accounts when called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUserBankAccounts = async (req, res) => {
    try {
        const data = matchedData(req)
        const userDetails = await findUserBankAccounts(data.uuid)
        res.status(200).json(await setBankAccountsInfo(userDetails.bankaccounts))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUserBankAccounts }
