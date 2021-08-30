/**
 * capitalize     Capitalize a word
 *
 * @param {string} word the word to capitalize
 * @return {string} the word capitalized
 */
export default function capitalize(word) {
		if (typeof word === 'undefined') {
				return '';
		}
		return word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1);
}

