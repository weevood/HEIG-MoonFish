/**
 * Decorator function to handle requests errors
 *
 * @param {function} fn the function to decorate
 * @param {ref} _this a reference to the caller
 * @param {function} emit the emit function
 * @return {function} the decorated function
 */
export default function request(fn, _this, emit = null) {
		try {

				if (_this) {
						return fn.catch(e => _this.$emit('msg', e));
				}

				return fn.catch(e => emit('msg', e));

		} catch (err)
		{
				return fn;
		}
}

