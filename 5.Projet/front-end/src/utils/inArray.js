export default function inArray(needle, haystack) {
		const length = haystack.length;
		for (let i = 0; i < length; i++) {
				if (haystack[i] === needle) {
						return true;
				}
		}
		return false;
}

