// Decorator function to handle requests errors
export default function request(fn, _this) {
		return fn.catch(e => _this.$emit('msg', e))
}

