/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setBankAccountsInfo = (req = {}) => {
    return new Promise((resolve) => {
        let bankAccounts = []
        if (typeof req !== 'undefined') {
            bankAccounts = req.map(function (item) {
                if (process.env.NODE_ENV !== 'production') {
                    delete item.dataValues.id
                }
                delete item.dataValues.userId
                delete item.dataValues.createdAt
                delete item.dataValues.updatedAt
                return item;
            });
        }
        resolve(bankAccounts)
    })
}

module.exports = { setBankAccountsInfo }
