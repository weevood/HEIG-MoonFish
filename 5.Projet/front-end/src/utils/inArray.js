/**
 * Search for a specified value within an array
 *
 * @param {Object} needle - the needle object to search for
 * @param {Array} haystack - the array to search in
 */
export default function inArray(needle, haystack) {
		const length = haystack.length;

		for (let i = 0; i < length; i++) {
				if (haystack[i] === needle) {
						return true;
				}
		}

		return false;
}

