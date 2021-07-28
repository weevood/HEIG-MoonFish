/**
 * Retrieve strings from an enum
 * @param {Object} obj - the enum to retrieve strings
 */
const getEnumValues = (obj = {}) => {
    let res = []
    Object.entries(obj).forEach(([name, id]) => {
        res.push(name.toLowerCase().split('_')[1])
    })
    return res
}

module.exports = { getEnumValues }
