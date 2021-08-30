/**
 * clean     Clean an object and remove null, empty values, etc.
 *
 * @param {Object} obj the object to clean
 * @return {Object} the cleaned Object
 */
export default function clean(obj) {
		Object.keys(obj).forEach(key => {
				let value = obj[key];
				let hasProperties = (value && Object.keys(value).length > 0);
				if (value === null) {
						delete obj[key];
				}
				else if ((typeof value !== 'string') && hasProperties) {
						clean(value);
				}
		});
		return obj;
}

