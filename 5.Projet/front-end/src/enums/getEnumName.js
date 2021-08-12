/**
 * Retrieve enum name from value
 * @param {Object} obj - the enum to retrieve strings
 * @param {int} search - the enum to retrieve strings
 */
const getEnumName = (obj = {}, search = 0) => {
    let res = ''
    Object.entries(obj).forEach(([name, value]) => {
        if (search === value) {
            const a = name.toLowerCase().split('_')
            res = a[a.length - 1]
        }
    })
    return res
}

module.exports = { getEnumName }
