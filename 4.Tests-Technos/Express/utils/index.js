const token = function() {
		// 0-9 a-z
		return Math.random().toString(36).substr(2);
};

exports.getToken = function() {
		return token() + token();
};
