/**
 * Gets country from user
 *
 * @param {*} req - request object
 */
const getCountry = ({ headers }) => headers['cf-ipcountry'] ? headers['cf-ipcountry'] : 'XX'

module.exports = { getCountry }
