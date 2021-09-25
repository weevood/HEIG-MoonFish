const { setUserInfo } = require('./setUserInfo')

/**
 * Creates users  with objects info
 *
 * @param {Object} req - request object
 */
const setUsersInfo = (req = {}) => {
    return new Promise(async (resolve) => {
        let users = []
        if (typeof req !== 'undefined') {
            await req.map(function (item) {
                setUserInfo(item)
                    .then((user) => {
                        users.push(user)
                    })
            })
        }
        resolve(users)
    })
}

module.exports = { setUsersInfo }
