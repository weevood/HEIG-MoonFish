const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { findUserBankAccounts } = require('./helpers')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUserBankAccounts = async (req, res) => {
    try {
        const data = matchedData(req)
        const userDetails = await findUserBankAccounts(data.uuid)
        if (typeof userDetails.bankaccounts !== 'undefined') {
            const bankAccounts = userDetails.bankaccounts.map(function (item) {
                delete item.dataValues.id
                delete item.dataValues.userId
                delete item.dataValues.createdAt
                delete item.dataValues.updatedAt
                return item;
            });
            res.status(200).json(bankAccounts)
        }
        res.status(200).json([])
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUserBankAccounts }
