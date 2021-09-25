const mariadb = require('../../../models/mariadb')
const User = mariadb.models.User
const { buildErrObject } = require('../../../middleware/utils')
const { getItemByUuid } = require('../../../middleware/db')

/**
 * Find user bank accounts by uuid
 *
 * @param {uuid} uuid - the user´s uuid
 */
const findUserBankAccounts = (uuid) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getItemByUuid(User, uuid, { include: ['bankaccounts'] }))
        } catch (error) {
            reject(buildErrObject(404, 'ACCOUNT_DOES_NOT_EXIST'))
        }
    })
}

module.exports = { findUserBankAccounts }
