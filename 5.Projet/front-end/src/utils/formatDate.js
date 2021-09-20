import dateFormat from "dateformat";

export default function formatDate(date, mask = 'dd.mm.yyyy') {
		if (date) {
				return dateFormat(new Date(date), mask);
		}
		return ''
}

