import dateFormat from "dateformat";

/**
 * Format a given date with mask
 *
 * @param {Date} date the date to format
 * @param {string} mask the mask to use for formatting
 * @return {string}
 */
export default function formatDate(date, mask = 'dd.mm.yyyy') {

		if (date) {
				return dateFormat(new Date(date), mask);
		}

		return '';
}

