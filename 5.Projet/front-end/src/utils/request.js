// Decorator function to handle requests errors
export default function request(fn, _this, emit = null) {
		try {
				if(_this)
					return fn.catch(e => _this.$emit('msg', e));
				return fn.catch(e => emit('msg', e));
		} catch (err)
		{
				return fn;
		}
}

