/**
 * Retrieve strings from an enum
 *
 * @param {Object} obj - the enum to retrieve strings
 */
const getEnumValues = (obj = {}) => {
		let res = []
		Object.entries(obj).forEach(([name, id]) => {
				const a = name.toLowerCase().split('_')
				res.push(a[a.length - 1]);
		})
		return res
}

module.exports = { getEnumValues }
