// Decorator function to handle requests errors
export default function request(fn, _this) {
		try {
				return fn.catch(e => _this.$emit('msg', e));
		} catch (err)
		{
				return fn;
		}
}

