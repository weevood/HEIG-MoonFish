import capitalize from '@/utils/capitalize';

/**
 * Format a given couple firstName / lastName
 *
 * @param {string} firstName the first name to format
 * @param {string} lastName the last name to format
 * @return {string}
 */
export default function formatName(firstName, lastName) {
		return capitalize(firstName) + ' ' + capitalize(lastName)
}
